export function takeSnapshot(context, canvas) {
    return context.getImageData(0, 0, canvas.width, canvas.height);
}