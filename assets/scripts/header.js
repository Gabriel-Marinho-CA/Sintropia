class StickyHeader extends HTMLElement {
  connectedCallback() {
    this.header = this.querySelector("header");
    this.headerBounds = {};

    this.setHeaderHeight(); // <-- seta logo ao carregar

    this.createObserver();

    // Atualiza altura no resize também
    window.addEventListener("resize", () => {
      this.setHeaderHeight();
    });
    window.addEventListener("load", () => {
      this.setHeaderHeight();
    });

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;

      if (scrollTop > this.headerBounds.bottom) {
        this.header.classList.add("scrolled-past-header");
      } else {
        this.header.classList.remove("scrolled-past-header");
      }
    });
  }

  setHeaderHeight() {
    const height = this.header.offsetHeight;

    document.documentElement.style.setProperty(
      "--header-height",
      `${height}px`,
    );
  }

  createObserver() {
    const observer = new IntersectionObserver((entries) => {
      this.headerBounds = entries[0].intersectionRect;
      observer.disconnect();
    });

    observer.observe(this.header);
  }
}

customElements.define("sticky-header", StickyHeader);

document.addEventListener("DOMContentLoaded", function () {
  const burguer_btn = document.getElementById("menu-hamburguer");
  const mob_menu = document.getElementById("menu-mobile");
  const menu_items = mob_menu.querySelectorAll(".header__menu-item");

  burguer_btn.addEventListener("click", function () {
    if (mob_menu.classList.contains("active")) {
      mob_menu.classList.remove("active");
      burguer_btn.classList.remove("active");
    } else {
      mob_menu.classList.add("active");
      burguer_btn.classList.add("active");
    }
  });
  menu_items.forEach((el) => {
    el.addEventListener("click", function () {
      mob_menu.classList.remove("active");
    });
  });
});
