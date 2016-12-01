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
    appConfiguration.mouse = new THREE.Vector2();
    appConfiguration.renderer.setSize(width, height);
    insertRender(appConfiguration.renderer);
    render();
}

function render() {
    //appConfiguration.raycaster.setFromCamera(appConfiguration.mouse, appConfiguration.camera);
    //appConfiguration.raycaster.near = 10;
	/*var intersects = appConfiguration.raycaster.intersectObjects(appConfiguration.scene.children);
    var intersetct;
	for ( var i = 0; i < intersects.length; i++ ) {
		intersect = intersects[0].object;
        if(intersect.type === "Mesh" && intersect.bora != "")
            console.log(intersect);
	}*/
    requestAnimationFrame(render);
    appConfiguration.renderer.render(appConfiguration.scene, appConfiguration.camera);
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    var canvas = document.getElementsByTagName("canvas");
    canvas = canvas[0];
	appConfiguration.mouse.x = ( event.clientX / canvas.width ) * 2 - 1;
	appConfiguration.mouse.y = - ( event.clientY / canvas.height ) * 2 + 1;

    var raycaster = new THREE.Raycaster(); // create once
    var mouse = new THREE.Vector3(); // create once

    mouse.x = ((event.clientX / appConfiguration.renderer.domElement.width) * 2 - 1);
    mouse.x = mouse.x - 0.04;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    mouse.y = mouse.y - 0.02;
    mouse.z = 0.5;
    console.log("MOUSE");
    console.log(mouse);
    console.log("CAMERA");
    console.log(appConfiguration.camera.position);
    raycaster.setFromCamera(mouse,appConfiguration.camera);

    var intersects = raycaster.intersectObjects(appConfiguration.targetList, false);

	// if there is one (or more) intersections
	if ( intersects.length > 0 )
	{
		//console.log("Hit @ " + toString( intersects[0].point ) );
		//console.log(intersects[0].object);
        var color = "#"+intersects[0].object.material.color.getHexString();
        if(color === "#ffff00"){
            var material = new THREE.MeshBasicMaterial( {color: "#ffffff", side: THREE.DoubleSide} );
        } else {
            var material = new THREE.MeshBasicMaterial( {color: "#ffff00", side: THREE.DoubleSide} );
        }
        intersects[0].object.material = material;
	}

}

window.addEventListener( 'mousedown', onDocumentMouseDown, false );

init();
