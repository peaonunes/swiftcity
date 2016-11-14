/**
 * @author peaonunes / https://github.com/peaonunes
 */

let projectFiles = [];
let minMaxLoc = [Number.POSITIVE_INFINITY,0];
let minMaxNom = [Number.POSITIVE_INFINITY,0];
let defaultFileReader = new FileReader();
let lastFileSelected = [];

function updateWithFile() {
    var selectedFile = document.getElementById("fileInput").files[0];
    if(selectedFile == null){
        Materialize.toast("You should first select a file!", 4000);
        return;
    } else if (lastFileSelected == selectedFile){
        Materialize.toast("You just choose the same file!", 3000);
        return;
    }
    defaultFileReader.readAsText(selectedFile);
    lastFileSelected = selectedFile;
}

defaultFileReader.onload = function(e) {
    var fileText = e.target.result;
    var fileData = JSON.parse(fileText);
    var project = getProjectFrom(fileData);
    buildProjectFiles(project);
    buildProjectInfo(project);
    renderData();
    renderAppInformation();
};

function buildProjectInfo(project) {
    projectInfo.minMaxLoc = minMaxLoc;
    projectInfo.minMaxNom = minMaxNom;
    projectInfo.numberOfEnums = project.enums.length;
    projectInfo.numberOfStructs = project.structs.length;
    projectInfo.numberOfExtensions = project.extensions.length;
    projectInfo.numberOfClasses = project.classes.length;
    projectInfo.numberOfProtocols = project.protocols.length;
}

function renderData(){
    runCity(projectFiles, scene, sort, camera);
}

function getProjectFrom(fileData){
    var project;
    Object.keys(fileData).forEach(function (id) {
        project = fileData[id];
    });
    return project;
}

function buildProjectFiles(project) {
    projectFiles = [];

    readElements(project.enums, "Enum");
    readElements(project.classes, "Class");
    readElements(project.extensions, "Extension");
    readElements(project.structs, "Struct");
    readElements(project.protocols, "Protocol");

    var heightScale = d3.scaleLinear()
        .domain(minMaxLoc)
        .range([1, 15]);

    var widthScale = d3.scaleLinear()
        .domain(minMaxNom)
        .range([1, 10]);

    var block;
    var size;
    var elements;

    Object.keys(projectFiles).forEach(function (fileId) {
        elements = projectFiles[fileId].elements;
        for (var i = 0 ; i < elements.length ; i++){
            block = elements[i];
            size = [widthScale(block.nom), heightScale(block.loc),widthScale(block.nom)];
            block.size = size;
        }
    });
}

function readElements(array, elementType) {
    var element;
    var fileName;
    var obj;
    var found;
    var fileObj;

    for(var i = 0 ; i < array.length ; i++){
        element = array[i];
        fileName = getFileName(element["source_path"]);

        found = hasFile(projectFiles, fileName);

        var obj = createObj(elementType, element["name"], element["number_of_lines"], element["methods"].length);

        if(found == -1){
            var fileObj = {
                fileName: fileName,
                elements: [obj]
            }
            projectFiles.push(fileObj);
        } else {
            projectFiles[found].elements.push(obj)
        }
    }
}


function hasFile(array, fileName){
    for (var i = 0 ; i < array.length ; i++){
        if (!(array[i].fileName === "") && array[i].fileName === fileName)
            return i;
    }
    return -1;
}

function createObj(keyName, objName, objLoc, objNom){
    minMaxLoc[0] = Math.min(objLoc, minMaxLoc[0]);
    minMaxLoc[1] = Math.max(objLoc, minMaxLoc[1]);
    minMaxNom[0] = Math.min(objNom, minMaxNom[0]);
    minMaxNom[1] = Math.max(objNom, minMaxNom[1]);

    var obj = {
        key: keyName,
        size:[0,0,0],
        name: objName,
        loc: objLoc,
        nom: objNom
    }
    return obj;
}

function getFileName(source_path){
    var startName = source_path.lastIndexOf("/") + 1;
    var endName = source_path.length-1;
    var fileName = source_path.substring(startName, endName);
    return fileName;
}
