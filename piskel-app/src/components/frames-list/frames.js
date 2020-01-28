export default class Frames {
    constructor() {

    }

    static drawOnFrame(mainCanvas, context) {
        const frameCanvas = document.querySelector('.current-frame');
        const frameContext = frameCanvas.getContext('2d');

        const mainCanvasImage = context.getImageData(0, 0, mainCanvas.width, mainCanvas.width);
        frameCanvas.width = mainCanvas.width;
        frameCanvas.height = mainCanvas.height;
        frameContext.putImageData(mainCanvasImage, 0, 0);
    }

    static createWrapper(canvas) {
        const newFrame = document.createElement('canvas');
        document.querySelector('.current-frame').classList.remove('current-frame');
        newFrame.classList.add('current-frame', 'frame');
        newFrame.width = canvas.width;
        newFrame.height = canvas.height;

        const newWrap = document.createElement('div');
        newWrap.classList.add('frame-wrap');
        const newCopyIcon = document.createElement('div');
        newCopyIcon.classList.add('canvas-icon', 'copy-icon');
        const newDeleteIcon = document.createElement('div');
        newDeleteIcon.classList.add('canvas-icon', 'delete-icon');
        
        newWrap.append(newFrame);
        newWrap.append(newDeleteIcon);
        newWrap.append(newCopyIcon);

        return [newFrame, newWrap]
    }

    static createNewFrame(mainCanvas, context, framesArray) {
        const frame = Frames.createWrapper(mainCanvas);
        const frameCanvas = frame[0];
        const frameWrap = frame[1];
        document.querySelector('.frames__preview').append(frameWrap);
        framesArray.push(frameCanvas);
        context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    }

    static chooseFrame(mainCanvas, context, target) {
        document.querySelector('.current-frame').classList.remove('current-frame');
        target.classList.add('current-frame');
        context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        
        mainCanvas.width = target.width;
        mainCanvas.height = target.height;

        Frames.pasteImage(context, target);
    }

    static pasteImage(context, frame) {
        const frameContext = frame.getContext('2d');
        const frameImage = frameContext.getImageData(0, 0, frame.width, frame.height);
        context.putImageData(frameImage, 0, 0);
    }

    static copyFrame(mainCanvas, context, canvasToCopy, framesArray) {       
        context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        const frame = Frames.createWrapper(canvasToCopy);
        const frameCanvas = frame[0];
        const frameWrap = frame[1];
        canvasToCopy.parentNode.after(frameWrap);
        
        const frameContext = canvasToCopy.getContext('2d');
        const newFrameContext = frameCanvas.getContext('2d');
        const frameImage = frameContext.getImageData(0, 0, canvasToCopy.width, canvasToCopy.height);
        context.putImageData(frameImage, 0, 0);
        newFrameContext.putImageData(frameImage, 0, 0);

        framesArray.forEach((canvas, index) => {
            if (canvas === canvasToCopy) {            
                framesArray.splice(index + 1, 0, frameCanvas);
            }
        });
    }

    static deleteFrame(mainCanvas, context, framesArray, canvasToDelete) {
        if (framesArray.length === 1) {
            return
        }
        framesArray.forEach((canvas, index) => {
            if (canvas === canvasToDelete) {
                if (index != 0) {
                    Frames.chooseFrame(mainCanvas, context, framesArray[index - 1]);
                } else {
                    Frames.chooseFrame(mainCanvas, context, framesArray[index + 1]);
                }
                framesArray.splice(index, 1);  
            }
        });
        document.querySelector('.frames__preview').removeChild(canvasToDelete.parentNode);
    }
}