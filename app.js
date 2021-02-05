// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDL63WEg7R98C5567DCBfGZhNm-JYKnUfU",
    authDomain: "tulopides.firebaseapp.com",
    projectId: "tulopides",
  });
  var db = firebase.firestore();
  //FUNCION PARA BUSCARTE ES DECIR OCUPO EL GOOGLE MAPS
  
  function findMe(){
        let map;
		let marker;
		let watchID;
        let geoLoc;
        initMap();

		function initMap(){
			const myLatLng = {lat: 20.055805, lng: -99.342138};
			map = new google.maps.Map(document.getElementById("map"), {
				zoom: 15,
				center: myLatLng,
			});
			marker = new google.maps.Marker({
				position: myLatLng,map,
				title: "Hola mundo"
			});
			gePosition();
		}

		function gePosition()
		{
			if(navigator.geolocation){
				var options = {timeout:100000000};
				geoLoc = navigator.geolocation;
				watchID = geoLoc.watchPosition(showLocationOnMap, errorHandler, options);
			}else{
				alert("Lo sentimos, el explorador no soporta geolocalizacion");
			}
		}

		function showLocationOnMap(position){
			var latitud = position.coords.latitude;
			var longitud = position.coords.longitude;
			console.log("latitud : "+latitud+ "Longitud : "+longitud);

			const myLatLng= {lat:latitud, lng:longitud};
			marker.setPosition(myLatLng);
			map.setCenter(myLatLng)
		}

		function errorHandler(err){
			if(err.code == 1){
				alert("Error: Acceso denegado!");
			}else if(err.code == 2){
				alert("Error: Position no existe o no se encuentra");
			}
        }
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
                document.getElementById("pedidomamon").value="";
                document.getElementById("cel").value="";
                alert("RECIBIMOS SU PEDIDO, EN UN MOMENTO SERA ENTREGADO");
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
