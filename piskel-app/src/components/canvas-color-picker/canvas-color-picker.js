export default class ColorChangerPanel {
  static chooseNewColor(colorToChange, color = null) {
    const currentColorElement = document.querySelector('.shape-current-color');
    const prevColorElement = document.querySelector('.shape-prev-color');

    const tmpColor = currentColorElement.style.backgroundColor;
    currentColorElement.style.backgroundColor = colorToChange;
    prevColorElement.style.backgroundColor = tmpColor;

    if (color) {
      color.value = colorToChange;
    }
  }

  static choosePrevColor(color) {
    function componentToHex(c) {
      const hex = c.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    }

    function rgbToHex(r, g, b) {
      return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
    }

    const prevColor = document.querySelector('.shape-prev-color').style.backgroundColor.split(' ');

    const rColor = parseInt(prevColor[0].slice(4, prevColor[0].length), 10);
    const gColor = parseInt(prevColor[1], 10);
    const bColor = parseInt(prevColor[2], 10);

    const colorToChange = rgbToHex(rColor, gColor, bColor);
    ColorChangerPanel.chooseNewColor(colorToChange, color);
  }
}
