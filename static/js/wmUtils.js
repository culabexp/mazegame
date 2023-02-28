// function wmPlaceHolder() {
var display_grid = null;


function getScene(display){
    var display_grid = getOriginalScene();
    _.each([0, 1, 2, 3], function(i){
        x = display['locations'][i][0]
        y = display['locations'][i][1]
        color = display['colors'][i]
        display_grid[x][y] = color

    });
    return display_grid;
}

function recordResponseType(data){
    if (data.response == 'arrowup' && data.display_type == 'target') {
        data.correct = 'hit';
    } else if (data.response == 'arrowup' && data.display_type != 'target') {
        data.correct = 'false_alarm';
    } else if (data.response == null && data.display_type != 'target') {
        data.correct = 'correct_reject';
    } else if (data.response == null && data.display_type == 'target') {
        data.correct = 'miss';
    }
}

function getWMTrial(display) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        choices: ['arrowup'],
        trial_duration: 1750,
        response_ends_trial: false,
        data: { display_type: display['type'] },
        on_finish: recordResponseType,
        stimulus: sceneToHtml(getScene(display))
    }
}

function wmTask(displaySet) {
    var trials = {
        type: jsPsychHtmlKeyboardResponse,
        response_ends_trial: false,
        timeline: [
            {
                type: jsPsychHtmlKeyboardResponse,
                trial_duration: 2000,
                response_ends_trial: false,
                data: { trial_type: displaySet[0]['type'] },
                stimulus: sceneToHtml(getScene(displaySet[0]))
            },
            getWMTrial(displaySet[1]),
            getWMTrial(displaySet[2]),
            getWMTrial(displaySet[3]),
            getWMTrial(displaySet[4]),
            getWMTrial(displaySet[5]),
            getWMTrial(displaySet[6]),
            getWMTrial(displaySet[7]),
            getWMTrial(displaySet[8]),
            getWMTrial(displaySet[9]),
            getWMTrial(displaySet[10]),
            getWMTrial(displaySet[11]),
            getWMTrial(displaySet[12]),
            getWMTrial(displaySet[13]),
        ]
    }
    return trials;
}


function wmPractice(displaySet) {
    var trials = {
        type: jsPsychHtmlKeyboardResponse,
        response_ends_trial: false,
        timeline: [
            {
                type: jsPsychHtmlKeyboardResponse,
                trial_duration: 2000,
                response_ends_trial: false,
                data: { trial_type: displaySet[0]['type'] },
                stimulus: sceneToHtml(getScene(displaySet[0]))
            },
            getWMTrial(displaySet[1]),
            getWMTrial(displaySet[2]),
            getWMTrial(displaySet[3]),
            getWMTrial(displaySet[4]),
            getWMTrial(displaySet[5]),
            getWMTrial(displaySet[6]),
            getWMTrial(displaySet[7]),
            getWMTrial(displaySet[8]),
            getWMTrial(displaySet[9]),
            getWMTrial(displaySet[10]),
            getWMTrial(displaySet[11]),
            getWMTrial(displaySet[12]),
            getWMTrial(displaySet[13]),
        ]
    }
    return trials;
}