const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav a");

function setActiveLink(sectionId) {
  navigationLinks.forEach((link) => {
    const targetId = link.getAttribute("href").replace("#", "");

    link.classList.toggle("active", targetId === sectionId);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleSections.length > 0) {
      setActiveLink(visibleSections[0].target.id);
    }
  },
  {
    rootMargin: "-20% 0px -55% 0px",
    threshold: [0.1, 0.25, 0.5],
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const sectionId = link.getAttribute("href").replace("#", "");
    setActiveLink(sectionId);
  });
});
