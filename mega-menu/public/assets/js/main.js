let menuToggle = document.querySelector(".menuToggle");
let header = document.querySelector("header");

menuToggle.addEventListener("click", () => {
  header.classList.toggle("active");
});
