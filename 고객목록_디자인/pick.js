// 요소 선택 모드: 시안에서 요소를 눌러 고르고, 그 위치를 글로 복사해 대화에 붙여 넣는다.
// 시안 화면(index.html) 맨 아래에서 불러온다. 시안 동작에는 영향을 주지 않는다.
(() => {
  const css = `
  .pk-toggle{position:fixed;left:16px;bottom:16px;z-index:9999;height:40px;padding:0 16px;border:0;border-radius:20px;background:#111418;color:#fff;font:700 14px/1 inherit;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25)}
  .pk-toggle.on{background:#E5484D}
  .pk-box{position:fixed;z-index:9998;pointer-events:none;border:2px solid #E5484D;border-radius:4px;background:rgba(229,72,77,.10);display:none}
  .pk-tip{position:fixed;z-index:9998;pointer-events:none;max-width:320px;padding:4px 8px;border-radius:6px;background:#111418;color:#fff;font:600 12px/1.4 ui-monospace,Menlo,monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:none}
  .pk-panel{position:fixed;left:16px;bottom:68px;z-index:9999;width:360px;max-width:calc(100vw - 32px);padding:14px;border-radius:14px;background:#fff;color:#111418;box-shadow:0 8px 30px rgba(0,0,0,.28);font-size:13px;line-height:1.5}
  .pk-panel[hidden]{display:none}
  .pk-panel h4{margin:0 0 2px;font-size:14px}
  .pk-panel p{margin:0 0 10px;color:#6B7280;font-size:12px}
  .pk-list{list-style:none;margin:0 0 10px;padding:0;max-height:180px;overflow:auto;display:flex;flex-direction:column;gap:6px}
  .pk-list li{display:flex;gap:8px;align-items:flex-start;padding:8px 10px;border-radius:8px;background:#F3F4F6}
  .pk-list b{flex:none;width:18px;height:18px;border-radius:50%;background:#E5484D;color:#fff;font-size:11px;line-height:18px;text-align:center}
  .pk-list div{flex:1;min-width:0}
  .pk-list span{display:block;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .pk-list code{display:block;color:#6B7280;font:11px/1.4 ui-monospace,Menlo,monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .pk-list button{flex:none;border:0;background:none;color:#6B7280;font-size:16px;line-height:18px;cursor:pointer}
  .pk-empty{padding:10px;border-radius:8px;background:#F3F4F6;color:#6B7280;text-align:center}
  .pk-panel textarea{display:block;width:100%;box-sizing:border-box;min-height:64px;padding:8px 10px;border:1px solid #D5D9E0;border-radius:8px;font:inherit;resize:vertical}
  .pk-row{display:flex;gap:8px;margin-top:10px}
  .pk-row button{flex:1;height:36px;border:0;border-radius:8px;background:#F3F4F6;color:#111418;font:700 13px/1 inherit;cursor:pointer}
  .pk-row .pri{flex:2;background:#2B6FF3;color:#fff}
  @media (max-width:860px){.pk-toggle,.pk-panel{display:none}}`;
  const mk = (tag, cls, html) => { const e = document.createElement(tag); e.className = cls; if(html) e.innerHTML = html; document.body.appendChild(e); return e; };
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);
  const toggle = mk('button', 'pk-toggle', '요소 선택');
  const box = mk('div', 'pk-box'), tip = mk('div', 'pk-tip');
  const panel = mk('div', 'pk-panel'); panel.hidden = true;
  let on = false, picks = [], note = '';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const mine = el => !!(el && el.closest && el.closest('.pk-toggle,.pk-panel'));
  const norm = el => (el && el.closest && el.closest('svg') ? el.closest('button,a,[role="button"]') || el.closest('svg') : el);

  // 요소 하나를 가리키는 짧은 경로: 가까운 id 나 #app 까지만 올라간다
  function part(el){
    if(el.id) return '#' + el.id;
    let s = el.tagName.toLowerCase();
    const cls = [...el.classList].filter(c => !/^(on|fold|sheet|det)$/.test(c)).slice(0, 2);
    if(cls.length) s += '.' + cls.join('.');
    for(const k of ['a', 'k', 'key', 'i']) if(el.dataset && el.dataset[k] != null){ s += `[data-${k}="${el.dataset[k]}"]`; break; }
    return s;
  }
  function path(el){
    const out = [];
    for(let e = el, n = 0; e && e !== document.body && n < 5; e = e.parentElement, n++){ out.unshift(part(e)); if(e.id) break; }
    return out.join(' > ');
  }
  const textOf = el => ((el.innerText || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '') + '').trim().replace(/\s+/g, ' ').slice(0, 50);
  function where(el){
    const sec = el.closest('section');
    const h = sec && sec.querySelector('h2, h1');
    const sheet = el.closest('.cl-sheet');
    const sh = sheet && sheet.querySelector('h2');
    return sh ? '시트 「' + sh.textContent.trim() + '」' : h ? (h.childNodes[0].textContent || h.textContent).trim() : '';
  }
  function screen(){
    const tab = document.querySelector('.pg-tabs .on');
    let s = tab ? tab.textContent.trim() : '';
    try{
      if(typeof S !== 'undefined' && S.ver === 'v4') s += S.detail != null ? ` › 고객 상세(${C[S.detail].name})` : S.search ? ' › 검색' : ' › 고객 목록';
    }catch(e){}
    return s;
  }
  function report(){
    const lines = ['[요소 지정 · 고객목록_디자인/index.html]', '화면: ' + screen()];
    picks.forEach((p, i) => lines.push(`${i + 1}. ${p.where ? p.where + ' › ' : ''}${p.text ? '"' + p.text + '"' : '(글자 없음)'} — ${p.path}`));
    lines.push('요청: ' + note.trim());
    return lines.join('\n');
  }
  function draw(){
    panel.innerHTML = `<h4>요소 선택</h4><p>고칠 요소를 누르면 아래에 쌓입니다. Option(Alt)을 누른 채 누르면 평소처럼 동작합니다.</p>
      ${picks.length ? `<ol class="pk-list">${picks.map((p, i) => `<li><b>${i + 1}</b><div><span>${esc((p.where ? p.where + ' › ' : '') + (p.text || '(글자 없음)'))}</span><code>${esc(p.path)}</code></div><button data-pk="del" data-i="${i}" aria-label="빼기">×</button></li>`).join('')}</ol>` : '<div class="pk-empty">아직 고른 요소가 없습니다</div>'}
      <textarea id="pkNote" placeholder="이 요소를 어떻게 바꿀지 적어 주세요 (비워 둬도 됩니다)" style="margin-top:10px">${esc(note)}</textarea>
      <div class="pk-row"><button data-pk="clear">비우기</button><button data-pk="off">끄기</button><button class="pri" data-pk="copy">복사해서 대화에 붙이기</button></div>`;
  }
  function setOn(v){
    on = v; toggle.classList.toggle('on', on); toggle.textContent = on ? '요소 선택 끄기' : '요소 선택';
    panel.hidden = !on; box.style.display = tip.style.display = 'none'; document.body.style.cursor = on ? 'crosshair' : '';
    if(on) draw();
  }
  async function copy(){
    const t = report();
    try{ await navigator.clipboard.writeText(t); }
    catch(e){ const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); document.execCommand('copy'); a.remove(); }
    const b = panel.querySelector('[data-pk="copy"]'); if(b){ b.textContent = '복사했습니다 · 대화창에 붙여 넣으세요'; setTimeout(() => { if(b.isConnected) b.textContent = '복사해서 대화에 붙이기'; }, 2200); }
  }

  toggle.addEventListener('click', () => setOn(!on));
  panel.addEventListener('input', e => { if(e.target.id === 'pkNote') note = e.target.value; });
  panel.addEventListener('click', e => {
    const b = e.target.closest('[data-pk]'); if(!b) return;
    const a = b.dataset.pk;
    if(a === 'del'){ picks.splice(+b.dataset.i, 1); draw(); }
    else if(a === 'clear'){ picks = []; note = ''; draw(); }
    else if(a === 'off') setOn(false);
    else if(a === 'copy') copy();
  });
  document.addEventListener('mousemove', e => {
    if(!on) return;
    const el = norm(e.target);
    if(!el || mine(el) || e.altKey || el === document.body || el === document.documentElement){ box.style.display = tip.style.display = 'none'; return; }
    const r = el.getBoundingClientRect();
    Object.assign(box.style, {display:'block', left:r.left + 'px', top:r.top + 'px', width:r.width + 'px', height:r.height + 'px'});
    tip.textContent = part(el) + (textOf(el) ? ' · ' + textOf(el) : '');
    Object.assign(tip.style, {display:'block', left:Math.max(4, Math.min(r.left, innerWidth - 330)) + 'px', top:(r.top > 30 ? r.top - 26 : r.bottom + 4) + 'px'});
  }, true);
  document.addEventListener('click', e => {
    if(!on || mine(e.target) || e.altKey) return;
    e.preventDefault(); e.stopImmediatePropagation();
    const el = norm(e.target); if(!el) return;
    if(picks.length >= 8) picks.shift();
    picks.push({path:path(el), text:textOf(el), where:where(el)});
    draw();
  }, true);
  document.addEventListener('keydown', e => { if(on && e.key === 'Escape' && !mine(e.target)) setOn(false); });
})();
