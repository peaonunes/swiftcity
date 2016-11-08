/**
 * @author peaonunes / https://github.com/peaonunes
 */

function cityMaker(files, scene, sorted){
    var length = files.length;
    var dimension = getDimension(length);

    var cityMatrix = initMatrix(dimension);

    cityMatrix = fillMatrix(cityMatrix, files, dimension);

    // Define district position and inside layout.
    cityMatrix = defineCityLayout(cityMatrix, dimension, sorted);

    // Render the city.
    renderCity(cityMatrix, dimension, scene);
}

function defineCityLayout(cityMatrix, dimension, sorted){
    cityMatrix["floor"] = { "width":0, "height":0, "coordinates": {"x": 0, "y": 0, "z":0 } };

    var startX = 1.5; var startZ = 1.5; var offset = 1.5; var maxZ = 0;

    cityMatrix.floor.coordinates.x = 0;
    cityMatrix.floor.coordinates.z = 0;

    var width = 0;
    var height = 0;

    for (var i = 0 ; i < dimension ; i++){
        for (var j = 0 ; j < dimension ; j++){
            var distric = cityMatrix[i][j];
            if(distric == -1)
                continue;

            var districtMatrix = districtMaker(distric, sorted, startX, startZ, offset, maxZ);
            cityMatrix[i][j] = districtMatrix;

            width = Math.max(width, districtMatrix.blocks.floor.coordinates.x + districtMatrix.blocks.floor.width + offset);
            height = Math.max(height, districtMatrix.blocks.floor.coordinates.z + districtMatrix.blocks.floor.height + offset);
        }
    }

    cityMatrix.floor.width = width;
    cityMatrix.floor.height = height;

    return cityMatrix;
}

function sortDistricts(districts){
    return districts.sort(compareDistricts);
}

function compareDistricts(a,b) {
    if(b.blocks.floor.width == a.blocks.floor.width)
        return b.blocks.floor.height - a.blocks.floor.height;
    return b.blocks.floor.width - a.blocks.floor.width;
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

function defineXZ(blocksMatrix, dimension, file, x, z, offset, maxZ){
    blocksMatrix["floor"] = { "width":0, "height":0, "coordinates": {"x": 0, "y": 0, "z":0 } };

    blocksMatrix.floor.coordinates.x = x;
    blocksMatrix.floor.coordinates.z = z;

    var width = 0;
    var height = 0;

    for(var i = 0 ; i < dimension ; i++){
        for(var j = 0 ; j < dimension ; j++){
            var block = blocksMatrix[i][j];
            if(block == -1)
                continue;

            block["coordinates"] = {"x": x, "y": 0, "z":z };

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

    blocksMatrix.floor.width = width;
    blocksMatrix.floor.height = height;

    return blocksMatrix;
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
