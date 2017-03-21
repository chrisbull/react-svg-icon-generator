'use strict';

exports.__esModule = true;
exports.cleanupName = cleanupName;
exports.cleanupSvg = cleanupSvg;
exports.cleanupNativeSvg = cleanupNativeSvg;
function _camelCase(string) {
  return string.replace(/^.|-./g, function (letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.substr(1).toUpperCase();
  });
}

function _basicCleanup(svg) {
  return svg.replace(/width="\S+"/, '').replace(/height="\S+"/, '').replace(/xmlns="(\S*)"/, '').replace(/([\w-]+)="/g, function (match) {
    return _camelCase(match);
  }).replace(/\s{2,}/g, ' ');
}

function cleanupName(name) {
  return name.replace(/u[A-Z0-9]{4}-/, '');
}

function cleanupSvg(svg, keepFillColor, keepStrokeColor) {
  var cleanedSvg = _basicCleanup(svg).replace(/viewBox/, 'height={height || size} width={width || size} onClick={onClick} style={style} viewBox');

  if (!keepFillColor) {
    cleanedSvg = cleanedSvg.replace(/fill="#\w+"/g, 'fill={color}');
  }

  if (!keepStrokeColor) {
    cleanedSvg = cleanedSvg.replace(/stroke="#\w+"/g, 'stroke={color}');
  }

  return cleanedSvg;
}

function cleanupNativeSvg(svg, keepFillColor, keepStrokeColor) {
  var cleanedSvg = _basicCleanup(svg).replace(/viewBox/, 'height={height || size} width={width || size} style={style} viewBox').replace(/\<[a-z]|\<\/[a-z]/g, function (match) {
    return match.toUpperCase();
  });

  if (!keepFillColor) {
    cleanedSvg = cleanedSvg.replace(/fill="#\w+"/g, 'fill={color}');
  }

  if (!keepStrokeColor) {
    cleanedSvg = cleanedSvg.replace(/stroke="#\w+"/g, 'stroke={color}');
  }

  return cleanedSvg;
}