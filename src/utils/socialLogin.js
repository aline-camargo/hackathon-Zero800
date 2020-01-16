const emailLogin = (e) => {
  e.preventDefault();
  const email = document.querySelector('.input-email-login').value;
  const password = document.querySelector('.input-password-login').value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      $('#login-modal').modal('hide');
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

const socialLogin = (provider) => {
  firebase.auth().signInWithPopup(provider)
    .then((currentUser) => {
      const usersCollection = firebase.firestore().collection('users');
      usersCollection.where('user_uid', '==', currentUser.user.uid).get()
        .then((snap) => {
          if (snap.size === 0) {
            usersCollection.get()
              .then(() => {
                const user = {
                  nome: currentUser.user.displayName,
                  user_uid: currentUser.user.uid,
                  id_save: [],
                };
                firebase.firestore().collection('users').add(user);
              });
          }
        })
        .then(() => {
          $('#login-modal').modal('hide');
        })
        .catch(() => {
          Toastify({
            text: 'Erro na autenticação.',
            duration: 3000,
            gravity: 'top',
            position: 'center',
            backgroundColor: '#d32f2f',
            className: 'danger',
          }).showToast();
        });
    });
};

const login = {
  socialLogin,
  emailLogin,
};

export default login;
