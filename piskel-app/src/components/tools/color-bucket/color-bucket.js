import Frames from '../../frames-list/frames';
import { hexToRgb } from './color-converter';

export default class ColorBucket {
  static flood(context, canvas, color, target, canvasEvents) {
    function floodFill(startX, startY, fillColor) {
      const stack = [[startX, startY]];
      const image = context.getImageData(0, 0, canvas.width, canvas.height);
      const imageData = image.data;
      const initialPosition = Math.round((startY * canvas.width + startX) * 4);
      const startColor = {
        r: imageData[initialPosition + 0],
        g: imageData[initialPosition + 1],
        b: imageData[initialPosition + 2],
      };

      function drawPixel(position) {
        imageData[position] = fillColor.r;
        imageData[position + 1] = fillColor.g;
        imageData[position + 2] = fillColor.b;
        imageData[position + 3] = 255;
      }

      function isSameColor(position) {
        return (imageData[position] === fillColor.r
            && imageData[position + 1] === fillColor.g
            && imageData[position + 2] === fillColor.b);
      }

      function isStartColor(position) {
        return (imageData[position] === startColor.r
                  && imageData[position + 1] === startColor.g
                  && imageData[position + 2] === startColor.b);
      }

      if (isSameColor(initialPosition)) {
        return;
      }

      while (stack.length) {
        const newPosition = stack.pop();
        const x = Math.round(newPosition[0]);
        let y = Math.round(newPosition[1]);
        let pixelPosition = (y * canvas.width + x) * 4;

        while (y-- >= 0 && isStartColor(pixelPosition, startColor, imageData)) {
          pixelPosition -= canvas.width * 4;
        }

        y++;
        pixelPosition += canvas.width * 4;
        let reachLeft = false;
        let reachRight = false;

        while (y++ < canvas.height - 1 && isStartColor(pixelPosition, startColor, imageData)) {
          drawPixel(pixelPosition);

          if (x > 0) {
            if (isStartColor(pixelPosition - 4, startColor, imageData)) {
              if (!reachLeft) {
                stack.push([x - 1, y]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }

          if (x < canvas.width - 1) {
            if (isStartColor(pixelPosition + 4, startColor, imageData)) {
              if (!reachRight) {
                stack.push([x + 1, y]);
                reachRight = true;
              }
            } else if (reachRight) {
              reachRight = false;
            }
          }

          pixelPosition += canvas.width * 4;
        }
      }

      context.putImageData(image, 0, 0);
      Frames.drawOnFrame(canvas, context);
    }

    const canvasHTMLWidth = document.querySelector('.main-canvas').offsetWidth;
    const canvasHTMLHeight = document.querySelector('.main-canvas').offsetHeight;
    const xCoordinateScale = (canvasHTMLWidth / canvas.width);
    const yCoordinateScale = (canvasHTMLHeight / canvas.height);

    function runEvent(event) {
      if (!target.classList.contains('active-tool')) {
        return;
      }
      const floodColor = hexToRgb(color.value);
      floodFill(event.offsetX / xCoordinateScale, event.offsetY / yCoordinateScale, floodColor);
    }

    canvas.removeEventListener('mousedown', canvasEvents.mousedown, false);
    canvas.removeEventListener('mouseup', canvasEvents.mouseup, false);

    canvas.addEventListener('mousedown', runEvent);

    canvasEvents.mousedown = runEvent;
  }
}
