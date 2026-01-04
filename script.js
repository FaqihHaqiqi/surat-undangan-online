document.addEventListener("DOMContentLoaded", () => {

  /* ================= MUSIC ================= */
  const music = document.getElementById("bgMusic");

  if (music) {
    window.addEventListener("load", () => {
      music.play().catch(() => {});
    });

    window.toggleMusic = function () {
      music.paused ? music.play() : music.pause();
    };
  }

  // ================= NAMA TAMU OTOMATIS =================
const params = new URLSearchParams(window.location.search);
let guestName = params.get("to");

if (guestName) {
  guestName = decodeURIComponent(guestName);
  document.getElementById("guestName").innerText = guestName;
}


  /* ================= COUNTDOWN ================= */
  const targetDate = new Date("2026-02-08T08:00:00").getTime();

  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      return;
    }

    setText("days", Math.floor(diff / (1000 * 60 * 60 * 24)));
    setText("hours", Math.floor((diff / (1000 * 60 * 60)) % 24));
    setText("minutes", Math.floor((diff / (1000 * 60)) % 60));
    setText("seconds", Math.floor((diff / 1000) % 60));
  }, 1000);

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
  }

  /* ================= COPY TEXT ================= */
  window.copyText = function (id) {
    const el = document.getElementById(id);
    if (!el) return;

    navigator.clipboard.writeText(el.innerText)
      .then(() => alert("Nomor berhasil disalin"));
  };

  /* ================= MOBILE MENU ================= */
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  /* ================= RSVP ANIMATION ================= */
  const rsvpSection = document.getElementById("rsvpSection");

  if (rsvpSection) {
    rsvpSection.style.opacity = 0;
    rsvpSection.style.transform = "translateY(30px)";
    rsvpSection.style.transition = "all 0.8s ease";

    window.addEventListener("scroll", () => {
      const sectionTop = rsvpSection.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight - 100;

      if (sectionTop < triggerPoint) {
        rsvpSection.style.opacity = 1;
        rsvpSection.style.transform = "translateY(0)";
      }
    });
  }

  /* ================= WEDDING BLESSING ================= */
  const form = document.getElementById("blessingForm");
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");
  const list = document.getElementById("blessingList");

  if (form && nameInput && messageInput && list) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const message = messageInput.value.trim();
      if (!name || !message) return;

      const card = document.createElement("div");
      card.className = "blessing-card";
      card.innerHTML = `
        <div class="avatar">${name[0].toUpperCase()}</div>
        <div class="blessing-content">
          <h4>${name}</h4>
          <p>${message}</p>
        </div>
      `;

      list.prepend(card);
      form.reset();
    });
  }

});
