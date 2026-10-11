const EMAILJS_PUBLIC_KEY = "nGp20tzdtc3wq098S";
const EMAILJS_SERVICE_ID = "service_yqp9ncl";
const EMAILJS_TEMPLATE_ID = "template_nmf4in9";
const RECIPIENT_EMAIL = "febbiedominique2008@gmail.com";

const questionCard = document.getElementById("questionCard");
const dateCard = document.getElementById("dateCard");
const successCard = document.getElementById("successCard");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("tinyHint");
const dateForm = document.getElementById("dateForm");
const statusEl = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");
let noCount = 0;

function addFloatingHearts() {
  const holder = document.getElementById("floatingHearts");
  const symbols = ["♡", "♥", "💕", "✿"];
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[i % symbols.length];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 20}px`;
    heart.style.animationDuration = `${9 + Math.random() * 12}s`;
    heart.style.animationDelay = `${-Math.random() * 18}s`;
    holder.appendChild(heart);
  }
}
addFloatingHearts();

function celebrate() {
  const symbols = ["💗", "💖", "💕", "❤️", "✨", "🌸"];
  for (let i = 0; i < 75; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.fontSize = `${13 + Math.random() * 18}px`;
    piece.style.animationDelay = `${Math.random() * 0.65}s`;
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 3600);
  }
}

yesBtn.addEventListener("click", () => {
  questionCard.classList.add("hidden");
  dateCard.classList.remove("hidden");
  dateCard.classList.add("pop");
  celebrate();
  dateCard.scrollIntoView({ behavior: "smooth", block: "start" });
});

noBtn.addEventListener("pointerenter", (event) => {
  if (event.pointerType === "mouse" && noCount < 4) {
    noCount++;
    noBtn.style.transform = `translate(${(Math.random() * 70 - 35).toFixed(0)}px, ${(Math.random() * 26 - 13).toFixed(0)}px)`;
    hint.textContent = [
      "Wait, think about the coffee first! ☕",
      "The button is shy too 😭",
      "A walk and a good conversation though… 👀",
      "Okay okay, I won't bully the button anymore 😅"
    ][noCount - 1];
    if (noCount === 4) noBtn.style.transform = "none";
  }
});
noBtn.addEventListener("click", () => {
  
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("tinyHint");

function moveNoButton() {
  const maxX = 120;
  const maxY = 80;

  const randomX = Math.random() * maxX * 2 - maxX;
  const randomY = Math.random() * maxY * 2 - maxY;

  noBtn.style.position = "relative";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.transition = "left 0.2s ease, top 0.2s ease";

  hint.textContent = "Hehe, are you sure? Try again! 💗";
}

noBtn.addEventListener("click", function (event) {
  event.preventDefault();
  moveNoButton();
});

  hint.textContent = "That's okay, thank you for being honest with me. 💗";
  noBtn.style.transform = "none";
  noCount = 4;
});

function loadEmailJs() {
  return new Promise((resolve, reject) => {
    if (window.emailjs) return resolve(window.emailjs);
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => window.emailjs ? resolve(window.emailjs) : reject(new Error("EmailJS did not load."));
    script.onerror = () => reject(new Error("Could not load EmailJS. Check your internet connection."));
    document.head.appendChild(script);
  });
}

dateForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const selectedDate = document.getElementById("selectedDate").value;
  const selectedTime = document.getElementById("selectedTime").value;
  const extraMessage = document.getElementById("extraMessage").value.trim();

  if (!selectedDate || !selectedTime) {
    statusEl.textContent = "Please choose both a date and time first. 💗";
    return;
  }

  const configured = ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID]
    .some((value) => value.startsWith("YOUR_"));
  if (!configured) {
    statusEl.textContent = "The form is ready, but email setup is not finished yet. Add your EmailJS Public Key, Service ID, and Template ID in script.js first. 💌";
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Sending your answer… 💗";
  statusEl.textContent = "Sending your date details to Febbie…";

  try {
    const emailjs = await loadEmailJs();
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: RECIPIENT_EMAIL,
      response: "YES",
      selected_date: selectedDate,
      selected_time: selectedTime,
      extra_message: extraMessage || "(No extra message)",
      from_name: "Kimchi",
      to_name: "Febbie",
      reply_to: RECIPIENT_EMAIL
    });
    dateCard.classList.add("hidden");
    successCard.classList.remove("hidden");
    successCard.classList.add("pop");
    document.getElementById("chosenDetails").textContent = `Your picks: ${selectedDate} at ${selectedTime} 💗`;
    celebrate();
    successCard.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    console.error(error);
    statusEl.textContent = "It couldn't send just now. Please check the EmailJS IDs/template settings and try again. Your choices are still here. 💗";
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Send my answer to Febbie 💌";
  }
});

let audioContext = null;
let musicTimer = null;
let musicOn = false;
let noteIndex = 0;
const musicToggle = document.getElementById("musicToggle");
const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46];
function playNote() {
  if (!audioContext || !musicOn) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = notes[noteIndex % notes.length];
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.035, audioContext.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.42);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.45);
  noteIndex++;
}
musicToggle.addEventListener("click", async () => {
  try {
    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") await audioContext.resume();
    musicOn = !musicOn;
    musicToggle.setAttribute("aria-pressed", String(musicOn));
    musicToggle.textContent = musicOn ? "♫ Pause background tune" : "♫ Play a little background tune";
    if (musicOn) {
      playNote();
      musicTimer = window.setInterval(playNote, 430);
    } else {
      window.clearInterval(musicTimer);
    }
  } catch (error) {
    musicToggle.textContent = "Music isn't supported in this browser";
  }
});
