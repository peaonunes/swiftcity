/**
 * @author peaonunes / https://github.com/peaonunes
 */

function renderAppInformation() {
    renderControlsInformation();
    renderProjectDetailsInformation();
}

function renderControlsInformation() {
    d3.select("#controls").append("div").attr("class", "divider");
    var divInformation = d3.select("#controls").append("div");
    divInformation.append("h5")
        .text("Basic controls");
    divInformation.append("h6")
        .text("Mouse interaction [ Zoom out: Scroll up | Zoom in : Scroll down | Camera Rotation : Pan and move]");
    divInformation.append("h6")
        .text("Keyboard interaction [ Move Camera up/down : UP/Down Arrows | Move Camera left/right : Left/Right Arrows ]");
}

function renderProjectDetailsInformation() {
    var projectName = d3.select("#projectName");

    projectName
        .text(projectInfo.name)
        .append("i")
        .attr("class", "material-icons")
        .text("info_outline");

    var tableStats = d3.select("#tableStats");

    renderRowInfo(tableStats, "Class", "Number of Classes: "+projectInfo.numberOfClasses, "Project's LOC goes here");
    renderRowInfo(tableStats, "Struct", "Number of Structs: "+projectInfo.numberOfStructs, "Min LOC in an block: "+projectInfo.minMaxLoc[0]);
    renderRowInfo(tableStats, "Extension", "Number of Extensions: "+projectInfo.numberOfExtensions, "Max LOC in an block: "+projectInfo.minMaxLoc[1]);
    renderRowInfo(tableStats, "Protocol", "Number of Protocols: "+projectInfo.numberOfProtocols, "Min NOM in an block: "+projectInfo.minMaxNom[0]);
    renderRowInfo(tableStats, "Enum", "Number of Enums: "+projectInfo.numberOfEnums, "Max NOM in an block: "+projectInfo.minMaxNom[1]);
}

function renderRowInfo(tableStats, labelType, middleColText, rightColText) {
    var row = tableStats
        .append("tr")
        .attr("class", "valign-wrapper")
        .attr("style", "height: 25px");

    row.append("td")
        .attr("style", "width: 10%")
        .attr("class", "right-align")
        .append("i")
        .attr("class", "material-icons valign")
        .attr("style", "color: "+systemColors[labelType])
        .text("label");

    row.append("td")
        .attr("style", "width: 40%")
        .attr("class", "left-align")
        .text(middleColText);

    row.append("td")
        .attr("style", "width: 50%")
        .text(rightColText);
}
