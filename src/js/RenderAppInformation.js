/**
 * @author peaonunes / https://github.com/peaonunes
 */

function renderAppInformation() {
    renderControlsInformation();
    renderProjectDetailsInformation();
}

function renderControlsInformation() {
    d3.select("#content").remove();
    var divInformation = d3.select("#controls").append("div").attr("id", "content");
    divInformation.append("h5")
        .text("Basic controls");
    divInformation.append("h6")
        .text("Mouse interaction [ Zoom out: Scroll up | Zoom in : Scroll down | Camera Rotation : Pan and move]");
    divInformation.append("h6")
        .text("Keyboard interaction [ Move Camera up/down : UP/Down Arrows | Move Camera left/right : Left/Right Arrows ]");
}

function renderProjectDetailsInformation() {
    var projectName = d3.select("#projectName");

    $("#projectName").click();
    $("#projectOptions").click();

    var projectInfo = appConfiguration.projectInfo;
    var enableColor = appConfiguration.filters.indexOf("color") > -1 ? true : false;

    projectName
        .text(projectInfo.name)
        .attr("class", "collapsible-header active")
        .append("i")
        .attr("class", "material-icons")
        .text("info_outline");

    d3.select("#tableContent").remove();

    var tableContent = d3.select("#tableStats")
        .append("tbody")
        .attr("id", "tableContent");

    renderRowInfo(tableContent, enableColor ? "Class" : "DefaultColor", "Number of Classes: "+projectInfo.numberOfClasses, "Project's LOC goes here");
    renderRowInfo(tableContent, enableColor ? "Struct" : "DefaultColor", "Number of Structs: "+projectInfo.numberOfStructs, "Min LOC in a block: "+projectInfo.minMaxLoc[0]);
    renderRowInfo(tableContent, enableColor ? "Extension" : "DefaultColor", "Number of Extensions: "+projectInfo.numberOfExtensions, "Max LOC in a block: "+projectInfo.minMaxLoc[1]);
    renderRowInfo(tableContent, enableColor ? "Protocol" : "DefaultColor", "Number of Protocols: "+projectInfo.numberOfProtocols, "Min NOM in a block: "+projectInfo.minMaxNom[0]);
    renderRowInfo(tableContent, enableColor ? "Enum" : "DefaultColor", "Number of Enums: "+projectInfo.numberOfEnums, "Max NOM in a block: "+projectInfo.minMaxNom[1]);
}

function renderRowInfo(tableContent, labelType, middleColText, rightColText) {
    var row = tableContent
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
