OSF_PROJECT_ID = "CF9IOlD9MkXj";

const jsPsych = initJsPsych();
const timeline = [];

//  --- intialize items, randomizing them---
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
const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: OSF_PROJECT_ID,
    filename: filename,
    data_string: () => jsPsych.data.get().csv()
};

// grab worker info

getWorkerInfo()

// //  PRELOAD
timeline.push(preload)
// // consent
// timeline.push(continueInstructions(`<br><br><br><h1>Please review the consent form and press continue to agree</h1><br><img src="static/images/consent1.png" width="425" height="550"><img src="static/images/consent2.png"  width="425" height="550"> <br><br>`))
// // demographics
timeline.push(demographicsQuestions());

// PRACTICE
// runPractice(timeline)

// // ENCODING
// runEncoding(timeline)

//  BREAK
// participants watch a 5 min movie
// timeline.push(breakTrial);

//  TEST
// runTest(timeline)


// save data
timeline.push(save_data)
timeline.push(getFeedback());
timeline.push(continueInstructions('End of task - thanks for participating!'));
jsPsych.run(timeline);
