const DOM = {
    tipoDocumento: document.getElementById("TipoDocumento"),
    dniNie: document.getElementById("DniNie"),
    inputPassword: document.getElementById("password"),
    showPass: document.getElementById("show-password"),
    tituloInput: document.getElementById("titulo"),
    descripcionInput: document.getElementById("descripcion"),
    form: document.getElementById("userForm"),
    anioNacimiento: document.getElementById("AnioNacimiento"),
    messagesList: document.getElementById("messagesList"),
    aficiones: document.querySelectorAll("input[name='Aficiones']"),
    errorAficiones: document.getElementById("error-aficiones"), // Contenedor de error de aficiones
};

document.addEventListener("DOMContentLoaded", () => {
    // Rellenar años de nacimiento
    for (let i = 2010; i >= 1920; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        DOM.anioNacimiento.appendChild(option);
    }

    // Habilitar/Deshabilitar campo DNI/NIE según selección
    DOM.tipoDocumento.addEventListener("change", () => {
        DOM.dniNie.disabled = DOM.tipoDocumento.value === "";
    });

    // Mostrar/Ocultar contraseña
    document.getElementById("mostrarContrasena").addEventListener("change", (e) => {
        const passwordField = document.getElementById("Contrasena");
        passwordField.type = e.target.checked ? "text" : "password";
    });

    // Validar aficiones al cambiar los checkboxes
    DOM.aficiones.forEach((checkbox) => {
        checkbox.addEventListener("change", validateAficiones);
    });

    // Validar al enviar el formulario
    DOM.form.addEventListener("submit", (event) => {
        const isAficionesValid = validateAficiones();
        const isDniNieValid = validateDniNie();
        if (!isAficionesValid || !isDniNieValid) {
            event.preventDefault(); // Detener envío si no pasa alguna validación
        }
    });

    // Validar formulario en tiempo real
    DOM.form.addEventListener("input", () => {
        DOM.messagesList.innerHTML = "";
        [...DOM.form.elements].forEach((element) => {
            if (element.validationMessage) {
                const li = document.createElement("li");
                li.textContent = `${element.name || element.id}: ${element.validationMessage}`;
                DOM.messagesList.appendChild(li);
            }
        });
    });
});

// Validación de aficiones
function validateAficiones() {
    const selectedAficiones = [...DOM.aficiones].filter((checkbox) => checkbox.checked);
    if (selectedAficiones.length < 2) {
        DOM.errorAficiones.style.display = "block";
        return false;
    } else {
        DOM.errorAficiones.style.display = "none";
        return true;
    }
}

// Validación de DNI/NIE
function validateDniNie() {
    const inputDniNie = DOM.dniNie;
    const errorElement = document.getElementById("error-dni-nie");
    const numero = inputDniNie.value.trim();

    if (!verificarDniNie(numero)) {
        errorElement.style.display = "block";
        return false;
    } else {
        errorElement.style.display = "none";
        return true;
    }
}

function verificarDniNie(numero) {
    // Tabla de letras del cálculo
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

    if (DOM.tipoDocumento.value === "nie") {
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
    if (DOM.tipoDocumento.value === "dni") {
        const numeroSinLetra = numero.slice(0, -1);
        const letraCorrecta = letras[parseInt(numeroSinLetra) % 23];
        return letraCorrecta === numero.slice(-1);
    }

    // No es un formato válido
    return false;
}
