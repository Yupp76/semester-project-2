import { sessionSetData, sessionGetData } from "./helpers/services/storage.js";
import { mainCardsRender } from "./helpers/utils/render.js";
import { addToCart } from "./helpers/utils/common.js";

let products = null;

const storedProducts = sessionGetData("products");

if (storedProducts === null) {
  requestGetData()
    .then((response) => {
      mainCardsRender(response.data, true);
      sessionSetData("products", response.data);
      products = response.data;
    })
    .catch(() => {
      mainCardsErrorRender();
    });
} else {
  mainCardsRender(storedProducts, true);
  products = storedProducts;
}

const addToCartBtns = document.querySelectorAll("#add_to_cart");

addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addToCart(btn, products);
  });
});
