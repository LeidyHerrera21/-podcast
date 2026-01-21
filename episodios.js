

/**/
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");

toggle.addEventListener("click", ()=>{
  toggle.classList.toggle("active");
  menu.classList.toggle("active");
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

/*likes*/

/*document.querySelectorAll(".like-btn").forEach(btn => {
  const id = btn.dataset.id;
  const countEl = btn.querySelector(".count");

  let liked = localStorage.getItem(id + "_liked") === "true";
  let count = parseInt(localStorage.getItem(id + "_count")) || 0;

  countEl.textContent = count;
  if (liked) btn.classList.add("active");

  btn.addEventListener("click", () => {
    liked = !liked;

    count = liked ? count + 1 : Math.max(0, count - 1);

    btn.classList.toggle("active", liked);
    countEl.textContent = count;

    // Guardar estado
    localStorage.setItem(id + "_liked", liked);
    localStorage.setItem(id + "_count", count);

    // POP EFFECT
    btn.classList.add("pop");
    setTimeout(() => btn.classList.remove("pop"), 250);
  });
});*/

const { doc, getDoc, setDoc, updateDoc, onSnapshot, increment } = window.firebaseTools;
const db = window.firebaseDB;

document.querySelectorAll(".like-btn").forEach(btn => {
  const episodeId = btn.dataset.id;
  const countEl = btn.querySelector(".count");
  const heart = btn.querySelector(".heart");
  const ref = doc(db, "episodes", episodeId);

  let liked = localStorage.getItem(`${episodeId}_liked`) === "true";
  let locked = false;

  // Estado visual inicial
  if (liked) btn.classList.add("active");

  // Escucha en tiempo real
  onSnapshot(ref, snap => {
    if (snap.exists()) {
      countEl.textContent = Math.max(0, snap.data().likes || 0);
    } else {
      setDoc(ref, { likes: 0 });
    }
  });

  btn.addEventListener("click", async () => {
    if (locked) return;
    locked = true;

    liked = !liked;
    btn.classList.toggle("active", liked);
    localStorage.setItem(`${episodeId}_liked`, liked);

    // Animación pop
    btn.classList.add("pop");
    setTimeout(() => btn.classList.remove("pop"), 250);

    try {
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, { likes: liked ? 1 : 0 });
      } else {
        await updateDoc(ref, {
          likes: increment(liked ? 1 : -1)
        });
      }
    } catch (err) {
      console.error("Error actualizando likes:", err);
    }

    locked = false;
  });
});

onSnapshot(ref, snap => {
  if (!snap.exists()) {
    setDoc(ref, { likes: 0 });
    countEl.textContent = "0";
    return;
  }

  const likes = snap.data().likes ?? 0;
  countEl.textContent = likes;
});

let isUpdating = false;

btn.addEventListener("click", async () => {
  if (isUpdating) return;
  isUpdating = true;

  liked = !liked;
  btn.classList.toggle("active", liked);
  localStorage.setItem(episodeId + "_liked", liked);

  btn.classList.add("pop");
  setTimeout(() => btn.classList.remove("pop"), 250);

  try {
    await updateDoc(ref, {
      likes: increment(liked ? 1 : -1)
    });
  } catch (e) {
    console.error(e);
  }

  setTimeout(() => {
    isUpdating = false;
  }, 400);
});

/*import { collection, onSnapshot } from "firebase/firestore";

const episodesRef = collection(db, "episodes");

onSnapshot(episodesRef, snapshot => {
  snapshot.forEach(docSnap => {
    const el = document.querySelector(
      `.like-btn[data-id="${docSnap.id}"] .count`
    );
    if (el) el.textContent = docSnap.data().likes;
  });
});

import { enableIndexedDbPersistence } from "firebase/firestore";

enableIndexedDbPersistence(db).catch(() => {
  console.warn("Persistencia no disponible");
});*/

/**/
