const mazeEndItems = ["static/images/23.jpg", "static/images/mazeover.jpg"];

practiceItems1 = ['static/images/40.jpg',
    'static/images/41.jpg',
    'static/images/42.jpg',
    'static/images/43.jpg',
    'static/images/44.jpg',]

practiceItems2 = ['static/images/45.jpg',
    'static/images/46.jpg',
    'static/images/47.jpg',]

var colors = ['static/images/light_gray.png',
    'static/images/selected.png',
    'static/images/red.jpg',
    'static/images/blue.jpg',
    'static/images/green.jpg',
    'static/images/purple.jpg',
    'static/images/orange.jpg',
    'static/images/yellow.jpg',];

var preload = {
    type: jsPsychPreload,
    images: practiceItems1.concat(mazeItems).concat(mazeEndItems).concat(practiceItems2).concat(colors),
}