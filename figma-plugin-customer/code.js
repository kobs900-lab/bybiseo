// 명령 2개: screens(화면 섹션 정리) · components(컴포넌트 라이브러리 정리)
if (figma.command === 'components') {
(async () => {
  let step = '시작';
  try {
    const CAP = '187:752';
    const norm = s => String(s).replace(/\s+/g, '').toLowerCase();
    const page = await figma.getNodeByIdAsync('51:299'); await page.loadAsync(); await figma.setCurrentPageAsync(page);
    const root = await figma.getNodeByIdAsync(CAP);
    if (!root) throw new Error('새 캡처(183:752)를 찾지 못했습니다');
    step = '글꼴';
    const avail = (await figma.listAvailableFontsAsync()).map(f => f.fontName);
    const fkey = f => f.family + '|' + f.style, has = new Set(avail.map(fkey)), loaded = new Set();
    const pv = {}; avail.filter(f => f.family === 'Pretendard Variable').forEach(f => pv[norm(f.style)] = f);
    const load = async f => { if (loaded.has(fkey(f))) return; try { await figma.loadFontAsync(f); loaded.add(fkey(f)); } catch (e) {} };
    for (const t of root.findAllWithCriteria({ types: ['TEXT'] })) {
      for (let pass = 0; pass < 4; pass++) {
        let ch = 0;
        for (const s of t.getStyledTextSegments(['fontName'])) {
          if (has.has(fkey(s.fontName))) { await load(s.fontName); continue; }
          const to = pv[norm(s.fontName.style)] || pv['regular']; if (!to) continue;
          await load(to); try { t.setRangeFontName(s.start, s.end, to); ch++; } catch (e) {}
        }
        if (!ch) break;
      }
    }
    const bold = pv['bold'] || pv['regular'], reg = pv['regular'] || bold; await load(bold); await load(reg);

    step = '이전 결과 정리';
    const nav = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Navigation / Bottom tab');
    if (nav && nav.parent !== page) page.appendChild(nav);
    for (const n of [...page.children]) {
      if (n === root || n === nav) continue;
      if (n.type === 'INSTANCE' || n.name === '컴포넌트 라이브러리' || n.name.startsWith('컴포넌트 / ') || n.name.startsWith('Section (K')) n.remove();
    }

    step = '다크 영역 모드';
    const cols = await figma.variables.getLocalVariableCollectionsAsync();
    const sem = cols.find(c => c.name.startsWith('2')), dark = sem && sem.modes.find(m => /dark|다크/i.test(m.name));
    const isDarkBox = new Set();
    if (sem && dark) for (const t of root.findAll(n => n.type === 'TEXT' && n.characters.trim() === '다크')) {
      let p = t.parent; while (p && p !== root && !(p.children && p.children.length > 1)) p = p.parent;
      if (p && p !== root) { try { p.setExplicitVariableModeForCollection(sem, dark.modeId); } catch (e) {} isDarkBox.add(p.id); }
    }
    const inDark = n => { let p = n.parent; while (p && p !== root) { if (isDarkBox.has(p.id)) return true; p = p.parent; } return false; };

    const place = (inst, n) => {
      const p = n.parent, i = p.children.indexOf(n); p.insertChild(i, inst);
      if (n.layoutPositioning === 'ABSOLUTE') inst.layoutPositioning = 'ABSOLUTE';
      inst.x = n.x; inst.y = n.y;
      const auto = p.layoutMode && p.layoutMode !== 'NONE';
      try { if (auto) { inst.layoutSizingHorizontal = n.layoutSizingHorizontal === 'FILL' ? 'FILL' : 'FIXED'; inst.layoutSizingVertical = n.layoutSizingVertical === 'FILL' ? 'FILL' : 'FIXED'; } } catch (e) {}
      try { if (inst.width !== n.width || inst.height !== n.height) { if (!auto || inst.layoutSizingHorizontal === 'FIXED') inst.resize(n.width, n.height); } } catch (e) {}
      if ('layoutGrow' in n) try { inst.layoutGrow = n.layoutGrow; inst.layoutAlign = n.layoutAlign; } catch (e) {}
    };
    let fail = 0;
    step = '아이콘';
    const iconPage = figma.root.children.find(p => p.name === '아이콘'); await iconPage.loadAsync();
    let iconBox = iconPage.children.find(n => n.name === 'Icons');
    if (!iconBox) { iconBox = figma.createFrame(); iconBox.name = 'Icons'; iconPage.appendChild(iconBox); }
    iconBox.layoutMode = 'HORIZONTAL'; iconBox.layoutWrap = 'WRAP'; iconBox.itemSpacing = 32; iconBox.counterAxisSpacing = 32;
    iconBox.paddingTop = iconBox.paddingBottom = iconBox.paddingLeft = iconBox.paddingRight = 48;
    iconBox.primaryAxisSizingMode = 'FIXED'; iconBox.counterAxisSizingMode = 'AUTO'; iconBox.resize(720, iconBox.height);
    iconBox.cornerRadius = 24; iconBox.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    const icons = {}; iconPage.findAll(n => n.type === 'COMPONENT' && n.name.startsWith('Icon / ')).forEach(c => icons[c.name] = c);
    let iconMade = 0, iconInst = 0;
    const iconNodes = root.findAll(n => (n.type === 'FRAME' || n.type === 'GROUP') && / ?Icon \/ [\w-]+$/.test(n.name));
    for (const n of iconNodes) {
      if (n.removed) continue;
      const nm = 'Icon / ' + n.name.split('Icon / ')[1];
      try {
        if (!icons[nm]) {
          const cl = n.clone(); iconBox.appendChild(cl);
          const c = figma.createComponentFromNode(cl); c.name = nm;
          c.findAll(x => 'constraints' in x).forEach(x => { try { x.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }; } catch (e) {} });
          c.resize(24, 24); c.fills = [];
          for (const x of c.findAll(x => x.type === 'VECTOR')) {
            const fixP = ps => Array.isArray(ps) ? ps.map(p => p.type === 'SOLID' && !(p.boundVariables && p.boundVariables.color) ? { ...p, color: { r: .07, g: .08, b: .09 } } : p) : ps;
            try { x.fills = fixP(x.fills); x.strokes = fixP(x.strokes); } catch (e) {}
          }
          icons[nm] = c; iconMade++;
        }
        const i = icons[nm].createInstance(); place(i, n);
        try { i.resize(n.width, n.height); } catch (e) {}
        const a = n.findAll(x => x.type === 'VECTOR'), b = i.findAll(x => x.type === 'VECTOR');
        if (a.length === b.length) for (let k = 0; k < a.length; k++) { try { b[k].fills = a[k].fills; b[k].strokes = a[k].strokes; } catch (e) {} }
        n.remove(); iconInst++;
      } catch (e) { fail++; }
    }
    [...iconBox.children].sort((p, q) => p.name.localeCompare(q.name)).forEach((c, k) => iconBox.insertChild(k, c));
    step = '컴포넌트 찾기';
    const labelOf = n => { let r = n.name; const i = r.indexOf(' - '); if (i >= 0) r = r.slice(i + 3); if (!/ \| /.test(r) || /:margin$/.test(r)) return null; return r.replace(/:[a-z-]+$/, ''); };
    const depth = n => { let d = 0, p = n.parent; while (p && p !== root) { d++; p = p.parent; } return d; };
    const sig = n => n.type + (('children' in n) ? '(' + n.children.map(sig).join(',') + ')' : '');
    const items = root.findAll(n => (n.type === 'FRAME' || n.type === 'GROUP') && labelOf(n)).map(n => ({ n, l: labelOf(n), d: depth(n), dk: inDark(n) }));
    items.sort((a, b) => b.d - a.d || a.dk - b.dk);
    const stage = figma.createFrame(); stage.name = '_stage'; page.appendChild(stage); stage.fills = [];
    const reg2 = {}; // label -> [{sig, main}]
    let made = 0, inst = 0;
    for (const it of items) {
      const n = it.n; if (n.removed) continue;
      try {
        const sg = sig(n); const list = reg2[it.l] = reg2[it.l] || [];
        let e = list.find(x => x.sig === sg);
        if (!e) {
          const cl = n.clone(); stage.appendChild(cl);
          const c = figma.createComponentFromNode(cl);
          e = { sig: sg, main: c, n: list.length + 1 }; list.push(e); made++;
        }
        const i = e.main.createInstance(); place(i, n);
        const a = n.findAll(x => x.type === 'TEXT'), b = i.findAll(x => x.type === 'TEXT');
        if (a.length === b.length) for (let k = 0; k < a.length; k++) if (a[k].characters !== b[k].characters) { try { for (const f of b[k].getRangeAllFontNames(0, b[k].characters.length)) await load(f); b[k].characters = a[k].characters; } catch (e2) {} }
        n.remove(); inst++;
      } catch (e) { fail++; }
    }

    step = '변형 세트';
    const allC = await figma.variables.getLocalVariablesAsync('COLOR');
    const CC = cols.find(c => c.name === '3 · Component');
    const comp = CC ? allC.filter(v => v.variableCollectionId === CC.id) : [];
    const cmode = CC && CC.modes[0].modeId, alias = {}; comp.forEach(v => { const a = v.valuesByMode[cmode]; if (a && a.id) alias[v.name] = a.id; });
    const TK = { 'button': 'button', 'input': 'input', 'search': 'search', 'select': 'select', 'chip': 'chip', 'checkbox': 'checkbox', 'radio': 'radio', 'switch': 'switch', 'card': 'card', 'list item': 'list', 'swipe item': 'list', 'bottom sheet': 'sheet', 'top bar': 'top-bar', 'icon button': 'icon-button', 'dialog': 'dialog', 'toast': 'toast', 'avatar': 'avatar', 'avatar group': 'avatar', 'fab': 'fab', 'menu': 'menu', 'skeleton': 'skeleton', 'skeleton card': 'skeleton', 'progress bar': 'progress', 'progress ring': 'progress', 'spinner': 'progress', 'slider': 'slider', 'range slider': 'slider', 'stepper': 'stepper', 'date picker': 'date-picker', 'time chips': 'chip', 'timeline': 'timeline', 'kpi card': 'chart', 'chart card': 'chart', 'section header': 'section-header', 'divider': 'divider', 'accordion': 'accordion', 'segmented': 'segmented', 'tabs': 'tab', 'bottom nav': 'bottom-nav', 'counter': 'counter', 'textarea': 'textarea' };
    const VW = { primary: 'primary', secondary: 'secondary', tertiary: 'tertiary', ghost: 'ghost', danger: 'danger', '비활성': 'disabled', '선택': 'selected', '켜짐': 'on', '포커스': 'focus', '호버': 'hover', '오류': 'error', '열림': 'open' };
    const pick = (ck, vs, role, id) => { const c = Object.keys(alias).filter(n => n.startsWith(ck + '/') && n.endsWith('/' + role) && alias[n] === id); if (!c.length) return null; for (const v of vs) { const m = c.find(n => n.split('/')[1] === v); if (m) return m; } return c.find(n => n.split('/')[1] === 'default') || c[0]; };
    let bound = 0;
    const groups = {};
    for (const [l, list] of Object.entries(reg2)) { const nm = l.split(' | ')[0]; (groups[nm] = groups[nm] || []).push(...list.map(e => ({ l, e, multi: list.length > 1 }))); }
    const lib = figma.createFrame(); lib.name = '컴포넌트 라이브러리'; page.appendChild(lib);
    lib.layoutMode = 'VERTICAL'; lib.itemSpacing = 120; lib.paddingTop = lib.paddingBottom = lib.paddingLeft = lib.paddingRight = 96;
    lib.primaryAxisSizingMode = 'AUTO'; lib.counterAxisSizingMode = 'AUTO'; lib.cornerRadius = 32; lib.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    let sets = 0;
    for (const nm of Object.keys(groups).sort()) {
      const list = groups[nm], ck = TK[nm.toLowerCase()];
      const anyEx = list.some(x => x.multi);
      for (const x of list) {
        let props = x.l.split(' | ')[1];
        if (anyEx) props += ', 예시=' + (x.multi ? x.e.n : 1);
        x.e.main.name = props;
        if (ck) { const vs = props.toLowerCase().split(/[,=·]/).map(s => VW[s.trim()] || s.trim());
          for (const y of [x.e.main, ...x.e.main.findAll(() => true)]) for (const prop of ['fills', 'strokes']) { if (!(prop in y) || y.type === 'INSTANCE') continue; const ps = y[prop]; if (!Array.isArray(ps)) continue; let ch = false;
            const np = ps.map(p => { const b = p.boundVariables && p.boundVariables.color; if (!b) return p; const role = prop === 'strokes' ? 'border' : (y.type === 'TEXT' ? 'foreground' : 'background'); const t = pick(ck, vs, role, b.id); if (!t || alias[t] === undefined) return p; const v = comp.find(q => q.name === t); if (!v || v.id === b.id) return p; ch = true; bound++; return figma.variables.setBoundVariableForPaint(p, 'color', v); });
            if (ch) y[prop] = np; } }
      }
      const g = figma.createFrame(); g.name = nm; g.layoutMode = 'VERTICAL'; g.itemSpacing = 16; g.fills = []; g.primaryAxisSizingMode = 'AUTO'; g.counterAxisSizingMode = 'AUTO'; lib.appendChild(g);
      const t = figma.createText(); t.fontName = bold; t.characters = nm; t.fontSize = 32; g.appendChild(t);
      const d = figma.createText(); d.fontName = reg; d.fontSize = 16; d.fills = [{ type: 'SOLID', color: { r: .42, g: .45, b: .5 } }];
      d.characters = `변형 ${list.length}개` + (ck ? ` · 토큰 3 · Component / ${ck}` : ''); g.appendChild(d);
      const mains = list.map(x => x.e.main);
      for (const m of mains) g.appendChild(m);
      let set;
      try { set = figma.combineAsVariants(mains, g); } catch (e) { continue; }
      set.name = nm; sets++;
      set.layoutMode = 'HORIZONTAL'; set.layoutWrap = 'WRAP'; set.itemSpacing = 32; set.counterAxisSpacing = 32;
      set.paddingTop = set.paddingBottom = set.paddingLeft = set.paddingRight = 40; set.counterAxisAlignItems = 'MIN';
      set.primaryAxisSizingMode = 'FIXED'; set.counterAxisSizingMode = 'AUTO';
      const maxW = Math.max(...mains.map(m => m.width)); set.resize(Math.max(1200, maxW + 80), set.height);
      set.cornerRadius = 16; set.strokes = [{ type: 'SOLID', color: { r: .59, g: .28, b: 1 } }]; set.dashPattern = [8, 6]; set.strokeWeight = 2;
    }
    if (nav) { const g = figma.createFrame(); g.name = 'Navigation'; g.layoutMode = 'VERTICAL'; g.itemSpacing = 16; g.fills = []; g.primaryAxisSizingMode = 'AUTO'; g.counterAxisSizingMode = 'AUTO'; lib.appendChild(g); const t = figma.createText(); t.fontName = bold; t.characters = 'Navigation / Bottom tab'; t.fontSize = 32; g.appendChild(t); g.appendChild(nav); }
    stage.remove();

    step = '쇼케이스 배치';
    const secs = [...root.children];
    for (const s of secs) {
      const h = s.findOne(n => n.type === 'TEXT' && n.parent && /Heading 2/.test(n.parent.name));
      s.name = '컴포넌트 / ' + (h ? h.characters : s.name);
      const ax = s.absoluteTransform[0][2], ay = s.absoluteTransform[1][2];
      page.appendChild(s); s.x = ax; s.y = ay;
      try { s.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]; } catch (e) {}
    }
    root.remove();
    lib.x = 0; lib.y = 0;
    const X0 = lib.width + 400, G = 160; let x = X0, y = 0, rowH = 0, i = 0;
    for (const s of secs) { if (i && i % 4 === 0) { x = X0; y += rowH + G; rowH = 0; } s.x = x; s.y = y; x += s.width + G; rowH = Math.max(rowH, s.height); i++; }
    figma.viewport.scrollAndZoomIntoView([lib]);
    figma.closePlugin(`아이콘 ${iconMade}종 · 아이콘 인스턴스 ${iconInst} · 원본 ${made}개 · 세트 ${sets}개 · 인스턴스 ${inst}곳 · 토큰 ${bound} · 실패 ${fail}`);
  } catch (e) { figma.closePlugin(`오류(${step}): ` + ((e && e.message) || String(e))); }
})();
} else {
// 고객 메뉴 캡처 화면을 섹션 2개(목록 · 상세)로 배치하고,
// 상태바를 iPhone 컴포넌트로 바꾸고, 하단 내비를 컴포넌트로 바꾸고, 텍스트 스타일을 입힌다.
const PAGE = '44:221', HOME = '56:2', STATUSBAR = '60:111';
const FAMILY = 'Pretendard Variable';
const GROUPS = [
  { name: '일정', nav: '일정', desc: '하단 탭 "일정" → 월간 달력. 상단·하단 버튼을 누르면 오른쪽 화면들이 열립니다.', items: [
    ['일정 / 01 월간', '일정 월간', '진입: 하단 탭 "일정"'],
    ['일정 / 02 월 선택', '월 선택', '여는 곳: 상단 "2026. 11." 날짜'],
    ['일정 / 03 검색', '검색', '여는 곳: 상단 돋보기'],
    ['일정 / 04 캠페인 선택', '캠페인 선택', '여는 곳: 필터 "캠페인"'],
    ['일정 / 05 담당자 필터', '담당자 필터', '여는 곳: 필터 "담당자"'],
    ['일정 / 06 휴가 등록', '휴가 등록', '여는 곳: "휴가 등록"'],
    ['일정 / 07 일정 등록', '일정 등록', '여는 곳: 오른쪽 아래 + 버튼'],
    ['일정 / 08 일정 수정', '일정 수정', '여는 곳: 일정 카드 "수정"'] ] },
  { name: '멤버', nav: '멤버', desc: '하단 탭 "멤버" → 멤버 목록. 목록 안 항목을 누르면 오른쪽 화면들이 열립니다.', items: [
    ['멤버 / 01 멤버 목록', '멤버 목록', '진입: 하단 탭 "멤버"'],
    ['멤버 / 02 캠페인별 팀', '캠페인별 팀', '여는 곳: 상단 탭 "캠페인별 팀"'],
    ['멤버 / 03 공통 팀 적용', '공통 팀 적용', '여는 곳: 캠페인 카드'],
    ['멤버 / 04 리드 나누기', '리드 나누기', '여는 곳: "리드 나누기" 카드'],
    ['멤버 / 05 멤버 추가', '멤버 추가', '여는 곳: "+ 멤버 추가"'],
    ['멤버 / 06 역할 편집', '역할 편집', '여는 곳: 멤버 행'],
    ['멤버 / 07 멤버 검색', '멤버 검색', '여는 곳: 상단 "멤버 검색"'] ] } ];
const W = 390, GAP = 80, MAIN_GAP = 200, TOP = 220, PAD = 80;
const SIZE_TOKEN = { 10: 'micro', 12: 'caption', 14: 'body-m', 16: 'body-l', 18: 'title-m', 20: 'title-l', 24: 'display', 28: 'display-l' };
const WEIGHT_TOKEN = { regular: 'regular', semibold: 'semibold', bold: 'bold' };
const norm = s => String(s).replace(/\s+/g, '').toLowerCase();
const r1 = n => Math.round(n * 10) / 10;
let step = '시작';

(async () => {
  try {
    step = '준비';
    const page = await figma.getNodeByIdAsync(PAGE); await page.loadAsync();
    const avail = (await figma.listAvailableFontsAsync()).map(f => f.fontName);
    const fonts = {};
    for (const w of Object.keys(WEIGHT_TOKEN)) { const f = avail.find(x => x.family === FAMILY && norm(x.style) === w); if (!f) throw new Error(`${FAMILY} ${w} 없음`); await figma.loadFontAsync(f); fonts[w] = f; }
    const home = await figma.getNodeByIdAsync(HOME);
    const sb = await figma.getNodeByIdAsync(STATUSBAR);
    const sbMain = sb && sb.type === 'INSTANCE' ? await sb.getMainComponentAsync() : null;
    const compPage = figma.root.children.find(p => p.name === '컴포넌트'); if (compPage) await compPage.loadAsync();
    const navSet = (compPage || page).findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Navigation / Bottom tab');

    // 못 끝난 이전 캡처(이름이 그대로인 것) 정리
    step = '남은 캡처 정리';
    let removed = 0;
    for (const n of [...page.children]) if (n.type === 'FRAME' && n.name.startsWith('Container (DS')) { n.remove(); removed++; }

    // 이전에 만든 같은 이름 섹션은 지우고 다시 만든다(화면은 꺼내서 보존)
    for (const g of GROUPS) for (const s of page.children.filter(n => n.type === 'SECTION' && n.name === g.name)) {
      for (const c of [...s.children]) if (c.type === 'FRAME') page.appendChild(c);
      s.remove();
    }

    step = '텍스트 스타일 준비';
    const styles = await figma.getLocalTextStylesAsync();
    const vars = await figma.variables.getLocalVariablesAsync('FLOAT');
    const vByName = n => vars.find(v => v.name.endsWith('/' + n));
    const styleFor = (size, w, lh, ls) => {
      const base = `Text/${SIZE_TOKEN[size]}/${WEIGHT_TOKEN[w]}`;
      const cand = styles.filter(s => s.name === base || s.name.startsWith(base + ' · '));
      const match = cand.find(s => s.fontSize === size && norm(s.fontName.style) === w &&
        (lh ? (s.lineHeight.unit === 'PIXELS' && s.lineHeight.value === Math.round(size * lh / 100)) : s.lineHeight.unit === 'AUTO') && r1(s.letterSpacing.value) === ls);
      if (match) return match;
      const st = figma.createTextStyle();
      const baseExists = styles.some(s => s.name === base);
      st.name = baseExists ? `${base} · lh${lh} ls${ls}` : base;
      st.fontName = fonts[w]; st.fontSize = size;
      st.lineHeight = lh ? { unit: 'PIXELS', value: Math.round(size * lh / 100) } : { unit: 'AUTO' };
      st.letterSpacing = { unit: 'PIXELS', value: ls };
      st.description = `var(--fs-${SIZE_TOKEN[size]}) · var(--fw-${WEIGHT_TOKEN[w]}) · 줄 간격 ${lh}% · 자간 ${ls}px`;
      const fs = vByName('fs-' + SIZE_TOKEN[size]); if (fs) try { st.setBoundVariable('fontSize', fs); } catch (e) {}
      styles.push(st); return st;
    };

    const label = (s, size, bold, rgb) => { const t = figma.createText(); t.fontName = fonts[bold ? 'bold' : 'regular']; t.characters = s; t.fontSize = size; t.fills = [{ type: 'SOLID', color: rgb || { r: .07, g: .08, b: .09 } }]; return t; };

    let y0 = Math.max(...page.children.filter(n => n.name.startsWith('고객')).map(n => n.y + n.height)) + 240, placed = 0, sbSwapped = 0, navSwapped = 0, linked = 0, missing = [];
    for (const g of GROUPS) {
      step = g.name + ' 섹션';
      const sec = figma.createSection(); sec.name = g.name; page.appendChild(sec);
      sec.x = home ? home.x : 0; sec.y = y0;
      let x = PAD, maxH = 0;
      for (let i = 0; i < g.items.length; i++) {
        const [fname, title, trig] = g.items[i], isMain = i === 0;
        const f = page.findOne(n => n.type === 'FRAME' && n.name === fname && (n.parent.type === 'PAGE' || n.parent.type === 'SECTION'));
        if (!f) { missing.push(fname); continue; }
        try {
        // 글꼴 이름 맞추기(서버 캡처 'Semi Bold' → 설치 'SemiBold')
        // 글자 덩어리 안에 없는 글꼴이 섞여 있으면 한 번에 안 바뀌므로, 더 바뀌는 게 없을 때까지 여러 번 돈다
        for (let pass = 0; pass < 6; pass++) {
          let changed = 0;
          for (const t of f.findAllWithCriteria({ types: ['TEXT'] })) {
            for (const s of t.getStyledTextSegments(['fontName'])) {
              const w = norm(s.fontName.style);
              if (fonts[w] && (s.fontName.family !== FAMILY || s.fontName.style !== fonts[w].style)) {
                try { t.setRangeFontName(s.start, s.end, fonts[w]); changed++; } catch (e) {}
              }
            }
            // 그래도 안 되면 글자 전체를 굵기별로 다시 입힌다
            if (t.hasMissingFont) {
              try {
                const segs = t.getStyledTextSegments(['fontName']);
                t.fontName = fonts.regular;
                for (const s of segs) { const w = norm(s.fontName.style); if (fonts[w]) t.setRangeFontName(s.start, s.end, fonts[w]); }
                changed++;
              } catch (e) {}
            }
          }
          if (!changed) break;
        }
        // 상태바 교체
        const top = f.children[0];
        if (sbMain && top && top.type !== 'INSTANCE' && top.findOne(n => n.type === 'TEXT' && n.characters === '9:41')) {
          const h0 = f.height, oh = top.height; top.remove();
          const inst = sbMain.createInstance(); f.insertChild(0, inst);
          try { inst.layoutSizingHorizontal = 'FILL'; } catch (e) {}
          const d = inst.height - oh;
          if (Math.round(h0) > 900) { // 전체 스크롤 화면: 높이를 늘리고 아래 고정 요소도 같이 내린다
            f.children.filter(c => c.layoutPositioning === 'ABSOLUTE').forEach(c => c.y += d);
            if (f.layoutMode !== 'NONE' && f.primaryAxisSizingMode === 'FIXED') f.resize(f.width, h0 + d);
          } // 844 화면: 높이 유지, 딤·시트·하단 탭 위치 그대로
          sbSwapped++;
        }
        // 하단 내비 교체(있을 때만)
        const navV = navSet ? navSet.children.find(c => c.name === 'Active=' + g.nav) : null;
        const nav = navV && f.findOne(n => n.type === 'FRAME' && n.name === 'Navigation');
        if (nav) {
          const inst = navV.createInstance(), p = nav.parent, idx = p.children.indexOf(nav), nx = nav.x, ny = nav.y;
          p.insertChild(idx, inst);
          if (p.layoutMode && p.layoutMode !== 'NONE') inst.layoutPositioning = 'ABSOLUTE';
          inst.x = nx; inst.y = ny; inst.constraints = { horizontal: 'CENTER', vertical: 'MAX' };
          nav.remove(); navSwapped++;
        }
        // 텍스트 스타일
        for (const t of f.findAllWithCriteria({ types: ['TEXT'] })) {
          for (const s of t.getStyledTextSegments(['fontName', 'fontSize', 'lineHeight', 'letterSpacing'])) {
            const w = norm(s.fontName.style); if (!WEIGHT_TOKEN[w] || !SIZE_TOKEN[s.fontSize]) continue;
            const lh = s.lineHeight.unit === 'PIXELS' ? Math.round(s.lineHeight.value / s.fontSize * 100) : (s.lineHeight.unit === 'PERCENT' ? Math.round(s.lineHeight.value) : 0);
            const ls = s.letterSpacing.unit === 'PIXELS' ? r1(s.letterSpacing.value) : r1(s.letterSpacing.value * s.fontSize / 100);
            const st = styleFor(s.fontSize, w, lh, ls);
            try { await t.setRangeTextStyleIdAsync(s.start, s.end, st.id); linked++; } catch (e) {}
          }
        }
        // 배치
        sec.appendChild(f); f.x = x; f.y = TOP;
        const t1 = label(title, 28, true, { r: 1, g: 1, b: 1 }); sec.appendChild(t1); t1.x = x; t1.y = TOP - 100;
        const t2 = label(trig, 16, false, { r: .71, g: .73, b: .77 }); sec.appendChild(t2); t2.x = x; t2.y = TOP - 52;
        maxH = Math.max(maxH, f.height); placed++;
        } catch (e) { missing.push(fname + '(' + ((e && e.message) || e).toString().slice(0, 60) + ')'); continue; }
        x += W + (isMain ? MAIN_GAP : GAP);
        if (isMain) { const a = label('→', 56, true, { r: .17, g: .44, b: .95 }); sec.appendChild(a); a.x = x - MAIN_GAP / 2 - 20; a.y = TOP + 380; }
      }
      const h = label(g.desc, 20, false, { r: .84, g: .85, b: .88 }); sec.appendChild(h); h.x = PAD; h.y = 32;
      sec.resizeWithoutConstraints(x - GAP + PAD, TOP + maxH + PAD);
      y0 += sec.height + 240;
    }
    figma.closePlugin(`배치 ${placed} · 상태바 ${sbSwapped} · 내비 ${navSwapped} · 스타일 연결 ${linked} · 정리 ${removed}` + (missing.length ? ` · 못 찾음: ${missing.join(', ')}` : ''));
  } catch (e) {
    figma.closePlugin(`오류(${step}): ` + ((e && e.message) || String(e)));
  }
})();

}
