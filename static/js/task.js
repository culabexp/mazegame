// items we need
const mazeEndItems = ["/static/images/23.jpg", "/static/images/mazeover.jpg"];

practiceItems1 = ['/static/images/40.jpg',
                  '/static/images/41.jpg',
                  '/static/images/42.jpg',
                 '/static/images/43.jpg',
                 '/static/images/44.jpg',]
practiceItems2 = ['/static/images/45.jpg',
                  '/static/images/46.jpg',
                  '/static/images/47.jpg',]

var colors = ['/static/images/light_gray.png',
              '/static/images/selected.png',
              '/static/images/red.jpg',
              '/static/images/blue.jpg',
              '/static/images/green.jpg',
              '/static/images/purple.jpg',
              '/static/images/orange.jpg',
              '/static/images/yellow.jpg',];

const jsPsych = initJsPsych();
const timeline = [];

var preload = {
    type: jsPsychPreload,
    images: practiceItems1.concat(mazeItems).concat(mazeEndItems).concat(practiceItems2).concat(colors),
}

//  PRELOAD
timeline.push(preload)

const hello_trial = {
    type: jsPsychHtmlButtonResponse,
    choices: ['continue'],
    stimulus: 'Hello world!'
}
timeline.push(hello_trial)

const goodbye_trial = {
    type: jsPsychHtmlButtonResponse,
    choices: ['continue'],
    stimulus: 'goodbye world!'
}

timeline.push(goodbye_trial)

const subject_id = jsPsych.randomization.randomID(10);
const filename = `${subject_id}.csv`;
const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "CF9IOlD9MkXj",
    filename: filename,
    data_string: () => jsPsych.data.get().csv()
};

timeline.push(save_data)

jsPsych.run(timeline);
