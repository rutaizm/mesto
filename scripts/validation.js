// Валидация
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(config.errorClass);
  };
  
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};
  
const disabledButtonState = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

const activeButtonState = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList, config)) {
    disabledButtonState(buttonElement, config);
  } else {
    activeButtonState(buttonElement, config);
  }
}
  
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    })
};
  
  const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage,  config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); 
    const buttonElement = formElement.querySelector(config.submitButtonSelector);  
   // toggleButtonState(inputList, buttonElement, config);  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };
  
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
      formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          });
        //disabledButtonState(formElement.querySelector(config.submitButtonSelector),(config.inactiveButtonClass)));   
        setEventListeners(formElement, config);   
  });
  }
  enableValidation({
    formSelector: '.edit-form',
    inputSelector: '.edit-form__field',
    submitButtonSelector: '.pop-up__save',
    inactiveButtonClass: 'pop-up__save_type_disabled',
    inputErrorClass: 'edit-form__field_type_error',
    errorClass: 'edit-form__input-error_active'
  });
  