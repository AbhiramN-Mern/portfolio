
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