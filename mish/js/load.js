function loadJSON(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}

function waitForLoad(path) {
    return new Promise(function (resolve, reject) {
        loadJSON(path, function (response) {
            resolve(JSON.parse(response));
        });
    });
}

function waitFor(path) {
    return new Promise(function (resolve, reject) {
        loadJSON(path, function (response) {
            resolve(_.uniq(response.split('\n')));
        });
    });
}

load_arr = [];

var PROB_KEYS_AUGMENTED = ["CC", "DT", "IN", "JJ", "JJR", "MD", "NN", "NNP", "NNS", "PRP", "RB", "RBR", "RP", "TO", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ", "WDT", "WRB"];
for(key in PROB_KEYS_AUGMENTED){
    load_arr.push(waitFor("dict/" + PROB_KEYS_AUGMENTED[key] + ".txt"));
}

load_arr.push(waitForLoad("dict/probability.data"))
