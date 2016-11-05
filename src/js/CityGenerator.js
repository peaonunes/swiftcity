/**
 * @author peaonunes / https://github.com/peaonunes
 */

function districtMaker(file, scene, sorted){
    var length = file.length;
    var side = Math.ceil(Math.sqrt(length));

    var blocksMatrix = [];
    for (var i = 0 ; i < side ; i++){
        blocksMatrix[i] = [];
        for (var j = 0 ; j < side ; j++){
            blocksMatrix[i][j] = -1;
        }
    }

    // Sort by height
    if(sorted)
        sortFile(file);

    // Fill matrix in height order
    blocksMatrix = fillMatrix(blocksMatrix, file, side);

    blocksMatrix = defineXZ(blocksMatrix, side, file);

    renderDistrict(blocksMatrix, side, scene, file);
}

function renderDistrict(blocksMatrix, side, scene, file){
    for(var i = 0 ; i < side ; i++){
        for(var j = 0 ; j < side ; j++){
            var block = blocksMatrix[i][j];
            if(block == -1)
                continue;
            var coordinates = block.coordinates;
            var size = block.size;
            var key = block.key;
            renderCube(coordinates, size, key, scene);
        }
    }

    renderFloor(file, scene);
}

function renderFloor(file, scene) {
    var geometry = new THREE.PlaneGeometry(file.floor.width , file.floor.height);
    var material = new THREE.MeshBasicMaterial( {color: pickColor("Floor"), side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );

    var x = file.floor.coordinates.x;
    var z = file.floor.coordinates.z;

    plane.rotation.x = Math.PI/2;
    plane.position.x = x + file.floor.width/2;
    plane.position.z = z + file.floor.height/2;
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

function defineXZ(blocksMatrix, side, file){
    file["floor"] = { "width":0, "height":0, "coordinates": {"x": 0, "y": 0, "z":0 } };

    var x = 1.5; var z = 1.5; var offset = 1.5; var maxZ = 0;

    file.floor.coordinates.x = 0;
    file.floor.coordinates.z = 0;

    var width = 0;
    var height = 0;

    for(var i = 0 ; i < side ; i++){
        for(var j = 0 ; j < side ; j++){
            var block = blocksMatrix[i][j];
            if(block == -1)
                continue;

            block["coordinates"] = {"x": 0, "y": 0, "z":0 };

            block.coordinates.x = x + block.size[0]/2;
            block.coordinates.z = z + block.size[2]/2;

            width = Math.max(width, block.coordinates.x + block.size[0]);
            height = Math.max(height, block.coordinates.z + block.size[2]);

            x += block.size[0] + offset;
            maxZ = Math.max(maxZ, block.size[2]);
        }
        z += maxZ + offset;
        maxZ = 0;
        x = 1.5;
    }

    file.floor.width = width;
    file.floor.height = height;

    return blocksMatrix;
}

function fillMatrix(matrix, data, side){
    var line = 0;
    var column = 0;

    for (var i = 0 ; i < data.length ; i++){
        matrix[line][column] = data[i];
        column++;
        if(column == side){
            column = 0;
            line++;
        }
    }

    return matrix;
}

function sortFile(file){
    return file.sort(compareBlocks);
}

function compareBlocks(a,b) {
    if(b.size[1] == a.size[1])
        return b.size[0] - a.size[0];
    return b.size[1] - a.size[1];
}
