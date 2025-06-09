document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners for slider controls
    next.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    prev.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });

    // Start slideshow
    startSlideShow();

    // Carrossel de imagens dentro de cada slide
    const slideImageDots = document.querySelectorAll('.slide-image-dot');
    const slideImageContainers = document.querySelectorAll('.slide-image-container');
    
    slideImageDots.forEach(dot => {
        dot.addEventListener('click', function() {
            // Encontrar o slide pai
            const parentSlide = this.closest('.slide');
            if (!parentSlide) return;
            
            // Obter o índice da imagem a ser mostrada
            const imageIndex = parseInt(this.getAttribute('data-image'));
            
            // Remover classe active de todos os containers e dots no slide pai
            const containers = parentSlide.querySelectorAll('.slide-image-container');
            const dots = parentSlide.querySelectorAll('.slide-image-dot');
            
            containers.forEach(container => container.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Adicionar classe active ao container e dot correspondentes
            containers[imageIndex].classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Função para alternar automaticamente as imagens dentro de cada slide
    function rotateSlideImages() {
        const activeSlide = document.querySelector('.slide.active');
        if (!activeSlide) return;
        
        const containers = activeSlide.querySelectorAll('.slide-image-container');
        const dots = activeSlide.querySelectorAll('.slide-image-dot');
        
        if (containers.length <= 1) return;
        
        // Encontrar o índice da imagem ativa atual
        let activeIndex = 0;
        containers.forEach((container, index) => {
            if (container.classList.contains('active')) {
                activeIndex = index;
            }
        });
        
        // Calcular o próximo índice
        const nextIndex = (activeIndex + 1) % containers.length;
        
        // Remover classe active de todos
        containers.forEach(container => container.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adicionar classe active aos próximos
        containers[nextIndex].classList.add('active');
        dots[nextIndex].classList.add('active');
    }
    
    // Iniciar rotação automática das imagens (a cada 3 segundos)
    setInterval(rotateSlideImages, 3000);

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, just show a success message
            alert('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
            appointmentForm.reset();
        });
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize active menu based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // Add animations on scroll
    const animatedElements = document.querySelectorAll('.specialty-card, .team-member, .gallery-item');
    
    const animateOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animations
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Run once to check initial state
    animateOnScroll();
});
