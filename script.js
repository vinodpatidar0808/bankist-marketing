'use strict';

// selecting, creating and deleting elements: imp
// to select entire document: suppose we want to apply css styls to entire page we need to select documentElement, this will fetch entire html
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// for selecting other element/elements
const header = document.querySelector('.header'); //selects the first element with header classList
// select all elements with section class, returns a node list
const allSections = document.querySelectorAll('.section');

// querySelector and querySelectorAll are also available on elements for selecting child elements

// getElementById : selects the element with matching Id
document.getElementById('section--1');

// NOTE: getElementByTagName : selects all elements with given tag tagname : this returns a HTMLcollection which is different from nodelist , HTMLcollection changes immediately when something changes inside the page(updates automatically), this does not happen with nodelist
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// getElementsByClassName : this also gives us a HTMLcollection like get getElementByTagName
console.log(document.getElementsByClassName('btn'));

// ---------------------CREATING AND INSERTING ELEMENTS-----------------------------

// .insertAdjacentHTML : to insert html element
// createElement creates a dom element but it is not in actual webpage yet
const message = document.createElement('div');
// adding classes to created element
message.classList.add('cookie-message'); // you can add more than one
message.textContent =
    'We use cookies for improved functionality and analytics.';
// innerHTML combines functionality of both above methods
message.innerHTML = `We use cookies for improved functionality and analytics. <button class='btn--close-cookie'>Got it!</button> `;

// inserting above created element
// prepend : adds element as first child of parent element
header.prepend(message);
// append : adds element as last child of parent element
header.append(message);
// message element inserted only once? : it is unique element so it can not be at more than one place at the same time , so append just moved the message element to last as it was already inserted

// what if we wanted to have multiple copies of same element: cloneNode comes to the rescue
// header.append(message.cloneNode(true));

// before and after methods inserts element as sibling of itself before/after it
header.before(message);
header.after(message);

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
    //   remove is recent method before it there used to exist  removeChild
    // message.remove();
    // using removeChild method require selecting parent first
    message.parentElement.removeChild(message);
});
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

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
