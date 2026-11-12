/*
  Set WORKER_URL in this file after deploying worker.js.
  Do not put the access code or the Narcissu URL in this file.
*/
const WORKER_URL = "https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev";

const form = document.getElementById("access-form");
const input = document.getElementById("access-code");
const button = document.getElementById("reveal-button");
const message = document.getElementById("form-message");
const successPanel = document.getElementById("success-panel");
const projectLink = document.getElementById("project-link");

async function sendEvent(type, code) {
  const response = await fetch(`${WORKER_URL}/access`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, ...(code ? { code } : {}) })
  });
  return response;
}

// Record only a page-open event. No IP, location, device ID, or fingerprint is stored.
if (WORKER_URL.startsWith("https://") && !WORKER_URL.includes("YOUR-WORKER")) {
  sendEvent("visit").catch(() => {});
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const code = input.value.trim();

  if (!/^\d{10}$/.test(code)) {
    message.textContent = "Please enter the 10-digit code.";
    input.focus();
    return;
  }
  if (!WORKER_URL.startsWith("https://") || WORKER_URL.includes("YOUR-WORKER")) {
    message.textContent = "The private access service has not been connected yet.";
    return;
  }

  button.disabled = true;
  message.textContent = "Checking…";
  try {
    const response = await sendEvent("unlock", code);
    const data = await response.json();
    if (!response.ok || !data.ok || !data.url) {
      message.textContent = "That code doesn't seem to match. Please try again.";
      input.select();
      return;
    }
    projectLink.href = data.url;
    successPanel.hidden = false;
    form.hidden = true;
    message.textContent = "";
  } catch {
    message.textContent = "Couldn't connect right now. Please try again later.";
  } finally {
    button.disabled = false;
  }
});
