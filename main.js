import "./style.scss";
import "./js/headerOnScroll";
import "./js/menuToggle";
import ContentPage from "./js/content";

const apiAddress = "localhost:8000";

window.onload = () => {
  ContentPage.newSession(apiAddress);
};
