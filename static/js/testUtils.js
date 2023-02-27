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

function showSpatialTestItem() {
  return {
    type: jsPsychHtmlKeyboardResponse,
    // trial_duration: 2500,
    response_ends_trial: true,
    on_load: function(){
      console.log('fuuuuck');
    },
    // data: { scene: scene, x: x, y: y, step: step },
    // save_trial_parameters: { trial_duration: true },
    stimulus: function () {
      console.log('in stim???', spatialTestList)
      var scene = getOriginalScene();
      console.log('spatialTestList[0', spatialTestList[0])
      x = _.random(4);
      y = _.random(4);
      scene[y][x] = spatialTestList[step];
    

      return sceneToHtml(scene);
    },
  }
}

function moveSpatialTestItem(){
  return {
    type: jsPsychHtmlKeyboardResponse,
    response_ends_trial: true,
    choices: function () {
      var prev_data = jsPsych.data.get().last(1).values()[0];
      var move = prev_data['response'];
      if (move == 'arrowup') {
        y = y - 1;
      } else if (move == 'arrowdown') {
        y = y + 1;
      } else if (move == 'arrowleft') {
        x = x - 1;
      } else if (move == 'arrowright') {
        x = x + 1;
      }
      console.log('\ny', y)
      console.log('x', y)
      var choices = ['space', 'spacebar', ' '];
      if (y != 0) { choices.push('arrowup') };
      if (y != 4) { choices.push('arrowdown') };
      if (x != 0) { choices.push('arrowleft') };
      if (x != 4) { choices.push('arrowright') };
      console.log('choices', choices)
      return choices;
    },
    stimulus: function () {
      // var prev_data = jsPsych.data.get().last(1).values()[0];
      // var move = prev_data['response'];
      // if (move == 'arrowup') {
      //   y = y - 1;
      // } else if (move == 'arrowdown') {
      //   y = y + 1;
      // } else if (move == 'arrowleft') {
      //   x = x - 1;
      // } else if (move == 'arrowright') {
      //   x = x + 1;
      // }
      var scene = getOriginalScene();
      // step = step + 1;
      var item = spatialTestList[step];
      scene[y][x] = item;
      return sceneToHtml(scene);
    },
  }
}

function moveSpatialTestItemLoop() {
  var loop_node = {
    timeline: [moveSpatialTestItem()],
    loop_function: function (data) {
      // console.log('in loop data resp', data)
      console.log('trials 0 response', data['trials'].length, 'wtf is the response', data['trials'][0]['response'], 'ss')
      const res = data['trials'][0]['response'];
      if (res !=' ') {
        return true;
      } else {
        console.log('should be increasing step???')
        step+=1;
        return false;
      }
    }
  }
  return loop_node;
}

function spatialTestItemLoop() {
  var loop_node = {
    timeline: [showSpatialTestItem(), moveSpatialTestItemLoop()],
      loop_function: function () {
        if (step < spatialTestList.length) {
          console.log('show another item')
          return true;
        } else {
          console.log('end o flist dont, show another item')
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