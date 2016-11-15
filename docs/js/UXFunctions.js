/**
 * @author peaonunes / https://github.com/peaonunes
 */

function colorClicked(checkbox) {
    enableColor = checkbox.checked;
}

function sortBlocksClicked(checkbox) {
    sortedBlocks = checkbox.checked;
}

function pickColor(key) {
    if(systemColors[key] != null)
        return systemColors[key];
    else
        return "black";
}

var systemColors = {
    "Sky" : "#e3f2fd",
    "DistrictFloor" : "#e0e0e0",
    "Wireframe" : "#424242",
    //"Class" : "#b71c1c",
    //"Functions" : "#0277bd",
    "CityFloor" : "#757575",
    "Wireframe" : "#424242",
    "Class" : "#e41a1c",
    "Enum" : "#377eb8",
    "Extension" : "#4daf4a",
    "Struct" : "#984ea3",
    "Protocol" : "#ff7f00",
    "DefaultColor" : "#1976d2"
    //"Enum" : "#6a1b9a"
}
/*
"Class" : "#fbb4ae",
"Enum" : "#b3cde3",
"Extension" : "#ccebc5",
"Struct" : "#decbe4",
"Protocol" : "#fed9a6"
*/
