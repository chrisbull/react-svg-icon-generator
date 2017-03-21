function _camelCase(string) {
  return string.replace(/^.|-./g, (letter, index) =>
    index === 0 ? letter.toLowerCase() : letter.substr(1).toUpperCase()
  );
}

function _basicCleanup(svg) {
  return svg
    .replace(/width="\S+"/, '')
    .replace(/height="\S+"/, '')
    .replace(/xmlns="(\S*)"/, '')
    .replace(/([\w-]+)="/g, (match) => _camelCase(match))
    .replace(/\s{2,}/g, ' ');
}

export function cleanupName(name) {
  return name.replace(/u[A-Z0-9]{4}-/, '');
}

export function cleanupSvg(svg, keepFillColor, keepStrokeColor) {
  let cleanedSvg = _basicCleanup(svg)
    .replace(/viewBox/, 'height={height || size} width={width || size} onClick={onClick} style={style} viewBox');

  if (!keepFillColor) {
    cleanedSvg = cleanedSvg.replace(/fill="#?\w+"/g, 'fill={color}');
  }

  if (!keepStrokeColor) {
    cleanedSvg = cleanedSvg.replace(/stroke="#?\w+"/g, 'stroke={color}');
  }

  return cleanedSvg;
}

export function cleanupNativeSvg(svg, keepFillColor, keepStrokeColor) {
  let cleanedSvg = _basicCleanup(svg)
    .replace(/viewBox/, 'height={height || size} width={width || size} style={style} viewBox')
    .replace(/\<[a-z]|\<\/[a-z]/g, (match) => match.toUpperCase());

  if (!keepFillColor) {
    cleanedSvg = cleanedSvg.replace(/fill="#?\w+"/g, 'fill={color}');
  }

  if (!keepStrokeColor) {
    cleanedSvg = cleanedSvg.replace(/stroke="#?\w+"/g, 'stroke={color}');
  }

  return cleanedSvg;
}
