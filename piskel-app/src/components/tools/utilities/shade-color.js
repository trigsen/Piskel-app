export function shadeColor(color, percent) {
  let r = parseInt((color.r * (100 + percent)) / 100, 10);
  let g = parseInt((color.g * (100 + percent)) / 100, 10);
  let b = parseInt((color.b * (100 + percent)) / 100, 10);

  r = (r < 255) ? r : 255;
  g = (g < 255) ? g : 255;
  b = (b < 255) ? b : 255;

  const RR = ((r.toString(16).length === 1) ? `0${r.toString(16)}` : r.toString(16));
  const GG = ((g.toString(16).length === 1) ? `0${g.toString(16)}` : g.toString(16));
  const BB = ((b.toString(16).length === 1) ? `0${b.toString(16)}` : b.toString(16));

  return `#${RR}${GG}${BB}`;
}
