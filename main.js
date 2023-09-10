import "./style.scss";
import "./js/headerOnScroll";
import "./js/menuToggle";
import ContentPage from "./js/content";

window.onload = () => {
  ContentPage.newSession();
};
