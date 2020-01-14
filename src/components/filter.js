import templateCategory from './event-categories';

const filterCategory = () => {
  const db = firebase.firestore().collection('events');
  const arrayType = [];
  const teste = 'Encontro';
  db.where('region', '==', teste)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const docEvent = {
          ...doc.data(),
          id: doc.id,
          position: 0,
        };
        tamanho = arrayType.length + 1;
        arrayType.push(docEvent);
      });
      document.querySelector('main').innerHTML = templateCategory(arrayType[index], type);
    });
};

const showCategory = document.getElementById('select-section');
showCategory.addEventListener('change', () => {
  filterCategory();
});

const type = {
  filterCategory,
};
