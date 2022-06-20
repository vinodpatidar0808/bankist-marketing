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
    e.preventDefault();
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

/* NOTE:  -------------TABBED COMPONENT-----------------*/
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// doing this is a bad practice : what if you had 200 tabs, this function would be copied and attached to all 200 tabs
// tabs.forEach(t => t.addEventListener('click', e => console.log('tab')));

// use Event delegation
tabsContainer.addEventListener('click', function (e) {
    // matching strategy
    // if you use parentElement than when you click on button itself it will give div container containing them
    const clicked = e.target.closest('.operations__tab');
    // console.log(clicked);
    // you attached eventListener to tabsContainer so when you click outside it will show a console error
    if (!clicked) return; //Guard clause

    //remove operations__tab--active class from the one who has it
    tabs.forEach(t => t.classList.remove('operations__tab--active'));

    clicked.classList.add('operations__tab--active');

    //remove activated component's class
    tabsContent.forEach(t => t.classList.remove('operations__content--active'));

    // Activate content area: data attribute is helpful here
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

// NOTE: menu fade animation
// we also want to work with logo, so we chose entire nav
const nav = document.querySelector('.nav');

// const handleHover = (e, opacity) => {
//this is for bind method
const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        // selecting other links : select parent and children/sibling for other links
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};
// mouse enter event does not bubble so we use mouseover, opposite of mouseover is mouseout
// how to pass eventhandler function with parameters declared outside: if you do like this handleHover(e,0.5) as handler this will immediately gets executed which is not what we want

/* 
nav.addEventListener('mouseover', function (e) {
    handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
    handleHover(e, 1);
});
 */

// more better solution : use bind method, in real event handler function should have only 1 parameter and that is event if you need to passs other parameter use bind method and give and array or object of arguments
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//NOTE: sticky navigation :
/* 
// using scroll event : scroll event is available on window, scroll event is not efficient (keeps firing all the time) and should be avoided
const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
window.addEventListener('scroll', function () {
    // console.log(window.scrollY);
    if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
});
 */

// efficient: intersection observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
// entries is always an array
const stickyNav = entries => {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    // 90 means a box of 90 pixel will be applied outside of our target element, -90 will apply box inside
    // why 90 : 90 px is height of navigation menu, what if your page is responsive: you can calculate height using getBoundingClientRect
    // rootMargin: '-90px',
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// NOTE: revealing elements on scroll:
// reveal sections
const allSections = document.querySelectorAll('.section');

// we are interacting with all sections using same observer, so we  need to figure out which element we are interacting with
const revealSection = function (entries, observer) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    // unobserve sections after our work
    observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

// we could have added section--hidden class in html but doing that would mean if someone has disabled js in their browser the page won't be visible to them
allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});
