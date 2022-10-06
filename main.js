console.log()

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
cerrar.addEventListener("click", ()=>{
    barraBuscar.value = ""
    buscador()
})

const date = month+"-"+day+"-"+ year

let productos = [

]

// _______________________________

// Funciones

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

function buscador(){
    barraBuscar.value == ""?cerrar.style = "display:none;":cerrar.style = "display:line;"
    let buscado = document.getElementById("buscador").value
    buscado = buscado.toUpperCase()
    const resultado = productos.filter((el) => el.nombre.toUpperCase().includes(buscado))
    productosHTML(resultado)
}

function bienvenida(){
    if(localStorage.getItem("Nombre")==="null"||localStorage.getItem("Nombre")===null){ 
        var saludos = [
            "Bienvenido a nuestro E-comerce ",
            "Esperamos que disfrute su experiencia ",
            "Hola, como esta? bienvenido!"
        ]
    }
    else{
        var saludos = [
            "Bienvenido a nuestro E-comerce "+ localStorage.getItem("Nombre"),
            "Esperamos que disfrute su experiencia "+  localStorage.getItem("Nombre"),
            "Como esta? "+  localStorage.getItem("Nombre") +" bienvenido!"
        ]
    }
    let numRandom = parseInt(Math.random()*3)
    document.getElementById("h2").innerHTML = saludos[numRandom]
}

const productosHTML = (array) =>{
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
                            <input class="botones" type="button" id="btn${producto.id}" value="Agregar al carrito"></input></div>
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
                                <input class="botones" type="button" id="btn${producto.id}" value="Agregar al carrito"></input></div>
                        </div>
                    </div>
                `
            tabla.innerHTML += fila
        }
        tipo = producto.tipo
    })
}

const mostrarMensaje = (agregado) =>{
    let colores = [
        parseInt(Math.random()*255)+1,
        parseInt(Math.random()*255)+1,
        parseInt(Math.random()*255)+1,
        parseInt(Math.random()*255)+1,
        parseInt(Math.random()*255)+1,
        parseInt(Math.random()*255)+1
    ]
    console.table(colores)
    Toastify({
        text: "Acaba de agregar"+agregado.nombre,
        duration: 1000,
        style:{
            background: `linear-gradient(to right, rgb(${colores[0]}, ${colores[1]}, ${colores[2]}),rgb(${colores[3]},${colores[4]}, ${[5]}))`,
        }
        }).showToast();
}

async function cargarProductos(){
    try {
    const response = await fetch("data.json")
    const data = await response.json()
    productos = data
    productosHTML(productos)
    } catch (error) {
        Swal.fire({
            title:"disculpe, estamos teniendo problemas",
            text:"vuelva a intentarlo mas tarde"
        })
    }

}
const crearBotones = async () =>{ 
    const response = await fetch("data.json")
    const data = await response.json()
    productos = data
    productos.forEach(producto =>{
        let{id}=producto 
        let agregarAlCarrito = document.querySelector(`#btn${id}`) 
        agregarAlCarrito.addEventListener("click",a =>{
        mostrarMensaje(producto)
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
}
// ---------
//Utilizar funciones
bienvenida()
cargarProductos()
verificarNombre()
crearBotones()
// ---------
