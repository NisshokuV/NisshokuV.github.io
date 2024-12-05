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
  aficiones: document.querySelectorAll("input[name='Aficiones']"), // Seleccionamos los checkboxes de aficiones
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

  // Validar selección de al menos dos aficiones
  DOM.aficiones.forEach((checkbox) => {
      checkbox.addEventListener("change", validateAficiones);
  });

  // Validar formulario y actualizar mensajes
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
const validateAficiones = () => {
  const selectedAficiones = [...DOM.aficiones].filter((checkbox) => checkbox.checked);
  const message = selectedAficiones.length < 2 
      ? "Por favor, selecciona al menos dos aficiones." 
      : "";
  DOM.aficiones[0].setCustomValidity(message); // Añade el mensaje a uno de los checkboxes
};
