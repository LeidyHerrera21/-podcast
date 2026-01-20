
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");

toggle.addEventListener("click", ()=>{
  toggle.classList.toggle("active");
  menu.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const leavesContainer = document.querySelector(".leaves-container");
  if (!leavesContainer) return;

  function createLeaf(){
    const leaf = document.createElement("div");
    leaf.classList.add("leaf");

    const type = Math.random() > 0.5 ? "type1" : "type2";
    leaf.classList.add(type);

    leaf.style.left = Math.random() * 100 + "vw";

    leavesContainer.appendChild(leaf);

    setTimeout(() => leaf.remove(), 20000);
  }

  setInterval(createLeaf, 600);
});

