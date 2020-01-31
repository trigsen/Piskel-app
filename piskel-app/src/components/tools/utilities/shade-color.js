export function shadeColor(color, percent) {
    
    color.r = parseInt(color.r * (100 + percent) / 100);
    color.g = parseInt(color.g * (100 + percent) / 100);
    color.b = parseInt(color.b * (100 + percent) / 100);

    color.r = (color.r< 255) ? color.r : 255;  
    color.g = ( color.g < 255) ? color.g :255;  
    color.b = (color.b < 255) ? color.b :255;  

    const RR = ((color.r.toString(16).length==1)?"0"+color.r.toString(16):color.r.toString(16));
    const GG = ((color.g.toString(16).length==1)?"0"+color.g.toString(16):color.g.toString(16));
    const BB = ((color.b.toString(16).length==1)?"0"+color.b.toString(16):color.b.toString(16));

    return "#"+RR+GG+BB;
}