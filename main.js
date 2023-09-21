import "./style.scss";
import "./js/headerOnScroll";
import "./js/menuToggle";
import ContentPage from "./js/content";
import LoadingScreen from "./js/loadingScreen";

const menu = document.querySelector("nav");
const menuBottons = menu.querySelectorAll("a:not(#menu-toggle)");

window.onload = () => {
  ContentPage.newSession();
};

menuBottons.forEach((button) => {
  button.addEventListener("click", (b) => {
    b.preventDefault();

    LoadingScreen.showWithDelay(() => {
      switch (button.getAttribute("id")) {
        case "profile":
          ContentPage.profilePage();
          break;

        case "info":
          ContentPage.infoPage();
          break;

        case "log-out":
          ContentPage.logOut();
          break;

        default:
          ContentPage.profilePage();
          break;
      }
      LoadingScreen.hide();
    });
  });
});
