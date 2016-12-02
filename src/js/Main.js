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
    appConfiguration.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 20000);
    appConfiguration.renderer = new THREE.WebGLRenderer();
    appConfiguration.raycaster = new THREE.Raycaster();
    appConfiguration.mouse = new THREE.Vector3();
    appConfiguration.renderer.setSize(width, height);
    insertRender(appConfiguration.renderer);
    render();
}

function render() {
    requestAnimationFrame(render);
    appConfiguration.renderer.render(appConfiguration.scene, appConfiguration.camera);
}

function onDocumentMouseDown(event) {
    event.stopPropagation();
    event.preventDefault();
    if(event.button != 2){
        var canvas = document.getElementsByTagName("canvas");
        canvas = canvas[0];

        var marginWidthError = 0.04;
        var marginHeightError = 0.02;

        var raycaster = appConfiguration.raycaster;
        var mouse = appConfiguration.mouse;

        mouse.x = ((event.clientX / appConfiguration.renderer.domElement.width) * 2 - 1);
        mouse.x = appConfiguration.mouse.x - marginWidthError;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        mouse.y = appConfiguration.mouse.y - marginHeightError;
        mouse.z  = z = -1/Math.tan(22.5*Math.PI/180);

        raycaster.setFromCamera(mouse,appConfiguration.camera);

        var intersects = raycaster.intersectObjects(appConfiguration.targetList, false);
    	if (intersects.length > 0)
    	{
            var block = intersects[0].object;
            selectBlock(block);
    	}
    }
}

window.addEventListener('mousedown',onDocumentMouseDown,false);

init();
