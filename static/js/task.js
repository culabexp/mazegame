OSF_PROJECT_ID = "CF9IOlD9MkXj"
//  --- intialize maze items---
// randomize maze lengths
mazeLengths = _.shuffle(mazeLengths);
mazeItems = _.shuffle(mazeItems);
encodeItems = mazeItems.slice(0, 192);
mazeRewarded = _.shuffle(mazeRewarded);
breakLength = _.shuffle(breakLength);
wmDisplaySets = _.shuffle(wmDisplaySets);
var scene = getOriginalScene();


const jsPsych = initJsPsych();
const timeline = [];

const jspsychID = jsPsych.randomization.randomID(10);

// grab worker info
const url = window.location.href;
var queryString = url.split('?')[1]
const queryStringDict = parseQuery(queryString);

jsPsych.data.addProperties({
    // record the condition assignment in the jsPsych data
    condition: 0,
    // this adds a property called 'subject' to every trial
    subject: queryStringDict['workerId'],
    hit: queryStringDict['hitId'],
    assignment: queryStringDict['assignmentId'],
    session: 0,
    version: 0,
    expStartTime: jsPsych.getStartTime(),
});

// //  PRELOAD
// timeline.push(preload)
// // consent
// timeline.push(continueInstructions(`<br><br><br><h1>Please review the consent form and press continue to agree</h1><br><img src="static/images/consent1.png" width="425" height="550"><img src="static/images/consent2.png"  width="425" height="550"> <br><br>`))
// // demographics
// timeline.push(demographicsQuestions());

// PRACTICE
// runPractice(timeline)


// // ENCODING
// runEncoding(timeline)

//  BREAK
// participants watch a 5 min movie
// timeline.push(breakTrial);

//  TEST!!!
runTest(timeline)


// save data
const filename = `${jspsychID}.csv`;
const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: OSF_PROJECT_ID,
    filename: filename,
    data_string: () => jsPsych.data.get().csv()
};
timeline.push(save_data)
timeline.push(getFeedback());
timeline.push(continueInstructions('End of task - thanks for participating!'));
jsPsych.run(timeline);
