/**
 * Script for SemiGrid Landing Page
 * Handles animations, navbar state, and basic interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize AOS Animation Library
  AOS.init({
    once: true, // whether animation should happen only once - while scrolling down
    offset: 50, // offset (in px) from the original trigger point
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: "ease-out-cubic", // default easing for AOS animations
  });

  // Navbar scroll logic is now handled in components.js

  // 3. Simple Particle Background for Hero Section
  // Creates small floating dots in the hero section for a futuristic feel
  const createParticles = () => {
    const particlesContainer = document.getElementById("particles");
    if (!particlesContainer) return;

    const particleCount = 30; // Number of particles

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");

      // Random styling for particles
      const size = Math.random() * 4 + 2; // 2px to 6px
      const posX = Math.random() * 100; // 0% to 100%
      const posY = Math.random() * 100; // 0% to 100%
      const opacity = Math.random() * 0.5 + 0.1; // 0.1 to 0.6
      const animDuration = Math.random() * 10 + 10; // 10s to 20s
      const animDelay = Math.random() * 5; // 0s to 5s

      // Apply styles
      particle.style.position = "absolute";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = "#00AEEF";
      particle.style.borderRadius = "50%";
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = opacity.toString();
      particle.style.boxShadow = "0 0 10px #00AEEF";

      // Apply animation using Web Animations API
      particle.animate(
        [
          { transform: `translate(0, 0)`, opacity: opacity },
          {
            transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 50}px)`,
            opacity: 0,
          },
        ],
        {
          duration: animDuration * 1000,
          iterations: Infinity,
          direction: "alternate",
          delay: animDelay * 1000,
          easing: "ease-in-out",
        },
      );

      particlesContainer.appendChild(particle);
    }
  };

  // Initialize particles on desktop screens mainly
  if (window.innerWidth > 768) {
    createParticles();
  }

  // 4. Form Submission Prevent Default (Demo purpose)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Simulate form submission
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML =
        '<i class="fa-solid fa-circle-notch fa-spin me-2"></i> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-check me-2"></i> Message Sent!';
        btn.classList.remove("btn-primary-gradient");
        btn.classList.add("btn-success");
        contactForm.reset();

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.add("btn-primary-gradient");
          btn.classList.remove("btn-success");
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // 5. Smooth scrolling for anchor links (offset for fixed navbar)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // Close mobile menu if open
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }

        // Calculate offset (navbar height roughly 80px)
        const offset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // 6. Statistics Counter Animation
  const initCounters = () => {
    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const counters = document.querySelectorAll(".stat-number, .stat-card-dark h3");

    const animateCounter = (el) => {
      const originalText = el.textContent.trim();
      const match = originalText.match(/^(\d+)(.*)$/);
      if (!match) return;

      const targetValue = parseInt(match[1], 10);
      const suffix = match[2];

      if (prefersReducedMotion) {
        el.textContent = originalText;
        return;
      }

      // Initialize counter to 0 with suffix
      el.textContent = `0${suffix}`;

      const duration = 2000; // 2 seconds animation duration
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime >= duration) {
          el.textContent = originalText;
          return;
        }

        // Cubic ease-out: f(t) = 1 - (1 - t)^3
        const progress = elapsedTime / duration;
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeOutProgress * targetValue);

        el.textContent = `${currentValue}${suffix}`;
        requestAnimationFrame(updateCounter);
      };

      requestAnimationFrame(updateCounter);
    };

    const observerOptions = {
      root: null,
      threshold: 0.1, // Trigger when 10% of the counter is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Run only once
        }
      });
    }, observerOptions);

    counters.forEach((counter) => {
      observer.observe(counter);
    });
  };

  initCounters();
});
