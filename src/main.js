import funcs from './pages/home.js';
import getUser from './pages/profile.js';
import Info from './pages/info.js';
import getMoreEvent from './pages/moreinfoevent.js';
import getFavorites from './pages/favorites.js';
import login from './utils/socialLogin.js';
import Register from './pages/register.js';

const main = document.querySelector('main');

const init = () => {
  if (window.location.hash === '#profile') {
    getUser();
  } else if (window.location.hash === '#info') {
    main.innerHTML = Info();
  } else if (window.location.hash === '') {
    funcs.getEvents();
  } else if (window.location.hash === '#saibamais') {
    main.innerHTML = funcs.moreInfo();
  } else if (window.location.hash.includes('Tipo')) {
    funcs.getCategory('type', window.location.hash);
  } else if (window.location.hash.includes('Regiao')) {
    funcs.getCategory('region', window.location.hash);
  } else if (window.location.hash === '#salvos') {
    getFavorites();
  } else {
    main.innerHTML = getMoreEvent(window.location.hash);
  }
};

window.addEventListener('hashchange', init);
window.addEventListener('load', init);

document.querySelectorAll('.home').forEach((element) => {
  element.addEventListener('click', () => {
    window.location.hash = '';
    const selected = document.querySelectorAll('.selected');
    selected.forEach((btn) => btn.classList.remove('selected'));
    element.classList.add('selected');
  });
});

document.querySelectorAll('.info').forEach((element) => {
  element.addEventListener('click', () => {
    window.location.hash = 'info';
    const selected = document.querySelectorAll('.selected');
    selected.forEach((btn) => btn.classList.remove('selected'));
    element.classList.add('selected');
  });
});

document.querySelectorAll('.login').forEach((element) => {
  element.addEventListener('click', (event) => {
    if (firebase.auth().currentUser == null) {
      $('#small-modal').modal('hide');
      $('#login-modal').modal('show');
    } else {
      window.location.hash = event.currentTarget.id;
      const selected = document.querySelectorAll('.selected');
      selected.forEach((btn) => btn.classList.remove('selected'));
      element.classList.add('selected');
    }
  });
});

const googleBtn = document.querySelector('.google-login');
googleBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  login.socialLogin(provider);
});

const facebookBtn = document.querySelector('.facebook-login');
facebookBtn.addEventListener('click', () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  login.socialLogin(provider);
});

const loginBtn = document.querySelector('.btn-submit-login');
loginBtn.addEventListener('click', () => login.emailLogin);

document.querySelector('.register-btn').addEventListener('click', (e) => {
  Register(e);
});

document.querySelectorAll('.register').forEach((element) => {
  element.addEventListener('click', () => {
    $('#login-modal').modal('hide');
    $('#register-modal').modal('show');
  });
});
