// ─────────────────────────────────────────────────────────────
// destinos.js — Carga y renderiza destinos desde data.json
// ─────────────────────────────────────────────────────────────

//1. Vamos a rescatar elementos del DOM(document object model)
const grid = document.getElementById("grid-destinos")
const sinResultados = document.getElementById("sin-resultados")
const botones = document.querySelectorAll("#filtros button")

//2. Vamos a crear una tarjeta:
function crearCard(destino){
    return `
        <div class="col-sm-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm">
                <div class="card-img-wrapper">
                    <img class="card-img-top" src="${destino.imagen}" alt="${destino.alt}"/>
                    <div class="card-img-overlay-text">${destino.nombre}</div>
                </div>
                <div class="card-body">
                    <span class="badge bg-secondary mb-2">${destino.categoria}</span>
                    <p class="card-text text-muted small">${destino.descripcion}</p>
                </div>
                <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center pb-3">
                    <span class="fw-bold">$${destino.precio.toLocaleString()} USD</span>
                    <span class="text-muted small">${destino.dias} dias</span>
                </div>
            </div>
        </div>
    `
}

//3. Vamos a renderizar la lista:
function renderizar(lista){
    if(lista.length == 0){
        grid.innerHTML = ""
        sinResultados.classList.remove("d-none")
        return
    }
    sinResultados.classList.add("d-none")
    grid.innerHTML = lista.map(crearCard).join("")
}

//4. Carga inicial de datos:
fetch('data.json')
    .then(function(respuesta){
        if(!respuesta.ok){
            throw new Error("No se pudo cargar data.json")
        }
        return respuesta.json()
    })
    .then(function(destinos){
        renderizar(destinos)
    })