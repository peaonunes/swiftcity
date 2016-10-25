/**
 * @author peaonunes / https://github.com/peaonunes
 * Using Chrome key configuration.
 */

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            camera.position.x *= 1.1;
            break;
        case 38:
            camera.position.y *= 0.9;
            break;
        case 39:
            camera.position.x *= 0.9;
            break;
        case 40:
            camera.position.y *= 1.1;
            break;
        case 189:
            camera.position.z *= 1.1;
            break;
        case 187:
            camera.position.z *= 0.9;
            break;
        default:
            console.log(">> Warning:\n>> The following number Key was not recognised: "+e.keyCode);
    }
};
