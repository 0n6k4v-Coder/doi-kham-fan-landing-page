const transition = document.querySelector(".hero-transition");
const organicWipe = document.querySelector(".organic-wipe");

if (transition && organicWipe) {
  const initialOffset = 115;

  let targetProgress = 0;
  let currentProgress = 0;
  let frameId = 0;

  const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };

  const easeInOut = (value) => {
    return value * value * (3 - 2 * value);
  };

  const getProgress = () => {
    const rect = transition.getBoundingClientRect();
    const transitionDistance =
      transition.offsetHeight - window.innerHeight;

    if (transitionDistance <= 0) {
      return 1;
    }

    const scrollPosition = -rect.top;

    return clamp(
      scrollPosition / transitionDistance,
      0,
      1
    );
  };

  const getTranslateY = (progress) => {
    return initialOffset - (easeInOut(progress) * initialOffset);
  };

  const render = () => {
    currentProgress +=
      (targetProgress - currentProgress) * 0.18;

    organicWipe.style.transform =
      `translate3d(0, ${getTranslateY(currentProgress)}%, 0)`;

    if (
      Math.abs(targetProgress - currentProgress) > 0.001
    ) {
      frameId = window.requestAnimationFrame(render);
      return;
    }

    currentProgress = targetProgress;

    organicWipe.style.transform =
      `translate3d(0, ${getTranslateY(currentProgress)}%, 0)`;

    frameId = 0;
  };

  const scheduleRender = () => {
    targetProgress = getProgress();

    if (!frameId) {
      frameId = window.requestAnimationFrame(render);
    }
  };

  const initialize = () => {
    targetProgress = getProgress();
    currentProgress = targetProgress;

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
    scheduleRender,
    { passive: true }
  );

  initialize();
}