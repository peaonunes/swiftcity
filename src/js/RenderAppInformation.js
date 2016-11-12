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
    var detailsDiv = d3.select("#details");
    var projectDetails = detailsDiv.append("div").attr("class", "row card collapsible popout");

    projectDetails
        .append("div")
        .attr("class", "col s12 m12 l12 center")
        .append("h4")
        .text("Project name goes here");

        var detailsRight = projectDetails
            .append("div")
            .attr("class", "col s6 m6 l6");

        detailsRight
            .append("div")
            .attr("class", "col s1 m1 l1")
            .attr("style", "margin-top:6px; height:16px; background-color: "+systemColors["Class"]+";");

        detailsRight
            .append("h6")
            .text("Number of Classes: "+projectInfo.numberOfClasses);

        detailsRight
            .append("div")
            .attr("class", "col s1 m1 l1")
            .attr("style", "margin-top:6px; height:16px; background-color: "+systemColors["Struct"]+";");

        detailsRight
            .append("h6")
            .text("Number of Structs: "+projectInfo.numberOfStructs);

        detailsRight
            .append("div")
            .attr("class", "col s1 m1 l1")
            .attr("style", "margin-top:6px; height:16px; background-color: "+systemColors["Extension"]+";");

        detailsRight
            .append("h6")
            .text("Number of Extensions: "+projectInfo.numberOfExtensions);

        detailsRight
            .append("div")
            .attr("class", "col s1 m1 l1")
            .attr("style", "margin-top:6px; height:16px; background-color: "+systemColors["Protocol"]+";");

        detailsRight
            .append("h6")
            .text("Number of Protocols: "+projectInfo.numberOfProtocols);

        detailsRight
            .append("div")
            .attr("class", "col s1 m1 l1")
            .attr("style", "margin-top:6px; height:16px; background-color: "+systemColors["Enum"]+";");

        detailsRight
            .append("h6")
            .text("Number of Enums: "+projectInfo.numberOfEnums);

    var detailsLeft = projectDetails
        .append("div")
        .attr("class", "col s5 m5 l5");

    detailsLeft
        .append("h6")
        .text("Total LOC goes here");

    detailsLeft
        .append("h6")
        .text("Min LOC in an block: "+projectInfo.minMaxLoc[0]);

    detailsLeft
        .append("h6")
        .text("Max LOC in an block: "+projectInfo.minMaxLoc[1]);

    detailsLeft
        .append("h6")
        .text("Min NOM in an block: "+projectInfo.minMaxNom[0]);

    detailsLeft
        .append("h6")
        .text("Max NOM in an block: "+projectInfo.minMaxNom[1]);

    var blockDetails = detailsDiv.append("div").attr("class", "row card");

    blockDetails
        .append("div")
        .attr("class", "col s12 m12 l12")
        .append("h6")
        .text("Some block relevant information could go down here...");
}
