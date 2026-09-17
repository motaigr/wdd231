/* =========================================================
   comum.js
   Funções compartilhadas entre as páginas da Câmara de Comércio:
   preencher o rodapé (ano atual + última modificação) e
   controlar o menu hambúrguer. Precisa ser carregado antes de
   qualquer script específico de página que dependa delas.
   ========================================================= */

function configurarRodape() {
  const anoAtual = new Date().getFullYear();
  document.getElementById("current-year").textContent = anoAtual;
  document.getElementById("last-modified").textContent = document.lastModified;
}

function configurarMenuHamburguer() {
  const botaoMenu = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");

  botaoMenu.addEventListener("click", () => {
    const estaAberto = nav.classList.toggle("open");
    botaoMenu.setAttribute("aria-expanded", estaAberto ? "true" : "false");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  configurarRodape();
  configurarMenuHamburguer();
});
