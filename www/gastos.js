
document.querySelector("#btnGasto").addEventListener('click', registrarGasto);

async function registrarGasto() {

    let concepto = document.querySelector("#txtGastoConcepto").value;
    let total = document.querySelector("#slcRubro").value;
    let medio = document.querySelector("#slcMedioGasto").value;
    let fecha = document.querySelector("#fechaGasto").value;
    let monto = document.querySelector("#GastoMonto").value * -1;
    let fechaFormat = document.querySelector("#fechaGasto").value;
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
            "categoria": total,
            "total": monto,
            "medio": medio,
            "fecha": fechaFormat
        });

        let param = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }
        
        if (concepto == ""|| total == "" || medio == "" || fecha == undefined|| monto == "") {
            presentAlert("Gastos", "Error en carga", "Compruebe sus datos");
        } else {
            presentLoading("Agregando Gasto", 0, "lines", true);
            let sendRequest = await fetch(url, param);
            let response = await sendRequest.json();
            console.log(response)
            loading.dismiss();
        }
    } catch (error) {
        console.log(error);
    }
}



async function CargarGastos() {
    console.log("Cargar gastos")
    try {
        let url = `${URLBASE}/rubros.php`;
        let param = {
            method: "GET",
            headers: { "Content-Type": "application/json", apikey: localStorage.getItem('apikey') },
        }
        let sendRequest = await fetch(url, param);
        let response = await sendRequest.json();
        let option = "";
        //const responselength = Object.keys(response.rubros).length;
        const response2 = Object(response.rubros);
        var array = [];
        // console.log(response)
        //console.log(response2)
        response2.forEach(function (response2) {
            if (response2.tipo == "gasto") {
                array.push([response2]);
                //array.push([response2.nombre]);

            }
        });

        for (let i in array) {
            option += `<ion-select-option value="${array[i].find(function (element) { return element.hasOwnProperty("id"); }).id}"
        >  ${array[i].find(function (element) { return element.hasOwnProperty("nombre"); }).nombre} </ion-select-option>`
        }


        let slc = document.querySelector("#slcRubro");
        slc.innerHTML = option;
    } catch (error) {
        console.log(error);
    }
}