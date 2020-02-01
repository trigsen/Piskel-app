import Pen from './components/tools/pen/pen';
import { changeCanvasSize } from './components/canvas-size-changer/canvas-size-changer';
import ColorChangerPanel from './components/canvas-color-picker/canvas-color-picker';
import ColorBucket from './components/tools/color-bucket/color-bucket';
import Frames from './components/frames-list/frames';
import Preview from './screens/preview/preview';
import StrokeLine from './components/tools/stroke-line/stroke-line';
import Circle from './components/tools/circle/circle';
import Rectangle from './components/tools/rectangle/rectangle';
import Tint from './components/tools/tint/tint';
import { getCanvasCoordinates } from './components/tools/utilities/get-canvas-coordinates';
import ModalPanel from './components/modal-panel/modal-panel';

export const startApp = function startApp() {
  const canvas = document.querySelector('.main-canvas');
  const context = canvas.getContext('2d');
  const canvasEvents = {};
  const firstFrame = document.querySelector('.current-frame');
  const color = document.querySelector('.color-picker');
  const framesArray = [];
  framesArray.push(document.querySelector('.frame'));
  let animation = Preview.displayAnimation(framesArray);
  context.clearRect(0, 0, 700, 600);
  const eraserColor = {
    value: '#FFFFFF',
  };
  canvas.width = 512;
  canvas.height = 512;
  firstFrame.width = 512;
  firstFrame.height = 512;

  const hotKeys = {
    pen: 'p',
    strokeLine: 's',
    paintBucket: 'b',
    eraser: 'e',
    circle: 'c',
    filledCircle: 'v',
    rectangle: 'r',
    filledRectangle: 't',
    lighten: 'l',
    darken: 'd',
  };

  function deleteActiveTool() {
    document.querySelector('.active-tool').classList.remove('active-tool');
  }

  function addActiveTool(target) {
    target.classList.add('active-tool');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const target = document.querySelector('.pen');
    Pen.draw(context, canvas, color, target, canvasEvents);
  });

  function runEventFromHotKey(property) {
    let target;
    switch (property) {
      case 'pen':
        target = document.querySelector('.pen');
        deleteActiveTool();
        addActiveTool(target);
        Pen.draw(context, canvas, color, target, canvasEvents);
        break;
      case 'strokeLine':
        target = document.querySelector('.stroke-line');
        deleteActiveTool();
        addActiveTool(target);
        StrokeLine.drawStrokeLine(context, canvas, color, target, canvasEvents);
        break;
      case 'paintBucket':
        target = document.querySelector('.paint-bucket');
        deleteActiveTool();
        addActiveTool(target);
        ColorBucket.flood(context, canvas, color, target, canvasEvents);
        break;
      case 'eraser':
        target = document.querySelector('.eraser');
        deleteActiveTool();
        addActiveTool(target);
        Pen.draw(context, canvas, eraserColor, target, canvasEvents);
        break;
      case 'circle':
        target = document.querySelector('.circle');
        deleteActiveTool();
        addActiveTool(target);
        Circle.drawCircle(context, canvas, color, target, canvasEvents, false);
        break;
      case 'filledCircle':
        target = document.querySelector('.filled-circle');
        deleteActiveTool();
        addActiveTool(target);
        Circle.drawCircle(context, canvas, color, target, canvasEvents, true);
        break;
      case 'rectangle':
        target = document.querySelector('.rectangle');
        deleteActiveTool();
        addActiveTool(target);
        Rectangle.drawRectangle(context, canvas, color, target, canvasEvents, false);
        break;
      case 'filledRectangle':
        target = document.querySelector('.filled-rectangle');
        deleteActiveTool();
        addActiveTool(target);
        Rectangle.drawRectangle(context, canvas, color, target, canvasEvents, true);
        break;
      case 'lighten':
        target = document.querySelector('.lighten');
        deleteActiveTool();
        addActiveTool(target);
        Tint.draw(context, canvas, target, canvasEvents, true);
        break;
      case 'darken':
        target = document.querySelector('.darken');
        deleteActiveTool();
        addActiveTool(target);
        Tint.draw(context, canvas, target, canvasEvents, false);
        break;
      default:

        break;
    }
  }

  document.addEventListener('keypress', (event) => {
    for (const key in hotKeys) {
      if (event.key === hotKeys[key]) {
        runEventFromHotKey(key);
      }
    }
  });

  document.querySelector('.hotkeys-panel-trigger').addEventListener('click', () => {
    const hotKeysPanel = document.querySelector('.hotkeys-panel');
    hotKeysPanel.style.display = 'block';
  });

  document.querySelector('.hotkeys-panel__exit').addEventListener('click', () => {
    const hotKeysPanel = document.querySelector('.hotkeys-panel');
    hotKeysPanel.style.display = 'none';
  });

  document.querySelector('.hotkeys-panel__button').addEventListener('click', () => {
    ModalPanel.changeHotkeys(hotKeys);
  });

  document.querySelector('.fps-range').addEventListener('input', (event) => {
    const fpsValue = document.querySelector('.fps-value');
    fpsValue.innerHTML = event.target.valueAsNumber;
    clearInterval(animation);
    animation = Preview.displayAnimation(framesArray);
  });

  canvas.addEventListener('mousemove', (event) => {
    const cursorInfromation = document.querySelector('.canvas-information__cursor-position');
    cursorInfromation.style.display = 'block';
    const position = getCanvasCoordinates(event, canvas);
    cursorInfromation.innerHTML = `${Math.round(position.x)}:${Math.round(position.y)}`;
  });

  canvas.addEventListener('mouseout', () => {
    const cursorInfromation = document.querySelector('.canvas-information__cursor-position');
    cursorInfromation.style.display = 'none';
  });

  document.querySelector('.canvas-size-range').addEventListener('input', (event) => {
    const canvasSizeValue = document.querySelector('.canvas-size-value');
    canvasSizeValue.innerHTML = event.target.valueAsNumber;
    changeCanvasSize(event.target.valueAsNumber, canvas, context);
    Frames.drawOnFrame(canvas, context);
  });


  document.querySelector('.pen').addEventListener('click', (event) => {
    deleteActiveTool();
    addActiveTool(event.target);
    Pen.draw(context, canvas, color, event.target, canvasEvents);
  });

  document.querySelector('.lighten').addEventListener('click', (event) => {
    deleteActiveTool();
    addActiveTool(event.target);
    Tint.draw(context, canvas, event.target, canvasEvents, true);
  });

  document.querySelector('.darken').addEventListener('click', (event) => {
    deleteActiveTool();
    addActiveTool(event.target);
    Tint.draw(context, canvas, event.target, canvasEvents, false);
  });

  document.querySelector('.stroke-line').addEventListener('click', (event) => {
    deleteActiveTool();
    addActiveTool(event.target);
    StrokeLine.drawStrokeLine(context, canvas, color, event.target, canvasEvents);
  });

  document.querySelector('.circle').addEventListener('click', (event) => {
    deleteActiveTool();
    addActiveTool(event.target);
    Circle.drawCircle(context, canvas, color, event.target, canvasEvents, false);
  });

  document.querySelector('.rectangle').addEventListener('click', (event) => {
    deleteActiveTool();
    addActiveTool(event.target);
    Rectangle.drawRectangle(context, canvas, color, event.target, canvasEvents, false);
  });

  document.querySelector('.filled-rectangle').addEventListener('click', (event) => {
    deleteActiveTool();
    addActiveTool(event.target);
    Rectangle.drawRectangle(context, canvas, color, event.target, canvasEvents, true);
  });

  document.querySelector('.filled-circle').addEventListener('click', (event) => {
    deleteActiveTool();
    addActiveTool(event.target);
    Circle.drawCircle(context, canvas, color, event.target, canvasEvents, true);
  });

  document.querySelector('.eraser').addEventListener('click', (event) => {
    deleteActiveTool();
    addActiveTool(event.target);
    Pen.draw(context, canvas, eraserColor, event.target, canvasEvents);
  });

  document.querySelector('.color-picker').addEventListener('input', (event) => {
    ColorChangerPanel.chooseNewColor(event.target.value, color);
  });

  document.querySelector('.prev-color').addEventListener('click', () => {
    ColorChangerPanel.choosePrevColor(color);
  });

  document.querySelector('.paint-bucket').addEventListener('click', (event) => {
    deleteActiveTool();
    addActiveTool(event.target);
    ColorBucket.flood(context, canvas, color, event.target, canvasEvents);
  });

  document.querySelector('.frame-button__text').addEventListener('click', () => {
    Frames.createNewFrame(canvas, context, framesArray);
  });

  document.querySelector('.frames__preview').addEventListener('click', (event) => {
    function getCanvas() {
      let layer;
      event.target.parentNode.childNodes.forEach((child) => {
        if (child.tagName === 'CANVAS') {
          layer = child;
        }
      });
      return layer;
    }

    if (event.target.classList.contains('frame')) {
      Frames.chooseFrame(canvas, context, event.target);
    }

    if (event.target.classList.contains('copy-icon')) {
      const canvasToCopy = getCanvas();
      Frames.copyFrame(canvas, context, canvasToCopy, framesArray);
    }

    if (event.target.classList.contains('delete-icon')) {
      const canvasToDelete = getCanvas();
      Frames.deleteFrame(canvas, context, framesArray, canvasToDelete);
    }
  });
};
