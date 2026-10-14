/* =========================================================
   comum.mjs
   Funções compartilhadas por todas as páginas do Guia do
   Rugby Brasileiro: menu hambúrguer e rodapé (ano atual e
   data da última modificação).
   ========================================================= */

export function configurarMenu() {
  const botaoMenu = document.getElementById("botao-menu");
  const nav = document.getElementById("nav-principal");

  botaoMenu.addEventListener("click", () => {
    const estaAberto = nav.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", estaAberto ? "true" : "false");
    botaoMenu.setAttribute("aria-label", estaAberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
  });
}

export function configurarRodape() {
  document.getElementById("ano-atual").textContent = new Date().getFullYear();
  document.getElementById("ultima-modificacao").textContent = document.lastModified;
}

export function iniciarPagina() {
  configurarMenu();
  configurarRodape();
}
