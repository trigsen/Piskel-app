import Frames from "../../frames-list/frames";

export default class strokeLine {
    constructor() {

    }

    static drawStrokeLine(currentContext, currentCanvas, color, target, canvasEvents) {
      let isDrawing = false;
      let snapshot;
      let dragStartLocation;

      function getCanvasCoordinates(event) {
        const canvasHTMLWidth = document.querySelector('.main-canvas').offsetWidth;
        const canvasHTMLHeight = document.querySelector('.main-canvas').offsetHeight;
        const x = event.offsetX / (canvasHTMLWidth / currentCanvas.width),
            y = event.offsetY / (canvasHTMLHeight / currentCanvas.height);
    
        return {x: x, y: y};
    }

      function takeSnapshot() {
        snapshot = currentContext.getImageData(0, 0, currentCanvas.width, currentCanvas.height);
    }
    
      function restoreSnapshot() {
        currentContext.putImageData(snapshot, 0, 0);
     }

     function drawLine(position) {
        currentContext.beginPath();
        currentContext.strokeStyle = color.value;
        currentContext.moveTo(dragStartLocation.x, dragStartLocation.y);
        currentContext.lineTo(position.x, position.y);
        currentContext.stroke();
    }
    
    const mouseMove = (e) => {
        if (!isDrawing) {
          return;
        }
        restoreSnapshot();
        const position = getCanvasCoordinates(event);
        drawLine(position);
        Frames.drawOnFrame(currentCanvas, currentContext);
    }

    const mouseDown = (e) => {
      if (!target.classList.contains('active-tool')) {
        return
      }
      
      isDrawing = true;
      dragStartLocation = getCanvasCoordinates(event);
      takeSnapshot();
    }

    const mouseUp = () => {
      isDrawing = false;
      restoreSnapshot();
      const position = getCanvasCoordinates(event);
      drawLine(position);
    }

    const mouseOut = () => {
      isDrawing = false;
    }

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