/**
 * @author peaonunes / https://github.com/peaonunes
 */

function init(){

    setUp();

    fileReader("./data/test_output.json");

    renderData();

    render(renderer);

    winResize(camera,renderer,width,height);
}

function setUp(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(150, width / height, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    var body = d3.select("body");
    body.node().appendChild(renderer.domElement);

    var divInformation = d3.select("body").append("div");
    divInformation.append("h5").text("Basic controls");
    divInformation.append("h6").text("Mouse interaction [ Zoom out: Scroll up | Zoom in : Scroll down | Camera Rotation : Pan and move]");
    divInformation.append("h6").text("Keyboard interaction [ Move Camera up/down : UP/Down Arrows | Move Camera left/right : Left/Right Arrows ]");
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function renderData(){
    runCity(files, scene, sort, camera);
}

init();
