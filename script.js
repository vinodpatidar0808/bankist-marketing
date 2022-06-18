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
    //NOTE:    modern way supported only in super modern browsers
    section1.scrollIntoView({ behavior: 'smooth' });
});
