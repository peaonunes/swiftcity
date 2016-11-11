/**
 * @author peaonunes / https://github.com/peaonunes
 */

function init(){
    setUp();
    render(renderer);
    winResize(camera,renderer,width,height);
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

init();
