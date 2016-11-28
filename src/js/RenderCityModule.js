/**
 * @author peaonunes / https://github.com/peaonunes
 */

function insertRender(renderer){
    var cityDiv = d3.select("#city");
    cityDiv.node().appendChild(renderer.domElement);
}

function renderSceneProperties(scene){
    var scene = appConfiguration.scene;
    scene.background = new THREE.Color(pickColor("Sky"));
}

function renderCamareProperties(x, y, z){
    if(appConfiguration.filterChanged != null)
        return;
    var camera = appConfiguration.camera;
    var renderer = appConfiguration.renderer;
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    var orbit = new THREE.OrbitControls(camera, renderer.domElement);
}

function renderCity(cityMatrix, dimension) {
    var scene = appConfiguration.scene;
    var district;
    for(var i = 0 ; i < dimension ; i++){
        for(var j = 0 ; j < dimension ; j++){
            district = cityMatrix[i][j];
            if(district == -1)
                continue;
            renderDistrict(district.blocks, district.dimension, scene, district.file);
        }
    }

    renderFloor(cityMatrix.floor, scene, true);
}

function renderDistrict(blocksMatrix, dimension, scene, file){
    var coordinates;
    var size;
    var key;
    for(var i = 0 ; i < dimension ; i++){
        for(var j = 0 ; j < dimension ; j++){
            var block = blocksMatrix[i][j];
            if(block == -1)
                continue;
            coordinates = block.coordinates;
            size = block.size;

            if(appConfiguration.filters.indexOf("color") > -1)
                key = block.key;
            else
                key = "DefaultColor";

            renderCube(coordinates, size, key, scene);
        }
    }

    renderFloor(blocksMatrix.floor, scene, false);
}

function renderFloor(floor, scene, isCity) {
    var geometry = new THREE.BoxGeometry(floor.width, floor.height, 1);
    var color = isCity ? pickColor("CityFloor") : pickColor("DistrictFloor");
    var material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );

    var x = floor.coordinates.x;
    var z = floor.coordinates.z;

    plane.rotation.x = Math.PI/2;
    plane.position.x = x + floor.width/2;
    plane.position.z = z + floor.height/2;
    plane.position.y = isCity ? -0.5 : 0;

    scene.add(plane);

    var geo = new THREE.EdgesGeometry(geometry); // or WireframeGeometry( geometry )
    var mat = new THREE.LineBasicMaterial({ color: pickColor("Wireframe"), linewidth: 0.5 });
    var wireframe = new THREE.LineSegments(geo, mat);

    wireframe.rotation.x = Math.PI/2;
    wireframe.position.x = x + floor.width/2;
    wireframe.position.z = z + floor.height/2;
    wireframe.position.y = isCity ? -0.5 : 0;

    scene.add(wireframe);
}

function renderCube(coordinates, size, key, scene){
    var geometry = new THREE.BoxGeometry( size[0], size[1], size[2]);
    var material = new THREE.MeshBasicMaterial( { color: pickColor(key) } );
    var newCube = new THREE.Mesh( geometry, material );

    newCube.position.x = coordinates.x;
    newCube.position.y = size[1]/2 + 0.5;
    newCube.position.z = coordinates.z;

    scene.add(newCube);

    var geo = new THREE.EdgesGeometry(geometry); // or WireframeGeometry( geometry )
    var mat = new THREE.LineBasicMaterial({ color: pickColor("Wireframe"), linewidth: 0.5 });
    var wireframe = new THREE.LineSegments(geo, mat);
    wireframe.position.x = coordinates.x;
    wireframe.position.y = size[1]/2 + 0.5;
    wireframe.position.z = coordinates.z;

    scene.add(wireframe);
}
