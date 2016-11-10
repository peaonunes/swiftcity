let projectFiles = [];
let minMaxLoc = [Number.POSITIVE_INFINITY,0];
let minMaxNom = [Number.POSITIVE_INFINITY,0];
let busy = true;

function fileReader(filePath){
    d3.json(filePath, function(error, project) {
        if(error)
            throw error;

        var project;

        Object.keys(project).forEach(function (projectId) {
            project = project[projectId];
        });

        var enums = project.enums;
        buildProjectFiles(enums);
        console.log(projectFiles);
        console.log("LOC", minMaxLoc);
        console.log("NOM", minMaxNom);
        busy = false;
    });
}

function hasFile(array, fileName){
    for (var i = 0 ; i < array.length ; i++){
        if (!(array[i].fileName === "") && array[i].fileName === fileName)
            return i;
    }
    return -1;
}

function buildProjectFiles(enums) {
    var currentEnum;
    var fileName;
    var obj;
    var found;
    var fileObj;

    for(var i = 0 ; i < enums.length ; i++){
        currentEnum = enums[i];
        fileName = getFileName(currentEnum["source_path"]);

        found = hasFile(projectFiles, fileName);

        var obj = createObj("Enum", currentEnum["name"], currentEnum["number_of_lines"], currentEnum["methods"].length);

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
