#!/usr/bin/env python3
"""실제 캡처에서 고객 정보(이름·연락처·메모·통화 내용 등)를 가린 공개용 사본을 만든다.

원칙: 화면 고정 문구(UI_WORDS)로만 이뤄진 줄만 남기고, 나머지 글자는 전부 가린다(기본이 가림).
가린 뒤 다시 글자 인식을 돌려 남은 글자가 모두 고정 문구인지 확인하고, 아니면 또 가린다.

사용: python3 도구/캡처_가림.py <원본 PNG 폴더> <출력 폴더> [이름 목록 JSON]
필요: Pillow, phone-harness(애플 Vision 글자 인식, 인계 문서 4-5 참고)
"""
import sys, os, re, json, subprocess, tempfile, unicodedata
from PIL import Image, ImageDraw

OCR_PY = os.path.expanduser('~/.local/share/uv/tools/phone-harness/bin/python')
OCR_CODE = r'''
import sys, json
import Vision
from Foundation import NSURL
from phone_harness.ocr import recognize, image_size

def text_rects(p, w, h):
    # 글자를 읽지 못해도 글자가 있는 자리만 찾는다(가장자리에서 잘린 글자 대비)
    hd = Vision.VNImageRequestHandler.alloc().initWithURL_options_(NSURL.fileURLWithPath_(p), None)
    rq = Vision.VNDetectTextRectanglesRequest.alloc().init()
    ok, err = hd.performRequests_error_([rq], None)
    res = []
    for o in (rq.results() or []) if ok else []:
        bb = o.boundingBox()
        res.append([bb.origin.x * w, (1 - bb.origin.y - bb.size.height) * h, bb.size.width * w, bb.size.height * h])
    return res

out = {}
for p in sys.argv[1:]:
    w, h = image_size(p)
    ls = recognize(p, {'x': 0, 'y': 0, 'w': w, 'h': h})
    for l in ls:                      # recognize()는 상자 중심 좌표를 준다 → 왼쪽 위로 바꾼다
        l['x'] -= l['w'] / 2
        l['y'] -= l['h'] / 2
    out[p] = {'w': w, 'h': h, 'lines': ls, 'rects': text_rects(p, w, h)}
print(json.dumps(out, ensure_ascii=False))
'''
OUT_W = 720          # 공개용 가로 크기
QUALITY = 84

# 화면 고정 문구(메뉴·버튼·항목 이름·빈 상태 안내). 고객·직원·현장 이름과 메모 낱말은 넣지 않는다.
UI_WORDS = set('''
고객 관리 전체 미지정 부재중 방문 예약 방문예약 가계약 정계약 관심없음 재통화 타현장 상 중 하 아파트먼트
필터 검색 홈 일정 멤버 메뉴 메모 담당자 이름 상태 관심도 등록일 최근통화 없음 통화 미팅 추가 내페이지 공유
기본 정보 연락처 현장 등록 오늘 활동 타임라인 요약 AI 전화 문자 삭제 확인 선택 적용 초기화 직접설정 정렬
최신순 플랫폼 메타 네이버 구글 카카오 기타 직접 캠페인 리드 문의 이력 녹음 대화 보기 상세 저장 취소 입력
선택하세요 현장을 나의 대시보드 메시지 워크스페이스 자료함 캘린더 할일 현황 휴지통 광고 페이지 최근 제안 완료
어떤 상담을 원하시나요 인스턴트 폼 건 개 명
이력이 없습니다 앱에서 고객과 통화하면 자동으로 기록됩니다 아직 활동이 없어요 내페이지를 공유해보세요 일정이
내 이름.전화 이름.전화.현장.메모 현장.메모 이름·전화·현장·메모
'''.split())

# 눈으로 검수해 찾은 추가 가림 자리: 이름 → [(x0, y0, x1, y1) 비율]. 자동으로 못 잡는 곳만 적는다.
MANUAL = {
    '05_검색': [(0.03, 0.628, 0.97, 0.655)],                          # 자판 위 띠 아래로 비치는 줄
    '06-4b_상세_방문예약_기본정보_미팅': [(0.04, 0.122, 0.30, 0.150), (0.20, 0.972, 0.80, 1.0)],
    '06-5e_상세_가계약_통화이력_타임라인': [(0.04, 0.972, 0.98, 1.0)],
    '06-5i_상세_가계약_하단_삭제': [(0.06, 0.128, 0.70, 0.151)],
    '06-6a_상세_정계약_로딩중': [(0.04, 0.972, 0.98, 1.0)],
}

SPLIT = re.compile(r"[\s·|/:()\[\]{}<>「」『』,…•▾▼▲›‹→←+＋\"'“”‘’~\-]+")
PHONE = re.compile(r'01[016789][-\s.]?[\d*xX]{3,4}[-\s.]?[\d*xX]{4}|\d{2,4}[-.]\d{3,4}[-.]\d{4}|\d{9,}')
SAFE_NUM = re.compile(r'(\d{1,3}(,\d{3})+|\d{1,5})(개|명|건|일|%)?|\d{4}[./]\d{1,2}[./]\d{1,2}\.?|\d{1,2}[./]\d{1,2}\.?|\d{1,2}:\d{2}')


def token_safe(t):
    t = t.strip('.?!*')
    if not t:
        return True
    if not re.search(r'[0-9A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ]', t):   # 기호만(아이콘을 글자로 읽은 것)
        return True
    if t in UI_WORDS:
        return True
    if SAFE_NUM.fullmatch(t):
        return True
    if re.fullmatch(r'[A-Za-z]', t):                      # 아이콘을 영문 한 글자로 읽은 것
        return True
    return False


def line_safe(text):
    text = unicodedata.normalize('NFC', text)
    if PHONE.search(text):
        return False
    return all(token_safe(t) for t in SPLIT.split(text))


def ocr(paths):
    env = dict(os.environ)
    r = subprocess.run([OCR_PY, '-c', OCR_CODE] + paths, capture_output=True, text=True, env=env)
    if r.returncode != 0:
        raise SystemExit('글자 인식 실패: ' + r.stderr[-400:])
    return json.loads(r.stdout[r.stdout.index('{'):])


def cover(im, box, src=None):
    """글자 상자를 주변 바탕색으로 지우고, 그 위에 옅은 막대를 그린다."""
    W, H = im.size
    x, y, w, h = box
    px, py = h * 0.22 + 3, h * 0.2 + 3
    x0, y0, x1, y1 = int(max(0, x - px)), int(max(0, y - py)), int(min(W, x + w + px)), int(min(H, y + h + py))
    if x1 - x0 < 2 or y1 - y0 < 2:
        return
    reg = (src or im).crop((x0, y0, x1, y1)).convert('RGB')
    pix = reg.load()
    rw, rh = reg.size
    ring = [pix[i, j] for i in range(rw) for j in (0, rh - 1)] + [pix[i, j] for j in range(rh) for i in (0, rw - 1)]
    ring.sort(key=lambda c: c[0] + c[1] + c[2])
    bg = ring[len(ring) // 2]
    far = sorted((abs(pix[i, j][0] - bg[0]) + abs(pix[i, j][1] - bg[1]) + abs(pix[i, j][2] - bg[2]), pix[i, j])
                 for i in range(0, rw, 2) for j in range(0, rh, 2))
    top = [c for d, c in far[-max(1, len(far) // 8):]]
    fg = tuple(sum(c[k] for c in top) // len(top) for k in range(3))
    bar = tuple(int(bg[k] * 0.72 + fg[k] * 0.28) for k in range(3))
    if sum(abs(bar[k] - bg[k]) for k in range(3)) < 24:   # 바탕과 너무 비슷하면 살짝 어둡게
        bar = tuple(max(0, bg[k] - 26) for k in range(3))
    d = ImageDraw.Draw(im)
    d.rectangle((x0, y0, x1 - 1, y1 - 1), fill=bg)
    bh = max(6, (y1 - y0) * 0.5)
    cy = (y0 + y1) / 2
    d.rounded_rectangle((x0 + 2, cy - bh / 2, x1 - 3, cy + bh / 2), radius=bh / 2, fill=bar)


def main():
    src, out = sys.argv[1], sys.argv[2]
    names = json.load(open(sys.argv[3])) if len(sys.argv) > 3 else None
    files = {unicodedata.normalize('NFC', f[:-4]): f for f in os.listdir(src) if f.lower().endswith('.png')}
    names = names or sorted(files)
    os.makedirs(out, exist_ok=True)
    tmp = tempfile.mkdtemp(prefix='capmask_')
    work = {}
    for n in names:
        im = Image.open(os.path.join(src, files[n])).convert('RGB')
        p = os.path.join(tmp, n + '.png')
        im.save(p)
        work[n] = [im, p]
    report = {}
    covered = {n: [] for n in work}

    def inter(r, q):
        w = min(r[0] + r[2], q[0] + q[2]) - max(r[0], q[0])
        h = min(r[1] + r[3], q[1] + q[3]) - max(r[1], q[1])
        return max(0, w) * max(0, h)

    for rnd in range(1, 7):
        res = ocr([w[1] for w in work.values()])
        left = 0
        for n, (im, p) in work.items():
            lines = res[p]['lines']
            bad = [(l['x'], l['y'], l['w'], l['h']) for l in lines if not line_safe(l['text'])]
            safe = [(l['x'], l['y'], l['w'], l['h']) for l in lines if line_safe(l['text'])]
            extra = []
            for r in res[p]['rects']:
                area = r[2] * r[3]
                if area < 60 or r[2] < r[3] * 1.6:           # 아이콘·자판 한 글자 같은 네모난 것은 제외
                    continue
                if sum(inter(r, q) for q in safe) > area * 0.5:   # 허용 문구가 차지한 자리
                    continue
                if sum(inter(r, q) for q in covered[n]) > area * 0.6:   # 이미 가린 자리
                    continue
                extra.append(tuple(r))
            rep = report.setdefault(n, {'masked': 0, 'extra': 0, 'rounds': 0, 'kept': []})
            rep['kept'] = sorted({unicodedata.normalize('NFC', l['text']) for l in lines if line_safe(l['text'])})
            todo = extra + bad
            if rnd == 1:
                W_, H_ = im.size
                todo = [(bx[0] * W_, bx[1] * H_, (bx[2] - bx[0]) * W_, (bx[3] - bx[1]) * H_) for bx in MANUAL.get(n, [])] + todo
            if todo:
                left += len(bad) + len(extra)
                rep['masked'] += len(bad)
                rep['extra'] += len(extra)
                rep['rounds'] = rnd
                src = im.copy()
                for bx in todo:
                    cover(im, bx, src)
                    covered[n].append(bx)
                im.save(p)
        print(f'{rnd}차: 가린 곳 {left}')
        if not left:
            break
    else:
        raise SystemExit('6차까지 가려도 고정 문구가 아닌 글자가 남았습니다. 확인이 필요합니다.')
    for n, (im, p) in work.items():
        w, h = im.size
        im.resize((OUT_W, round(h * OUT_W / w)), Image.LANCZOS).save(os.path.join(out, n + '.webp'), 'WEBP', quality=QUALITY, method=6)
        os.remove(p)
    os.rmdir(tmp)
    json.dump(report, open(os.path.join(out, '_가림_보고.json'), 'w'), ensure_ascii=False, indent=1)
    print('완료', len(work), '장 →', out)


if __name__ == '__main__':
    main()
