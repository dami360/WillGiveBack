import LoadingScreen from "./loadingScreen";
import CreateNodeElement from "./createNodeElements";
import ServerConnection from "./serverConnection";
const conteiner = document.querySelector("#conteiner");
const nav = document.querySelector("#main-nav");

function getCookie(cookieName) {
  let cookie = {};

  document.cookie.split(";").forEach((el) => {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });

  return cookie[cookieName];
}

export default class ContentPage {
  // pages --------------------------------------------------
  static signInPage(lgn, alert, alertColor) {
    const formSignIn = CreateNodeElement.Form("", "post");

    if (alert) {
      formSignIn.appendChild(CreateNodeElement.AlertNote(alert, alertColor));
    }

    const inputSection = CreateNodeElement.Section("data");
    formSignIn.appendChild(inputSection);

    const buttonSection = CreateNodeElement.Section("buttons");
    formSignIn.appendChild(buttonSection);

    inputSection.appendChild(CreateNodeElement.Label("login", "Login: "));
    const login = CreateNodeElement.Input("text", "login", "login");
    if (lgn !== "" && lgn) {
      login.value = lgn;
    }
    inputSection.appendChild(login);

    inputSection.appendChild(CreateNodeElement.Label("pass", "Password: "));
    const password = CreateNodeElement.Input("password", "pass", "pass");
    inputSection.appendChild(password);

    const stayLogged = CreateNodeElement.Input(
      "checkbox",
      "stay-logged",
      "stay-logged"
    );
    stayLogged.tabIndex = 0;
    inputSection.appendChild(stayLogged);
    inputSection.appendChild(
      CreateNodeElement.Label("stay-logged", "Stay logged")
    );

    buttonSection.appendChild(
      CreateNodeElement.Button("Sign Up", () => {
        LoadingScreen.showWithDelay(() => {
          this.signUpPage(login.value);
          LoadingScreen.hide();
        });
      })
    );

    buttonSection.appendChild(
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

    const inputSection = CreateNodeElement.Section("data");
    formSignUp.appendChild(inputSection);

    const buttonSection = CreateNodeElement.Section("buttons");
    formSignUp.appendChild(buttonSection);

    inputSection.appendChild(CreateNodeElement.Label("login", "Login: "));
    const login = CreateNodeElement.Input("text", "login", "login", 15);
    if (lgn !== "" && lgn) {
      login.value = lgn;
    }
    inputSection.appendChild(login);

    inputSection.appendChild(CreateNodeElement.Label("email", "Email: "));
    const email = CreateNodeElement.Input("email", "email", "email");
    inputSection.appendChild(email);

    inputSection.appendChild(CreateNodeElement.Label("pass", "Password: "));
    const password = CreateNodeElement.Input("password", "pass", "pass", -8);
    inputSection.appendChild(password);

    inputSection.appendChild(
      CreateNodeElement.Label("rpass", "Reapeat password: ")
    );
    const rpassword = CreateNodeElement.Input("password", "rpass", "rpass");
    inputSection.appendChild(rpassword);

    buttonSection.appendChild(
      CreateNodeElement.Button("Sign In", () => {
        LoadingScreen.showWithDelay(() => {
          this.signInPage(login.value);
          LoadingScreen.hide();
        });
      })
    );

    buttonSection.appendChild(
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

  static profilePage(userData) {
    if (!userData) {
      userData = JSON.parse(sessionStorage.getItem("dt"));
    }

    const profile = CreateNodeElement.Section("profile");

    profile.appendChild(CreateNodeElement.Header(2, userData.login));
    profile.appendChild(document.createElement("hr"));

    conteiner.replaceChildren(profile);
  }

  static infoPage() {
    const info = CreateNodeElement.Section("info");

    info.appendChild(CreateNodeElement.Header(2, "Info"));
    info.appendChild(document.createElement("hr"));

    info.appendChild(
      CreateNodeElement.Link(
        "https://www.privacypolicygenerator.info/live.php?token=7EEcHwdH8QhEQgqS0rsLJTyVhftkrsnd",
        "Privacy Policy",
        "Privacy Policy"
      )
    );

    info.appendChild(
      CreateNodeElement.Link(
        "https://www.cookiepolicygenerator.com/live.php?token=lL2nI0C2zBFu0XF1ge3ux3gSZZiAQHpo",
        "Cookies Policy",
        "Cookies Policy"
      )
    );

    conteiner.replaceChildren(info);
  }
  // -------------------------------------------------------

  // change page functions ---------------------------------
  static async newSession() {
    const res = await ServerConnection.isLogged();

    if (res.err && !sessionStorage.getItem("dt")) {
      this.signInPage();
      LoadingScreen.hide();

      return;
    }

    if (sessionStorage.getItem("dt")) {
      this.infoPage();
    } else {
      sessionStorage.setItem("dt", JSON.stringify(res));
      this.infoPage(res);
    }

    nav.setAttribute("data-active", "true");
    LoadingScreen.hide();

    return;
  }

  static async signIn(login, password, stayLogged) {
    if (!login || !password) {
      return;
    }

    login = login.trim();

    LoadingScreen.showWithDelay(async () => {
      const res = await ServerConnection.signIn(login, password, stayLogged);

      if (res.err) {
        this.signInPage(
          login,
          "Wrong login or password",
          "rgba(255, 0, 0, 0.3)"
        );
        LoadingScreen.hide();

        return;
      }

      if (res.errMess) {
        this.signInPage(login, res.errMess, "rgba(255, 0, 0, 0.3)");
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

  static async signUp(login, email, password, rpassword) {
    if (!login || !email || !password || !rpassword) {
      return;
    }

    login = login.trim();
    email = email.trim();

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

      this.signInPage(
        "",
        "Account registered, check your email for a verification link",
        "rgba(0, 255, 0, 0.3)"
      );
      LoadingScreen.hide();

      return;
    });
  }

  static logOut() {
    nav.setAttribute("data-active", "false");

    sessionStorage.removeItem("dt");

    document.cookie = `${getCookie(
      "l"
    )}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    document.cookie = `l=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

    this.signInPage();

    return;
  }
  // -------------------------------------------------------
}
