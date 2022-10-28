'use strict';

let toggleValue = 'all';

const animationHeart = function (index) {
  // console.log('Heart is clicked');
  const elementHeartIcon = document.querySelectorAll('.js-heart-icon')[index];
  const elementHeartLabel = document.querySelectorAll('.c-label__heart')[index];
  if (elementHeartIcon.classList.contains('c-icon-outlined')) {
    // console.log('Heart is outlined');
    //change the heart icon to filled heart with animation
    elementHeartLabel.innerHTML =
      '<svg class="c-icon c-icon-lg js-heart-icon is-animation-fill" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
  } else {
    // console.log('Heart is filled');
    //change the heart icon to outlined heart with animation
    elementHeartLabel.innerHTML =
      '<svg class="c-icon c-icon-lg js-heart-icon c-icon-outlined is-animation-outlined" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>';
  }
};

const listeners = function () {
  console.log('Listeners initialized');

  //listen to the hover event on the button
  document.querySelector('.js-logo').addEventListener('mouseover', function () {
    // console.log('Logo is mouseover');
    //animation spin
    document.querySelector('.c-logo__symbol').style.animation = 'spin 1s infinite linear';
    //check mouseout
    document.querySelector('.js-logo').addEventListener('mouseout', function () {
      // console.log('Logo is mouseout');
      //delete animation
      document.querySelector('.c-logo__symbol').style.animation = '';
    });
  });

  //listen to the click event on the heart icon and show animation
  const hearts = document.querySelectorAll('.js-heart-input');
  for (let heart of hearts) {
    heart.addEventListener('change', function () {
      // console.log('addEventListener change');
      //get number out string (example: 'heart1' -> 1)
      let index = heart.id.toString().match(/\d+/g)[0] - 1;
      animationHeart(index);
    });
  }

  //listen to the change event on the toggle button and show colors
  const toggles = document.querySelectorAll('.js-toggle');
  for (let toggle of toggles) {
    toggle.addEventListener('change', function () {
      if (toggleValue !== toggle.id) {
        toggleValue = toggle.id;
        getColors(toggle.id);
      }
    });
  }

  //listen to the change event on the select colorplate and show details
  const cards = document.querySelectorAll('.js-card');
  for (let card of cards) {
    card.addEventListener('change', function () {
      // console.log('card is selected');
      const id = card.getAttribute('data-colorid');
      // console.log(id);
      popup(true);
      getDetails(id);
      listenersPopupClose();
    });
  }
};

const listenersPopupClose = function () {
  //listen to the close button on the popup and close the popup
  document.querySelector('.js-close').addEventListener('click', function () {
    // console.log('close button is clicked');
    popup(false);
  });

  //listen to the click event on the background and close the popup
    if (document.querySelector('.c-popup').classList.contains('is-animation-slide-up')) {
      document.querySelector('.js-background').addEventListener('click', function () {
        popup(false);
      });
    }
};

const popup = function (status) {
  const htmlPopup = document.querySelector('.c-popup');
  const htmlBackground = document.querySelector('.js-background');
  const htmlBody = document.querySelector('body');

  if (status) {
    htmlPopup.classList.remove('is-animation-slide-down');
    htmlPopup.classList.add('is-animation-slide-up');

    setTimeout(function () {
      htmlBackground.classList.add('u-background-blur');
      htmlBody.classList.add('u-no-scroll');
      htmlPopup.classList.remove('u-hidden');
    }, 300);
  } else {
    htmlPopup.classList.remove('is-animation-slide-up');
    htmlPopup.classList.add('is-animation-slide-down');

    setTimeout(function () {
      htmlBackground.classList.remove('u-background-blur');
      htmlBody.classList.remove('u-no-scroll');
      htmlPopup.classList.add('u-hidden');
    }, 300);
    const colorList = document.querySelectorAll('.c-color__item');
    for (let color of colorList) {
      color.setAttribute('data-hex', `#ffffff`);
    }
    showColors();
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

const showStars = function () {
  const stars = document.querySelectorAll('.c-card__rating');
  for (let star of stars) {
    // console.log(star);
    const number = star.getAttribute('data-star');
    // console.log(number);
    const lookHalfStar = number % 1;
    const lookEmptyStar = Math.floor(5 - number);
    const lookFullStar = number - lookHalfStar;
    // console.log(lookHalfStar, lookFullStar, lookEmptyStar);
    let starsHtml = '';
    for (let i = 0; i < lookFullStar; i++) {
      const fullStar =
        '<svg class="c-icon c-icon-sm" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0 0h24v24H0V0z" fill="none" /><path d="M0 0h24v24H0V0z" fill="none" /></g><g><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" /></g></svg>';
      starsHtml += fullStar;
    }
    if (lookHalfStar > 0) {
      const halfStar =
        '<svg class="c-icon c-icon-sm" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" /></svg>';
      starsHtml += halfStar;
    }
    for (let i = 0; i < lookEmptyStar; i++) {
      const emptyStar =
        '<svg class="c-icon c-icon-sm c-icon-outlined" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 7.13l.97 2.29.47 1.11 1.2.1 2.47.21-1.88 1.63-.91.79.27 1.18.56 2.41-2.12-1.28-1.03-.64-1.03.62-2.12 1.28.56-2.41.27-1.18-.91-.79-1.88-1.63 2.47-.21 1.2-.1.47-1.11.97-2.27M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/></svg>';
      starsHtml += emptyStar;
    }
    star.innerHTML = starsHtml;
  }
};

const showData = function (jsonColors) {
  //string to json
  // console.log(jsonColors);
  let inputNumber = 1;
  let htmlString = '';
  for (let color of jsonColors) {
    // console.log(color);
    const id = color.id;
    const imageUrl = color.imageUrl;
    const title = color.title;
    const userName = color.userName;
    const numHearts = color.numHearts;
    // console.log(id, imageUrl, title, userName, numHearts);
    htmlString += `<div class="c-grid__item">
                <article class="c-card">
                  <input class="o-hide-accessible js-card" type="checkbox" id="card${inputNumber}" data-colorid="${id}" />
                  <label class="c-label__card" for="card${inputNumber}"></label>
                  <div class="c-card__heart">
                    <input class="o-hide-accessible js-heart-input" type="checkbox" id="heart${inputNumber}"/>
                    <label class="c-label__heart" for="heart${inputNumber}">
                      <svg class="c-icon c-icon-lg c-icon-outlined js-heart-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                          d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                        />
                      </svg>
                    </label>
                  </div>
                  <div class="c-card__body">
                    <img class="c-card__image" src="${imageUrl}" alt="color palette (hier naam van color palette)" />
                    <h1 class="c-card__title">${title}</h1>
                    <div class="c-card__subinfo">
                      <p class="c-card__username">${userName}</p>
                      <div class="c-card__rating" data-star="${numHearts}">
                      </div>
                    </div>
                  </div>
                </article>
              </div>`;
    inputNumber++;
  }
  const colorCards = document.querySelector('.js-cards');
  colorCards.innerHTML = htmlString;
  // console.log(colorCards);
  showStars();
  listeners();
};

const calculateTime = function (datetime) {
  // console.log(datetime);
  // console.log(new Date() - new Date(datetime) / 1000);

  let seconds = Math.floor((new Date() - new Date(datetime)) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  return Math.floor(seconds) + ' seconds ago';
};

const showDetails = function (jsonDetails) {
  const numViews = jsonDetails.numViews;
  const numVotes = jsonDetails.numVotes;
  const numComments = jsonDetails.numComments;
  const arrColors = jsonDetails.colors;
  const title = jsonDetails.title;
  const userName = jsonDetails.userName;
  const datetimeCreated = jsonDetails.dateCreated;
  // console.log(numViews, numVotes, numComments, arrColors, title, userName, datetimeCreated);
  document.querySelector('.js-popup-title').innerHTML = title;
  document.querySelector('.js-popup-username').innerHTML = userName;
  document.querySelector('.js-popup-number-view').innerHTML = numViews;
  document.querySelector('.js-popup-number-like').innerHTML = numVotes;
  document.querySelector('.js-popup-number-comment').innerHTML = numComments;
  document.querySelector('.js-popup-datetime').innerHTML = calculateTime(datetimeCreated);
  const colorList = document.querySelectorAll('.c-color__item');
  let colorNumber = 0;
  for (let color of colorList) {
    // console.log(color);
    color.setAttribute('data-hex', `#${arrColors[colorNumber]}`);
    colorNumber++;
  }
  showColors();
  showBars();
};

const getColors = async function (filter) {
  if (filter == 'all') {
    await getAPI('https://oncolorapi.azurewebsites.net/api/pallets', showData);
  } else if (filter == 'new') {
    await getAPI('https://oncolorapi.azurewebsites.net/api/pallets/new', showData);
  } else if (filter == 'popular') {
    await getAPI('https://oncolorapi.azurewebsites.net/api/pallets/top', showData);
  }
};

const getDetails = function (id) {
  getAPI(`https://oncolorapi.azurewebsites.net/api/pallet/${id}`, showDetails);
};

const getAPI = async function (urlEndpoint, callback) {
  const json = await getData(urlEndpoint);
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
  document.querySelector('.js-cards').innerHTML = '';
  getColors('all');
};

document.addEventListener('DOMContentLoaded', init);
