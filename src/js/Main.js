/**
 * @author peaonunes / https://github.com/peaonunes
 */

function init(){
    setUp();
    winResize(appConfiguration.camera,appConfiguration.renderer,appConfiguration.width,appConfiguration.height);
}

function setUp(){
    var width = appConfiguration.width;
    var height = appConfiguration.height;
    appConfiguration.scene = new THREE.Scene();
    appConfiguration.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    appConfiguration.renderer = new THREE.WebGLRenderer();
    appConfiguration.renderer.setSize(width, height);

    insertRender(appConfiguration.renderer);
    render();
}

function render() {
    requestAnimationFrame(render);
    appConfiguration.renderer.render(appConfiguration.scene, appConfiguration.camera);
}

init();
