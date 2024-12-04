
  export const validateForm = (form) => {
    let isValid = true;
    Array.from(form.elements).forEach((input) => {
      if ((input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') && input.name) {
        const errorSpan = document.getElementById(`error${input.name}`);
        if (!input.checkValidity()) {
          isValid = false;
          if (errorSpan) {
            errorSpan.textContent = input.validationMessage;
            errorSpan.style.visibility = 'visible';
          } else {
            console.warn(`No se encontró un span de error para ${input.name}`);
          }
        } else if (errorSpan) {
          errorSpan.textContent = '';
          errorSpan.style.visibility = 'hidden';
        }
      }
    });
    return isValid;
  };
  
  export const updateValidationMessages = (form) => {
    const messagesContainer = document.getElementById('defaultMessages');
    messagesContainer.innerHTML = '';
    Array.from(form.elements).forEach((input) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${input.name}: ${input.validationMessage}`;
      messagesContainer.appendChild(listItem);
    });
  };
  