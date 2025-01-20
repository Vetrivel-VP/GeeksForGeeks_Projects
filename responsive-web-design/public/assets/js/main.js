document.addEventListener("DOMContentLoaded", () => {
  const navbarMenu = document.querySelector(".navbar-menu");
  const navbarToggle = document.querySelector(".navbar-toggle");

  navbarToggle.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");
  });

  //   close the menu when clicking outside

  document.addEventListener("click", (e) => {
    const isClickInsideMenu = navbarMenu.contains(e.target);
    const isClickOnToggle = navbarToggle.contains(e.target);

    if (
      !isClickInsideMenu &&
      !isClickOnToggle &&
      navbarMenu.classList.contains("active")
    ) {
      navbarMenu.classList.remove("active");
    }
  });

  //   close the menu when the window is resized
  window.addEventListener("resize", () => {
    if (window.length > 760 && navbarMenu.classList.contains("active")) {
      navbarMenu.classList.remove("active");
    }
  });
});
