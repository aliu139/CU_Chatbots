// Increases in probability of a sentence/the readme
// ending with each additional word
var DELTA_WORD_SENTENCE = 0.00002;

function normalize(arr) {
    var runSum = 0;
    var sum = arr.reduce((a, b) => a + b, 0);
    for (var i = 0; i < arr.length; i++){
        arr[i] = (arr[i]/sum) + runSum;
        runSum += arr[i];
    }
    return arr;
    //return arr.map(val => val / sum);
}

// Probabilities
// Format is [noun, verb, adj, adv, interj, city, dem, art]
// PROBABILITIES.x is the array xProb
// var PROB_KEYS = ["noun", "verb", "adj", "adv", "interj", "city", "dem", "art"];
var PROB_KEYS = ["CC", "DT", "IN", "JJ", "JJR", "MD", "NN", "NNP", "NNS", "PRP", "RB", "RBR", "RP", "TO", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ", "WDT", "WRB"];

// function getNextWord(prev) returns a new word based on prev
// prev is a string from PROB_KEYS
function getNextPart(prev) {
    var prevIdx = PROB_KEYS.indexOf(prev);
    var rand = Math.random();
    var curr;
    curr = Object.keys(PROBABILITIES[prev]);
    var currVal = [];
    for(key in curr){
        if (PROBABILITIES[prev][curr[key]]){
            currVal.push(PROBABILITIES[prev][curr[key]]);
        } else {
            currVal.push(0);
        }
    }
    // console.log(curr);
    // console.log(currVal);

    currVal = normalize(currVal);

    for (let i = 0; i < currVal.length; i++) {
        if (rand < currVal[i]) {
            return curr[i];
        }
    }
    return curr[0];
}

function getWord(partOfSpeech) {
    var dict;
    dict = DICTIONARY[partOfSpeech];
    if (!dict){
        return "";
    }
    var randIdx = Math.floor(Math.random() * dict.length);
    return dict[randIdx];
}

function getNoun() {
    if (Math.random() < 0.3){
        return getWord("NN");
    }
    return getWord("NNS");
}


function generateSentence() {
    // Counts up how many words are in a
    // sentence.
    var sentenceWordCounter = 0;
    var currSentenceEndProb = 0;

    var randSentenceKey = Math.random();

    var prevPartOfSpeech = (Math.random() < 0.7) ? PROB_KEYS[6] : PROB_KEYS[8];
    var currSentence = getWord(prevPartOfSpeech);
    prevPartOfSpeech = getNextPart(prevPartOfSpeech);

    // Loop to generate sentence
    while (randSentenceKey > currSentenceEndProb) {
        currSentence = currSentence + ' ' + getWord(prevPartOfSpeech);
        prevPartOfSpeech = getNextPart(prevPartOfSpeech);
        currSentenceEndProb += DELTA_WORD_SENTENCE;
        sentenceWordCounter += 1;
        randSentenceKey = Math.random();
    }
    currSentence = currSentence[0].toUpperCase() + currSentence.substr(1, currSentence.length);
    if (sentenceWordCounter > 0 && sentenceWordCounter < 4 && Math.random() < 0.4){
        // With probability 0.4, make a short sentence into a clause
        currSentence = currSentence + ', ';
        isNewSentence = false;
    } else if (sentenceWordCounter > 0){
        currSentence = currSentence + ' ';
        isNewSentence = true;
    } else {
        currSentence = currSentence + ' ';
        isNewSentence = false;
    }

    return currSentence;

}

function generateReadme(titleVal, snippetLibrary){
    var idx = 1;
    var secProb = 0;
    var randSecKey = Math.random();
    var retVal = [];
    retVal[0] = {
        key: "Introduction",
        data: generateParagraph(titleVal)
    };
    while (randSecKey > secProb){
        secProb += DELTA_SECTION_README;
        randSecKey = Math.random();
        var newParagraph = generateParagraph(titleVal);
        let newEntry = {};
        newEntry.key = getWord("NN");
        newEntry.key = newEntry.key[0].toUpperCase() + newEntry.key.substr(1, newEntry.length);
        newEntry.data = newParagraph;
        retVal[idx++] = newEntry;


    }
    return retVal;
}

