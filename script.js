
        window.onscroll = function() {scrollFunction()};
        
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

        document.addEventListener('DOMContentLoaded', function() {
    // Add EmailJS script to the document
    const emailJsScript = document.createElement('script');
    emailJsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    document.head.appendChild(emailJsScript);

    emailJsScript.onload = function() {
        // Initialize EmailJS
        // Replace 'YOUR_USER_ID' with your actual EmailJS user ID
        emailjs.init('CaZXPKTwK5zeQE5KF');
    };

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Create message elements
        const successMessage = document.createElement('div');
        successMessage.className = 'form-message success';
        successMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Your message has been sent successfully!';
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-message error';
        errorMessage.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i> Oops! Something went wrong. Please try again.';
        
        // Append messages to form (initially hidden via CSS)
        contactForm.appendChild(successMessage);
        contactForm.appendChild(errorMessage);
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            submitBtn.disabled = true;
            
            // Hide any previous messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Get form data
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const subject = contactForm.querySelector('#subject').value;
            const message = contactForm.querySelector('#message').value;
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };
            
            // Send email
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
            emailjs.send('service_yi19sep', 'template_c49qfpo', templateParams)
                .then(function() {
                    // Show success message
                    successMessage.style.display = 'block';
                    
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
                    // Show error message
                    errorMessage.style.display = 'block';
                    console.error('EmailJS error:', error);
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Hide error message after 5 seconds
                    setTimeout(function() {
                        errorMessage.style.display = 'none';
                    }, 5000);
                });
        });
    }
});