function init(){
    body = d3.select("body");

    var x3d = body.append("x3d")
                  .attr("height", height)
                  .attr("width", width);
    return x3d;
}

//Global parameters
var height = 600;
var width = 800;
var htmlBody;
var mainScene;
var x3dBlock = init();
