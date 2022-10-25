'use strict';
const animationHeart = function (index) {
  // console.log('Heart is clicked');
  const elementHeartIcon = document.querySelectorAll('.js-heart-icon')[index];
  const elementHeartLabel = document.querySelectorAll('.c-label__heart')[index];
  if (elementHeartIcon.classList.contains('c-icon-outlined')) {
    console.log('Heart is outlined');
    //change the heart icon to filled heart with animation
    elementHeartLabel.innerHTML =
      '<svg class="c-icon c-icon-lg js-heart-icon is-animation-fill" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
  } else {
    console.log('Heart is filled');
    //change the heart icon to outlined heart with animation
    elementHeartLabel.innerHTML =
      '<svg class="c-icon c-icon-lg js-heart-icon c-icon-outlined is-animation-outlined" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>';
  }
};

const listeners = function () {
  console.log('Listeners initialized');

  //listen to the hover event on the button
  document.querySelector('.js-logo').addEventListener('mouseover', function () {
    console.log('Logo is mouseover');
    //animation spin
    document.querySelector('.c-logo__symbol').style.animation = 'spin 1s infinite linear';
    //check mouseout
    document.querySelector('.js-logo').addEventListener('mouseout', function () {
      console.log('Logo is mouseout');
      //delete animation
      document.querySelector('.c-logo__symbol').style.animation = '';
    });
  });

  //listen to the click event on the heart icon and show animation
  const hearts = document.querySelectorAll('.js-heart-input');
  for (let heart of hearts) {
    heart.addEventListener('change', function () {
      console.log('addEventListener change');
      //get number out string (example: 'heart1' -> 1)
      let index = heart.id.toString().match(/\d+/g)[0] - 1;
      animationHeart(index);
    });
  }
};

const showColors = function () {
  const colors = document.querySelectorAll('.c-color__item');
  for (let color of colors) {
    const hex = color.getAttribute('data-hex');
    color.style.backgroundColor = hex;
  }
};

const showBars = function () {
  const bars = document.querySelectorAll('.c-stats__item');
  for (let bar of bars) {
    const number = bar.querySelector('.c-stats__number').innerText;
    const totalNumber = bar.querySelector('.c-stats__totalnumber').innerText;
    const percentage = (number / totalNumber) * 100;
    bar.querySelector('.js-bar').style.width = percentage + '%';
  }
};

const getColors = function (filter) {
  if (filter == 'all') {
    getAPI('https://www.colourlovers.com/api/palettes?format=json', showColors);
  } else if (filter == 'new') {
    getAPI('https://www.colourlovers.com/api/palettes/new?format=json', showColors);
  } else if (filter == 'top') {
    getAPI('https://www.colourlovers.com/api/palettes/top?format=json', showColors);
  }
};

const getAPI = async function (urlEndpoint, callback) {
  const json = await getData(urlEndpoint, { 'Content-Type': 'application/json' });
  console.log(json);
  callback(json);
};

const getData = async (urlEndpoint) => {
  return fetch(urlEndpoint)
    .then((r) => r.json())
    .catch((e) => console.error(e));
};

const init = function () {
  console.log('App initialized');
  // listeners();
  // showColors();
  // showBars();
  getColors('all');
};

document.addEventListener('DOMContentLoaded', init);
