import funcs from './pages/home.js';
import getUser from './pages/profile.js';
import Info from './pages/info.js';
import getMoreEvent from './pages/moreinfoevent.js';
import loginGoogle from './utils/google.js';
import loginFacebook from './utils/facebook.js';
import getFavorites from './pages/favorites.js';
import registerPage from './pages/register.js';

const main = document.querySelector('main');

function init() {
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
  } else if (window.location.hash === '#register') {
    registerPage();
  } else {
    main.innerHTML = getMoreEvent(window.location.hash);
  }
}


window.addEventListener('hashchange', init);
window.addEventListener('load', init);

document.querySelectorAll('.home').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.hash = '';
    const selected = document.querySelectorAll('.selected')
    selected.forEach(btn => btn.classList.remove('selected'))
    btn.classList.add('selected');
  });
});

document.querySelectorAll('.info').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    window.location.hash = 'info';
    const selected = document.querySelectorAll('.selected')
    selected.forEach(btn => btn.classList.remove('selected'))
    btn.classList.add('selected');
  });
});

const signIn = (e) => {
  e.preventDefault();
  const email = document.querySelector('.input-email-login').value;
  const password = document.querySelector('.input-password-login').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      $('#myModal').modal('hide');
      window.location.hash = 'profile';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = document.querySelector('.error');
      if (errorCode === 'auth/invalid-email') errorMessage.textContent = 'Email inválido';
      if (errorCode === 'auth/user-disabled') errorMessage.textContent = 'Usuário desabilitado';
      if (errorCode === 'auth/user-not-found') errorMessage.textContent = 'Usuário não encontrado';
      if (errorCode === 'auth/wrong-password') errorMessage.textContent = 'Senha incorreta';
    });
};

document.querySelectorAll('.login').forEach((element) => {
  element.addEventListener('click', (event) => {
    if (firebase.auth().currentUser == null) {
      $('#small-modal').modal('hide');
      $('#myModal').modal('show');  
    } else {
      window.location.hash = event.currentTarget.id;
      const selected = document.querySelectorAll('.selected')
      selected.forEach(btn => btn.classList.remove('selected'))
      element.classList.add('selected');
    }
  });
});

const register = () => {
  window.location.hash = 'register';
};

const googleBtn = document.querySelector('.google-login');
googleBtn.addEventListener('click', loginGoogle);

const facebookBtn = document.querySelector('.facebook-login');
facebookBtn.addEventListener('click', loginFacebook);

const loginBtn = document.querySelector('.btn-submit-login');
loginBtn.addEventListener('click', signIn);

document.querySelectorAll('.register').forEach((element) => {
  element.addEventListener('click', register);
})
