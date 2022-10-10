//Definiciones
let nombrePersona = localStorage.getItem("Nombre")

let month = parseInt(new Date().getMonth()) + 1
let day = new Date().getUTCDate()
let year = new Date().getUTCFullYear()
const date = month+"-"+day+"-"+ year

if(JSON.parse(localStorage.getItem("Descuento")) === "null"){
    var descuento = 0
}
else{
    var descuento = JSON.parse(localStorage.getItem("Descuento"))
}

let productosCarrito = JSON.parse(localStorage.getItem("Productos"))
let precio = JSON.parse(localStorage.getItem("Precio"))

let prd = document.getElementById("productosCarro")
let tablaLs = document.getElementById("tabla")

let comprar = document.getElementById("comprar")
comprar.addEventListener("click", carro)

let h5Sacar = document.querySelector(`#llevar`)
let recibos = document.querySelector("#recibos")

//Funciones
function ponerProductos(){
    if(precio ==! 0){
        let ponerPrecio
        productosCarrito.sort()
        productosCarrito.forEach(producto =>{        
            let prod = `<div class="card" style="width: 180px;height: 150px;">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <br>
                <br>
                <p>${producto.precio+"$"}</p>
            </div>
        </div>
        <br>`
        prd.innerHTML += prod
        })
        if(descuento === 0){
            precio === 45000?ponerPrecio =`<h5>Acaso usted no sabe que hacemos un descuento del 10% gastando mas de 50000$?, usted gasto 45.000, por lo que puede gastar 5000 pagados por nosotros, vuelva al <a href="index.html">inicio</a> y agarre lo que guste por 5000$</h5>`:ponerPrecio =`<h5>En total va a gastar ${precio}$, si gasta ${50000-precio}$ o mas tendra un descuento del 10%</h5>`
        }
        else{
            ponerPrecio =`<h5>En total va a gastar ${precio}$, su descuento es de ${descuento}</h5>`
        }
        tablaLs.innerHTML += ponerPrecio
    }
    else{
        h5Sacar.innerHTML = "Usted no agrego nada al carro, vuelva al inicio y agregue algo"
    }
}

ponerProductos()

const reinicio = () =>{
    descuento = 0
    totalcd = 0
    productosCarrito = []
    precio = 0

    let txt = document.querySelector(`#llevar`)
    let boton = document.querySelector(`#comprar`)
    let volver = document.querySelector(`#volver`)

    localStorage.setItem("Descuento", JSON.stringify(descuento))
    localStorage.setItem("Productos", JSON.stringify(productosCarrito))
    localStorage.setItem("Precio", JSON.stringify(precio))

    volver.className = "mostrar"
    txt.className = "ocultar"
    boton.className="ocultar"
    
    h5Sacar.innerHTML = "Ya compro lo seleccionado, por lo que no va a llevar nada, por lo que no va a gastar nada"
    prd.innerHTML = ""
    tablaLs.innerHTML = ""

}
function carro(){
    if(precio !=0 ){
    //         if(precio >= 50000){
    //         var totalcd = precio*0.9
    //     }
    //     else{
    //         var totalcd = precio
    //     }
        Swal.fire({
            title: 'Lo quiere comprar?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!'
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Comprado'
                )
                Swal.fire({
                    title: 'Quiere recibo?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        let compra = new compras(nombrePersona, precio, date)
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
                        reinicio()
                    }
                    else{
                        reinicio()
                        Swal.fire({
                            position: 'top-end',
                            timer: 2000,
                            title:"Ok, no le damos recibo"
                        })
                    }
                  })
            }
        else{
            let numRandom = parseInt(Math.random()*3)
            if(numRandom == 0){
                Swal.fire({
                    position: 'top-end',
                    timer: 2000,
                    title:"Ok, tomese su tiempo " + nombrePersona
                })
            }
            if(numRandom == 1){
                Swal.fire({
                    position: 'top-end',
                    timer: 2000,
                    title:"Decida bien " + nombrePersona
                })
            }
            if(numRandom == 2){
                Swal.fire({
                    position: 'top-end',
                    timer: 2000,
                    title:"Nadie lo apura, tiene todo el tiempo que usted quiera. "+ nombrePersona+ " Decida bien"
                })
            }        
        }
    })
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usted no selecciono ningun producto!',
            footer: `Seleccione algun producto en el <a href="index.html">_inicio</a>`
          })
    }

}
//____________________________________________________________