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
  const setNavMenuState = (isOpen) => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    navMenu.classList.toggle('is-open', isOpen);
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

// Modal galería
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');

  if (!modal) return;

  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.close-btn');
  const galleryImages = document.querySelectorAll('.gallery-item img');

  if (!modalImg || !closeBtn || galleryImages.length === 0) return;

  galleryImages.forEach((img) => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
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
