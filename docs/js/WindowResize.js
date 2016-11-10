/**
 * @author peaonunes / https://github.com/peaonunes
 */

function winResize(camera, renderer, width, height){
    window.addEventListener( 'resize', function () {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize( width, height);
    }, false );
}
