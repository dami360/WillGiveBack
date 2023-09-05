import LoadingScreen from "./loadingScreen";
const conteiner = document.querySelector("#conteiner");

export default class ContentPage {
  // pages --------------------------------------------------
  static signInPage() {
    const formSignIn = document.createElement("form");
    formSignIn.action = "return false";
    formSignIn.method = "post";

    const section1 = document.createElement("section");
    section1.classList.add("data");
    formSignIn.appendChild(section1);

    const section2 = document.createElement("section");
    section2.classList.add("buttons");
    formSignIn.appendChild(section2);

    const labelLogin = document.createElement("label");
    labelLogin.setAttribute("for", "login");
    labelLogin.innerText = "Login: ";
    section1.appendChild(labelLogin);

    const inputLogin = document.createElement("input");
    inputLogin.type = "text";
    inputLogin.name = "login";
    inputLogin.id = "login";
    section1.appendChild(inputLogin);

    const labelPassword = document.createElement("label");
    labelPassword.setAttribute("for", "password");
    labelPassword.innerText = "Password: ";
    section1.appendChild(labelPassword);

    const inputPassword = document.createElement("input");
    inputPassword.type = "password";
    inputPassword.name = "pass";
    inputPassword.id = "password";
    section1.appendChild(inputPassword);

    const buttonSignUp = document.createElement("input");
    buttonSignUp.type = "button";
    buttonSignUp.value = "Sign Up";
    buttonSignUp.onclick = () => {
      LoadingScreen.show();
      setTimeout(() => {
        conteiner.replaceChildren(this.signUpPage());
        LoadingScreen.hide();
      }, 1000);
    };
    section2.appendChild(buttonSignUp);

    const buttonSignIn = document.createElement("input");
    buttonSignIn.type = "button";
    buttonSignIn.value = "Sign In";
    buttonSignIn.onclick = () => {};
    section2.appendChild(buttonSignIn);

    return formSignIn;
  }

  static signUpPage() {
    const formSignUp = document.createElement("form");
    formSignUp.action = "return false";
    formSignUp.method = "post";

    const section1 = document.createElement("section");
    section1.classList.add("data");
    formSignUp.appendChild(section1);

    const section2 = document.createElement("section");
    section2.classList.add("buttons");
    formSignUp.appendChild(section2);

    const labelLogin = document.createElement("label");
    labelLogin.setAttribute("for", "login");
    labelLogin.innerText = "Login: ";
    section1.appendChild(labelLogin);

    const inputLogin = document.createElement("input");
    inputLogin.type = "text";
    inputLogin.name = "login";
    inputLogin.id = "login";
    section1.appendChild(inputLogin);

    const labelPassword = document.createElement("label");
    labelPassword.setAttribute("for", "password");
    labelPassword.innerText = "Password: ";
    section1.appendChild(labelPassword);

    const inputPassword = document.createElement("input");
    inputPassword.type = "password";
    inputPassword.name = "pass";
    inputPassword.id = "password";
    section1.appendChild(inputPassword);

    const buttonSignIn = document.createElement("input");
    buttonSignIn.type = "button";
    buttonSignIn.value = "Sign In";
    buttonSignIn.onclick = () => {
      LoadingScreen.show();
      setTimeout(() => {
        conteiner.replaceChildren(this.signInPage());
        LoadingScreen.hide();
      }, 1000);
    };
    section2.appendChild(buttonSignIn);

    const buttonSignUp = document.createElement("input");
    buttonSignUp.type = "button";
    buttonSignUp.value = "Sign Up";
    buttonSignUp.onclick = () => {};
    section2.appendChild(buttonSignUp);

    return formSignUp;
  }
  // -------------------------------------------------------

  // change page functions ---------------------------------
  static newSession(apiAddress) {
    conteiner.appendChild(this.signInPage());
    LoadingScreen.hide();
  }
  // -------------------------------------------------------

  // button functions --------------------------------------
  static signIn() {
    return ``;
  }

  static signUp() {
    return ``;
  }
  // -------------------------------------------------------
}
