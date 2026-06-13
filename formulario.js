// ─────────────────────────────────────────────────────────────
// formulario.js — Validación del formulario de cotización
// ─────────────────────────────────────────────────────────────

//1. Las variables:
const form = document.getElementById("contactForm")
const mensajeOk = document.getElementById("mensajeExito")

//2. Vamos a crear funciones de validación:
function noVacio(valor){
    return valor.trim() !== ''
}
function emailValido(valor){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())
}
function seleccionaValida(valor){
    return valor !== ''
}
function viajerosValido(valor){
    const n = Number(valor)
    return Number.isInteger(n) && n>=1 && n<=20
}

//3. Vamos a escribir los posibles mensajes de error
const reglas = [
    {id: 'nombre', validar: noVacio, mensaje:'Ingresa tu nombre'},
    {id: 'email', validar: emailValido, mensaje:'Ingresa un correo válido'},
    {id: 'destino', validar: seleccionaValida, mensaje:'Seleccione un destino'},
    {id: 'viajeros', validar: viajerosValido, mensaje:'Ingrese un número entre 1 y 20'},
    {id: 'mensaje', validar: noVacio, mensaje:'El mensaje no puede estar vacío'}
]

//4. Comenzamos a procesar el HTML:
function marcarError(campo, mensaje){
    campo.classList.add("is-invalid")
    campo.classList.remove("is-valid")
    const feedback = campo.nextElementSibling
    if(feedback && feedback.classList.contains('invalid-feedback')){
        feedback.textContent = mensaje
    }
}
function marcarOk(campo){
    campo.classList.remove("is-invalid")
    campo.classList.add("is-valid")
}

function validarCampo(regla){
    const campo = document.getElementById(regla.id)
    const ok = regla.validar(campo.value)
    ok ? marcarOk(campo) : marcarError(campo,regla.mensaje)
    return ok
}

//5. Llamamos al boton del formulario:
form.addEventListener('submit', function(event){
    event.preventDefault()

    const resultados = reglas.map(validarCampo)
    const todoOk = resultados.every(function(r){return r===true})
    console.log(todoOk)
    if(todoOk){
        mensajeOk.classList.remove('d-none')
        form.reset()

        reglas.forEach(function(regla){
            document.getElementById(regla.id).classList.remove('is-valid')
        })

        setTimeout(() => {
            mensajeOk.classList.add('d-none')
        }, 4000);
    }
})
