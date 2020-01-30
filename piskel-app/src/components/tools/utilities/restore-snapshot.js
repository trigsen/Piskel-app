export function restoreSnapshot(context, snapshot) {
    context.putImageData(snapshot, 0, 0);
 }