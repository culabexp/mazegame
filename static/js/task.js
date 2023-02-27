const condition = 0;
function resetMazeVars() {
    step = 0;
    seenSpaces = {};
};

function kickOffSpatialTest() {
    step = 0;
    misses = _.shuffle(misses);
    hits = _.shuffle(hits);
    spatialTestList = hits.slice(0, 90);
    if (spatialTestList.length < 90) {
        const itemsNeeded = 90 - spatialTestList.length;
        spatialTestList += misses.slice(0, itemsNeeded);
    }
    spatialTestList = _.shuffle(spatialTestList);
};

// items we need
const mazeEndItems = ["static/images/23.jpg", "static/images/mazeover.jpg"];

practiceItems1 = ['static/images/40.jpg',
                  'static/images/41.jpg',
                  'static/images/42.jpg',
                 'static/images/43.jpg',
                 'static/images/44.jpg',]
practiceItems2 = ['static/images/45.jpg',
                  'static/images/46.jpg',
                  'static/images/47.jpg',]

var colors = ['static/images/light_gray.png',
              'static/images/selected.png',
              'static/images/red.jpg',
              'static/images/blue.jpg',
              'static/images/green.jpg',
              'static/images/purple.jpg',
              'static/images/orange.jpg',
              'static/images/yellow.jpg',];

const jsPsych = initJsPsych();
const timeline = [];

var preload = {
    type: jsPsychPreload,
    images: practiceItems1.concat(mazeItems).concat(mazeEndItems).concat(practiceItems2).concat(colors),
}

//  PRELOAD
timeline.push(preload)

// randomize maze lengths
mazeLengths = _.shuffle(mazeLengths);

// randomize item order
mazeItems = _.shuffle(mazeItems);
encodeItems = mazeItems.slice(0, 192);


// randomize which mazes are rewarded
mazeRewarded = _.shuffle(mazeRewarded);

// timeline.push(continueInstructions(`<br><br><br><h1>Please review the consent form and prese continue to agree</h1><br><img src="static/images/consent1.png" width="425" height="550"><img src="static/images/consent2.png"  width="425" height="550"> <br><br>`))

// // TESTING WM
// timeline.push(wmInstructions())
// timeline.push(wmPractice(wmPracticeSet))
// //TESTING WM

// // ENCODING
// timeline.push(getProlificId(condition));
// var scene = getOriginalScene();

// // practice!!!!
// timeline.push(mazeInstructions());
// timeline.push(continueInstructions(`<br><br><br><h1>Click continue to begin!</h1><br>`, resetMazeVars));
// timeline.push(practiceMaze(practiceItems1, rewarded=true));
// timeline.push(continueInstructions(`<br><br><br><h1>Nice, you found a gold coin, and won a dollar bonus!</h1><br>`));
// timeline.push(continueInstructions(`<br><br><br><h1>Now let's do a second practice maze!</h1><br>`, resetMazeVars));
// timeline.push(practiceMaze(practiceItems2, rewarded=false));
// timeline.push(continueInstructions(`<br><br><br><h1> In between each task, you will play a memory game <br><br> Maze 1 / 22 <br><br> </h1>`, resetMazeVars));

// timeline.push(continueInstructions(`<br><br><br><h1> That's it for practice, now you will start the first maze! <br><br> Maze 1 / 22 <br><br> </h1>`, resetMazeVars));

// breakLength = _.shuffle(breakLength);
// wmDisplaySets = _.shuffle(wmDisplaySets);
// var itemsIndex = 0;
// _.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], function (i) {
//     // timeline.push(runMaze(i, itemsIndex));
//     var mazeLength = mazeLengths[i];
//     var items = mazeItems.slice(itemsIndex, itemsIndex + mazeLength)
//     console.log(items)
//     itemsIndex += mazeLength;
//     timeline.push(practiceMaze(items, rewarded = mazeRewarded[i]));
//     itemsIndex += mazeLengths[i];
//     // timeline.push(wmTask(wmDisplaySets[i]))
//     timeline.push(continueInstructions(`<br><br><br><h1> Now you will start the next maze! <br><br> Maze ${i + 2} / 22 <br><br> </h1>`, resetMazeVars));
// });

//  BREAK
// participants watch a 5 min movie
var breakTrial = {
    type: jsPsychVideoKeyboardResponse,
    stimulus: ['https://d3uxkvynwb06gu.cloudfront.net/movieIS_5min.mp4'],
    autoplay: true,
    choices: [' '],
    on_load: function () {
        var video = $('#jspsych-video-keyboard-response-stimulus');
        video.muted = true;
    },
    trial_ends_after_video: true
};
// timeline.push(breakTrial);

var testInstruct = continueInstructions('<h2>Now you will do a memory test</h2>');
timeline.push(testInstruct);

// randomize item order again before old/new test
mazeItems = _.shuffle(mazeItems);

// PHASE 2 old/new test
_.each(mazeItems.slice(0,6), function (x, index) {
    timeline.push(oldNew(x, index))
    timeline.push(confidence(x))
});

// // randomize item order again before spatial test
mazeItems = _.shuffle(mazeItems);

// Phase 3—Surprise spatial location memory test:
// We randomly selected 60 objects that were correctly identified as old objects during the Phase 2: recognition memory test.
// If a participant did not have enough hit trials(in Experiment 1, this applied to two participants in the 24 - hour condition),
//  the balance of trials was filled with miss trials, and these trials were removed from subsequent analyses.
// misses = _.shuffle(misses);
// hits = _.shuffle(hits);
// console.log('misses', misses)
// console.log('hits', hits)

// var spatialTestList = hits.slice(0, 90);
// if (spatialTestList.length < 90) {
//     const itemsNeeded = 90 - spatialTestList.length;
//     spatialTestList += misses.slice(0, itemsNeeded);
// }
// console.log('spatialTestList', spatialTestList)

// spatialTestList = _.shuffle(spatialTestList);
var spatialTestList = null;
timeline.push(continueInstructions('<h2>Now you will do a spatial memory test</h2>', kickOffSpatialTest))

console.log('spatialTestItemLoop', spatialTestItemLoop)
timeline.push(spatialTestItemLoop())

// // spatial test
// _.each(spatialTestList, function (x) {
//     console
//     timeline.push(runSpatialTest(x))
//     // timeline.push(spatialTest(x))
// });



// timeline.push(getFeedback());
timeline.push(continueInstructions('End of task - thanks for participating!'));


const subject_id = jsPsych.randomization.randomID(10);
const filename = `${subject_id}.csv`;
const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "CF9IOlD9MkXj",
    filename: filename,
    data_string: () => jsPsych.data.get().csv()
};

timeline.push(save_data)

console.log('timeline', timeline)
jsPsych.run(timeline);
