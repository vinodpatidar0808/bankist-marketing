'use strict';

// allows our code to observe certain elements on our page or observe viewport

const section1 = document.querySelector('#section--1');

// will  be called each time when our target element interacts with the root element defined in options, you can skip observer if you don't need it
const obsCallback = function (entries, observer) {
    entries.forEach(entry => {
        console.log(entry);
    });
};

const obsOptions = {
    // root specify the target element,null : we can observe our target element interacting with the entire viewport
    root: null,
    // percentage of interaction 0.1= 10%, you can have multiple thresholds in an array
    // 0 means our callback will be triggered when our target element goes out of view
    // 1 when target is 100% in view
    threshold: [0, 0.2],
};

// to use Intersection api we have to create an observer first
const observer = new IntersectionObserver(obsCallback, obsOptions);
// what to observe
observer.observe(section1);
