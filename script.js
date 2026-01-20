document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     MENÚ HAMBURGUESA
  ======================= */
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
    });
  }

  /* =======================
     SMOOTH SCROLL (SOLO ANCLAS)
  ======================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        menu?.classList.remove('active');
        toggle?.classList.remove('active');
      }
    });
  });

  /* =======================
     ANIMACIONES AL SCROLL
  ======================= */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.member, .footer-title').forEach(el => {
    revealObserver.observe(el);
  });


  /* =======================
     HOJAS DE OTOÑO
  ======================= */
  const leavesContainer = document.querySelector(".leaves-container");
  if (leavesContainer) {
    function createLeaf() {
      const leaf = document.createElement("div");
      leaf.classList.add("leaf");

      leaf.classList.add(Math.random() > 0.5 ? "type1" : "type2");
      leaf.style.left = Math.random() * 100 + "vw";
      leaf.style.animationDuration = 12 + Math.random() * 10 + "s";

      leavesContainer.appendChild(leaf);
      setTimeout(() => leaf.remove(), 22000);
    }

    setInterval(createLeaf, 600);
  }

});
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

playBtn.addEventListener("click", () => {
  isPlaying ? pauseAudio() : playAudio();
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % playlist.length;
  loadTrack(index);
  playAudio();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + playlist.length) % playlist.length;
  loadTrack(index);
  playAudio();
});

listenBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loadTrack(index);
  playAudio();
});

audio.addEventListener("ended", () => {
  index = (index + 1) % playlist.length;
  loadTrack(index);
  playAudio();
});



const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});
