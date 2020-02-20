export function getCanvasCoordinates(event, currentCanvas) {
  const canvasHTMLWidth = document.querySelector('.main-canvas').offsetWidth;
  const canvasHTMLHeight = document.querySelector('.main-canvas').offsetHeight;
  const x = event.offsetX / (canvasHTMLWidth / currentCanvas.width);
  const y = event.offsetY / (canvasHTMLHeight / currentCanvas.height);

  return { x, y };
}
