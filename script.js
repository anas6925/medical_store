// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animate hamburger icon
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-menu li a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Sticky Navigation Background Change on Scroll
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }

  lastScroll = currentScroll;
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    condition: document.getElementById("condition").value,
    preferredDate: document.getElementById("preferred-date").value,
    message: document.getElementById("message").value,
  };

  // Basic validation
  if (
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.condition
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Phone validation (basic)
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(formData.phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  // In a real application, you would send this data to a server
  console.log("Form submitted:", formData);

  // Show success message
  alert(
    "Thank you for your appointment request! We will contact you within 24 hours to confirm your appointment."
  );

  // Reset form
  contactForm.reset();

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Add animation on scroll for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll(
  ".service-card, .treatment-card, .blog-card, .testimonial-card, .approach-item, .faq-item"
);

animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// Counter Animation for Statistics (if you want to add any)
function animateCounter(element, target, duration) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// FAQ Accordion functionality (optional enhancement)
const faqItems = document.querySelectorAll(".faq-item h4");
faqItems.forEach((item) => {
  item.style.cursor = "pointer";
  item.addEventListener("click", () => {
    const answer = item.nextElementSibling;
    const isOpen = answer.style.display === "block";

    // Close all other answers
    document.querySelectorAll(".faq-item p").forEach((p) => {
      p.style.display = "none";
    });

    // Toggle current answer
    answer.style.display = isOpen ? "none" : "block";
  });

  // Hide all answers initially except first one
  const answer = item.nextElementSibling;
  answer.style.display = "none";
});

// Show first FAQ answer by default
if (faqItems.length > 0) {
  faqItems[0].nextElementSibling.style.display = "block";
}

// Back to Top Button (optional)
const createBackToTopButton = () => {
  const button = document.createElement("button");
  button.innerHTML = "↑";
  button.className = "back-to-top";
  button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        transition: all 0.3s;
    `;

  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.1)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
  });
};

createBackToTopButton();

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll("section[id]");

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

    if (
      navLink &&
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ) {
      document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.style.color = "";
      });
      navLink.style.color = "var(--primary-color)";
      navLink.style.fontWeight = "600";
    }
  });
}

window.addEventListener("scroll", highlightNavOnScroll);

// Loading animation for page
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Form input focus effects
const formInputs = document.querySelectorAll(
  ".form-group input, .form-group select, .form-group textarea"
);
formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateY(-2px)";
    this.parentElement.style.transition = "transform 0.3s";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateY(0)";
  });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector(".footer-bottom p");
if (footerYear) {
  footerYear.innerHTML = `&copy; ${currentYear} Dr. Sohail Farooq Magoon. All rights reserved.`;
}

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

// Add print functionality
function printPage() {
  window.print();
}

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Escape key closes mobile menu
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

// Lazy loading for images (if you add images later)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      }
    });
  });

  const images = document.querySelectorAll("img[data-src]");
  images.forEach((img) => imageObserver.observe(img));
}

// Console message for developers
console.log(
  "%c Welcome to Dr. Sohail Medical Website ",
  "background: #2c5f8d; color: white; font-size: 16px; padding: 10px;"
);
console.log(
  "%c Developed with care for patient wellbeing ",
  "background: #e8952f; color: white; font-size: 12px; padding: 5px;"
);

// Performance monitoring (optional)
if (window.performance) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);
    }, 0);
  });
}
