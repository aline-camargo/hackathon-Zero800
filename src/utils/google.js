const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
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
          $('#myModal').modal('hide');
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

export default loginGoogle;
