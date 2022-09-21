//Definiciones
let nombrePersona = localStorage.getItem("Nombre")

let month = parseInt(new Date().getMonth()) + 1
let day = new Date().getUTCDate()
let year = new Date().getUTCFullYear()
const date = month+"-"+day+"-"+ year

let productosCarrito = JSON.parse(localStorage.getItem("Productos"))
let precio = JSON.parse(localStorage.getItem("Precio"))

let prd = document.getElementById("productosCarro")
let tablaLs = document.getElementById("tabla")

let comprar = document.getElementById("comprar")
comprar.addEventListener("click", carro)

let recibos = document.querySelector("#recibos")

//Funciones
function ponerProductos(){
    let filas
    productosCarrito.sort()
    productosCarrito.forEach(producto =>{        
        let prod = `<div class="card" style="width: 180px;height: 95px;">
        <div class="card-body">
            <h5 class="card-title">${producto}</h5>
        </div>
    </div>
    <br>`
    prd.innerHTML += prod
    })
    filas =`<h5>En total va a gastar ${precio}$</h5>`
    tablaLs.innerHTML += filas

    // for (i = 0; i < productosCarrito.length; i++) {
    //     // debugger
    //     if(productosCarrito[i]!=productosCarrito[i-1]){
    //         var cant = 1
    //         let prod = 
    //         `<div class="card" style="width: 180px;height: 180px;">
    //         <div class="card-body">
    //             <h3 class="card-title">${productosCarrito[i]}</h3>
    //             <br>
    //             <p id="cant"></p>
    //         </div>
    //     </div>
    //     <br>`
    //     prd.innerHTML += prod
    //     }
    //     else{
    //         cant += 1
    //         document.getElementById("cant").innerHTML = "x" + cant + " productos de este tipo"
    //     }
    // }

    // filas =`<h5>En total va a gastar ${precio}$</h5>`
    // tablaLs.innerHTML += filas
}

ponerProductos()

function carro(){
    if(precio !=0 ){
        if(precio >= 50000){
            var totalcd = precio - (precio*0.10)
        }
        else{
            var totalcd = precio
        }
        if(confirm("Lo quiere comprar?")){
            alert("Comprando...")
            alert("Comprado!")
            if (confirm("quiere recibo?")) {
                let compra = new compras(nombrePersona, totalcd, date)
                let recibo = `
                <br>
                <div class="card" style="width: 180px;height: 310px;">
                <div class="card-body">
                    <h5 class="card-title">${"Su recibo:"}</h5>
                    <p class="card-text">${"Emitido por: "+compra.nombre}</p>
                    <p>_____________________</p>
                    <p class="card-text">${"TOTAL: "+compra.precio+"$"}</p>
                    <p>_____________________</p>
                    <p class="card-text">${"Emitido el: "+compra.fecha}</p>
                </div>
            </div>`
                recibos.innerHTML += recibo

            }
            else{
                alert("Ok, no le daremos recibo")
            }
            totalcd = 0
            productosCarrito = []
            precio = 0

            localStorage.setItem("Productos", JSON.stringify(productosCarrito))
            localStorage.setItem("Precio", JSON.stringify(precio))
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
//____________________________________________________________