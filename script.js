// Basic interactivity: hamburger, smooth scroll, modal, skill animation, theme toggle, contact form validation

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-link");
  const projectsGrid = document.getElementById("projects-grid");
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalTech = document.getElementById("modal-tech");
  const modalLink = document.getElementById("modal-link");
  const skillBars = document.querySelectorAll(".skill-bar");
  const themeToggle = document.getElementById("theme-toggle");
  const contactForm = document.getElementById("contact-form");


  hamburger.addEventListener("click", () => {
    navList.classList.toggle("show");
  });


  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      navList.classList.remove("show");
      navLinks.forEach(l => l.classList.remove("active"));
      e.currentTarget.classList.add("active");
    });
  });

  projectsGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    if (!card) return;
    modalTitle.textContent = card.dataset.title || "Project";
    modalDesc.textContent = card.dataset.desc || "";
    modalTech.textContent = card.dataset.tech || "";
    modalLink.href = card.dataset.link || "#";
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
  });
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  function closeModal(){
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }

  function animateSkills() {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        const target = bar.getAttribute("data-progress") || 0;
        bar.firstElementChild.style.width = target + "%";
      }
    });
  }
  window.addEventListener("scroll", animateSkills);
  animateSkills();

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill all fields before sending.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    const mailto = `mailto:sherwinlumakang827@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    window.location.href = mailto;
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) navList.classList.remove("show");
  });
});
