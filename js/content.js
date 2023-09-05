import LoadingScreen from "./loadingScreen";
const conteiner = document.querySelector("#conteiner");

function createForm(action, method) {
  const form = document.createElement("form");
  form.action = action;
  form.method = method;

  return form;
}

function createSection(...classes) {
  const section = document.createElement("section");
  section.classList.add(...classes);

  return section;
}

function createLabel(target, inner) {
  const label = document.createElement("label");
  label.setAttribute("for", target);
  label.innerHTML = inner;

  return label;
}

function createInput(type, name, id, maxL) {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.id = id;

  if ((type === "text" || type === "password") && maxL) {
    input.maxLength = maxL;
    input.placeholder = `Max lenght: ${maxL}`;
  }

  return input;
}

function createButton(value, callback) {
  const button = document.createElement("input");
  button.type = "button";
  button.value = value;
  button.onclick = callback;

  return button;
}

export default class ContentPage {
  // pages --------------------------------------------------
  static signInPage() {
    const formSignIn = createForm("return false", "post");

    const section1 = createSection("data");
    formSignIn.appendChild(section1);

    const section2 = createSection("buttons");
    formSignIn.appendChild(section2);

    section1.appendChild(createLabel("login", "Login: "));
    section1.appendChild(createInput("text", "login", "login"));

    section1.appendChild(createLabel("pass", "Password: "));
    section1.appendChild(createInput("password", "pass", "pass"));

    section2.appendChild(
      createButton("Sign Up", () => {
        LoadingScreen.show();
        setTimeout(() => {
          conteiner.replaceChildren(this.signUpPage());
          LoadingScreen.hide();
        }, 1000);
      })
    );

    section2.appendChild(createButton("Sign In", () => {}));

    return formSignIn;
  }

  static signUpPage() {
    const formSignUp = createForm("return false", "post");

    const section1 = createSection("data");
    formSignUp.appendChild(section1);

    const section2 = createSection("buttons");
    formSignUp.appendChild(section2);

    section1.appendChild(createLabel("login", "Login: "));
    section1.appendChild(createInput("text", "login", "login", 15));

    section1.appendChild(createLabel("email", "Email: "));
    section1.appendChild(createInput("email", "email", "email"));

    section1.appendChild(createLabel("pass", "Password: "));
    section1.appendChild(createInput("password", "pass", "pass", 12));

    section2.appendChild(
      createButton("Sign In", () => {
        LoadingScreen.show();
        setTimeout(() => {
          conteiner.replaceChildren(this.signInPage());
          LoadingScreen.hide();
        }, 1000);
      })
    );

    section2.appendChild(createButton("Sign Up", () => {}));

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
