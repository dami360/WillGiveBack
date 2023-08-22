const header = document.querySelector("header");

function headerOnScroll() {
  if (window.scrollY > 100) {
    header.setAttribute("data-active", "true");
  } else {
    header.setAttribute("data-active", "false");
  }
}

window.addEventListener("scroll", headerOnScroll);
