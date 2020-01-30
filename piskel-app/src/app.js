import Pen from './components/tools/pen/pen'
import {changeCanvasSize} from './components/canvas-size-buttons/canvas-size-buttons'
import ColorChangerPanel from './components/canvas-color-picker/canvas-color-picker';
import ColorBucket from './components/tools/color-bucket/color-bucket';
import Frames from './components/frames-list/frames';
import Preview from './screens/preview/preview';
import StrokeLine from './components/tools/stroke-line/stroke-line';
import Circle from './components/tools/circle/circle';

export const startApp = function startApp() {
    let canvas = document.querySelector('.main-canvas');
    let context = canvas.getContext('2d');
    let canvasEvents = {};
    const color = document.querySelector('.color-picker');
    const framesArray = [];
    framesArray.push(document.querySelector('.frame'));
    context.clearRect(0, 0, 700, 600);
    const eraserColor = {
        value: '#FFFFFF'
    };
    canvas.width = 512;
    canvas.height = 512;
    Preview.displayAnimation(framesArray);
    
    function deleteActiveTool() {
        document.querySelector('.active-tool').classList.remove('active-tool');
    }

    function addActiveTool(target) {
        target.classList.add('active-tool');
    }

    document.querySelector('.canvas-size-button').addEventListener('click', (event) => {
        if (event.target.classList.contains('canvas-size-button__item')) {
            changeCanvasSize(event.target, canvas, context);
        }
    });

    document.querySelector('.pen').addEventListener('click', (event) => {
        deleteActiveTool();
        addActiveTool(event.target);
        Pen.draw(context, canvas, color, event.target, canvasEvents);
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
            let canvas;
            event.target.parentNode.childNodes.forEach((child) => {
                if (child.tagName === 'CANVAS') {
                canvas = child;   
            }
            });
            return canvas;
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
}