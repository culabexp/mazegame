// Participants were instructed that at the beginning of the post -
//  maze interval, a target would appear and that they should press the up
//   arrow any time an identical probe appeared during the series of probe 
//   stimuli that followed.The target was a blank maze with four randomly chosen
//    squares appearing in colour(any combination of red, orange, yellow, green, 
//     blue or purple, randomly chosen).Next, a series of probe stimuli appeared for
//      1.75 s: targets(20 %), location lures(the same locations as the target, but
//          different colours, 10 %), colour lures(the same colours as the target, but 
//             different locations, 10 %), and other lures(50 %).A novel target
//              was used after each maze.


const dist1 = {
    'colors': ['static/images/purple.jpg',
        'static/images/purple.jpg',
        'static/images/purple.jpg',
        'static/images/red.jpg'],
    'locations': [[0, 0], [3, 4], [2, 3], [2, 1]],
    'type': 'target'
}

const dist2 = {
    'colors': ['static/images/purple.jpg',
        'static/images/purple.jpg',
        'static/images/green.jpg',
        'static/images/red.jpg'],
    'locations': [[0, 3], [3, 4], [2, 3], [2, 1]],
    'type': 'target'
}

function continueInstructionsWithWM(words, display) {
    // scene = getOriginalScene()
    // html = sceneToHtml(display)
    // conso
    return {
        type:jsPsychHtmlButtonResponse,
        response_ends_trial: true,
        // stimulus: html,
        stimulus: function() {
            var scene = getScene(display)
            return words + sceneToHtml(scene);
        },
        choices: ['Continue']
    }
}


function wmInstructions() {
    var trials = {
        type: jsPsychHtmlKeyboardResponse,
        timeline: [
            continueInstructions('<h1> <br><br><br> In between mazes you will play the <b>Match Game </b> <br><br><br></h1>'),
            continueInstructionsWithWM('<h1> In the <b>Match Game</b>, you will see a pattern on the screen like this<br><br>', dist1),
            continueInstructionsWithWM('<h1> After, you will see several other patterns.<br><br> When the pattern is <i>exactly</i> the same as the first pattern <br>—same color squares, same locations—</i> <br>click "up" !<br><br><img src="static/images/keys_up_circle.png" width="135" height="100"><br>', dist1),
            continueInstructionsWithWM('<h1> So if the next pattern looks like this — do not click up! <br><br><br>', dist2),
            continueInstructionsWithWM("<h1> But if the third pattern looks like this, it's a match, <br>which means you should click up! <br><br><br>", dist1),
            continueInstructions("<h1> <br><br><br> Now we we'll do a practice version of the <b>Match Game</b>. <br><br> Get ready! <br><br><br></h1>"),
        ],
    }
    return trials;
}