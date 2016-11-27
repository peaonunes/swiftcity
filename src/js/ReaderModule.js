/**
 * @author peaonunes / https://github.com/peaonunes
 */

let projectFiles = [];

let minMaxLoc = [Number.POSITIVE_INFINITY,0];
let minMaxNom = [Number.POSITIVE_INFINITY,0];
let defaultFileReader = new FileReader();

let lastFileSelected = [];
let lastFilters = [];
let scales = {
    "linear" : d3.scaleLinear(),
    "sqrt" : d3.scaleSqrt(),
    "log15" : d3.scaleLog().base(1.5)
};

function updateWithFile() {
    var selectedFile = document.getElementById("fileInput").files[0];
    var filterChanged = filtersChanged();
    if(selectedFile == null){
        showToast("You should first select a file!", 4000);
        return;
    } else if (lastFileSelected == selectedFile){
        if(!filterChanged){
            showToast("You just chose the same file!", 2000);
            return;
        }
        showToast("Some filters has changed", 2000);
        projectFiles = [];
    } else {
        projectFiles = [];
    }
    defaultFileReader.readAsText(selectedFile);
    lastFileSelected = selectedFile;
}

function filtersChanged() {
    var filters = appConfiguration.filters;
    if (lastFilters.length != filters.length)
        return true;
    else {
        var filter;
        for (var i = 0 ; i < filters.length ; i++){
            filter = filters[i];
            if(lastFilters.indexOf(filter) < 0){
                lastFilters = filters;
                return true;
            }
        }
        return false;
    }
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
    var projectInfo = appConfiguration.projectInfo;
    projectInfo.minMaxLoc = minMaxLoc;
    projectInfo.minMaxNom = minMaxNom;
    projectInfo.numberOfEnums = project.enums.length;
    projectInfo.numberOfStructs = project.structs.length;
    projectInfo.numberOfExtensions = project.extensions.length;
    projectInfo.numberOfClasses = project.classes.length;
    projectInfo.numberOfProtocols = project.protocols.length;
    appConfiguration.projectInfo = projectInfo;
}

function renderData(){
    clearScene();
    runCity(projectFiles);
}

function clearScene(scene) {
    var scene = appConfiguration.scene;
    scene.children = [];
}

function getProjectFrom(fileData){
    var project;
    Object.keys(fileData).forEach(function (id) {
        project = fileData[id];
    });
    return project;
}

function buildProjectFiles(project) {
    readElements(project.enums, "Enum");
    readElements(project.classes, "Class");
    readElements(project.extensions, "Extension");
    readElements(project.structs, "Struct");
    readElements(project.protocols, "Protocol");

    var heightScale = getScale(appConfiguration.filters)
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

function getScale(filters){
    var filter;
    var scale;
    for (var i = 0; i < filters.length; i++) {
        filter = filters[i];
        scale = scales[filter];
        if(scale != null)
            return scale;
    }
    console.log(">> ERROR: No scale matched.");
}

function showToast(message, duration) {
    Materialize.toast(message, duration);
}
