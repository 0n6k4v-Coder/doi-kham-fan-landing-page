class DoiKhamAbout extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) {
      return;
    }

    this.innerHTML = `
      <section class="about" aria-labelledby="about-heading">
        <div class="about__container">

          <div class="about__heading-container">
            <h2 class="about__heading" id="about-heading">
              WHAT’S DOI KHAM?
            </h2>
          </div>

          <div class="about__description-container">
            <p class="about__description">
              About Doi Kham Tomato<br>
              A 100% natural, refreshing tomato juice crafted from hand-picked
              early-season tomatoes grown by Thai farmers in the upper northeastern
              region, capturing farm-fresh taste and wholesome goodness in every can.
            </p>
          </div>

          <div class="about__cards-container">
            <div class="about__cards" id="about-cards"></div>
          </div>

          <div class="about__note-container">
            <p class="about__note">
              *Nutritional values and Lycopene content are calculated based on Thai
              RDI (Recommended Daily Intakes) for Thai people aged 6 years and above,
              backed by over 20 years of sustainable farming partnerships along the Mekong River.
            </p>
          </div>

        </div>
      </section>
    `;

    const aboutCardsContainer = this.querySelector("#about-cards");

    const aboutCards = [
      {
        header: "HARVEST",
        details:
          "Hand-picked early-season tomatoes for a farm-fresh taste!"
      },
      {
        header: "REFRESH",
        details:
          "A crisp twist on classic tomato juice for effortless wellness!"
      },
      {
        header: "WELLNESS",
        details:
          "Packed with Lycopene and vitamins to nourish your daily glow!"
      }
    ];

    const createAboutCard = (card) => {
      const article = document.createElement("article");
      const content = document.createElement("div");
      const header = document.createElement("h3");
      const details = document.createElement("p");

      article.className = "about-card";
      content.className = "about-card__content";
      header.className = "about-card__header";
      details.className = "about-card__details";

      header.textContent = card.header;
      details.textContent = card.details;

      content.append(header, details);
      article.appendChild(content);

      return article;
    };

    const fragment = document.createDocumentFragment();

    aboutCards.forEach((card) => {
      fragment.appendChild(createAboutCard(card));
    });

    aboutCardsContainer?.replaceChildren(fragment);
  }
}

customElements.define("doi-kham-about", DoiKhamAbout);
