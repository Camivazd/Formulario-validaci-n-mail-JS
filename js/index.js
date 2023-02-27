
'use strict'

document.addEventListener('DOMContentLoaded', function() { //Cuando se descargue el html, se evite cosas por defecto.

    const form = {
        nombre: '',
        apellido: '',
        mail: '',
        comentarios: ''
    }


//Traigo todos los elementos HTMl:
const formulario = document.querySelector('#formulario');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const mail = document.querySelector('#mail');
const ciudad = document.querySelector('#ciudad');
const provincia = document.querySelector('#provincia');
const comentarios = document.querySelector('#comentarios');
const boton =  document.querySelector('#boton'); 
const spinner = document.querySelector('#spinner');


//Asignar eventos
nombre.addEventListener('blur', validar);
apellido.addEventListener('blur', validar);
mail.addEventListener('blur', validar);
comentarios.addEventListener('blur', validar);

formulario.addEventListener('submit', enviarEmail);


//Declaro la función
function validar(e) {
    console.log(e.target.id.trim());
    if (e.target.value === '') {
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        return; //el return es para que corte el código si es que escribieron algo. 
    } 

    if (e.target.id === 'mail' && !validarEmail(e.target.value)) {
        mostrarAlerta('El mail no es válido', e.target.parentElement);
        return;
    }
    
    //Limpia alerta, para que no aparezca 2 veces la misma.
    limpiarAlerta(e.target.parentElement);

    //Asignar valores
    form[e.target.name] = e.target.value.trim().toLowerCase();
    console.log(form);

    //Comprobar el objeto de form
    comprobarEmail();
}

//Programamos la función enviarEmail
function enviarEmail(e) {
    e.preventDeFault();
    
    setTimeout(() => {
    spinner.classList.add('.spinner');
    spinner.classList.remove('hidden');

    //Crear una alerta
    const alertaExito = document.createElement('P');
    alertaExito.style.backgroundColor = 'green';
    alertaExito.style.textAlign = 'center';
    alertaExito.style.fontWeight = 'bold';
    alertaExito.textContent = '¡El mensaje fue enviado con éxito!'

    formulario.appendChild(alertaExito);
    }, 9000);
}



//Función para mostrar una alerta
function mostrarAlerta(mensaje, referencia) {
    //Comprueba si ya existe una alerta
    const alerta = referencia.querySelector('p');
    if (alerta) {
        alerta.remove();
    }

    //Generar alerta rn HTML
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.style.backgroundColor = 'red';
    error.style.textAlign = 'center';


    //Agregamos el instrumento P al formulario
    referencia.appendChild(error); 
}


//Programamos la función limpiarAlerta
function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector('p');
    if (alerta) {
        alerta.remove();
    }
}


//Validar el email
function validarEmail(mail) {
    const regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regexEmail.test(mail);
    return resultado;
}


//Programamos la función comprobarEmail
function comprobarEmail() {
    console.log(Object.values(form).includes(''));
}

});




