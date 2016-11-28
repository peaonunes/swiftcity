/**
 * @author peaonunes / https://github.com/peaonunes
 */

function filterClicked(object) {
    var value = object.value;
    var type = radios.indexOf(value);
    changeFiltersState(value, type);
    appConfiguration.filterChanged = value;
    updateWithFile();
}

let radios = ["linear", "log15", "sqrt", "boxplot"];

function changeFiltersState(value, type) {
    var filters = appConfiguration.filters;

    if(type < 0){
        var index = listContains(filters, value);

        if(index > -1)
            filters = removeFromLits(filters, value);
        else
            filters.push(value);
    } else {
        var radio;
        var index;
        for (var i = 0; i < radios.length; i++) {
            radio = radios[i];
            index = filters.indexOf(radio);
            if(index > -1)
                filters[index] = value;
        }
    }

    appConfiguration.filters = filters;
}

function listContains(array, element) {
    var index = array.indexOf(element);
    return index;
}

function removeFromLits(array, element) {
    var current;
    var newList = [];
    for (var i = 0; i < array.length; i++) {
        current = array[i];
        if(current == element)
            continue;
        newList.push(current);
    }
    return newList;
}
