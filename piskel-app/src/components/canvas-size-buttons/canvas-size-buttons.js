export const changeCanvasSize = function(item, canvas) {
    canvas.width = parseInt(item.innerHTML, 10);
    canvas.height =  parseInt(item.innerHTML, 10);
}