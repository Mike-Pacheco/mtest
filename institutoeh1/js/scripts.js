document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navMenuMobile = document.querySelector(".menu-items-mobile");
    const navbar = document.querySelector("nav"); // Selecciona la navbar

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

    // Evento de scroll para reducir el tamaño de la navbar
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) { // Si el scroll es mayor a 50px
            navbar.classList.add("navbar-shrink"); // Añade la clase para reducir la navbar
        } else {
            navbar.classList.remove("navbar-shrink"); // Remueve la clase si el scroll es menor o igual a 50px
        }
    });
});
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100;
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;

    slides.forEach((slide, idx) => {
        slide.classList.remove('active');
        if (idx === currentIndex) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Inicializa el primer slide
showSlide(currentIndex);


// Selecciona todas las secciones que quieres animar
const sections = document.querySelectorAll('.section');

// Crea el Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Agrega la clase "visible" cuando la sección está en el viewport
      entry.target.classList.add('visible');
      // Una vez que se agrega la clase, puedes dejar de observar el elemento
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 }); // 0.2 significa que el 20% del elemento debe estar visible

// Aplica el observer a cada sección
sections.forEach(section => {
  observer.observe(section);
});

