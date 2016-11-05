/**
 * @author peaonunes / https://github.com/peaonunes
 */

var controls;
//Global parameters
var height = window.innerHeight * 0.75 ;
var width = window.innerWidth * 0.75 ;
var scene;
var camera;
var renderer;
var cube;

function init(){

    setUp();

    renderData();

    camera.position.z = 5;
    camera.position.y = 20;
    camera.position.x = 0;

    scene.background = new THREE.Color(pickColor("Sky"));

    var orbit = new THREE.OrbitControls(camera, renderer.domElement);

    render(renderer);

    winResize(camera,renderer,width,height);
}

function setUp(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(150, width / height, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height);
    document.body.appendChild( renderer.domElement );

    var divInformation = d3.select("body").append("div");
    divInformation.append("h5").text("Basic controls");
    divInformation.append("h6").text("Mouse interaction [ Zoom out: Scroll up | Zoom in : Scroll down | Camera Rotation : Pan and move]");
    divInformation.append("h6").text("Keyboard interaction [ Move Camera up/down : UP/Down Arrows | Move Camera left/right : Left/Right Arrows ]");
}

var sort = true;

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function renderData(){
    districtMaker(file, scene, sort);
}

init();
