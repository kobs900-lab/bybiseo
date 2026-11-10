(async()=>{const sleep=ms=>new Promise(r=>setTimeout(r,ms));const errs=[];window.addEventListener('error',e=>errs.push(e.message));
const issues=[];
function audit(label,root){root=root||document;
  // 1) 글자로 찍힌 마크업
  const tw=document.createTreeWalker(root.body||root,NodeFilter.SHOW_TEXT);let t;while(t=tw.nextNode()){const v=t.nodeValue;if(/<svg|class="|&lt;|<\/|data-[a-z]+=/.test(v)&&!t.parentElement.closest('script,style,pre'))issues.push([label,'escaped-markup',v.slice(0,60)]);}
  // 2) 점·아이콘 크기 이상
  (root.querySelectorAll?root:document).querySelectorAll('.n3-dot,.e2-dot,.dot,.stc i,.meter i').forEach(el=>{const r=el.getBoundingClientRect();if(r.width>14||r.height>14)issues.push([label,'big-dot',el.className+' '+Math.round(r.width)+'x'+Math.round(r.height)]);});
  document.querySelectorAll('svg.ic').forEach(el=>{const r=el.getBoundingClientRect();if(r.width>80)issues.push([label,'big-icon',Math.round(r.width)]);});
  // 3) 폰 화면 가로 넘침
  document.querySelectorAll('.phone').forEach(ph=>{const P=ph.getBoundingClientRect();if(!P.width)return;ph.querySelectorAll('*').forEach(el=>{const r=el.getBoundingClientRect();if(r.width&&r.right>P.right+2&&!el.closest('.chips,.e2-pipe,.e2-pre,.e2-tlf,.fade-r,.iatabs')&&getComputedStyle(el).position!=='fixed')issues.push([label,'overflow',(el.className&&el.className.baseVal===undefined?el.className:el.tagName)+' +'+Math.round(r.right-P.right)]);});});
}
const st=async(label,fn,wait=150)=>{try{await fn();await sleep(wait);audit(label);}catch(e){issues.push([label,'error',e.message]);}};
await st('ia-menu',()=>{showTab('ia');});
await st('ia-drawer',()=>{document.querySelector('[data-ian="d_memo"]').click();},350);
await st('ia-all',()=>{iaClose();document.querySelector('[data-m="all"]').click();},300);
await st('ia-cal',()=>{document.querySelector('[data-m="menu"]').click();document.querySelector('[data-iam="cal"]').click();});
await st('as-list',()=>{document.querySelector('[data-iam="cust"]').click();showTab('as');A.scr='list';A.sheet=null;renderAs();});
await st('as-status',()=>{A.sheet='status';renderAs();});
await st('as-filter',()=>{A.sheet='filter';renderAs();});
await st('as-search',()=>{A.sheet=null;A.scr='search';renderAs();});
for(const id of [1,2,3,4,5]){await st('as-detail-'+id,()=>{asOpen(id);},1100);}
await st('to-list',()=>{showTab('tobe');T.scr='list';T.sheet=null;renderTo();});
await st('to-filter',()=>{T.sheet='filter';renderTo();});
await st('to-sort',()=>{T.sheet='sort';renderTo();});
await st('to-search',()=>{T.sheet=null;T.scr='search';T.q='하남';renderTo();});
for(const id of [1,2,3,4]){await st('to-detail-'+id,()=>{toOpen(id);},900);}
await st('to-edit',()=>{T.sheet='edit';renderTo();});
await st('to-rec',()=>{T.sheet='rec';T.rec='입금';renderTo();});
await st('to-menu',()=>{T.sheet=null;T.menu=true;renderTo();});
await st('to-dlg',()=>{T.menu=false;T.dlg='del';renderTo();});
await st('e2-coach',()=>{showTab('easy');Object.assign(E,e2Fresh(),{coach:1});e2Render();});
await st('e2-today',()=>{E.coach=0;e2Render();});
await st('e2-all',()=>{E.view='all';e2Render();});
for(const id of [1,2,3,4,5]){await st('e2-detail-'+id,()=>{E.scr='detail';E.cust=id;e2Render();});}
await st('e2-call-open',()=>{E.cust=2;E.tlf='통화';E.open['2-0']=true;E.talk['2-0']=true;e2Render();});
for(const sh of ['result','sms','rec','edit','del','delask']){await st('e2-sheet-'+sh,()=>{E.rc=2;E.sheet=sh;E.sd=sh==='edit'?{f:'area',v:''}:sh==='rec'?{ty:'입금',qi:0}:{};e2Render();});}
await st('e2-calling',()=>{E.sheet=null;E.calling=true;E.rc=1;e2Render();});
await st('plan',()=>{showTab('plan');});
await st('plan-group',()=>{document.querySelector('[data-pg="상세"]').click();});
await st('plan-note',()=>{document.querySelector('[data-pg="전체"]').click();const t=document.querySelector('[data-pn="C05"]');t.value='테스트 의견';t.dispatchEvent(new Event('input',{bubbles:true}));});
await st('crit-modal',()=>{showTab('list');document.querySelectorAll('#critBox .crit')[1].click();},300);
await st('crit-goplan',()=>{document.querySelector('#cmBox [data-goplan]').click();},300);
await st('design-switch',()=>{showTab('tobe');document.querySelector('#tab-tobe [data-dsw="easy"]').click();},200);
await st('data',()=>{E.calling=false;e2Render();showTab('data');});
await st('list',()=>{showTab('list');document.querySelectorAll('details.rest').forEach(d=>d.open=true);});
const extra={navOn:[...document.querySelectorAll('#tabs button.on')].map(b=>b.dataset.tab),planCards:document.querySelectorAll('#planList .pc').length,note:(()=>{try{return JSON.parse(localStorage.getItem('youngup_plan_comments_v1')||'{}').C05}catch(e){return 'ls-error'}})(),cmCaps:document.querySelectorAll('#cmBox .cm-caps img').length,planVisible:document.getElementById('tab-plan').classList.contains('on')};const d=document.createElement('pre');d.textContent='AUDIT:'+JSON.stringify({n:issues.length,issues:issues.slice(0,60),errs,extra});document.body.appendChild(d);})();
