import Frames from "../../frames-list/frames";
import { getCanvasCoordinates } from "../utilities/get-canvas-coordinates"
import { restoreSnapshot } from "../utilities/restore-snapshot"
import { takeSnapshot } from "../utilities/take-snapshot"
export default class Rectangle {
    constructor() {

    }

    static drawRectangle(currentContext, currentCanvas, color, target, canvasEvents, isFilled) {
      let isDrawing = false;
      let snapshot;
      let dragStartLocation;

     function drawRect(position) {
        currentContext.beginPath();
        currentContext.rect(dragStartLocation.x, dragStartLocation.y, position.x - dragStartLocation.x, position.y - dragStartLocation.y);
        if (isFilled) {
            currentContext.fillStyle = color.value;
            currentContext.fill();
        } else {
            currentContext.strokeStyle = color.value;
            currentContext.stroke();
        }
    }
    
    const mouseMove = (e) => {
        if (!isDrawing) {
          return;
        }
        restoreSnapshot(currentContext, snapshot);
        const position = getCanvasCoordinates(event, currentCanvas);
        drawRect(position);
        Frames.drawOnFrame(currentCanvas, currentContext);
    }

    const mouseDown = (e) => {
      if (!target.classList.contains('active-tool')) {
        return
      }
      
      isDrawing = true;
      dragStartLocation = getCanvasCoordinates(event, currentCanvas);
      snapshot = takeSnapshot(currentContext, currentCanvas);
    }

    const mouseUp = () => {
      isDrawing = false;
      restoreSnapshot(currentContext, snapshot);
      const position = getCanvasCoordinates(event, currentCanvas);
      drawRect(position);
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