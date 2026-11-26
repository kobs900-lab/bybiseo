// 텍스트 스타일 줄 간격(%)을 정수 px로 바꿔, 글자를 감싼 프레임 높이에 소수점이 생기지 않게 한다.
// 예) 14px × 145% = 20.3px → 20px. 스타일에 직접 쓴 줄 간격(px)도 반올림한다.
(async () => {
  let step = '시작';
  try {
    step = '텍스트 스타일';
    const styles = (await figma.getLocalTextStylesAsync()).filter(s => s.name.startsWith('Text/'));
    let st = 0;
    for (const s of styles) {
      await figma.loadFontAsync(s.fontName);
      const lh = s.lineHeight;
      const px = lh.unit === 'PERCENT' ? s.fontSize * lh.value / 100 : lh.unit === 'PIXELS' ? lh.value : null;
      if (px != null && Math.abs(px - Math.round(px)) > 0.01) { s.lineHeight = { unit: 'PIXELS', value: Math.round(px) }; st++; }
      else if (lh.unit === 'PERCENT') { s.lineHeight = { unit: 'PIXELS', value: Math.round(px) }; st++; }
      const ls = s.letterSpacing;
      if (ls.unit === 'PIXELS' && Math.abs(ls.value * 10 - Math.round(ls.value * 10)) > 0.01) s.letterSpacing = { unit: 'PIXELS', value: Math.round(ls.value * 10) / 10 };
    }
    step = '스타일 없는 글자';
    const page = await figma.getNodeByIdAsync('44:221'); await page.loadAsync();
    let tx = 0;
    for (const t of page.findAllWithCriteria({ types: ['TEXT'] })) {
      for (const s of t.getStyledTextSegments(['lineHeight', 'fontSize', 'fontName', 'textStyleId'])) {
        if (s.textStyleId) continue;
        const lh = s.lineHeight, px = lh.unit === 'PERCENT' ? s.fontSize * lh.value / 100 : lh.unit === 'PIXELS' ? lh.value : null;
        if (px == null || Math.abs(px - Math.round(px)) <= 0.01) continue;
        try { await figma.loadFontAsync(s.fontName); t.setRangeLineHeight(s.start, s.end, { unit: 'PIXELS', value: Math.round(px) }); tx++; } catch (e) {}
      }
    }
    figma.closePlugin(`스타일 ${st}개 · 개별 글자 ${tx}곳 줄 간격을 정수 px로 바꿈`);
  } catch (e) { figma.closePlugin(`오류(${step}): ` + ((e && e.message) || String(e))); }
})();
