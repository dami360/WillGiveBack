const menu = document.querySelector("nav");
const menuToggleButton = menu.querySelector("#menu-toggle");
const menuOtherButtons = menu.querySelectorAll("a:not(#menu-toggle)");

let tabindex;

function menuToggle(e) {
  e.preventDefault();

  if (menu.getAttribute("data-hide") === "false") {
    menu.setAttribute("data-hide", "true");
    menuOtherButtons.forEach((el) => {
      el.setAttribute("tabindex", "-1");
    });
    menuToggleButton.setAttribute("title", "Show menu");
    setTimeout(() => {
      menuToggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }, 800);
  }
  //
  else {
    menu.setAttribute("data-hide", "false");
    tabindex = 2;
    menuOtherButtons.forEach((el) => {
      el.setAttribute("tabindex", tabindex);
      tabindex++;
    });
    menuToggleButton.setAttribute("title", "Hide menu");
    setTimeout(() => {
      menuToggleButton.innerHTML =
        '<i class="fa-solid fa-angle-down" style="transform: translateY(2px);"></i>';
    }, 200);
  }
}

menuToggleButton.addEventListener("click", menuToggle, false);
