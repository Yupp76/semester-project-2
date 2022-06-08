import { quantityBtn } from "./components/buttons.js";
import { productsList } from "./helpers/constants/constants.js";
import { storageGetData, storageSetData } from "./helpers/services/storage.js";
import { sortProducts } from "./helpers/utils/common.js";
import { smallCardsRender } from "./helpers/utils/render.js";

const cartProducts = storageGetData("cart");

if (cartProducts === null || cartProducts.length == 0) {
  productsList.innerHTML = `
  <p class="m-2 txt txt-muted">
    Cart is empty, you haven't added in product to
    the shopping cart yet, please head back to the 
    <a href="./products.html" class="txt-sec txt-underline">
    products page</a> and add products that you like.
  </p>
  `;
} else {
  recalculatePrices();
  smallCardsRender(sortProducts(cartProducts));
  const deleteElem = document.querySelectorAll("#delete");
  const incremet = document.querySelectorAll("#increment");
  const quantity = document.querySelectorAll("#quantity");
  const decrement = document.querySelectorAll("#decrement");

  incremet.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      stepQuantity(event, quantity).increment();
      recalculatePrices();
    });
  });

  decrement.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      stepQuantity(event, quantity).decrement();
      recalculatePrices();
    });
  });

  deleteElem.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const newCartProducts = cartProducts.filter((product) => {
        return parseInt(product.id) !== parseInt(btn.dataset.id);
      });
      storageSetData("cart", newCartProducts);
      location.reload();
    });
  });
}

function stepQuantity(event, quantityElems) {
  const datasetID = event.target.dataset.id;
  const targetText = [...quantityElems].filter((elem) => {
    return parseInt(elem.dataset.id) === parseInt(datasetID);
  });
  const currentQuantity = parseInt(targetText[0].innerHTML);

  return {
    increment: () => {
      const MAX_QUANTITY = 10;

      const calcQuantity = currentQuantity + 1;
      const isOnLimit = calcQuantity > MAX_QUANTITY;
      const newQuantity = isOnLimit ? MAX_QUANTITY : calcQuantity;

      targetText[0].innerHTML = newQuantity;
      syncStorageValues(datasetID, newQuantity);
    },
    decrement: () => {
      const MIN_QUANTITY = 0;

      const calcQuantity = currentQuantity - 1;
      const isOnLimit = calcQuantity < MIN_QUANTITY;
      const newQuantity = isOnLimit ? MIN_QUANTITY : calcQuantity;

      targetText[0].innerHTML = newQuantity;
      syncStorageValues(datasetID, newQuantity);
    },
  };
}

function syncStorageValues(productID, newQuantity) {
  const targetProduct = cartProducts.filter((product) => {
    return parseInt(product.id) === parseInt(productID);
  });
  const restProducts = cartProducts.filter((product) => {
    return parseInt(product.id) !== parseInt(targetProduct[0].id);
  });

  targetProduct[0].quantity = newQuantity;

  const updatedData =
    cartProducts.length > 1
      ? [...restProducts, ...targetProduct]
      : targetProduct;

  storageSetData("cart", sortProducts(updatedData));
}

function recalculatePrices() {
  let total = null;

  const orderValue = document.querySelector("#order_value");
  const totalValue = document.querySelector("#total_value");

  cartProducts.forEach((product) => {
    total += product.price * product.quantity;
  });

  orderValue.innerHTML = `${total.toFixed(2)} $`;
  totalValue.innerHTML = `${total.toFixed(2)} $`;
}
