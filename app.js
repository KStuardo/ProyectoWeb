





//Variables
const carrito = document.querySelector('#carrito'); /**/ // Selecciona el elemento con el ID "carrito" en el HTML
const listaCursos = document.querySelector('#lista-cursos'); /**/ // Selecciona el elemento con el ID "lista-cursos" en el HTML
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); /**/ // Selecciona el tbody dentro del elemento con el ID "lista-carrito" en el HTML
const contenedorIndicadoresEconomicos = document.querySelector('#lista-indicadores-economicos tbody'); /**/ // Selecciona el tbody dentro del elemento con el ID "lista-carrito" en el HTML
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); /**/ // Selecciona el elemento con el ID "vaciar-carrito" en el HTML
const legendIndicadores = document.querySelector("#leyendaIndicadores")
let articulosCarrito = []; /**/ // Crea una variable para almacenar los artículos del carrito

// *****
cargarEventListeners(); /**/ // Llama a la función cargarEventListeners al cargar el script

function cargarEventListeners() {
    //Cuando agregas un curso presionando 'Agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso); /**/ // Escucha el evento click en el elemento con el ID "lista-cursos" y llama a la función agregarCurso

    //Elimina cursos del carrito
    // carrito.addEventListener("click", eliminarCurso); /**/ // Escucha el evento click en el elemento con el ID "carrito" y llama a la función eliminarCurso

    //muestra los cursos
    document.addEventListener('DOMContentLoaded', () => {
        //recuerda si no hay productos en el carrito se agrega un array vácio para que no de error.
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || []; /**/ // Obtiene los artículos del carrito del almacenamiento local o crea un array vacío si no hay nada guardado
        carritoHTML(); /**/ // Llama a la función carritoHTML para mostrar los artículos en el carrito
    })

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener("click", () => { /**/ // Escucha el evento click en el botón "Vaciar Carrito"
        articulosCarrito = []; /**/ // Vacía el array de artículos del carrito
        limpiarHTML(); /**/ // Llama a la función limpiarHTML para borrar los elementos del carrito en el HTML
    });
}

// Funciones ****************************************

function agregarCurso(e) {
    e.preventDefault(); /**/ // Previene el comportamiento por defecto del evento click en un enlace

    // Delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) { /**/ // Verifica si el elemento clickeado contiene la clase "agregar-carrito"
        const curso = e.target.parentElement.parentElement; /**/ // Obtiene el elemento padre del padre del elemento clickeado (el curso seleccionado)
        leerDatosCurso(curso); /**/ // Llama a la función leerDatosCurso para obtener los detalles del curso
        productoAgregado(curso); /**/ // Llama a la función productoAgregado para mostrar una alerta de producto añadido
    }
}

function productoAgregado(curso) {
    //Crear una alerta
    const alert = document.createElement("H4");
    alert.style.cssText = "background-color: blue; color: white; text-align: center;";  /*color producto agregado*/
    alert.style.margin = "5px 20px";
    alert.textContent = 'Añadido al carrito'
    curso.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 2000);
}

function eliminarCurso(e) {
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== e.toString());
    carritoHTML();
}

//Lee el contenido del HTML al que le dimos click y extrae la información del curso.
function leerDatosCurso(curso) {
    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Creamos una copia del arreglo
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // este retorna el objeto actualizado
            } else {
                return curso; // retorna los que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //Agregar elementos al carrito  
    carritoHTML();
}

function abrirCarrito() {
    limpiarHTML()
    document.getElementById("carrito").style.removeProperty("display")// quita el display:none
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
    limpiarHTML(); /**/ // Llama a la función limpiarHTML para borrar los elementos del carrito en el HTML

    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr'); /**/ // Crea una nueva fila para cada curso en el carrito se utiliza para definir una celda dentro de una fila 
        row.innerHTML = `
            <td>  
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>   
            <td>${curso.precio}</td>
            <td>${curso.cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" onclick="eliminarCurso(${curso.id})" data-id="${curso.id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row); /**/ // Agrega la fila al tbody del carrito en el HTML
    });
    //Agregar el carrito de compras al storage
    sincronizarStorage(); /**/ // Llama a la función sincronizarStorage para guardar los artículos del carrito en el almacenamiento local
}

function sincronizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito)); /**/ // Convierte el array de artículos del carrito a formato JSON y lo guarda en el almacenamiento local
}

// Elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    //:contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) { /**/ // Mientras haya un primer hijo en el tbody del carrito
        contenedorCarrito.removeChild(contenedorCarrito.firstChild); /**/ // Elimina ese primer hijo
    }
}


// función que retorna los valores de indicadores economicos
function getIndicadoresEconomicos() {
    // fetch metodo que ejecuta solicitud GET a API miidnicador.cl
    fetch("https://mindicador.cl/api")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // transforma a array para recorrer el objeto con forEach
            var arrayInidicadores = Object.entries(data);
            
            // asigna texto de leyenda
            leyendaIndicadores.innerText = `Inidicadores económicos obtenidos desde ${arrayInidicadores[1][1]} con la versión ${arrayInidicadores[0][1]}`
            
            // recorre los elementos del array y genera fila en la tabla html
            arrayInidicadores.forEach((indicador) => {
                const row = document.createElement('tr'); /**/ // Crea una nueva fila para cada curso en el carrito se utiliza para definir una celda dentro de una fila 
                row.innerHTML = `
                    <tr>
                        <td>${indicador[0,4.1]}</td>
                        <td>${indicador[1][2]  }</td>   
                        <td>${indicador[1]}</td>
                        <td>${indicador[1]} </td>
                        <td>${indicador[1]}</td>
                        <td>${indicador[1]}</td>
                `;

                contenedorIndicadoresEconomicos.appendChild(row); /**/ // Agrega la fila al tbody de la tabla indicadores economicos en el HTM
            })
        })
}