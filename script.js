window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";

    // Fade-in animation
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('show');
        }
    });
}

// Initialize fade-in elements
document.addEventListener('DOMContentLoaded', function() {
    // Trigger initial fade check
    scrollFunction();

    // Initialize hero section animation
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('show');
    }, 300);

    // Replace the skills orbit with a better display
    const skills = [
        {name: 'JavaScript', icon: 'fab fa-js'},
        {name: 'Node.js', icon: 'fab fa-node-js'},
        {name: 'Express.js', icon: 'fas fa-server'},
        {name: 'MongoDB', icon: 'fas fa-database'},
        {name: 'Git & GitHub', icon: 'fab fa-github'},
        {name: 'Postman', icon: 'fas fa-paper-plane'},
        {name: 'Figma', icon: 'fab fa-figma'},
        {name: 'AWS', icon: 'fab fa-aws'},
        {name: 'Vercel', icon: 'fas fa-cloud'},
        {name: 'Render', icon: 'fas fa-server'}
    ];

    // Clear the orbit container first
    const orbit = document.querySelector('.skills-orbit');
    orbit.innerHTML = '';

    // Create a grid for the skills
    const skillsGrid = document.createElement('div');
    skillsGrid.className = 'row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3';

    skills.forEach((skill) => {
        const skillCol = document.createElement('div');
        skillCol.className = 'col';

        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.style.backgroundColor = 'var(--card-bg)';
        skillCard.style.borderRadius = '8px';
        skillCard.style.textAlign = 'center';
        skillCard.style.transition = 'all 0.3s ease';
        skillCard.style.height = '100%';
        skillCard.style.display = 'flex';
        skillCard.style.flexDirection = 'column';
        skillCard.style.alignItems = 'center';
        skillCard.style.justifyContent = 'center';

        skillCard.innerHTML = `
            <i class="${skill.icon}" style="font-size: 2.5rem; color: var(--accent-color); margin-bottom: 0.5rem;"></i>
            <h5 style="margin: 0; font-size: 0.95rem;">${skill.name}</h5>
        `;

        // Add hover effect
        skillCard.addEventListener('mouseenter', () => {
            skillCard.style.transform = 'translateY(-10px)';
            skillCard.style.boxShadow = '0 10px 20px rgba(0, 255, 136, 0.2)';
        });

        skillCard.addEventListener('mouseleave', () => {
            skillCard.style.transform = 'translateY(0)';
            skillCard.style.boxShadow = 'none';
        });

        skillCol.appendChild(skillCard);
        skillsGrid.appendChild(skillCol);
    });

    orbit.appendChild(skillsGrid);

    // Init smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Add scroll reveal animation to skill cards
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Call this function when the skills section is in view
const skillsSection = document.querySelector('#skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillCards();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

observer.observe(skillsSection);

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.95)';
    }
});

function validateForm(event) {
    // Prevent default form submission
    event.preventDefault();

    // Clear all previous error messages
    document.querySelectorAll('.error-message').forEach(function(el) {
        el.style.display = 'none';
        el.innerText = '';
    });

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate Name (Only letters and spaces, minimum 2 characters)
    const namePattern = /^[a-zA-Z\s]{2,}$/;
    if (name === '') {
        showError('name', 'Name is required.');
        isValid = false;
    } else if (!namePattern.test(name)) {
        showError('name', 'Name should only contain letters and spaces, and be at least 2 characters long.');
        isValid = false;
    }

    // Validate Email (Basic email pattern)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === '') {
        showError('email', 'Email is required.');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
    }

    // Validate Subject (Minimum 3 characters)
    if (subject === '') {
        showError('subject', 'Subject is required.');
        isValid = false;
    } else if (subject.length < 3) {
        showError('subject', 'Subject should be at least 3 characters long.');
        isValid = false;
    }

    // Validate Message (Minimum 10 characters)
    if (message === '') {
        showError('message', 'Message is required.');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message should be at least 10 characters long.');
        isValid = false;
    }

    // If all fields are valid, submit the form
    if (isValid) {
        // Show loading state
        const submitBtn = document.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
        submitBtn.disabled = true;

        // Get form element
        const contactForm = document.getElementById('contact-form');

        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };

        // Send email using EmailJS
        emailjs.send('CaZXPKTwK5zeQE5KF', 'service_yi19sep', templateParams)
            .then(function() {
                // Create success message if it doesn't exist
                let successMessage = document.querySelector('.form-message.success');
                if (!successMessage) {
                    successMessage = document.createElement('div');
                    successMessage.className = 'form-message success';
                    successMessage.style.display = 'block';
                    successMessage.style.backgroundColor = 'rgba(0, 200, 83, 0.1)';
                    successMessage.style.color = '#00c853';
                    successMessage.style.padding = '10px 15px';
                    successMessage.style.borderRadius = '4px';
                    successMessage.style.marginTop = '15px';
                    successMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Your message has been sent successfully!';
                    contactForm.appendChild(successMessage);
                } else {
                    successMessage.style.display = 'block';
                }

                // Reset form
                contactForm.reset();

                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 5000);
            }, function(error) {
                // Create error message if it doesn't exist
                let errorMessage = document.querySelector('.form-message.error');
                if (!errorMessage) {
                    errorMessage = document.createElement('div');
                    errorMessage.className = 'form-message error';
                    errorMessage.style.display = 'block';
                    errorMessage.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
                    errorMessage.style.color = '#f44336';
                    errorMessage.style.padding = '10px 15px';
                    errorMessage.style.borderRadius = '4px';
                    errorMessage.style.marginTop = '15px';
                    errorMessage.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i> Oops! Something went wrong. Please try again.';
                    contactForm.appendChild(errorMessage);
                } else {
                    errorMessage.style.display = 'block';
                }

                console.error('EmailJS error:', error);

                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                // Hide error message after 5 seconds
                setTimeout(function() {
                    errorMessage.style.display = 'none';
                }, 5000);
            });
    } else {
        // Focus the first error field for better UX
        const firstErrorField = document.querySelector('.error-message[style*="display: block"]');
        if (firstErrorField) {
            firstErrorField.previousElementSibling.focus();
        }
    }

    // Return false to prevent traditional form submission
    return false;
}

// Helper function to display error messages
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.innerText = message;
        errorElement.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Dynamically add EmailJS script
    const emailJsScript = document.createElement('script');
    emailJsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    document.head.appendChild(emailJsScript);

    emailJsScript.onload = function() {
        // Initialize EmailJS with environment variable
        emailjs.init('CaZXPKTwK5zeQE5KF');
    };
});
