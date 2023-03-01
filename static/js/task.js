const debug = true;
const jsPsych = initJsPsych();
const timeline = [];
var completionCode = null;
const url = window.location.href;

//  INIT MAZE VARS
mazeLengths = _.shuffle(mazeLengths);
mazeItems = _.shuffle(mazeItems);
encodeItems = mazeItems.slice(0, 192);
mazeRewarded = _.shuffle(mazeRewarded);
wmDisplaySets = _.shuffle(wmDisplaySets);
var scene = getOriginalScene();

//  INIT MAZE VARS for debug testing
if (debug){
    mazeIndices = mazeIndices.slice(0, 2)
    mazeLengths[0] = 2;
    mazeLengths[1] = 3;
    const numEnocdeItems = mazeLengths[0] + mazeLengths[1]
    encodeItems = mazeItems.slice(0, numEnocdeItems);
    mazeItems = mazeItems.slice(0, numEnocdeItems+10);
    
    encodeItems = _.shuffle(encodeItems);
    mazeItems = _.shuffle(mazeItems);
}
console.log('encode items', encodeItems);
var jspsychID = jsPsych.randomization.randomID(10);
if (!_.include(url, 'culabexp')) {
    jspsychID = 'local_' + jspsychID;
}
const date = new Date().toISOString()
const filename = `${jspsychID}_${date}.csv`;



// grab worker info
getWorkerInfo()

// // PRELOAD, consent, demographics
timeline.push(preload)
if (!debug) {
    timeline.push(continueInstructions(`<br><br><br><h1>Please review the consent form and press continue to agree</h1><br><img src="static/images/consent1.png" width="425" height="550"><img src="static/images/consent2.png"  width="425" height="550"> <br><br>`))
    timeline.push(demographicsQuestions());
}

// // // PRACTICE
if (!debug) {
    runPractice(timeline)
}

// // // ENCODING
runEncoding(timeline)

// INTERMEDIATE SAVE 
timeline.push(saveData('encode_'+filename))

// // //  BREAK
if (!debug) {
    timeline.push(breakTrial);
}

// //  TEST
runTest(timeline)

// SAVE DATA, END
timeline.push(getFeedback());
timeline.push(saveData(filename));
timeline.push(endTask());
jsPsych.run(timeline);
