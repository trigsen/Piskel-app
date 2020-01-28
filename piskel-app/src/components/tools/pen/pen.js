import Frames from "../../frames-list/frames";

export default class Pen {
  constructor() {
    
  }
  
  static draw(currentContext, currentCanvas, color, target) {
      let isDrawing = false;
      const canvasHTMLWidth = document.querySelector('.main-canvas').offsetWidth;
      const canvasHTMLHeight = document.querySelector('.main-canvas').offsetHeight;
      let xCoordinateScale;
      let yCoordinateScale;

      function getCoodinateScale() {
        xCoordinateScale = (canvasHTMLWidth / currentCanvas.width);
        yCoordinateScale = (canvasHTMLHeight / currentCanvas.height);
      }

      currentCanvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) {
        return;
      }
      getCoodinateScale();

      currentContext.lineTo(e.offsetX / xCoordinateScale, e.offsetY / yCoordinateScale);
      currentContext.stroke();

      Frames.drawOnFrame(currentCanvas, currentContext);
  });

    currentCanvas.addEventListener('mousedown', (e) => {
      if (!target.classList.contains('active-tool')) {
        return
      }
    
      isDrawing = true;
      getCoodinateScale();
      
      currentContext.beginPath();
      currentContext.strokeStyle = color.value;
      currentContext.lineWidth = 1;
      currentContext.moveTo(e.offsetX / xCoordinateScale, e.offsetY / yCoordinateScale);
    });

    currentCanvas.addEventListener('mouseup', () => {
      isDrawing = false;
    });

    currentCanvas.addEventListener('mouseout', () => {
      isDrawing = false;
    });
  }
}