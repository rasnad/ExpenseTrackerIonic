

async function BorrarMovimiento(idMovimiento) {
    try {
        let url = `${URLBASE}/movimientos.php`;
        var raw = JSON.stringify({
            "idMovimiento": idMovimiento,
        });
        let param = {
            method: "DELETE",
            headers: { "Content-Type": "application/json", apikey: localStorage.getItem('apikey') },
            body: raw
        }
        let sendRequest = await fetch(url, param);
        let response = await sendRequest.json();
        console.log(response);
        PruebaFetch();
    } catch (error) {
        console.log(error);
    }
}

function PruebaFetch(){
    CargarMovimientos().then(r=>{
        console.log(r, "CONSOLE LOG R");

        const response = Object(r.movimientos);
        array = response;   
        let option = ""

        document.querySelector("#btnFiltroMovimientos").addEventListener("click", cambiarFiltro);
        let filtroValue = document.querySelector("#slcFiltroMovimientos").value;
        function cambiarFiltro() {
            filtroValue = filtroValue;
            CargarMovimientos();    
        }
        array.forEach(e => {
            let nombreMovimiento = rubros.find(w => w.id == e.categoria);
            if (filtroValue == 0) {
                if (nombreMovimiento.tipo == "gasto") {
                    option += `<ion-item> <ion-label color="danger">$ ${e.total} <strong>Concepto:</strong> ${e.concepto}</label> </ion-item>  
                    <ion-item><ion-label><strong>Date</strong>:${e.fecha} - ${e.medio}</ion-label></ion-item> 
                    <ion-item><ion-label><strong>Categoria:</strong> ${nombreMovimiento.nombre}</ion-label><ion-button id=${e.id} onclick="BorrarMovimiento(id)" shape="round" color="danger">Eliminar</ion-button></ion-item>`
                } else {
                    option += `<ion-item> <ion-label color="secondary">$ ${e.total} <strong>Concepto:</strong> ${e.concepto}</label> </ion-item>  
                    <ion-item><ion-label><strong>Date</strong>:${e.fecha} - ${e.medio}</ion-label></ion-item> 
                    <ion-item><ion-label><strong>Categoria:</strong> ${nombreMovimiento.nombre}</ion-label><ion-button id=${e.id} onclick="BorrarMovimiento(id)" shape="round" color="danger">Eliminar</ion-button></ion-item>`
                }
            } else if (filtroValue == 1) {
                if (nombreMovimiento.tipo == "gasto") {
                    option += `<ion-item> <ion-label color="danger">$ ${e.total} <strong>Concepto:</strong> ${e.concepto}</label> </ion-item>  
                    <ion-item><ion-label><strong>Date</strong>:${e.fecha} - ${e.medio}</ion-label></ion-item> 
                    <ion-item><ion-label><strong>Categoria:</strong> ${nombreMovimiento.nombre}</ion-label><ion-button id=${e.id} onclick="BorrarMovimiento(id)" shape="round" color="danger">Eliminar</ion-button></ion-item>`
                }
            } else {
                if (nombreMovimiento.tipo == "ingreso") {
                    option += `<ion-item> <ion-label color="secondary">$ ${e.total} <strong>Concepto:</strong> ${e.concepto}</label> </ion-item>  
                    <ion-item><ion-label><strong>Date</strong>:${e.fecha} - ${e.medio}</ion-label></ion-item> 
                    <ion-item><ion-label><strong>Categoria:</strong> ${nombreMovimiento.nombre}</ion-label><ion-button id=${e.id} onclick="BorrarMovimiento(id)" shape="round" color="danger">Eliminar</ion-button></ion-item>`
                }
            }
        });

        let movimiento = document.querySelector("#listaMovimientos");
        movimiento.innerHTML = option
    })
}

async function CargarMovimientos() {
    try {
        let url = `${URLBASE}/movimientos.php?idUsuario=${localStorage.getItem("id")}`;
        let param = {
            method: "GET",
            headers: { "Content-Type": "application/json", apikey: localStorage.getItem('apikey') },
        }
        // let apikey = localStorage.getItem('apikey');
        let sendRequest = await fetch(url, param);
        let response = await sendRequest.json();
    
        return response;

    } catch (error) {
        console.log(error);
    }

}

function calcularTotales(){
    CargarMovimientos().then(r=>{
       
        const response = Object(r.movimientos);
        array = response; 

        function calcularTotalGasto(totalGasto) {
            // console.log(totalGasto);
            return totalGasto;
        }
        
        function calcularTotalIngreso(totalIngreso) {
            //console.log(totalIngreso);
            return totalIngreso;
        }
        
        totalesCargar();    
        function totalesCargar() {
            let totalGasto = 0;
            array.forEach(element => {
                let nombreMovimiento = rubros.find(w => w.id == element.categoria);
                if (nombreMovimiento.tipo == "gasto") {
                    totalGasto += element.total;
                }
            });
        
            let totalIngreso = 0;
            array.forEach(element => {
                let nombreMovimiento = rubros.find(w => w.id == element.categoria);
                if (nombreMovimiento.tipo == "ingreso") {
                    totalIngreso += element.total;
                }
            });
        
            function calcularTotal() {
                let total = calcularTotalGasto(totalGasto) + calcularTotalIngreso(totalIngreso);;
                //   console.log(total)
                return total;
            }
        
            document.querySelector("#gastosResumen").innerHTML = `<b style="color:red;">Gastos:  </b>${calcularTotalGasto(totalGasto)}`
            document.querySelector("#ingresosResumen").innerHTML = `<b style="color:green;">Ingresos:  </b>${calcularTotalIngreso(totalIngreso)}`
            document.querySelector("#totalResumen").innerHTML = `<b style="color:primary;">Balance:</b>  ${calcularTotal()}`
        } 
    })
}

