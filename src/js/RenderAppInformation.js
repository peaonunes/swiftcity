function renderAppInformation() {
    renderControlsInformation();
    renderProjectDetailsInformation();
}

function renderControlsInformation() {
    var divInformation = d3.select("#controls").append("div");
    divInformation.append("h5")
        .text("Basic controls");
    divInformation.append("h6")
        .text("Mouse interaction [ Zoom out: Scroll up | Zoom in : Scroll down | Camera Rotation : Pan and move]");
    divInformation.append("h6")
        .text("Keyboard interaction [ Move Camera up/down : UP/Down Arrows | Move Camera left/right : Left/Right Arrows ]");
}

function renderProjectDetailsInformation() {
    var detailsDiv = d3.select("#details");
    var projectDetails = detailsDiv.append("div");

    projectDetails
        .append("h4")
        .text("Project name.");

    projectDetails
        .append("h6")
        .text("Lines of code:");

    projectDetails
        .append("h6")
        .text("Wathever relevant information...");
}