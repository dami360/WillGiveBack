import "./style.scss";
import "./js/headerOnScroll";
import "./js/menuToggle";
import LoadingScreen from "./js/loadingScreen";
import ContentPage from "./js/content";

const apiAddress = "localhost:8000";

window.onload = async () => {
  ContentPage.newSession(apiAddress).then(LoadingScreen.hide());
};
