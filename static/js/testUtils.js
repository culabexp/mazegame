const oldNew_choices = ['old', 'new'];
var hits = [];
var misses = [];
var selected_space =  null;
var moves = 0;

function onFinishSpatialTrial(data) {
  data['x'] = x;
  data['y'] = y;
  data['step'] = step;
  data['moves'] = moves;
  data['showing'] = scene[y][x];
  data['item'] = spatialTestList[step];
  onFinishTestTrial(data);
}

function onFinishTestTrial(data){
  const item = data['item'];
  if (item in encodeInfoStore){
    data['maze_rewarded'] = encodeInfoStore[item]['maze_rewarded'];
    data['maze_location_x'] = encodeInfoStore[item]['maze_location_x'];
    data['maze_location_y'] = encodeInfoStore[item]['maze_location_y'];
    data['maze_index'] = encodeInfoStore[item]['maze_index'];
    data['maze_step'] = encodeInfoStore[item]['maze_step'];
    data['maze_length'] = encodeInfoStore[item]['maze_length'];
  }
}

const confidenceChoices = ['guess',
                           'pretty certain',
                           'very certain',
                           'completely certain'];



function oldNew(img, index){
  var trial = {
    prompt: `<h2>${index+1}. Is this image old or new?</h2>`,
    data: { 'phase': 'test', 'trial_subtype': 'old_new', 'item': img }, 
    type: jsPsychImageButtonResponse,
    margin_horizontal:'20px',
    margin_vertical:'0px',
    stimulus: function(){return img},
    choices: ['old', 'new'],
    on_finish: function(data){
      onFinishTestTrial(data);
      data['response'] = oldNew_choices[data['response']];
      var itemIsOld = _.include(encodeItems, img);
      var itemIsNew = (!itemIsOld);
      if ((data['response'] == 'old')&(itemIsOld)){
        data['grade'] = 'hit';
        data['correct'] = 1;
        data['display_type'] = 'old';
        hits.push(img);
      } else if ((data['response'] == 'new')&(itemIsOld)){
        data['grade'] = 'miss';
        data['correct'] = 0;
        data['display_type'] = 'old';
        misses.push(img);
      } else if ((data['response'] == 'new') & (itemIsNew)) {
        data['grade'] = 'correct_reject';
        data['correct'] = 1;
        data['display_type'] = 'new';
      } else if ((data['response'] == 'old') & (itemIsNew)) {
        data['grade'] = 'false_alarm';
        data['correct'] = 0;
        data['display_type'] = 'new';
      }
    }
  };
  return trial;
}

function testItemNoChoices(img) {
  var trial = {
    type: jsPsychImageButtonResponse,
    margin_horizontal: '20px',
    margin_vertical: '0px',
    trial_duration: 1500, 
    data: { 'phase': 'test', 'trial_subtype': 'testItemNoChoices'}, 
    stimulus: function () { return img },
    choices: [],
  };
  return trial;
}

function confidence(img){
  var trial = {
		 prompt: "<h2>How confident are you in your previous answer?</h2>",
		type: jsPsychImageButtonResponse,
    data: { 'phase': 'test', 'trial_subtype': 'confidence', 'item': img }, 
    stimulus: function(){return img},
    choices: confidenceChoices,
    on_finish: function(data){
      onFinishTestTrial(data);
      data['response'] = confidenceChoices[data['response']];
    }
  };
  return trial;
}

const spatialTestPrompt = "<h4>Using the arrow keys, move the item to where you remember seeing it in the Maze Game. If you don't remember exactly where the item was, try to get it as close as possible. <br><br> Press the <b>spacebar</b> to finalize your answer</h4>"
function showSpatialTestItem() {
  return {
    type: jsPsychHtmlKeyboardResponse,
    data: { 'phase': 'test', 'trial_subtype': 'spatial_test' }, 
    response_ends_trial: true,
    on_finish: onFinishSpatialTrial,
    choices: function () {
      x = _.random(4);
      y = _.random(4);
      var choices = [' '];
      if (y != 0) { choices.push('arrowup') };
      if (y != 4) { choices.push('arrowdown') };
      if (x != 0) { choices.push('arrowleft') };
      if (x != 4) { choices.push('arrowright') };
      return choices;
    },
    stimulus: function () {
      var scene = getOriginalScene();
      scene[y][x] = spatialTestList[step];
      return spatialTestPrompt + sceneToHtml(scene);
    },
  }
}

function moveSpatialTestItem(){
  return {
    type: jsPsychHtmlKeyboardResponse,
    response_ends_trial: true,
    data: { 'phase': 'test', 'trial_subtype': 'spatial_test' },
    on_finish: onFinishSpatialTrial, 
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

      var choices = [ ' '];
      if (y != 0) { choices.push('arrowup') };
      if (y != 4) { choices.push('arrowdown') };
      if (x != 0) { choices.push('arrowleft') };
      if (x != 4) { choices.push('arrowright') };
      return choices;
    },
    stimulus: function () {
      var scene = getOriginalScene();
      var item = spatialTestList[step];
      moves += 1;
      scene[y][x] = item;
      return spatialTestPrompt + sceneToHtml(scene);
    },
  }
}

function moveSpatialTestItemLoop() {
  var loop_node = {
    timeline: [moveSpatialTestItem()],
    loop_function: function (data) {
      const res = data['trials'][0]['response'];
      if (res !=' ') {
        return true;
      } else {
        //  when the response is a space bar we move on to the next trial
        step += 1;
        moves = 0;
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
      {prompt: "<h2>Do you have any feedback for us?<br>Encounter any technical errors?</h2><br><br>",
       placeholder: "                        ", required: true, rows: 5,
       name: 'feedback',
     },

    ],
  };
  return trial;
}
