class DoiKhamProductLine extends HTMLElement {
  constructor() {
    super();
    this.products = [
      {
        className: "product-card--low-sodium",
        backColor: "#D84315",
        name: ["100%", "TOMATO", "JUICE", "LOW", "SODIUM"],
        image: "https://www.doikham.co.th/_next/image?url=https%3A%2F%2Fdoikham.co.th%2Fcms%2Fuploads%2F100_f242bd5afb.webp&w=640&q=75",
        price: "฿20"
      },
      {
        className: "product-card--original",
        backColor: "#2E5A27",
        name: ["100%", "TOMATO", "JUICE"],
        image: "https://www.doikham.co.th/_next/image?url=https%3A%2F%2Fdoikham.co.th%2Fcms%2Fuploads%2F100_9683800527.webp&w=3840&q=75",
        price: "฿20"
      },
      {
        className: "product-card--mocktail",
        backColor: "#47CDFA",
        name: ["100%", "TOMATO", "JUICE", "MOCK", "TAIL"],
        image: "https://www.doikham.co.th/_next/image?url=https%3A%2F%2Fdoikham.co.th%2Fcms%2Fuploads%2F_b7dfe7218f.webp&w=640&q=75",
        price: "฿20"
      }
    ];
    this.mobileBreakpoint = 560;
    this.productCount = this.products.length;
    this.currentMobileIndex = this.productCount + 1;
    this.isNormalizing = false;
    this.isProgrammaticScroll = false;
    this.scrollEndTimer = null;
    this.lastMobileState = false;
    this.resizeObserver = null;
  }

  connectedCallback() {
    if (this.hasChildNodes()) {
      return;
    }

    this.renderStructure();
    this.cacheElements();
    this.bindEvents();
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.content);
    this.render();
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    if (this.scrollEndTimer) {
      clearTimeout(this.scrollEndTimer);
      this.scrollEndTimer = null;
    }
    window.removeEventListener("resize", this.handleWindowResize);
    this.previousButton?.removeEventListener("click", this.handlePrevious);
    this.nextButton?.removeEventListener("click", this.handleNext);
    this.content?.removeEventListener("scroll", this.handleScroll);
    this.content?.removeEventListener("scrollend", this.handleScrollEnd);
  }

  renderStructure() {
    this.innerHTML = `
      <section class="product-line-up" aria-labelledby="product-line-up-title">
        <div class="product-line-up__container">
          <div class="product-line-up__logo-container">
            <img
              class="product-line-up__logo"
              src="https://www.doikham.co.th/images/layout/header/logo.png"
              alt="DOI KHAM"
              width="72"
              height="72"
            >
          </div>
          <h2 class="product-line-up__title" id="product-line-up-title">RED HARVEST LINE</h2>
          <div class="product-line-up__content">
            <div class="product-line-up__cards"></div>
          </div>
          <div class="product-line-up__controls" aria-label="Product carousel controls">
            <div class="product-line-up__control">
              <button class="product-line-up__control-button" type="button" data-direction="previous" aria-label="Previous product">
                <svg class="product-line-up__control-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                  <path d="M14.5 5.5L8 12l6.5 6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
            <div class="product-line-up__control">
              <button class="product-line-up__control-button" type="button" data-direction="next" aria-label="Next product">
                <svg class="product-line-up__control-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                  <path d="M9.5 5.5L16 12l-6.5-6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  cacheElements() {
    this.content = this.querySelector(".product-line-up__content");
    this.cards = this.querySelector(".product-line-up__cards");
    this.previousButton = this.querySelector('[data-direction="previous"]');
    this.nextButton = this.querySelector('[data-direction="next"]');
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollEnd = this.handleScrollEnd.bind(this);
  }

  bindEvents() {
    this.previousButton.addEventListener("click", this.handlePrevious);
    this.nextButton.addEventListener("click", this.handleNext);
    this.content.addEventListener("scroll", this.handleScroll);
    if ("onscrollend" in window) {
      this.content.addEventListener("scrollend", this.handleScrollEnd);
    }
    window.addEventListener("resize", this.handleWindowResize);
  }

  createProductCard(product, clone = false) {
    const shell = document.createElement("div");
    shell.className = "product-card-shell";
    shell.style.setProperty("--product-card-back-bg", product.backColor);

    if (clone) {
      shell.setAttribute("aria-hidden", "true");
    }

    const backCard = document.createElement("div");
    backCard.className = "product-card-back";
    backCard.setAttribute("aria-hidden", "true");

    const article = document.createElement("article");
    article.className = `product-card ${product.className}`;
    article.innerHTML = `
      <div class="product-card__main">
        <div class="product-card__text">
          <h3 class="product-card__name">
            ${product.name.map(line => `<span>${line}</span>`).join("")}
          </h3>
        </div>
        <div class="product-card__image-wrap">
          <img
            class="product-card__image"
            src="${product.image}"
            alt="${product.name.join(" ")}"
            loading="lazy"
            draggable="false"
          />
        </div>
      </div>
      <div class="product-card__footer">
        <p class="product-card__price">${product.price}</p>
        <button class="product-card__button" type="button" aria-label="Add ${product.name.join(" ")}">+</button>
      </div>
    `;

    shell.append(backCard, article);
    return shell;
  }

  renderDesktop() {
    this.cards.replaceChildren();
    this.products.forEach(product => this.cards.appendChild(this.createProductCard(product)));
    this.currentMobileIndex = this.productCount + 1;
    this.isNormalizing = false;
    this.isProgrammaticScroll = false;
  }

  getMobileGap() {
    const card = this.cards.querySelector(".product-card");
    if (!card) return { cardWidth: 0, gap: 0 };
    const cardWidth = card.getBoundingClientRect().width;
    const cardsStyle = getComputedStyle(this.cards);
    const gap = parseFloat(cardsStyle.columnGap || cardsStyle.gap) || 0;
    return { cardWidth, gap };
  }

  getMobileItemStep() {
    const { cardWidth, gap } = this.getMobileGap();
    return cardWidth + gap;
  }

  getMobileTarget(index) {
    const card = this.cards.querySelector(".product-card");
    if (!card) return 0;
    return this.getMobileItemStep() * index - (this.content.clientWidth - card.getBoundingClientRect().width) / 2;
  }

  renderMobile() {
    this.cards.replaceChildren();
    this.products.forEach(product => this.cards.appendChild(this.createProductCard(product, true)));
    this.products.forEach(product => this.cards.appendChild(this.createProductCard(product)));
    this.products.forEach(product => this.cards.appendChild(this.createProductCard(product, true)));
    this.currentMobileIndex = this.productCount + 1;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const card = this.cards.querySelector(".product-card");
        if (!card) return;
        this.content.scrollLeft = this.getMobileTarget(this.currentMobileIndex);
      });
    });
  }

  isMobile() {
    return window.innerWidth <= this.mobileBreakpoint;
  }

  scrollToMobileIndex(index, behavior = "smooth") {
    const card = this.cards.querySelector(".product-card");
    if (!card) return;
    this.currentMobileIndex = index;
    this.isProgrammaticScroll = true;
    this.content.scrollTo({ left: this.getMobileTarget(index), behavior });
  }

  normalizeMobilePosition() {
    if (!this.isMobile() || this.isNormalizing) return;

    if (this.currentMobileIndex >= this.productCount * 2) {
      this.isNormalizing = true;
      this.currentMobileIndex -= this.productCount;
      this.content.style.scrollSnapType = "none";
      this.content.scrollLeft = this.getMobileTarget(this.currentMobileIndex);
      requestAnimationFrame(() => {
        this.content.style.scrollSnapType = "x mandatory";
        this.isNormalizing = false;
      });
      return;
    }

    if (this.currentMobileIndex < this.productCount) {
      this.isNormalizing = true;
      this.currentMobileIndex += this.productCount;
      this.content.style.scrollSnapType = "none";
      this.content.scrollLeft = this.getMobileTarget(this.currentMobileIndex);
      requestAnimationFrame(() => {
        this.content.style.scrollSnapType = "x mandatory";
        this.isNormalizing = false;
      });
    }
  }

  getNearestMobileIndex() {
    const card = this.cards.querySelector(".product-card");
    if (!card) return this.currentMobileIndex;
    const step = this.getMobileItemStep();
    const centeredOffset = (this.content.clientWidth - card.getBoundingClientRect().width) / 2;
    return Math.round((this.content.scrollLeft + centeredOffset) / step);
  }

  handleScrollEnd() {
    if (!this.isMobile()) return;
    this.currentMobileIndex = this.getNearestMobileIndex();
    this.normalizeMobilePosition();
    this.isProgrammaticScroll = false;
  }

  handlePrevious() {
    if (!this.isMobile()) return;
    this.scrollToMobileIndex(this.getNearestMobileIndex() - 1);
  }

  handleNext() {
    if (!this.isMobile()) return;
    this.scrollToMobileIndex(this.getNearestMobileIndex() + 1);
  }

  handleScroll() {
    if (!this.isMobile() || this.isNormalizing) return;
    this.currentMobileIndex = this.getNearestMobileIndex();
    const normalizedUpper = this.productCount * 2 + 0.5;
    const normalizedLower = this.productCount - 0.5;
    if (this.currentMobileIndex >= normalizedUpper || this.currentMobileIndex <= normalizedLower) {
      this.normalizeMobilePosition();
    }

    if (!("onscrollend" in window)) {
      clearTimeout(this.scrollEndTimer);
      this.scrollEndTimer = setTimeout(this.handleScrollEnd, 100);
    }
  }

  handleResize() {
    if (!this.isMobile()) return;
    requestAnimationFrame(() => {
      const currentIndex = this.getNearestMobileIndex();
      this.currentMobileIndex = Math.min(this.productCount * 2 - 1, Math.max(this.productCount, currentIndex));
      this.content.style.scrollSnapType = "none";
      this.content.scrollLeft = this.getMobileTarget(this.currentMobileIndex);
      requestAnimationFrame(() => {
        this.content.style.scrollSnapType = "x mandatory";
      });
    });
  }

  handleWindowResize() {
    const currentMobileState = this.isMobile();
    if (currentMobileState === this.lastMobileState) return;
    this.lastMobileState = currentMobileState;
    this.render();
  }

  render() {
    if (!this.content || !this.cards) return;
    if (this.isMobile()) {
      this.renderMobile();
    } else {
      this.renderDesktop();
    }
    this.lastMobileState = this.isMobile();
  }
}

customElements.define("doi-kham-product-line", DoiKhamProductLine);
