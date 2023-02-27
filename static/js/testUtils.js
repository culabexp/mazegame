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


function oldNew(img){
  var trial = {
		prompt: "<h2>Is this image old or new?</h2>",
    type: 'image-button-response',
    margin_horizontal:'20px',
    margin_vertical:'0px',
    stimulus: function(){return img},
    choices: ['old', 'new'],
    on_finish: function(data){
      const respIndex = data['response'];
      data['response'] = oldNew_choices[data['response']];
      itemIsOld = _.include(encodeItems, img)
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
		type: 'image-button-response',
    stimulus: function(){return img},
    choices: confidenceChoices,
    on_finish: function(data){
      const respIndex = data['response'];
      data['response'] = confidenceChoices[data['response']];
    }
  };
  return trial;
}



function move_image(selected_space, key_pressed, image){
  var currTime = jsPsych.totalTime();
  inKeyDown == true;
  var row1 = selected_space[0];
	var col1 = selected_space[1];
	var row2 = row1;
	var col2 = col1;

	if (key_pressed =='up'){
		var row2 = row1 - 1;
	} else if (key_pressed =='down'){
		var row2 = row1 + 1;
	} else if (key_pressed =='left'){
		var col2 = col1 - 1;
	} else if (key_pressed =='right'){
		var col2 = col1 + 1;
	} else if (key_pressed=='space'){
      $(document).unbind('keydown');
      jsPsych.finishTrial();
      recordSpatialTestMove(image, [row1, col1], key_pressed, currTime-time)
      return selected;
  }

	// if you try to move off the edge, do nothing
	if ((row2 < 0) || (row2 > 4) || (col2 < 0) || (col2 > 4)){
		return [row1, col1]
	} else {
		selected_space_id = `jspsych-vsl-grid-scene-table-cell-${selected_space[0]}-${selected[1]}`

		document.getElementById(selected_space_id).firstChild.src = "static/images/light_gray.png";

		selected_id_next = `jspsych-vsl-grid-scene-table-cell-${row2}-${col2}`
		document.getElementById(selected_id_next).firstChild.src = image;


		const item = image;
		const location = [row1, col1];
		const response = key_pressed;
		const rt = currTime-time;
		recordSpatialTestMove(item,
                   location,
                   response,
                   rt)

		return [row2, col2]
	}
}


function spatialTest(image){

  var mazeTrial = {
      type: 'vsl-grid-scene',
      stimuli: function(){
        scene = JSON.parse(JSON.stringify(scene_orig));
        return scene;
      },
      trial_duration: 150000000,
      on_load: function(){
        console.log('onload ')
        selected = [_.random(4), _.random(4)];
        inKeyDown = false;
        // start the first trial! selecting the first square
        row = selected[0]
        col = selected[1]
        selected_id_next = `jspsych-vsl-grid-scene-table-cell-${row}-${col}`
        document.getElementById(selected_id_next).firstChild.src = image;
      },
  		on_start: function(){
        time = jsPsych.totalTime();
        console.log('in onstart', selected)

  			$(document).keydown(function(e) {
              e.preventDefault();
              console.log(selected)
  						if (e.which == 38 && inKeyDown == false) { // up
  						selected =	move_image(selected, 'up', image);
  						}
  						if (e.which == 39 && inKeyDown == false){ // right
                selected = move_image(selected, 'right', image);
  						}
  						if (e.which == 37  && inKeyDown == false) {  // left
                selected = move_image(selected, 'left', image);
  						}
  						if (e.which == 40 && inKeyDown == false) {  // down
                selected = move_image(selected, 'down', image);
  						} if (e.key == " " || e.code == "Space" || e.keyCode == 32 ) {  // space
                selected = move_image(selected, 'space', image);
    					}
  			});


  		}
  };

  return mazeTrial;
};


function getFeedback(){
  var trial = {
    type: 'survey-text',
      questions: [
      {prompt: "<h2>Do you have any feedback for us? Encounter any technical errors?</h2><br><br>",
       placeholder: "                        ", required: true, rows: 5,
       name: 'feedback',
     },

    ],
  };
  return trial;
}
