document.addEventListener('DOMContentLoaded', () => {
  const btnHamburguer = document.getElementById('menu-hamburguer');
  const menuNav = document.getElementById('menu-nav');

  if (btnHamburguer && menuNav) {
    btnHamburguer.addEventListener('click', () => {
      menuNav.classList.toggle('open');
      btnHamburguer.textContent = menuNav.classList.contains('open') ? '❌' : '☰';
    });
  }
});