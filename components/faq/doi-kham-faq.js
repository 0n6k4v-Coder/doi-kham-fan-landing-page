const FAQ_ITEMS = [
  { question: "What makes Doi Kham tomato juice different?", answer: "Doi Kham tomato juice is made to bring the natural goodness of carefully selected tomatoes into a refreshing and enjoyable everyday drink." },
  { question: "Where are the tomatoes used in Doi Kham juice grown?", answer: "The tomatoes are grown through farming partnerships in Thailand, connecting the product with local agricultural communities and fresh harvests." },
  { question: "Is Doi Kham tomato juice made from 100% natural tomatoes?", answer: "The product is presented as a natural tomato-based drink, designed to preserve the fresh character and vibrant taste of the tomatoes." },
  { question: "How should I enjoy Doi Kham tomato juice?", answer: "Chill before serving and enjoy it as a refreshing drink on its own or as part of your daily routine." },
  { question: "What is the best way to store Doi Kham tomato juice?", answer: "Follow the storage instructions provided on the product packaging and refrigerate after opening when required." },
];

class DoiKhamFaq extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) return;
    this.render();
    this.setupInteractions();
  }

  render() {
    this.innerHTML = `
      <article class="faq" aria-labelledby="faq-title">
        <div class="faq__container">
          <header class="faq__header"><h2 class="faq__header-text" id="faq-title">FAQ</h2></header>
          <div class="faq__list">
            ${FAQ_ITEMS.map((item) => `
              <details class="faq-card">
                <summary class="faq-card__summary">
                  <span class="faq-card__question">Q.</span>
                  <span class="faq-card__text">${item.question}</span>
                  <span class="faq-card__action" aria-hidden="true"><span class="faq-card__arrow"></span></span>
                </summary>
                <div class="faq-card__details"><div class="faq-card__details-inner"><p class="faq-card__details-text">${item.answer}</p></div></div>
              </details>
            `).join("")}
          </div>
        </div>
      </article>`;
  }

  setupInteractions() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.querySelectorAll(".faq-card").forEach((card) => {
      const summary = card.querySelector(".faq-card__summary");
      const details = card.querySelector(".faq-card__details");
      let animationFrame = 0;

      const openFaq = () => {
        cancelAnimationFrame(animationFrame);
        card.open = true;
        card.classList.add("is-open");
        details.style.height = "0px";

        if (prefersReducedMotion) {
          details.style.height = "auto";
          return;
        }

        animationFrame = requestAnimationFrame(() => {
          details.style.height = `${details.scrollHeight}px`;
        });

        const onOpenEnd = (event) => {
          if (event.propertyName !== "height") return;
          details.style.height = "auto";
          details.removeEventListener("transitionend", onOpenEnd);
        };

        details.addEventListener("transitionend", onOpenEnd);
      };

      const closeFaq = () => {
        cancelAnimationFrame(animationFrame);
        details.style.height = `${details.scrollHeight}px`;

        if (prefersReducedMotion) {
          card.classList.remove("is-open");
          card.open = false;
          details.style.height = "";
          return;
        }

        animationFrame = requestAnimationFrame(() => {
          card.classList.remove("is-open");
          details.style.height = "0px";
        });

        const onCloseEnd = (event) => {
          if (event.propertyName !== "height") return;
          card.open = false;
          details.style.height = "";
          details.removeEventListener("transitionend", onCloseEnd);
        };

        details.addEventListener("transitionend", onCloseEnd);
      };

      summary.addEventListener("click", (event) => {
        event.preventDefault();

        if (card.open) {
          closeFaq();
        } else {
          openFaq();
        }
      });
    });
  }
}

customElements.define("doi-kham-faq", DoiKhamFaq);
