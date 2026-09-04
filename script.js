// Año actual en el footer
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

// Botón de scroll hacia arriba
const scrollBtn = document.querySelector('.scroll-btn');

if (scrollBtn) {
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Menú de navegación móvil de la portada
const navToggle = document.querySelector('.top-nav-toggle');
const navMenu = document.querySelector('.top-nav-menu');

if (navToggle && navMenu) {
  const navToggleLabel = navToggle.querySelector('.sr-only');
  const nav = navToggle.closest('.top-nav');
  const setNavMenuState = (isOpen) => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    navMenu.classList.toggle('is-open', isOpen);
    if (nav) nav.classList.toggle('is-open', isOpen);
    navMenu.inert = isMobile && !isOpen;
    navMenu.setAttribute('aria-hidden', String(isMobile && !isOpen));
    navToggle.setAttribute('aria-expanded', String(isOpen));

    if (navToggleLabel) {
      navToggleLabel.textContent = isOpen
        ? 'Cerrar menú de navegación'
        : 'Abrir menú de navegación';
    }
  };

  const closeNavMenu = () => {
    setNavMenuState(false);
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    setNavMenuState(!isOpen);
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNavMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavMenu();
  });

  window.addEventListener('resize', closeNavMenu);

  closeNavMenu();
}

// Slider automático
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const images = document.querySelectorAll('.slides img');

  if (!slides || images.length === 0) return;

  let index = 0;

  function nextSlide() {
    index++;

    if (index >= images.length) {
      index = 0;
    }

    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(nextSlide, 4500);
});

// Slider de galería
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.gallery-slider');

  if (!slider) return;

  const viewport = slider.querySelector('.gallery-viewport');
  const track = slider.querySelector('.gallery-track');
  const slides = Array.from(slider.querySelectorAll('.gallery-slide'));
  const previousButton = slider.querySelector('.gallery-slider-prev');
  const nextButton = slider.querySelector('.gallery-slider-next');
  const status = document.querySelector('.gallery-slider-status');

  if (!viewport || !track || slides.length === 0 || !previousButton || !nextButton) return;

  let currentIndex = 0;
  let autoAdvance;

  const visibleSlides = () => (window.innerWidth <= 768 ? 1 : 3);
  const maximumIndex = () => Math.max(0, slides.length - visibleSlides());

  const updateSlider = () => {
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    const slideWidth = slides[0].getBoundingClientRect().width;

    currentIndex = Math.min(currentIndex, maximumIndex());
    track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;

    if (status) {
      const first = currentIndex + 1;
      const last = Math.min(currentIndex + visibleSlides(), slides.length);
      status.textContent = `Fotos ${first} a ${last} de ${slides.length}`;
    }
  };

  const moveSlider = (direction) => {
    currentIndex += direction;

    if (currentIndex > maximumIndex()) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maximumIndex();

    updateSlider();
  };

  const startAutoAdvance = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.clearInterval(autoAdvance);
    autoAdvance = window.setInterval(() => moveSlider(1), 4500);
  };

  previousButton.addEventListener('click', () => {
    moveSlider(-1);
    startAutoAdvance();
  });

  nextButton.addEventListener('click', () => {
    moveSlider(1);
    startAutoAdvance();
  });

  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') moveSlider(-1);
    if (event.key === 'ArrowRight') moveSlider(1);
  });

  slider.addEventListener('mouseenter', () => window.clearInterval(autoAdvance));
  slider.addEventListener('mouseleave', startAutoAdvance);
  slider.addEventListener('focusin', () => window.clearInterval(autoAdvance));
  slider.addEventListener('focusout', startAutoAdvance);
  window.addEventListener('resize', updateSlider);

  updateSlider();
  startAutoAdvance();
});

// Modal galería
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');

  if (!modal) return;

  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.close-btn');
  const gallerySlides = document.querySelectorAll('.gallery-slide');

  if (!modalImg || !closeBtn || gallerySlides.length === 0) return;

  gallerySlides.forEach((slide) => {
    const img = slide.querySelector('img');

    if (!img) return;

    slide.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.add('show');
      modal.classList.remove('hide');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hide');
    modal.classList.remove('show');

    setTimeout(() => {
      modalImg.src = '';
    }, 400);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hide');
      modal.classList.remove('show');

      setTimeout(() => {
        modalImg.src = '';
      }, 400);
    }
  });
});
