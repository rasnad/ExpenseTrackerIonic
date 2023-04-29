
const URLBASE = "https://dwallet.develotion.com";
class Usuario{
    constructor(username, password, departamento, ciudad){
        this.username = username;
        this.password = password;
        this.departamento = departamento;
        this.ciudad = ciudad;
    }
}

class BodyGasto{
    constructor(idUsuario, concepto, categoria, total, medio, fecha){
        this.idUsuario = idUsuario;
        this.concepto = concepto;
        this.categoria = categoria;
        this.total = total;
        this.medio = medio;
        this.fecha = fecha;
    }
}

class Gasto{
    constructor(concepto, monto, rubro, medio, fecha){
        this.concepto = concepto;
        this.monto = monto;
        this.rubro = rubro;
        this.medio = medio;
        this.fecha = fecha;
    }
}


class LoginDTO{ // DTO data transfer object.
    constructor(e, p){
        this.usuario = e;
        this.password = p;
    }
}

const MENU = document.querySelector("#menu");
const ROUTER = document.querySelector("#ruteo");
const HOME = document.querySelector("#pantalla-home");
const REGISTRO = document.querySelector("#pantalla-registro");
const LOGIN = document.querySelector("#pantalla-login");
const GASTO= document.querySelector("#pantalla-gasto");
const INGRESO= document.querySelector("#pantalla-ingreso");
const MOVIMIENTOS = document.querySelector("#pantalla-movimientos");
const TOTALES = document.querySelector("#pantalla-totales");
const CAJEROS = document.querySelector("#pantalla-cajeros");
const NAV = document.querySelector("ion-nav") // Lo llamamos por la etiqueta ion-nav y no por el id ya que ion-nav solo hay una en el html
