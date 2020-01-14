import favoritesTemplate from '../components/saved-card.js';

const getFavorites = () => {
  const main = document.querySelector('main');
  const user = firebase.auth().currentUser.uid;
  document.querySelector('.container-category').innerHTML = '';
  main.innerHTML = '';
  document.querySelectorAll('.arrow').forEach((arrow) => arrow.classList.add('hide'));

  firebase
    .firestore()
    .collection('users')
    .where('user_uid', '==', user)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.data().id_save.forEach((ref) => {
          firebase.firestore().collection('events')
            .doc(ref)
            .get()
            .then((querySnapshot2) => {
              const docEvent = {
                ...querySnapshot2.data(),
                id: querySnapshot2.id,
              };
              main.innerHTML += favoritesTemplate(docEvent);
            });
        });
      });
    });
};

window.favorites = {
  handleClick: (event, callBack) => {
    callBack(event.currentTarget);
  },
};

export default getFavorites;
