const VERSION = 0.0

function runPractice(timeline) {
   timeline.push(mazeInstructions());
   timeline.push(continueInstructions(`<br><br><br><h1>Click continue to begin!</h1><br>`, resetMazeVars));
   timeline.push(practiceMaze(practiceItems1, rewarded = true));
   timeline.push(continueInstructions(`<br><br><br><h1>Nice, you found a gold coin, and won a dollar bonus!</h1><br>`));
   timeline.push(wmInstructions())
   timeline.push(wmPractice(wmPracticeSet))
   timeline.push(continueInstructions(`<br><br><br><h1>Now let's do a second practice maze!</h1><br>`, resetMazeVars));
   timeline.push(practiceMaze(practiceItems2, rewarded = false));
}

function runEncoding(timeline) {
   timeline.push(continueInstructions(`<br><br><br><h1> That's it for practice, now you will start the first maze! <br><br> Maze 1 / 22 <br><br> </h1>`, resetMazeVars));

   var itemsIndex = 0;
   _.each([0, 1, 2,
      // 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
   ], function (i) {
      var mazeLength = mazeLengths[i];
      var items = mazeItems.slice(itemsIndex, itemsIndex + mazeLength)
      itemsIndex += mazeLength;
      timeline.push(practiceMaze(items, rewarded = mazeRewarded[i]));
      itemsIndex += mazeLengths[i];
      timeline.push(blankScreen());
      timeline.push(wmTask(wmDisplaySets[i]))
      timeline.push(startMaze(`<br><br><br><h1> Now you will start the next maze! <br><br> Maze ${i + 2} / 22 <br><br> </h1>`, resetMazeVars));
   });
}


function runTest(timeline){
   var testInstruct = continueInstructions('<h2>Now you will do a memory test</h2>');
   var testInstruct = continueInstructions("<h2>We will show you an item. <br><br> If you remember seeing the item during the Maze Game, answer 'Old'.<br><br> If you don't remember seeing the item, press 'New'<br></h2>");

   timeline.push(testInstruct);

   // randomize item order again before old/new test
   mazeItems = _.shuffle(mazeItems);

   // PHASE 2 old/new test
   _.each(mazeItems.slice(0, 6), function (x, index) {
      timeline.push(oldNew(x, index))
      timeline.push(confidence(x))
   });

   // // randomize item order again before spatial test
   mazeItems = _.shuffle(mazeItems);

   // Phase 3—Surprise spatial location memory test:
   // We randomly selected 60 objects that were correctly identified as old objects during the Phase 2: recognition memory test.
   // If a participant did not have enough hit trials(in Experiment 1, this applied to two participants in the 24 - hour condition),
   //  the balance of trials was filled with miss trials, and these trials were removed from subsequent analyses.

   var spatialTestList = null;
   timeline.push(continueInstructions('<h2>Now you will do another type of memory test</h2>', kickOffSpatialTest))
   timeline.push(spatialTestItemLoop())
}

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

function parseQuery(queryString) {
   var query = {};
   var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
   for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
   }
   return query;
}

function resetMazeVars() {
   step = 0;
   seenSpaces = {};
   scene = getOriginalScene();
};

function kickOffSpatialTest() {
   step = 0;
   misses = _.shuffle(misses);
   hits = _.shuffle(hits);

   spatialTestList = hits.slice(0, 90);

   if (spatialTestList.length < 90) {
      const itemsNeeded = 90 - spatialTestList.length;
      const missedToAdd = misses.slice(0, itemsNeeded);
      spatialTestList = spatialTestList.concat(missedToAdd);
   }
   spatialTestList = _.shuffle(spatialTestList);
};

function startMaze(instructionsHTML, on_start) {
      return {
         type: jsPsychHtmlKeyboardResponse,
         trial_duration: 500,
         response_ends_trial: false,
         stimulus: instructionsHTML,
         on_start: on_start,
      }
}

function blankScreen() {
   return {
      type: jsPsychHtmlKeyboardResponse,
      trial_duration: 20,
      response_ends_trial: false,
      stimulus: '',
   }
}

function getFeedback() {
   var trial = {
      type: jsPsychSurveyText,
      questions: [
         {
            prompt: "<h2>Do you have any feedback for us? Encounter any technical errors?</h2><br><br>",
            placeholder: "                        ", required: true, rows: 5,
            name: 'feedback',
         },

      ],
   };
   return trial;
}

function demographicsQuestions() {
   var DemoQ1_options = ["Male", "Female", "Gender Non-conforming", "Other", "Choose not to respond"];
   var DemoQ3_options = ["Hispanic/Latino", "Not Hispanic/Latino", "Choose not to respond"];
   var DemoQ4_options = ["American Indian/Native American", "White", "Black/African American", "Asian", "Native Hawaiian or Pacific Islander", "Other", "Choose not to respond"];
   var DemoQ5_options = ["Less than a high school diploma", "High school degree or equivalent (e.g. GED)", "Some college, no degree", "Associate degree (e.g. AA, AS)", "College degree", "Master's degree (e.g. MA, MS, MEd)", "Doctorate or professional degree (e.g. MD, DDS, PhD)"];

   var all_that_apply = {
      type: jsPsychSurveyMultiSelect,
      questions: [
         {
            prompt: "How would you describe yourself? Please select all that apply.",
            options: DemoQ4_options,
            horizontal: false,
            required: true,
            name: 'DemoQ4'
         },]
   };
   var multi_choice_Demo = {
      type: jsPsychSurveyMultiChoice,
      button_label: 'Next',
      preamble: '<h2>Please answer some demographic questions</h2>',
      questions: [
         { prompt: "What is your gender?", name: 'DemoQ1', options: DemoQ1_options, required: true },
         // { prompt: "What is your age?", name: 'DemoQ2', options: DemoQ2_options, required: true },
         { prompt: "What is your Ethnicity?", name: 'DemoQ3', options: DemoQ3_options, required: true },
         { prompt: "What is the highest degree or level of school you have completed?", name: 'DemoQ5', options: DemoQ5_options, required: true },
      ],
   };

   var age = {
      type: jsPsychSurveyText,
      questions: [
         {prompt: "What is your age?", placeholder: "99", required: true, rows: 1,name: 'age',},
         {prompt: "What is your zipcode?", placeholder: "11111", required: true, rows: 1, name: 'zip', },

      ],
   };

   return { timeline: [multi_choice_Demo, age, all_that_apply] };
}


function getOriginalScene() {
  scene = JSON.parse(JSON.stringify(scene_orig));
  return scene;

}

function sceneToHtml(scene) {
  html = `
    <div id="jspsych-vsl-grid-scene-dummy" css="display: none;">
   <table id="jspsych-vsl-grid-scene table" style="border-collapse: collapse; margin-left: auto; margin-right: auto;">
      <tbody>
         <tr id="jspsych-vsl-grid-scene-table-row-0" css="height: 100px;">
            <td id="jspsych-vsl-grid-scene-table-0-0" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-0-0" style="width: 100px; height: 100px;"><img src=${scene[0][0]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-0-1" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-0-1" style="width: 100px; height: 100px;"><img src=${scene[0][1]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-0-2" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-0-2" style="width: 100px; height: 100px;"><img src=${scene[0][2]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-0-3" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-0-3" style="width: 100px; height: 100px;"><img src=${scene[0][3]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-0-4" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-0-4" style="width: 100px; height: 100px;"><img src=${scene[0][4]} style="width: 100px; height: 100"></div>
            </td>
         </tr>
         <tr id="jspsych-vsl-grid-scene-table-row-1" css="height: 100px;">
            <td id="jspsych-vsl-grid-scene-table-1-0" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-1-0" style="width: 100px; height: 100px;"><img src=${scene[1][0]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-1-1" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-1-1" style="width: 100px; height: 100px;"><img src=${scene[1][1]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-1-2" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-1-2" style="width: 100px; height: 100px;"><img src=${scene[1][2]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-1-3" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-1-3" style="width: 100px; height: 100px;"><img src=${scene[1][3]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-1-4" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-1-4" style="width: 100px; height: 100px;"><img src=${scene[1][4]} style="width: 100px; height: 100"></div>
            </td>
         </tr>
         <tr id="jspsych-vsl-grid-scene-table-row-2" css="height: 100px;">
            <td id="jspsych-vsl-grid-scene-table-2-0" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-2-0" style="width: 100px; height: 100px;"><img src=${scene[2][0]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-2-1" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-2-1" style="width: 100px; height: 100px;"><img src=${scene[2][1]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-2-2" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-2-2" style="width: 100px; height: 100px;"><img src=${scene[2][2]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-2-3" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-2-3" style="width: 100px; height: 100px;"><img src=${scene[2][3]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-2-4" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-2-4" style="width: 100px; height: 100px;"><img src=${scene[2][4]} style="width: 100px; height: 100"></div>
            </td>
         </tr>
         <tr id="jspsych-vsl-grid-scene-table-row-3" css="height: 100px;">
            <td id="jspsych-vsl-grid-scene-table-3-0" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-3-0" style="width: 100px; height: 100px;"><img src=${scene[3][0]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-3-1" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-3-1" style="width: 100px; height: 100px;"><img src=${scene[3][1]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-3-2" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-3-2" style="width: 100px; height: 100px;"><img src=${scene[3][2]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-3-3" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-3-3" style="width: 100px; height: 100px;"><img src=${scene[3][3]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-3-4" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-3-4" style="width: 100px; height: 100px;"><img src=${scene[3][4]} style="width: 100px; height: 100"></div>
            </td>
         </tr>
         <tr id="jspsych-vsl-grid-scene-table-row-4" css="height: 100px;">
            <td id="jspsych-vsl-grid-scene-table-4-0" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-4-0" style="width: 100px; height: 100px;"><img src=${scene[4][0]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-4-1" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-4-1" style="width: 100px; height: 100px;"><img src=${scene[4][1]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-4-2" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-4-2" style="width: 100px; height: 100px;"><img src=${scene[4][2]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-4-3" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-4-3" style="width: 100px; height: 100px;"><img src=${scene[4][3]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-4-4" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-4-4" style="width: 100px; height: 100px;"><img src=${scene[4][4]} style="width: 100px; height: 100"></div>
            </td>
         </tr>
      </tbody>
   </table>
</div>

    `
  return html;
};


function onFinish(data){
  dm.recordData(data);
}


function getProlificId(conditon){
  console.log('in prol id', conditon)
  var trial = {
   type: jsPsychSurveyText,
    on_finish: function(data) {
      const subjectId = data['response']['prolific_id'];
      const session = data['response']['session_number'];
      console.log('subjectId', subjectId)

      jsPsych.data.addProperties({
        // record the condition assignment in the jsPsych data
        condition: conditon,
        // this adds a property called 'subject' to every trial
        subject: subjectId,
        session: 0,

        version: VERSION,
         expStartTime: jsPsych.getStartTime(),
      });
    },
    questions: [
      {prompt: "<h2>What is your Prolific ID?</h2><br><br>",
       placeholder: "111111111111", required: true,
       name: 'prolific_id',
     },
    //  {prompt: "<h2>What the session number (1 or 2)?</h2><br><br>",
    //   placeholder: "1", required: true,
    //   name: 'session_number',
    // }

    ],
  };
  return trial;
}


var image_grid = [
  ["static/images/4063.jpg", "static/images/4067.jpg","static/images/4072.jpg",  "static/images/4077.jpg","static/images/4082.jpg"],
  ["static/images/4062.jpg", "static/images/4068.jpg","static/images/4073.jpg",  "static/images/4078.jpg","static/images/4083.jpg"],
  ["static/images/4064.jpg", "static/images/4069.jpg","static/images/4074.jpg",  "static/images/4079.jpg","static/images/4084.jpg"],
	["static/images/4065.jpg", "static/images/4070.jpg","static/images/4075.jpg",  "static/images/4080.jpg","static/images/4085.jpg"],
  ["static/images/4066.jpg", "static/images/4071.jpg","static/images/4076.jpg",  "static/images/4081.jpg","static/images/4086.jpg"]
]

var scene_orig = [
  ["static/images/light_gray.png", "static/images/light_gray.png","static/images/light_gray.png",  "static/images/light_gray.png","static/images/light_gray.png"],
  ["static/images/light_gray.png", "static/images/light_gray.png","static/images/light_gray.png",  "static/images/light_gray.png","static/images/light_gray.png"],
  ["static/images/light_gray.png", "static/images/light_gray.png","static/images/light_gray.png",  "static/images/light_gray.png","static/images/light_gray.png"],
	["static/images/light_gray.png", "static/images/light_gray.png","static/images/light_gray.png",  "static/images/light_gray.png","static/images/light_gray.png"],
  ["static/images/light_gray.png", "static/images/light_gray.png","static/images/light_gray.png",  "static/images/light_gray.png","static/images/light_gray.png"]
]


function continueInstructions(instructionsHTML, on_start=null){
  var trial = {
     on_start: on_start,
    type:jsPsychHtmlButtonResponse,
    stimulus: instructionsHTML,
    choices: ['Continue']
  };
  return trial;
}
