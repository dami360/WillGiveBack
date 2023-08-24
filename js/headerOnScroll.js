const header = document.querySelector("header");

function headerOnScroll() {
  window.scrollY > 100
    ? header.setAttribute("data-active", "true")
    : header.setAttribute("data-active", "false");
}

window.addEventListener("scroll", headerOnScroll);
