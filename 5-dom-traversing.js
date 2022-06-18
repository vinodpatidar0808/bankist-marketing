'use string';
//NOTE: dom traversing is basically walking through dom which means we can select dom elements based on another elements like direct child etc

const h1 = document.querySelector('h1');
// going downwords: selecting child element
// querySelector works with element also , it will go down as deep as dom tree can select any element with matching selector
console.log(h1.querySelector('.highlight'));
// childNodes : gives us every single node of every type including comments
console.log(h1.childNodes); // childnode is not that much used
// children gives us HTMLcollection: remember it is a live collection, works for only direct children , does not gives comments or text content
console.log(h1.children);
// firstElementChild: gives only first child
console.log(h1.firstElementChild);
// h1.firstElementChild.style.backgroundColor = 'yellow';
// lastElementChild : gives only last child of all children
console.log(h1.lastElementChild);

// --------------Going upwards-----------------
// parentNode: gives direct parent
console.log(h1.parentNode);
//direct parent
console.log(h1.parentElement);
// gives closest parent of h1 with given selector: closest needs selctor like querySelector
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings, in js we can only access direct siblings
// previousElementSibling and nextElementSibling : gives previous and next element sibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
// previousSibling and nextSibling gives: anything that is sibling either text, comment anything
console.log(h1.previousSibling);
console.log(h1.nextSibling);
// this gives all siblings
// console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
    // you can compare element wit element
    if (el !== h1) el.style.transform = 'scale(0.6)';
});
