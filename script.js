'use strict';

//
//
//
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

// nodelist doesn't have all array methods but it does have forEach

btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', openModal);
});

// for (let i = 0; i < btnsOpenModal.length; i++)
//     btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// NOTE:   **************IMPLEMENTING SMOOTH SCROLL*********************
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
    // we  need coordinates of element where we need to scroll
    // NOTE: in browsers x is measured from left side and y axis from top(top of viewport not of page) and z towards user: axes are seen with respect to viewport not wrt to page
    /* NOTE: this is an old way of doing
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);
    console.log(e.target.getBoundingClientRect());
    console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
    // if you want to know height and width of client viewport
    console.log(
        'height and width of client viewport: ',
        document.documentElement.clientHeight,
        document.documentElement.clientWidth
        );
        
        // scrolling : top and left are relative to viewport and not relative to document
        // currentPos+ currentScroll to work from anywhere
        window.scrollTo(
            s1coords.left + window.pageXOffset,
            s1coords.top + window.pageYOffset
            );
            // to animate and make scroll look nicer you can specify an object with some properties like this
            window.scrollTo({
                left: s1coords.left + window.pageXOffset,
                top: s1coords.top + window.pageYOffset,
                behavior: 'smooth', //  to implement smooth scroll
            });
    */
    //NOTE:    modern way :supported only in super modern browsers
    section1.scrollIntoView({ behavior: 'smooth' });
});

// NOTE: use event delegation to implement smooth scrolling through navigation

// without event delegation: works fine but not efficient, exact event handler function is now attached to 3 elements
/* 
document.querySelectorAll('.nav__link').forEach(function (el) {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        // smooth scrolling
        // this.href will give entire url, we only want id associated with href for scrolling to particular section
        // this gets us or id selector already
        const id = this.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
        // console.log(id);
    });
});
 */
// efficient: we know event bubbles up so we can add event listener on their common parent
// 1. add eventListener to common parent element
// 2. Determine what element originated the event
// nav__links is the parent of all 3 Link
document.querySelector('.nav__links').addEventListener('click', function (e) {
    // e.target will tell you where the event happened
    // console.log(e.target); // gives the link which was clicked
    // console.log(e.currentTarget);// givs nav__links as eventListener is attached to it

    //matching strategy: this is difficult to get 
    if (e.target.classList.contains('nav__link')) {
        // you can't use this here as this points to element which is attached to eventListener
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});
// normally you can't add eventListener to element that does not exist on page at runtime, but with event delegation you can do that and attach eventListener to element that do not exist on page yet
