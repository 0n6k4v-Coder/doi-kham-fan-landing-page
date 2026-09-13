class DoiKhamNews extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) return;
    this.render();
  }

  render() {
    this.innerHTML = `
      <article class="news" aria-labelledby="news-title">
        <div class="news__container">
          <header class="news__header">
            <h2 class="news__header-text" id="news-title">NEWS</h2>
          </header>

          <div class="news__list">
            <article class="news-card">
              <div class="news-card__content">
                <div class="news-card__metadata">
                  <time class="news-card__date" datetime="2026-01-15">January 15, 2026</time>
                  <span class="news-card__category">NEWS</span>
                </div>
                <h3 class="news-card__headline">Doi Kham introduces a fresh way to enjoy everyday tomato goodness.</h3>
              </div>
              <button class="news-card__action" type="button" aria-label="Read Doi Kham introduces a fresh way to enjoy everyday tomato goodness">
                <svg class="news-card__action-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12h16"></path>
                  <path d="m13 6 6 6-6 6"></path>
                </svg>
              </button>
            </article>

            <article class="news-card">
              <div class="news-card__content">
                <div class="news-card__metadata">
                  <time class="news-card__date" datetime="2026-02-03">February 3, 2026</time>
                  <span class="news-card__category">NEWS</span>
                </div>
                <h3 class="news-card__headline">From Thai farms to your daily routine: the story behind Doi Kham tomato juice.</h3>
              </div>
              <button class="news-card__action" type="button" aria-label="Read the story behind Doi Kham tomato juice">
                <svg class="news-card__action-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12h16"></path>
                  <path d="m13 6 6 6-6 6"></path>
                </svg>
              </button>
            </article>

            <article class="news-card">
              <div class="news-card__content">
                <div class="news-card__metadata">
                  <time class="news-card__date" datetime="2026-03-20">March 20, 2026</time>
                  <span class="news-card__category">NEWS</span>
                </div>
                <h3 class="news-card__headline">Discover the vibrant taste and natural goodness in every can.</h3>
              </div>
              <button class="news-card__action" type="button" aria-label="Read Discover the vibrant taste and natural goodness in every can">
                <svg class="news-card__action-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12h16"></path>
                  <path d="m13 6 6 6-6 6"></path>
                </svg>
              </button>
            </article>
          </div>

          <div class="news__actions">
            <a class="news__read-more" href="#">Read More</a>
            <button class="news__down-button" type="button" aria-label="Show more news">
              <svg class="news__down-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v16"></path>
                <path d="m6 13 6 6 6-6"></path>
              </svg>
            </button>
          </div>
        </div>
      </article>`;
  }
}

customElements.define("doi-kham-news", DoiKhamNews);