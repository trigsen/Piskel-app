import Frames from "../../frames-list/frames";
import {hexToRgb} from './color-converter';
export default class ColorBucket {
    constructor() {

    }

    static flood(context, canvas, color, target) {
     
      function floodFill(startX, startY, color) {
        
        let stack = [[startX, startY]];
        const image = context.getImageData(0, 0, canvas.width, canvas.height);
        const imageData = image.data;
        const initialPosition = Math.round((startY * canvas.width + startX) * 4);
        const startColor = {
          r: imageData[initialPosition + 0],
          g: imageData[initialPosition + 1],
          b: imageData[initialPosition + 2]
        }

        if (isSameColor(initialPosition)) {
          return;
        }

        while (stack.length) {
          
          const newPosition = stack.pop();
          const x = Math.round(newPosition[0]);
          const y = Math.round(newPosition[1]);
          const pixelPosition = (y * canvas.width + x) * 4;
        
          while (y-- >= 0 && isStartColor(pixelPosition, startColor, imageData)) {
            pixelPosition = pixelPosition - canvas.width * 4;
          }
           
          y++;
          pixelPosition = pixelPosition + canvas.width * 4;
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
              } else {
                if (reachLeft) {
                  reachLeft = false;
                }
              }
            }
            
          if (x < canvas.width - 1) {
              if (isStartColor(pixelPosition + 4, startColor, imageData)) {
              
                if (!reachRight) {
                  stack.push([x + 1, y]);
                  reachRight = true;
                }
              } else {
                if (reachRight) {
                  reachRight = false;
                }
              }
            }

            pixelPosition = pixelPosition + canvas.width * 4;
          }       
        }

        context.putImageData(image, 0, 0);
        Frames.drawOnFrame(canvas, context);

        function drawPixel(position) {
          imageData[position] = color.r;
          imageData[position + 1] = color.g;
          imageData[position + 2] = color.b;
          imageData[position + 3] = 255;
        }

        function isSameColor(position) {
          return (imageData[position] === color.r
            && imageData[position + 1] === color.g
            && imageData[position + 2] === color.b);
        }

        function isStartColor(position) {
          return (imageData[position] === startColor.r
                  && imageData[position + 1] === startColor.g
                  && imageData[position + 2] === startColor.b);
        }
      }

      const canvasHTMLWidth = document.querySelector('.main-canvas').offsetWidth;
      const canvasHTMLHeight = document.querySelector('.main-canvas').offsetHeight;
      let xCoordinateScale;
      let yCoordinateScale;
  
      function getCoodinateScale() {
          xCoordinateScale = (canvasHTMLWidth / canvas.width);
          yCoordinateScale = (canvasHTMLHeight / canvas.height);
        }
 
        getCoodinateScale();
        
        canvas.addEventListener('mousedown', (event) => {
          if (!target.classList.contains('active-tool')) {
            return
          }
          const floodColor = hexToRgb(color.value);
          floodFill(event.offsetX / xCoordinateScale, event.offsetY / yCoordinateScale, floodColor);
        });
    }
}