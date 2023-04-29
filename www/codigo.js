
Inicio();

function Inicio() {
    Eventos();
    ArmarMenuOpciones();
    Bienvenida();
    CargarInfo();
}

function Eventos() {
    ROUTER.addEventListener('ionRouteDidChange', Navegar)
    document.querySelector("#btnLogin").addEventListener('click', Login);
}

/* ALERT Y LOADING */
const alert = document.createElement('ion-alert');
function presentAlert(header, subHeader, message) {
    alert.header = header;
    alert.subHeader = subHeader;
    alert.message = message;
    alert.buttons = ['OK'];
    document.body.appendChild(alert);
    alert.present();
}

const loading = document.createElement('ion-loading');
function presentLoading(mensaje, duracion, tipoSpinner, opacidad) {

    loading.message = mensaje,
        loading.duration = duracion;
    loading.spinner = tipoSpinner;
    loading.translucent = true;
    loading.cssClass = 'custom-class custom-loading';
    document.body.appendChild(loading);
    loading.present();

    const { role, data } = loading.onDidDismiss();

    console.log('Loading dismissed!');
}


function showLoading() {
    const loading = loadingController.create()({
        message: "Dismissing after 3 second...",
        duration: 3000
    });
    loading.present();
}




/* CARGA PANTALLA BEINVENIDA */
function Bienvenida() {
  
    var apiKey = localStorage.getItem("apikey");
    let option = ""
    if (apiKey) {
        document.querySelector("#msgBienvenida").innerHTML = "";
        
        option += `<ion-item> <ion-button href="/gastos" expand="block">Gastos</ion-button> </ion-item>
            <ion-item> <ion-button href="/ingreso" expand="block">Ingresos</ion-button> </ion-item>
            <ion-item> <ion-button href="/movimientos" expand="block" >Movimientos</ion-button> </ion-item>
            <ion-item> <ion-button href="/totales" expand="block" >Totales</ion-button> </ion-item>
            <ion-item> <ion-button href="/cajeros" expand="block" >Cajeros</ion-button> </ion-item>`
        let bienvenida = document.querySelector("#botonesBienvenida");
        bienvenida.innerHTML = option
    } else {
        let bienvenida = document.querySelector("#botonesBienvenida");
        bienvenida.innerHTML = "";
        document.querySelector("#msgBienvenida").innerHTML = "Registrate o haz login en la aplicación !";
    }
}

function ArmarMenuOpciones() {
    document.querySelector("#menuOpciones").innerHTML = ``;
    var apiKey = localStorage.getItem("apikey");
    if (apiKey) {
        document.querySelector("#menuOpciones").innerHTML = `
        <ion-item href="/" onclick="CerrarMenu()">Home</ion-item>
        <ion-item href="/gastos" onclick="CerrarMenu()">Gasto</ion-item>
        <ion-item href="/ingreso" onclick="CerrarMenu()">Ingreso</ion-item>
        <ion-item href="/movimientos" onclick="CerrarMenu()">Movimientos</ion-item>
        <ion-item href="/totales" onclick="CerrarMenu()">Totales</ion-item>
        <ion-item href="/cajeros" onclick="CerrarMenu()">Cajeros</ion-item>
        <ion-item href="/" onclick="Logout()">Logout</ion-item>`;
    } else {
    //    console.log(apiKey);
        document.querySelector("#menuOpciones").innerHTML = `
        <ion-item href="/" onclick="CerrarMenu()">Home</ion-item>     
        <ion-item href="/login" onclick="CerrarMenu()">Login</ion-item>
        <ion-item href="/registro" onclick="CerrarMenu()">Registro</ion-item>`;
    }
}

function CargarInfo() {
    var apiKey = localStorage.getItem("apikey");
    if (apiKey) {
        CargarIngresos();
        CargarGastos();
        PruebaFetch();
    }
}

/* Navegacion y control de logeo para las pestañas */
function Navegar(evt) {
    OcultarTodo();
    let ruta = evt.detail.to;
    if (ruta == "/") {
        HOME.style.display = "block";
    } else if (ruta == "/login") {
        LOGIN.style.display = "block";
    } else if (ruta == "/registro") {
        REGISTRO.style.display = "block";
    } else if (localStorage.getItem('apikey')){
        if (ruta == "/gastos") {
            GASTO.style.display = "block";
        } else if (ruta == "/ingreso") {
            INGRESO.style.display = "block";
        } else if (ruta == "/movimientos") {
            MOVIMIENTOS.style.display = "block";
            PruebaFetch();
        } else if (ruta == "/totales") {
            TOTALES.style.display = "block";
            calcularTotales();
        } else if (ruta == "/cajeros") {
            CAJEROS.style.display = "block";
            getLocation();
        } 
    } else window.location.replace("index.html#/"); 
}

/* LOGIN */
async function Login() {
    try {
        presentLoading("Iniciando sesion",0,"lines",true);
        let username = document.querySelector("#txtLoginUsername").value;
        let password = document.querySelector("#txtLoginPass").value;
        let l = new LoginDTO(username, password);
        let url = `${URLBASE}/login.php`;
        let param = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(l)
        }
        let sendRequest = await fetch(url, param);
        let response = await sendRequest.json();
        loading.dismiss();
        let logueado = response.apiKey;
        localStorage.setItem('apikey', response.apiKey);
        localStorage.setItem('id', response.id);
        NAV.push('page-home');  // ESTO SE COMPORTA IGUAL QUE APRETAR UN LINK TIPO HREF, UNA ETIQUETA TIPO LINK
        if(logueado){
        ArmarMenuOpciones();
        Bienvenida();
        CargarIngresos();
        } else {
            presentAlert("Login fallido");
        }
      
      console.log(response);
    } catch (error) {
        console.log(error);
    }
}



function Logout() {
    /* localStorage.removeItem('apikey'); CON ESTO SOLO BORRAMOS LA API KEY en vez de borrar todo el local storage*/
    localStorage.clear();
    CerrarMenu();
    Bienvenida();
    ArmarMenuOpciones();
}

function OcultarTodo() {
    HOME.style.display = "none";
    LOGIN.style.display = "none";
    REGISTRO.style.display = "none";
    GASTO.style.display = "none";
    INGRESO.style.display = "none";
    MOVIMIENTOS.style.display = "none";
    TOTALES.style.display = "none";
    CAJEROS.style.display = "none";
}

function CerrarMenu() {
    MENU.close();
}


function Share() {
    Capacitor.Plugins.Share.share({
        title: `Enviar`,
        text: `Descargala!`,
        url: `https://dwallet.develotion.com/site/`,
        dialogTitle: `Gracias !`,
    })
}





