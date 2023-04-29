


document.querySelector("#btnIngreso").addEventListener('click', registrarIngreso);
var rubros = [];

async function registrarIngreso() {

    let concepto = document.querySelector("#txtIngresoConcepto").value;
    let categoria = document.querySelector("#slcRubroIngreso").value;
    let total = document.querySelector("#txtIngresoMonto").value;
    let medio = document.querySelector("#slcMedioIngreso").value;
    let fecha = document.querySelector("#fechaIngreso").value;
    let fechaFormat = document.querySelector("#fechaIngreso").value;
    if(fecha == undefined){
        presentAlert("Gastos", "Error en carga", "Compruebe sus datos");
    } else {
        fechaFormat = fechaFormat.substring(0, 10);
    }

    try {

        let url = `${URLBASE}/movimientos.php`;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("apikey", `${localStorage.getItem('apikey')}`);


        var raw = JSON.stringify({
            "idUsuario": localStorage.getItem("id"),
            "concepto": concepto,
            "categoria": categoria,
            "total": total,
            "medio": medio,
            "fecha": fechaFormat
        });


        let param = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        if (concepto == "" || categoria == "" || total == "" || medio == "" || fecha == undefined) {
            presentAlert("Gastos", "Error en carga", "Compruebe sus datos");
        } else {
            presentLoading("Agregando Ingreso", 0, "lines", true);
            let sendRequest = await fetch(url, param);
            let response = await sendRequest.json();
            console.log(response)
            loading.dismiss();
        }

    } catch (error) {
        console.log(error);
    }


}

async function CargarIngresos() {
    try {

        let url = `${URLBASE}/rubros.php`;
        let param = {
            method: "GET",
            headers: { "Content-Type": "application/json", apikey: localStorage.getItem('apikey') },
        }
        let sendRequest = await fetch(url, param);
        let response = await sendRequest.json();

        let option = "";
        const responselength = Object.keys(response.rubros).length;
        const response2 = Object(response.rubros);
        var array = [];
        var arrayCategoria = [];
        response2.forEach(function (response2) {
            if (response2.tipo == "ingreso") {
                array.push([response2]);
            }
        });
        rubros = response2;
        console.log(rubros);
        for (let i in array) {
            option += `<ion-select-option value="${array[i].find(function (element) { return element.hasOwnProperty("id"); }).id} "
        >  ${array[i].find(function (element) { return element.hasOwnProperty("nombre"); }).nombre} </ion-select-option>`
        }

        let slc = document.querySelector("#slcRubroIngreso");
        slc.innerHTML = option;

    } catch (error) {
        console.log(error);
    }
}