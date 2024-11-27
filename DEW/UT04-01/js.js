const tipoDocumento = document.getElementById('tipoDocumento');
const inputDocumento = document.getElementById('documento');

// Habilitar el campo del documento al seleccionar un tipo
tipoDocumento.addEventListener('change', () => {
    if (tipoDocumento.value) {
        inputDocumento.disabled = false; // Habilita el input
        inputDocumento.focus(); // Opcional: pone el cursor automáticamente
    } else {
        inputDocumento.disabled = true; // Deshabilita el input si no hay selección
        inputDocumento.value = ""; // Limpia el valor del campo
    }
});