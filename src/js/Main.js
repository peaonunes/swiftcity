/**
 * @author peaonunes / https://github.com/peaonunes
 */

function init(){

    setUp();

    fileReader("./data/test_output.json");

    setTimeout(function(){
        if(!busy){
            renderData();
            render(renderer);
            winResize(camera,renderer,width,height);
        }
    }, 100);
}

function setUp(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    insertRender(renderer);
    renderAppInformation();
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function renderData(){
    //runCity(files, scene, sort, camera);
    runCity(projectFiles, scene, sort, camera);
}

init();