const tipoDocumento = document.getElementById('tipoDocumento');
const inputDocumento = document.getElementById('documento');
const inputPassword = document.getElementById('password');
const showPass = document.getElementById('show-password');
const tituloInput = document.getElementById('titulo');
const descripcionInput = document.getElementById('descripcion');
const formId = document.getElementById('formId');

// Habilitar el campo del documento al seleccionar un tipo
tipoDocumento.addEventListener('change', () => 
{
    if (tipoDocumento.value) 
    {
        inputDocumento.disabled = false; // Habilita el input
        inputDocumento.focus(); // Opcional: pone el cursor automáticamente
    } else 
    {
        inputDocumento.disabled = true; // Deshabilita el input si no hay selección
        inputDocumento.value = ""; // Limpia el valor del campo
    }
});
tituloInput.addEventListener('input', () => updateCharCount(tituloInput, 'titulo-count'));
descripcionInput.addEventListener('input', () => updateCharCount(descripcionInput, 'descripcion-count'));


showPass.addEventListener('change', function () 
{
    if (this.checked) {
        inputPassword.type = 'text';
    } else {
        inputPassword.type = 'password';
    }
});

function updateCharCount(input, counterId) 
{
    const counter = document.getElementById(counterId);
    const maxLength = input.getAttribute('maxlength');
    const currentLength = input.value.length;

    counter.textContent = `${currentLength} / ${maxLength}`;
}

function verificarDniNie(numero) 
{
    // Tabla de letras del cálculo
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

    // Verifica si es un NIE (empieza con X, Y o Z)
    if (/^[XYZ]\d{7}[A-Z]$/.test(numero)) 
    {
        // Convierte la letra inicial en un número (X=0, Y=1, Z=2)
        const letraInicial = numero[0];
        const numeroSinLetra = numero.slice(1, -1);
        let numeroCompleto;
        if (letraInicial === "X") numeroCompleto = `0${numeroSinLetra}`;
        if (letraInicial === "Y") numeroCompleto = `1${numeroSinLetra}`;
        if (letraInicial === "Z") numeroCompleto = `2${numeroSinLetra}`;
        
        // Calcula la letra correcta
        const letraCorrecta = letras[parseInt(numeroCompleto) % 23];
        return letraCorrecta === numero.slice(-1);
    }

    // Verifica si es un DNI (8 dígitos y una letra final)
    if (/^\d{8}[A-Z]$/.test(numero)) 
    {
        const numeroSinLetra = numero.slice(0, -1);
        const letraCorrecta = letras[parseInt(numeroSinLetra) % 23];
        return letraCorrecta === numero.slice(-1);
    }

    // No es un formato válido
    return false;
}

formId.addEventListener('submit', function (event) {
    const inputDniNie = document.getElementById('documento');
    const errorElement = document.getElementById('error-dni-nie');
    const numero = inputDniNie.value.trim();

    if (!verificarDniNie(numero)) {
        // Mostrar error y prevenir envío del formulario
        errorElement.style.display = 'block';
        event.preventDefault();
    } else {
        // Ocultar mensaje de error si es válido
        errorElement.style.display = 'none';
    }
});

// Módulo principal
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const mensajesSistema = document.getElementById('mensajesSistema');
    const aficionesCheckboxes = formulario.querySelectorAll('input[type="checkbox"]');
    const tipoDocumento = formulario.querySelector('#tipoDocumento');
    const dniNie = formulario.querySelector('#dniNie');
    const mostrarContrasena = formulario.querySelector('#mostrarContrasena');
    const contrasena = formulario.querySelector('#contrasena');
  
    // Mostrar contraseña
    mostrarContrasena.addEventListener('change', () => {
      contrasena.type = mostrarContrasena.checked ? 'text' : 'password';
    });
  
    // Validar formulario
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
      let valido = true;
  
      // Validar aficiones
      const aficionesSeleccionadas = Array.from(aficionesCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
      if (aficionesSeleccionadas.length < 2) {
        valido = false;
        marcarInvalido(aficionesCheckboxes[0], 'Debe seleccionar al menos 2 aficiones.');
      } else {
        marcarValido(aficionesCheckboxes[0]);
      }
  
      // Validar DNI/NIE según tipo de documento
      if (tipoDocumento.value === 'DNI' && !validarDNI(dniNie.value)) {
        valido = false;
        marcarInvalido(dniNie, 'DNI no válido.');
      } else if (tipoDocumento.value === 'NIE' && !validarNIE(dniNie.value)) {
        valido = false;
        marcarInvalido(dniNie, 'NIE no válido.');
      } else {
        marcarValido(dniNie);
      }
  
      // Mostrar mensajes de sistema
      actualizarMensajes();
  
      if (valido) {
        formulario.submit();
      }
    });
  
    // Función para validar DNI
    const validarDNI = (dni) => {
      const dniRegex = /^\d{8}[A-Z]$/;
      if (!dniRegex.test(dni)) return false;
      const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
      const numero = parseInt(dni.slice(0, 8), 10);
      const letra = dni.slice(-1);
      return letra === letras[numero % 23];
    };
  
    // Función para validar NIE
    const validarNIE = (nie) => {
      const nieRegex = /^[XYZ]\d{7}[A-Z]$/;
      if (!nieRegex.test(nie)) return false;
      const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
      const numero = nie
        .replace('X', '0')
        .replace('Y', '1')
        .replace('Z', '2')
        .slice(0, -1);
      const letra = nie.slice(-1);
      return letra === letras[parseInt(numero, 10) % 23];
    };
  
    // Marcar como inválido
    const marcarInvalido = (elemento, mensaje) => {
      elemento.setCustomValidity(mensaje);
      elemento.reportValidity();
    };
  
    // Marcar como válido
    const marcarValido = (elemento) => {
      elemento.setCustomValidity('');
    };
  
    // Actualizar mensajes de sistema
    const actualizarMensajes = () => {
      mensajesSistema.innerHTML = ''; // Limpiar mensajes
      const elementos = formulario.elements;
  
      Array.from(elementos).forEach((elemento) => {
        const mensaje = elemento.validationMessage;
        const nombre = elemento.name || elemento.id;
        if (mensaje) {
          const div = document.createElement('div');
          div.textContent = `${nombre}: ${mensaje}`;
          mensajesSistema.appendChild(div);
        }
      });
    };
  });
  