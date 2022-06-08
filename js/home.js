import {
  mainCardsErrorRender,
  mainCardsRender,
} from "./helpers/utils/render.js";
import { sessionGetData, sessionSetData } from "./helpers/services/storage.js";
import { requestGetData, requestGetAssets } from "./helpers/services/api.js";
import { addToCart } from "./helpers/utils/common.js";
import { apiBasrURL, apiEndpoints } from "./helpers/constants/constants.js";

requestGetData()
  .then((response) => {
    const featuredProducts = response.data.filter((product) => {
      return product.featured === true;
    });
    sessionSetData("products", response.data);
    mainCardsRender(featuredProducts);
  })
  .catch(() => {
    mainCardsErrorRender();
  })
  .finally(() => {
    const addToCartBtn = document.querySelectorAll("#add_to_cart");
    const products = sessionGetData("products");
    addToCartBtn.forEach((btn) => {
      btn.addEventListener("click", () => addToCart(btn, products));
    });
  });

requestGetAssets()
  .then((response) => {
    const { hero_banner, hero_banner_alt_text, product_banner } = response.data;

    const heroBanner = document.querySelector("#hero_banner");
    const prodBanner = document.querySelector("#product_banner");

    const heroImageElem = document.createElement("img");
    heroImageElem.src = apiBasrURL + hero_banner.url;
    heroImageElem.alt = hero_banner_alt_text;

    heroBanner.prepend(heroImageElem);

    prodBanner.style.backgroundImage = `url(${apiBasrURL + product_banner.url})`;
  })
  .catch((error) => {
    console.log(error);
  });
