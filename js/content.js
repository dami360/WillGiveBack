import LoadingScreen from "./loadingScreen";
import CreateNodeElement from "./createNodeElements";
const conteiner = document.querySelector("#conteiner");

export default class ContentPage {
  // pages --------------------------------------------------
  static signInPage(lgn) {
    const formSignIn = CreateNodeElement.Form("return false", "post");

    const section1 = CreateNodeElement.Section("data");
    formSignIn.appendChild(section1);

    const section2 = CreateNodeElement.Section("buttons");
    formSignIn.appendChild(section2);

    section1.appendChild(CreateNodeElement.Label("login", "Login: "));
    const login = CreateNodeElement.Input("text", "login", "login");
    if (lgn !== "" && lgn) {
      login.value = lgn;
    }
    section1.appendChild(login);

    section1.appendChild(CreateNodeElement.Label("pass", "Password: "));
    const password = CreateNodeElement.Input("password", "pass", "pass");
    section1.appendChild(password);

    section2.appendChild(
      CreateNodeElement.Button("Sign Up", () => {
        LoadingScreen.showWithDelay(() => {
          conteiner.replaceChildren(this.signUpPage(login.value));
          LoadingScreen.hide();
        });
      })
    );

    section2.appendChild(
      CreateNodeElement.Button("Sign In", async () => {
        this.signIn(login.value, password.value);
      })
    );

    return formSignIn;
  }

  static signUpPage(lgn) {
    const formSignUp = CreateNodeElement.Form("return false", "post");

    const section1 = CreateNodeElement.Section("data");
    formSignUp.appendChild(section1);

    const section2 = CreateNodeElement.Section("buttons");
    formSignUp.appendChild(section2);

    section1.appendChild(CreateNodeElement.Label("login", "Login: "));
    const login = CreateNodeElement.Input("text", "login", "login", 15);
    if (lgn !== "" && lgn) {
      login.value = lgn;
    }
    section1.appendChild(login);

    section1.appendChild(CreateNodeElement.Label("email", "Email: "));
    const email = CreateNodeElement.Input("email", "email", "email");
    section1.appendChild(email);

    section1.appendChild(CreateNodeElement.Label("pass", "Password: "));
    const password = CreateNodeElement.Input("password", "pass", "pass", 12);
    section1.appendChild(password);

    section1.appendChild(
      CreateNodeElement.Label("rpass", "Reapeat password: ")
    );
    const rpassword = CreateNodeElement.Input("password", "rpass", "rpass");
    section1.appendChild(rpassword);

    section2.appendChild(
      CreateNodeElement.Button("Sign In", () => {
        LoadingScreen.showWithDelay(() => {
          conteiner.replaceChildren(this.signInPage(login.value));
          LoadingScreen.hide();
        });
      })
    );

    section2.appendChild(
      CreateNodeElement.Button("Sign Up", () => {
        this.signUp(login.value, email.value, password.value, rpassword.value);
      })
    );

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
  static signIn(login, password) {
    console.log(login, password);
  }

  static signUp(login, email, password, rpassword) {
    console.log(login, email, password, rpassword);
  }
  // -------------------------------------------------------
}
