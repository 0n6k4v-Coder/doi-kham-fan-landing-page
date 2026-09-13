const organicSection = document.querySelector(".organic-section");
const organicContainer = document.querySelector(".organic-container");

if (organicSection && organicContainer) {
  let targetProgress = 0;
  let currentProgress = 0;
  let animationFrameId = null;
  let previousTimestamp = 0;

  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  const easeInOut = (value) => {
    return value * value * (3 - 2 * value);
  };

  const getSectionTop = () => {
    return (
      organicSection.getBoundingClientRect().top +
      window.scrollY
    );
  };

  const getScrollRange = () => {
    return Math.max(
      organicSection.offsetHeight,
      1
    );
  };

  const getProgress = () => {
    const sectionTop = getSectionTop();
    const scrollPosition =
      window.scrollY - sectionTop;

    return clamp(
      scrollPosition / window.innerHeight,
      0,
      1
    );
  };

  const getStartOffset = () => {
    const value = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue(
          "--organic-container-start-offset"
        )
    );

    return Number.isFinite(value)
      ? value
      : 0;
  };

  const getTranslateY = (progress) => {
    const easedProgress = easeInOut(progress);
    const startOffset = getStartOffset();

    return (
      startOffset -
      (easedProgress * startOffset)
    );
  };

  const render = (timestamp) => {
    if (!previousTimestamp) {
      previousTimestamp = timestamp;
    }

    const deltaTime = Math.min(
      timestamp - previousTimestamp,
      32
    );

    previousTimestamp = timestamp;

    const smoothing =
      1 - Math.pow(0.001, deltaTime / 1000);

    currentProgress +=
      (targetProgress - currentProgress) *
      smoothing;

    organicContainer.style.transform =
      `translate3d(
        0,
        ${getTranslateY(currentProgress)}%,
        0
      )`;

    if (
      Math.abs(
        targetProgress - currentProgress
      ) > 0.001
    ) {
      animationFrameId =
        window.requestAnimationFrame(render);
      return;
    }

    currentProgress = targetProgress;

    organicContainer.style.transform =
      `translate3d(
        0,
        ${getTranslateY(currentProgress)}%,
        0
      )`;

    animationFrameId = null;
    previousTimestamp = 0;
    organicContainer.style.willChange = "auto";
  };

  const scheduleRender = () => {
    targetProgress = getProgress();

    if (!animationFrameId) {
      organicContainer.style.willChange = "transform";
      animationFrameId =
        window.requestAnimationFrame(render);
    }
  };

  const initialize = () => {
    targetProgress = getProgress();
    currentProgress = targetProgress;

    organicContainer.style.transform =
      `translate3d(
        0,
        ${getTranslateY(currentProgress)}%,
        0
      )`;
  };

  window.addEventListener(
    "scroll",
    scheduleRender,
    {
      passive: true
    }
  );

  window.addEventListener(
    "resize",
    scheduleRender
  );

  initialize();
}