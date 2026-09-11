class DoiKhamHero extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) {
      return;
    }

    this.innerHTML = `
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__content">
          <h1 class="hero__title" id="hero-title">DOI KHAM</h1>

          <div class="hero__copy">
            <p class="hero__eyebrow">
              100% natural tomato juice with a playful twist — doi kham
            </p>

            <div class="hero__headline-group">
              <p class="hero__headline">PURE TOMATO</p>
              <p class="hero__headline">PLAYFUL GLOW.</p>
            </div>

            <p class="hero__release">
              2026.9.8 NEW DROP!!
            </p>

            <p class="hero__location">
              BANGKOK THAILAND
            </p>
          </div>
        </div>

        <img
          class="hero__hand hero__hand--left"
          src="./assets/images/left-hand.png"
          alt=""
          aria-hidden="true"
        >

        <img
          class="hero__hand hero__hand--right"
          src="./assets/images/right-hand.png"
          alt=""
          aria-hidden="true"
        >

        <div
          class="scroll-indicator"
          aria-hidden="true"
        >
          <svg
            class="scroll-indicator__ring"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path
                id="scroll-indicator-circle-path"
                d="
                  M 100 100
                  m -82 0
                  a 82 82 0 1 1 164 0
                  a 82 82 0 1 1 -164 0
                "
              />
            </defs>

            <text class="scroll-indicator__text">
              <textPath
                href="#scroll-indicator-circle-path"
                startOffset="0%"
              >
                SCROLL DOWN •
              </textPath>
            </text>

            <text class="scroll-indicator__text">
              <textPath
                href="#scroll-indicator-circle-path"
                startOffset="25%"
              >
                SCROLL DOWN •
              </textPath>
            </text>

            <text class="scroll-indicator__text">
              <textPath
                href="#scroll-indicator-circle-path"
                startOffset="50%"
              >
                SCROLL DOWN •
              </textPath>
            </text>

            <text class="scroll-indicator__text">
              <textPath
                href="#scroll-indicator-circle-path"
                startOffset="75%"
              >
                SCROLL DOWN •
              </textPath>
            </text>
          </svg>

          <svg
            class="scroll-indicator__arrow"
            viewBox="0 0 24 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="scroll-indicator__arrow-line"
              d="
                M 12 3
                V 27
                M 5 20
                L 12 27
                L 19 20
              "
            />
          </svg>
        </div>
      </section>
    `;
  }
}

customElements.define("doi-kham-hero", DoiKhamHero);