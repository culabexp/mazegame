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
function recordKeyPress(displaySet, trial_index){
    $(document).keydown(function (e) {

        if (e.which == 38) { // up
            e.preventDefault();
            console.log('fuck')
            const last_trial = jsPsych.data.getLastTrialData().values()[0];

            onFinish({
                phase: 'wm',
                trial_type: 'react',
                subject: last_trial['subject'],
                condition: last_trial['condition'],
                stimulus: displaySet[trial_index]['type'],
                time_elapsed: jsPsych.totalTime(),
                expStartTime: jsPsych.startTime(),
                trial_index: trial_index,
            });
        }
    });
}

function recordResponseType(data){
    console.log('in record!')
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
        type: 'html-keyboard-response',
        trial_duration: 1750,
        response_ends_trial: false,
        data: { display_type: display['type'] },
        on_finish: recordResponseType,
        stimulus: sceneToHtml(getScene(display))
    }
}

function wmTask(displaySet) {
    console.log('!!!', displaySet[0])
    var trials = {
        type: 'html-keyboard-response',
        response_ends_trial: false,
        timeline: [
            {
                type: 'html-keyboard-response',
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
    console.log('!!!', displaySet[0])
    var trials = {
        type: 'html-keyboard-response',
        response_ends_trial: false,
        timeline: [
            {
                type: 'html-keyboard-response',
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

// function wmPractice(practice) {
//     console.log('practice!', practice)
//     var trials = {
//         type: 'html-keyboard-response',
//         response_ends_trial: false,
//         timeline: [
//             {
//                 type: 'html-keyboard-response',
//                 trial_duration: 2000,
//                 response_ends_trial: false,
//                 data: { trial_type: displaySet[0]['type'] },
//                 on_start: function(){
//                     console.log('practice',practice)
//                 },
//                 stimulus: 'sceneToHtml(getScene(displaySet[0]))'
//             },
//             getWMTrial(displaySet[15]),

//         ]
//     }
//     return trials;
// }