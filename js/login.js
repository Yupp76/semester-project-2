import {
  showFeedback,
  formValidator,
  resetFormFields,
  invalidFieldsFeedback,
} from "./helpers/utils/forms.js";
import { authPostForm } from "./helpers/services/auth.js";
import { storageSetData } from "./helpers/services/storage.js";
import { authenticatedUser } from "./helpers/constants/constants.js";

if (!!authenticatedUser.user) location.href = "/admin.html";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formFields = [username, email, password];
  const invalidFields = formValidator(formFields);

  if (!invalidFields.length) {
    authPostForm(email.value, password.value)
      .then((response) => {
        showFeedback().success();
        storageSetData("user", response.data);
        setTimeout(function () {
          window.location.replace(window.location.origin + "/admin.html");
        }, 2000);
      })
      .catch(() => showFeedback().error())
      .finally(() => resetFormFields(formFields));
  } else {
    invalidFieldsFeedback(invalidFields);
  }
});
