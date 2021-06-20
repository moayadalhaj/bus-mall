/* eslint-disable indent */
'use strict';

let displayImage = document.getElementById('display-image');
let leftImage = document.getElementById('leftImage');
let middleImage = document.getElementById('middleImage');
let rightImage = document.getElementById('rightImage');
let viewResult = document.getElementById('view-results');
let counter = 0;
let imageArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg',
];

function Images(name, src) {
  this.name = name;
  this.src = `img/assets/${src}`;
  this.views = 0;
  this.clicks = 0;
  Images.allImages.push(this);
}

Images.allImages = [];

for (let i = 0; i < imageArray.length; i++) {
  new Images(imageArray[i].split('.')[0], imageArray[i]);
}
let leftIndex;
let middleIndex;
let rightIndex;
function render() {
  leftIndex = getRandomNumber(0, imageArray.length - 1);
  do {
    middleIndex = getRandomNumber(0, imageArray.length - 1);
  } while (leftIndex === middleIndex);
  do {
    rightIndex = getRandomNumber(0, imageArray.length - 1);
  } while (leftIndex === rightIndex || rightIndex === middleIndex);

  leftImage.src = Images.allImages[leftIndex].src;
  middleImage.src = Images.allImages[middleIndex].src;
  rightImage.src = Images.allImages[rightIndex].src;
  Images.allImages[leftIndex].views++;
  Images.allImages[middleIndex].views++;
  Images.allImages[rightIndex].views++;
}
function changeImages(event) {
  if ((event.target.id === 'leftImage' || event.target.id === 'middleImage' || event.target.id === 'rightImage') && counter < 25) {
    let index = event.target.id;
    switch (index) {
      case 'leftImage':
        Images.allImages[leftIndex].clicks++;
        break;
      case 'middleImage':
        Images.allImages[middleIndex].clicks++;
        break;
      default:
        Images.allImages[rightIndex].clicks++;
    }
    render();
    counter++;
  } else {
    displayImage.removeEventListener('click', changeImages);
    let btn = document.createElement('button');
    btn.textContent = 'View Results';
    viewResult.appendChild(btn);
  }
}

displayImage.addEventListener('click', changeImages);
render();

function results() {
  let list = document.createElement('ul');
  viewResult.appendChild(list);
  for (let j = 0; j < imageArray.length; j++) {
    let listItem = document.createElement('li');
    listItem.textContent = `${Images.allImages[j].name} had ${Images.allImages[j].clicks} votes, and was seen ${Images.allImages[j].views} times.`;
    list.appendChild(listItem);
  }
}
viewResult.addEventListener('click', results);
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
