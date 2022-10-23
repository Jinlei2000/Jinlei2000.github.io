const Listeners = function () {
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

  //listen to the click event on the heart icon
  const hearts = document.querySelectorAll('.js-heart');
  for (const heart of hearts) {
    heart.addEventListener('click', function () {
      // console.log('Heart is clicked');
      if (this.querySelector('.js-heart-icon').classList.contains('c-icon-outlined')) {
        console.log('Heart is outlined');
        //change the heart icon to filled heart
        this.innerHTML =
          '<svg class="c-icon c-icon-lg js-heart-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
        this.querySelector('.js-heart-icon').classList.remove('c-icon-outlined');
        //add animation
        this.querySelector('.js-heart-icon').classList.add('u-animation-fill');
      } else {
        console.log('Heart is filled');
        //change the heart icon to outlined heart
        this.innerHTML =
          '<svg class="c-icon c-icon-lg js-heart-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>';
        this.querySelector('.js-heart-icon').classList.add('c-icon-outlined');
        //add animation
        this.querySelector('.js-heart-icon').classList.add('u-animation-outlined');
      }
      //check animationend
      this.querySelector('.js-heart-icon').addEventListener('animationend', function () {
        // console.log('Animation ended');
        //remove animation
        heart.querySelector('.js-heart-icon').classList.remove('u-animation-fill');
        heart.querySelector('.js-heart-icon').classList.remove('u-animation-outlined');
      });
    });
  }
};

const init = function () {
  console.log('App initialized');
  Listeners();
};

document.addEventListener('DOMContentLoaded', init);
