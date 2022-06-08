import { logoutBtn } from "./components/buttons.js";
import { authenticatedUser } from "./helpers/constants/constants.js";
import { storageClearData } from "./helpers/services/storage.js";

const navMenu = document.querySelector(".navbar__body .menu");

if (authenticatedUser) {
  navMenu.innerHTML = navMenu.innerHTML + logoutBtn();

  const logoutButton = document.querySelector("#logout");

  logoutButton.addEventListener("click", () => {
    storageClearData("user");
    location.reload();
  });
}
