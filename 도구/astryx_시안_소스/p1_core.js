import * as React from 'react';
import {createRoot} from 'react-dom/client';
import htm from 'htm';
import * as X from '@astryxdesign/core';
import * as H from '@heroicons/react/24/outline';
const html = htm.bind(React.createElement);
const {useState, useMemo, useEffect, useRef, useCallback} = React;
const {Card, ClickableCard, Stack, Heading, Text, Button, IconButton, Badge, Token, TabList, Tab, SegmentedControl, SegmentedControlItem,
  List, ListItem, StatusDot, TextInput, TextArea, MetadataList, MetadataListItem, Avatar, ProgressBar, Banner, Divider, Icon,
  Stepper, Step, ToggleButton, Switch, Collapsible, Item, EmptyState, Skeleton, CheckboxInput, Table, TableHeader, TableBody, TableRow,
  TableHeaderCell, TableCell, Section} = X;

/* ================= 데이터 (모두 가상) ================= */
const TOTAL = 11430;
const STAGE = [
  {k:'미지정', n:296, c:'gray', d:'아직 연락하지 않은 신규 리드'},
  {k:'부재중', n:2810, c:'pink', d:'연락했지만 연결되지 않음'},
  {k:'방문 예약', n:422, c:'blue', d:'견본주택 방문 일정 확정'},
  {k:'가계약', n:48, c:'orange', d:'1차 계약금 입금'},
  {k:'정계약', n:15, c:'green', d:'본계약 체결'},
];
const RESULT = [
  {k:'재통화', n:771, c:'purple', d:'다시 연락하기로 함'},
  {k:'관심없음', n:2743, c:'gray', d:'관심 없음 · 번호 오류 포함'},
  {k:'타현장', n:253, c:'teal', d:'다른 현장에 관심'},
];
const GRADE = [
  {k:'상', n:564, c:'red', d:'관심 등급 상'},
  {k:'중', n:761, c:'yellow', d:'관심 등급 중'},
  {k:'하', n:2166, c:'cyan', d:'관심 등급 하'},
];
const PRODUCT = [{k:'아파트먼트', n:580, c:'blue', d:'상품 구분'}];
const ST_GROUPS = [
  {g:'영업 단계', hint:'고객은 단계 하나에 속해요', items:STAGE},
  {g:'결과 · 할 일', hint:'통화 결과로 붙는 표시', items:RESULT},
  {g:'관심 등급', hint:'관심도와 같은 값', items:GRADE},
  {g:'상품', hint:'관심 상품', items:PRODUCT},
];
const ALL_ST = ST_GROUPS.flatMap(g => g.items);
const stInfo = k => ALL_ST.find(s => s.k === k) || {k, c:'gray'};
const badgeV = c => (c === 'gray' ? 'neutral' : c);
const fmt = n => n.toLocaleString('ko-KR');

const PLATFORMS = ['메타', '네이버', '구글', '카카오', '직접', '내 페이지', '기타'];
const CAMP = ['PH1603', '덕소역 더블뷰한강', '북오산자이 드포레', '윤슬자이', '카시아 속초', '코르디아서울드래곤시티', '디애스턴 한남', '르엘 어퍼하우스', '소요한남', '에테르노 용산', '파크사이드', '기본 캠페인'];
const SORTS = ['등록일 최신순', '관심도', '최근 활동', '상태', '이름'];
const DATES = ['전체', '오늘', '최근 7일', '최근 30일', '직접설정'];
const OWNERS = ['박지훈 (나)', '이수진', '김태오', '최유리'];
const SITE_STAT = {
  'PH1603': [52, 410, 61, 9, 3], '덕소역 더블뷰한강': [38, 388, 74, 14, 5], '북오산자이 드포레': [41, 352, 58, 6, 2], '윤슬자이': [22, 301, 49, 7, 3],
  '카시아 속초': [18, 244, 31, 3, 0], '코르디아서울드래곤시티': [35, 290, 40, 4, 1], '디애스턴 한남': [27, 210, 39, 3, 1], '르엘 어퍼하우스': [19, 186, 27, 1, 0],
  '소요한남': [14, 150, 18, 1, 0], '에테르노 용산': [12, 131, 13, 0, 0], '파크사이드': [10, 98, 9, 0, 0], '기본 캠페인': [8, 60, 3, 0, 0],
};

const C = (o) => ({memos:[], calls:[], visits:[], tags:[], tl:[], tries:0, ...o});
const CUST0 = [
  C({id:1, name:'김하준', phone:'010-2481-0937', site:'덕소역 더블뷰한강', owner:'박지훈 (나)', reg:'11/9 09:12', regAgo:'18분 전', stage:'미지정', plat:'메타', age:'', sex:'',
    form:'[인스턴트 폼] 어떤 상담을 원하시나요? : 계약 조건 문의', next:{t:'첫 연락', at:'지금', urgent:true}, last:null,
    ai:null, lead:'1431 3292 5224 1309',
    tl:[{t:'lead', at:'11/9 09:12', title:'리드 등록', body:'메타 광고 · 덕소역 더블뷰한강'}, {t:'form', at:'11/9 09:12', title:'폼 응답', body:'어떤 상담을 원하시나요? : 계약 조건 문의'}]}),
  C({id:2, name:'서준우', phone:'010-7730-4412', site:'코르디아서울드래곤시티', owner:'박지훈 (나)', reg:'11/9 08:41', regAgo:'49분 전', stage:'미지정', plat:'구글',
    form:'[인스턴트 폼] 방문 상담 원하시나요? : 주말 방문 희망', next:{t:'첫 연락', at:'지금', urgent:true}, lead:'unified_7f2c…a91e',
    tl:[{t:'lead', at:'11/9 08:41', title:'리드 등록', body:'구글 광고 · 코르디아서울드래곤시티'}, {t:'form', at:'11/9 08:41', title:'폼 응답', body:'방문 상담 원하시나요? : 주말 방문 희망'}]}),
  C({id:3, name:'강예은', phone:'010-5521-8840', site:'윤슬자이', owner:'박지훈 (나)', reg:'11/2', stage:'미지정', result:'재통화', grade:'중', plat:'네이버', age:'40대', sex:'여',
    next:{t:'재통화', at:'오늘 14:00', urgent:true, why:'퇴근 후가 편하다고 요청'}, last:{at:'11/8 17:42', dur:'0분 48초', kind:'AI 통화'},
    ai:{sum:'퇴근 후 통화를 원함. 84타입 잔여 세대와 중도금 대출 조건을 궁금해함.', next:'오늘 14:00에 84타입 잔여 세대표와 대출 조건을 먼저 문자로 보내고 통화하세요.', kw:['84타입', '중도금 대출', '퇴근 후']},
    calls:[{at:'11/8 17:42', dur:'0분 48초', who:'박지훈', sum:'퇴근 후 다시 연락을 원함. 84타입 잔여 세대, 중도금 대출 조건 문의.', kw:['84타입','중도금 대출']}],
    memos:[{by:'박지훈', at:'11/8 17:45', type:'통화 결과', body:'재통화 요청 – 내일 오후 2시'}], lead:'1431 3292 5310 7781',
    tl:[{t:'call', at:'11/8 17:42', title:'AI 통화 0분 48초', body:'퇴근 후 다시 연락을 원함 · 84타입 · 중도금 대출'}, {t:'status', at:'11/8 17:45', title:'재통화 표시', body:'11/9 14:00 예정'}, {t:'lead', at:'11/2 21:03', title:'리드 등록', body:'네이버 · 윤슬자이'}]}),
  C({id:4, name:'박도윤', phone:'010-3307-6621', site:'덕소역 더블뷰한강', owner:'박지훈 (나)', reg:'9/14', stage:'방문 예약', grade:'상', plat:'카카오', age:'50대', sex:'남',
    next:{t:'방문', at:'오늘 15:00', why:'견본주택 · 2인 방문'}, last:{at:'11/7 13:03', dur:'1분 27초', kind:'AI 통화'},
    ai:{sum:'한강뷰 세대를 찾고 있음. 74A 고층 선호, 실거주 목적. 자료를 먼저 받아본 뒤 방문하겠다고 함.', next:'방문 전 74A 고층 잔여 호실 2~3개를 미리 골라 두고, 오전에 확인 문자를 보내세요.', kw:['한강뷰','74A','고층','실거주']},
    calls:[{at:'11/7 13:03', dur:'1분 27초', who:'박지훈', sum:'한강뷰 세대 문의. 74A 고층 선호, 실거주. 자료 먼저 요청 후 방문 약속.', kw:['한강뷰','74A','실거주'],
      talk:[['c','00:00','여보세요, 어디세요?'],['a','00:02','덕소역 더블뷰한강입니다. 문자 남겨 주셔서 연락드렸어요.'],['c','00:09','아 네, 한강 보이는 세대 아직 있나요?'],['a','00:13','74타입 고층에 몇 세대 남아 있습니다.'],['c','00:21','자료 먼저 보내 주시면 보고 방문할게요.']]}],
    visits:[{at:'11/9 (일) 15:00', who:'박지훈', ppl:'2인', note:'배우자 동행'}],
    memos:[{by:'박지훈', at:'11/7 13:10', type:'상담 기록', body:'74A 고층 선호 · 실거주 · 배우자와 방문 예정'}], lead:'1431 3292 5224 0021',
    tl:[{t:'visit', at:'11/7 13:12', title:'방문 예약', body:'11/9 (일) 15:00 · 2인'}, {t:'call', at:'11/7 13:03', title:'AI 통화 1분 27초', body:'한강뷰 · 74A 고층 · 실거주 · 자료 먼저 요청'}, {t:'lead', at:'9/14 23:54', title:'리드 등록', body:'카카오 · 덕소역 더블뷰한강'}]}),
  C({id:5, name:'최지우', phone:'010-9902-1186', site:'덕소역 더블뷰한강', owner:'박지훈 (나)', reg:'9/14', stage:'가계약', grade:'상', plat:'메타', age:'40대', sex:'여',
    next:{t:'2차 계약금', at:'11/12 (수)', why:'2,500만 원 입금 예정'}, last:{at:'10/7 11:00', dur:'방문', kind:'방문 상담'},
    contract:{unit:'102동 2004호', type:'74A', pay:[['1차 계약금','1,000만 원','9/16','완료'],['2차 계약금','2,500만 원','11/12','예정'],['정계약','—','11/20','예정']]},
    ai:{sum:'2004호 가계약 완료. 실거주 목적이며 2차 계약금 일정 확인을 원함.', next:'11/11에 2차 계약금 입금 안내 문자를 보내고, 정계약 서류 목록을 함께 전달하세요.', kw:['2004호','실거주','계약금']},
    calls:[{at:'9/15 13:03', dur:'1분 27초', who:'박지훈', sum:'분양 일정 안내 통화. 한강뷰 세대 대부분 분양 완료, 자료 전송 요청.', kw:['한강뷰','분양 일정']}],
    visits:[{at:'10/7 (화) 11:00', who:'박지훈', ppl:'1인', note:'계약서 도장 날인'}, {at:'9/16 (화) 18:30', who:'박지훈', ppl:'1인', note:'첫 방문 · 2004호 가계약'}],
    memos:[{by:'박지훈', at:'10/7 12:51', type:'상담 기록', body:'3001 계약서 도장 날인, 확정 분양가 도장 날인 · 실거주'},
      {by:'회사 공용', at:'9/16 21:54', type:'입금', body:'102-2004 · 1,000만 원 · 1차 계약금 · 담당 박지훈'},
      {by:'박지훈', at:'9/16 15:12', type:'메모', body:'오늘 6시 방문 예정'}], lead:'1431 3292 5224 1309',
    tl:[{t:'memo', at:'10/7 12:51', title:'상담 기록', body:'계약서 도장 날인 · 실거주'}, {t:'visit', at:'10/7 11:00', title:'방문', body:'견본주택 · 1인'}, {t:'pay', at:'9/16 21:54', title:'1차 계약금 입금', body:'1,000만 원 · 102-2004'}, {t:'status', at:'9/16 21:58', title:'가계약으로 변경', body:'방문 예약 → 가계약'}, {t:'call', at:'9/15 13:03', title:'AI 통화 1분 27초', body:'분양 일정 · 자료 전송 요청'}, {t:'lead', at:'9/14 23:54', title:'리드 등록', body:'메타 · 덕소역 더블뷰한강'}]}),
  C({id:6, name:'이서연', phone:'010-6614-2093', site:'북오산자이 드포레', owner:'박지훈 (나)', reg:'11/6', stage:'부재중', grade:'중', plat:'네이버', tries:2,
    next:{t:'재시도', at:'오늘 18:00', why:'부재 2회 · 저녁 시간대 시도'}, last:{at:'11/8 10:05', dur:'부재', kind:'앱 발신'},
    calls:[], memos:[], lead:'1431 3292 6612 0044',
    tl:[{t:'miss', at:'11/8 10:05', title:'부재중 (2회째)', body:'앱 발신 · 연결 안 됨'}, {t:'miss', at:'11/7 18:20', title:'부재중 (1회째)', body:'앱 발신 · 연결 안 됨'}, {t:'lead', at:'11/6 20:11', title:'리드 등록', body:'네이버 · 북오산자이 드포레'}]}),
  C({id:7, name:'신유나', phone:'010-4420-7718', site:'디애스턴 한남', owner:'이수진', reg:'10/21', stage:'방문 예약', result:'재통화', grade:'상', plat:'직접', age:'30대', sex:'여',
    next:{t:'재통화', at:'내일 10:00', why:'방문 후 남편과 상의 중'}, last:{at:'11/6 16:20', dur:'3분 02초', kind:'AI 통화'},
    ai:{sum:'방문 후 59타입과 84타입 사이에서 고민 중. 남편과 상의 후 답을 주겠다고 함.', next:'내일 10:00 통화 전에 두 타입 분양가 비교표를 문자로 먼저 보내세요.', kw:['59타입','84타입','상의 중']},
    calls:[{at:'11/6 16:20', dur:'3분 02초', who:'이수진', sum:'방문 후기. 59 vs 84 고민, 남편과 상의 예정.', kw:['59타입','84타입']}],
    visits:[{at:'11/2 (일) 14:00', who:'이수진', ppl:'2인', note:'방문 완료'}], memos:[{by:'이수진', at:'11/6 16:30', type:'통화 결과', body:'내일 오전 10시 재통화'}], lead:'unified_31bd…02c4',
    tl:[{t:'call', at:'11/6 16:20', title:'AI 통화 3분 02초', body:'59 vs 84 고민 · 남편과 상의'}, {t:'visit', at:'11/2 14:00', title:'방문', body:'견본주택 · 2인'}, {t:'lead', at:'10/21 19:40', title:'리드 등록', body:'직접 · 디애스턴 한남'}]}),
  C({id:8, name:'정민준', phone:'010-8890-3375', site:'윤슬자이', owner:'이수진', reg:'8/30', stage:'정계약', grade:'상', plat:'카카오', age:'50대', sex:'남',
    next:{t:'입주 안내', at:'12월', why:'정계약 완료 고객 관리'}, last:{at:'10/2 14:00', dur:'방문', kind:'정계약'},
    contract:{unit:'103동 1502호', type:'84B', pay:[['1차 계약금','1,000만 원','9/5','완료'],['2차 계약금','3,000만 원','9/19','완료'],['정계약','—','10/2','완료']]},
    memos:[{by:'이수진', at:'10/2 15:10', type:'상담 기록', body:'정계약 완료 · 입주 일정 안내 요청'}], lead:'1431 3290 1102 5531',
    tl:[{t:'status', at:'10/2 15:00', title:'정계약으로 변경', body:'가계약 → 정계약'}, {t:'pay', at:'9/19', title:'2차 계약금 입금', body:'3,000만 원'}, {t:'lead', at:'8/30', title:'리드 등록', body:'카카오 · 윤슬자이'}]}),
  C({id:9, name:'한지호', phone:'010-2205-9910', site:'르엘 어퍼하우스', owner:'김태오', reg:'10/28', stage:'방문 예약', grade:'중', product:'아파트먼트', plat:'메타', age:'30대', sex:'남',
    next:{t:'방문', at:'내일 15:00', why:'평일 오후 방문'}, last:{at:'11/5 12:11', dur:'2분 10초', kind:'AI 통화'},
    ai:{sum:'아파트먼트 상품 관심. 투자 목적이며 임대 수익률을 궁금해함.', next:'방문 시 임대 수익률 시뮬레이션 자료를 준비하세요.', kw:['아파트먼트','투자','임대 수익률']},
    calls:[{at:'11/5 12:11', dur:'2분 10초', who:'김태오', sum:'아파트먼트 투자 문의, 수익률 질문.', kw:['투자','수익률']}],
    visits:[{at:'11/10 (월) 15:00', who:'김태오', ppl:'1인', note:''}], lead:'1431 3292 7001 4420',
    tl:[{t:'visit', at:'11/5 12:15', title:'방문 예약', body:'11/10 (월) 15:00'}, {t:'call', at:'11/5 12:11', title:'AI 통화 2분 10초', body:'아파트먼트 · 투자 · 수익률'}, {t:'lead', at:'10/28', title:'리드 등록', body:'메타 · 르엘 어퍼하우스'}]}),
  C({id:10, name:'임수아', phone:'010-1180-6627', site:'소요한남', owner:'김태오', reg:'10/15', stage:'부재중', result:'타현장', grade:'하', plat:'구글',
    next:{t:'현장 이관', at:'—', why:'르엘 어퍼하우스에 관심'}, last:{at:'10/30 11:40', dur:'1분 05초', kind:'AI 통화'},
    ai:{sum:'소요한남보다 르엘 어퍼하우스 조건에 관심. 담당 현장 변경이 필요함.', next:'르엘 어퍼하우스 담당자에게 이관하세요.', kw:['르엘 어퍼하우스','이관']},
    calls:[{at:'10/30 11:40', dur:'1분 05초', who:'김태오', sum:'다른 현장 관심, 이관 요청.', kw:['이관']}], lead:'1431 3292 6610 8812',
    tl:[{t:'status', at:'10/30 11:45', title:'타현장 표시', body:'르엘 어퍼하우스 관심'}, {t:'call', at:'10/30 11:40', title:'AI 통화 1분 05초', body:'다른 현장 관심'}, {t:'lead', at:'10/15', title:'리드 등록', body:'구글 · 소요한남'}]}),
  C({id:11, name:'윤시우', phone:'010-0000-0000', site:'카시아 속초', owner:'최유리', reg:'9/30', stage:'부재중', result:'관심없음', grade:'하', plat:'메타', tries:3,
    next:{t:'종료', at:'—', why:'번호 오류'}, last:{at:'10/3 10:00', dur:'번호 오류', kind:'앱 발신'}, lead:'1431 3290 9901 2201',
    tl:[{t:'status', at:'10/3 10:02', title:'관심없음 표시', body:'사유: 번호 오류'}, {t:'miss', at:'10/3 10:00', title:'연결 실패', body:'없는 번호'}, {t:'lead', at:'9/30', title:'리드 등록', body:'메타 · 카시아 속초'}]}),
  C({id:12, name:'오채원', phone:'010-7714-3308', site:'PH1603', owner:'박지훈 (나)', reg:'11/4', stage:'부재중', grade:'하', plat:'내 페이지', tries:3,
    next:{t:'재시도', at:'내일 12:30', why:'부재 3회 · 점심 시간대 시도'}, last:{at:'11/8 19:30', dur:'부재', kind:'앱 발신'}, lead:'1431 3292 6630 1990',
    tl:[{t:'miss', at:'11/8 19:30', title:'부재중 (3회째)', body:'앱 발신'}, {t:'lead', at:'11/4', title:'리드 등록', body:'내 페이지 · PH1603'}]}),
];
const clone = o => JSON.parse(JSON.stringify(o));
const matchSt = (c, k) => !k || k === '전체' || c.stage === k || c.result === k || c.grade === k || c.product === k;
const nameOf = c => c.name;
const mask = p => p.replace(/(\d{3})-(\d{4})-(\d{4})/, '$1-••••-$3');

/* ================= 아이콘 ================= */
const ic = (I, p = {}) => html`<${Icon} icon=${I} ...${p}/>`;
const TL_IC = {lead: H.SparklesIcon, form: H.DocumentTextIcon, call: H.PhoneIcon, miss: H.PhoneXMarkIcon, memo: H.PencilSquareIcon, visit: H.CalendarDaysIcon, pay: H.BanknotesIcon, status: H.ArrowPathIcon};
const TL_C = {lead: 'blue', form: 'gray', call: 'green', miss: 'pink', memo: 'gray', visit: 'blue', pay: 'orange', status: 'purple'};
const NEXT_IC = {'첫 연락': H.BoltIcon, '재통화': H.PhoneArrowUpRightIcon, '재시도': H.ArrowPathIcon, '방문': H.CalendarDaysIcon, '2차 계약금': H.BanknotesIcon, '입주 안내': H.HomeIcon, '현장 이관': H.ArrowsRightLeftIcon, '종료': H.NoSymbolIcon};

/* ================= 공통 표현 ================= */
const StBadge = ({k}) => k ? html`<${Badge} label=${k} variant=${badgeV(stInfo(k).c)}/>` : null;
const GradeTok = ({k}) => k ? html`<${Token} size="sm" color=${stInfo(k).c} label=${'관심 ' + k}/>` : null;
const Tags = ({c, max = 3, size = 'sm'}) => {
  const t = [c.stage, c.result].filter(Boolean);
  return html`<${Stack} direction="horizontal" gap=${1} wrap="wrap" vAlign="center">
    ${t.map(k => html`<${StBadge} key=${k} k=${k}/>`)}
    ${c.grade ? html`<${GradeTok} k=${c.grade}/>` : null}
    ${c.product ? html`<${Token} size=${size} color="blue" label=${c.product}/>` : null}
  <//>`;
};
const NextLine = ({c, compact}) => {
  if (!c.next) return null;
  const I = NEXT_IC[c.next.t] || H.ClockIcon;
  return html`<${Stack} direction="horizontal" gap=${1} vAlign="center">
    ${ic(I, {size: 'sm', color: c.next.urgent ? 'error' : 'accent'})}
    <${Text} size="sm" weight="semibold" color=${c.next.urgent ? 'primary' : 'primary'}>${c.next.t} · ${c.next.at}<//>
    ${!compact && c.next.why ? html`<${Text} size="sm" color="secondary" maxLines=${1}>${c.next.why}<//>` : null}
  <//>`;
};
const LastLine = ({c}) => html`<${Text} size="xsm" color="secondary">
  ${c.last ? `최근 연락 ${c.last.at} · ${c.last.kind}${c.last.dur && !['방문', '부재', '번호 오류'].includes(c.last.dur) ? ' ' + c.last.dur : ''}` : '아직 연락 기록 없음'}
  ${c.memos.length ? ` · 기록 ${c.memos.length}` : ''}${c.tries ? ` · 시도 ${c.tries}회` : ''}
<//>`;

/* ================= 휴대폰 프레임 ================= */
function Phone({theme, dark, children, sheet, toast, tab = '고객', onTab, nav = true, fab}) {
  return html`<div class="ph" data-astryx-theme=${theme} style=${{colorScheme: dark ? 'dark' : 'light'}}>
    <div class="ph-in">
      <div class="ph-sb"><span>9:41</span><span class="ph-sbi">${ic(H.SignalIcon, {size: 'sm'})}${ic(H.WifiIcon, {size: 'sm'})}<i class="ph-bat"></i></span></div>
      <div class="ph-notch"></div>
      <div class="ph-scr">${children}</div>
      ${fab || null}
      ${nav ? html`<${TabBar} on=${tab} onTab=${onTab}/>` : null}
      ${sheet || null}
      ${toast ? html`<div class="ph-toast" key=${toast}>${toast}</div>` : null}
      <div class="ph-home"></div>
    </div>
  </div>`;
}
function TabBar({on, onTab}) {
  const t = [['홈', H.HomeIcon], ['고객', H.UsersIcon], ['일정', H.CalendarDaysIcon], ['멤버', H.UserGroupIcon], ['메뉴', H.Bars3Icon]];
  return html`<div class="ph-tab">${t.map(([l, I]) => html`<button key=${l} class=${'ph-tabb' + (l === on ? ' on' : '')} onClick=${() => onTab && onTab(l)}>${ic(I)}<span>${l}</span></button>`)}</div>`;
}
/* 휴대폰 안에 뜨는 바텀시트 (Astryx 콘텐츠로 구성) */
function Sheet({title, sub, onClose, children, footer, tall, full}) {
  return html`<div class="ph-sheet-wrap">
    <div class="ph-dim" onClick=${onClose}></div>
    <div class=${'ph-sheet' + (tall ? ' tall' : '') + (full ? ' full' : '')} role="dialog" aria-label=${title}>
      <div class="ph-grab"></div>
      <${Stack} direction="horizontal" hAlign="between" vAlign="center" paddingInline=${4} paddingBlockEnd=${2}>
        <${Stack} direction="vertical" gap=${0.5}><${Heading} level=${4}>${title}<//>${sub ? html`<${Text} size="sm" color="secondary">${sub}<//>` : null}<//>
        <${IconButton} label="닫기" variant="ghost" size="sm" icon=${ic(H.XMarkIcon)} onClick=${onClose}/>
      <//>
      <div class="ph-sheet-body">${children}</div>
      ${footer ? html`<div class="ph-sheet-foot">${footer}</div>` : null}
    </div>
  </div>`;
}
const useToast = () => {
  const [t, setT] = useState('');
  const ref = useRef();
  const show = useCallback(m => { setT(m); clearTimeout(ref.current); ref.current = setTimeout(() => setT(''), 2400); }, []);
  return [t, show];
};
const PROTO = '프로토타입 — 실제로 전화·저장되지 않아요';

/* 공통 상태 훅: 각 시안이 자기 데이터 사본을 가짐 (원본 앱 데이터와 무관) */
function useProto(init = {}) {
  const [cust, setCust] = useState(() => clone(CUST0));
  const [s, setS] = useState({scr: 'list', id: null, sheet: null, st: '전체', q: '', f: emptyF(), view: 'list', ...init});
  const set = useCallback(p => setS(o => ({...o, ...(typeof p === 'function' ? p(o) : p)})), []);
  const cur = cust.find(c => c.id === s.id);
  const upd = useCallback((id, fn) => setCust(l => l.map(c => c.id === id ? fn(clone(c)) : c)), []);
  return {cust, s, set, cur, upd};
}
const emptyF = () => ({sort: '최근 활동', plat: [], camp: [], date: '전체', owner: [], grade: []});
const fCount = f => f.plat.length + f.camp.length + f.owner.length + f.grade.length + (f.date !== '전체' ? 1 : 0);
function applyF(list, s) {
  const f = s.f, q = s.q.trim();
  let r = q ? list : list.filter(c => matchSt(c, s.st));
  if (!q && s.stMulti && s.stMulti.length) r = list.filter(c => s.stMulti.some(k => matchSt(c, k)));
  if (q) r = r.filter(c => (c.name + c.phone + c.site + (c.ai ? c.ai.sum + c.ai.kw.join(' ') : '') + c.memos.map(m => m.body).join(' ')).includes(q));
  if (f.plat.length) r = r.filter(c => f.plat.includes(c.plat));
  if (f.camp.length) r = r.filter(c => f.camp.includes(c.site));
  if (f.owner.length) r = r.filter(c => f.owner.includes(c.owner));
  if (f.grade.length) r = r.filter(c => f.grade.includes(c.grade));
  if (f.date === '오늘') r = r.filter(c => c.reg.startsWith('11/9'));
  if (f.date === '최근 7일') r = r.filter(c => /^11\//.test(c.reg));
  const ord = {'미지정': 0, '부재중': 1, '방문 예약': 2, '가계약': 3, '정계약': 4};
  if (f.sort === '이름') r = [...r].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  if (f.sort === '관심도') r = [...r].sort((a, b) => ('상중하'.indexOf(a.grade || 'x') + 10) % 13 - ('상중하'.indexOf(b.grade || 'x') + 10) % 13);
  if (f.sort === '상태') r = [...r].sort((a, b) => ord[a.stage] - ord[b.stage]);
  if (f.sort === '등록일 최신순') r = [...r].sort((a, b) => b.id - a.id);
  return r;
}

/* ================= 공통 시트 ================= */
const Chip = ({on, label, onClick, icon}) => html`<${ToggleButton} size="sm" label=${label} isPressed=${!!on} onPressedChange=${onClick} icon=${icon}/>`;
function FilterSheet({p, onClose, toast}) {
  const [f, setF] = useState(() => clone(p.s.f));
  const [cq, setCq] = useState('');
  const tog = (g, v) => setF(o => ({...o, [g]: o[g].includes(v) ? o[g].filter(x => x !== v) : [...o[g], v]}));
  const n = applyF(p.cust, {...p.s, f}).length;
  const sec = (t, sub, body) => html`<${Stack} direction="vertical" gap=${2} paddingBlock=${2}>
    <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Text} weight="semibold">${t}<//>${sub ? html`<${Text} size="xsm" color="secondary">${sub}<//>` : null}<//>
    <div class="ax-wrap">${body}</div><//>`;
  return html`<${Sheet} title="필터" sub="정렬은 목록 위 「정렬」에서 바꿀 수 있어요" onClose=${onClose} tall
    footer=${html`<${Stack} direction="horizontal" gap=${2}><${Button} width=${104} label="초기화" variant="secondary" onClick=${() => setF(emptyF())}/><${Button} label=${`${n}명 보기`} variant="primary" width="100%" onClick=${() => { p.set({f, sheet: null}); toast && toast(`필터 ${fCount(f)}개 적용 — 목록 위에 표시돼요`); }}/><//>`}>
    <${Stack} direction="vertical" paddingInline=${4}>
      ${sec('담당자', '여러 개 선택', OWNERS.map(o => html`<${Chip} key=${o} label=${o} on=${f.owner.includes(o)} onClick=${() => tog('owner', o)}/>`))}
      <${Divider}/>
      ${sec('관심도', '여러 개 선택', GRADE.map(g => html`<${Chip} key=${g.k} label=${g.k + ' ' + fmt(g.n)} on=${f.grade.includes(g.k)} onClick=${() => tog('grade', g.k)}/>`))}
      <${Divider}/>
      ${sec('유입 플랫폼', '7개 · 여러 개 선택', PLATFORMS.map(o => html`<${Chip} key=${o} label=${o} on=${f.plat.includes(o)} onClick=${() => tog('plat', o)}/>`))}
      <${Divider}/>
      <${Stack} direction="vertical" gap=${2} paddingBlock=${2}>
        <${Stack} direction="horizontal" hAlign="between"><${Text} weight="semibold">캠페인(현장)<//><${Text} size="xsm" color="secondary">12개 · 여러 개 선택<//><//>
        <${TextInput} label="현장 검색" isLabelHidden size="sm" placeholder="현장 이름 검색" value=${cq} onChange=${setCq} startIcon=${H.MagnifyingGlassIcon}/>
        <div class="ax-wrap">${CAMP.filter(c => c.includes(cq)).map(o => html`<${Chip} key=${o} label=${o} on=${f.camp.includes(o)} onClick=${() => tog('camp', o)}/>`)}</div>
      <//>
      <${Divider}/>
      ${sec('등록일', '하나 선택', DATES.map(o => html`<${Chip} key=${o} label=${o} on=${f.date === o} onClick=${() => setF(x => ({...x, date: o}))}/>`))}
    <//>
  <//>`;
}
function SortSheet({p, onClose}) {
  return html`<${Sheet} title="정렬" onClose=${onClose}>
    <${List} hasDividers>${SORTS.map(o => html`<${ListItem} key=${o} label=${o} isSelected=${p.s.f.sort === o}
      endContent=${p.s.f.sort === o ? ic(H.CheckIcon, {color: 'accent'}) : null} onClick=${() => p.set(s => ({f: {...s.f, sort: o}, sheet: null}))}/>`)}<//>
  <//>`;
}
/* 상태 선택: 12종을 4묶음으로 (항목을 줄이지 않음) */
function StatusSheet({p, onClose, multi}) {
  const [sel, setSel] = useState(() => multi ? [...(p.s.stMulti || [])] : [p.s.st]);
  const pick = k => {
    if (!multi) { p.set({st: k, sheet: null}); return; }
    setSel(o => o.includes(k) ? o.filter(x => x !== k) : [...o, k]);
  };
  const row = s => html`<${ListItem} key=${s.k} label=${s.k} description=${s.d}
    startContent=${html`<span class="ax-dot" style=${{background: `var(--color-background-${s.c})`, borderColor: `var(--color-text-${s.c === 'gray' ? 'secondary' : s.c})`}}></span>`}
    endContent=${html`<${Stack} direction="horizontal" gap=${2} vAlign="center"><${Text} size="sm" color="secondary" hasTabularNumbers>${fmt(s.n)}<//>${(multi ? sel.includes(s.k) : p.s.st === s.k) ? ic(H.CheckIcon, {color: 'accent'}) : html`<span style=${{width: 20}}></span>`}<//>`}
    isSelected=${multi ? sel.includes(s.k) : p.s.st === s.k} onClick=${() => pick(s.k)}/>`;
  return html`<${Sheet} title="상태" sub=${multi ? '여러 개 고를 수 있어요' : `전체 ${fmt(TOTAL)}명 · 12종`} onClose=${onClose} tall
    footer=${multi ? html`<${Stack} direction="horizontal" gap=${2}><${Button} width=${104} label="선택 해제" onClick=${() => setSel([])}/><${Button} variant="primary" width="100%" label=${sel.length ? `${sel.length}개 상태 보기` : '전체 보기'} onClick=${() => p.set({stMulti: sel, st: '전체', sheet: null})}/><//>` : null}>
    <${List} density="compact">
      ${multi ? null : html`<${ListItem} label="전체" description="모든 고객" endContent=${html`<${Stack} direction="horizontal" gap=${2} vAlign="center"><${Text} size="sm" color="secondary">${fmt(TOTAL)}<//>${p.s.st === '전체' ? ic(H.CheckIcon, {color: 'accent'}) : html`<span style=${{width: 20}}></span>`}<//>`} isSelected=${p.s.st === '전체'} onClick=${() => pick('전체')}/>`}
    <//>
    ${ST_GROUPS.map(g => html`<div key=${g.g} class="ax-grp"><${Stack} direction="horizontal" hAlign="between" paddingInline=${4} paddingBlockStart=${3} paddingBlockEnd=${1}>
      <${Text} size="sm" weight="semibold" color="secondary">${g.g}<//><${Text} size="xsm" color="secondary">${g.hint}<//><//>
      <${List} density="compact">${g.items.map(row)}<//></div>`)}
  <//>`;
}
/* 통화 결과 기록 */
const RESULTS = [
  {k:'관심 있음', d:'연결됨 · 다음 단계 진행', I:H.HandThumbUpIcon, to:{}},
  {k:'방문 예약', d:'견본주택 방문 날짜 잡기', I:H.CalendarDaysIcon, to:{stage:'방문 예약'}},
  {k:'재통화', d:'다시 연락할 시간 정하기', I:H.PhoneArrowUpRightIcon, to:{result:'재통화'}},
  {k:'부재중', d:'연결 안 됨 · 시도 횟수 +1', I:H.PhoneXMarkIcon, to:{stage:'부재중'}},
  {k:'관심없음', d:'사유를 함께 남겨요', I:H.HandThumbDownIcon, to:{result:'관심없음'}},
  {k:'타현장', d:'다른 현장으로 넘기기', I:H.ArrowsRightLeftIcon, to:{result:'타현장'}},
];
function ResultSheet({p, c, onClose, toast, big, onDone}) {
  const [r, setR] = useState(null);
  const [when, setWhen] = useState('오늘 18:00');
  const [why, setWhy] = useState('');
  const need = r && (r.k === '재통화' || r.k === '방문 예약');
  return html`<${Sheet} title="통화 결과 기록" sub=${`${c.name} · 방금 통화`} onClose=${onClose} tall
    footer=${html`<${Button} variant="primary" width="100%" size=${big ? 'lg' : 'md'} label=${r ? `「${r.k}」로 기록` : '결과를 골라 주세요'} isDisabled=${!r}
      onClick=${() => { p.upd(c.id, x => { Object.assign(x, r.to); if (r.k === '부재중') x.tries = (x.tries || 0) + 1; x.tl.unshift({t: r.k === '부재중' ? 'miss' : 'status', at: '방금', title: r.k + ' 기록', body: need ? when : (why || '통화 결과')}); if (need) x.next = {t: r.k === '재통화' ? '재통화' : '방문', at: when}; return x; }); p.set({sheet: null}); toast(`「${r.k}」 기록됨 · ${PROTO}`); onDone && onDone(); }}/>`}>
    <div class=${'ax-res' + (big ? ' big' : '')}>
      ${RESULTS.map(o => html`<button key=${o.k} class=${'ax-resb' + (r && r.k === o.k ? ' on' : '')} onClick=${() => setR(o)}>
        <span class="ax-resi">${ic(o.I)}</span><span><b>${o.k}</b><small>${o.d}</small></span></button>`)}
    </div>
    ${need ? html`<${Stack} direction="vertical" gap=${2} padding=${4}><${Text} weight="semibold">${r.k === '재통화' ? '언제 다시 연락할까요?' : '방문 날짜'}<//>
      <div class="ax-wrap">${(r.k === '재통화' ? ['1시간 뒤', '오늘 18:00', '내일 10:00', '내일 14:00', '직접 선택'] : ['내일 11:00', '내일 15:00', '토 11:00', '일 14:00', '직접 선택']).map(o => html`<${Chip} key=${o} label=${o} on=${when === o} onClick=${() => setWhen(o)}/>`)}</div><//>` : null}
    ${r && r.k === '관심없음' ? html`<${Stack} direction="vertical" gap=${2} padding=${4}><${Text} weight="semibold">사유<//>
      <div class="ax-wrap">${['가격 부담', '지역 안 맞음', '이미 계약', '번호 오류', '기타'].map(o => html`<${Chip} key=${o} label=${o} on=${why === o} onClick=${() => setWhy(o)}/>`)}</div><//>` : null}
  <//>`;
}
/* 기록 추가 — 양식은 입력칸으로 (메모에 손으로 타이핑하지 않음) */
function RecordSheet({p, c, onClose, toast, init = '상담 기록'}) {
  const [k, setK] = useState(init);
  const [v, setV] = useState({});
  const F = (l, ph, o = {}) => html`<${TextInput} key=${l} label=${l} placeholder=${ph} value=${v[l] || ''} onChange=${x => setV(s => ({...s, [l]: x}))} ...${o}/>`;
  const forms = {
    '상담 기록': html`<${Stack} direction="vertical" gap=${3}>${F('방문일', '11/9 (일)')}${F('방문 인원', '2인')}${F('방문 경로', '광고 문자 · 지인 소개 …')}${F('희망 타입', '74A')}${F('거주 지역', '하남')}<${TextArea} label="상담 내용" placeholder="고객 반응, 다음 할 일" value=${v.body || ''} onChange=${x => setV(s => ({...s, body: x}))}/><//>`,
    '입금': html`<${Stack} direction="vertical" gap=${3}>${F('입금 호실', '102동 2004호')}${F('구분', '1차 계약금')}${F('금액', '10,000,000원', {inputMode: 'numeric'})}${F('입금일', '11/12')}<${Text} size="sm" color="secondary">입금 기록은 계약 정보에 모이고, 수정하려면 확인을 거쳐요.<//><//>`,
    '일정': html`<${Stack} direction="vertical" gap=${3}>${F('날짜', '11/10 (월)')}${F('시간', '15:00')}<${Text} size="sm" color="secondary">하단 「일정」 탭과 같은 일정이에요.<//><//>`,
    '메모': html`<${TextArea} label="메모" placeholder="자유롭게 적어요" value=${v.body || ''} onChange=${x => setV(s => ({...s, body: x}))}/>`,
  };
  return html`<${Sheet} title="기록 추가" sub=${c.name} onClose=${onClose} tall
    footer=${html`<${Button} variant="primary" width="100%" label="저장" onClick=${() => { p.upd(c.id, x => { x.memos.unshift({by: '박지훈', at: '방금', type: k, body: v.body || Object.values(v).join(' · ') || k}); x.tl.unshift({t: k === '입금' ? 'pay' : k === '일정' ? 'visit' : 'memo', at: '방금', title: k, body: v.body || Object.values(v).join(' · ') || '(내용 없음)'}); return x; }); p.set({sheet: null}); toast(`${k} 저장됨 · ${PROTO}`); }}/>`}>
    <${Stack} direction="vertical" gap=${3} paddingInline=${4} paddingBlockEnd=${4}>
      <${SegmentedControl} label="기록 종류" value=${k} onChange=${setK} layout="fill" size="sm">
        ${['상담 기록', '입금', '일정', '메모'].map(o => html`<${SegmentedControlItem} key=${o} value=${o} label=${o}/>`)}
      <//>
      ${forms[k]}
    <//>
  <//>`;
}
/* 정보 수정 — 보기와 수정 분리 (저장 버튼 있음) */
function EditSheet({p, c, onClose, toast}) {
  const [v, setV] = useState(() => ({name: c.name, phone: c.phone, age: c.age || '', sex: c.sex || '', grade: c.grade || '', owner: c.owner, stage: c.stage}));
  const S = k => x => setV(o => ({...o, [k]: x}));
  return html`<${Sheet} title="고객 정보 수정" onClose=${onClose} full
    footer=${html`<${Stack} direction="horizontal" gap=${2}><${Button} width=${104} label="취소" onClick=${onClose}/><${Button} variant="primary" width="100%" label="저장" onClick=${() => { p.upd(c.id, x => Object.assign(x, v)); p.set({sheet: null}); toast('저장됨 · ' + PROTO); }}/><//>`}>
    <${Stack} direction="vertical" gap=${4} paddingInline=${4} paddingBlockEnd=${4}>
      <${TextInput} label="이름" value=${v.name} onChange=${S('name')} isRequired/>
      <${TextInput} label="연락처" type="tel" value=${v.phone} onChange=${S('phone')} isRequired/>
      <${Stack} direction="horizontal" gap=${3}><${TextInput} label="나이" value=${v.age} onChange=${S('age')} placeholder="40대"/>
        <${Stack} direction="vertical" gap=${1}><${Text} type="label">성별<//><${SegmentedControl} label="성별" value=${v.sex || '-'} onChange=${S('sex')} size="sm">${['-', '남', '여'].map(o => html`<${SegmentedControlItem} key=${o} value=${o} label=${o}/>`)}<//><//><//>
      <${Stack} direction="vertical" gap=${1}><${Text} type="label">관심도<//><${SegmentedControl} label="관심도" value=${v.grade || '-'} onChange=${S('grade')} layout="fill">${['-', '상', '중', '하'].map(o => html`<${SegmentedControlItem} key=${o} value=${o} label=${o}/>`)}<//><//>
      <${Stack} direction="vertical" gap=${1}><${Text} type="label">영업 단계<//><div class="ax-wrap">${STAGE.map(s => html`<${Chip} key=${s.k} label=${s.k} on=${v.stage === s.k} onClick=${() => S('stage')(s.k)}/>`)}</div><//>
      <${Stack} direction="vertical" gap=${1}><${Text} type="label">담당자<//><div class="ax-wrap">${OWNERS.map(o => html`<${Chip} key=${o} label=${o} on=${v.owner === o} onClick=${() => S('owner')(o)}/>`)}</div><//>
    <//>
  <//>`;
}
function MoreSheet({p, c, onClose, toast}) {
  const [conf, setConf] = useState(false);
  if (conf) return html`<${Sheet} title="고객을 휴지통으로 옮길까요?" onClose=${onClose}
    footer=${html`<${Stack} direction="horizontal" gap=${2}><${Button} width=${104} label="취소" onClick=${onClose}/><${Button} variant="destructive" width="100%" label="휴지통으로 옮기기" onClick=${() => { p.set({sheet: null}); toast('프로토타입 — 실제로 삭제되지 않아요'); }}/><//>`}>
    <${Stack} direction="vertical" gap=${2} paddingInline=${4} paddingBlockEnd=${2}>
      <${Text}>${c.name} 고객의 기록 ${c.memos.length + c.tl.length}건이 함께 옮겨져요. 30일 안에는 ≡ 메뉴 › 휴지통에서 되돌릴 수 있어요.<//>
      ${c.contract ? html`<${Banner} status="warning" title="계약 고객이에요" description="입금 기록이 있는 고객은 관리자 확인 후 삭제돼요."/>` : null}
    <//><//>`;
  return html`<${Sheet} title="더보기" onClose=${onClose}>
    <${List} hasDividers>
      <${ListItem} label="정보 수정" startContent=${ic(H.PencilSquareIcon)} onClick=${() => p.set({sheet: 'edit'})}/>
      <${ListItem} label="담당자 변경" startContent=${ic(H.UserIcon)} onClick=${() => p.set({sheet: 'edit'})}/>
      <${ListItem} label="내페이지 공유" description="공유 후 열람 기록이 여기에 모여요" startContent=${ic(H.ShareIcon)} onClick=${() => toast('내페이지 공유 · ' + PROTO)}/>
      <${ListItem} label="고객 삭제" description="확인 후 휴지통으로" startContent=${ic(H.TrashIcon, {color: 'error'})} onClick=${() => setConf(true)}/>
    <//>
  <//>`;
}
function AddSheet({onClose, toast}) {
  const [v, setV] = useState({});
  const ok = v.name && v.phone && v.site;
  return html`<${Sheet} title="고객 등록" onClose=${onClose} full
    footer=${html`<${Stack} direction="horizontal" gap=${2}><${Button} width=${104} label="취소" onClick=${onClose}/><${Button} variant="primary" width="100%" label="저장" isDisabled=${!ok} onClick=${() => { onClose(); toast('등록됨 · ' + PROTO); }}/><//>`}>
    <${Stack} direction="vertical" gap=${4} paddingInline=${4} paddingBlockEnd=${4}>
      <${TextInput} label="이름" isRequired value=${v.name || ''} onChange=${x => setV(o => ({...o, name: x}))} placeholder="고객 이름"/>
      <${TextInput} label="연락처" isRequired type="tel" value=${v.phone || ''} onChange=${x => setV(o => ({...o, phone: x}))} placeholder="010-0000-0000"/>
      <${Stack} direction="vertical" gap=${1}><${Text} type="label">캠페인(현장) <span style=${{color: 'var(--color-error)'}}>*</span><//><div class="ax-wrap">${CAMP.slice(0, 6).map(o => html`<${Chip} key=${o} label=${o} on=${v.site === o} onClick=${() => setV(x => ({...x, site: o}))}/>`)}<${Chip} label="+ 6개 더" on=${false} onClick=${() => {}}/></div><//>
      <${Stack} direction="vertical" gap=${1}><${Text} type="label">유입 경로<//><div class="ax-wrap">${PLATFORMS.map(o => html`<${Chip} key=${o} label=${o} on=${v.plat === o} onClick=${() => setV(x => ({...x, plat: o}))}/>`)}</div><//>
      <${Banner} status="info" title=${v.site ? `${v.site}의 담당자 · 상태를 고를 수 있어요` : '현장을 고르면 담당자 · 상태가 열려요'}/>
      <${TextArea} label="메모" isOptional placeholder="첫 상담 내용"/>
    <//>
  <//>`;
}
/* 공통 시트 라우터 */
function Sheets({p, toast, multi, big, onDone}) {
  const close = () => p.set({sheet: null});
  const c = p.cur;
  switch (p.s.sheet) {
    case 'filter': return html`<${FilterSheet} p=${p} onClose=${close} toast=${toast}/>`;
    case 'sort': return html`<${SortSheet} p=${p} onClose=${close}/>`;
    case 'status': return html`<${StatusSheet} p=${p} onClose=${close} multi=${multi}/>`;
    case 'result': return c ? html`<${ResultSheet} p=${p} c=${c} onClose=${close} toast=${toast} big=${big} onDone=${onDone}/>` : null;
    case 'record': return c ? html`<${RecordSheet} p=${p} c=${c} onClose=${close} toast=${toast}/>` : null;
    case 'pay': return c ? html`<${RecordSheet} p=${p} c=${c} onClose=${close} toast=${toast} init="입금"/>` : null;
    case 'edit': return c ? html`<${EditSheet} p=${p} c=${c} onClose=${close} toast=${toast}/>` : null;
    case 'more': return c ? html`<${MoreSheet} p=${p} c=${c} onClose=${close} toast=${toast}/>` : null;
    case 'add': return html`<${AddSheet} onClose=${close} toast=${toast}/>`;
    default: return null;
  }
}

/* ================= 공통 상세 블록 ================= */
const SecH = ({t, I, end}) => html`<${Stack} direction="horizontal" hAlign="between" vAlign="center">
  <${Stack} direction="horizontal" gap=${1.5} vAlign="center">${I ? ic(I, {size: 'sm', color: 'secondary'}) : null}<${Heading} level=${5}>${t}<//><//>${end || null}<//>`;
function InfoMeta({c, onEdit}) {
  return html`<${Card}><${Stack} direction="vertical" gap=${3}>
    <${SecH} t="기본 정보" I=${H.IdentificationIcon} end=${onEdit ? html`<${Button} size="sm" variant="ghost" label="수정" icon=${ic(H.PencilSquareIcon)} onClick=${onEdit}/>` : null}/>
    <${MetadataList} columns=${2}>
      <${MetadataListItem} label="연락처">${mask(c.phone)}<//>
      <${MetadataListItem} label="담당자">${c.owner}<//>
      <${MetadataListItem} label="나이 · 성별">${[c.age, c.sex].filter(Boolean).join(' · ') || '—'}<//>
      <${MetadataListItem} label="관심도">${c.grade || '—'}<//>
      <${MetadataListItem} label="현장">${c.site}<//>
      <${MetadataListItem} label="유입 경로">${c.plat}<//>
      <${MetadataListItem} label="등록일">${c.reg}<//>
      <${MetadataListItem} label="리드 ID">${c.lead}<//>
    <//>
  <//><//>`;
}
function ContractCard({c, onPay}) {
  if (!c.contract) return null;
  const k = c.contract, done = k.pay.filter(x => x[3] === '완료').length;
  return html`<${Card}><${Stack} direction="vertical" gap=${3}>
    <${SecH} t="계약 정보" I=${H.BanknotesIcon} end=${onPay ? html`<${Button} size="sm" variant="ghost" label="입금 기록" icon=${ic(H.PlusIcon)} onClick=${onPay}/>` : null}/>
    <${Stack} direction="horizontal" gap=${2} vAlign="center"><${Heading} level=${4}>${k.unit}<//><${Token} size="sm" label=${k.type}/><//>
    <${ProgressBar} label="계약 진행" value=${done} max=${k.pay.length} hasValueLabel formatValueLabel=${(v, m) => `${v}/${m} 단계`}/>
    <${List} density="compact" hasDividers>${k.pay.map(([t, a, d, st]) => html`<${ListItem} key=${t} label=${t} description=${`${a} · ${d}`}
      endContent=${html`<${Badge} label=${st} variant=${st === '완료' ? 'green' : 'neutral'}/>`}/>`)}<//>
  <//><//>`;
}
function AICard({c, accent, cta, onCta, compact}) {
  if (!c.ai) return html`<${Card} variant="muted"><${Stack} direction="vertical" gap=${1}><${SecH} t="AI 통화 요약" I=${H.SparklesIcon}/><${Text} size="sm" color="secondary">아직 통화가 없어요. 통화 녹음이 올라오면 AI가 요약하고 다음 행동을 제안해요.<//><//><//>`;
  return html`<${Card} variant=${accent || 'default'}><${Stack} direction="vertical" gap=${2.5}>
    <${SecH} t="AI 브리핑" I=${H.SparklesIcon} end=${c.last ? html`<${Text} size="xsm" color="secondary">${c.last.at} 통화 기준<//>` : null}/>
    <${Text}>${c.ai.sum}<//>
    <div class="ax-next"><${Stack} direction="horizontal" gap=${1.5} vAlign="start">${ic(H.LightBulbIcon, {color: 'accent'})}<${Stack} direction="vertical" gap=${0.5}><${Text} size="sm" weight="semibold">다음 행동 제안<//><${Text} size="sm">${c.ai.next}<//><//><//></div>
    ${compact ? null : html`<${Stack} direction="horizontal" gap=${1} wrap="wrap">${c.ai.kw.map(k => html`<${Token} key=${k} size="sm" color="blue" label=${k}/>`)}<//>`}
    ${cta ? html`<${Button} variant="primary" label=${cta} onClick=${onCta}/>` : null}
  <//><//>`;
}
function CallList({c, toast}) {
  const [open, setOpen] = useState({});
  if (!c.calls.length) return html`<${EmptyState} isCompact title="통화 기록이 없어요" description="앱에서 건 전화와 AI 통화가 모두 여기에 모여요" icon=${ic(H.PhoneIcon)}/>`;
  return html`<${Stack} direction="vertical" gap=${2}>${c.calls.map((k, i) => html`<${Card} key=${i} padding=${3}><${Stack} direction="vertical" gap=${2}>
    <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Stack} direction="horizontal" gap=${1.5} vAlign="center">${ic(H.PhoneIcon, {size: 'sm', color: 'success'})}<${Text} weight="semibold">${k.at}<//><${Text} size="sm" color="secondary">${k.dur} · ${k.who}<//><//><${Badge} label="AI 요약" variant="purple"/><//>
    <${Text} size="sm">${k.sum}<//>
    ${k.talk ? html`<${Collapsible} trigger=${html`<${Text} size="sm" weight="semibold">녹음 대화 ${k.talk.length}건<//>`} defaultIsOpen=${false}>
      <div class="ax-talk">${k.talk.map(([w, t, s], j) => html`<div key=${j} class=${'ax-bub ' + w}><small>${w === 'c' ? '고객' : '담당자'} ${t}</small>${s}</div>`)}</div><//>` : null}
  <//><//>`)}<//>`;
}
function Timeline({c, max = 99}) {
  return html`<div class="ax-tl">${c.tl.slice(0, max).map((t, i) => html`<div key=${i} class="ax-tli">
    <span class="ax-tld" style=${{background: `var(--color-background-${TL_C[t.t]})`, color: `var(--color-text-${TL_C[t.t] === 'gray' ? 'secondary' : TL_C[t.t]})`}}>${ic(TL_IC[t.t] || H.ClockIcon, {size: 'sm'})}</span>
    <div><${Stack} direction="horizontal" gap=${2} vAlign="center"><${Text} size="sm" weight="semibold">${t.title}<//><${Text} size="xsm" color="secondary">${t.at}<//><//><${Text} size="sm" color="secondary">${t.body}<//></div>
  </div>`)}</div>`;
}
function Memos({c}) {
  if (!c.memos.length) return html`<${Text} size="sm" color="secondary">아직 기록이 없어요<//>`;
  const col = {'상담 기록': 'blue', '입금': 'orange', '통화 결과': 'purple', '메모': 'gray', '일정': 'teal'};
  return html`<${Stack} direction="vertical" gap=${2}>${c.memos.map((m, i) => html`<div key=${i} class="ax-memo">
    <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Token} size="sm" color=${col[m.type] || 'gray'} label=${m.type}/><${Text} size="xsm" color="secondary">${m.by} · ${m.at}<//><//>
    <${Text} size="sm">${m.body}<//></div>`)}<//>`;
}
function Visits({c, onAdd}) {
  return html`<${Card}><${Stack} direction="vertical" gap=${2}>
    <${SecH} t="방문 일정" I=${H.CalendarDaysIcon} end=${onAdd ? html`<${Button} size="sm" variant="ghost" label="추가" icon=${ic(H.PlusIcon)} onClick=${onAdd}/>` : null}/>
    ${c.visits.length ? html`<${List} density="compact">${c.visits.map((v, i) => html`<${ListItem} key=${i} label=${v.at} description=${[v.who, v.ppl, v.note].filter(Boolean).join(' · ')} startContent=${ic(H.CalendarDaysIcon, {color: 'accent'})}/>`)}<//>`
      : html`<${Text} size="sm" color="secondary">잡힌 방문 일정이 없어요<//>`}
  <//><//>`;
}
/* 상세 하단 고정 액션 바 */
function ActionBar({c, p, toast, big}) {
  return html`<div class=${'ax-abar' + (big ? ' big' : '')}>
    <${Button} variant="primary" size=${big ? 'lg' : 'md'} label="전화" icon=${ic(H.PhoneIcon)} onClick=${() => { toast('전화 연결 · ' + PROTO); setTimeout(() => p.set({sheet: 'result'}), 600); }}/>
    <${Button} size=${big ? 'lg' : 'md'} label="문자" icon=${big ? ic(H.ChatBubbleLeftEllipsisIcon) : null} onClick=${() => toast('문자 작성 · ' + PROTO)}/>
    <${Button} size=${big ? 'lg' : 'md'} label="결과" icon=${big ? ic(H.CheckCircleIcon) : null} onClick=${() => p.set({sheet: 'result'})}/>
    <${Button} size=${big ? 'lg' : 'md'} label="기록" icon=${big ? ic(H.PencilSquareIcon) : null} onClick=${() => p.set({sheet: 'record'})}/>
  </div>`;
}
/* 적용된 필터 줄 (목록에 항상 보임) */
function AppliedBar({p}) {
  const f = p.s.f, items = [];
  if (p.s.st !== '전체') items.push(['상태', p.s.st, () => p.set({st: '전체'})]);
  (p.s.stMulti || []).forEach(k => items.push(['상태', k, () => p.set(s => ({stMulti: s.stMulti.filter(x => x !== k)}))]));
  f.owner.forEach(v => items.push(['담당', v, () => p.set(s => ({f: {...s.f, owner: s.f.owner.filter(x => x !== v)}}))]));
  f.grade.forEach(v => items.push(['관심', v, () => p.set(s => ({f: {...s.f, grade: s.f.grade.filter(x => x !== v)}}))]));
  f.plat.forEach(v => items.push(['유입', v, () => p.set(s => ({f: {...s.f, plat: s.f.plat.filter(x => x !== v)}}))]));
  f.camp.forEach(v => items.push(['현장', v, () => p.set(s => ({f: {...s.f, camp: s.f.camp.filter(x => x !== v)}}))]));
  if (f.date !== '전체') items.push(['등록', f.date, () => p.set(s => ({f: {...s.f, date: '전체'}}))]);
  if (!items.length) return null;
  return html`<div class="ax-applied"><${Text} size="xsm" color="secondary">적용됨<//>${items.map(([g, v, rm], i) => html`<${Token} key=${i} size="sm" color="blue" label=${`${g}: ${v}`} onRemove=${rm}/>`)}
    <${Button} size="sm" variant="ghost" label="모두 지우기" onClick=${() => p.set({f: emptyF(), st: '전체', stMulti: []})}/></div>`;
}
const SearchBox = ({p, ph = '이름 · 전화 · 현장 · 메모 · AI 요약 검색'}) => html`<${TextInput} label="고객 검색" isLabelHidden type="search" placeholder=${ph} value=${p.s.q} onChange=${q => p.set({q})} startIcon=${H.MagnifyingGlassIcon} hasClear/>`;
const ScopeNote = ({p, n}) => html`<${Text} size="xsm" color="secondary">${p.s.q ? `「${p.s.q}」 전체 고객에서 ${n}명 · 상태와 관계없이 검색` : `${n}명 표시 · 가상 데이터 12명 기준`}<//>`;
const Empty = ({p}) => html`<${EmptyState} isCompact title="조건에 맞는 고객이 없어요" description="필터나 검색어를 바꿔 보세요" icon=${ic(H.MagnifyingGlassIcon)}
  actions=${html`<${Button} label="조건 초기화" onClick=${() => p.set({f: emptyF(), st: '전체', q: '', stMulti: []})}/>`}/>`;
