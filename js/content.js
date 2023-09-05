const conteiner = document.querySelector("#conteiner");

export default class ContentPage {
  static signInPage() {
    const formSignIn = document.createElement("form");
    formSignIn.setAttribute("action", "return false");
    formSignIn.setAttribute("method", "post");

    return formSignIn;
  }

  static signUpPage() {}

  static signIn() {
    return ``;
  }

  static signUp() {
    return ``;
  }

  static async newSession(apiAddress) {
    conteiner.appendChild(this.signInPage());
  }
}
