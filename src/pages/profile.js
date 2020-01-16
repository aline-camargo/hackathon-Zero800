const profile = (name, url) => {
  const template = `
      <div class="d-flex flex-column align-items-center mb-4">
        <img class="img-profile mb-3 p-1 rounded-circle" src=${url} />
        <h2 class="name-user">${name}</h2>
        <div class="input-group w-75">
          <div class="custom-file">
            <input type="file" class="custom-file-input file" id="file-input" aria-describedby="inputGroupFileAddon04">
            <label class="custom-file-label rounded-sm" for="file-input">Choose file</label>
          </div>
          <button class="btn btn-primary btn-block entry my-2" type="button" id="add-foto">Editar foto de perfil</button>
        </div>
        <button class="w-75 btn btn-primary btn-block entry logout my-1" type="button">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
  `;
  return template;
};

const addPhoto = () => {
  const user = firebase.auth().currentUser.uid;
  const foto = document.querySelector('#file-input');

  if (foto.files[0] === undefined) {
    Toastify({
      text: 'Nenhuma imagem selecionada.',
      duration: 3000,
      gravity: 'top',
      position: 'center',
      backgroundColor: '#d32f2f',
      className: 'danger',
    }).showToast();
  } else {
    firebase
      .storage()
      .ref(`users/${user}.png`)
      .put(foto.files[0])
      .then(() => {
        Toastify({
          text: 'Foto atualizada com sucesso.',
          duration: 3000,
          gravity: 'top',
          position: 'center',
          backgroundColor: 'green',
          className: 'success',
        }).showToast();
        foto.value = '';
      })
      .catch((err) => {
        Toastify({
          text: `Erro no upload da imagem. ${err.code}`,
          duration: 3000,
          gravity: 'top',
          position: 'center',
          backgroundColor: '#d32f2f',
          className: 'danger',
        }).showToast();
      });
  }
};

const getUser = () => {
  const main = document.querySelector('main');
  const user = firebase.auth().currentUser;
  document.querySelector('.container-category').innerHTML = '';
  document.querySelectorAll('.arrow').forEach((arrow) => arrow.classList.add('hide'));

  firebase
    .storage()
    .ref('users')
    .child(`${user.uid}.png`)
    .getDownloadURL()
    .then((url) => {
      main.innerHTML = profile(user.displayName, url);
    })
    .then(() => {
      document.querySelector('.logout').addEventListener('click', () => {
        firebase.auth().signOut()
          .then(window.location.hash = '');
      });

      document.querySelector('#add-foto').addEventListener('click', addPhoto);
    });
};


export default getUser;
