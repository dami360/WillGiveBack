import LoadingScreen from "./loadingScreen";
import CreateNodeElement from "./createNodeElements";
import ServerConnection from "./serverConnection";
const conteiner = document.querySelector("#conteiner");
const nav = document.querySelector("#main-nav");

export default class ContentPage {
  // pages --------------------------------------------------
  static signInPage(lgn, notFound, signUpped) {
    const formSignIn = CreateNodeElement.Form("", "post");

    if (notFound) {
      formSignIn.appendChild(
        CreateNodeElement.AlertNote(
          "Wrong login or password",
          "rgba(255, 0, 0, 0.3)"
        )
      );
    } else if (signUpped) {
      formSignIn.appendChild(
        CreateNodeElement.AlertNote(
          "Account registered",
          "rgba(0, 255, 0, 0.3)"
        )
      );
    }

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

    const stayLogged = CreateNodeElement.Input(
      "checkbox",
      "stay-logged",
      "stay-logged"
    );
    section1.appendChild(stayLogged);
    section1.appendChild(CreateNodeElement.Label("stay-logged", "Stay logged"));

    section2.appendChild(
      CreateNodeElement.Button("Sign Up", () => {
        LoadingScreen.showWithDelay(() => {
          this.signUpPage(login.value);
          LoadingScreen.hide();
        });
      })
    );

    section2.appendChild(
      CreateNodeElement.Button(
        "Sign In",
        async (e) => {
          e.preventDefault();

          this.signIn(login.value, password.value, stayLogged.checked);
        },
        true
      )
    );

    conteiner.replaceChildren(formSignIn);
  }

  static signUpPage(lgn, errMessege) {
    const formSignUp = CreateNodeElement.Form("", "post");

    if (errMessege) {
      formSignUp.appendChild(
        CreateNodeElement.AlertNote(errMessege, "rgba(255, 0, 0, 0.3)")
      );
    }

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
    const password = CreateNodeElement.Input("password", "pass", "pass", -8);
    section1.appendChild(password);

    section1.appendChild(
      CreateNodeElement.Label("rpass", "Reapeat password: ")
    );
    const rpassword = CreateNodeElement.Input("password", "rpass", "rpass");
    section1.appendChild(rpassword);

    section2.appendChild(
      CreateNodeElement.Button("Sign In", () => {
        LoadingScreen.showWithDelay(() => {
          this.signInPage(login.value);
          LoadingScreen.hide();
        });
      })
    );

    section2.appendChild(
      CreateNodeElement.Button(
        "Sign Up",
        (e) => {
          e.preventDefault();

          this.signUp(
            login.value,
            email.value,
            password.value,
            rpassword.value
          );
        },
        true
      )
    );

    conteiner.replaceChildren(formSignUp);
  }

  static profilePage(apiResponse) {}
  // -------------------------------------------------------

  // change page functions ---------------------------------
  static async newSession() {
    const res = await ServerConnection.isLogged();

    if (res.err) {
      this.signInPage();
      LoadingScreen.hide();

      return;
    }

    sessionStorage.setItem("dt", JSON.stringify(res));
    this.profilePage(res);
    nav.setAttribute("data-active", "true");
    LoadingScreen.hide();

    return;
  }

  static async signIn(login, password, stayLogged) {
    if (!login || !password) {
      return;
    }

    LoadingScreen.showWithDelay(async () => {
      const res = await ServerConnection.signIn(login, password, stayLogged);

      if (res.err) {
        this.signInPage(login, true, false);
        LoadingScreen.hide();

        return;
      }

      sessionStorage.setItem("dt", JSON.stringify(res));
      this.profilePage(res);
      nav.setAttribute("data-active", "true");
      LoadingScreen.hide();

      return;
    });
  }

  static signUp(login, email, password, rpassword) {
    if (!login || !email || !password || !rpassword) {
      return;
    }

    LoadingScreen.showWithDelay(async () => {
      const res = await ServerConnection.signUp(
        login,
        email,
        password,
        rpassword
      );

      if (res.errMess) {
        this.signUpPage(login, res.errMess);
        LoadingScreen.hide();

        return;
      }

      this.signInPage("", false, true);
      LoadingScreen.hide();

      return;
    });
  }
  // -------------------------------------------------------
}
