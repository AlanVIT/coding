
// Simulador

// Definiciones
let total = 0
let productosAgregados = []
let month = parseInt(new Date().getMonth()) + 1
let day = new Date().getUTCDate()
let year = new Date().getUTCFullYear()
let nombrePersona = prompt("Como te llamas?")
if (nombrePersona == ''|| nombrePersona == null){
    console.warn("Algo me suena raro... Se llama null o acaso no tiene nombre?")
    if (confirm("Quiere cambiar el nombre que puso o realmente se llama null?")){
        nombrePersona = prompt("Como te llamas realmente?")
    }
}
document.getElementById('total').innerHTML = total
let saludos = [
    "Bienvenido a nuestro E-comerce " + nombrePersona,
    "Esperamos que disfrute su experiencia",
    "Como esta? " + nombrePersona + " bienvenido!"
]
const date = month+"-"+day+"-"+ year

class articulo{
    constructor(nombre ,precio){
    this.nombre = nombre
    this.precio = precio
    }
}
class compras{
    constructor(nombre ,precio, fecha){
    this.nombre = nombre
    this.precio = precio
    this.fecha = fecha
    }
}
  let productos = [
    
    new articulo("Procesador I3 10 gen", 1000),
    new articulo("Procesador I5 11 gen", 2000),
    new articulo("Procesador I7 10 gen", 3500),
    new articulo("Procesador Ryzen7 11 gen", 5000),
    new articulo("Procesador I9 10 gen", 10000),
    new articulo("Procesador Ryzen9 11 gen", 25000),
    
]
// _______________________________

// Funciones
function agregarAlCarro(index){
   productosAgregados.push(productos[index].nombre)
   total = total + productos[index].precio
   if(total >= 50000){
    document.getElementById('total').innerHTML = total*0.9
   }
   else{
    document.getElementById('total').innerHTML = total
   }
   console.log("Acaba de agregar", productos[index].nombre, "Que vale", productos[index].precio)
}

function carro(){
    if(total !=0){
        if(total >= 50000){
            var totalcd = total - (total*0.10)
            console.log("En total deberia pagar:", totalcd,"el descuento es ", total*0.10 , " y va a llevar:")
        }
        else{
            var totalcd = total
            console.log("En total deberia pagar:", total, " y va a llevar:")
        }
        console.table(productosAgregados)
        let comprar = confirm("Lo quiere comprar?")
        if(comprar == true){
            alert("Comprando...")
            alert("espere un segundo...")
            alert("Comprado!")
            let recipt = confirm("quiere recibo?")
            if (recipt == true) {
                let compra = new compras(nombrePersona, totalcd, date)
                console.log('info compra ',compra)
            }
            else{
                console.log("Ok, no le daremos recibo")
            }
            totalcd = 0
            productosAgregados = []
            total = 0
        }
        else{
            let numRandom = parseInt(Math.random()*3)
            if(numRandom == 0){
            console.log("Ok, tomese su tiempo " + nombrePersona)
            }
            if(numRandom == 1){
                console.log("Decida tranquilo y bien " + nombrePersona)
            }
            if(numRandom == 2){
                console.log("Nadie lo apura, tiene todo el tiempo que usted quiera. "+ nombrePersona+ " Decida bien")
            }        
        }
    }
    else{
        alert("Usted no compro nada, seleccione algun producto.")
    }

}


function buscador(){
    let buscado = prompt("que esta buscando?")
    buscado = buscado.toUpperCase()
    const resultado = productos.filter((el) => el.nombre.toUpperCase().includes(buscado))
    console.table(resultado)
}

function bienvenida(){

    let numRandom = parseInt(Math.random()*3)
    document.getElementById("h2").innerHTML = saludos[numRandom]

}
bienvenida()
// ---------

