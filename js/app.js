import "../components/hero/doi-kham-hero.js";
import "../components/tomato-detail/doi-kham-tomato-detail.js";
import "../components/vdo/doi-kham-vdo.js";
import "../components/about/doi-kham-about.js";
import "../components/product-gallery/doi-kham-product-gallery.js";
import "../components/product-line/doi-kham-product-line.js";
import "../components/brand-story/doi-kham-brand-story.js";
import "../components/news/doi-kham-news.js";
import "../components/faq/doi-kham-faq.js";
import "./organic-container.js";

const brandElement = document.querySelector("#doi-kham-brand");
const descriptionElement = document.querySelector("#footer-description");

if (brandElement && descriptionElement) {
  const updateBrandWidth = () => {
    const descriptionWidth = descriptionElement.getBoundingClientRect().width;
    const brandWidth = brandElement.offsetWidth;

    if (!brandWidth) {
      return;
    }

    brandElement.style.setProperty("--doi-kham-scale-x", descriptionWidth / brandWidth);
  };

  const resizeObserver = new ResizeObserver(updateBrandWidth);

  resizeObserver.observe(descriptionElement);

  if (document.fonts?.ready) {
    document.fonts.ready.then(updateBrandWidth);
  }

  window.addEventListener("resize", updateBrandWidth);
  updateBrandWidth();
}