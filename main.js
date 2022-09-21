let total = 0
let productosAgregados = []

let tabla = document.getElementById("tabla")

let month = parseInt(new Date().getMonth())
let day = new Date().getUTCDate()
let year = new Date().getUTCFullYear()

let buscar = document.getElementById("buscar")
buscar.addEventListener("click", buscador)

const nombrePersona = localStorage.getItem("Nombre")
if( nombrePersona == null){
    nombrePersona = prompt("Ingrese su nombre")
}
if (nombrePersona == ''){
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

let productos = [
    
    new articulo("Procesador I3 10 gen", 1000, 0,"prc" ,"assets/I3.png"),
    new articulo("Procesador I5 11 gen", 2000, 1, "prc" ,"assets/I5 11.png"),
    new articulo("Procesador I7 10 gen", 3500, 2, "prc" ,"assets/I7.png"),
    new articulo("Procesador Ryzen7 11 gen", 5000, 3, "prc" ,"assets/Ryzen7.png"),
    new articulo("Procesador I9 10 gen", 10000, 4, "prc" ,"assets/I9.png"),
    new articulo("Procesador Ryzen9 11 gen", 25000, 5, "prc" ,"assets/Ryzen9.png"),
    
]

// _______________________________

// Funciones

function buscador(){
    let buscado = document.getElementById("buscador").value
    buscado = buscado.toUpperCase()
    const resultado = productos.filter((el) => el.nombre.toUpperCase().includes(buscado))
    let fila = ""
    tabla.innerHTML = ""
    resultado.forEach(producto =>{
        fila = `
                <div class="card" style="width: 180px;height: 170px;">
                <img src="${producto.url}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Valor: ${producto.precio}$</p>
                        <input type="button" id="btn${producto.id}" value="Agregar al carrito"></input>
                    </div>
                </div>
        `
        tabla.innerHTML += fila
    })
}



function bienvenida(){

    let numRandom = parseInt(Math.random()*3)
    document.getElementById("h2").innerHTML = saludos[numRandom]

}
bienvenida()

function cargarProductos(array){
    let fila = ""
    tabla.innerHTML = ""
    array.forEach(producto =>{
        fila = `
                <div class="card" style="width: 180px;height: 170px;">
                <img src="${producto.url}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Valor: ${producto.precio}$</p>
                        <input type="button" id="btn${producto.id}" value="Agregar al carrito"></input>
                    </div>
                </div>
        `
        tabla.innerHTML += fila
    })
}

cargarProductos(productos)

productos.forEach(producto =>{
    let agregarAlCarrito = document.querySelector(`#btn${producto.id}`) 
    agregarAlCarrito.addEventListener("click",a =>{
    productosAgregados.push(productos[producto.id].nombre)

    localStorage.setItem("Productos", JSON.stringify(productosAgregados))

    total = total + productos[producto.id].precio
    if(total >= 50000){
        var totalNuevo = total * 0.9
        document.getElementById('total').innerHTML = total*0.9
    }
    else{
        var totalNuevo = total
        document.getElementById('total').innerHTML = total
    }
    localStorage.setItem("Precio", JSON.stringify(totalNuevo))
    })
})

        

// ---------

