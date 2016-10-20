var data = [1,2,3,4,5];

function refresh() {
    shapes = scene.selectAll("transform").data( data );

    shapesEnter = shapes
      .enter()
      .append( "transform" )
      .append( "shape" )
      .on('mousedown', function(d){
          console.log("I am :"+d);
      });

     shapes
        .on('mouseover', function(d){
             console.log("I am :"+d);
         });
    // Enter and update
    shapes.transition()
      .attr("translation", function(d,i) { return i*1.5 + " 0.0 " + d/2.0; } )
      .attr("scale", function(d) { return "1.0 1.0 " + d; } )
      ;

    shapesEnter
      .append("appearance")
      .append("material")
      .attr("diffuseColor", "red" )
      ;

    shapesEnter
      .append( "box" )
      .attr( "size", function(d){
          return d + " " + d + " " + d;
      });
}

function init(){
    body = d3.select("body");

    var x3d = body.append("x3d")
                  .attr("height", height)
                  .attr("width", width);

    scene = x3d.append("scene");
    scene.append("viewpoint")
         .attr( "centerOfRotation", "3.75 0 10")
         .attr( "position", "13.742265188709691 -27.453522975182366 16.816062840792625" )
         .attr( "orientation", "0.962043810961999 0.1696342804961945 0.21376603254551874 1.379433089729343" )
         ;

    refresh();
    // /refresh();

     d3.select('Box').node().addEventListener('click', showAlertWithEventCoordinate)

    return x3d;
}


function showAlertWithEventCoordinate(event) {
 var pagePt = invertMousePosition(event);
 alert(d3.select(event.target).attr('id') + ' picked at:\n'
   + 'world coordinate (' + event.hitPnt + '),\n'
   + 'canvas coordinate (' + event.layerX + ', ' + event.layerY + '),\n'
   + 'page coordinate (' + pagePt.x + ', ' + pagePt.y + ')' )
}


$(document).ready(function(){
        //Add a onclick callback to every shape
        $("shape").each(function() {
            $(this).attr("onclick", function(){
                console.log("bora mim");
            });
        });
});

var body;
var height = 600;
var width = 800;
var scene;
var x3d = init();
