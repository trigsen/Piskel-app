export const changeCanvasSize = function(value, canvas, context) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = value;
    canvas.height =  value;
    context.putImageData(imageData, 0, 0);
}