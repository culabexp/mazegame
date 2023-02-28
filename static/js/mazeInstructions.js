

function continueInstructionsWithMaze(x){
    scene = getOriginalScene()
    scene[1][3] = "static/images/selected.png";
    html = sceneToHtml(scene)
    return {
        type:jsPsychHtmlButtonResponse,
        response_ends_trial: true,
        stimulus: " <br><br> <h1>Mazes look like this.<br> A black frame will indicate where you are in the maze.<h1> <br><br>"+ html,
        choices: ['Continue']
    }
}

function mazeInstructions() {
    var trials = {
        type: jsPsychHtmlKeyboardResponse,
        timeline: [
            continueInstructions('<h1> <br><br><br> Welcome to the Maze Game! <br><br><br></h1>'),
            continueInstructions('<h1> In this game, you will explore a series of mazes.<br><br> Your goal is to find the <u>gold coin</u> hidden within each maze. <br> <br><img src="static/images/23.jpg" width="100" height="100"> <br><br>You will be <u>paid $1 bonus</u> for every gold coin you find.<br><br></h1><br><br>'),
            continueInstructionsWithMaze('<h1> Mazes look like this. A black frame will indicate where you are in the maze. </h1>'),
            continueInstructions('<h1> You navigate by moving the <u>arrow keys</u>.<br><img src="static/images/keys.png" width="130" height="100"><br> You will have <u>two seconds</u> to make a choice. </h1><br>'),
            continueInstructions('<h1> In each maze you get a limited number of moves. <br><br> So if you do not respond in time, <br>you will not get to explore as many spaces. <br><br>The number of moves allowed will vary by maze.<br><br></h1>'),
            continueInstructions('<h1> Now we will play a short practice version. <br><br></h1>'),

        ]
    }
    return trials;
}
