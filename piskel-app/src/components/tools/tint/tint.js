import Frames from '../../frames-list/frames';
import { getCanvasCoordinates } from '../utilities/get-canvas-coordinates';
import { shadeColor } from '../utilities/shade-color';

export default class Tint {
  static draw(context, canvas, target, canvasEvents, isLighten) {
    let isDrawing = false;

    function getShadedColor(position, isLight) {
      const lightenPercent = 20;
      const darkenPercent = -20;
      const imageData = context.getImageData(position.x, position.y, 1, 1).data;
      const startColor = {
        r: imageData[0],
        g: imageData[1],
        b: imageData[2],
      };

      if (isLight) {
        return shadeColor(startColor, lightenPercent);
      }
      return shadeColor(startColor, darkenPercent);
    }

    const mouseMove = (event) => {
      if (!isDrawing) {
        return;
      }
      const position = getCanvasCoordinates(event, canvas);
      const shadedColor = getShadedColor(position, isLighten);

      context.fillStyle = shadedColor;
      context.fillRect(position.x, position.y, 1, 1);
      Frames.drawOnFrame(canvas, context);
    };

    const mouseDown = (event) => {
      if (!target.classList.contains('active-tool')) {
        return;
      }
      isDrawing = true;
      const startPosition = getCanvasCoordinates(event, canvas);
      const shadedColor = getShadedColor(startPosition, isLighten);

      context.fillStyle = shadedColor;
      context.fillRect(startPosition.x, startPosition.y, 1, 1);
      Frames.drawOnFrame(canvas, context);
    };

    const mouseUp = () => {
      isDrawing = false;
    };

    const mouseOut = () => {
      isDrawing = false;
    };

    canvas.removeEventListener('mousedown', canvasEvents.mousedown, false);
    canvas.removeEventListener('mouseup', canvasEvents.mouseup, false);
    canvas.removeEventListener('mouseout', canvasEvents.mouseout, false);
    canvas.removeEventListener('mousemove', canvasEvents.mousemove, false);

    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    canvas.addEventListener('mouseout', mouseOut);

    canvasEvents.mousemove = mouseMove;
    canvasEvents.mouseup = mouseUp;
    canvasEvents.mousedown = mouseDown;
    canvasEvents.mouseout = mouseOut;
  }
}
