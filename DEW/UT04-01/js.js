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