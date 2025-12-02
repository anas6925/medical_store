// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
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

// Sticky Navigation
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  }
});

// ========== FORM SUBMISSION WITH MULTI-EMAIL SUPPORT ==========

const contactForm = document.getElementById("contactForm");
const loadingSpinner = document.getElementById("loadingSpinner");
const successMessage = document.getElementById("successMessage");

// Email recipients array - MODIFY THIS TO ADD/REMOVE EMAILS
const emailRecipients = [
  "regenerativerelief@gmail.com",
  "98manas1217@gmail.com",
  "anas.bashir@nayatel.com",
];

// anas
// const WEB3FORMS_ACCESS_KEY = "9c53b635-5ce2-4bf6-916d-d40c9bc7ac10";

// magoon
const WEB3FORMS_ACCESS_KEY = "f9c2803f-a317-4daf-8de6-493ddbc3eea7";

// Simple validation
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const condition = document.getElementById("condition").value;
  const consent = document.getElementById("consent").checked;

  if (!name || !email || !phone || !condition || !consent) {
    alert("Please fill all required fields");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return false;
  }

  return true;
}

// Format condition label
function getConditionLabel(value) {
  const map = {
    "back-pain": "Back Pain",
    "neck-pain": "Neck Pain",
    "shoulder-pain": "Shoulder Pain",
    "knee-pain": "Knee Pain",
    "hip-pain": "Hip Pain",
    "joint-pain": "General Joint Pain",
    "sports-injury": "Sports Injury",
    arthritis: "Arthritis",
    sciatica: "Sciatica",
    tendonitis: "Tendonitis",
    other: "Other",
  };
  return map[value] || value;
}

// Format duration label
function getDurationLabel(value) {
  const map = {
    "less-1-month": "Less than 1 month",
    "1-3-months": "1-3 months",
    "3-6-months": "3-6 months",
    "6-12-months": "6-12 months",
    "more-1-year": "More than 1 year",
    "more-5-years": "More than 5 years",
  };
  return map[value] || "Not specified";
}

// Format time label
function getTimeLabel(value) {
  const map = {
    morning: "Morning (9 AM - 12 PM)",
    afternoon: "Afternoon (12 PM - 3 PM)",
    evening: "Evening (3 PM - 6 PM)",
  };
  return map[value] || "Not specified";
}

// Generate formatted message
function generateMessageText(formDataObj) {
  const conditionLabel = getConditionLabel(formDataObj.condition);
  const durationLabel = getDurationLabel(formDataObj.duration);
  const timeLabel = getTimeLabel(formDataObj.preferredTime);

  return `═══════════════════════════════════════════════════════════════
🌟 NEW APPOINTMENT REQUEST 🌟
═══════════════════════════════════════════════════════════════

👨‍⚕️ Dr. Sohail Farooq Magoo – Pain Physician
🏥 Premium International Hospital, Multan

================================================================
🧍 PERSONAL INFORMATION
================================================================
👤 Name:               ${formDataObj.name}
📧 Email:              ${formDataObj.email}
📞 Phone:              ${formDataObj.phone}
🎂 Age:                ${
    formDataObj.age ? formDataObj.age + " years" : "Not specified"
  }
🆕 New Patient:        ${formDataObj.newPatient ? "Yes" : "No"}

================================================================
⚕️ MEDICAL INFORMATION
================================================================
🩺 Primary Condition:   ${conditionLabel}
⏳ Duration:            ${durationLabel}
💊 Previous Treatment:   ${formDataObj.previousTreatment || "None mentioned"}

================================================================
📅 APPOINTMENT PREFERENCES
================================================================
📆 Preferred Date:       ${formDataObj.preferredDate || "Not specified"}
⏰ Preferred Time:       ${timeLabel}

================================================================
📝 ADDITIONAL INFORMATION
================================================================
${formDataObj.message || "No additional message provided."}

================================================================
🏥 CLINIC DETAILS
================================================================
Sohail Pain Clinic  
Premium International Hospital  
Chowk Aziz Hotel, Opposite Railway Ground  
Multan Cantt, Pakistan  

📞 Phone: 0308-7777614

═══════════════════════════════════════════════════════════════
📩 This is an automated email from the appointment request form.
🚫 Please DO NOT reply to this email.
📞 For inquiries, kindly call the clinic directly.
═══════════════════════════════════════════════════════════════`;
}

// Send email to a single recipient via Web3Forms
// This function is called for EACH email in the emailRecipients array
async function sendEmailToRecipient(recipientEmail, formDataObj, messageText) {
  try {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: formDataObj.name,
      from_email: formDataObj.email,
      to_email: recipientEmail, // ← THIS IS WHERE EMAIL IS SENT (saqibkamran97@gmail.com, 98manas1217@gmail.com, etc)
      subject: `New Appointment Request - ${formDataObj.name}`,
      message: messageText,
      replyto: formDataObj.email,
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return {
      email: recipientEmail,
      success: data.success || false,
      message: data.message || "Unknown error",
    };
  } catch (error) {
    console.error(`Error sending to ${recipientEmail}:`, error);
    return {
      email: recipientEmail,
      success: false,
      message: error.message,
    };
  }
}

// Send emails to all recipients sequentially
async function sendEmailsToAllRecipients(formDataObj, messageText) {
  const results = [];

  for (let i = 0; i < emailRecipients.length; i++) {
    const email = emailRecipients[i];
    console.log(
      `Sending email ${i + 1}/${emailRecipients.length} to: ${email}`
    );

    try {
      const result = await sendEmailToRecipient(
        email,
        formDataObj,
        messageText
      );
      results.push(result);

      // Add delay between requests to avoid rate limiting
      if (i < emailRecipients.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`Failed to send to ${email}:`, error);
      results.push({
        email: email,
        success: false,
        message: error.message,
      });
    }
  }

  return results;
}

// Submit form
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  showLoading(true);

  try {
    // Collect form data
    const formDataObj = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      age: document.getElementById("age").value.trim(),
      condition: document.getElementById("condition").value,
      duration: document.getElementById("duration").value,
      preferredDate: document.getElementById("preferred-date").value,
      preferredTime: document.getElementById("preferred-time").value,
      previousTreatment: document
        .getElementById("previous-treatment")
        .value.trim(),
      message: document.getElementById("message").value.trim(),
      newPatient: document.getElementById("new-patient").checked,
    };

    // Generate formatted message
    const messageText = generateMessageText(formDataObj);

    console.log("Starting email submission...");
    console.log(`Sending to ${emailRecipients.length} recipients`);

    // Send emails to all recipients
    const results = await sendEmailsToAllRecipients(formDataObj, messageText);

    console.log("Email submission completed:", results);

    showLoading(false);

    // Check how many emails were sent successfully
    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    if (successCount > 0) {
      // Show success message
      showSuccess();
      contactForm.reset();

      // Log results
      console.log(`✓ Successfully sent to ${successCount} recipient(s)`);
      if (failureCount > 0) {
        const failedEmails = results
          .filter((r) => !r.success)
          .map((r) => r.email)
          .join(", ");
        console.warn(`✗ Failed to send to: ${failedEmails}`);
      }

      // Scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1000);
    } else {
      // All emails failed
      const failedEmails = results.map((r) => r.email).join(", ");
      alert(
        `Error sending emails to: ${failedEmails}\n\nPlease try again or call us: 0308-7777614`
      );
      console.error("All email submissions failed:", results);
    }
  } catch (error) {
    showLoading(false);
    console.error("Critical error:", error);
    alert("Error sending form. Please call us: 0308-7777614");
  }
});

// Show/hide loading spinner
function showLoading(show) {
  if (loadingSpinner) {
    loadingSpinner.style.display = show ? "block" : "none";
  }
}

// Show success message
function showSuccess() {
  if (successMessage) {
    successMessage.style.display = "block";
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 4000);
  }
}

// ========== SCROLL ANIMATIONS ==========

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

const animateElements = document.querySelectorAll(
  ".service-card, .treatment-card, .blog-card, .testimonial-card, .approach-item, .faq-item"
);

animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ========== BACK TO TOP BUTTON ==========

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
    button.style.display = window.pageYOffset > 300 ? "block" : "none";
  });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.1)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
  });
};

createBackToTopButton();

// ========== HIGHLIGHT NAV ON SCROLL ==========

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

// ========== FORM INPUT FOCUS EFFECTS ==========

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

// ========== DYNAMIC YEAR IN FOOTER ==========

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector(".footer-bottom p");
if (footerYear) {
  footerYear.innerHTML = `&copy; ${currentYear} Dr. Sohail Farooq Magoo (MBBS,PGD). All rights reserved.`;
}

// ========== KEYBOARD NAVIGATION ==========

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

// ========== LAZY LOADING FOR IMAGES ==========

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

// ========== CONSOLE MESSAGES ==========

console.log(
  "%c Welcome to Dr. Sohail Medical Website ",
  "background: #2c5f8d; color: white; font-size: 16px; padding: 10px;"
);
console.log(
  "%c Developed with care for patient wellbeing ",
  "background: #e8952f; color: white; font-size: 12px; padding: 5px;"
);

// ========== PERFORMANCE MONITORING ==========

if (window.performance) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);
    }, 0);
  });
}
