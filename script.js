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

function clearError() {
  form.classList.remove("is-error");
  input.removeAttribute("aria-invalid");
}

input.addEventListener("input", clearError);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();

  const code = input.value.trim();

  if (!/^\d{10}$/.test(code)) {
    form.classList.add("is-error");
    input.setAttribute("aria-invalid", "true");
    message.textContent = "Please enter all 10 digits.";
    input.focus();
    return;
  }

  button.disabled = true;
  message.textContent = "Checking…";

  if (code !== ACCESS_CODE) {
    form.classList.add("is-error");
    input.setAttribute("aria-invalid", "true");
    message.textContent = "That code doesn't match. Please try again.";
    input.select();
    button.disabled = false;
    return;
  }

  form.classList.add("is-success");
  projectLink.href = GAME_URL;
  successPanel.hidden = false;
  form.hidden = true;
  message.textContent = "";
});
