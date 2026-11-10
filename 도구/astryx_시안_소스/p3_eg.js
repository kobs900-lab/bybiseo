
/* =====================================================================
   시안 E · 현장 중심 (theme: chocolate)
   ===================================================================== */
const STC = ['secondary', 'pink', 'blue', 'orange', 'green'];
function FunnelBar({a}) {
  const t = a.reduce((x, y) => x + y, 0) || 1;
  return html`<div class="ax-sbar">${a.map((n, i) => n ? html`<i key=${i} style=${{flex: n / t, background: `var(--color-text-${STC[i]})`}} title=${`${STAGE[i].k} ${n}`}></i>` : null)}</div>`;
}
function SitesE({p}) {
  const [more, setMore] = useState(false);
  const sites = more ? CAMP : CAMP.slice(0, 5);
  const mine = p.cust.filter(c => c.owner.includes('(나)'));
  return html`<${Stack} direction="vertical" gap=${4} padding=${4}>
    <${Stack} direction="vertical" gap=${0.5}><${Text} color="secondary">박지훈 · 담당 고객 ${mine.length}명 (가상)<//><${Heading} level=${1}>내 현장<//><//>
    <${Card} padding=${3}><${Stack} direction="vertical" gap=${2}>
      <${Text} size="sm" weight="semibold">전체 퍼널 · ${fmt(TOTAL)}명<//>
      <${FunnelBar} a=${STAGE.map(s => s.n)}/>
      <div class="ax-legend">${STAGE.map((s, i) => html`<span key=${s.k}><i style=${{background: `var(--color-text-${STC[i]})`}}></i>${s.k} ${fmt(s.n)}</span>`)}</div>
      <${Divider}/>
      <${Stack} direction="horizontal" gap=${1} wrap="wrap"><${Text} size="xsm" color="secondary">결과<//>${RESULT.map(s => html`<${Token} key=${s.k} size="sm" color=${s.c} label=${`${s.k} ${fmt(s.n)}`}/>`)}<${Text} size="xsm" color="secondary">등급·상품<//>${[...GRADE, ...PRODUCT].map(s => html`<${Token} key=${s.k} size="sm" color=${s.c} label=${`${s.k} ${fmt(s.n)}`}/>`)}<//>
    <//><//>
    <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Heading} level=${4}>현장 ${CAMP.length}<//><${Button} size="sm" variant="ghost" label="모든 현장 고객" onClick=${() => p.set({scr: 'list', site: null, st: '전체'})}/><//>
    ${sites.map(s => {
      const a = SITE_STAT[s], tot = a.reduce((x, y) => x + y, 0), todo = p.cust.filter(c => c.site === s && c.next && /오늘|지금/.test(c.next.at)).length;
      return html`<${ClickableCard} key=${s} label=${s} padding=${3} onClick=${() => p.set({scr: 'list', site: s, st: '전체'})}>
        <${Stack} direction="vertical" gap=${2}>
          <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Heading} level=${5}>${s}<//>${todo ? html`<${Badge} label=${`오늘 ${todo}`} variant="orange"/>` : html`<${Text} size="sm" color="secondary">${fmt(tot)}명<//>`}<//>
          <${FunnelBar} a=${a}/>
          <${Stack} direction="horizontal" gap=${3}>${[['신규', a[0]], ['방문 예약', a[2]], ['계약', a[3] + a[4]]].map(([l, n]) => html`<${Stack} key=${l} direction="vertical" gap=${0}><${Text} weight="semibold" hasTabularNumbers>${n}<//><${Text} size="xsm" color="secondary">${l}<//><//>`)}<//>
        <//>
      <//>`;
    })}
    <${Button} label=${more ? '접기' : `현장 ${CAMP.length - 5}개 더 보기`} onClick=${() => setMore(!more)}/>
  <//>`;
}
function ListE({p}) {
  const site = p.s.site;
  const base = site ? p.cust.filter(c => c.site === site) : p.cust;
  const list = applyF(base, p.s);
  const cnt = k => base.filter(c => matchSt(c, k)).length;
  return html`<div>
    <div class="ax-head">
      <${Stack} direction="horizontal" gap=${1} vAlign="center"><${IconButton} label="현장 목록" variant="ghost" icon=${ic(H.ChevronLeftIcon)} onClick=${() => p.set({scr: 'sites'})}/>
        <${Stack} direction="vertical" gap=${0}><${Text} size="xsm" color="secondary">현장<//><${Heading} level=${3}>${site || '모든 현장'}<//><//><//>
      ${site ? html`<${FunnelBar} a=${SITE_STAT[site]}/>` : null}
      <${SearchBox} p=${p} ph=${site ? `${site}에서 검색` : '이름 · 전화 · 메모 검색'}/>
    </div>
    <div class="ax-tabs scroll"><${TabList} value=${p.s.st} onChange=${st => p.set({st})} size="sm" overflow="scroll" hasDivider>
      <${Tab} value="전체" label=${`전체 ${base.length}`}/>
      ${ALL_ST.map(s => html`<${Tab} key=${s.k} value=${s.k} label=${`${s.k} ${cnt(s.k)}`}/>`)}
    <//></div>
    <${Stack} direction="vertical" gap=${2} padding=${4}>
      <${Stack} direction="horizontal" gap=${1}><${Button} size="sm" label=${fCount(p.s.f) ? `필터 ${fCount(p.s.f)}` : '필터'} icon=${ic(H.FunnelIcon)} onClick=${() => p.set({sheet: 'filter'})}/><${Button} size="sm" variant="ghost" label=${p.s.f.sort} icon=${ic(H.ArrowsUpDownIcon)} onClick=${() => p.set({sheet: 'sort'})}/><//>
      <${AppliedBar} p=${p}/>
      <${Text} size="xsm" color="secondary">탭 숫자는 이 현장의 가상 데이터 기준이에요<//>
      ${list.length ? list.map(c => html`<${CardA} key=${c.id} c=${c} onOpen=${() => p.set({scr: 'detail', id: c.id})}/>`) : html`<${Empty} p=${p}/>`}
    <//>
  </div>`;
}
const VISIT_REC = {
  5: [{at: '10/7 (화) 11:00', f: [['방문 인원', '1명'], ['방문 경로', '계약자 방문'], ['거주 지역', '미사'], ['동호수', '3001'], ['상담 지원', '정윤서']], body: '계약서 도장 날인, 확정 분양가 도장 날인 · 실거주'},
      {at: '9/16 (화) 18:30', f: [['방문 인원', '1명'], ['방문 경로', '비서방'], ['거주 지역', '하남'], ['희망 타입', '74A'], ['상담 지원', '정윤서']], body: '고층이 있다고 해서 방문 · 한강뷰가 좋아서 · 2004호 가계약'}],
  4: [{at: '11/9 (일) 15:00 예정', f: [['방문 인원', '2명'], ['방문 경로', '광고 문자'], ['희망 타입', '74A 고층']], body: '배우자 동행 예정'}],
  7: [{at: '11/2 (일) 14:00', f: [['방문 인원', '2명'], ['희망 타입', '59 / 84'], ['상담 지원', '이수진']], body: '두 타입 비교 · 남편과 상의'}],
};
function DetailE({p, toast}) {
  const c = p.cur, recs = VISIT_REC[c.id] || [];
  const k = c.contract;
  return html`<div class="ax-detail">
    <div class="ax-top"><${IconButton} label="뒤로" variant="ghost" icon=${ic(H.ChevronLeftIcon)} onClick=${() => p.set({scr: 'list', id: null})}/><${Text} weight="semibold">${c.site}<//><${IconButton} label="더보기" variant="ghost" icon=${ic(H.EllipsisHorizontalIcon)} onClick=${() => p.set({sheet: 'more'})}/></div>
    <${Stack} direction="vertical" gap=${3} paddingInline=${4} paddingBlockEnd=${4}>
      <${Stack} direction="vertical" gap=${1}><${Heading} level=${1}>${c.name}<//><${Tags} c=${c}/><${Text} color="secondary">${c.owner} · ${mask(c.phone)} · ${c.plat}<//><//>
      <${Card} variant="muted" padding=${3}><${NextLine} c=${c}/><//>
      ${k ? html`<${Card}><${Stack} direction="vertical" gap=${3}>
        <${SecH} t="계약" I=${H.BanknotesIcon} end=${html`<${Button} size="sm" variant="ghost" label="입금 기록" icon=${ic(H.PlusIcon)} onClick=${() => p.set({sheet: 'pay'})}/>`}/>
        <${Stack} direction="horizontal" gap=${2} vAlign="baseline"><${Heading} level=${3}>${k.unit}<//><${Text} color="secondary">${k.type}<//><//>
        <${Stepper} orientation="vertical" activeStep=${k.pay.filter(x => x[3] === '완료').length} label="계약 단계" density="compact">
          ${k.pay.map(([t, a, d, st], i) => html`<${Step} key=${t} step=${i} label=${t} description=${`${a} · ${d} ${st}`} status=${st === '완료' ? 'success' : undefined}/>`)}
        <//>
        <${Text} size="xsm" color="secondary">입금 기록은 메모가 아니라 계약에 모여요. 수정·삭제는 확인을 거쳐요.<//>
      <//><//>` : null}
      <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Heading} level=${4}>방문 · 상담 기록<//><${Button} size="sm" label="기록 추가" icon=${ic(H.PlusIcon)} onClick=${() => p.set({sheet: 'record'})}/><//>
      ${recs.length ? recs.map((r, i) => html`<${Card} key=${i} padding=${3}><${Stack} direction="vertical" gap=${2}>
        <${Stack} direction="horizontal" gap=${1.5} vAlign="center">${ic(H.CalendarDaysIcon, {color: 'accent', size: 'sm'})}<${Text} weight="semibold">${r.at}<//><//>
        <${MetadataList} columns=${2}>${r.f.map(([l, v]) => html`<${MetadataListItem} key=${l} label=${l}>${v}<//>`)}<//>
        <${Text} size="sm">${r.body}<//>
      <//><//>`) : html`<${Card} variant="muted"><${Text} size="sm" color="secondary">아직 방문·상담 기록이 없어요. 「기록 추가」에서 양식으로 남기면 여기에 카드로 쌓여요.<//><//>`}
      <${AICard} c=${c}/>
      <${Card}><${Stack} direction="vertical" gap=${2}><${SecH} t=${`메모 ${c.memos.length}`} I=${H.PencilSquareIcon}/><${Memos} c=${c}/><//><//>
      <${Card}><${Stack} direction="vertical" gap=${2}><${SecH} t=${`통화 ${c.calls.length}`} I=${H.PhoneIcon}/><${CallList} c=${c}/><//><//>
      <${InfoMeta} c=${c} onEdit=${() => p.set({sheet: 'edit'})}/>
      <${Card}><${Collapsible} trigger=${html`<${Heading} level=${5}>활동 타임라인<//>`} defaultIsOpen=${false}><${Timeline} c=${c}/><//><//>
    <//>
    <${ActionBar} c=${c} p=${p} toast=${toast}/>
  </div>`;
}
function ConceptE() {
  const p = useProto({scr: 'sites', site: null});
  const [toast, show] = useToast();
  const body = p.s.scr === 'detail' && p.cur ? html`<${DetailE} p=${p} toast=${show}/>` : p.s.scr === 'list' ? html`<${ListE} p=${p}/>` : html`<${SitesE} p=${p}/>`;
  return html`<${ProtoHost} id="E" p=${p}><${Phone} theme="chocolate" toast=${toast} nav=${p.s.scr !== 'detail'} sheet=${html`<${Sheets} p=${p} toast=${show}/>`}
    fab=${p.s.scr === 'list' ? html`<div class="ax-fab"><${IconButton} label="고객 등록" variant="primary" size="lg" icon=${ic(H.PlusIcon)} elevation="high" onClick=${() => p.set({sheet: 'add'})}/></div>` : null}>${body}<//><//>`;
}

/* =====================================================================
   시안 F · 대화형 타임라인 (theme: matcha)
   ===================================================================== */
function InboxF({p}) {
  const [who, setWho] = useState('all');
  let base = p.cust;
  if (who === 'mine') base = base.filter(c => c.owner.includes('(나)'));
  if (who === 'new') base = base.filter(c => c.stage === '미지정' && !c.last);
  const list = applyF(base, p.s);
  return html`<div>
    <div class="ax-head">
      <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Heading} level=${2}>고객<//><${Stack} direction="horizontal" gap=${1}><${IconButton} label="필터" variant="ghost" icon=${ic(H.FunnelIcon)} onClick=${() => p.set({sheet: 'filter'})}/><${IconButton} label="고객 등록" variant="primary" icon=${ic(H.PlusIcon)} onClick=${() => p.set({sheet: 'add'})}/><//><//>
      <${SegmentedControl} label="범위" value=${who} onChange=${setWho} layout="fill" size="sm">
        <${SegmentedControlItem} value="all" label="전체"/><${SegmentedControlItem} value="mine" label="내 담당"/><${SegmentedControlItem} value="new" label=${`새 리드 ${p.cust.filter(c => c.stage === '미지정' && !c.last).length}`}/>
      <//>
      <${SearchBox} p=${p}/>
      <div class="ax-scrollx">
        <${Chip} label="전체" on=${p.s.st === '전체'} onClick=${() => p.set({st: '전체'})}/>
        ${ALL_ST.map(s => html`<${Chip} key=${s.k} label=${s.k} on=${p.s.st === s.k} onClick=${() => p.set({st: s.k})}/>`)}
        <${Chip} label="상태 전체 ▾" on=${false} onClick=${() => p.set({sheet: 'status'})}/>
      </div>
      <${AppliedBar} p=${p}/>
    </div>
    <${List} hasDividers edge="flush">
      ${list.length ? list.map(c => {
        const t = c.tl[0], fresh = c.stage === '미지정' && !c.last;
        return html`<${ListItem} key=${c.id} align="start" onClick=${() => p.set({scr: 'detail', id: c.id})}
          startContent=${html`<${Avatar} name=${c.name} size="md" status=${fresh ? html`<${X.AvatarStatusDot} variant="success" label="새 리드"/>` : null}/>`}
          label=${html`<${Stack} direction="horizontal" gap=${1.5} vAlign="center"><${Text} weight=${fresh ? 'bold' : 'semibold'}>${c.name}<//><${StBadge} k=${c.result || c.stage}/><//>`}
          description=${html`<${Stack} direction="vertical" gap=${0.5}><${Text} size="sm" color=${fresh ? 'primary' : 'secondary'} maxLines=${1}>${t.title} · ${t.body}<//><${Text} size="xsm" color="secondary">${c.site}${c.next ? ' · 다음: ' + c.next.t + ' ' + c.next.at : ''}<//><//>`}
          endContent=${html`<${Text} size="xsm" color="secondary">${t.at.split(' ')[0]}<//>`}/>`;
      }) : html`<${Empty} p=${p}/>`}
    <//>
    <div class="ax-pad" style=${{paddingBottom: 24}}><${ScopeNote} p=${p} n=${list.length}/></div>
  </div>`;
}
function ChatF({p, toast}) {
  const c = p.cur;
  const [txt, setTxt] = useState('');
  const end = useRef();
  useEffect(() => { end.current && end.current.scrollIntoView({block: 'end'}); }, [c.tl.length]);
  const msgs = [...c.tl].reverse();
  const call = at => c.calls.find(k => at.includes(k.at.split(' ')[0])) || c.calls[0];
  const send = () => { if (!txt.trim()) return; p.upd(c.id, x => { x.tl.unshift({t: 'memo', at: '방금', title: '메모', body: txt}); x.memos.unshift({by: '박지훈', at: '방금', type: '메모', body: txt}); return x; }); setTxt(''); toast('메모 추가 · ' + PROTO); };
  return html`<div class="ax-chat">
    <div class="ax-top">
      <${IconButton} label="뒤로" variant="ghost" icon=${ic(H.ChevronLeftIcon)} onClick=${() => p.set({scr: 'list', id: null})}/>
      <${Stack} direction="horizontal" gap=${2} vAlign="center"><${Avatar} name=${c.name} size="sm"/><${Stack} direction="vertical" gap=${0}><${Text} weight="semibold">${c.name}<//><${Text} size="xsm" color="secondary">${c.stage}${c.result ? ' · ' + c.result : ''} · ${c.site}<//><//><//>
      <${Stack} direction="horizontal" gap=${0}><${IconButton} label="전화" variant="ghost" icon=${ic(H.PhoneIcon)} onClick=${() => { toast('전화 연결 · ' + PROTO); setTimeout(() => p.set({sheet: 'result'}), 600); }}/><${IconButton} label="고객 정보" variant="ghost" icon=${ic(H.InformationCircleIcon)} onClick=${() => p.set({scr: 'info'})}/><//>
    </div>
    ${c.next ? html`<div class="ax-pin">${ic(H.MapPinIcon, {size: 'sm', color: 'accent'})}<${Text} size="sm"><b>다음</b> ${c.next.t} · ${c.next.at}${c.next.why ? ' — ' + c.next.why : ''}<//></div>` : null}
    <div class="ax-msgs">
      ${msgs.map((m, i) => {
        if (m.t === 'lead' || m.t === 'status' || m.t === 'miss') return html`<div key=${i} class="ax-sys">${ic(TL_IC[m.t], {size: 'sm'})} ${m.title} · ${m.body} <small>${m.at}</small></div>`;
        if (m.t === 'call') { const k = call(m.at); return html`<div key=${i} class="ax-msg l"><div class="ax-callb">
          <${Stack} direction="horizontal" gap=${1.5} vAlign="center">${ic(H.PhoneIcon, {size: 'sm', color: 'success'})}<${Text} size="sm" weight="semibold">${m.title}<//><//>
          <${Text} size="sm">${k ? k.sum : m.body}<//>
          ${k ? html`<${Stack} direction="horizontal" gap=${1} wrap="wrap">${k.kw.map(w => html`<${Token} key=${w} size="sm" color="green" label=${w}/>`)}<//>` : null}
          ${k && k.talk ? html`<${Collapsible} trigger=${html`<${Text} size="sm" weight="semibold">녹음 대화 보기<//>`} defaultIsOpen=${false}><div class="ax-talk">${k.talk.map(([w, t, s], j) => html`<div key=${j} class=${'ax-bub ' + w}><small>${w === 'c' ? '고객' : '담당자'} ${t}</small>${s}</div>`)}</div><//>` : null}
          ${c.ai && k === c.calls[0] ? html`<div class="ax-next sm">${ic(H.LightBulbIcon, {size: 'sm', color: 'accent'})}<${Text} size="sm">${c.ai.next}<//></div>` : null}
        </div><small class="ax-at">${m.at}</small></div>`; }
        if (m.t === 'form') return html`<div key=${i} class="ax-msg l"><div class="ax-bubl"><${Text} size="xsm" color="secondary">광고 폼 응답<//><${Text} size="sm">${m.body}<//></div><small class="ax-at">${m.at}</small></div>`;
        if (m.t === 'visit' || m.t === 'pay') return html`<div key=${i} class="ax-msg c"><div class=${'ax-evt ' + m.t}>${ic(TL_IC[m.t], {size: 'sm'})}<div><b>${m.title}</b><span>${m.body}</span></div></div><small class="ax-at">${m.at}</small></div>`;
        return html`<div key=${i} class="ax-msg r"><div class="ax-bubr"><${Text} size="xsm">${m.title}<//><${Text} size="sm">${m.body}<//></div><small class="ax-at">${m.at}</small></div>`;
      })}
      <div ref=${end}></div>
    </div>
    <div class="ax-composer">
      <div class="ax-scrollx tight">${[['상담 기록', 'record'], ['입금', 'pay'], ['통화 결과', 'result'], ['일정', 'record']].map(([l, sh]) => html`<${Token} key=${l} size="sm" label=${l} icon=${ic(H.PlusIcon)} onClick=${() => p.set({sheet: sh})}/>`)}</div>
      <${Stack} direction="horizontal" gap=${2} vAlign="center"><div style=${{flex: 1}}><${TextInput} label="메모 입력" isLabelHidden placeholder="메모 남기기" value=${txt} onChange=${setTxt} onEnter=${send}/></div><${IconButton} label="보내기" variant="primary" icon=${ic(H.PaperAirplaneIcon)} onClick=${send}/><//>
    </div>
  </div>`;
}
function InfoF({p, toast}) {
  const c = p.cur;
  return html`<div class="ax-detail">
    <div class="ax-top"><${IconButton} label="대화로" variant="ghost" icon=${ic(H.ChevronLeftIcon)} onClick=${() => p.set({scr: 'detail'})}/><${Text} weight="semibold">고객 정보<//><${IconButton} label="더보기" variant="ghost" icon=${ic(H.EllipsisHorizontalIcon)} onClick=${() => p.set({sheet: 'more'})}/></div>
    <${Stack} direction="vertical" gap=${3} paddingInline=${4} paddingBlockEnd=${6}>
      <${Stack} direction="vertical" gap=${2} hAlign="center"><${Avatar} name=${c.name} size="xl"/><${Heading} level=${2}>${c.name}<//><${Tags} c=${c}/><//>
      <${AICard} c=${c}/>
      <${ContractCard} c=${c} onPay=${() => p.set({sheet: 'pay'})}/>
      <${Visits} c=${c}/>
      <${InfoMeta} c=${c} onEdit=${() => p.set({sheet: 'edit'})}/>
    <//>
  </div>`;
}
function ConceptF() {
  const p = useProto();
  const [toast, show] = useToast();
  const body = p.s.scr === 'detail' && p.cur ? html`<${ChatF} p=${p} toast=${show}/>` : p.s.scr === 'info' && p.cur ? html`<${InfoF} p=${p} toast=${show}/>` : html`<${InboxF} p=${p}/>`;
  return html`<${ProtoHost} id="F" p=${p}><${Phone} theme="matcha" toast=${toast} nav=${p.s.scr === 'list'} sheet=${html`<${Sheets} p=${p} toast=${show}/>`}>${body}<//><//>`;
}

/* =====================================================================
   시안 G · 현장 모드 다크 (theme: gothic)
   ===================================================================== */
const QORD = c => (c.next && c.next.urgent ? 0 : 1) * 10 + ({'재통화': 1, '첫 연락': 0, '재시도': 2, '방문': 3, '2차 계약금': 4}[c.next && c.next.t] ?? 9);
function ListG({p, toast, qi, setQi}) {
  const q = p.cust.filter(c => c.next && !['종료', '현장 이관', '입주 안내'].includes(c.next.t)).sort((a, b) => QORD(a) - QORD(b));
  const cur = q[qi % q.length];
  const list = applyF(p.cust, p.s);
  return html`<${Stack} direction="vertical" gap=${4} padding=${4}>
    <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Heading} level=${2}>현장 모드<//><${Badge} label=${`대기 ${q.length}명`} variant="info"/><//>
    <${Card} variant="purple" padding=${5}><${Stack} direction="vertical" gap=${3}>
      <${Text} size="sm" weight="semibold">다음 전화 · ${(qi % q.length) + 1}/${q.length}<//>
      <div class="ax-gname">${cur.name}</div>
      <${Tags} c=${cur}/>
      <${Text} size="lg">${cur.next.t} · ${cur.next.at}<//>
      <${Text}>${cur.ai ? cur.ai.next : cur.next.why || cur.form || ''}<//>
      <${Button} variant="primary" size="lg" width="100%" label="전화 걸기" icon=${ic(H.PhoneIcon)} onClick=${() => { p.set({id: cur.id}); toast('전화 연결 · ' + PROTO); setTimeout(() => p.set({sheet: 'result', id: cur.id}), 700); }}/>
      <${Stack} direction="horizontal" gap=${2}><${Button} size="lg" width="100%" label="건너뛰기" onClick=${() => setQi(qi + 1)}/><${Button} size="lg" width="100%" label="상세" onClick=${() => p.set({scr: 'detail', id: cur.id})}/><//>
    <//><//>
    <${SearchBox} p=${p} ph="고객 찾기"/>
    <div class="ax-gchips">${[{k: '전체', n: TOTAL}, ...ALL_ST].map(s => html`<${ToggleButton} key=${s.k} size="lg" label=${`${s.k} ${fmt(s.n)}`} isPressed=${p.s.st === s.k} onPressedChange=${() => p.set({st: s.k})}/>`)}</div>
    <${Stack} direction="horizontal" gap=${2}><${Button} size="lg" width="100%" label=${fCount(p.s.f) ? `필터 ${fCount(p.s.f)}` : '필터'} icon=${ic(H.FunnelIcon)} onClick=${() => p.set({sheet: 'filter'})}/><${Button} size="lg" width="100%" label="정렬" icon=${ic(H.ArrowsUpDownIcon)} onClick=${() => p.set({sheet: 'sort'})}/><//>
    <${AppliedBar} p=${p}/>
    <${List} hasDividers density="spacious">${list.map(c => html`<${ListItem} key=${c.id} label=${html`<${Text} size="lg" weight="semibold">${c.name}<//>`} description=${`${c.stage}${c.result ? ' · ' + c.result : ''} · ${c.next ? c.next.t + ' ' + c.next.at : ''}`}
      endContent=${html`<${IconButton} size="lg" label=${c.name + ' 전화'} icon=${ic(H.PhoneIcon)} onClick=${e => { e && e.stopPropagation && e.stopPropagation(); p.set({id: c.id}); toast('전화 연결 · ' + PROTO); setTimeout(() => p.set({sheet: 'result', id: c.id}), 700); }}/>`}
      onClick=${() => p.set({scr: 'detail', id: c.id})}/>`)}<//>
    ${list.length ? null : html`<${Empty} p=${p}/>`}
  <//>`;
}
function DetailG({p, toast}) {
  const c = p.cur;
  return html`<div class="ax-detail">
    <div class="ax-top"><${Button} variant="ghost" size="lg" label="뒤로" icon=${ic(H.ChevronLeftIcon)} onClick=${() => p.set({scr: 'list', id: null})}/><span></span><${IconButton} size="lg" label="더보기" variant="ghost" icon=${ic(H.EllipsisHorizontalIcon)} onClick=${() => p.set({sheet: 'more'})}/></div>
    <${Stack} direction="vertical" gap=${4} paddingInline=${4} paddingBlockEnd=${4}>
      <div class="ax-gname">${c.name}</div>
      <${Tags} c=${c}/>
      <${Text} size="lg">${c.site} · ${c.owner}<//>
      <${Card} variant="purple" padding=${4}><${Stack} direction="vertical" gap=${2}><${Text} weight="semibold">다음 할 일<//><${Text} size="xl" weight="bold">${c.next ? `${c.next.t} · ${c.next.at}` : '—'}<//><${Text}>${c.ai ? c.ai.next : (c.next && c.next.why) || ''}<//><//><//>
      <${Collapsible} trigger=${html`<${Text} size="lg" weight="semibold">AI 요약<//>`} defaultIsOpen=${true}><${AICard} c=${c} compact/><//>
      ${c.contract ? html`<${Collapsible} trigger=${html`<${Text} size="lg" weight="semibold">계약<//>`} defaultIsOpen=${true}><${ContractCard} c=${c}/><//>` : null}
      <${Collapsible} trigger=${html`<${Text} size="lg" weight="semibold">기록 ${c.memos.length}<//>`} defaultIsOpen=${false}><${Memos} c=${c}/><//>
      <${Collapsible} trigger=${html`<${Text} size="lg" weight="semibold">통화 ${c.calls.length}<//>`} defaultIsOpen=${false}><${CallList} c=${c}/><//>
      <${Collapsible} trigger=${html`<${Text} size="lg" weight="semibold">기본 정보<//>`} defaultIsOpen=${false}><${InfoMeta} c=${c} onEdit=${() => p.set({sheet: 'edit'})}/><//>
      <${Collapsible} trigger=${html`<${Text} size="lg" weight="semibold">타임라인<//>`} defaultIsOpen=${false}><${Timeline} c=${c}/><//>
    <//>
    <${ActionBar} c=${c} p=${p} toast=${toast} big/>
  </div>`;
}
function ConceptG() {
  const p = useProto();
  const [toast, show] = useToast();
  const [qi, setQi] = useState(0);
  const body = p.s.scr === 'detail' && p.cur ? html`<${DetailG} p=${p} toast=${show}/>` : html`<${ListG} p=${p} toast=${show} qi=${qi} setQi=${setQi}/>`;
  return html`<${ProtoHost} id="G" p=${p}><${Phone} theme="gothic" dark toast=${toast} nav=${p.s.scr !== 'detail'} sheet=${html`<${Sheets} p=${p} toast=${show} big onDone=${() => p.s.scr !== 'detail' && setQi(q => q + 1)}/>`}>${body}<//><//>`;
}
