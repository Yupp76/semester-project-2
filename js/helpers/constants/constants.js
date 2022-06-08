import { storageGetData } from "../services/storage.js";

const apiBasrURL = "http://localhost:1337";

const apiEndpoints = {
  auth: apiBasrURL + "/auth/local",
  products: apiBasrURL + "/products",
  home: apiBasrURL + "/home",
};

const authenticatedUser = storageGetData("user");

const requestHeader = !!authenticatedUser && {
  headers: { Authorization: `Bearer ${authenticatedUser.jwt}` },
};

const productsList = document.querySelector("#productsList");
const deleteElem = document.querySelector("#delete");

export {
  apiBasrURL,
  apiEndpoints,
  authenticatedUser,
  requestHeader,
  productsList,
  deleteElem,
};
