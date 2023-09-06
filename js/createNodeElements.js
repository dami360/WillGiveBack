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

  static Input(type, name, id, maxL) {
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

  static Button(value, callback) {
    const button = document.createElement("input");
    button.type = "button";
    button.value = value;
    button.onclick = callback;

    return button;
  }
}
