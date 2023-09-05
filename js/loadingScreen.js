const loadingScreenDiv = document.querySelector("#loading-screen");

export default class LoadingScreen {
  static hide() {
    setTimeout(() => {
      loadingScreenDiv.style.opacity = 0;
      setTimeout(() => {
        loadingScreenDiv.style.display = "none";
      }, 500);
    }, 1000);
  }

  static show() {
    loadingScreenDiv.style.display = "flex";
    setTimeout(() => {
      loadingScreenDiv.style.opacity = 1;
      setTimeout(() => {
        return;
      }, 1000);
    }, 100);
  }
}
