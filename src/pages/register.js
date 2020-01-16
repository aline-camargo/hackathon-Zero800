const Register = (e) => {
  e.preventDefault();

  const name = document.querySelector('.nome-input').value;
  const email = document.querySelector('.email-register-input').value;
  const password = document.querySelector('.password-register-input').value;
  const passwordConfirmation = document.querySelector('.confirm-password-input').value;
  const errorMessage = document.querySelector('.error-register');
  if (name === '' || email === '' || password === '') {
    errorMessage.textContent = 'Preencha os campos em branco';
  } else if (password !== passwordConfirmation) {
    errorMessage.textContent = 'Senha não confere';
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.updateProfile({ displayName: name });
        const user = firebase.auth().currentUser;
        if (user != null) {
          firebase.firestore().collection('users').doc(user.uid)
            .set({
              nome: name,
              user_uid: user.uid,
            });
        }
      })
      .then(() => {
        window.location.hash = '';
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/weak-password') errorMessage.textContent = 'A senha deve possuir no mínimo 6 caracteres';
        if (errorCode === 'auth/email-already-in-use') errorMessage.textContent = 'O e-mail informado já está em uso';
        if (errorCode === 'auth/operation-not-allowed') errorMessage.textContent = 'Conta não ativada';
        if (errorCode === 'auth/invalid-email') errorMessage.textContent = 'Email inválido';
      });
  }
};

export default Register;
