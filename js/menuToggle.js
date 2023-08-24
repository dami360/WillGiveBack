const menu = document.querySelector("nav");
const menuToggleButton = menu.querySelector(".menu-toggle");

function menuToggle(e) {
  e.preventDefault();

  if (menu.getAttribute("data-hide") === "false") {
    menu.setAttribute("data-hide", "true");
    menuToggleButton.setAttribute("title", "Show menu");
    setTimeout(() => {
      menuToggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }, 800);
  } else {
    menu.setAttribute("data-hide", "false");
    menuToggleButton.setAttribute("title", "Hide menu");
    setTimeout(() => {
      menuToggleButton.innerHTML =
        '<i class="fa-solid fa-angle-down" style="transform: translateY(2px);"></i>';
    }, 200);
  }
}

menuToggleButton.addEventListener("click", menuToggle, false);
