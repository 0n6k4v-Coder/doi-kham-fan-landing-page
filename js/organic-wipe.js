const organicSection = document.querySelector(".organic-section");
const organicOval = document.querySelector(".organic-oval");

if (organicSection && organicOval) {
  let targetProgress = 0;
  let currentProgress = 0;
  let frameId = 0;

  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  const easeInOut = (value) => {
    return value * value * (3 - 2 * value);
  };

  const getScrollRange = () => {
    return Math.max(
      organicSection.offsetHeight - window.innerHeight,
      1
    );
  };

  const getProgress = () => {
    const sectionTop =
      organicSection.getBoundingClientRect().top +
      window.scrollY;

    const scrollPosition =
      window.scrollY - sectionTop;

    return clamp(
      scrollPosition / getScrollRange(),
      0,
      1
    );
  };

  const getTranslateY = (progress) => {
    const easedProgress =
      easeInOut(progress);

    const startOffset =
      parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue(
            "--organic-oval-start-offset"
          )
      ) || 120;

    return (
      startOffset -
      (easedProgress * startOffset)
    );
  };

  const render = () => {
    currentProgress +=
      (targetProgress - currentProgress) * 0.18;

    organicOval.style.transform =
      `translate3d(-50%, ${getTranslateY(currentProgress)}%, 0)`;

    if (
      Math.abs(
        targetProgress - currentProgress
      ) > 0.001
    ) {
      frameId =
        window.requestAnimationFrame(render);

      return;
    }

    currentProgress =
      targetProgress;

    organicOval.style.transform =
      `translate3d(-50%, ${getTranslateY(currentProgress)}%, 0)`;

    frameId = 0;
  };

  const scheduleRender = () => {
    targetProgress =
      getProgress();

    if (!frameId) {
      frameId =
        window.requestAnimationFrame(render);
    }
  };

  const initialize = () => {
    targetProgress =
      getProgress();

    currentProgress =
      targetProgress;

    organicOval.style.transform =
      `translate3d(-50%, ${getTranslateY(currentProgress)}%, 0)`;
  };

  window.addEventListener(
    "scroll",
    scheduleRender,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    scheduleRender
  );

  initialize();
}