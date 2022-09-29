let total = 0
let productosAgregados = []

let tabla = document.querySelector("#tabla")
let barraBuscar = document.querySelector("#buscador")
document.getElementById('total').innerHTML = total

let month = parseInt(new Date().getMonth())
let day = new Date().getUTCDate()
let year = new Date().getUTCFullYear()

let buscar = document.getElementById("buscar")
buscar.addEventListener("click", buscador)

let cerrar = document.querySelector("#cerrar")
cerrar.addEventListener("click", (a)=>{
    barraBuscar.value = ""
    buscador()
})

const verificarNombre = () =>{
var nombrePersona = localStorage.getItem("Nombre")

if( nombrePersona === null||nombrePersona === "null"){
    Swal.fire({
        title: 'Como se llama?',
        icon: 'question',
        input:'text',
    }).then((result) => {
        nombrePersona = result.value
        localStorage.setItem("Nombre", nombrePersona)
    })

}
if (nombrePersona == ''){
    Swal.fire({
        title: 'Quiere cambiar el nombre que figura en la web?',
        text: "Su nombre por ahora no figura",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Cual es su nombre?',
                input: 'text',
            }).then((result) => {
                nombrePersona = result.value
                localStorage.setItem("Nombre", nombrePersona)
            })
        }
    })
    localStorage.setItem("Nombre", nombrePersona)
}
}
verificarNombre()

let saludos = [
    "Bienvenido a nuestro E-comerce ",
    "Esperamos que disfrute su experiencia",
    "Como esta? bienvenido!"
]
const date = month+"-"+day+"-"+ year

let productos = [
    
    new articulo("Procesador I3 10 gen", 1000, 0,"prc" ,"assets/I3.png"),
    new articulo("Procesador I5 11 gen", 2000, 1, "prc" ,"assets/I5 11.png"),
    new articulo("Procesador I7 10 gen", 3500, 2, "prc" ,"assets/I7.png"),
    new articulo("Procesador Ryzen7 11 gen", 5000, 3, "prc" ,"assets/Ryzen7.png"),
    new articulo("Procesador Ryzen9 11 gen", 25000, 5, "prc" ,"assets/Ryzen9.png"),
    new articulo("RTX 3060", 40000, 6, "pdv" ,"assets/RTX 3060.png"),
    new articulo("RTX 3090", 45000, 7, "pdv" ,"assets/RTX 3090.png"),

]


// _______________________________

// Funciones

function buscador(){
    let buscado = document.getElementById("buscador").value
    buscado = buscado.toUpperCase()
    const resultado = productos.filter((el) => el.nombre.toUpperCase().includes(buscado))
    cargarProductos(resultado)
}

function bienvenida(){

    let numRandom = parseInt(Math.random()*3)
    document.getElementById("h2").innerHTML = saludos[numRandom]

}
bienvenida()

function cargarProductos(array){
    let fila = ""
    tabla.innerHTML = ""
    let tipo = ""
    array.forEach(producto =>{
        let { url, nombre, precio} = producto
        if (tipo === producto.tipo){
            fila = `
                    <div class="card" style="width: 180px;height: 365px;">
                        <img src="${url}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${nombre}</h5>
                            <p class="card-text">Valor: ${precio}$</p>
                            <input style=" position: absolute; top: 311px;" type="button" id="btn${producto.id}" value="Agregar al carrito"></input></div>
                        </div>
            `
            
            let productosMismoTipo = document.getElementById(producto.tipo)
            productosMismoTipo.innerHTML += fila
        }
        else{
            fila = `
                    <br>
                    <br>
                    <div id="${producto.tipo}" style="display: flex;justify-content: space-evenly;">
                        <div class="card" style="width: 180px;height: 365px;">
                            <img src="${url}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${nombre}</h5>
                                <p class="card-text">Valor: ${precio}$</p>
                                <input style=" position: absolute; top: 311px;" type="button" id="btn${producto.id}" value="Agregar al carrito"></input></div>
                        </div>
                    </div>
                `
            tabla.innerHTML += fila
        }
        tipo = producto.tipo
    })
}

cargarProductos(productos)

productos.forEach(producto =>{
    let{id}=producto 
    let agregarAlCarrito = document.querySelector(`#btn${id}`) 
    agregarAlCarrito.addEventListener("click",a =>{
    productosAgregados.push(productos[id].nombre)

    localStorage.setItem("Productos", JSON.stringify(productosAgregados))

    total = total + productos[id].precio
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

