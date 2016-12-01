/**
 * @author peaonunes / https://github.com/peaonunes
 */

function pickColor(key) {
    if(systemColors[key] != null)
        return systemColors[key];
    else
        return "black";
}

$(document).ready(function() {
  $('.modal-trigger').leanModal();
});

var systemColors = {
    "Class" : "#EF5350",
    "Enum" : "#42A5F5",
    "Extension" : "#FFA726",
    "Struct" : "#7E57C2",
    "Protocol" : "#66BB6A",
    "Sky" : "#e3f2fd",
    "CityFloor" : "#757575",
    "DistrictFloor" : "#bdbdbd",
    "NeighFloor" : "#e0e0e0",
    "Wireframe" : "#424242",
    "DefaultColor" : "#607d8b"
};

var blocksPallet = {
    "Class" : "#e41a1c",
    "Enum" : "#377eb8",
    "Extension" : "#4daf4a",
    "Struct" : "#984ea3",
    "Protocol" : "#ff7f00",
};
