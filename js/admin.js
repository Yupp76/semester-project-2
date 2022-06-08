import { formValidator, resetFormFields } from "./helpers/utils/forms.js";
import { requestGetData, requestPostData } from "./helpers/services/api.js";
import { authenticatedUser } from "./helpers/constants/constants.js";
import { deleteEvent } from "./helpers/utils/common.js";
import {
  smallCardsErrorRender,
  smallCardsRender,
} from "./helpers/utils/render.js";

if (!authenticatedUser) location.href = "/login.html";

const editorForm = document.querySelector("#editor");
const mainImage = document.querySelector("#main_image");
const secondImage = document.querySelector("#second_image");
const thirdImage = document.querySelector("#third_image");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const featured = document.querySelector("#featured");
const notification = document.querySelector("#notification");

let deleteTrigger = null;

requestGetData()
  .then((response) => {
    smallCardsRender(response.data, "editor");
  })
  .catch(() => {
    smallCardsErrorRender();
  })
  .finally(() => {
    deleteTrigger = document.querySelectorAll("#delete");
    deleteTrigger.forEach((btn) => {
      btn.addEventListener("click", (e) => deleteEvent(e, btn.dataset.id));
    });
  });

editorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formFields = [
    mainImage,
    secondImage,
    thirdImage,
    title,
    description,
    price,
    featured,
  ];

  const invalidFields = formValidator(formFields);

  if (!invalidFields.length) {
    const schema = {
      image_1_url: mainImage.value.trim(),
      image_2_url: secondImage.value.trim(),
      image_3_url: thirdImage.value.trim(),
      description: description.value.trim(),
      title: title.value.trim(),
      price: parseFloat(price.value).toFixed(2),
      featured: featured.checked,
    };

    notification.innerHTML = "Submiting the new product...";

    requestPostData(false, schema)
      .then(() => {
        notification.classList.add("txt-success");
        notification.innerHTML = "Success page will refresh in few seconds...";
      })
      .catch((err) => {
        notification.classList.add("txt-danger");
        notification.innerHTML = "Something went wrong, please try again...";
      })
      .finally(() => {
        return setTimeout(() => {
          resetFormFields(formFields);
          location.reload();
        }, 2000);
      });
  }
});
