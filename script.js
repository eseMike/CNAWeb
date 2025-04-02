// Menú hamburguesa
document.querySelector('.hamburguer-menu').addEventListener('click', () => {
  document.querySelector('.container').classList.toggle('change');
});

// Año actual en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Botón de scroll hacia arriba
document.querySelector('.scroll-btn').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Slider automático
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const images = document.querySelectorAll('.slides img');
  let index = 0;

  function nextSlide() {
    index++;
    if (index >= images.length) index = 0;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(nextSlide, 4500);
});

// Modal galería
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.close-btn');

  // Selector correcto
  document.querySelectorAll('.gallery-item img').forEach((img) => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.classList.add('show');
      modal.classList.remove('hide');
    });
  });

  // Cerrar con botón
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hide');
    modal.classList.remove('show');
    setTimeout(() => {
      modalImg.src = '';
    }, 400);
  });

  // Cerrar clic fuera del contenido
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
