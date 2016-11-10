let projectFiles = {};

function fileReader(filePath){
    d3.json(filePath, function(error, project) {
        if(error)
            throw error;

        var project;

        Object.keys(project).forEach(function (projectId) {
          project = project[projectId];
        });

        console.log(project);
        var enums = project.enums;
        buildProjectFiles(enums);
        console.log(projectFiles);
    });
}

function buildProjectFiles(enums) {
    for(var i = 0 ; i < enums.length ; i++){
        var currentEnum = enums[i];
        var fileName = getFileName(currentEnum["source_path"]);

        if(!projectFiles.hasOwnProperty(fileName)){
            projectFiles[fileName] = [];
        }

        var obj = createObj("Enum", currentEnum["name"], currentEnum["number_of_lines"], currentEnum["methods"].length);

        projectFiles[fileName].push(obj);
    }
}

function createObj(keyName, objName, objLoc, objNom){
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
