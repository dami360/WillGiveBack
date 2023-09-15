export default class CreateNodeElement {
  static Form(action, method) {
    const form = document.createElement("form");
    form.action = action;
    form.method = method;

    return form;
  }

  static Section(...classes) {
    const section = document.createElement("section");
    section.classList.add(...classes);

    return section;
  }

  static Label(target, inner) {
    const label = document.createElement("label");
    label.setAttribute("for", target);
    label.innerHTML = inner;

    return label;
  }

  static Input(type, name, id, lenght) {
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.id = id;

    if ((type === "text" || type === "password") && lenght) {
      if (lenght > 0) {
        input.maxLength = lenght;
        input.placeholder = `Max lenght: ${lenght}`;
      }
      if (lenght < 0) {
        lenght *= -1;
        input.minLength = lenght;
        input.placeholder = `Min lenght: ${lenght}`;
      }
    }

    return input;
  }

  static Button(value, callback, isSubmit) {
    const button = document.createElement("input");
    button.type = isSubmit ? "submit" : "button";
    button.value = value;
    button.onclick = callback;

    return button;
  }

  static AlertNote(value, bg) {
    const p = document.createElement("p");
    p.classList.add("alert");
    p.innerText = value;
    p.style.backgroundColor = bg;

    return p;
  }
}
