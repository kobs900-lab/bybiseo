import json, subprocess, os
OUTD = os.path.expanduser("~/영업비서/고객메뉴_분석/심층분석")
def snap(name, shot=True):
    wait_stable(timeout=4)
    boxes = screen()
    with open(os.path.join(OUTD, f"{name}.json"), "w", encoding="utf-8") as f:
        json.dump(boxes, f, ensure_ascii=False, indent=1)
    if shot:
        r = subprocess.run([os.path.expanduser("~/.local/bin/mcap"), "영업비서", name], capture_output=True, text=True)
        print(r.stdout.strip().splitlines()[0] if r.stdout else r.stderr)
    print(f"[{name}] {len(boxes)} texts:", " | ".join(b["text"] for b in boxes))
    return boxes

def win(): return screen_info()["window"]
def open_first_card():
    w = win(); bs = screen()
    sb = [b for b in bs if "검색" in b["text"]]
    top = sb[0]["y"] + 40 if sb else w["y"] + w["h"]*0.3
    cands = sorted([b for b in bs if b["y"] > top and b["x"] < w["x"] + w["w"]*0.45 and b["y"] < w["y"] + w["h"]*0.8], key=lambda b: b["y"])
    if not cands: raise RuntimeError("카드를 못 찾음")
    c = cands[0]; print("카드 탭:", c["text"]); tap(c["x"], c["y"])
    ok = wait_for_text("기본 정보", timeout=6); print("상세 열림:", bool(ok)); return ok
def detail_pages(prefix, n=6):
    w = win(); prev = None
    for i in range(n):
        names = {b["text"] for b in screen()}
        if prev is not None and names == prev: print("끝 도달"); break
        snap(f"{prefix}_{i+1}"); prev = names
        if any("고객 삭제" in t for t in names): print("하단(고객 삭제) 도달 — 정지"); break
        scroll("down", amount=0.55, at=(w["x"]+w["w"]*0.5, w["y"]+w["h"]*0.55)); wait_stable(timeout=3)
def back_detail():
    w = win(); tap(w["x"] + w["w"]*0.08, w["y"] + w["h"]*0.13); return wait_for_text("고객 관리", timeout=5)

def select_chip(name):
    w = win()
    for i in range(6):
        hits = [b for b in find_text(name) if b["y"] < w["y"] + w["h"]*0.25]
        if hits:
            tap(hits[0]["x"], hits[0]["y"]); wait_stable(timeout=4); return True
        row = [b for b in screen() if "미지정" in b["text"] or "전체 1" in b["text"]]
        y = row[0]["y"] if row else w["y"] + w["h"]*0.19
        scroll("right", amount=0.5, at=(w["x"]+w["w"]*0.6, y)); wait_stable(timeout=2)
    return False
def run_status(label, code):
    if not select_chip(label): print("칩 못 찾음:", label); return
    snap(f"{code}1_목록_{label}")
    if open_first_card():
        detail_pages(f"{code}2_상세_{label}")
        print("목록 복귀:", bool(back_detail()))
