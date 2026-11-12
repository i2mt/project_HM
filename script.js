/*
  GitHub Pages-only access gate for Project HM.
  IMPORTANT: This is a courtesy gate, not secure authentication.
  The code is visible to anyone who inspects the public JavaScript.
*/
const ACCESS_CODE = "2741537852";
const GAME_URL = "https://i2mt.github.io/Narcissu/";

const form = document.getElementById("access-form");
const input = document.getElementById("access-code");
const button = document.getElementById("reveal-button");
const message = document.getElementById("form-message");
const successPanel = document.getElementById("success-panel");
const projectLink = document.getElementById("project-link");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const code = input.value.trim();

  if (!/^\d{10}$/.test(code)) {
    message.textContent = "Please enter the 10-digit code.";
    input.focus();
    return;
  }

  if (ACCESS_CODE === "REPLACE_WITH_A_RANDOM_10_DIGIT_CODE") {
    message.textContent = "The access code hasn't been configured yet.";
    return;
  }

  button.disabled = true;
  message.textContent = "Checking…";

  if (code !== ACCESS_CODE) {
    message.textContent = "That code doesn't seem to match. Please try again.";
    input.select();
    button.disabled = false;
    return;
  }

  projectLink.href = GAME_URL;
  successPanel.hidden = false;
  form.hidden = true;
  message.textContent = "";
});
