const logoutBtn = () => {
  return `
    <li id="logout" class="menu__item">
      <button class="btn btn--fill-alt">Logout</button>
    </li>`;
};

const deleteBtn = (id) => {
  return `
  <button data-id="${id}" id="delete" class="delete btn-naked txt-muted txt-h6">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none" >
          <path d="M1 1L17.3167 17.3167" stroke="#323334" />
          <path d="M17.3167 1L0.999983 17.3167" stroke="#323334" />
      </svg>
  </button>`;
};

const quantityBtn = (id, quantity) => {
  return `
  <div class="quantity">
    <button data-id="${id}" id="decrement" class="quantity__minus txt-md-bold">-</button>
    <div data-id="${id}" id="quantity" class="quantity__number txt-sm-bold">${quantity}</div>
    <button data-id="${id}" id="increment" class="quantity__plus txt-md-bold">+</button>
  </div>
  `;
};

const editeBtn = (productID) => {
  return `<div><a href="./editor.html?id=${productID}" class="btn">Edite</a></div>`;
};

export { logoutBtn, deleteBtn, quantityBtn, editeBtn };
