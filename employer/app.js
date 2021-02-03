// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDL63WEg7R98C5567DCBfGZhNm-JYKnUfU",
  authDomain: "tulopides.firebaseapp.com",
  projectId: "tulopides",
});

var db = firebase.firestore();
//Introduce datos a la base de datos
function guardar(){
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var fecha = document.getElementById('fecha').value;

  db.collection("users").add({
    first: nombre,
    last: apellido,
    born: fecha
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('fecha').value = '';
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}
//Lee datos de la base de datos
var tabla = document.getElementById('tabla')
db.collection("users").onSnapshot((querySnapshot) => {
  tabla.innerHTML = '';
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().first}`);
      tabla.innerHTML += `
              <tr>
                <th scope="row">${doc.data().local}</th>
                <td>${doc.data().celular}</td>
                <td>${doc.data().pedido}</td>
                <td>https://www.google.es/maps?q=
                ${doc.data().latitude},${doc.data().longitude}</td>
              </tr>
      `
  });
});
