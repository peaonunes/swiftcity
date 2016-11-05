/**
 * @author peaonunes / https://github.com/peaonunes
 */

function pickColor(key) {
    if(systemColors[key] != null)
        return systemColors[key];
    else
        return "black";
}

var systemColors = {
    "Sky" : "#e3f2fd",
    "Floor" : "#e0e0e0",
    "Wireframe" : "#424242",
    "Class" : "#b71c1c",
    "Functions" : "#0277bd"
}
