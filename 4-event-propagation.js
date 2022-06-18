'use strict';

// NOTE: event bubbling in practice
const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + 1) + min;
const randomColor = () =>
    `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// nav is parent of nav__links and nav__links is parent of nav__link: when event handler is attached to child and parent both then event on child will also affect event on parent (bubbling)

document.querySelector('.nav__link').addEventListener('click', function (e) {
    // console.log('LINK');
    // this in event handler points to the element which generated this event,if you are using arrow function for event handler this does not work with arrow remember
    // console.log(this);
    this.style.backgroundColor = randomColor();
    //NOTE: e.target : is where the event actually happened not where the event handler is attached
    // console.log('Link: ', e.target);
    //NOTE: e.currentTarget : the element to which event handler is attached
    // console.log('link-currentTarget : ', e.currentTarget);
    // console.log(e.currentTarget === this);

    // NOTE: you can stop event propagation: in practice it is not a good idea to stop propagation
    // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    // console.log('Links: ', e.target);
    // console.log('Links-currentTarget: ', e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    // console.log('Nav ', e.target);
    // console.log('Nav-currentTarget ', e.currentTarget);
});

// addEventListener(event, handler, [true]) : if optional third argument is set to true , by default it is false, the events will now be captured from parent to child without it events propagate from child to parent
