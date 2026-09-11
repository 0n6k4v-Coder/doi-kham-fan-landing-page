class DoiKhamTomatoDetail extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) {
      return;
    }

    this.innerHTML = `
      <section class="tomato-detail" aria-label="Tomato detail">
        <div class="tomato-detail__container">
          <div class="tomato-detail__side tomato-detail__side--left">
            <div class="tomato-detail__side-grid">
              <div class="tomato-detail__grid-item tomato-detail__grid-item--top-left">
                <img
                  class="tomato-detail__product-image"
                  src="./assets/images/doi-kham-tomato-juice.png"
                  alt="Doi Kham Tomato Juice"
                  loading="eager"
                  decoding="async"
                  draggable="false"
                >
              </div>

              <div class="tomato-detail__grid-item tomato-detail__grid-item--top-right">
                <img
                  class="tomato-detail__product-image"
                  src="https://static.vecteezy.com/system/resources/thumbnails/070/183/417/small/vibrant-red-tomato-with-fresh-dew-drops-on-transparent-background-png.png"
                  alt="Fresh red tomato"
                  loading="eager"
                  decoding="async"
                  draggable="false"
                >
              </div>

              <div class="tomato-detail__grid-item tomato-detail__grid-item--bottom-left">
                <img
                  class="tomato-detail__product-image"
                  src="https://static.vecteezy.com/system/resources/thumbnails/070/183/417/small/vibrant-red-tomato-with-fresh-dew-drops-on-transparent-background-png.png"
                  alt="Fresh red tomato"
                  loading="eager"
                  decoding="async"
                  draggable="false"
                >
              </div>

              <div class="tomato-detail__grid-item tomato-detail__grid-item--bottom-right">
                <img
                  class="tomato-detail__product-image"
                  src="./assets/images/doi-kham-tomato-juice-low-sodium.png"
                  alt="Doi Kham Tomato Juice Low Sodium"
                  loading="eager"
                  decoding="async"
                  draggable="false"
                >
              </div>
            </div>
          </div>

          <div class="tomato-detail__center">
            <div class="tomato-detail__center-headline">
              <div class="tomato-detail__center-headline-top">
                <p class="tomato-detail__center-headline-block">PURE TOMATO,</p>
              </div>
              <div class="tomato-detail__center-headline-bottom">
                <p class="tomato-detail__center-headline-block">VIBRANT HEALTH.</p>
              </div>
            </div>

            <div class="tomato-detail__center-copy">
              <p class="tomato-detail__center-copy-block">Drinking well should be a daily pleasure. A crisp sip of vibrant tomato juice is one of life’s simplest, most refreshing daily entertainments.</p>
              <p class="tomato-detail__center-copy-block">Yet, choosing health often feels like a compromise—and busy, fast-paced schedules turn daily nourishment into nothing more than a chore to be rushed through.</p>
              <p class="tomato-detail__center-copy-block">Where farm-fresh goodness and everyday vitality meet in a single glass. That is the inspiration behind Doi Kham’s tomato journey: wholesome nourishment made effortlessly real and vibrant.</p>
              <p class="tomato-detail__center-copy-block">More radiance with every sip. More flavor in every harvest. Bringing the rich crimson spirit of Thai fields and a splash of natural color to your daily routine.</p>
            </div>
          </div>

          <div class="tomato-detail__side tomato-detail__side--right">
            <div class="tomato-detail__side-grid">
              <div class="tomato-detail__grid-item tomato-detail__grid-item--top-left">
                <img
                  class="tomato-detail__product-image"
                  src="https://static.vecteezy.com/system/resources/thumbnails/070/183/417/small/vibrant-red-tomato-with-fresh-dew-drops-on-transparent-background-png.png"
                  alt="Fresh red tomato"
                  loading="eager"
                  decoding="async"
                  draggable="false"
                >
              </div>

              <div class="tomato-detail__grid-item tomato-detail__grid-item--top-right">
                <img
                  class="tomato-detail__product-image"
                  src="./assets/images/doi-kham-tomato-juice-low-sodium.png"
                  alt="Doi Kham Tomato Juice Low Sodium"
                  loading="eager"
                  decoding="async"
                  draggable="false"
                >
              </div>

              <div class="tomato-detail__grid-item tomato-detail__grid-item--bottom-left">
                <img
                  class="tomato-detail__product-image"
                  src="./assets/images/doi-kham-tomato-juice.png"
                  alt="Doi Kham Tomato Juice"
                  loading="eager"
                  decoding="async"
                  draggable="false"
                >
              </div>

              <div class="tomato-detail__grid-item tomato-detail__grid-item--bottom-right">
                <img
                  class="tomato-detail__product-image"
                  src="https://static.vecteezy.com/system/resources/thumbnails/070/183/417/small/vibrant-red-tomato-with-fresh-dew-drops-on-transparent-background-png.png"
                  alt="Fresh red tomato"
                  loading="eager"
                  decoding="async"
                  draggable="false"
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("doi-kham-tomato-detail", DoiKhamTomatoDetail);
