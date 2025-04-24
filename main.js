const PROJECT_MODELS = {
  "green-campus": {
    src: "assets/images/Green_Smart_Campus.jpg",
    label: "Green Campus",
  },
  "north-hospital": {
    src: "assets/images/Smart_Hospital.jpg",
    label: "North Hospital",
  },
  "central-office": {
    src: "assets/images/Smart_Tower_Office.jpg",
    label: "Central Office Tower",
  },
};

function preloadImages(modelMap) {
  Object.values(modelMap).forEach((model) => {
    const img = new Image();
    img.src = model.src;
  });
}

function updateDigitalTwinModel(selectedProject) {
  const model = PROJECT_MODELS[selectedProject];
  const img = document.getElementById("digital-twin-img");
  const label = document.getElementById("digital-twin-label");
  if (model && img && label) {
    img.src = model.src;
    img.alt = model.label + " 3D Model";
    label.textContent = model.label;
    img.classList.remove("hidden");
    label.classList.remove("hidden");
  } else if (img && label) {
    img.src = "";
    img.alt = "";
    label.textContent = "";
    img.classList.add("hidden");
    label.classList.add("hidden");
  }
}

function showSection(sectionId) {
  document.querySelectorAll(".spa-section").forEach((section) => {
    section.classList.add("hidden");
  });
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.remove("hidden");
    // Si es la sección Digital Twin, actualiza el modelo
    if (sectionId === "digital-twin") {
      const projectSelect = document.getElementById("project-select");
      if (projectSelect) {
        updateDigitalTwinModel(projectSelect.value);
      }
    }
  }
}

function setActiveNav(sectionId) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("text-blue-700", "font-bold");
    if (link.getAttribute("href") === "#" + sectionId) {
      link.classList.add("text-blue-700", "font-bold");
    }
  });
}

function handleHashChange() {
  const sectionId = window.location.hash.replace("#", "") || "dashboard";
  showSection(sectionId);
  setActiveNav(sectionId);
}

function handleProjectChange() {
  const sectionId = window.location.hash.replace("#", "") || "dashboard";
  if (sectionId === "digital-twin") {
    const projectSelect = document.getElementById("project-select");
    if (projectSelect) {
      updateDigitalTwinModel(projectSelect.value);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  preloadImages(PROJECT_MODELS);

  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();

  const projectSelect = document.getElementById("project-select");
  if (projectSelect) {
    projectSelect.addEventListener("change", handleProjectChange);
  }
});
