class DoiKhamVdo extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) {
      return;
    }

    this.innerHTML = `
      <section class="vdo-section" aria-label="DOI KHAM video">
        <div class="vdo-section__container">
          <video
            class="vdo-player"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          >
            <source
              src="./assets/video/videoplayback.mp4"
              type="video/mp4"
            >
            Your browser does not support the video element.
          </video>
        </div>
      </section>
    `;
  }
}

customElements.define("doi-kham-vdo", DoiKhamVdo);
