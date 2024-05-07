
// $('#rut').click(function (e) { 
//     alert('APRETE UN BOTON')
    
// });

$('#rut').focusout(function (evento) { //crea una funcion tipo evento utilizando un evento en este caso es .focusout llamando al id rut del html
    let oRut = evento.target.value //let un bloques de js que solamente utilizamos en el bloque .llamando al evento.target.value.value target nos trae el atributo de la etiqueta
    let oRutId = '#'+evento.target.id 
    if (oRut.length < 9 || oRut.length > 10) {  /* si el rut.length ( largo) es menor a 9  */
        $(oRutId).attr('class', 'form-control is-invalid');
        
    }else{
        $(oRutId).attr('class', 'form-control is-valid');
    }

    
});
//se debe hacer por cada apartado del form 

function validarFormulario() { /* como obtener datos guardados */
    
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellidoPaterno').value;
    const apellidoMaterno = document.getElementById('apellidoMaterno').value;
    const edad = document.getElementById('edad').value;
    const genero = document.getElementById('genero').value;


    /* kevincito  "||" se utiliza para indicar que el bloque de código
     dentro de la declaración "if" se ejecutará si la condición1 o la condición2 se evalúan como verdaderas. */
    if (rut.length < 9 || rut.length > 10) {  /* si el rut.length ( largo) es menor a 9  */
        alert('El RUT debe tener entre 9 y 10 caracteres.');
       
        return false;
    
    }
    

    if (nombre.length < 3 || nombre.length > 20) {
        alert('El nombre debe tener entre 3 y 20 caracteres.');
        
        return false;
    }

    // Validar otros campos según tus necesidades

    return true;
}

function generarCarta() {   /* generar una carta automatica con los datos ya guardados */
    const nombre = document.getElementById('nombre').value;  /* obtener el valor del campo nombre lo mismo hacia abajo */
    const apellidoPaterno = document.getElementById('apellidoPaterno').value;   /* const = valor fijo ingresado en este caso  texto */
    const apellidoMaterno = document.getElementById('apellidoMaterno').value;
    const motivacion = document.getElementById('motivacion').value; /* texto que agregara el usuario  que se complementara con el texto relleno de abajo */

    const carta = `Estimado/a,

Me llamo ${nombre} ${apellidoPaterno} ${apellidoMaterno} y estoy muy interesado/a en la oportunidad laboral en su empresa CaosNews.
 Mi motivación para postular al trabajo es: ${motivacion}.

Quedo atento/a a su respuesta.

Saludos cordiales,
${nombre}`;

    document.getElementById('motivacion').value = carta;  /** se crea una auto carta basica con los datos predestinados 
    en los campos rellenadosanterior mente */



}

