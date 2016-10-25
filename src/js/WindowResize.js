/**
 * @author peaonunes / https://github.com/peaonunes
 */

function winResize(camera, rendere){
    window.addEventListener( 'resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }, false );
}
