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

let h5Sacar = document.querySelector(`#llevar`)
let recibos = document.querySelector("#recibos")

//Funciones
function ponerProductos(){
    let ponerPrecio
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
    ponerPrecio =`<h5>En total va a gastar ${precio}$</h5>`
    tablaLs.innerHTML += ponerPrecio

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

const reinicio = () =>{
    totalcd = 0
    productosCarrito = []
    precio = 0

    localStorage.setItem("Productos", JSON.stringify(productosCarrito))
    localStorage.setItem("Precio", JSON.stringify(precio))
    
    h5Sacar.innerHTML = "Ya compro lo seleccionado, por lo que no va a llevar nada, por lo que no va a gastar nada"
    prd.innerHTML = ""
    tablaLs.innerHTML = ""
}
function carro(){
    if(precio !=0 ){
            if(precio >= 50000){
            var totalcd = precio*0.9
        }
        else{
            var totalcd = precio
        }
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
            footer: 'Seleccione algun producto en el inicio'
          })
    }

}
//____________________________________________________________