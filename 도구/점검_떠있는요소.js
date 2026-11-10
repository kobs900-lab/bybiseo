(async()=>{const sleep=ms=>new Promise(r=>setTimeout(r,ms));const out=[];
const OK='.mk,.wf2-n,.cbs,.n3-dot,.lb,.drw,.drw-dim,.cm,.cm-dim,.top,.phone *,.ia2-links,.toast,.tabbar,.fab,.thumbs *,.asx-band,.asx-row,.asx-svg,.asx-sw input,.pp-phone *';   // 의도해서 띄운 요소
const chk=(label)=>{document.querySelectorAll('section.tab.on *').forEach(el=>{const cs=getComputedStyle(el);if((cs.position==='absolute'||cs.position==='fixed')&&!el.matches(OK)&&!el.closest('.phone')){const r=el.getBoundingClientRect();if(r.width>0)out.push([label,el.className&&el.className.baseVal===undefined?el.className:el.tagName,cs.position]);}});};
for(const t of ['ia','as','plan','data','list']){showTab(t);if(t==='plan'){document.querySelector('[data-pg="전체"]').click();}if(t==='list')document.querySelectorAll('details.rest').forEach(d=>d.open=true);await sleep(200);chk(t);}
const d=document.createElement('pre');d.textContent='FLOAT:'+JSON.stringify(out.slice(0,40));document.body.appendChild(d);})();
