function districtMaker(file, scene){
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
    sortedBlocks = sortFile(file);

    // Fill matrix in height order
    blocksMatrix = fillMatrix(blocksMatrix, file, side);
    console.log("matrix", blocksMatrix);

    blocksMatrix = defineXZ(blocksMatrix, side);
    console.log("offset matrix", blocksMatrix);

    renderDistrict(blocksMatrix, side, scene)
}

function renderDistrict(blocksMatrix, side, scene){
    for(var i = 0 ; i < side ; i++){
        for(var j = 0 ; j < side ; j++){
            var block = blocksMatrix[i][j];
            if(block == -1)
                return;
            var coordinates = block.coordinates;
            var size = block.size;
            var key = block.key;
            renderCube(coordinates, size, key, scene);
        }
    }
}

function renderCube(coordinates, size, key, scene){
    var geometry = new THREE.BoxGeometry( size[0], size[1], size[2]);
    var material = new THREE.MeshBasicMaterial( { color: pickColor(key) } );
    var newCube = new THREE.Mesh( geometry, material );

    newCube.position.x = coordinates.x + coordinates.x/2;
    newCube.position.y = size[1]/2;
    newCube.position.z = coordinates.z + coordinates.z/2;
    scene.add(newCube);
}

function defineXZ(blocksMatrix, side){
    var x = 1; var z = 1; var offset = 1; var maxZ = 0;

    for(var i = 0 ; i < side ; i++){
        for(var j = 0 ; j < side ; j++){
            var block = blocksMatrix[i][j];
            if(block == -1)
                return blocksMatrix;

            block["coordinates"] = {"x": 0, "y": 0, "z":0 };

            block.coordinates.x = x;
            block.coordinates.z = z;

            x += block.size[0] + offset;
            maxZ = Math.max(maxZ, block.size[2]);
        }
        z += maxZ + offset;
        maxZ = 0;
        x = 1;
    }

    return blocksMatrix;
}

function fillMatrix(blocksMatrix, file, side){
    var line = 0;
    var column = 0;

    for (var i = 0 ; i < file.length ; i++){
        blocksMatrix[line][column] = file[i];
        column++;
        if(column == side){
            column = 0;
            line++;
        }
    }

    return blocksMatrix;
}

function sortFile(file){
    return file.sort(compareBlocks);
}

function compareBlocks(a,b) {
    if(b.size[1] == a.size[1])
        return b.size[0] - a.size[0];
    return b.size[1] - a.size[1];
}
