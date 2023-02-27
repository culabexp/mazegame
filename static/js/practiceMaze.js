var x =  null;
var y =  null;
var scene = getOriginalScene();
var step = 0;
var remaining_time  = 0;
var started=false;
var sceneSpaces = {};

var late_trial = {
    type: jsPsychHtmlKeyboardResponse,
    data: { scene: scene, x: x, y: y, step: step },
    trial_duration: 2000,
    response_ends_trial: false,
    stimulus: function() {
        return "<h1>Too late</h1>"+sceneToHtml(scene)
    }
}

var check_for_late = {
    timeline: [late_trial, showBlankSquare()],
    conditional_function: function () {
        // get the data from the previous trial,
        // and check which key was pressed
        var data = jsPsych.data.get().last(1).values()[0];
        const resp = data.response;
        if (resp == null) {
            return true;
        } else {
            return false;
        }
    }
}


function showMazeItem(items){
    return {
        type: jsPsychHtmlKeyboardResponse,
        trial_duration: 2500,
        response_ends_trial: false,
        data: { scene: scene, x:x, y:y, step:step },
        save_trial_parameters: {trial_duration: true},
        stimulus: function(){
            var prev_data = jsPsych.data.get().last(1).values()[0];            
            var move = prev_data['response'];
            if (move=='arrowup') {
               y = y-1;
            } else if (move == 'arrowdown'){
                y = y + 1;
            } else if (move == 'arrowleft'){
                x = x - 1;
            } else if (move == 'arrowright') {
                x = x + 1;
            }
            var scene = getOriginalScene();
            if (_.contains(Object.keys(seenSpaces), `${x}${y}`)){
                var nextItem = seenSpaces[`${x}${y}`];
            } else {
                var nextItem = items[step];
                seenSpaces[`${x}${y}`] = nextItem;
            }
            step = step + 1;
            scene[y][x] = nextItem;
            return sceneToHtml(scene);
        },
    }
}


function showSelector(){
    return {
        type: jsPsychHtmlKeyboardResponse,
        trial_duration: 2000,
        response_ends_trial: true,
        data: { x: x, y: y, scene: scene, step: step },
        choices: function(){
            if (started==false) {
                started=true;
                x = _.random(4);
                y = _.random(4);
                scene = getOriginalScene();
            }
            var choices = [];
            if (y != 0) { choices.push('arrowup')};
            if (y != 4) { choices.push('arrowdown')};
            if (x != 0){choices.push('arrowleft')};
            if (x != 4) {choices.push('arrowright')};
            return choices;
        },
        stimulus: function () {
            scene[y][x] = 'static/images/selected.png'
            return sceneToHtml(scene);
        },
    }
}

function showBlankSquare() {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { x: x, y: y, scene: scene, step: step },
        trial_duration: function(){
            var time_options = [.5, 1, 1.5, 2, 2.5, 3, 3.5];
            var blank_screen_seconds = _.sample(time_options, [1])[0];
            return blank_screen_seconds*1000;
        },
        response_ends_trial: false,
        choices: ['`'], 
        stimulus: function () {
            scene[y][x] = 'static/images/white.jpg';
            return sceneToHtml(scene);
        },
    }
}

function showBlankSquareConditional(items) {
    return {
        timeline: [showBlankSquare()],
        conditional_function: function () {
            // get the data from the previous trial,
            // and check which key was pressed
            if (step < items.length) {
                return true;
            } else {
                return false;
            }
        }
    }
}


function selectMoveLoop(){
    var loop_node = {
        timeline: [
            showSelector(),
            check_for_late,
        ],
        loop_function: function (data) {
            var prev_data = jsPsych.data.get().last(1).values()[0];            
            if (prev_data['response'] == null) {
                return true;
            } else {
                return false;
            }
        }
    };
    return loop_node;
}

function showItemLoop(items){
    var loop_node = {
        timeline: [
            selectMoveLoop(),
            showMazeItem(items),
            showBlankSquareConditional(items),
            // showBlankSquare(),
        ],
        loop_function: function (data) {
            if (step < items.length){
                return true;
            } else {
                return false;
            }
        }
    };
    return loop_node;
};

var end_maze_loop = {
    timeline: [late_trial, showBlankSquare()],
    conditional_function: function () {
        // get the data from the previous trial,
        // and check which key was pressed
        var data = jsPsych.data.get().last(1).values()[0];
        const resp = data.response;
        if (resp == null) {
            return true;
        } else {
            return false;
        }
    }
}

function practiceMaze(items, rewarded){
    mazeNumber = 0;
    if (rewarded) {
        items.push("static/images/23.jpg");
    } else {
        items.push("static/images/mazeover.jpg");
    }

    var trials = {
        type: jsPsychHtmlKeyboardResponse,
        timeline: [
            showItemLoop(items),
        ]
    }
    return trials;
}