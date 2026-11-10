#!/bin/zsh
cd "$(dirname "$0")"
OUT=../../영업비서_고객탭_Astryx_시안.html
{ cat p0_head.html; cat p1_core.js p2_ad.js p3_eg.js p4_shell.js; printf '\nwindow.addEventListener("error",e=>{const d=document.createElement("pre");d.className="ax-err";d.textContent="ERR:"+e.message;document.body.appendChild(d)});\n</script>\n</body>\n</html>\n'; } > "$OUT"
cat p1_core.js p2_ad.js p3_eg.js p4_shell.js > all.mjs
echo built
