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
  let leftRandomIndex;
  let midRandomIndex;
  let rightRandomIndex;
  do {
    leftRandomIndex = getRandomNumber(0, imageArray.length - 1);
  } while (leftRandomIndex === leftIndex || leftRandomIndex === middleIndex || leftRandomIndex === rightIndex);
  do {
    midRandomIndex = getRandomNumber(0, imageArray.length - 1);
  } while (leftRandomIndex === midRandomIndex || midRandomIndex === middleIndex || midRandomIndex === leftIndex || midRandomIndex === rightIndex);
  do {
    rightRandomIndex = getRandomNumber(0, imageArray.length - 1);
  } while (leftRandomIndex === rightRandomIndex || rightRandomIndex === midRandomIndex || rightRandomIndex === rightIndex || rightRandomIndex === leftIndex || rightRandomIndex === midRandomIndex);

  leftIndex = leftRandomIndex;
  middleIndex = midRandomIndex;
  rightIndex = rightRandomIndex;
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
  } else if (counter === 25) {
    displayImage.removeEventListener('click', changeImages);
    showChart();
    let btn = document.createElement('button');
    btn.textContent = 'View Results';
    viewResult.appendChild(btn);
  }
  localStorage.setItem('data', JSON.stringify(Images.allImages));
}

displayImage.addEventListener('click', changeImages);
render();

function updateData() {
  let allData = JSON.parse(localStorage.getItem('data'));
  if (allData) {
    Images.allImages = allData;
  }
}
updateData();

function results() {
  let list = document.createElement('ul');
  viewResult.appendChild(list);
  for (let j = 0; j < imageArray.length; j++) {
    let listItem = document.createElement('li');
    listItem.textContent = `${Images.allImages[j].name} had ${Images.allImages[j].clicks} votes, and was seen ${Images.allImages[j].views} times.`;
    list.appendChild(listItem);
  }
  viewResult.removeEventListener('click', results);
}

viewResult.addEventListener('click', results);
function showChart() {
  let names = [];
  let views = [];
  let clicks = [];
  for (let i = 0; i < imageArray.length; i++) {
    names.push(Images.allImages[i].name);
    views.push(Images.allImages[i].views);
    clicks.push(Images.allImages[i].clicks);
  }
  let ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [
        {
          label: '# of views',
          data: views,
          backgroundColor:
            'rgba(255, 99, 132, 0.5)',
        },
        {
          label: '# of clicks',
          data: clicks,
          backgroundColor: 'rgba(54, 162, 235, 1)',
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      }
    }
  });
}
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
