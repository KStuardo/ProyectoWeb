function validarFormulario() {
    const rut = document.getElementById('rut').value;
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellidoPaterno').value;
    const apellidoMaterno = document.getElementById('apellidoMaterno').value;
    const edad = document.getElementById('edad').value;
    const genero = document.getElementById('genero').value;

    if (rut.length < 9 || rut.length > 10) {
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

function generarCarta() {
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellidoPaterno').value;
    const apellidoMaterno = document.getElementById('apellidoMaterno').value;
    const motivacion = document.getElementById('motivacion').value;

    const carta = `Estimado/a,

Me llamo ${nombre} ${apellidoPaterno} ${apellidoMaterno} y estoy muy interesado/a en la oportunidad laboral en su empresa. Mi motivación para postular al trabajo es: ${motivacion}.

Quedo atento/a a su respuesta.

Saludos cordiales,
${nombre}`;

    document.getElementById('motivacion').value = carta;
}
