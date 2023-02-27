var time = null;
var trial_index = 0;
var selected = null;
var steps=0;
// var scene  = null;
var currMazeLength = null;
var rewarded = null;
var images  = null;
var movedOnTime = null;

function recordMazeMove(item, location, response, rt){
  const last_trial =  jsPsych.data.getLastTrialData().values()[0];
  onFinish({
    phase: 'encode',
    trial_type: 'move',
		subject: last_trial['subject'],
		condition: last_trial['condition'],
		stimulus: item,
    location: location,
    response: response,
    rt: rt,
    rewarded: rewarded,
		time_elapsed: jsPsych.totalTime(),
		expStartTime: jsPsych.startTime(),
    trial_index: trial_index,
	});
}

function recordImageOnset(item, location, response){
  trial_index += 1;
  const last_trial =  jsPsych.data.getLastTrialData().values()[0];
  onFinish({
    phase: 'encode',
    trial_type: 'image_onset',
		subject: last_trial['subject'],
		condition: last_trial['condition'],
		stimulus: item,
    location: location,
    response: response,
    rt: null,
    rewarded: rewarded,
		time_elapsed: jsPsych.totalTime(),
		expStartTime: jsPsych.startTime(),
    trial_index: trial_index,
	});
}

function recordImageOffset(item, location, response){
  const last_trial =  jsPsych.data.getLastTrialData().values()[0];
  onFinish({
    phase: 'encode',
    trial_type: 'image_offset',
		subject: last_trial['subject'],
		condition: last_trial['condition'],
		stimulus: item,
    location: location,
    response: response,
    rt: null,
    rewarded: rewarded,
		time_elapsed: jsPsych.totalTime(),
		expStartTime: jsPsych.startTime(),
    trial_index: trial_index,
	});
}

function startNextTrial(row, col, stepsNow){
  console.log('stepsNow', stepsNow, currMazeLength)
  recordImageOffset(images[stepsNow],
                   [row, col])
  selected_id_next = `jspsych-vsl-grid-scene-table-cell-${row}-${col}`
   // replace image being shown with the square indicating that spot is selected
  document.getElementById(selected_id_next).firstChild.src = "/static/images/selected.png";
  inKeyDown=false;
  time = jsPsych.totalTime();

  window.setTimeout(function(){
    if (movedOnTime[stepsNow] == false) {
      $("#jspsych-content").prepend('<h1 id="late">TOO LATE</h1>');
      // blank_screen_seconds = _.random(1, 12);

      time_options = [.5, 1, 1.5, 2, 2.5, 3, 3.5]
      blank_screen_seconds = _.sample(time_options, [1])[0]

      inKeyDown = true;
      document.getElementById(selected_id_next).firstChild.src = "/static/images/20.jpg";
      window.setTimeout(function(){
        $("#late").remove();

        document.getElementById(selected_id_next).firstChild.src = "/static/images/selected.png";
        inKeyDown = false;
      }, blank_screen_seconds*1000);
    }
  },2000);


}

function showItem(row, col, steps){
  selected_id_next = `jspsych-vsl-grid-scene-table-cell-${row}-${col}`
  recordImageOnset(images[steps-1],
                   [row, col])

  var image = images[steps-1];

  //  end maze if partiicpant reached the end
  if (steps > currMazeLength) {
    if (rewarded) {
      image = "/static/images/23.jpg";
    } else {
      image = "/static/images/mazeover.jpg";
    }
    window.setTimeout(function(){
      $(document).unbind('keydown');
  	  jsPsych.finishTrial()
    },
      2000);
  } else {
    window.setTimeout(function(){
      time_options = [.5, 1, 1.5, 2, 2.5, 3, 3.5]
      blank_screen_seconds = _.sample(time_options, [1])[0]

      console.log(blank_screen_seconds)
      document.getElementById(selected_id_next).firstChild.src = "/static/images/20.jpg";
      window.setTimeout(function(){
        startNextTrial(row, col, steps);
      }, blank_screen_seconds*1000);
  	},2500);
  }
	document.getElementById(selected_id_next).firstChild.src = image;


}

function change_selected(selected, key_pressed){
  var currTime = jsPsych.totalTime();

	inKeyDown= true;

	var row1 = selected[0];
	var col1 = selected[1];
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
	}

	// if you try to move off the edge, do nothing
	if ((row2 < 0) || (row2 > 4) || (col2 < 0) || (col2 > 4)){
		return [row1, col1]
	} else {
		selected_id = `jspsych-vsl-grid-scene-table-cell-${selected[0]}-${selected[1]}`

		document.getElementById(selected_id).firstChild.src = "/static/images/light_gray.png";

		selected_id_next = `jspsych-vsl-grid-scene-table-cell-${row2}-${col2}`
		// document.getElementById(selected_id_next).firstChild.src = "/static/images/selected.png";


		const item = image_grid[row1][col1];
		const location = [row1, col1];
		const response = key_pressed;
		const rt = currTime-time;
		recordMazeMove(item,
                   location,
                   response,
                   rt)

    movedOnTime[steps] = true;
    steps +=1;
    showItem(row2, col2, steps);
		// window.setTimeout(function(){showItem(row2, col2, steps)},1000)
		return [row2, col2]
	}
}
function getImages(itemsIndex){
  images = mazeItems.slice(itemsIndex, itemsIndex+currMazeLength)
  return images;
}

function runMaze(mazeNumber, itemsIndex){
  var mazeTrial = {
      type: 'vsl-grid-scene',
      stimuli: function(){
        scene = JSON.parse(JSON.stringify(scene_orig));
        rewarded = mazeRewarded[mazeNumber];
        selected = [_.random(4), _.random(4)];
        return scene;
      },
      trial_duration: 150000000,
      on_load: function(){
        // start the first trial! selecting the first square
        startNextTrial(selected[0], selected[1], steps);
      },
  		on_start: function(){
        currMazeLength = mazeLengths[mazeNumber];
        images = getImages(itemsIndex);
        steps = 0;
        movedOnTime = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        const last_trial =  jsPsych.data.getLastTrialData().values()[0];

        trial_index = last_trial['trial_index'];
  			inKeyDown=false;

  			$(document).keydown(function(e) {
              e.preventDefault();
  						if (e.which == 38 && inKeyDown == false) { // up
  							selected = change_selected(selected, 'up')
  						}
  						if (e.which == 39 && inKeyDown == false){ // right
  							selected = change_selected(selected, 'right')
  						}
  						if (e.which == 37  && inKeyDown == false) {  // left
  						 selected = 	change_selected(selected, 'left')
  						}
  						if (e.which == 40 && inKeyDown == false) {  // down
  							selected =  change_selected(selected, 'down')
  						}
  			});


  		}
  };

  return mazeTrial;
};
