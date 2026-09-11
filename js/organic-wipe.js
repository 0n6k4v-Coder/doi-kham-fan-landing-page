const transition = document.querySelector(".hero-transition");
const organicWipe = document.querySelector(".organic-wipe");

if (transition && organicWipe) {
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
      transition.offsetHeight - window.innerHeight,
      1
    );
  };

  const getProgress = () => {
    const transitionTop =
      transition.getBoundingClientRect().top +
      window.scrollY;

    const currentScroll =
      window.scrollY - transitionTop;

    return clamp(
      currentScroll / getScrollRange(),
      0,
      1
    );
  };

  const getTranslateY = (progress) => {
    const easedProgress =
      easeInOut(progress);

    /*
     * Start far enough below the Hero that the oversized
     * organic geometry cannot appear before scrolling.
     *
     * End at 0% so the wipe's own geometry reaches its
     * intended final position without overshooting above it.
     */
    const startOffset = 120;

    return (
      startOffset -
      (easedProgress * startOffset)
    );
  };

  const render = () => {
    currentProgress +=
      (targetProgress - currentProgress) * 0.18;

    organicWipe.style.transform =
      `translate3d(0, ${getTranslateY(currentProgress)}%, 0)`;

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

    organicWipe.style.transform =
      `translate3d(0, ${getTranslateY(currentProgress)}%, 0)`;

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

    organicWipe.style.transform =
      `translate3d(0, ${getTranslateY(currentProgress)}%, 0)`;
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