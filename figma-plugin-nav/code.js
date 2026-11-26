// 홈 화면(56:2)의 하단 내비(56:554)를 컴포넌트 세트로 만들고, 홈에는 인스턴스로 바꿔 끼운다.
// 변형: Active = 홈 | 고객 | 일정 | 멤버 | 메뉴  (선택 탭은 흰색 100%, 나머지 55%)
const HOME = '56:2', NAV = '56:554', ON = 1, OFF = 0.55;
let step = '시작';
(async () => {
  try {
    step = '노드 찾기';
    const home = await figma.getNodeByIdAsync(HOME), base = await figma.getNodeByIdAsync(NAV);
    if (!home || !base) throw new Error('홈(56:2) 또는 내비(56:554)를 찾지 못했습니다');
    let page = home; while (page.type !== 'PAGE') page = page.parent;
    await page.loadAsync();
    const buttons = base.children.filter(c => c.type === 'FRAME');
    const labels = buttons.map(b => (b.findOne(n => n.type === 'TEXT') || {}).characters);
    if (buttons.length !== 5 || labels.some(l => !l)) throw new Error('내비 버튼 5개를 찾지 못했습니다: ' + labels.join(','));

    step = '변수 찾기';
    const colorVars = await figma.variables.getLocalVariablesAsync('COLOR');
    const fg = colorVars.find(v => v.name.endsWith('/text-on-inverse'));
    if (!fg) throw new Error('text-on-inverse 변수가 없습니다');
    const paint = op => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 }, opacity: op }, 'color', fg);

    step = '글꼴 불러오기';
    for (const t of base.findAllWithCriteria({ types: ['TEXT'] }))
      for (const s of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName);

    step = '변형 만들기';
    const comps = [];
    labels.forEach((label, i) => {
      const c = base.clone();
      page.appendChild(c);
      c.children.filter(x => x.type === 'FRAME').forEach((b, j) => {
        b.name = labels[j];
        for (const n of b.findAll(n => n.type === 'TEXT' || n.type === 'VECTOR')) n.fills = [paint(j === i ? ON : OFF)];
      });
      const comp = figma.createComponentFromNode(c);
      comp.name = 'Active=' + label;
      comps.push(comp);
    });
    const set = figma.combineAsVariants(comps, page);
    set.name = 'Navigation / Bottom tab';
    set.description = '하단 탭바. Active 속성으로 선택된 탭을 고릅니다. 색: bg-inverse 배경, text-on-inverse 글자·아이콘(비선택 55%). 코드: .cl-tab';
    set.layoutMode = 'VERTICAL'; set.itemSpacing = 24; set.paddingTop = set.paddingBottom = set.paddingLeft = set.paddingRight = 24;
    set.primaryAxisSizingMode = 'AUTO'; set.counterAxisSizingMode = 'AUTO';
    set.fills = [];
    set.x = home.x + home.width + 120; set.y = home.y;

    step = '홈에 인스턴스로 교체';
    const inst = comps[0].createInstance();
    const parent = base.parent, idx = parent.children.indexOf(base), x = base.x, y = base.y;
    parent.insertChild(idx, inst);
    if ('layoutPositioning' in inst && parent.layoutMode && parent.layoutMode !== 'NONE') inst.layoutPositioning = 'ABSOLUTE';
    inst.x = x; inst.y = y;
    inst.constraints = { horizontal: 'CENTER', vertical: 'MAX' };
    base.remove();

    figma.closePlugin(`컴포넌트 세트 ${set.id} (변형 ${comps.length}개) · 홈에 인스턴스 ${inst.id} 교체 완료`);
  } catch (e) {
    figma.closePlugin(`오류(${step}): ` + ((e && e.message) || String(e)));
  }
})();
