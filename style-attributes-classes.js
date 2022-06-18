//NOTE: styles attributes and classes
// styles: element.styel.propertyName = "propertyValue", this styles are set as inline styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// will show height only if it was declared as inline style in element
console.log(message.style.height);
console.log(message.style.backgroundColor); // we set backgroundColor above
// getComputedStyle(element) : shows all the styles on element
console.log(getComputedStyle(message).color);
message.style.height =
    Number.parseFloat(getComputedStyle(message), 10) + 40 + 'px';

// : root in css is document itself
document.documentElement.style.setProperty('--color-primary', 'orangered');

// NOTE:  Attributes
const logo = document.querySelector('.nav__logo');
// you get access to standard attributes: if you define custome attributes than you have to
console.log(logo.alt);
// here you will get complete url whereas in html we have relative url, to get relative url you have to use getAttribute
console.log(logo.src);
// className like react
console.log(logo.className);

// logo.getAttribute('attributeName') : with this you can get access  to custome attributes also
// logo.setAttribute('attributeName','attributeValue'): you can set attribute with this

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// data attributes : attributes which starts with data-[value1]-[value2]
// here data attributes will be camelCase, only value1Value2 will be used to access it
// console.log(logo.dataset.value1Value2);

//NOTE: classes
// logo.classList.add('className [className] ..')
// logo.classList.remove('className [className] ..')
// logo.classList.toggle('className [className] ..')
// logo.classList.contains('className [className] ..')  //not includes like arrays

// don't use it , it overrides existing classes and only allows to add only one classs
// logo.className = 'vinod'
