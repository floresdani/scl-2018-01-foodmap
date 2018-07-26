window.onload = (() => {
  const ppalView = document.getElementById('principalView');
  const splashView = document.getElementById('splash');

  setTimeout(function hide() {
    ('splash');
    splashView.style.display = 'none';
    ppalView.style.display = 'block';
  }, 3000);

  initMap();
 });

// Definiendo variables
let map;
let infowindow;
let x = document.getElementById("demo");
// Iniciar el mapa de Google
function initMap() {
  // Creamos un mapa con las coordenadas actuales
  navigator.geolocation.getCurrentPosition(function (pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    // Variable con mi posición (latitud y longitud)
    let myPosition = new google.maps.LatLng(lat, lon);
    // Opciones de mapa
    let mapOptions = {
      center: myPosition,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.MAP
    };

    map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

    // Creamos el infowindow
    infowindow = new google.maps.InfoWindow();

    // Especifica localización, radio y tipo de lugares que queremos obtener
    let request = {
      location: myPosition,
      radius: 5000,
      types: ['restaurant'],
    };

    // Crear servicio "PlaceService" y enviar petición.
    let service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          crearMarcador(results[i]);
        }
      }
    });
  });
}

function crearMarcador(place) {
  // Crear marcador
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  // Asignar evento click del marcador
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
// Obtener localización en Zomato widget
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
// Mostrar posición
function showPosition(position) {
  let latitud = position.coords.latitude;
  let longitud = position.coords.longitude;
  const widget = document.getElementById('zomatoWidget');
  widget.src = `https://www.zomato.com/widgets/res_search_widget.php?lat=${latitud}lon=${longitud}&theme=red&sort=distance`;
  x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

