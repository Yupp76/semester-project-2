import { categoryCard, largeCard, smallCard } from "../../components/cards.js";
import { productsList } from "../constants/constants.js";

function smallCardsRender(data, type) {
  let output = "";

  data.forEach((product, index) => {
    const { id, title, image_1_url, price, quantity = null } = product;
    const isLast = data.length === index + 1;
    output += smallCard(id, isLast, type, title, image_1_url, price, quantity);
  });

  productsList.innerHTML = output;
}

function smallCardsErrorRender() {
  let output = `<li class="my-2 txt-danger txt-small txt-center"><p>Something went bad</p></li>`;
  productsList.innerHTML = output;
}

function mainCardsRender(data, raw = false) {
  let output = "";

  data.forEach((product) => {
    const { id, title, price, image_1_url } = product;
    output += largeCard(id, image_1_url, title, price);
  });

  const finalHTML = raw ? output : categoryCard() + output
  
  productsList.innerHTML = finalHTML;
}

function mainCardsErrorRender() {
  let output = `<div style="grid-area: 1 /span 4;" class="my-5 txt-danger txt-small txt-center"><p>Something went bad</p></div>`;
  productsList.innerHTML = output;
}

export {
  smallCardsRender,
  smallCardsErrorRender,
  mainCardsRender,
  mainCardsErrorRender,
};
