import productDetails from "./components/product.js";
import { requestGetData } from "./helpers/services/api.js";
import { sessionGetData } from "./helpers/services/storage.js";
import { addToCart } from "./helpers/utils/common.js";
import { mainCardsErrorRender } from "./helpers/utils/render.js";

const storedProducts = sessionGetData("products");
const detailsWrapper = document.querySelector("#details_wrapper");

const searchParams = new URLSearchParams(location.search);
const queryID = searchParams.get("id");

let currentProduct = null;

if (queryID === null) location.replace("./index.html");

if (storedProducts === null) {
  requestGetData(queryID)
    .then((response) => {
      detailsWrapper.innerHTML = productDetails(response.data);
      currentProduct = response.data;
    })
    .catch(() => {
      detailsWrapper.innerHTML = mainCardsErrorRender();
    });
} else {
  currentProduct = storedProducts.filter((prod) => prod.id == queryID);
  detailsWrapper.innerHTML = productDetails(currentProduct[0]);
}

const addToCartBtn = document.querySelector("#add_to_cart");

addToCartBtn.addEventListener("click", (event) => {
  addToCart(addToCartBtn, [...currentProduct]);
  setTimeout(() => location.replace("./cart.html"), 1500);
});
