class DoiKhamBrandStory extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) return;
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="brand-story" aria-labelledby="brand-story-heading">
        <div class="brand-story__container">
          <div class="brand-story__intro">
            <h2 class="brand-story__heading" id="brand-story-heading">BRAND STORY</h2>
            <p class="brand-story__question">Can healthy drinking be more fun?</p>
          </div>

          <div class="brand-story__story">
            <div class="brand-story__image-container">
              <img class="brand-story__image" src="https://www.doikham.co.th/_next/image?url=https%3A%2F%2Fdoikham.co.th%2Fcms%2Fuploads%2Fbanner_copy_e31e21faf3.webp&w=640&q=75" alt="Doi Kham brand story" width="427" height="302" loading="lazy" decoding="async" draggable="false">
            </div>
            <div class="brand-story__copy">
              <p class="brand-story__copy-block">Doi Kham’s tomato journey began with a simple question: What if healthy drinks were genuinely fun?</p>
              <p class="brand-story__copy-block">Most health beverages feel like a chore—consumed purely for results, leaving no room for joy.</p>
              <p class="brand-story__copy-block">So we asked: what if wellness could be vibrantly delicious?</p>
              <p class="brand-story__copy-block">By bringing hand-picked early-season tomatoes from northern Thailand into your daily routine, we offer a refreshing way to stay healthy: a crisp sip that is as free, casual, and delicious as it is natural.</p>
            </div>
          </div>

          <div class="brand-story__gallery">
            <div class="brand-story__gallery-item brand-story__gallery-item--left">
              <img class="brand-story__gallery-image brand-story__gallery-image--left" src="https://www.doikham.co.th/_next/image?url=https%3A%2F%2Fdoikham.co.th%2Fcms%2Fuploads%2Frectangle_160780_5_12dc948b9d.webp&w=640&q=75" alt="Doi Kham tomato story" width="354" height="240" loading="lazy" decoding="async" draggable="false">
            </div>
            <div class="brand-story__gallery-item brand-story__gallery-item--right">
              <img class="brand-story__gallery-image brand-story__gallery-image--right" src="https://doikham.co.th/uploads/1_scaled_ad9cb1abe8.jpg" alt="Doi Kham brand story" width="378" height="252" loading="lazy" decoding="async" draggable="false">
            </div>
          </div>

          <div class="brand-story__ending">
            <div class="brand-story__ending-copy">
              <p class="brand-story__ending-block">There is also a story behind Doi Kham's tomato journey. Inspired by the rich fields of northern Thailand and hand-picked early-season harvests, we chose a name and a taste that values playfulness, vibrant health, and approachability.</p>
              <p class="brand-story__ending-block">From sustainable farming partnerships along the Mekong River to a crisp, refreshing sip in every can, we embedded the lively spirit of Thai farmers directly into the experience.</p>
              <p class="brand-story__ending-block">We invite you to experience the bright side of Doi Kham for yourself. Before you know it, you'll find yourself falling in love with tomato juice!</p>
            </div>
            <div class="brand-story__ending-image-container">
              <img class="brand-story__ending-image" src="./assets/images/doi-kham-tomato-juice.png" alt="Doi Kham brand story" width="142" height="345" loading="lazy" decoding="async" draggable="false">
            </div>
          </div>
        </div>
      </section>`;
  }
}

customElements.define("doi-kham-brand-story", DoiKhamBrandStory);