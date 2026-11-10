
/* =====================================================================
   페이지 틀
   ===================================================================== */
const REG = {};
function ProtoHost({id, p, children}) {
  REG[id] = p;
  return children;
}
const ISSUE = {
  L1: '목록 카드 메타가 실제 데이터와 다름', L5: '적용된 필터가 목록에 안 보임', S2: '성격이 다른 분류(단계·등급·상품)가 상태 하나에 섞임', S1: '상태 시트 마지막 항목이 탭바에 가려짐',
  F1: '정렬이 필터 안에 섞여 있음', F3: '담당자 필터에 「전체」만 있음', F2: '관심도와 상태 상·중·하가 중복', D1: '보기와 수정이 분리되지 않음 (저장 버튼 없음)', D2: '고객 삭제가 스크롤 끝 일반 카드',
  D4: 'AI 통화는 있는데 통화 이력은 「없어요」', D5: '상담·입금 양식을 메모에 직접 타이핑', D8: 'AI 다음 행동 제안이 화면 중간에 묻힘', D9: '가장 큰 버튼이 「내페이지 공유」',
  D12: '타임라인 형식 불일치 · 빈 항목', D16: '입금 기록도 메모처럼 바로 수정·삭제', N1: '같은 통화가 화면마다 다르게 나옴', N3: '재통화에 「언제」가 없음', N4: '부재중 시도 횟수 · 시각이 없음',
  N5: '통화 결과를 메모로 한 번 더 입력', N9: '검색 결과가 숨은 탭 안에서만 나옴', Q1: '검색 전용 화면 없음', N6: '유입 경로를 보거나 고칠 곳 없음',
};
const COMMON = [
  ['상태 12종은 그대로, 4묶음으로', '영업 단계 5 · 결과 3 · 관심 등급 3 · 상품 1. 항목을 하나도 줄이지 않고 성격별로 나눠 보여 줘요.', ['S2', 'S1']],
  ['적용된 필터는 목록 위에 항상', '고른 조건이 토큰으로 남고 하나씩 지울 수 있어요. 정렬은 필터와 분리했어요.', ['L5', 'F1']],
  ['필터 항목 전부 유지', '담당자 4 · 관심도 3 · 플랫폼 7 · 캠페인 12(검색) · 등록일 5 + 정렬 5. 담당자는 실제로 고를 수 있어요.', ['F3']],
  ['카드에 진짜 「다음 할 일」', '예약 없음 · 최근통화 없음 같은 고정 문구 대신 다음 할 일, 최근 연락, 시도 횟수를 보여 줘요.', ['L1', 'N1', 'N4']],
  ['보기와 수정 분리', '상세는 읽기 전용, 「수정」을 눌러야 입력칸이 열리고 저장 버튼으로 확정해요.', ['D1']],
  ['양식은 입력칸으로', '상담 기록 · 입금 · 일정은 칸이 있는 기록으로 남기고, 입금은 계약 정보에 모아요.', ['D5', 'D16']],
  ['통화 결과 한 번에', '통화 후 결과 · 재통화 시각 · 관심없음 사유를 시트에서 바로 고르면 단계와 타임라인이 함께 바뀌어요.', ['N3', 'N5']],
  ['AI 다음 행동을 위로', 'AI 요약 · 제안 · 키워드를 상세 위쪽에 두고, 통화 기록은 한곳에 모아요.', ['D8', 'D4']],
  ['검색은 전체에서', '검색하면 상태 탭과 관계없이 전체 고객에서 찾고, 범위를 함께 알려 줘요.', ['N9', 'Q1']],
  ['삭제는 더보기 안 · 확인 · 휴지통', '스크롤 끝 빨간 카드 대신 더보기 메뉴에서, 확인 후 휴지통으로 옮겨요.', ['D2', 'D9']],
];
const CONCEPTS = [
  {id: 'A', name: '파이프라인 보드', theme: 'neutral', themeName: 'Neutral', font: 'Figtree', C: ConceptA,
    tag: '영업 단계를 퍼널로. 지금 어느 단계에 몇 명이 있는지가 첫 화면.',
    who: '단계 관리가 중요한 팀장 · 실장, 현재 앱에 익숙한 사용자',
    idea: ['상단 퍼널 5칸(미지정→정계약)을 눌러 바로 거르기', '결과 3종은 칩, 등급·상품은 묶음 시트로', '목록 ↔ 칸반 보드 전환', '상세 맨 위에 단계 진행 표시 + 하단 고정 액션 바(전화·문자·결과·기록)'],
    fix: ['S2', 'L5', 'L1', 'D1', 'D2'], comps: ['Heading', 'TextInput', 'ToggleButton', 'SegmentedControl', 'ClickableCard', 'Badge', 'Token', 'Banner', 'Card', 'MetadataList', 'ProgressBar', 'Collapsible', 'List'],
    pros: ['지금 앱 구조와 가장 가까워 학습 부담이 적음', '단계 이동이 한눈에 보임'], cons: ['오늘 할 일은 사용자가 직접 찾아야 함'],
    jumps: [['목록', {scr: 'list', id: null, sheet: null}], ['보드 보기', {scr: 'list', view: 'board', sheet: null}], ['상세 · 가계약', {scr: 'detail', id: 5, sheet: null}], ['상세 · 재통화', {scr: 'detail', id: 3, sheet: null}], ['필터', {sheet: 'filter'}], ['상태 12종', {sheet: 'status'}], ['통화 결과', {scr: 'detail', id: 4, sheet: 'result'}], ['정보 수정', {scr: 'detail', id: 5, sheet: 'edit'}], ['삭제 확인', {scr: 'detail', id: 5, sheet: 'more'}]]},
  {id: 'B', name: '오늘 할 일', theme: 'butter', themeName: 'Butter', font: 'Outfit · Sarina', C: ConceptB,
    tag: '첫 화면이 「지금 누구에게 전화할지」. 고객 목록은 그다음.',
    who: '하루 수십 통을 거는 상담사, 신규 입사자',
    idea: ['지금 연락 · 오늘 방문 · 부재 재시도 · 계약 일정으로 할 일을 묶음', '카드마다 이유 + AI 제안 + 바로 전화', '부재중은 시도 횟수 막대로', '전체 고객(12종 상태 · 필터)은 한 번 더 들어가서'],
    fix: ['N3', 'N4', 'L1', 'D8', 'N5'], comps: ['Heading(display)', 'Card(variant)', 'Badge', 'ProgressBar', 'Button', 'ClickableCard', 'IconButton', 'TextInput', 'ToggleButton'],
    pros: ['신규 리드 응대 속도가 빨라짐', '처음 쓰는 사람도 바로 할 일을 앎'], cons: ['전체 고객 탐색은 한 단계 더 깊어짐', '「할 일」 계산 규칙을 서버에서 정해야 함'],
    jumps: [['오늘 할 일', {scr: 'today', id: null, sheet: null}], ['전체 고객', {scr: 'all', sheet: null}], ['상세 · 방문 예약', {scr: 'detail', id: 4, sheet: null, from: 'today'}], ['통화 결과', {scr: 'today', id: 3, sheet: 'result'}], ['필터', {scr: 'all', sheet: 'filter'}], ['고객 등록', {sheet: 'add'}]]},
  {id: 'C', name: 'AI 브리핑', theme: 'y2k', themeName: 'Y2K', font: 'Poppins · Crimson Text', C: ConceptC,
    tag: 'AI 통화 요약을 주인공으로. 고객을 열기 전에 무엇을 할지 먼저 안다.',
    who: 'AI 통화 녹음을 적극적으로 쓰는 팀, 고객 수가 많은 담당자',
    idea: ['자연어로 고객 찾기 + 추천 질문', 'AI가 고른 오늘의 우선순위 3명', '카드에 AI 요약 한 줄 + 관심 신호', '상세 위에 AI 브리핑(니즈 · 다음 행동 · 문자 초안)', '통화 내용으로 상담 기록을 미리 채워 확인만'],
    fix: ['D8', 'D5', 'N5', 'N9', 'D4'], comps: ['TextInput(AI)', 'Token', 'Card(purple)', 'Item', 'Avatar', 'ProgressBar', 'MetadataList', 'Divider', 'Collapsible', 'TextArea'],
    pros: ['이 앱만의 차별점(AI 통화)을 가장 잘 드러냄', '메모 재입력이 크게 줄어듦'], cons: ['AI 정확도에 대한 신뢰 · 검수 흐름이 필요', '관심 신호 점수 기준을 정의해야 함'],
    jumps: [['목록', {scr: 'list', id: null, sheet: null, q: ''}], ['AI 검색 예시', {scr: 'list', q: '한강뷰', sheet: null}], ['상세 · 방문 예약', {scr: 'detail', id: 4, sheet: null}], ['문자 초안', {scr: 'detail', id: 4, sheet: 'draft'}], ['상세 · 아파트먼트', {scr: 'detail', id: 9, sheet: null}], ['상태 12종', {scr: 'list', sheet: 'status'}]]},
  {id: 'D', name: '고밀도 리스트', theme: 'stone', themeName: 'Stone', font: 'Montserrat · Figtree', C: ConceptD,
    tag: '한 화면에 더 많은 고객. 숙련자를 위한 빠른 탐색과 일괄 작업.',
    who: '고객 수천 명을 관리하는 숙련 담당자 · 관리자',
    idea: ['2줄 행으로 한 화면에 8~10명', '상태 여러 개 동시 선택(다중 선택)', '「선택」 모드로 담당자 지정 · 단체 문자', '상세는 탭(개요·기록·통화·일정·정보), 정보 탭은 보기 모드'],
    fix: ['L5', 'F1', 'D1', 'S2', 'F3'], comps: ['TabList', 'Tab', 'CheckboxInput', 'ToggleButton', 'MetadataList', 'Banner', 'Divider', 'Button', 'IconButton'],
    pros: ['스크롤 양이 가장 적음', '관리자 업무(배정 · 단체 문자)에 강함'], cons: ['정보가 촘촘해 초보자에게는 부담'],
    jumps: [['목록', {scr: 'list', id: null, sheet: null}], ['상태 다중 선택', {sheet: 'status'}], ['상세 · 가계약', {scr: 'detail', id: 5, sheet: null}], ['필터', {sheet: 'filter'}], ['정렬', {sheet: 'sort'}], ['정보 수정', {scr: 'detail', id: 4, sheet: 'edit'}]]},
  {id: 'E', name: '현장 중심', theme: 'chocolate', themeName: 'Chocolate', font: 'Fraunces · Albert Sans', C: ConceptE,
    tag: '분양은 현장 단위로 움직인다. 현장을 먼저 고르고, 그 안에서 고객을.',
    who: '여러 현장을 동시에 맡는 담당자, 현장별 실적을 보는 실장',
    idea: ['현장 12곳을 퍼널 막대와 함께 카드로', '현장 안에서 상태 13개 탭(전체 + 12종)', '계약은 단계(1차 · 2차 · 정계약)로 구조화', '방문·상담 기록을 항목이 있는 카드로'],
    fix: ['D5', 'D16', 'S2', 'L1', 'D2'], comps: ['ClickableCard', 'Stepper', 'Step', 'TabList(scroll)', 'MetadataList', 'Token', 'Badge', 'Card', 'Collapsible'],
    pros: ['현장별 진행 상황이 바로 보임', '입금 · 방문 기록이 데이터가 됨'], cons: ['현장 1곳만 맡은 사람에겐 한 단계가 늘어남'],
    jumps: [['내 현장', {scr: 'sites', id: null, sheet: null}], ['현장 고객 목록', {scr: 'list', site: '덕소역 더블뷰한강', st: '전체', sheet: null}], ['상세 · 가계약', {scr: 'detail', id: 5, sheet: null}], ['입금 기록', {scr: 'detail', id: 5, sheet: 'pay'}], ['방문 기록 추가', {scr: 'detail', id: 4, sheet: 'record'}]]},
  {id: 'F', name: '대화형 타임라인', theme: 'matcha', themeName: 'Matcha', font: 'DM Sans · Playwrite', C: ConceptF,
    tag: '메신저처럼. 폼 응답 · 통화 · 메모 · 방문 · 입금이 한 흐름으로 쌓인다.',
    who: '카카오톡처럼 쓰는 걸 편하게 느끼는 담당자',
    idea: ['받은편지함처럼 마지막 접점 미리보기 + 새 리드 표시', '상세 = 대화 흐름 (시간순, 통화 카드에 AI 요약 · 녹음)', '아래 입력창으로 메모 바로, 양식은 칩으로', '다음 할 일은 상단 고정'],
    fix: ['N1', 'D4', 'D12', 'D5', 'N5'], comps: ['SegmentedControl', 'List', 'ListItem', 'Avatar', 'AvatarStatusDot', 'Token', 'Collapsible', 'TextInput', 'IconButton'],
    pros: ['흩어진 통화 · 메모 · 일정이 하나로 합쳐짐', '익숙한 메신저 패턴'], cons: ['단계 · 계약 같은 구조 정보는 정보 화면으로 한 번 더'],
    jumps: [['받은편지함', {scr: 'list', id: null, sheet: null}], ['대화 · 가계약', {scr: 'detail', id: 5, sheet: null}], ['대화 · 방문 예약', {scr: 'detail', id: 4, sheet: null}], ['고객 정보', {scr: 'info', id: 5, sheet: null}], ['상태 12종', {scr: 'list', sheet: 'status'}]]},
  {id: 'G', name: '현장 모드 (다크)', theme: 'gothic', themeName: 'Gothic', dark: true, font: 'Fustat · Manufacturing Consent', C: ConceptG,
    tag: '견본주택 · 이동 중 한 손으로. 큰 버튼, 다음 전화 → 결과 기록 → 다음 고객.',
    who: '현장에서 이동하며 연속으로 전화하는 담당자',
    idea: ['「다음 전화」 한 명만 크게, 대기열 순서대로', '전화 → 결과 시트(큰 버튼 6개) → 자동으로 다음 고객', '모든 터치 영역 48px 이상, 다크 화면', '상세는 접이식으로 필요한 것만 펼침'],
    fix: ['N3', 'N4', 'N5', 'L1'], comps: ['Card(purple)', 'Button(lg)', 'ToggleButton(lg)', 'List(spacious)', 'IconButton(lg)', 'Collapsible', 'Badge'],
    pros: ['연속 통화 속도가 가장 빠름', '야외 · 저조도에서 잘 보임'], cons: ['다크 고정 테마라 사무실 사용과 분위기 차이', '탐색보다 실행에 최적화'],
    jumps: [['현장 모드', {scr: 'list', id: null, sheet: null}], ['통화 결과(큰 버튼)', {scr: 'list', id: 3, sheet: 'result'}], ['상세', {scr: 'detail', id: 4, sheet: null}], ['상태 12종', {sheet: 'status'}]]},
];
const SW = [['accent', '--color-accent'], ['본문 배경', '--color-background-body'], ['카드', '--color-background-card'], ['글자', '--color-text-primary'], ['보조 글자', '--color-text-secondary'], ['테두리', '--color-border']];
function ThemeSwatch({c}) {
  return html`<div data-astryx-theme=${c.theme} style=${{colorScheme: c.dark ? 'dark' : 'light'}} class="ax-sw">
    <div class="ax-swrow">${SW.map(([l, v]) => html`<div key=${v} class="ax-swi"><i style=${{background: `var(${v})`}}></i><span>${l}</span></div>`)}</div>
    <div class="ax-swrow">${['blue', 'green', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow'].map(k => html`<i key=${k} class="ax-swc" style=${{background: `var(--color-background-${k})`, borderColor: `var(--color-border-${k})`}} title=${k}></i>`)}</div>
    <div class="ax-swtype"><span style=${{fontFamily: 'var(--font-family-heading)'}}>Aa 고객 관리</span><${Badge} label="가계약" variant="orange"/><${Button} size="sm" variant="primary" label="전화"/></div>
  </div>`;
}
function ConceptPage({c, j0}) {
  const P = c.C;
  useEffect(() => { if (j0 != null && c.jumps[j0]) { const t = setTimeout(() => jump(c.jumps[j0][1]), 60); return () => clearTimeout(t); } }, []);
  function jump(j) { const p = REG[c.id]; if (p) p.set(j); }
  return html`<div class="ax-cp">
    <div class="ax-cp-phone"><${P}/>
      <div class="ax-jumps"><${Text} size="sm" weight="semibold">화면 바로가기<//><div class="ax-wrap">${c.jumps.map(([l, j]) => html`<${Button} key=${l} size="sm" label=${l} onClick=${() => jump(j)}/>`)}</div></div>
    </div>
    <div class="ax-cp-info">
      <${Stack} direction="vertical" gap=${4}>
        <${Stack} direction="vertical" gap=${1}>
          <${Stack} direction="horizontal" gap=${2} vAlign="center"><${Badge} label=${'시안 ' + c.id} variant="info"/><${Text} size="sm" color="secondary">Astryx 테마 · ${c.themeName} · ${c.font}<//><//>
          <${Heading} level=${1}>${c.name}<//>
          <${Text} size="lg">${c.tag}<//>
        <//>
        <${Card}><${Stack} direction="vertical" gap=${2}><${Heading} level=${5}>이런 분께<//><${Text}>${c.who}<//><//><//>
        <${Card}><${Stack} direction="vertical" gap=${2}><${Heading} level=${5}>핵심 아이디어<//>
          <${List} listStyle="decimal" density="compact">${c.idea.map(t => html`<${ListItem} key=${t} label=${t}/>`)}<//><//><//>
        <${Card}><${Stack} direction="vertical" gap=${2}><${Heading} level=${5}>해결하는 문제 (현황 분석 ID)<//>
          <${List} density="compact">${c.fix.map(id => html`<${ListItem} key=${id} startContent=${html`<${Badge} label=${id} variant="red"/>`} label=${ISSUE[id] || id}/>`)}<//><//><//>
        <div class="ax-2col">
          <${Card}><${Stack} direction="vertical" gap=${2}><${Heading} level=${5}>좋은 점<//>${c.pros.map(t => html`<${Stack} key=${t} direction="horizontal" gap=${1.5} vAlign="start">${ic(H.CheckCircleIcon, {color: 'success', size: 'sm'})}<${Text} size="sm">${t}<//><//>`)}<//><//>
          <${Card}><${Stack} direction="vertical" gap=${2}><${Heading} level=${5}>고려할 점<//>${c.cons.map(t => html`<${Stack} key=${t} direction="horizontal" gap=${1.5} vAlign="start">${ic(H.ExclamationTriangleIcon, {color: 'warning', size: 'sm'})}<${Text} size="sm">${t}<//><//>`)}<//><//>
        </div>
        <${Card}><${Stack} direction="vertical" gap=${3}><${Heading} level=${5}>디자인 톤 · ${c.themeName} 테마 토큰<//><${ThemeSwatch} c=${c}/><//><//>
        <${Card}><${Stack} direction="vertical" gap=${2}><${Heading} level=${5}>사용한 Astryx 컴포넌트<//><div class="ax-wrap">${c.comps.map(t => html`<${Token} key=${t} size="sm" label=${t}/>`)}</div>
          <${Text} size="sm" color="secondary">휴대폰 안의 바텀시트 · 탭바 · 하단 액션 바는 Astryx 컴포넌트로 조립한 프로토타입 전용 틀이에요.<//><//><//>
      <//>
    </div>
  </div>`;
}
function Overview({go}) {
  return html`<${Stack} direction="vertical" gap=${6}>
    <${Stack} direction="vertical" gap=${2}>
      <${Heading} level=${1}>고객 탭 개선 디자인 시안 7종<//>
      <${Text} size="lg" color="secondary">Meta의 오픈소스 디자인 시스템 Astryx(v0.7.4)의 실제 컴포넌트와 테마 7종으로 만든 인터랙티브 시안이에요. 시안마다 컨셉(첫 화면에서 무엇을 가장 먼저 보여 줄지)과 테마를 다르게 했어요. 모든 데이터는 가상이고, 버튼을 눌러도 실제 앱에는 아무 일도 일어나지 않아요.<//>
    <//>
    <div class="ax-ov">${CONCEPTS.map(c => html`<div key=${c.id} data-astryx-theme=${c.theme} style=${{colorScheme: c.dark ? 'dark' : 'light'}} class="ax-ovc">
      <${ClickableCard} label=${c.name + ' 시안 보기'} padding=${4} onClick=${() => go(c.id)}>
        <${Stack} direction="vertical" gap=${2}>
          <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Badge} label=${'시안 ' + c.id} variant="neutral"/><${Text} size="xsm" color="secondary">${c.themeName}<//><//>
          <${Heading} level=${3}>${c.name}<//>
          <${Text} size="sm">${c.tag}<//>
          <${Stack} direction="horizontal" gap=${1} wrap="wrap">${c.fix.slice(0, 4).map(id => html`<${Token} key=${id} size="sm" color="red" label=${id}/>`)}<//>
          <${Text} size="xsm" color="secondary">추천: ${c.who}<//>
          <div><${Button} size="sm" variant="primary" label="열어 보기" onClick=${() => go(c.id)}/></div>
        <//>
      <//></div>`)}</div>
    <${Stack} direction="vertical" gap=${3}>
      <${Heading} level=${2}>모든 시안에 공통으로 적용한 개선<//>
      <${Text} color="secondary">현황 분석에서 찾은 문제를 기준으로 했어요. 상태 · 필터 항목은 하나도 줄이지 않았어요.<//>
      <div class="ax-common">${COMMON.map(([t, d, ids], i) => html`<${Card} key=${t}><${Stack} direction="vertical" gap=${1.5}>
        <${Stack} direction="horizontal" gap=${2} vAlign="center"><span class="ax-num">${i + 1}</span><${Heading} level=${5}>${t}<//><//>
        <${Text} size="sm">${d}<//><${Stack} direction="horizontal" gap=${1}>${ids.map(id => html`<${Token} key=${id} size="sm" color="red" label=${id} description=${ISSUE[id]}/>`)}<//><//><//>`)}</div>
    <//>
    <${Banner} status="info" title="이 파일은 인터넷이 필요해요" description="Astryx 컴포넌트 · 테마 · 폰트를 CDN(jsDelivr · esm.sh · Google Fonts)에서 불러와요. 오프라인에서는 화면이 뜨지 않아요."/>
  <//>`;
}
function Compare({go}) {
  const rows = [
    ['첫 화면', ['단계 퍼널 + 목록', '오늘 할 일', 'AI 우선순위 + AI 검색', '촘촘한 2줄 목록', '현장 카드', '받은편지함', '다음 전화 1명']],
    ['상태 12종 표현', ['퍼널 5 + 결과 칩 3 + 묶음 시트', '전체 고객에서 묶음 칩', '묶음 칩 가로 스크롤', '다중 선택 시트', '현장 안 13개 탭', '칩 + 묶음 시트', '큰 토글 버튼']],
    ['상세 구조', ['단계 진행 → 카드 섹션', '「지금 할 일」 먼저', 'AI 브리핑 먼저', '탭 5개', '계약 · 방문 기록 구조화', '대화 흐름', '접이식']],
    ['기록 방식', ['기록 시트(양식)', '기록 시트', 'AI가 미리 채움 → 확인', '기록 탭', '방문 · 상담 카드', '입력창 + 양식 칩', '결과 큰 버튼']],
    ['정보 밀도', ['보통', '낮음', '보통', '높음', '보통', '보통', '낮음']],
    ['처음 쓰는 사람', ['쉬움', '가장 쉬움', '쉬움', '어려움', '보통', '쉬움', '쉬움']],
    ['개발 난이도', ['낮음', '보통 (할 일 규칙)', '높음 (AI 추출)', '보통', '보통 (데이터 구조화)', '보통', '낮음']],
    ['Astryx 테마', CONCEPTS.map(c => c.themeName)],
  ];
  return html`<${Stack} direction="vertical" gap=${4}>
    <${Heading} level=${1}>시안 비교<//>
    <${Text} color="secondary">컨셉은 섞을 수 있어요. 예: 기본 구조는 A(파이프라인), 첫 화면은 B(오늘 할 일), 상세 위쪽은 C(AI 브리핑), 기록은 E(구조화).<//>
    <div class="ax-tblwrap"><${Table}>
      <${TableHeader}><${TableRow}><${TableHeaderCell}>항목<//>${CONCEPTS.map(c => html`<${TableHeaderCell} key=${c.id}><button class="ax-thb" onClick=${() => go(c.id)}>${c.id}. ${c.name}</button><//>`)}<//><//>
      <${TableBody}>${rows.map(([h, v]) => html`<${TableRow} key=${h}><${TableCell}><${Text} weight="semibold">${h}<//><//>${v.map((x, i) => html`<${TableCell} key=${i}><${Text} size="sm">${x}<//><//>`)}<//>`)}<//>
    <//></div>
    <${Card} variant="muted"><${Stack} direction="vertical" gap=${2}><${Heading} level=${4}>추천 조합 (의견)<//>
      <${Text}>1차 개편은 <b>A 파이프라인</b>을 뼈대로, 첫 화면에 <b>B 오늘 할 일</b> 요약을 얹고, 상세 위쪽에 <b>C AI 브리핑</b>을 두는 조합을 추천해요. 지금 앱 구조와 크게 다르지 않아 이전 비용이 낮고, 가장 큰 문제(메타 불일치 · 필터 표시 · 보기/수정 · AI 제안 위치)를 함께 풀 수 있어요. <b>E의 계약 · 방문 구조화</b>는 데이터 설계가 필요해 2차로 권해요.<//>
    <//><//>
  <//>`;
}
function App() {
  const ids = ['ov', ...CONCEPTS.map(c => c.id), 'cmp'];
  const [init, j0] = (location.hash || '').slice(1).split('/');
  const [tab, setTab] = useState(ids.includes(init) ? init : 'ov');
  const go = t => { setTab(t); try { history.replaceState(null, '', '#' + t); } catch (e) {} window.scrollTo({top: 0}); };
  const c = CONCEPTS.find(x => x.id === tab);
  return html`<div class="ax-page">
    <header class="ax-hdr">
      <div class="ax-hdr-in">
        <${Stack} direction="horizontal" hAlign="between" vAlign="center" wrap="wrap" gap=${2}>
          <${Stack} direction="vertical" gap=${0}><${Text} size="sm" color="secondary">영업비서 · 고객 탭 리디자인<//><${Heading} level=${3}>Astryx 디자인 시안<//><//>
          <${Text} size="xsm" color="secondary">Astryx 0.7.4 · 테마 7종 · 가상 데이터 · 2026-11-09<//>
        <//>
        <div class="ax-navtabs"><${TabList} value=${tab} onChange=${go} overflow="scroll" size="md">
          <${Tab} value="ov" label="개요"/>
          ${CONCEPTS.map(x => html`<${Tab} key=${x.id} value=${x.id} label=${`${x.id}. ${x.name}`}/>`)}
          <${Tab} value="cmp" label="비교"/>
        <//></div>
      </div>
    </header>
    <main class="ax-main">
      ${tab === 'ov' ? html`<${Overview} go=${go}/>` : tab === 'cmp' ? html`<${Compare} go=${go}/>` : html`<${ConceptPage} key=${c.id} c=${c} j0=${tab === init && j0 ? +j0 : null}/>`}
    </main>
  </div>`;
}
createRoot(document.getElementById('root')).render(html`<${App}/>`);
