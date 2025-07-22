// Theme Management
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    this.setInitialTheme();
    this.bindEventListeners();
    this.updateIcons();
  }

  setInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  bindEventListeners() {
    const themeToggleButton = document.getElementById("theme-toggle");
    if (themeToggleButton) {
      themeToggleButton.addEventListener("click", () => this.toggleTheme());
    }

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          if (e.matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          this.updateIcons();
        }
      });
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    this.updateIcons();
  }

  updateIcons() {
    const darkIcon = document.getElementById("theme-toggle-dark-icon");
    const lightIcon = document.getElementById("theme-toggle-light-icon");

    if (document.documentElement.classList.contains("dark")) {
      lightIcon?.classList.remove("hidden");
      darkIcon?.classList.add("hidden");
    } else {
      lightIcon?.classList.add("hidden");
      darkIcon?.classList.remove("hidden");
    }
  }

  getCurrentTheme() {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }
}

// Mobile Menu Management
class MobileMenuManager {
  constructor() {
    this.mobileMenuButton = document.getElementById("mobile-menu-button");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.init();
  }

  init() {
    this.bindEventListeners();
  }

  bindEventListeners() {
    if (this.mobileMenuButton && this.mobileMenu) {
      this.mobileMenuButton.addEventListener("click", () => this.toggleMenu());

      // Close menu when clicking on links
      const mobileLinks = this.mobileMenu.getElementsByTagName("a");
      Array.from(mobileLinks).forEach((link) => {
        link.addEventListener("click", () => this.closeMenu());
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !this.mobileMenu.contains(e.target) &&
          !this.mobileMenuButton.contains(e.target)
        ) {
          this.closeMenu();
        }
      });
    }
  }

  toggleMenu() {
    this.mobileMenu.classList.toggle("hidden");
  }

  closeMenu() {
    this.mobileMenu.classList.add("hidden");
  }

  openMenu() {
    this.mobileMenu.classList.remove("hidden");
  }
}

// Header Scroll Effect
class HeaderScrollManager {
  constructor() {
    this.header = document.getElementById("header");
    this.init();
  }

  init() {
    this.bindEventListeners();
  }

  bindEventListeners() {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateHeader();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  updateHeader() {
    if (window.scrollY > 50) {
      this.header.classList.add("glass-effect", "shadow-lg");
    } else {
      this.header.classList.remove("glass-effect", "shadow-lg");
    }
  }
}

// Smooth Scrolling
class SmoothScrollManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindEventListeners();
  }

  bindEventListeners() {
    // Handle anchor links
    document.addEventListener("click", (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target && target.getAttribute("href") !== "#") {
        e.preventDefault();
        const targetId = target.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          this.scrollToElement(targetElement);
        }
      }
    });
  }

  scrollToElement(element) {
    const headerOffset = 80; // Account for fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

// Intersection Observer for Animations
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      observer.observe(card);
    });
  }
}

// Performance Utilities
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    this.preloadImages();
    this.optimizeResources();
  }

  preloadImages() {
    // Preload critical images
    const criticalImages = [
      "https://placehold.co/600x600/000000/FFFFFF?text=RP",
    ];

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }

  optimizeResources() {
    // Lazy load non-critical images
    if ("loading" in HTMLImageElement.prototype) {
      const images = document.querySelectorAll("img[data-src]");
      images.forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      });
    } else {
      // Fallback for browsers that don't support lazy loading
      this.intersectionObserverImages();
    }
  }

  intersectionObserverImages() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
}

// Initialize all managers when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
  new MobileMenuManager();
  new HeaderScrollManager();
  new SmoothScrollManager();
  new AnimationManager();
  new PerformanceManager();

  // Initialize enhanced styling
  initializeEnhancedStyling();
});

// Enhanced styling initialization
function initializeEnhancedStyling() {
  // Add hover effects to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  // Add click animations to buttons
  const buttons = document.querySelectorAll(".btn-primary");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Enhanced scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for enhanced animations
  const animatedElements = document.querySelectorAll(
    ".project-card, .skill-category, .hero-content, .hero-image"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    enhancedObserver.observe(el);
  });
}

// Export for potential use in other scripts
if (typeof window !== "undefined") {
  window.ThemeManager = ThemeManager;
  window.MobileMenuManager = MobileMenuManager;
  window.HeaderScrollManager = HeaderScrollManager;
  window.SmoothScrollManager = SmoothScrollManager;
  window.AnimationManager = AnimationManager;
  window.PerformanceManager = PerformanceManager;
}
