// Definiendo variables
let map;
let infowindow;
var x = document.getElementById("demo");

function initMap() {
    // Creamos un mapa con las coordenadas actuales
      navigator.geolocation.getCurrentPosition(function(pos) {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;
   
      let myLatlng = new google.maps.LatLng(lat, lon);
   
      let mapOptions = {
        center: myLatlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.MAP
      };
   
      map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
   
      // Creamos el infowindow
      infowindow = new google.maps.InfoWindow();
   
      // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
      let request = {
        location: myLatlng,
        radius: 5000,
        types: ['restaurant'],
      };
   
      // Creamos el servicio PlaceService y enviamos la petición.
      let service = new google.maps.places.PlacesService(map);
   
      service.nearbySearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            crearMarcador(results[i]);
          }
        }
      });
    });
   }
   
    function crearMarcador(place) {
      // Creamos un marcador
      let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
      });
   
    // Asignamos el evento click del marcador
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
      }

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
  let latitud = position.coords.latitude;
  let longitud = position.coords.longitude;
  const widget = document.getElementById('zomatoWidget');
  widget.src=`https://www.zomato.com/widgets/res_search_widget.php?lat=${latitud}lon=${longitud}&theme=red&sort=distance`;
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
}

