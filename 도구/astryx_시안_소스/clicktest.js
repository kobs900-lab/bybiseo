(async()=>{const sl=ms=>new Promise(r=>setTimeout(r,ms));const log=[];const errs=[];
window.addEventListener('error',e=>errs.push(e.message));
const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0};
const ph=()=>document.querySelector('.ph');
function find(t,root){root=root||ph();const els=[...root.querySelectorAll('button,[role=button],[role=tab],a,[role=option],li [tabindex]')].filter(vis);
  return els.find(e=>e.textContent.trim()===t)||els.find(e=>(e.getAttribute('aria-label')||'')===t)||els.find(e=>e.textContent.trim().startsWith(t));}
async function click(t,root){const e=find(t,root);if(!e){log.push('MISS:'+t);return false;}e.click();await sl(250);return true;}
const has=t=>ph().textContent.includes(t);
const chk=(n,c)=>log.push((c?'OK ':'FAIL ')+n);
async function tab(t){[...document.querySelectorAll('.ax-navtabs [data-tab-value]')].find(e=>e.textContent.trim().startsWith(t)).click();await sl(700);}
for(let i=0;i<100&&!document.querySelector('.ax-navtabs [data-tab-value]');i++)await sl(200);
try{
// A
await tab('A.');
await click('2,810');chk('A funnel filter',has('이서연')&&!has('김하준'));
await click('2,810');await click('필터');await click('메타');const b=[...ph().querySelectorAll('button')].find(e=>/명 보기/.test(e.textContent));b&&b.click();await sl(300);chk('A applied token',has('유입: 메타'));
await click('모두 지우기');chk('A cleared',!has('유입: 메타'));
await click('강예은 상세 보기');chk('A detail',has('영업 단계'));
await click('결과');await click('재통화');await click('내일 10:00');const r=[...ph().querySelectorAll('button')].find(e=>/로 기록/.test(e.textContent));r&&r.click();await sl(300);chk('A result recorded',has('재통화 기록'));
await click('기록');await click('입금');await click('저장');chk('A record saved',has('입금'));
await click('더보기');await click('고객 삭제');chk('A delete confirm',has('휴지통으로 옮길까요'));await click('취소');
await click('뒤로');await click('보드');chk('A board',!!ph().querySelector('.ax-board'));
// B
await tab('B.');chk('B today',has('지금 연락할 고객'));await click('전체 고객 보기');chk('B all',has('전체 고객'));await click('재통화 771');chk('B status chip',has('강예은')&&!has('김하준'));
// C
await tab('C.');await click('한강뷰 문의');chk('C ai search',has('박도윤'));await click('박도윤');await sl(200);chk('C detail',has('고객 니즈'));await click('문자 초안 보기');chk('C draft',has('AI 문자 초안'));
// D
await tab('D.');await click('상태');await click('가계약');await click('정계약');const v=[...ph().querySelectorAll('button')].find(e=>/개 상태 보기/.test(e.textContent));v&&v.click();await sl(300);chk('D multi status',has('최지우')&&has('정민준')&&!has('김하준'));
await click('선택');const cb=ph().querySelector('.ax-row');cb&&cb.click();await sl(200);chk('D bulk',has('명 선택'));
// E
await tab('E.');await click('덕소역 더블뷰한강');chk('E site list',has('최지우'));await click('최지우 상세 보기');chk('E contract',has('102동 2004호'));
// F
await tab('F.');await click('최지우');await sl(300);const inp=ph().querySelector('.ax-composer input');
if(inp){const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;set.call(inp,'테스트 메모');inp.dispatchEvent(new Event('input',{bubbles:true}));await sl(150);await click('보내기');}
chk('F memo sent',has('테스트 메모'));
// G
await tab('G.');const n1=ph().querySelector('.ax-gname').textContent;await click('건너뛰기');const n2=ph().querySelector('.ax-gname').textContent;chk('G skip',n1!==n2);
await tab('비교');chk('compare table',!!document.querySelector('table'));
}catch(e){log.push('EXC:'+e.message)}
const d=document.createElement('pre');d.id='TEST';d.textContent='RESULT:'+JSON.stringify({log,errs});document.body.appendChild(d);})();
