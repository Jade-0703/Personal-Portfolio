// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  initializeSkillBars();
  initializeContactForm();
  initializeBackToTop();
  initializeMobileNav();
  initializeProjectSlider();
});

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    void bar.offsetWidth; // Trigger reflow
    bar.style.animationPlayState = 'running';
  });
}

// ===== CONTACT FORM VALIDATION =====
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  // Real-time validation
  const emailField = document.getElementById('email');
  if (emailField) {
    emailField.addEventListener('input', validateEmail);
  }

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Hide all error messages
    document.querySelectorAll('.error').forEach(error => error.style.display = 'none');
    
    // Validate each field
    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      subject: document.getElementById('subject'),
      message: document.getElementById('message')
    };

    // Check required fields
    if (!fields.name.value.trim()) {
      showError('nameError', 'Please enter your name');
      isValid = false;
    }

    // Enhanced email validation
    if (!fields.email.value.trim()) {
      showError('emailError', 'Email is required');
      isValid = false;
    } else if (!isValidEmail(fields.email.value)) {
      showError('emailError', 'Please enter a valid email address');
      isValid = false;
    }

    if (!fields.subject.value.trim()) {
      showError('subjectError', 'Please enter a subject');
      isValid = false;
    }

    if (!fields.message.value.trim()) {
      showError('messageError', 'Please enter your message');
      isValid = false;
    }

    // Submit if valid
    if (isValid) {
      showSuccessMessage('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    }
  });

  // Helper function to validate email format
  function isValidEmail(email) {
    // More comprehensive email regex pattern that requires:
    // - At least one character before @
    // - A domain part with at least one dot
    // - At least 2 characters after the last dot
    // - No spaces or special characters where they don't belong
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    
    // Additional check to ensure there's at least one dot in the domain part
    if (!emailPattern.test(email)) return false;
    
    // Check that the domain has at least one dot and the TLD is at least 2 chars
    const atIndex = email.indexOf('@');
    const domainPart = email.slice(atIndex + 1);
    return domainPart.includes('.') && domainPart.length >= 3 && domainPart.split('.').pop().length >= 2;
  }

  // Real-time email validation
  function validateEmail() {
    const emailField = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    
    if (!emailField) return;
    
    if (emailField.value.trim() === '') {
      if (emailError) emailError.style.display = 'none';
      return;
    }
    
    if (!isValidEmail(emailField.value)) {
      if (emailError) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.display = 'block';
      }
    } else {
      if (emailError) emailError.style.display = 'none';
    }
  }

  // Helper function to show error messages
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  // Helper function to show success message
  function showSuccessMessage(message) {
    // Remove any existing success messages
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
      existingSuccess.remove();
    }
    
    // Create and show new success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;
    
    // Insert after the form
    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      successMessage.classList.add('hidden');
      setTimeout(() => {
        successMessage.remove();
      }, 500);
    }, 5000);
  }
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== MOBILE NAVIGATION =====
function initializeMobileNav() {
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.getElementById('navLinks');
  const navButtons = navLinks ? navLinks.querySelectorAll('.folder-tab-link') : [];

  function closeMenu() {
    navLinks.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('show') ? 'true' : 'false');
    });

    // Close menu when nav button is clicked
    navButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        if (window.innerWidth <= 900) {
          closeMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 900 && !navLinks.contains(e.target) && e.target !== hamburger) {
        closeMenu();
      }
    });
  }
}

// ===== PROJECT SLIDER =====
function initializeProjectSlider() {
  const row = document.getElementById('projectsSliderRow');
  const leftArrow = document.querySelector('.projects-arrow-left');
  const rightArrow = document.querySelector('.projects-arrow-right');

  if (leftArrow && row) {
    leftArrow.onclick = () => {
      row.scrollBy({ left: -(row.firstElementChild.offsetWidth + 32), behavior: 'smooth' });
    };
  }

  if (rightArrow && row) {
    rightArrow.onclick = () => {
      row.scrollBy({ left: row.firstElementChild.offsetWidth + 32, behavior: 'smooth' });
    };
  }
}
