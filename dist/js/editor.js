import { formValidator, resetFormFields } from "./helpers/utils/forms.js";
import { requestGetData, requestUpdateData } from "./helpers/services/api.js";
import { authenticatedUser } from "./helpers/constants/constants.js";
import { mainCardsErrorRender } from "./helpers/utils/render.js";

const mainSection = document.querySelector(".S01");
const editorForm = document.querySelector("#editor");
const mainImage = document.querySelector("#main_image");
const secondImage = document.querySelector("#second_image");
const thirdImage = document.querySelector("#third_image");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const featured = document.querySelector("#featured");
const notification = document.querySelector("#notification");

const searchParams = new URLSearchParams(location.search);
const queryID = searchParams.get("id");

if (!authenticatedUser) location.href = "/login.html";
if (queryID === null) location.replace("./admin.html");

requestGetData(queryID)
  .then((response) => {
    mainImage.value = response.data.image_1_url;
    secondImage.value = response.data.image_2_url;
    thirdImage.value = response.data.image_3_url;
    title.value = response.data.title;
    description.value = response.data.description;
    price.value = response.data.price;
    featured.defaultChecked = response.data.featured;
  })
  .catch(() => {
    mainSection.innerHTML = mainCardsErrorRender();
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

    requestUpdateData(queryID, schema)
      .then(() => {
        notification.classList.add("txt-success");
        notification.innerHTML = "Success product details have been updated...";

        return setTimeout(() => {
          resetFormFields(formFields);
          location.replace("./admin.html");
        }, 2000);
      })
      .catch(() => {
        notification.classList.add("txt-danger");
        notification.innerHTML = "Something went wrong, please try again...";
      });
  }
});
