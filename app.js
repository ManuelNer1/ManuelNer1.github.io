// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDL63WEg7R98C5567DCBfGZhNm-JYKnUfU",
    authDomain: "tulopides.firebaseapp.com",
    projectId: "tulopides",
  });
  var db = firebase.firestore();
  //FUNCION PARA BUSCARTE ES DECIR OCUPO EL GOOGLE MAPS
  function findMe(){
    var output = document.getElementById('map');
    //VERIFICO SI MI CLIENTE PUEDE SOPORTAR GEOLOCALIZACION
        if(navigator.geolocation){
            output.innerHTML="<p>Tu navegador soporta localizacion</p>";
        }else{
            output.innerHTML="<p>Tu navegador NO soporta localizacion</p>";}

// OBTENGO LA LATITUD Y LONGITUD
function localizacion(posicion){
        var latitude = posicion.coords.latitude;
        var longitude = posicion.coords.longitude;
        var imgURL="https://maps.googleapis.com/maps/api/staticmap?center="+latitude+","+longitude+"&size=600x300&markers=color:red%7C"+latitude+","+longitude+"&key=AIzaSyDL63WEg7R98C5567DCBfGZhNm-JYKnUfU";
        
        output.innerHTML="<img src='"+imgURL+"'>";
        //output.innerHTML ="<p> Latitude :"+latitude+"<br>Longitude :"+longitude+"<p>"; 
    }

function error(){
    output.innerHTML="<p>NO se pudo obtener tu ubicacion</p>";
    }
    navigator.geolocation.getCurrentPosition(localizacion,error);
} 

//FUNCION PARA COMPARTIR LA UBICACION A MI BASE DE DATOS
function shareMe(){
    var output = document.getElementById('map');
        // OBTENGO LA LATITUD Y LONGITUD
        function localizacion(posicion){
            var latitude = posicion.coords.latitude;
            var longitude = posicion.coords.longitude;
            var pedido = document.getElementById('pedidomamon').value;
            var celular = document.getElementById('cel').value;

            db.collection("users").add({
                local: empresa,
                celular: celular,
                pedido: pedido,
                latitude: latitude,
                longitude: longitude
              })
            
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            
            .catch(function(error) {
                console.error("Error adding document: ", error);
              });
        ; 
        }
        function error(){
            output.innerHTML="<p>NO se pudo compartir  tu ubicacion</p>";
        }
            navigator.geolocation.getCurrentPosition(localizacion,error);
}                