
/* =====================================================================
   시안 A · 파이프라인 보드 (theme: neutral)
   ===================================================================== */
const stIdx = k => STAGE.findIndex(s => s.k === k);
function CardA({c, onOpen}) {
  return html`<${ClickableCard} label=${c.name + ' 상세 보기'} padding=${3} onClick=${onOpen}>
    <${Stack} direction="vertical" gap=${1.5}>
      <${Stack} direction="horizontal" hAlign="between" vAlign="center" gap=${2}>
        <${Heading} level=${5}>${c.name}<//><${Tags} c=${c}/>
      <//>
      <${Text} size="sm" color="secondary">${c.site} · ${c.owner}<//>
      <${NextLine} c=${c}/>
      ${c.ai ? html`<${Stack} direction="horizontal" gap=${1} wrap="wrap">${c.ai.kw.slice(0, 3).map(k => html`<${Token} key=${k} size="sm" color="blue" label=${k}/>`)}<//>` : null}
      <${LastLine} c=${c}/>
    <//>
  <//>`;
}
function ListHeadA({p}) {
  const res = RESULT;
  return html`<div class="ax-head">
    <${Stack} direction="horizontal" hAlign="between" vAlign="center">
      <${Stack} direction="horizontal" gap=${2} vAlign="baseline"><${Heading} level=${2}>고객<//><${Text} color="secondary">${fmt(TOTAL)}명<//><//>
      <${Stack} direction="horizontal" gap=${1}><${IconButton} label="상태 전체 보기" variant="ghost" icon=${ic(H.ListBulletIcon)} onClick=${() => p.set({sheet: 'status'})}/><${IconButton} label="고객 등록" variant="primary" icon=${ic(H.PlusIcon)} onClick=${() => p.set({sheet: 'add'})}/><//>
    <//>
    <${SearchBox} p=${p}/>
    <div class="ax-funnel" role="tablist" aria-label="영업 단계">
      ${STAGE.map((s, i) => html`<button key=${s.k} role="tab" aria-selected=${p.s.st === s.k} class=${'ax-fun' + (p.s.st === s.k ? ' on' : '')} style=${{'--c': `var(--color-text-${s.c === 'gray' ? 'secondary' : s.c})`, '--b': `var(--color-background-${s.c})`}} onClick=${() => p.set({st: p.s.st === s.k ? '전체' : s.k})}>
        <b>${fmt(s.n)}</b><span>${s.k}</span></button>`)}
    </div>
    <${Stack} direction="horizontal" gap=${1} vAlign="center" wrap="wrap">
      <${Text} size="xsm" color="secondary">결과<//>
      ${res.map(s => html`<${Chip} key=${s.k} label=${`${s.k} ${fmt(s.n)}`} on=${p.s.st === s.k} onClick=${() => p.set({st: p.s.st === s.k ? '전체' : s.k})}/>`)}
      <${Chip} label="등급 · 상품 ▾" on=${['상', '중', '하', '아파트먼트'].includes(p.s.st)} onClick=${() => p.set({sheet: 'status'})}/>
    <//>
    <${Stack} direction="horizontal" hAlign="between" vAlign="center">
      <${Stack} direction="horizontal" gap=${1}>
        <${Button} size="sm" label=${fCount(p.s.f) ? `필터 ${fCount(p.s.f)}` : '필터'} icon=${ic(H.FunnelIcon)} onClick=${() => p.set({sheet: 'filter'})}/>
        <${Button} size="sm" variant="ghost" label=${p.s.f.sort} icon=${ic(H.ArrowsUpDownIcon)} onClick=${() => p.set({sheet: 'sort'})}/>
      <//>
      <${SegmentedControl} label="보기 방식" size="sm" value=${p.s.view} onChange=${v => p.set({view: v})}>
        <${SegmentedControlItem} value="list" label="목록" icon=${ic(H.QueueListIcon)} isLabelHidden/>
        <${SegmentedControlItem} value="board" label="보드" icon=${ic(H.ViewColumnsIcon)} isLabelHidden/>
      <//>
    <//>
    <${AppliedBar} p=${p}/>
  </div>`;
}
function BoardA({p, list}) {
  return html`<div class="ax-board">${STAGE.map(s => {
    const l = list.filter(c => c.stage === s.k);
    return html`<div key=${s.k} class="ax-col"><${Stack} direction="horizontal" hAlign="between" vAlign="center" paddingBlockEnd=${2}>
      <${Badge} label=${s.k} variant=${badgeV(s.c)}/><${Text} size="xsm" color="secondary">전체 ${fmt(s.n)}<//><//>
      <${Stack} direction="vertical" gap=${2}>${l.length ? l.map(c => html`<${ClickableCard} key=${c.id} label=${c.name} padding=${2} onClick=${() => p.set({scr: 'detail', id: c.id})}>
        <${Stack} direction="vertical" gap=${1}><${Text} weight="semibold">${c.name}<//><${Text} size="xsm" color="secondary" maxLines=${1}>${c.site}<//><${NextLine} c=${c} compact/>${c.result ? html`<${StBadge} k=${c.result}/>` : null}<//><//>`) : html`<${Text} size="sm" color="secondary">해당 고객 없음<//>`}<//>
    </div>`;
  })}</div>`;
}
function DetailA({p, toast}) {
  const c = p.cur, i = stIdx(c.stage);
  return html`<div class="ax-detail">
    <div class="ax-top"><${IconButton} label="뒤로" variant="ghost" icon=${ic(H.ChevronLeftIcon)} onClick=${() => p.set({scr: 'list', id: null})}/><${Text} weight="semibold">${c.name}<//><${IconButton} label="더보기" variant="ghost" icon=${ic(H.EllipsisHorizontalIcon)} onClick=${() => p.set({sheet: 'more'})}/></div>
    <${Stack} direction="vertical" gap=${3} paddingInline=${4} paddingBlockEnd=${4}>
      <${Stack} direction="vertical" gap=${1}>
        <${Stack} direction="horizontal" gap=${2} vAlign="center"><${Heading} level=${2}>${c.name}<//><${Tags} c=${c}/><//>
        <${Text} color="secondary">${c.site} · ${c.owner} · ${mask(c.phone)}<//>
      <//>
      <${Card} padding=${3}><${Stack} direction="vertical" gap=${2}>
        <${Stack} direction="horizontal" hAlign="between"><${Text} size="sm" weight="semibold">영업 단계<//><${Button} size="sm" variant="ghost" label="단계 변경" onClick=${() => p.set({sheet: 'edit'})}/><//>
        <div class="ax-steps">${STAGE.map((s, j) => html`<div key=${s.k} class=${'ax-stp' + (j < i ? ' done' : j === i ? ' on' : '')}><i>${j < i ? '✓' : j + 1}</i><span>${s.k}</span></div>`)}</div>
      <//><//>
      ${c.result ? html`<${Banner} status=${c.result === '재통화' ? 'info' : 'warning'} title=${`${c.result} · ${c.next ? c.next.at : ''}`} description=${c.next ? c.next.why : ''}/>` : null}
      <${Card} variant="muted" padding=${3}><${Stack} direction="vertical" gap=${1}><${Text} size="sm" color="secondary">다음 할 일<//><${NextLine} c=${c}/><//><//>
      <${AICard} c=${c}/>
      <${ContractCard} c=${c} onPay=${() => p.set({sheet: 'pay'})}/>
      <${Visits} c=${c} onAdd=${() => p.set({sheet: 'record'})}/>
      <${Card}><${Stack} direction="vertical" gap=${2}><${SecH} t=${`기록 ${c.memos.length}`} I=${H.PencilSquareIcon} end=${html`<${Button} size="sm" variant="ghost" label="추가" icon=${ic(H.PlusIcon)} onClick=${() => p.set({sheet: 'record'})}/>`}/><${Memos} c=${c}/><//><//>
      <${Card}><${Stack} direction="vertical" gap=${2}><${SecH} t=${`통화 ${c.calls.length}`} I=${H.PhoneIcon}/><${CallList} c=${c}/><//><//>
      <${InfoMeta} c=${c} onEdit=${() => p.set({sheet: 'edit'})}/>
      <${Card}><${Collapsible} trigger=${html`<${Heading} level=${5}>활동 타임라인 ${c.tl.length}<//>`} defaultIsOpen=${false}><${Timeline} c=${c}/><//><//>
    <//>
    <${ActionBar} c=${c} p=${p} toast=${toast}/>
  </div>`;
}
function ConceptA() {
  const p = useProto();
  const [toast, show] = useToast();
  const list = applyF(p.cust, p.s);
  const body = p.s.scr === 'detail' && p.cur ? html`<${DetailA} p=${p} toast=${show}/>` : html`<div>
    <${ListHeadA} p=${p}/>
    <div class="ax-pad"><${ScopeNote} p=${p} n=${list.length}/></div>
    ${p.s.view === 'board' ? html`<${BoardA} p=${p} list=${list}/>` : html`<${Stack} direction="vertical" gap=${2} paddingInline=${4} paddingBlockEnd=${6}>
      ${list.length ? list.map(c => html`<${CardA} key=${c.id} c=${c} onOpen=${() => p.set({scr: 'detail', id: c.id})}/>`) : html`<${Empty} p=${p}/>`}<//>`}
  </div>`;
  return html`<${ProtoHost} id="A" p=${p}><${Phone} theme="neutral" toast=${toast} nav=${p.s.scr !== 'detail'} sheet=${html`<${Sheets} p=${p} toast=${show}/>`}>${body}<//><//>`;
}

/* =====================================================================
   시안 B · 오늘 할 일 (theme: butter)
   ===================================================================== */
function TodayCard({c, p, toast, reason}) {
  return html`<${Card} padding=${3}><${Stack} direction="vertical" gap=${2}>
    <${Stack} direction="horizontal" hAlign="between" vAlign="start">
      <${Stack} direction="vertical" gap=${0.5}><${Stack} direction="horizontal" gap=${1.5} vAlign="center"><${Heading} level=${5}>${c.name}<//><${Tags} c=${c}/><//>
        <${Text} size="sm" color="secondary">${c.site}<//><//>
      <${Text} size="sm" weight="semibold" color=${c.next.urgent ? 'accent' : 'primary'}>${c.next.at}<//>
    <//>
    <${Text} size="sm">${reason || c.next.why || c.form || ''}<//>
    ${c.ai ? html`<div class="ax-next sm">${ic(H.LightBulbIcon, {size: 'sm', color: 'accent'})}<${Text} size="sm">${c.ai.next}<//></div>` : null}
    ${c.tries ? html`<${ProgressBar} label="연락 시도" value=${c.tries} max=${5} hasValueLabel formatValueLabel=${v => `${v}회 / 최대 5회`} variant="warning"/>` : null}
    <${Stack} direction="horizontal" gap=${2}>
      <${Button} variant="primary" label="전화" icon=${ic(H.PhoneIcon)} width="100%" onClick=${() => { p.set({id: c.id}); toast('전화 연결 · ' + PROTO); setTimeout(() => p.set({sheet: 'result', id: c.id}), 600); }}/>
      <${Button} label="상세" width=${84} onClick=${() => p.set({scr: 'detail', id: c.id, from: 'today'})}/>
    <//>
  <//><//>`;
}
function TodayB({p, toast}) {
  const by = f => p.cust.filter(f);
  const urgent = by(c => c.next && c.next.urgent);
  const visit = by(c => c.next && c.next.t === '방문');
  const retry = by(c => c.next && c.next.t === '재시도');
  const money = by(c => c.contract && c.next && c.next.t === '2차 계약금');
  const recall = by(c => c.next && c.next.t === '재통화' && !c.next.urgent);
  const sec = (t, sub, l, I) => l.length ? html`<${Stack} direction="vertical" gap=${2}>
    <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Stack} direction="horizontal" gap=${1.5} vAlign="center">${ic(I, {color: 'accent'})}<${Heading} level=${4}>${t}<//><${Badge} label=${String(l.length)} variant="neutral"/><//><${Text} size="xsm" color="secondary">${sub}<//><//>
    ${l.map(c => html`<${TodayCard} key=${c.id} c=${c} p=${p} toast=${toast}/>`)}<//>` : null;
  return html`<${Stack} direction="vertical" gap=${5} padding=${4}>
    <${Stack} direction="vertical" gap=${0.5}>
      <${Text} color="secondary">11월 9일 일요일<//>
      <${Heading} level=${1} type="display-3">오늘 할 일<//>
    <//>
    <div class="ax-kpi">
      ${[['지금 연락', urgent.length, H.BoltIcon, 'yellow'], ['오늘 방문', visit.length, H.CalendarDaysIcon, 'blue'], ['부재 재시도', retry.length, H.ArrowPathIcon, 'pink'], ['계약 일정', money.length, H.BanknotesIcon, 'orange']].map(([t, n, I, v]) => html`<${Card} key=${t} variant=${v} padding=${3}><${Stack} direction="vertical" gap=${1}>${ic(I)}<${Heading} level=${2}>${n}<//><${Text} size="sm">${t}<//><//><//>`)}
    </div>
    ${sec('지금 연락할 고객', '신규는 5분 안에', urgent, H.BoltIcon)}
    ${sec('오늘 · 내일 방문', '방문 전 확인 문자', visit, H.CalendarDaysIcon)}
    ${sec('다시 걸 고객', '저녁 · 점심 시간대', retry, H.ArrowPathIcon)}
    ${sec('예정된 재통화', '시간 맞춰 알림', recall, H.PhoneArrowUpRightIcon)}
    ${sec('계약 일정', '입금 안내', money, H.BanknotesIcon)}
    <${ClickableCard} label="전체 고객 보기" padding=${4} onClick=${() => p.set({scr: 'all'})}>
      <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Stack} direction="vertical" gap=${0.5}><${Heading} level=${4}>전체 고객 보기<//><${Text} size="sm" color="secondary">${fmt(TOTAL)}명 · 상태 12종 · 필터 · 검색<//><//>${ic(H.ChevronRightIcon)}<//>
    <//>
  <//>`;
}
function AllB({p}) {
  const list = applyF(p.cust, p.s);
  return html`<div>
    <div class="ax-head">
      <${Stack} direction="horizontal" gap=${1} vAlign="center"><${IconButton} label="오늘로" variant="ghost" icon=${ic(H.ChevronLeftIcon)} onClick=${() => p.set({scr: 'today'})}/><${Heading} level=${3}>전체 고객<//><${Text} color="secondary">${fmt(TOTAL)}명<//><//>
      <${SearchBox} p=${p}/>
      <div class="ax-scrollx">
        <${Chip} label=${`전체 ${fmt(TOTAL)}`} on=${p.s.st === '전체'} onClick=${() => p.set({st: '전체'})}/>
        ${ST_GROUPS.map(g => html`<span key=${g.g} class="ax-gsep">${g.g}</span>${g.items.map(s => html`<${Chip} key=${s.k} label=${`${s.k} ${fmt(s.n)}`} on=${p.s.st === s.k} onClick=${() => p.set({st: s.k})}/>`)}`)}
      </div>
      <${Stack} direction="horizontal" gap=${1}>
        <${Button} size="sm" label=${fCount(p.s.f) ? `필터 ${fCount(p.s.f)}` : '필터'} icon=${ic(H.FunnelIcon)} onClick=${() => p.set({sheet: 'filter'})}/>
        <${Button} size="sm" variant="ghost" label=${p.s.f.sort} icon=${ic(H.ArrowsUpDownIcon)} onClick=${() => p.set({sheet: 'sort'})}/>
        <${Button} size="sm" variant="ghost" label="상태 묶음 보기" onClick=${() => p.set({sheet: 'status'})}/>
      <//>
      <${AppliedBar} p=${p}/>
    </div>
    <div class="ax-pad"><${ScopeNote} p=${p} n=${list.length}/></div>
    <${Stack} direction="vertical" gap=${2} paddingInline=${4} paddingBlockEnd=${6}>
      ${list.length ? list.map(c => html`<${CardA} key=${c.id} c=${c} onOpen=${() => p.set({scr: 'detail', id: c.id, from: 'all'})}/>`) : html`<${Empty} p=${p}/>`}
    <//>
  </div>`;
}
function DetailB({p, toast}) {
  const c = p.cur;
  return html`<div class="ax-detail">
    <div class="ax-top"><${IconButton} label="뒤로" variant="ghost" icon=${ic(H.ChevronLeftIcon)} onClick=${() => p.set({scr: p.s.from || 'today', id: null})}/><${Text} weight="semibold">${c.name}<//><${IconButton} label="더보기" variant="ghost" icon=${ic(H.EllipsisHorizontalIcon)} onClick=${() => p.set({sheet: 'more'})}/></div>
    <${Stack} direction="vertical" gap=${3} paddingInline=${4} paddingBlockEnd=${4}>
      <${Card} variant="yellow" padding=${4}><${Stack} direction="vertical" gap=${2}>
        <${Text} size="sm" weight="semibold">지금 할 일<//>
        <${Heading} level=${3}>${c.next ? `${c.next.t} · ${c.next.at}` : '다음 할 일 없음'}<//>
        ${c.next && c.next.why ? html`<${Text}>${c.next.why}<//>` : null}
        ${c.ai ? html`<div class="ax-next">${ic(H.LightBulbIcon, {color: 'accent'})}<${Text} size="sm">${c.ai.next}<//></div>` : null}
        <${Stack} direction="horizontal" gap=${2}><${Button} variant="primary" label="전화하고 결과 기록" icon=${ic(H.PhoneIcon)} width="100%" onClick=${() => { toast('전화 연결 · ' + PROTO); setTimeout(() => p.set({sheet: 'result'}), 600); }}/><//>
      <//><//>
      <${Stack} direction="vertical" gap=${1}><${Stack} direction="horizontal" gap=${2} vAlign="center"><${Heading} level=${3}>${c.name}<//><${Tags} c=${c}/><//><${Text} color="secondary">${c.site} · ${c.owner}<//><//>
      <${AICard} c=${c}/>
      <${ContractCard} c=${c} onPay=${() => p.set({sheet: 'pay'})}/>
      <${Card}><${Stack} direction="vertical" gap=${2}><${SecH} t=${`기록 ${c.memos.length}`} I=${H.PencilSquareIcon} end=${html`<${Button} size="sm" variant="ghost" label="추가" icon=${ic(H.PlusIcon)} onClick=${() => p.set({sheet: 'record'})}/>`}/><${Memos} c=${c}/><//><//>
      <${Visits} c=${c} onAdd=${() => p.set({sheet: 'record'})}/>
      <${Card}><${Stack} direction="vertical" gap=${2}><${SecH} t=${`통화 ${c.calls.length}`} I=${H.PhoneIcon}/><${CallList} c=${c}/><//><//>
      <${InfoMeta} c=${c} onEdit=${() => p.set({sheet: 'edit'})}/>
      <${Card}><${Stack} direction="vertical" gap=${2}><${SecH} t="활동 타임라인" I=${H.ClockIcon}/><${Timeline} c=${c} max=${4}/><//><//>
    <//>
    <${ActionBar} c=${c} p=${p} toast=${toast}/>
  </div>`;
}
function ConceptB() {
  const p = useProto({scr: 'today'});
  const [toast, show] = useToast();
  const body = p.s.scr === 'detail' && p.cur ? html`<${DetailB} p=${p} toast=${show}/>` : p.s.scr === 'all' ? html`<${AllB} p=${p}/>` : html`<${TodayB} p=${p} toast=${show}/>`;
  return html`<${ProtoHost} id="B" p=${p}><${Phone} theme="butter" toast=${toast} nav=${p.s.scr !== 'detail'} sheet=${html`<${Sheets} p=${p} toast=${show}/>`}
    fab=${p.s.scr !== 'detail' ? html`<div class="ax-fab"><${IconButton} label="고객 등록" variant="primary" size="lg" icon=${ic(H.PlusIcon)} elevation="high" onClick=${() => p.set({sheet: 'add'})}/></div>` : null}>${body}<//><//>`;
}

/* =====================================================================
   시안 C · AI 브리핑 (theme: y2k)
   ===================================================================== */
const SIG = {1: 34, 2: 51, 3: 68, 4: 88, 5: 92, 6: 27, 7: 79, 8: 95, 9: 72, 10: 18, 11: 3, 12: 22};
const NEEDS = {
  3: [['희망 타입', '84타입'], ['자금', '중도금 대출 문의'], ['연락 선호', '퇴근 후']],
  4: [['희망 타입', '74A 고층'], ['목적', '실거주'], ['방문 의사', '있음 · 2인'], ['관심 포인트', '한강뷰']],
  5: [['계약 호실', '102동 2004호'], ['목적', '실거주'], ['남은 일', '2차 계약금 · 정계약']],
  7: [['희망 타입', '59 / 84 고민'], ['의사결정', '남편과 상의'], ['방문', '완료']],
  9: [['상품', '아파트먼트'], ['목적', '투자'], ['관심 포인트', '임대 수익률']],
  10: [['관심 현장', '르엘 어퍼하우스'], ['필요 조치', '담당 이관']],
};
function CardC({c, onOpen}) {
  const sg = SIG[c.id] || 0;
  return html`<${ClickableCard} label=${c.name} padding=${3} onClick=${onOpen}>
    <${Stack} direction="vertical" gap=${2}>
      <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Stack} direction="horizontal" gap=${2} vAlign="center"><${Avatar} name=${c.name} size="sm"/><${Heading} level=${5}>${c.name}<//><//><${Tags} c=${c}/><//>
      ${c.ai ? html`<div class="ax-quote">${ic(H.SparklesIcon, {size: 'sm', color: 'accent'})}<${Text} size="sm" maxLines=${2}>${c.ai.sum}<//></div>` : html`<${Text} size="sm" color="secondary">${c.form || 'AI 요약 대기 중 — 통화 후 자동 생성'}<//>`}
      <${Stack} direction="horizontal" gap=${2} vAlign="center"><div style=${{flex: 1}}><${ProgressBar} label="관심 신호" value=${sg} hasValueLabel variant=${sg > 70 ? 'success' : sg > 40 ? 'accent' : 'neutral'}/></div><//>
      <${NextLine} c=${c}/>
      <${Text} size="xsm" color="secondary">${c.site} · ${c.owner}<//>
    <//>
  <//>`;
}
function ListC({p}) {
  const list = applyF(p.cust, p.s);
  const ask = [['방문 가능성 높은 고객', '방문'], ['오늘 연락 필요', '재통화'], ['한강뷰 문의', '한강뷰'], ['계약금 일정', '계약금']];
  const top = [...p.cust].sort((a, b) => (SIG[b.id] || 0) - (SIG[a.id] || 0)).filter(c => c.stage !== '정계약').slice(0, 3);
  return html`<div>
    <div class="ax-head">
      <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Heading} level=${1} type="display-3">고객<//><${IconButton} label="고객 등록" variant="primary" icon=${ic(H.PlusIcon)} onClick=${() => p.set({sheet: 'add'})}/><//>
      <${TextInput} label="AI에게 고객 찾기" isLabelHidden placeholder="예: 74타입 고층 원하는 방문 예정 고객" value=${p.s.q} onChange=${q => p.set({q})} startIcon=${H.SparklesIcon} hasClear/>
      <div class="ax-scrollx">${ask.map(([l, q]) => html`<${Token} key=${l} size="sm" color="purple" label=${l} icon=${ic(H.SparklesIcon)} onClick=${() => p.set({q})}/>`)}</div>
    </div>
    <${Stack} direction="vertical" gap=${3} paddingInline=${4}>
      ${!p.s.q ? html`<${Card} variant="purple" padding=${3}><${Stack} direction="vertical" gap=${2}>
        <${Stack} direction="horizontal" gap=${1.5} vAlign="center">${ic(H.SparklesIcon)}<${Text} weight="semibold">AI가 고른 오늘의 우선순위<//><//>
        ${top.map((c, i) => html`<${Item} key=${c.id} label=${`${i + 1}. ${c.name} · 관심 신호 ${SIG[c.id]}`} description=${c.ai ? c.ai.next : c.next.why} onClick=${() => p.set({scr: 'detail', id: c.id})} descriptionLines=${2}/>`)}
      <//><//>` : null}
      <div class="ax-scrollx">
        <${Chip} label=${`전체 ${fmt(TOTAL)}`} on=${p.s.st === '전체'} onClick=${() => p.set({st: '전체'})}/>
        ${ST_GROUPS.map(g => html`<span key=${g.g} class="ax-gsep">${g.g}</span>${g.items.map(s => html`<${Chip} key=${s.k} label=${`${s.k} ${fmt(s.n)}`} on=${p.s.st === s.k} onClick=${() => p.set({st: s.k})}/>`)}`)}
      </div>
      <${Stack} direction="horizontal" gap=${1}>
        <${Button} size="sm" label=${fCount(p.s.f) ? `필터 ${fCount(p.s.f)}` : '필터'} icon=${ic(H.FunnelIcon)} onClick=${() => p.set({sheet: 'filter'})}/>
        <${Button} size="sm" variant="ghost" label=${p.s.f.sort} icon=${ic(H.ArrowsUpDownIcon)} onClick=${() => p.set({sheet: 'sort'})}/>
      <//>
      <${AppliedBar} p=${p}/>
      <${ScopeNote} p=${p} n=${list.length}/>
      <${Stack} direction="vertical" gap=${2} paddingBlockEnd=${6}>${list.length ? list.map(c => html`<${CardC} key=${c.id} c=${c} onOpen=${() => p.set({scr: 'detail', id: c.id})}/>`) : html`<${Empty} p=${p}/>`}<//>
    <//>
  </div>`;
}
function DraftSheet({c, onClose, toast}) {
  const t = `${c.name}님 안녕하세요, ${c.site} 박지훈입니다.\n${c.ai ? c.ai.kw.slice(0, 2).join(' · ') + ' 관련 ' : ''}자료 보내 드려요. 편하실 때 연락 주세요.`;
  const [v, setV] = useState(t);
  return html`<${Sheet} title="AI 문자 초안" sub="보내기 전에 꼭 확인하세요" onClose=${onClose} tall
    footer=${html`<${Stack} direction="horizontal" gap=${2}><${Button} width=${104} label="다시 쓰기" icon=${ic(H.ArrowPathIcon)} onClick=${() => setV(t + '\n(다른 말투)')}/><${Button} variant="primary" width="100%" label="문자 앱으로 보내기" onClick=${() => { onClose(); toast('문자 앱 열기 · ' + PROTO); }}/><//>`}>
    <${Stack} direction="vertical" gap=${3} paddingInline=${4} paddingBlockEnd=${4}>
      <${TextArea} label="문자 내용" value=${v} onChange=${setV}/>
      <${Text} size="sm" color="secondary">첨부 제안: 분양가표 · 잔여 세대표 · 견본주택 위치<//>
    <//>
  <//>`;
}
function DetailC({p, toast}) {
  const c = p.cur, needs = NEEDS[c.id];
  const [saved, setSaved] = useState(false);
  return html`<div class="ax-detail">
    <div class="ax-top"><${IconButton} label="뒤로" variant="ghost" icon=${ic(H.ChevronLeftIcon)} onClick=${() => p.set({scr: 'list', id: null})}/><${Text} weight="semibold">${c.name}<//><${IconButton} label="더보기" variant="ghost" icon=${ic(H.EllipsisHorizontalIcon)} onClick=${() => p.set({sheet: 'more'})}/></div>
    <${Stack} direction="vertical" gap=${3} paddingInline=${4} paddingBlockEnd=${4}>
      <${Stack} direction="horizontal" gap=${3} vAlign="center"><${Avatar} name=${c.name} size="lg"/><${Stack} direction="vertical" gap=${1}><${Heading} level=${2} type="display-3">${c.name}<//><${Tags} c=${c}/><//><//>
      <${Text} color="secondary">${c.site} · ${c.owner} · ${mask(c.phone)}<//>
      ${c.ai ? html`<${Card} variant="purple" padding=${4}><${Stack} direction="vertical" gap=${3}>
        <${Stack} direction="horizontal" hAlign="between" vAlign="center"><${Stack} direction="horizontal" gap=${1.5} vAlign="center">${ic(H.SparklesIcon)}<${Heading} level=${4}>AI 브리핑<//><//><${Badge} label=${`관심 신호 ${SIG[c.id]}`} variant=${SIG[c.id] > 70 ? 'success' : 'info'}/><//>
        <${Text}>${c.ai.sum}<//>
        ${needs ? html`<${MetadataList} title="고객 니즈" columns=${2}>${needs.map(([l, v]) => html`<${MetadataListItem} key=${l} label=${l}>${v}<//>`)}<//>` : null}
        <${Divider}/>
        <${Stack} direction="vertical" gap=${1}><${Text} size="sm" weight="semibold">다음 행동<//><${Text}>${c.ai.next}<//><//>
        <${Stack} direction="vertical" gap=${2}><${Button} variant="primary" width="100%" label="문자 초안 보기" icon=${ic(H.ChatBubbleLeftEllipsisIcon)} onClick=${() => p.set({sheet: 'draft'})}/><${Button} width="100%" label="전화하고 결과 기록" icon=${ic(H.PhoneIcon)} onClick=${() => { toast('전화 연결 · ' + PROTO); setTimeout(() => p.set({sheet: 'result'}), 600); }}/><//>
        <${Text} size="xsm" color="secondary">AI가 만든 내용이에요. 틀릴 수 있으니 확인 후 사용하세요.<//>
      <//><//>` : html`<${AICard} c=${c}/>`}
      ${c.calls.length ? html`<${Card} padding=${3}><${Stack} direction="vertical" gap=${2}>
        <${SecH} t="AI가 정리한 상담 기록" I=${H.DocumentTextIcon} end=${html`<${Badge} label=${saved ? '저장됨' : '확인 필요'} variant=${saved ? 'green' : 'yellow'}/>`}/>
        <${Text} size="sm" color="secondary">최근 통화 내용으로 상담 기록 양식을 미리 채웠어요. 손으로 다시 적지 않아도 돼요.<//>
        <${MetadataList} columns=${1}>${(needs || [['요약', c.calls[0].sum]]).map(([l, v]) => html`<${MetadataListItem} key=${l} label=${l}>${v}<//>`)}<//>
        ${saved ? null : html`<${Stack} direction="horizontal" gap=${2}><${Button} size="sm" variant="primary" label="기록으로 저장" onClick=${() => { setSaved(true); toast('상담 기록 저장 · ' + PROTO); }}/><${Button} size="sm" label="고쳐서 저장" onClick=${() => p.set({sheet: 'record'})}/><//>`}
      <//><//>` : null}
      <${Card}><${Stack} direction="vertical" gap=${2}><${SecH} t=${`통화 ${c.calls.length} · 녹음 포함`} I=${H.MicrophoneIcon}/><${CallList} c=${c}/><//><//>
      <${ContractCard} c=${c} onPay=${() => p.set({sheet: 'pay'})}/>
      <${Visits} c=${c}/>
      <${Card}><${Stack} direction="vertical" gap=${2}><${SecH} t=${`기록 ${c.memos.length}`} I=${H.PencilSquareIcon} end=${html`<${Button} size="sm" variant="ghost" label="추가" icon=${ic(H.PlusIcon)} onClick=${() => p.set({sheet: 'record'})}/>`}/><${Memos} c=${c}/><//><//>
      <${InfoMeta} c=${c} onEdit=${() => p.set({sheet: 'edit'})}/>
      <${Card}><${Collapsible} trigger=${html`<${Heading} level=${5}>활동 타임라인 ${c.tl.length}<//>`} defaultIsOpen=${false}><${Timeline} c=${c}/><//><//>
    <//>
  </div>`;
}
function ConceptC() {
  const p = useProto();
  const [toast, show] = useToast();
  const sheet = p.s.sheet === 'draft' && p.cur ? html`<${DraftSheet} c=${p.cur} onClose=${() => p.set({sheet: null})} toast=${show}/>` : html`<${Sheets} p=${p} toast=${show}/>`;
  const body = p.s.scr === 'detail' && p.cur ? html`<${DetailC} p=${p} toast=${show}/>` : html`<${ListC} p=${p}/>`;
  return html`<${ProtoHost} id="C" p=${p}><${Phone} theme="y2k" toast=${toast} nav=${p.s.scr !== 'detail'} sheet=${sheet}>${body}<//><//>`;
}

/* =====================================================================
   시안 D · 고밀도 리스트 (theme: stone)
   ===================================================================== */
function RowD({c, sel, selMode, onSel, onOpen}) {
  const s = stInfo(c.stage);
  return html`<div class=${'ax-row' + (sel ? ' sel' : '')} onClick=${selMode ? onSel : onOpen} role="button" tabIndex="0">
    ${selMode ? html`<span onClick=${e => e.stopPropagation()}><${CheckboxInput} label=${c.name + ' 선택'} isLabelHidden value=${sel} onChange=${onSel}/></span>` : null}
    <span class="ax-rowd" style=${{background: `var(--color-text-${s.c === 'gray' ? 'secondary' : s.c})`}}></span>
    <div class="ax-rowm">
      <div class="ax-rowl"><b>${c.name}</b><span>${c.stage}${c.result ? ' · ' + c.result : ''}${c.grade ? ' · 관심 ' + c.grade : ''}${c.product ? ' · ' + c.product : ''}</span></div>
      <div class="ax-rows">${c.site} · ${c.owner.replace(' (나)', '')}</div>
      <div class="ax-rown">${c.next ? `${c.next.t} ${c.next.at}` : ''}</div>
    </div>
    <div class="ax-rowr"><span>${c.last ? c.last.at.split(' ')[0] : '—'}</span><small>${c.last ? c.last.kind : '연락 전'}</small></div>
  </div>`;
}
function ListD({p, toast}) {
  const list = applyF(p.cust, p.s);
  const [selMode, setSelMode] = useState(false);
  const [sel, setSel] = useState([]);
  const tg = id => setSel(o => o.includes(id) ? o.filter(x => x !== id) : [...o, id]);
  const stLabel = (p.s.stMulti || []).length ? `상태 ${p.s.stMulti.length}` : '상태';
  return html`<div>
    <div class="ax-head tight">
      <${Stack} direction="horizontal" hAlign="between" vAlign="center">
        <${Stack} direction="horizontal" gap=${2} vAlign="baseline"><${Heading} level=${3}>고객<//><${Text} size="sm" color="secondary" hasTabularNumbers>${fmt(TOTAL)}<//><//>
        <${Stack} direction="horizontal" gap=${1}><${ToggleButton} size="sm" label="선택" isPressed=${selMode} onPressedChange=${v => { setSelMode(v); setSel([]); }}/><${IconButton} size="sm" label="고객 등록" variant="primary" icon=${ic(H.PlusIcon)} onClick=${() => p.set({sheet: 'add'})}/><//>
      <//>
      <${SearchBox} p=${p}/>
      <${Stack} direction="horizontal" gap=${1} wrap="wrap">
        <${Button} size="sm" label=${stLabel} icon=${ic(H.Squares2X2Icon)} onClick=${() => p.set({sheet: 'status'})}/>
        <${Button} size="sm" label=${fCount(p.s.f) ? `필터 ${fCount(p.s.f)}` : '필터'} icon=${ic(H.FunnelIcon)} onClick=${() => p.set({sheet: 'filter'})}/>
        <${Button} size="sm" variant="ghost" label=${p.s.f.sort} icon=${ic(H.ArrowsUpDownIcon)} onClick=${() => p.set({sheet: 'sort'})}/>
      <//>
      <${AppliedBar} p=${p}/>
    </div>
    <div class="ax-rowhead"><span>이름 · 단계 · 현장</span><span>최근 연락</span></div>
    <div class="ax-rows-wrap">${list.length ? list.map(c => html`<${RowD} key=${c.id} c=${c} selMode=${selMode} sel=${sel.includes(c.id)} onSel=${() => tg(c.id)} onOpen=${() => p.set({scr: 'detail', id: c.id})}/>`) : html`<${Empty} p=${p}/>`}</div>
    <div class="ax-pad"><${ScopeNote} p=${p} n=${list.length}/></div>
    ${selMode && sel.length ? html`<div class="ax-bulk"><${Text} weight="semibold">${sel.length}명 선택<//><${Stack} direction="horizontal" gap=${1}>
      <${Button} size="sm" label="담당자 지정" onClick=${() => toast('담당자 지정 · ' + PROTO)}/><${Button} size="sm" label="문자" onClick=${() => toast('단체 문자 · ' + PROTO)}/><${Button} size="sm" label="단계 변경" onClick=${() => toast('단계 변경 · ' + PROTO)}/><//></div>` : null}
  </div>`;
}
function DetailD({p, toast}) {
  const c = p.cur;
  const [tab, setTab] = useState('개요');
  const tabs = [['개요'], ['기록', c.memos.length], ['통화', c.calls.length], ['일정', c.visits.length], ['정보']];
  return html`<div class="ax-detail">
    <div class="ax-top"><${IconButton} label="뒤로" variant="ghost" icon=${ic(H.ChevronLeftIcon)} onClick=${() => p.set({scr: 'list', id: null})}/>
      <${Stack} direction="vertical" gap=${0} hAlign="center"><${Text} weight="semibold">${c.name}<//><${Text} size="xsm" color="secondary">${c.stage}${c.result ? ' · ' + c.result : ''}<//><//>
      <${IconButton} label="더보기" variant="ghost" icon=${ic(H.EllipsisHorizontalIcon)} onClick=${() => p.set({sheet: 'more'})}/></div>
    <div class="ax-tabs"><${TabList} value=${tab} onChange=${setTab} layout="fill" size="sm" hasDivider>${tabs.map(([t, n]) => html`<${Tab} key=${t} value=${t} label=${n !== undefined ? `${t} ${n}` : t}/>`)}<//></div>
    <${Stack} direction="vertical" gap=${3} padding=${4}>
      ${tab === '개요' ? html`
        <${MetadataList} columns=${2}>
          <${MetadataListItem} label="단계">${html`<${Tags} c=${c}/>`}<//>
          <${MetadataListItem} label="다음 할 일">${c.next ? `${c.next.t} ${c.next.at}` : '—'}<//>
          <${MetadataListItem} label="현장">${c.site}<//>
          <${MetadataListItem} label="담당자">${c.owner}<//>
          <${MetadataListItem} label="최근 연락">${c.last ? `${c.last.at} ${c.last.kind}` : '—'}<//>
          <${MetadataListItem} label="시도 횟수">${c.tries ? `${c.tries}회` : '—'}<//>
        <//>
        <${AICard} c=${c} compact/>
        <${ContractCard} c=${c} onPay=${() => p.set({sheet: 'pay'})}/>
        <${Card}><${Stack} direction="vertical" gap=${2}><${SecH} t="최근 활동"/><${Timeline} c=${c} max=${3}/><//><//>` : null}
      ${tab === '기록' ? html`<${Button} label="기록 추가" icon=${ic(H.PlusIcon)} onClick=${() => p.set({sheet: 'record'})}/><${Memos} c=${c}/><${Divider} label="전체 타임라인"/><${Timeline} c=${c}/>` : null}
      ${tab === '통화' ? html`<${CallList} c=${c}/>` : null}
      ${tab === '일정' ? html`<${Visits} c=${c} onAdd=${() => p.set({sheet: 'record'})}/>` : null}
      ${tab === '정보' ? html`<${Banner} status="info" title="보기 모드" description="값을 바꾸려면 「수정」을 눌러요. 저장 전에는 바뀌지 않아요."/><${InfoMeta} c=${c} onEdit=${() => p.set({sheet: 'edit'})}/>` : null}
    <//>
    <${ActionBar} c=${c} p=${p} toast=${toast}/>
  </div>`;
}
function ConceptD() {
  const p = useProto();
  const [toast, show] = useToast();
  const body = p.s.scr === 'detail' && p.cur ? html`<${DetailD} p=${p} toast=${show}/>` : html`<${ListD} p=${p} toast=${show}/>`;
  return html`<${ProtoHost} id="D" p=${p}><${Phone} theme="stone" toast=${toast} nav=${p.s.scr !== 'detail'} sheet=${html`<${Sheets} p=${p} toast=${show} multi/>`}>${body}<//><//>`;
}
