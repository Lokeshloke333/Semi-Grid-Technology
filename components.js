class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar navbar-expand-lg fixed-top custom-navbar" id="navbar">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" href="index.html">
            <img src="images/Logo.svg" alt="SemiGrid Logo" style="height: 50px; width: auto;" />
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa-solid fa-bars text-white"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a class="nav-link" href="index.html#services">Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html#about">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html#why-us">Why Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="careers.html">Careers</a>
              </li>
            </ul>
            <div class="nav-buttons d-flex gap-3 mt-3 mt-lg-0">
              <a href="contact.html" class="btn btn-primary-gradient rounded-3 px-4">Contact Us</a>
            </div>
          </div>
        </div>
      </nav>
    `;

    // Highlight active link based on current URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = this.querySelectorAll('.nav-link');
    links.forEach(link => {
      const linkPath = link.getAttribute('href').split('#')[0];
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });

    // Navbar scroll logic
    const navbar = this.querySelector('#navbar');
    if (navbar) {
      // If it's not the home page, make the navbar solid immediately 
      // so the white text is readable against the light hero sections of inner pages
      const isHomePage = currentPath === 'index.html' || currentPath === '';

      if (!isHomePage) {
        navbar.classList.add("scrolled");
      }

      const handleScroll = () => {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          if (isHomePage) {
            navbar.classList.remove("scrolled");
          }
        }
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }
  }
}

class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer pt-5 pb-3">
        <div class="container pt-4">
          <div class="row g-4 mb-5">
            <div class="col-lg-4 pe-lg-5">
              <a class="navbar-brand d-flex align-items-center mb-4" href="index.html">
                <img src="images/Logo.svg" alt="SemiGrid Logo" style="height: 60px; width: auto;" />
              </a>
              <p class="text-light-gray small mb-4">
                Delivering excellence in VLSI engineering and semiconductor design
                services from RTL to Silicon. Partner with us to accelerate your
                tape-outs.
              </p>
              <div class="social-links mt-4">
                <div class="d-flex gap-3">
                  <a href="#" class="social-btn"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>

            <div class="col-lg-2 col-md-4">
              <h5 class="text-white fw-bold mb-4">Quick Links</h5>
              <ul class="list-unstyled footer-links">
                <li><a href="index.html#home">Home</a></li>
                <li><a href="index.html#about">About Us</a></li>
                <li><a href="index.html#why-us">Why Choose Us</a></li>
                <li><a href="careers.html">Careers</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>

            <div class="col-lg-2 col-md-4">
              <h5 class="text-white fw-bold mb-4">Services</h5>
              <ul class="list-unstyled footer-links">
                <li><a href="#">Physical Design</a></li>
                <li><a href="#">Design for Test (DFT)</a></li>
                <li><a href="#">Design Verification</a></li>
                <li><a href="#">Synthesis & STA</a></li>
                <li><a href="#">Analog Layout</a></li>
              </ul>
            </div>

            <div class="col-lg-4 col-md-4">
              <h5 class="text-white fw-bold mb-4">Contact Us</h5>
              <div class="d-flex flex-column gap-3 small text-light-gray">
                <div class="d-flex align-items-center">
                  <i class="fa-solid fa-envelope text-primary me-3 fs-5"></i>
                  <span>Support@semigridtechnologies.com</span>
                </div>
                <div class="d-flex align-items-center">
                  <i class="fa-solid fa-phone text-primary me-3 fs-5"></i>
                  <span>9912128211</span>
                </div>
                <div class="d-flex align-items-start">
                  <i class="fa-solid fa-location-dot text-primary me-3 fs-5 mt-1"></i>
                  <span>Electronic City, Bangalore, Karnataka 560100</span>
                </div>
              </div>
            </div>
          </div>

          <hr class="border-secondary mb-4" />

          <div class="row align-items-center small text-light-gray">
            <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; 2026 SemiGrid Technologies. All rights reserved.
            </div>
            <div class="col-md-6 text-center text-md-end">
              <a href="#" class="text-light-gray text-decoration-none me-3 hover-white">Privacy Policy</a>
              <a href="#" class="text-light-gray text-decoration-none hover-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
