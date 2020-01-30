export const changeCanvasSize = function(item, canvas, context) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = parseInt(item.innerHTML, 10);
    canvas.height =  parseInt(item.innerHTML, 10);
    context.putImageData(imageData, 0, 0);
}