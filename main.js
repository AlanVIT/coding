let limite = parseInt(prompt("ingresa un numero"))
var arr = []
for (let i = 0; i < limite; i++) {
    if(parseInt(limite/(i+1))===limite/(i+1)){
        console.warn("este si es un divisor", i+1)
        arr.push(i+1)
        continue
    }
    console.error("este no es un divisor", i+1)
}
if(arr.length===2){
    console.log("ES PRIMO!!")
}
else{
    console.log("Es un numero comun")
}
let seguir = confirm("Queres un multiplo?") 
let fct = 1
while (seguir) {
    console.log(limite*fct)
    seguir = confirm("otro?")
    fct++ 
}

