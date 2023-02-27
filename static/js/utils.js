const VERSION = 0.0



function getOriginalScene() {
  scene = JSON.parse(JSON.stringify(scene_orig));
  return scene;

}

function sceneToHtml(scene) {
  html = `
    <div id="jspsych-vsl-grid-scene-dummy" css="display: none;">
   <table id="jspsych-vsl-grid-scene table" style="border-collapse: collapse; margin-left: auto; margin-right: auto;">
      <tbody>
         <tr id="jspsych-vsl-grid-scene-table-row-0" css="height: 100px;">
            <td id="jspsych-vsl-grid-scene-table-0-0" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-0-0" style="width: 100px; height: 100px;"><img src=${scene[0][0]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-0-1" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-0-1" style="width: 100px; height: 100px;"><img src=${scene[0][1]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-0-2" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-0-2" style="width: 100px; height: 100px;"><img src=${scene[0][2]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-0-3" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-0-3" style="width: 100px; height: 100px;"><img src=${scene[0][3]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-0-4" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-0-4" style="width: 100px; height: 100px;"><img src=${scene[0][4]} style="width: 100px; height: 100"></div>
            </td>
         </tr>
         <tr id="jspsych-vsl-grid-scene-table-row-1" css="height: 100px;">
            <td id="jspsych-vsl-grid-scene-table-1-0" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-1-0" style="width: 100px; height: 100px;"><img src=${scene[1][0]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-1-1" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-1-1" style="width: 100px; height: 100px;"><img src=${scene[1][1]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-1-2" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-1-2" style="width: 100px; height: 100px;"><img src=${scene[1][2]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-1-3" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-1-3" style="width: 100px; height: 100px;"><img src=${scene[1][3]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-1-4" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-1-4" style="width: 100px; height: 100px;"><img src=${scene[1][4]} style="width: 100px; height: 100"></div>
            </td>
         </tr>
         <tr id="jspsych-vsl-grid-scene-table-row-2" css="height: 100px;">
            <td id="jspsych-vsl-grid-scene-table-2-0" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-2-0" style="width: 100px; height: 100px;"><img src=${scene[2][0]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-2-1" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-2-1" style="width: 100px; height: 100px;"><img src=${scene[2][1]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-2-2" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-2-2" style="width: 100px; height: 100px;"><img src=${scene[2][2]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-2-3" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-2-3" style="width: 100px; height: 100px;"><img src=${scene[2][3]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-2-4" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-2-4" style="width: 100px; height: 100px;"><img src=${scene[2][4]} style="width: 100px; height: 100"></div>
            </td>
         </tr>
         <tr id="jspsych-vsl-grid-scene-table-row-3" css="height: 100px;">
            <td id="jspsych-vsl-grid-scene-table-3-0" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-3-0" style="width: 100px; height: 100px;"><img src=${scene[3][0]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-3-1" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-3-1" style="width: 100px; height: 100px;"><img src=${scene[3][1]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-3-2" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-3-2" style="width: 100px; height: 100px;"><img src=${scene[3][2]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-3-3" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-3-3" style="width: 100px; height: 100px;"><img src=${scene[3][3]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-3-4" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-3-4" style="width: 100px; height: 100px;"><img src=${scene[3][4]} style="width: 100px; height: 100"></div>
            </td>
         </tr>
         <tr id="jspsych-vsl-grid-scene-table-row-4" css="height: 100px;">
            <td id="jspsych-vsl-grid-scene-table-4-0" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-4-0" style="width: 100px; height: 100px;"><img src=${scene[4][0]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-4-1" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-4-1" style="width: 100px; height: 100px;"><img src=${scene[4][1]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-4-2" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-4-2" style="width: 100px; height: 100px;"><img src=${scene[4][2]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-4-3" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-4-3" style="width: 100px; height: 100px;"><img src=${scene[4][3]} style="width: 100px; height: 100"></div>
            </td>
            <td id="jspsych-vsl-grid-scene-table-4-4" style="padding: 10px 10px; border: 1px solid #555;">
               <div id="jspsych-vsl-grid-scene-table-cell-4-4" style="width: 100px; height: 100px;"><img src=${scene[4][4]} style="width: 100px; height: 100"></div>
            </td>
         </tr>
      </tbody>
   </table>
</div>

    `
  return html;
};


function onFinish(data){
  dm.recordData(data);
}


function getProlificId(conditon){
  console.log('in prol id', conditon)
  var trial = {
   type: jsPsychSurveyText,
    on_finish: function(data) {
      const subjectId = data['response']['prolific_id'];
      const session = data['response']['session_number'];
      console.log('subjectId', subjectId)

      jsPsych.data.addProperties({
        // record the condition assignment in the jsPsych data
        condition: conditon,
        // this adds a property called 'subject' to every trial
        subject: subjectId,
        session: 0,

        version: VERSION,
         expStartTime: jsPsych.getStartTime(),
      });
    },
    questions: [
      {prompt: "<h2>What is your Prolific ID?</h2><br><br>",
       placeholder: "111111111111", required: true,
       name: 'prolific_id',
     },
    //  {prompt: "<h2>What the session number (1 or 2)?</h2><br><br>",
    //   placeholder: "1", required: true,
    //   name: 'session_number',
    // }

    ],
  };
  return trial;
}


var image_grid = [
  ["static/images/4063.jpg", "static/images/4067.jpg","static/images/4072.jpg",  "static/images/4077.jpg","static/images/4082.jpg"],
  ["static/images/4062.jpg", "static/images/4068.jpg","static/images/4073.jpg",  "static/images/4078.jpg","static/images/4083.jpg"],
  ["static/images/4064.jpg", "static/images/4069.jpg","static/images/4074.jpg",  "static/images/4079.jpg","static/images/4084.jpg"],
	["static/images/4065.jpg", "static/images/4070.jpg","static/images/4075.jpg",  "static/images/4080.jpg","static/images/4085.jpg"],
  ["static/images/4066.jpg", "static/images/4071.jpg","static/images/4076.jpg",  "static/images/4081.jpg","static/images/4086.jpg"]
]

var scene_orig = [
  ["static/images/light_gray.png", "static/images/light_gray.png","static/images/light_gray.png",  "static/images/light_gray.png","static/images/light_gray.png"],
  ["static/images/light_gray.png", "static/images/light_gray.png","static/images/light_gray.png",  "static/images/light_gray.png","static/images/light_gray.png"],
  ["static/images/light_gray.png", "static/images/light_gray.png","static/images/light_gray.png",  "static/images/light_gray.png","static/images/light_gray.png"],
	["static/images/light_gray.png", "static/images/light_gray.png","static/images/light_gray.png",  "static/images/light_gray.png","static/images/light_gray.png"],
  ["static/images/light_gray.png", "static/images/light_gray.png","static/images/light_gray.png",  "static/images/light_gray.png","static/images/light_gray.png"]
]


function continueInstructions(instructionsHTML, on_start=null){
  var trial = {
     on_start: on_start,
    type:jsPsychHtmlButtonResponse,
    stimulus: instructionsHTML,
    choices: ['Continue']
  };
  return trial;
}
