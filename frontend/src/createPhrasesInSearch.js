let phrases = [
  "Madrid",
  "Copenhagen",
  "Rome",
  "Buenos Aires",
  "San Salvador",
  "Luxembourg",
  "San Francisco",
  "London",
  "Los Angeles",
  "Berlin",
  "Tokio",
];
let i = 0;
let timeoutId;

export const typingEffect = (typing, input) => {
  input.addEventListener("focus", () => {
    typing.parentElement.style.display = "none";
    clearTimeout(timeoutId);
  });

  const startTypingAnimation = () => {
    typing.textContent = phrases[i];
    typing.style.animation = "none";
    typing.offsetHeight;
    typing.style.animation = "";
    rotatePhrases();
  };

  const rotatePhrases = () => {
    if (i >= phrases.length - 1) {
      i = 0;
      startTypingAnimation();
    } else {
      timeoutId = setTimeout(() => {
        i++;
        startTypingAnimation();
      }, 6000);
    }
  };

  input.addEventListener("focusout", () => {
    typing.parentElement.style.display = "block";
    if (input.value.length <= 0) {
      startTypingAnimation();
    } else {
      typing.style.animation = "none";
      typing.textContent = "";
    }
  });

  window.onload = () => {
    startTypingAnimation();
  };
};
