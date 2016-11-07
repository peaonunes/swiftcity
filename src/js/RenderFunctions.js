function renderDistrict(blocksMatrix, dimension, scene, file){
    for(var i = 0 ; i < dimension ; i++){
        for(var j = 0 ; j < dimension ; j++){
            var block = blocksMatrix[i][j];
            if(block == -1)
                continue;
            var coordinates = block.coordinates;
            var size = block.size;
            var key = block.key;
            renderCube(coordinates, size, key, scene);
        }
    }

    renderFloor(blocksMatrix.floor, scene);
}

function renderFloor(floor, scene) {
    var geometry = new THREE.PlaneGeometry(floor.width , floor.height);
    var material = new THREE.MeshBasicMaterial( {color: pickColor("Floor"), side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );

    var x = floor.coordinates.x;
    var z = floor.coordinates.z;

    plane.rotation.x = Math.PI/2;
    plane.position.x = x + floor.width/2;
    plane.position.z = z + floor.height/2;
    scene.add(plane);
}

function renderCube(coordinates, size, key, scene){
    var geometry = new THREE.BoxGeometry( size[0], size[1], size[2]);
    var material = new THREE.MeshBasicMaterial( { color: pickColor(key) } );
    var newCube = new THREE.Mesh( geometry, material );

    newCube.position.x = coordinates.x;
    newCube.position.y = size[1]/2;
    newCube.position.z = coordinates.z;

    scene.add(newCube);

    var geo = new THREE.EdgesGeometry(geometry); // or WireframeGeometry( geometry )
    var mat = new THREE.LineBasicMaterial({ color: "#424242", linewidth: 0.5 });
    var wireframe = new THREE.LineSegments(geo, mat);
    wireframe.position.x = coordinates.x;
    wireframe.position.y = size[1]/2;
    wireframe.position.z = coordinates.z;

    scene.add(wireframe);
}
