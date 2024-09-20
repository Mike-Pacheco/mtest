document.addEventListener("DOMContentLoaded", function () {
    // Código del menú hamburguesa
    const hamburger = document.getElementById("hamburger");
    const navMenuMobile = document.querySelector(".menu-items-mobile");
    const navbar = document.querySelector("nav");
    const navLinksMobile = document.querySelectorAll('.nav-link-mobile'); // Seleccionar los enlaces del menú móvil

    hamburger.addEventListener("click", function () {
        if (navMenuMobile.classList.contains("show")) {
            navMenuMobile.style.opacity = '0';
            setTimeout(() => {
                navMenuMobile.classList.remove("show");
                navMenuMobile.style.display = 'none';
            }, 500);
        } else {
            navMenuMobile.style.display = 'flex';
            setTimeout(() => {
                navMenuMobile.classList.add("show");
                navMenuMobile.style.opacity = '1';
            }, 10);
        }
    });

    // Cerrar el menú móvil al hacer clic en un enlace
    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            navMenuMobile.style.opacity = '0';
            setTimeout(() => {
                navMenuMobile.classList.remove("show");
                navMenuMobile.style.display = 'none';
            }, 500); // Igualar el tiempo de transición
        });
    });

    // Evento de scroll para reducir el tamaño de la navbar
    window.addEventListener("scroll", function () {
        if (window.scrollY > 40) {
            navbar.classList.add("navbar-shrink");
        } else {
            navbar.classList.remove("navbar-shrink");
        }
    });

    // Código del carrusel
    let currentIndex = 0;
    const slides = document.querySelector('.custom-carousel-slides');
    const slideItems = document.querySelectorAll('.custom-carousel-slide');
    const totalSlides = slideItems.length;
    const prevButton = document.querySelector('.custom-prev');
    const nextButton = document.querySelector('.custom-next');
    const indicatorsContainer = document.querySelector('.custom-indicators');
    let autoSlideInterval;

    // Crear indicadores
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('custom-indicator');
        dot.addEventListener('click', () => showSlide(i));
        indicatorsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.custom-indicator');

    function showSlide(index) {
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }

        const offset = -currentIndex * 100;
        slides.style.transform = `translateX(${offset}%)`;

        dots.forEach((dot, idx) => {
            dot.classList.remove('active');
            if (idx === currentIndex) {
                dot.classList.add('active');
            }
        });
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide(); // Detiene el slide automático al usar el control
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide(); // Detiene el slide automático al usar el control
    });

    // Inicializa el primer slide
    showSlide(currentIndex);

    // Inicia el slide automático
    startAutoSlide();

    // Código para la animación de secciones
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Código del contador que se activa al hacer scroll
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5 // Se activará cuando al menos el 50% de la sección esté visible
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => startCounter(counter));

                // Desconectar el observador después de que los contadores comiencen
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-container');
    counterObserver.observe(statsSection);

    // Función para iniciar el contador
    function startCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const span = counter.querySelector('span');

        const updateCounter = () => {
            const currentValue = +span.innerText;
            const increment = Math.ceil(target / 200);

            if (currentValue < target) {
                span.innerText = currentValue + increment;
                setTimeout(updateCounter, 20);
            } else {
                span.innerText = target;
            }
        };

        updateCounter();
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 50 && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
