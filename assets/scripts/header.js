class StickyHeader extends HTMLElement {
  connectedCallback() {
    this.header = this.querySelector("header");
    this.headerBounds = {};

    this.setHeaderHeight();
    this.createObserver();

    window.addEventListener("resize", () => {
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

    // ✅ NOVO: esconder ao chegar na seção
    this.hideOnSection("#Funcionalidades");
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

  // ✅ NOVA FUNÇÃO
  hideOnSection(selector) {
    const targetSection = document.querySelector(selector);
    if (!targetSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.header.classList.add("hide-header");
        } else {
          this.header.classList.remove("hide-header");
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${this.header.offsetHeight}px 0px 0px 0px`,
      },
    );

    observer.observe(targetSection);
  }
}

customElements.define("sticky-header", StickyHeader);
