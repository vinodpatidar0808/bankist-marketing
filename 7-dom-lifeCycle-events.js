'use strict';

// dom lifecycle : from first page load to the time when user leaves it
// lifecycle events : events that fire from first page load to page exit

// DOMContentLoaded: when html and js is loaded this event is fired: this event does not wait for images and external resources to load just html and js

document.addEventListener('DOMContentLoaded', function (e) {
    console.log('HTML parsed and DOM tree built!', e);
});

//load event: fired when all images, css and external resources are parsed

window.addEventListener('load', function (e) {
    console.log('Page fully loaded', e);
});

// before unload event: created immediately before the user is about to leave the page

// don't abuse this
/* 
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    console.log(e);
    // historical reasons
    e.returnValue = '';
});
 */

 