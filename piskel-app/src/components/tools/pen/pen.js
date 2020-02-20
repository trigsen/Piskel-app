import Frames from '../../frames-list/frames';
import { getCanvasCoordinates } from '../utilities/get-canvas-coordinates';

export default class Pen {
  static draw(currentContext, currentCanvas, color, target, canvasEvents) {
    let isDrawing = false;

    const mouseMove = (event) => {
      if (!isDrawing) {
        return;
      }
      const position = getCanvasCoordinates(event, currentCanvas);

      currentContext.lineTo(position.x, position.y);
      currentContext.stroke();
      Frames.drawOnFrame(currentCanvas, currentContext);
    };

    const mouseDown = (event) => {
      if (!target.classList.contains('active-tool')) {
        return;
      }
      isDrawing = true;
      const startPosition = getCanvasCoordinates(event, currentCanvas);
      currentContext.beginPath();
      currentContext.strokeStyle = color.value;
      currentContext.lineWidth = 1;
      currentContext.moveTo(startPosition.x, startPosition.y);
    };

    const mouseUp = () => {
      isDrawing = false;
    };

    const mouseOut = () => {
      isDrawing = false;
    };

    currentCanvas.removeEventListener('mousedown', canvasEvents.mousedown, false);
    currentCanvas.removeEventListener('mouseup', canvasEvents.mouseup, false);
    currentCanvas.removeEventListener('mouseout', canvasEvents.mouseout, false);
    currentCanvas.removeEventListener('mousemove', canvasEvents.mousemove, false);

    currentCanvas.addEventListener('mousemove', mouseMove);
    currentCanvas.addEventListener('mousedown', mouseDown);
    currentCanvas.addEventListener('mouseup', mouseUp);
    currentCanvas.addEventListener('mouseout', mouseOut);

    canvasEvents.mousemove = mouseMove;
    canvasEvents.mouseup = mouseUp;
    canvasEvents.mousedown = mouseDown;
    canvasEvents.mouseout = mouseOut;
  }
}
