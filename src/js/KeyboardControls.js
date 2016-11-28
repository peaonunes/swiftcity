/**
 * @author peaonunes / https://github.com/peaonunes
 * Using Chrome key configuration.
 */

 // 039 >> Right arrow -> Move camera X to right
 // 037 >> Left arrow -> Move camera X to left
 // 040 >> Down arrow -> Moves down the camera Y
 // 038 >> Up arrow -> Moves up the camera Y
 // 189 >> - key -> Descrease the camera Z
 // 187 >> + key -> Increase the camera Z

var incrementScale = 1.1;
var decrementScale = 0.9;

document.onkeydown = function(e) {
    var camera = appConfiguration.camera;
    switch (e.keyCode) {
        case 37:
            camera.position.x *= incrementScale;
            break;
        case 38:
            camera.position.y *= decrementScale;
            break;
        case 39:
            camera.position.x *= decrementScale;
            break;
        case 40:
            camera.position.y *= incrementScale;
            break;
        case 189:
            camera.position.z *= incrementScale;
            break;
        case 187:
            camera.position.z *= decrementScale;
            break;
        default:
            console.log(">> Warning:\n>> The following number Key was not recognised: "+e.keyCode);
    }
};
