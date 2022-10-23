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
};

const init = function () {
  console.log('App initialized');
  Listeners();
};

document.addEventListener('DOMContentLoaded', init);
