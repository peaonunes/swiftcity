/**
 * @author peaonunes / https://github.com/peaonunes
 */
let blockId = 0;

function runCity(files){
    renderSceneProperties();
    let city = cityMaker(files);
    var cameraX = city.floor.width;
    renderCamareProperties(cameraX, 50, 150);
}

function cityMaker(files){
    var length = files.length;
    var dimension = getDimension(length);

    var cityMatrix = initMatrix(dimension);
    var filesArray = files.map(element => element.elements);
    cityMatrix = fillMatrix(cityMatrix, filesArray, dimension);

    // Define district position and inside layout.
    cityMatrix = _defineCityLayout(cityMatrix, dimension);

    // Render the city.
    renderCity(cityMatrix, dimension);

    return cityMatrix;
}

function _defineCityLayout(cityMatrix, dimension) {
    var sorted = appConfiguration.filters.indexOf("sort") > -1 ? true : false;
    console.log(sorted);
    return defineCityLayout(cityMatrix, dimension, sorted);
}

function defineCityLayout(cityMatrix, dimension, sorted){
    cityMatrix["floor"] = { "width":0, "height":0, "coordinates": {"x": 0, "y": 0, "z":0 } };

    var startX = 1.5; var startZ = 1.5;
    var offset = 1.5; var maxZ = 0;
    var originalX = startX;
    var width = 0; var height = 0;
    var distric;

    cityMatrix.floor.coordinates.x = 0;
    cityMatrix.floor.coordinates.z = 0;

    for (var i = 0 ; i < dimension ; i++){
        for (var j = 0 ; j < dimension ; j++){
            distric = cityMatrix[i][j];
            if(distric == -1)
                continue;

            var districtMatrix = districtMaker(distric, sorted, startX, startZ, offset);
            cityMatrix[i][j] = districtMatrix;

            width = Math.max(width, districtMatrix.blocks.floor.coordinates.x + districtMatrix.blocks.floor.width + offset);
            height = Math.max(height, districtMatrix.blocks.floor.coordinates.z + districtMatrix.blocks.floor.height + offset);

            startX += districtMatrix.blocks.floor.width + offset;
            maxZ = Math.max(maxZ, districtMatrix.blocks.floor.height);
        }
        alignDistrictFloor(cityMatrix, maxZ, i, dimension);
        startZ += maxZ + offset;
        maxZ = 0;
        startX = originalX;
    }

    cityMatrix.floor.width = width;
    cityMatrix.floor.height = height;

    return cityMatrix;
}

function alignDistrictFloor(cityMatrix, maxZ, i, dimension){
    var distric;
    for (var j = 0 ; j < dimension ; j++){
        distric = cityMatrix[i][j];
        if (distric == -1)
            continue;
        distric.blocks.floor.height = maxZ;
    }
}

function districtMaker(file, sorted, x, z, offset, maxZ){
    var length = file.length;
    var dimension = getDimension(length);

    var blocksMatrix = initMatrix(dimension);

    // Sort by height
    if(sorted)
        sortBlocks(file);

    // Fill matrix in height order
    blocksMatrix = fillMatrix(blocksMatrix, file, dimension);

    blocksMatrix = defineXZ(blocksMatrix, dimension, file, x, z, offset, maxZ);

    var district = {
        "blocks" : blocksMatrix,
        "dimension" : dimension,
        "file" : file
    }

    return district;
}

function defineXZ(blocksMatrix, dimension, file, x, z, offset){
    blocksMatrix["floor"] = { "width":0, "height":0, "coordinates": {"x": 0, "y": 0, "z":0 } };

    var startX = x; var startZ = z;
    var width = 0; var height = 0;
    var maxZ = 0;

    blocksMatrix.floor.coordinates.x = x;
    blocksMatrix.floor.coordinates.z = z;

    var block;
    for(var i = 0 ; i < dimension ; i++){
        for(var j = 0 ; j < dimension ; j++){
            block = blocksMatrix[i][j];
            if(block == -1)
                continue;

            block["coordinates"] = {"x": 0, "y": 0, "z":0 };
            block["id"] = getBlockId();
            block.coordinates.x = x + offset + block.size[0]/2;
            block.coordinates.z = z + offset + block.size[2]/2;

            x += block.size[0] + offset;
            maxZ = Math.max(maxZ, block.size[2]);

            width = Math.max(width, (block.coordinates.x + block.size[0]) - startX);
            height = Math.max(height, (block.coordinates.z + block.size[2]) - startZ);
        }
        z += maxZ + offset;
        maxZ = 0;
        x = startX;
    }

    blocksMatrix.floor.width = width;
    blocksMatrix.floor.height = height;

    return blocksMatrix;
}

function getBlockId() {
    blockId += 1;
    return blockId;
}

function getDimension(length){
    return Math.ceil(Math.sqrt(length));
}

function initMatrix(dimension){
    var matrix = [];
    for (var i = 0 ; i < dimension ; i++){
        matrix[i] = [];
        for (var j = 0 ; j < dimension ; j++){
            matrix[i][j] = -1;
        }
    }
    return matrix;
}

function fillMatrix(matrix, data, dimension){
    var line = 0;
    var column = 0;

    for (var i = 0 ; i < data.length ; i++){
        matrix[line][column] = data[i];
        column++;
        if(column == dimension){
            column = 0;
            line++;
        }
    }

    return matrix;
}

function sortBlocks(file){
    return file.sort(compareBlocks);
}

function compareBlocks(a,b) {
    if(b.size[1] == a.size[1])
        return b.size[0] - a.size[0];
    return b.size[1] - a.size[1];
}
