const debug = false;
const jsPsych = initJsPsych();
const timeline = [];

//  INIT MAZE VARS
mazeLengths = _.shuffle(mazeLengths);
mazeItems = _.shuffle(mazeItems);
encodeItems = mazeItems.slice(0, 192);
mazeRewarded = _.shuffle(mazeRewarded);
wmDisplaySets = _.shuffle(wmDisplaySets);
var scene = getOriginalScene();

if (debug){
    mazeIndices = mazeIndices.slice(0, 2)
    mazeItems = mazeItems.slice(0, 12)
}

const jspsychID = jsPsych.randomization.randomID(10);
const completionCode = jsPsych.randomization.randomID(10);
const date = new Date().toISOString()
const filename = `${jspsychID}_${date}.csv`;
const encode_filename = `encode_${jspsychID}_${date}.csv`;


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
timeline.push(saveData(encode_filename))

// // //  BREAK
timeline.push(breakTrial);

// //  TEST
runTest(timeline)

// SAVE DATA, END
timeline.push(getFeedback());
timeline.push(saveData(filename))
timeline.push(continueInstructions(`End of task - thanks for participating!<br><br> The completion code is: ${completionCode}<br><br>`));
jsPsych.run(timeline);
