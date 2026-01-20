/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* =========================
   MENÚ HAMBURGUESA
========================= */
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
  });
}

/* =========================
   INTERSECTION OBSERVER
========================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.member, .footer-title').forEach(el => {
  observer.observe(el);
});

/* =========================
   AUDIO PLAYER
========================= */
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const player = document.getElementById("audioPlayer");
const title = document.getElementById("trackTitle");
const listenBtn = document.querySelector(".btn-primary");

const playlist = [
  { title: "Episodio 1 - En Proceso", src: "audio/ep1.mp3" },
  { title: "Episodio 2 - Caos Creativo", src: "audio/ep2.mp3" },
  { title: "Episodio 3 - Voces Reales", src: "audio/ep3.mp3" },
  { title: "Episodio 4 - En Proceso", src: "audio/ep4.mp3" },
  { title: "Episodio 5 - Caos Creativo", src: "audio/ep5.mp3" },
  { title: "Episodio 6 - Voces Reales", src: "audio/ep6.mp3" }
];

let index = 0;
let isPlaying = false;

function loadTrack(i) {
  audio.src = playlist[i].src;
  title.textContent = playlist[i].title;
}

function playAudio() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
  player.classList.add("active");
}

function pauseAudio() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

playBtn?.addEventListener("click", () => {
  isPlaying ? pauseAudio() : playAudio();
});

nextBtn?.addEventListener("click", () => {
  index = (index + 1) % playlist.length;
  loadTrack(index);
  playAudio();
});

prevBtn?.addEventListener("click", () => {
  index = (index - 1 + playlist.length) % playlist.length;
  loadTrack(index);
  playAudio();
});

listenBtn?.addEventListener("click", e => {
  e.preventDefault();
  loadTrack(index);
  playAudio();
});

audio?.addEventListener("ended", () => {
  index = (index + 1) % playlist.length;
  loadTrack(index);
  playAudio();
});

/* =========================
   HOJAS DE OTOÑO
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const leavesContainer = document.querySelector(".leaves-container");
  if (!leavesContainer) return;

  function createLeaf() {
    const leaf = document.createElement("div");
    leaf.classList.add("leaf");

    leaf.classList.add(Math.random() > 0.5 ? "type1" : "type2");
    leaf.style.left = Math.random() * 100 + "vw";

    leavesContainer.appendChild(leaf);

    setTimeout(() => leaf.remove(), 20000);
  }

  setInterval(createLeaf, 600);
});
