export default class Preview {
    constructor() {

    }

    static displayAnimation(framesArray) {
        const animationLayer = document.querySelector('.anim-preview-canvas');
        const animationContext = animationLayer.getContext('2d');

        let fpsCount = 2;
        let item = 0;
        setInterval(() => {
            if (item < framesArray.length) {
                const frame = framesArray[item];
                const frameContext = frame.getContext('2d');
                const frameImage = frameContext.getImageData(0, 0, frame.width, frame.height);
                
                animationContext.clearRect(0, 0, animationLayer.width, animationLayer.height);
                animationLayer.width = frame.width;
                animationLayer.height = frame.height;

                animationContext.putImageData(frameImage, 0, 0);

                item = item + 1;
            } else {
                item = 0;
            }
        }, 1000 / fpsCount);
    }
}