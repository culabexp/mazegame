const jsPsych = initJsPsych();
const timeline = [];

//  INIT MAZE VARS
mazeLengths = _.shuffle(mazeLengths);
mazeItems = _.shuffle(mazeItems);
encodeItems = mazeItems.slice(0, 192);
mazeRewarded = _.shuffle(mazeRewarded);
breakLength = _.shuffle(breakLength);
wmDisplaySets = _.shuffle(wmDisplaySets);
var scene = getOriginalScene();

const jspsychID = jsPsych.randomization.randomID(10);
const date = new Date().toISOString()
const filename = `${jspsychID}_${date}.csv`;

// grab worker info
getWorkerInfo()

// // PRELOAD, consent, demographics
timeline.push(preload)
timeline.push(continueInstructions(`<br><br><br><h1>Please review the consent form and press continue to agree</h1><br><img src="static/images/consent1.png" width="425" height="550"><img src="static/images/consent2.png"  width="425" height="550"> <br><br>`))
timeline.push(demographicsQuestions());

// // PRACTICE
runPractice(timeline)

// // ENCODING
runEncoding(timeline)

// //  BREAK
timeline.push(breakTrial);

//  TEST
runTest(timeline)

// SAVE DATA, END
timeline.push(saveData(filename))
timeline.push(getFeedback());
timeline.push(continueInstructions('End of task - thanks for participating!'));

jsPsych.run(timeline);
