function isValidField(fieldID, value) {
  const MIN_LENGTH = 4;

  let isValid = null;
  let regExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

  switch (fieldID) {
    case "main_image":
      isValid = value.trim().length < MIN_LENGTH ? false : true;
      return { fieldID, isValid, notification: "this is a required field" };
    case "title":
      isValid = value.trim().length < MIN_LENGTH ? false : true;
      return { fieldID, isValid, notification: "title is a required field" };
    case "description":
      isValid = value.trim().length < MIN_LENGTH ? false : true;
      return { fieldID, isValid, notification: "this is a required field" };
    case "price":
      isValid = !!value.trim();
      return { fieldID, isValid, notification: "price is a required field" };
    case "email":
      isValid = regExp.test(value.trim());
      return {
        fieldID,
        isValid,
        notification: "please include a valid email",
      };
    case "password":
      isValid = value.trim().length < MIN_LENGTH ? false : true;
      return {
        fieldID,
        isValid,
        notification: `the password should be at least ${MIN_LENGTH} characters long`,
      };
    case "username":
      isValid = value.trim().length < 1 ? false : true;
      return {
        fieldID,
        isValid,
        notification: "please include a valid name",
      };
    default:
      return { isValid: true };
  }
}

function errorFieldRender(id, notification) {
  const errorNotification = document.querySelector(`#feedback-${id}`);
  errorNotification.innerHTML = notification;
  errorNotification.classList.add("field__feedback--error");
}

function errorFieldCleaner(id) {
  const notification = document.querySelector(`#feedback-${id}`);
  if (!notification) return;
  notification.classList.remove("field__feedback--error");
  notification.innerHTML = "";
}

function invalidFieldsFeedback(invalidFields) {
  invalidFields.forEach((field) => {
    errorFieldRender(field.fieldID, field.notification);
  });
}

function resetFormFields(formFields) {
  formFields.forEach((field) => {
    field.value = "";
    errorFieldCleaner(field.id);
  });
}

function showFeedback() {
  const results = document.querySelector("#feedback-result");
  return {
    success: () => {
      results.classList.add("field__feedback--success");
      results.innerHTML = "Success login!";
    },
    error: () => {
      results.classList.add("field__feedback--error");
      results.innerHTML = "Something went bad";
    },
  };
}

function formValidator(formFields) {
  let invalidFields = [];

  formFields.forEach((field) => {
    errorFieldCleaner(field.id);
    const fieldState = isValidField(field.id, field.value);
    !fieldState.isValid && invalidFields.push(fieldState);
  });

  return invalidFields;
}

export {
  isValidField,
  errorFieldRender,
  errorFieldCleaner,
  invalidFieldsFeedback,
  resetFormFields,
  showFeedback,
  formValidator,
};
