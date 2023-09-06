const loadingScreenDiv = document.querySelector("#loading-screen");

const delayTime = 500;

export default class LoadingScreen {
  static hide() {
    setTimeout(() => {
      loadingScreenDiv.style.opacity = 0;
      setTimeout(() => {
        loadingScreenDiv.style.display = "none";
      }, 300);
    }, delayTime);
  }

  static show() {
    loadingScreenDiv.style.display = "flex";
    setTimeout(() => {
      loadingScreenDiv.style.opacity = 1;
    }, 100);
  }

  static showWithDelay(func) {
    this.show();
    setTimeout(func, delayTime);
  }
}
