// Portfolio Data Management
class PortfolioData {
  constructor() {
    this.data = null;
    this.init();
  }

  async init() {
    try {
      await this.loadData();
      this.render();
    } catch (error) {
      console.error("Failed to load portfolio data:", error);
      this.handleError();
    }
  }

  async loadData() {
    const response = await fetch("./data/portfolio.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    this.data = await response.json();
  }

  render() {
    if (!this.data) return;

    this.renderPageTitle();
    this.renderPersonalInfo();
    this.renderNavigation();
    this.renderStats();
    this.renderSkills();
    this.renderProjects();
    this.renderGoals();
    this.renderContact();
    this.renderFooter();
  }

  renderPageTitle() {
    const { personal } = this.data;
    document.title = `${personal.name} | ${personal.title}`;
  }

  renderPersonalInfo() {
    const { personal } = this.data;

    // Update hero section
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      heroContent.querySelector(
        "p:first-child"
      ).innerHTML = `Hi, I'm <span class="font-semibold">${personal.name}</span>.`;
      heroContent.querySelector(
        "h1"
      ).textContent = `A Passionate ${personal.title}.`;
      heroContent.querySelector("p:last-of-type").textContent =
        personal.bio.find((p) => p.includes("I build modern")) ||
        personal.bio[0];
    }

    // Update profile image
    const profileImg = document.querySelector(".hero-image img");
    if (profileImg) {
      profileImg.src = personal.image;
      profileImg.alt = personal.name;
      profileImg.onerror = () => {
        if (personal.fallbackImage) {
          profileImg.src = personal.fallbackImage;
        }
      };
    }

    // Update resume button
    const resumeButton = document.getElementById("resume-button");
    if (resumeButton && personal.resumeUrl) {
      resumeButton.href = personal.resumeUrl;
    }

    // Update about section bio
    const aboutContainer = document.querySelector("#about .max-w-3xl");
    if (aboutContainer) {
      aboutContainer.innerHTML = personal.bio
        .map((paragraph) => `<p>${this.highlightText(paragraph)}</p>`)
        .join("");
    }

    // Update initials in nav
    const initialsElement = document.querySelector('nav a[href="#"]');
    if (initialsElement) {
      initialsElement.textContent = personal.initials;
    }
  }

  renderNavigation() {
    const { navigation } = this.data;
    const desktopNav = document.querySelector("nav .hidden.md\\:flex");
    const mobileNav = document.querySelector("#mobile-menu");

    if (desktopNav && mobileNav) {
      const navHTML = navigation
        .map(
          (item) =>
            `<a href="${item.href}" class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition duration-300">${item.label}</a>`
        )
        .join("");

      const mobileNavHTML = navigation
        .map(
          (item) =>
            `<a href="${item.href}" class="block text-center py-3 px-4 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300">${item.label}</a>`
        )
        .join("");

      // Keep theme toggle button
      const themeToggle = desktopNav.querySelector("#theme-toggle");
      desktopNav.innerHTML = navHTML;
      if (themeToggle) {
        desktopNav.appendChild(themeToggle);
      }

      mobileNav.innerHTML = mobileNavHTML;
    }
  }

  renderStats() {
    const { stats } = this.data;
    const statsContainer = document.querySelector(".stats-grid");

    if (statsContainer) {
      statsContainer.innerHTML = stats
        .map(
          (stat) => `
        <div class="stat-item">
          <div class="text-4xl font-bold highlight-text">${stat.number}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">${stat.label}</div>
        </div>
      `
        )
        .join("");
    }
  }

  renderSkills() {
    const { skills } = this.data;
    const skillsContainer = document.querySelector("#skills .grid");

    if (skillsContainer) {
      skillsContainer.innerHTML = Object.entries(skills)
        .map(
          ([category, skillList]) => `
        <div class="skill-category">
          <h3>${category}</h3>
          <div class="flex flex-wrap gap-2">
            ${skillList
              .map((skill) => `<span class="skill-badge">${skill}</span>`)
              .join("")}
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  renderProjects() {
    const { projects } = this.data;
    const projectsContainer = document.querySelector("#projects .grid");

    if (projectsContainer) {
      projectsContainer.innerHTML = projects
        .map(
          (project) => `
        <div class="project-card">
          <div>
            <h3 class="text-xl font-bold text-black dark:text-white mb-2">${
              project.title
            }</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">${
              project.description
            }</p>
            <div class="flex flex-wrap gap-2 mb-4 text-xs">
              ${project.technologies
                .map((tech) => `<span class="tech-tag">${tech}</span>`)
                .join("")}
            </div>
          </div>
          <a href="${project.link}" class="${
            project.status === "planned"
              ? "font-medium text-gray-500 cursor-not-allowed self-start mt-4"
              : "font-medium text-accent dark:text-accent-light hover:underline self-start mt-4"
          }">${project.linkText}</a>
        </div>
      `
        )
        .join("");
    }
  }

  renderGoals() {
    const { goals } = this.data;
    const goalsContainer = document.querySelector("#goals ul");

    if (goalsContainer) {
      goalsContainer.innerHTML = goals
        .map(
          (goal) => `
        <li>
          <svg class="goal-icon w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${goal.icon}"></path>
          </svg>
          <p class="text-lg text-gray-700 dark:text-gray-300">${goal.text}</p>
        </li>
      `
        )
        .join("");
    }
  }

  renderContact() {
    const { contact, personal } = this.data;

    // Update contact heading
    const contactHeading = document.querySelector("#contact h2");
    if (contactHeading) {
      contactHeading.textContent = contact.heading;
    }

    // Update contact description
    const contactDesc = document.querySelector("#contact p");
    if (contactDesc) {
      contactDesc.textContent = contact.description;
    }

    // Update contact button
    const contactBtn = document.querySelector("#contact a");
    if (contactBtn) {
      contactBtn.textContent = contact.buttonText;
      contactBtn.href = `mailto:${personal.email}`;
    }
  }

  renderFooter() {
    const { footer } = this.data;
    const footerElement = document.querySelector("footer p");

    if (footerElement) {
      footerElement.textContent = footer.text;
    }
  }

  highlightText(text) {
    // This can be expanded to highlight more keywords if needed
    return text.replace(
      /\b(UniNexus|UIU Media)\b/g,
      '<span class="highlight-text">$1</span>'
    );
  }

  handleError() {
    console.error("Failed to load portfolio data. Using fallback content.");
    // Keep the existing static content as fallback
  }

  // Method to update data dynamically
  updateData(newData) {
    this.data = { ...this.data, ...newData };
    this.render();
  }

  // Method to get current data
  getData() {
    return this.data;
  }
}

// Initialize portfolio data when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.portfolioData = new PortfolioData();
});

// Export for potential use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = PortfolioData;
}
