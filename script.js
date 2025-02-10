document.querySelector('.hamburguer-menu').addEventListener('click', () => {
  document.querySelector('.container').classList.toggle('change');
});

// Obtener el año actual y actualizar el contenido del span
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelector('.scroll-btn').addEventListener('click', (e) => {
  e.preventDefault(); // Evita el comportamiento predeterminado

  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Aplica el scroll suave correctamente
  });
});
