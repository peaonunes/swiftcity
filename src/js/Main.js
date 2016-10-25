var controls;
//Global parameters
var height = window.innerHeight * 0.75 ;
var width = window.innerWidth * 0.75 ;
var scene;
var camera;
var renderer;
var cube;

var dataset = [
    { key: "Class", coordinates:[3,10,3]},
    { key: "Functions", coordinates:[1,15,1]}
];

function init(){

    setUp();

    renderData();

    camera.position.z = 5;
    camera.position.y = 20;
    camera.position.x = 0;

    scene.background = new THREE.Color(systemColors["sky"]);

    var orbit = new THREE.OrbitControls(camera, renderer.domElement);
    var geometry = new THREE.PlaneGeometry( 10, 10, 5 );
    var material = new THREE.MeshBasicMaterial( {color: systemColors["floor"], side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = Math.PI/2;

    scene.add( plane );

    render(renderer);

    winResize(camera,renderer,width,height);

}

function setUp(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(150, width / height, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height);
    document.body.appendChild( renderer.domElement );
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function renderData(){

    for(var el in dataset){
        var element = dataset[el];
        var value = element.coordinates;
        var geometry = new THREE.BoxGeometry( value[0], value[1], value[2]);
        var material = new THREE.MeshBasicMaterial( { color: pickColor(element.key) } );
        var newCube = new THREE.Mesh( geometry, material );

        newCube.position.x = 1 * el;
        newCube.position.y = value[1]/2;

        scene.add(newCube);
    }

}

init();
