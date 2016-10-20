function init(){

    setUp();

    renderData();

    camera.position.z = 5;

    render(renderer);
}

function setUp(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height);
    document.body.appendChild( renderer.domElement );
}

function render() {
	requestAnimationFrame(render);
    //cube.rotation.y += 0.01;
	renderer.render(scene, camera);
}

function renderData(){
    for(var el in dataset){
        var element = dataset[el];
        var value = element.coordinates;
        var geometry = new THREE.BoxGeometry( value[0], value[1], value[2]);
        var material = new THREE.MeshBasicMaterial( { color: pickColor(element.key) } );
        var newCube = new THREE.Mesh( geometry, material );
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(1.0*el, 0.0, 0.0) );
        scene.add(newCube);
    }
    /*chart3d = new THREE.Object3D();

    d3.select( chart3d )
      .selectAll()
      .data(data)
        .enter().append(
          function (d, i) {
          var geometry = new THREE.BoxGeometry( value[0], value[1], value[2]);
          var material = new THREE.MeshBasicMaterial( { color: pickColor("Class") } );
            var bar = new THREE.Mesh( geometry, material );
            bar.position.x = 30 * i;
            bar.position.y = d;
            bar.scale.y = d / 10;
            return bar;
          }
      );*/
}

//Global parameters
var height = 800;
var width = 850;
var scene;
var camera;
var renderer;
var cube;

var dataset = [
    { key: "Class", coordinates:[1.0,1.0,1.0]},
    { key: "Functions", coordinates:[1,1,1]}
];

function pickColor(key) {
    if (key == "Class")
        return "red";
    else (key == "Functions")
        return "blue";
}
init();
