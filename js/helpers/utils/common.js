import { requestDeleteEntry } from "../services/api.js";
import { storageGetData, storageSetData } from "../services/storage.js";

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

function deleteEvent(event, datasetID) {
  event.stopPropagation();
  requestDeleteEntry(datasetID)
    .then(() => {
      return setTimeout(() => {
        location.reload();
      }, 1000);
    })
    .catch(() => {
      alert("Something went bad, try again");
    });
}

function addToCart(btn, products) {
  console.log(products)
  const datasetID = btn.dataset.id;
  const prevData = storageGetData("cart");
  const targetProduct = products.filter((product) => {
    console.log(product.id, datasetID)
    return product.id == datasetID;
  });

  targetProduct[0].quantity = 1;

  if (prevData === null) {
    storageSetData("cart", targetProduct);
  } else {
    const payload = [...prevData, ...targetProduct];
    const uniqProducts = getUniqueListBy(payload, "id");
    storageSetData("cart", uniqProducts);
    setTimeout(() => {
      location.href = "./cart.html";
    }, 1000);
  }
}

function sortProducts(productsArray) {
  return productsArray.sort(function (a, b) {
    return a.id - b.id;
  });
}

export { deleteEvent, addToCart, sortProducts };
