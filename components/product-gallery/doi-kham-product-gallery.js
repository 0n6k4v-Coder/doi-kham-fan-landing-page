class DoiKhamProductGallery extends HTMLElement {
  constructor() {
    super();
    this.products = [
      {
        id: "product-01",
        name: "DOI KHAM Product 01",
        image: "./assets/images/doi-kham-tomato-juice.png"
      },
      {
        id: "product-02",
        name: "DOI KHAM Product 02",
        image: "./assets/images/doi-kham-tomato-juice-low-sodium.png"
      }
    ];
    this.resizeFrame = null;
    this.rebuildId = 0;
    this.handleResize = this.handleResize.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  connectedCallback() {
    if (this.hasChildNodes()) {
      return;
    }

    this.innerHTML = `
      <section class="product-gallery" aria-label="DOI KHAM products">
        <div class="product-gallery__track"></div>
      </section>
    `;

    this.gallery = this.querySelector(".product-gallery");
    this.track = this.querySelector(".product-gallery__track");

    if (!this.gallery || !this.track || !this.products.length) {
      return;
    }

    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.resizeObserver.observe(this.gallery);
    window.addEventListener("load", this.handleLoad, { once: true });

    this.rebuildTrack();
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    window.removeEventListener("load", this.handleLoad);
    if (this.resizeFrame) {
      cancelAnimationFrame(this.resizeFrame);
      this.resizeFrame = null;
    }
    this.rebuildId++;
  }

  handleResize() {
    if (this.resizeFrame) {
      cancelAnimationFrame(this.resizeFrame);
    }

    this.resizeFrame = requestAnimationFrame(() => {
      this.resizeFrame = null;
      this.rebuildTrack();
    });
  }

  handleLoad() {
    this.rebuildTrack();
  }

  nextFrame() {
    return new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });
  }

  waitForImages(container) {
    const images = [...container.querySelectorAll("img")];

    if (!images.length) {
      return Promise.resolve();
    }

    return Promise.all(
      images.map((image) => {
        if (image.complete) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      })
    );
  }

  createProductItem(product, isDuplicate = false) {
    const item = document.createElement("article");
    item.className = "product-gallery__item";
    item.dataset.productId = product.id;

    if (isDuplicate) {
      item.setAttribute("aria-hidden", "true");
    }

    const image = document.createElement("img");
    image.className = "product-gallery__image";
    image.src = product.image;
    image.alt = isDuplicate ? "" : product.name;
    image.loading = "eager";
    image.decoding = "async";
    item.appendChild(image);

    return item;
  }

  async rebuildTrack() {
    if (!this.gallery || !this.track || !this.products.length) {
      return;
    }

    const rebuildId = ++this.rebuildId;
    this.track.style.animation = "none";
    this.track.replaceChildren();

    const firstItem = this.createProductItem(this.products[0]);
    this.track.appendChild(firstItem);

    await this.waitForImages(firstItem);
    await this.nextFrame();

    if (rebuildId !== this.rebuildId) {
      return;
    }

    const itemRect = firstItem.getBoundingClientRect();
    const itemWidth = itemRect.width;
    const galleryGap = parseFloat(getComputedStyle(this.track).columnGap) || 0;
    const loopDistance = itemWidth + galleryGap;

    this.gallery.style.setProperty("--gallery-loop-distance", `${loopDistance}px`);

    await this.nextFrame();

    if (rebuildId !== this.rebuildId) {
      return;
    }

    const galleryWidth = this.gallery.getBoundingClientRect().width;
    const requiredTrackWidth = galleryWidth + loopDistance * 2;
    const requiredItems = Math.max(this.products.length * 2, Math.ceil(requiredTrackWidth / loopDistance));

    let productIndex = 1;
    while (this.track.children.length < requiredItems) {
      const product = this.products[productIndex % this.products.length];
      this.track.appendChild(this.createProductItem(product, true));
      productIndex++;
    }

    void this.track.offsetWidth;
    this.track.style.animation = "";
  }
}

customElements.define("doi-kham-product-gallery", DoiKhamProductGallery);
