export function getCanvasSize(canvas) {
  const sizeInfromation = document.querySelector('.canvas-information__size');
  sizeInfromation.innerHTML = `${canvas.width}x${canvas.height}`;
}
