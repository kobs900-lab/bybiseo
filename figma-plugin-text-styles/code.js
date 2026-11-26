// 영업비서 DS: 타이포 토큰 → 텍스트 스타일 생성 + 홈 화면(56:2) 글자에 적용
// 피그마는 스타일을 입힌 뒤 줄 간격·자간을 바꾸면 스타일이 떨어진다.
// 그래서 화면에서 쓰인 (크기·굵기·줄 간격·자간) 조합마다 스타일을 만들고, 덮어쓰기 없이 그대로 입힌다.
const FAMILY = 'Pretendard Variable';
const TARGET = '56:2';
const SIZE_TOKEN = { 10: 'micro', 12: 'caption', 14: 'body-m', 16: 'body-l', 18: 'title-m', 20: 'title-l', 24: 'display', 28: 'display-l' };
const norm = s => String(s).replace(/\s+/g, '').toLowerCase();
const WEIGHT_TOKEN = { regular: 'regular', semibold: 'semibold', bold: 'bold' };
const r1 = n => Math.round(n * 10) / 10;
let step = '시작';

(async () => {
  try {
    step = '글꼴 찾기';
    const avail = (await figma.listAvailableFontsAsync()).map(f => f.fontName);
    const pick = w => avail.find(f => f.family === FAMILY && norm(f.style) === w);
    const fonts = {};
    for (const w of Object.keys(WEIGHT_TOKEN)) { const f = pick(w); if (!f) throw new Error(`${FAMILY} ${w} 글꼴 없음`); await figma.loadFontAsync(f); fonts[w] = f; }

    step = '홈 프레임 찾기';
    const root = await figma.getNodeByIdAsync(TARGET);
    if (!root) throw new Error('홈 프레임(56:2)을 찾지 못했습니다');
    let page = root; while (page.type !== 'PAGE') page = page.parent;
    await page.loadAsync();
    const texts = root.findAllWithCriteria({ types: ['TEXT'] });

    step = '조합 모으기';
    const segsOf = new Map(); const combos = {};
    for (const t of texts) {
      const segs = t.getStyledTextSegments(['fontName', 'fontSize', 'lineHeight', 'letterSpacing']);
      const list = segs.map(x => ({ start: x.start, end: x.end, fontName: x.fontName, fontSize: x.fontSize, lineHeight: x.lineHeight, letterSpacing: x.letterSpacing, _key: null }));
      segsOf.set(t, list);
      for (const s of list) {
        const w = norm(s.fontName.style); if (!WEIGHT_TOKEN[w] || !SIZE_TOKEN[s.fontSize]) continue;
        const lh = s.lineHeight.unit === 'PIXELS' ? Math.round(s.lineHeight.value / s.fontSize * 100) : (s.lineHeight.unit === 'PERCENT' ? Math.round(s.lineHeight.value) : 0);
        const ls = s.letterSpacing.unit === 'PIXELS' ? r1(s.letterSpacing.value) : r1(s.letterSpacing.value * s.fontSize / 100);
        s._key = [s.fontSize, w, lh, ls].join('|');
        const base = s.fontSize + '|' + w;
        (combos[base] = combos[base] || {})[s._key] = (combos[base][s._key] || 0) + 1;
      }
    }

    step = '텍스트 스타일 만들기';
    const vars = await figma.variables.getLocalVariablesAsync('FLOAT');
    const vByName = n => vars.find(v => v.name.endsWith('/' + n));
    const existing = await figma.getLocalTextStylesAsync();
    const styleOf = {}; let created = 0, total = 0;
    for (const [base, keys] of Object.entries(combos)) {
      const sorted = Object.entries(keys).sort((a, b) => b[1] - a[1]); // 가장 많이 쓰인 조합 = 기본 스타일
      sorted.forEach(([key], i) => {
        const [size, w, lh, ls] = key.split('|'); const sz = +size;
        let name = `Text/${SIZE_TOKEN[sz]}/${WEIGHT_TOKEN[w]}`;
        if (i > 0) name += ' · ' + [lh !== sorted[0][0].split('|')[2] ? `lh${lh}` : '', ls !== sorted[0][0].split('|')[3] ? `ls${ls}` : ''].filter(Boolean).join(' ');
        let st = existing.find(s => s.name === name);
        if (!st) { st = figma.createTextStyle(); st.name = name; created++; existing.push(st); }
        st.fontName = fonts[w];
        st.fontSize = sz;
        st.lineHeight = +lh ? { unit: 'PERCENT', value: +lh } : { unit: 'AUTO' };
        st.letterSpacing = { unit: 'PIXELS', value: +ls };
        st.description = `var(--fs-${SIZE_TOKEN[sz]}) · var(--fw-${WEIGHT_TOKEN[w]}) · 줄 간격 ${lh}% · 자간 ${ls}px`;
        const fs = vByName('fs-' + SIZE_TOKEN[sz]); if (fs) try { st.setBoundVariable('fontSize', fs); } catch (e) {}
        styleOf[key] = st; total++;
      });
    }
    // 이전 버전이 만든 스타일 중 이제 쓰지 않는 것은 그대로 둔다(사용처 0)

    step = '글자에 적용';
    let applied = 0, skipped = 0, failed = 0, firstErr = '';
    for (const t of texts) {
      for (const s of segsOf.get(t)) {
        const st = s._key && styleOf[s._key];
        if (!st) { skipped++; continue; }
        try {
          const w = norm(s.fontName.style);
          if (s.fontName.family !== FAMILY || s.fontName.style !== fonts[w].style) t.setRangeFontName(s.start, s.end, fonts[w]);
          await t.setRangeTextStyleIdAsync(s.start, s.end, st.id); // 덮어쓰기 없음 → 스타일 유지
          applied++;
        } catch (e) { failed++; if (!firstErr) firstErr = (e && e.message) || String(e); }
      }
    }

    step = '확인';
    let linked = 0;
    for (const t of texts) for (const s of t.getStyledTextSegments(['textStyleId'])) if (s.textStyleId) linked++;
    figma.closePlugin(`스타일 ${total}종(새로 ${created}) · 적용 ${applied} · 실제 연결 ${linked} · 건너뜀 ${skipped} · 실패 ${failed}` + (firstErr ? ` · 첫 오류: ${firstErr}` : ''));
  } catch (e) {
    figma.closePlugin(`오류(${step}): ` + ((e && e.message) || String(e)));
  }
})();
