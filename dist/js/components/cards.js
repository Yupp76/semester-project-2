import { deleteBtn, editeBtn, quantityBtn } from "./buttons.js";

const smallCardBtn = (type, id, quantity) => {
  return type === "editor" ? editeBtn(id) : quantityBtn(id, quantity);
};

const smallCardHead = (image, title) => {
  return `
    <div class="minProduct__cover">
      <img src="${image}" alt="${title}" />
    </div>`;
};

const smallCardBody = (id, isLast, type, title, price, quantity) => {
  return `
  <div class="minProduct__content">
    <div>
      <h3 class="txt-md-bold">${title}</h3>
      <p class="txt-bold">${price}$</p>
    </div>
    <div>
      <div class="d-flex">
        <div class="refrence txt-label txt-muted txt-md d-flex mr-1">
          <p class="mr-1">Art No:</p>
          <p>1435418562</p>
        </div>
        <div class="size txt-label txt-muted txt-md d-flex mr-1">
          <p class="mr-1">Size:</p>
          <p>21*45</p>
        </div>
      </div>
      <div class="d-flex">
        <div class="total txt-label txt-muted txt-md d-flex mr-1">
        <p class="mr-1">Total:</p>
        <p>${price}</p>
      </div>
    </div>
  </div>
  ${smallCardBtn(type, id, quantity) + deleteBtn(id)}
  ${!isLast ? '<hr class="mb-0 mt-1" />' : ``}
</div>
`;
};

const largeCardHead = (id, image, title) => {
  return `
  <div class="productCard__head">
    <img src="${image}" alt="${title}" />
    <div class="overlay">
      <button id="add_to_cart" data-id="${id}" class="btn btn--fill btn--rounded btn--flex-around">
        <span class="fas fa-shopping-bag"></span>
        <p class="txt-sm ml-1">Add to Cart</p>
      </button>
    </div>
  </div>`;
};

const largeCardBody = (id, title, price) => {
  return `
  <a href="./details.html?id=${id}" class="productCard__body mt-1">
    <h3 class="txt-md-bold">${title}</h3>
    <div class="rating my-1">
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
    </div>
    <p class="txt-bold">${price}$</p>
  </a>`;
};

const largeCard = (id, image, title, price) => {
  return `
  <div  class="productCard__wrapper">
    <div class="productCard">
      ${
        largeCardHead(id, image, title) + largeCardBody(id, title, price)
      }        
    </div>
  </div>`;
};

const smallCard = (id, isLast, type, title, image, price, quantity) => {
  return `
  <div class="minProduct mb-1">
    ${
      smallCardHead(image, title) +
      smallCardBody(id, isLast, type, title, price, quantity)
    }
  </div>
  `;
};

const categoryCard = () => {
  return `
  <div class="productCat">
    <img src="./images/modernlab_4.png" alt="cover" />
    <div class="productCat__content">
      <h3 class="txt-h4">DECOR</h3>
      <p class="txt-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <a href="./products.html" class="btn mt-1">View Details</a>
    </div>
  </div>`;
};

export { largeCard, smallCard, categoryCard };
