// App configurantion parameters
let appConfiguration = {
    controls : [],
    height : window.innerHeight * 0.75,
    width : window.innerWidth * 0.65,
    camera : [],
    holdCamera : false,
    renderer : [],
    filters : ["color", "sort", "linear"],
    colorEnabled : function() {
        if(this.filters.indexOf("color") > -1)
            return true;
        else
            return false;
    },
    filterChanged : null,
    stackExtensions : true,
    projectInfo : {
        name:"Project name",
        numberOfEnums:0,
        numberOfStructs:0,
        numberOfExtensions:0,
        numberOfClasses:0,
        numberOfProtocols:0,
        minMaxLoc:[],
        minMaxNom:[]
    }
};
