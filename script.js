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

  // 4. AJAX Form Submission using FormSubmit.co
  const setupFormHandler = (formId, successMessage = "Message Sent!") => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin me-2"></i> Sending...';
      btn.disabled = true;

      // Prepare data using FormData
      const formData = new FormData(form);

      // Perform fetch to FormSubmit
      fetch("https://formsubmit.co/ajax/lokeshvanumu61@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        btn.innerHTML = `<i class="fa-solid fa-check me-2"></i> ${successMessage}`;
        btn.classList.remove("btn-primary-gradient");
        btn.classList.add("btn-success");
        form.reset();

        // If the form has a file upload name display, reset it
        const fileNameDisplay = document.getElementById("fileNameDisplay");
        if (fileNameDisplay) {
          fileNameDisplay.classList.add("d-none");
          fileNameDisplay.textContent = "";
        }
        // If file wrapper styled, reset it
        const fileWrapper = document.querySelector(".file-upload-wrapper");
        if (fileWrapper) {
          fileWrapper.style.borderColor = "rgba(0,0,0,0.15)";
          fileWrapper.style.backgroundColor = "rgba(248, 249, 250, 1)";
        }

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.add("btn-primary-gradient");
          btn.classList.remove("btn-success");
          btn.disabled = false;
        }, 4000);
      })
      .catch(error => {
        console.error("Form submission error:", error);
        btn.innerHTML = '<i class="fa-solid fa-circle-xmark me-2"></i> Failed to Send';
        btn.classList.remove("btn-primary-gradient");
        btn.classList.add("btn-danger");
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.add("btn-primary-gradient");
          btn.classList.remove("btn-danger");
          btn.disabled = false;
        }, 4000);
      });
    });
  };

  setupFormHandler("contactForm", "Message Sent!");
  setupFormHandler("trainingContactForm", "Registration Sent!");

  // Custom form handler for Careers Form to support file attachments via standard redirect
  const careersForm = document.getElementById("careerApplicationForm");
  if (careersForm) {
    // 1. Dynamically set the redirection target to return the user to this page
    const nextUrlInput = document.getElementById("nextUrlInput");
    if (nextUrlInput) {
      // Set to current URL with submitted=true query parameter
      nextUrlInput.value = window.location.origin + window.location.pathname + "?submitted=true";
    }

    careersForm.addEventListener("submit", () => {
      const btn = careersForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin me-2"></i> Submitting Application...';
        btn.style.pointerEvents = 'none';
      }
    });

    // 3. Check if we just redirected back after a successful submission
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("submitted") === "true") {
      const successAlert = document.getElementById("successAlert");
      if (successAlert) {
        successAlert.classList.remove("d-none");
        successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
        
        // Clean up the URL query parameter without page reload
        if (window.history && window.history.replaceState) {
          const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        }
      }
    }
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
