//----Buscador de multiplos, divisores y numeros primos---

// let limite = parseInt(prompt("ingresa un numero"))

// var arr = []
// for (let i = 0; i < limite; i++) {
//     if(parseInt(limite/(i+1))===limite/(i+1)){
//         console.warn("este si es un divisor", i+1)
//         arr.push(i+1)
//         continue
//     }
//     console.error(i+1, "no es un divisor")
// }
// if(arr.length===2){
//     console.log("ES PRIMO!!")
// }
// else{
//     console.log("No es un numero primo")
// }
// let seguir = confirm("Queres un multiplo?") 
// let fct = 1
// while (seguir) {
//     console.log(limite*fct)
//     seguir = confirm("otro?")
//     fct++ 
// }

//__________________________________________________________________________

// Simulador

// Definiciones
let total = 0
let productosAgregados = []
let month = parseInt(new Date().getMonth()) + 1
let day = new Date().getUTCDate()
let year = new Date().getUTCFullYear()
const date = month+"-"+day+"-"+ year
const nombrePersona = prompt("Como te llamas?")
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
// _______________________________

// Funciones
function sumarValor(valor, producto){
    total = total + valor
    productosAgregados.push(producto)
}

function carro(){
    if(total !=0){
    if(total >= 10000){
        let totalcd = total - (total*0.10)
        console.log("En total deberia pagar:", totalcd,"el descuento es ", total*0.10 , " y va a llevar:", productosAgregados)
        let comprar = confirm("Lo quiere comprar?")
        if(comprar == true){
            totalcd = 0
            productosAgregados = []
            alert("Comprando...")
            alert("espere un segundo...")
            alert("Comprado!")
            // new compras(nombrePersona, total, new Date().getDate())
            let recipt = confirm("quiere recivo?")
            if (recipt == true) {
                const compra = new compras(nombrePersona, total, date)
                console.log('info compra ',compra)
            }
            total = 0
        }
        total = 0

    }
    else{
        console.log("En total deberia pagar:", total, " y va a llevar:", productosAgregados)
        let comprar = confirm("Lo quiere comprar?")
        if(comprar == true){
            productosAgregados = []
            alert("Comprando...")
            alert("espere un segundo...")
            alert("Comprado!")
            let recipt = confirm("quiere recivo?")
            if (recipt == true) {
                const compra = new compras(nombrePersona, total, date)
                console.log('info compra ',compra)
            }
            total = 0
        }
        total = 0
    } 
    }
    else{
        alert("Usted no compro nada, seleccione algun producto.")
    }

}

// ---------