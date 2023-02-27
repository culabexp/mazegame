const oldNew_choices = ['old', 'new'];
var hits = [];
var misses = [];
var selected_space =  null;

const confidenceChoices = ['guess',
                           'pretty certain',
                           'very certain',
                           'completely certain'];

function recordSpatialTestMove(item, location, response, rt){
 const last_trial =  jsPsych.data.getLastTrialData().values()[0];
 onFinish({
   phase: 'spatial_test',
   trial_type: 'move',
		subject: last_trial['subject'],
		condition: last_trial['condition'],
		stimulus: item,
   location: location,
   response: response,
		time_elapsed: jsPsych.totalTime(),
		expStartTime: jsPsych.startTime(),
    rt: rt,
   trial_index: trial_index,
	});
}


function oldNew(img, index){
  var trial = {
    prompt: `<h2>${index+1}. Is this image old or new?</h2>`,
    type: jsPsychImageButtonResponse,
    margin_horizontal:'20px',
    margin_vertical:'0px',
    stimulus: function(){return img},
    choices: ['old', 'new'],
    on_finish: function(data){
      const respIndex = data['response'];
      // console.log("data['response']", data['response']);
      data['response'] = oldNew_choices[data['response']];
      var itemIsOld = _.include(encodeItems, img)
      console.log('itemIsOld', itemIsOld)
      if ((data['response'] == 'old')&(itemIsOld)){
        data['grade'] = 'hit';
        hits.push(img);
      }
      else if ((data['response'] == 'new')&(itemIsOld)){
        data['grade'] = 'miss';
        misses.push(img);
      }
    }
  };
  return trial;
}

function confidence(img){
  var trial = {
		 prompt: "<h2>How confident are you?</h2>",
		type: jsPsychImageButtonResponse,
    stimulus: function(){return img},
    choices: confidenceChoices,
    on_finish: function(data){
      const respIndex = data['response'];
      data['response'] = confidenceChoices[data['response']];
    }
  };
  return trial;
}

function spatialTestItem() {
  return {
    type: jsPsychHtmlKeyboardResponse,
    trial_duration: 2500,
    response_ends_trial: false,
    on_load: function(){
      console.log('fuuuuck');
    },
    // data: { scene: scene, x: x, y: y, step: step },
    // save_trial_parameters: { trial_duration: true },
    stimulus: function () {
      console.log('in stim???', spatialTestList)
      var scene = getOriginalScene();
      console.log('spatialTestList[0', spatialTestList[0])
      scene[0][0] = spatialTestList[0];
      return sceneToHtml(scene);
    },
  }
}

function spatialTestItemLoop() {
  var loop_node = {
      timeline: [spatialTestItem()],
      on_start: function(){
        console.log('fuckFUCK spatialTestItemLoop')
      },
      loop_function: function () {
        console.log('in loop', 'step', step, 'items.length', spatialTestList.length, 'spatialTestList', spatialTestList)
        if (step < spatialTestList.length) {
          return true;
        } else {
          return false;
        }
      }
    }
  return loop_node;
}

function runSpatialTest() {
  var trials = {
    timeline: [
      spatialTestItemLoop(),
    ]
  }
  return trials;
}

function getFeedback(){
  var trial = {
    type: jsPsychSurveyText,
      questions: [
      {prompt: "<h2>Do you have any feedback for us? Encounter any technical errors?</h2><br><br>",
       placeholder: "                        ", required: true, rows: 5,
       name: 'feedback',
     },

    ],
  };
  return trial;
}
