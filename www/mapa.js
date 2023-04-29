

let lat = null;
let long = null;
var map = null;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarUbicacion);
        console.log(navigator.geolocation, "CONSOLE LOG")
    } else {
        console.log("Dispositivo no soporta gps")
    }
}

function mostrarUbicacion(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    setTimeout(function(){CrearMapa()}, 3000);
}


function CrearMapa() {
    map = L.map('map').setView([-34.904612, -56.187003], 17);
    cargarCajeros(); 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 5,
    }).addTo(map);
}

async function cargarCajeros() {
    try {
        let url = `${URLBASE}/cajeros.php`;
        let param = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
        let sendRequest = await fetch(url, param);
        let response = await sendRequest.json();
        console.log(response)
        response.cajeros.forEach(cajero => {
            onMapClick(cajero)
        });
    } catch (error) {
        console.log(error);
    }
}

function onMapClick(e) {
    let disponibilidad = "Sin dinero disponible"
    let deposito = "No recbie depositos"
    if (e.deposito != 0) {
        deposito = "Recibe deposito"
    }
    if (e.disponibilidad != 0) {
        disponibilidad = "Tiene dinero"
    }
    L.marker([e.latitud, e.longitud]).addTo(map).bindPopup(`<strong>Cajero id: ${e.idCajero}</strong>${disponibilidad} - ${deposito}<span> </span>`);
}
