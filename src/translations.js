let allTranslations = ["fake", "fakey", "fakeyest"];

function getComponentTranslation(type, onLoad) {
    let req = new XMLHttpRequest();
    req.responseType = "json";
    req.onload = function() {
        onLoad(this.response);
    }
    req.open("GET", `/translation/${type}`);
    req.send();
}

/*
function searchForType(type) {
    for (let translation of allTranslations) {
        if (translation.type === type) {
            return translation;
        }
    }
}


function findComponentTranslation(type) {
    let foundDocument;
    if (!allTranslations) {
        getAllTransactions(function() {
            foundDocument = searchForType(type);
        })
    } else {
        foundDocument = searchForType(type);
    }
    return foundDocument;
}
*/

exports.getComponentTranslation = getComponentTranslation;
