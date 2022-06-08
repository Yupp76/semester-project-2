const productDetails = ({
  id,
  image_1_url,
  image_2_url,
  image_3_url,
  description,
  title,
  price,
}) => {
  return `
  <div class="productDetails">
        <div class="productDetails__images">
        <img src="${image_1_url}" alt="${title}">
        <img src="${image_2_url}" alt="${title}">
        ${image_3_url ? `<img src="${image_3_url}" alt="${title}">` : ""}
        </div>
        <div class="productDetails__content">
        <h3 class="txt-h5">${title}</h3>
        <p class="txt-bold">${price}</p>
        <p class="txt">${description}</p>
        <p class="txt-sm-bold txt-success my-1 mb-2">
            AVAILABLE IN STOCK <span class="fas fa-check"></span>
        </p>
        <button data-id="${id}" id="add_to_cart" class="btn btn--fill-alt btn--fluid">
            Add to shopping cart
        </button>
        </div>
    </div>`;
};

export default productDetails;
