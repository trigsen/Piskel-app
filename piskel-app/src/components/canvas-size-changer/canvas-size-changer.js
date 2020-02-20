import { getCanvasSize } from '../../screens/canvas/get-canvas-size';

export function changeCanvasSize(value, canvas, context) {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width = value;
  canvas.height = value;
  context.putImageData(imageData, 0, 0);
  getCanvasSize(canvas);
}
