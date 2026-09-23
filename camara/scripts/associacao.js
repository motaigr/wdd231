/* =========================================================
   associacao.js
   Responsabilidades da página "Associe-se":
   1) Preencher o campo oculto "timestamp" com a data/hora de
      carregamento da página
   2) Abrir/fechar os modais (<dialog>) com os detalhes de cada
      nível de associação
   (rodapé e menu hambúrguer ficam em comum.js, compartilhado
   com as demais páginas da Câmara de Comércio)
   ========================================================= */

function configurarTimestamp() {
  const campoTimestamp = document.getElementById("timestamp");
  campoTimestamp.value = new Date().toISOString();
}

/**
 * Cada botão "Mais informações" tem um atributo data-modal-target
 * com o id do <dialog> correspondente. Cada modal tem um botão
 * .modal-close-btn responsável por fechá-lo.
 */
function configurarModais() {
  document.querySelectorAll("[data-modal-target]").forEach((botao) => {
    const modal = document.getElementById(botao.dataset.modalTarget);
    if (modal) {
      botao.addEventListener("click", () => modal.showModal());
    }
  });

  document.querySelectorAll(".modal-close-btn").forEach((botaoFechar) => {
    botaoFechar.addEventListener("click", () => {
      botaoFechar.closest("dialog").close();
    });
  });
}

function iniciar() {
  configurarTimestamp();
  configurarModais();
}

document.addEventListener("DOMContentLoaded", iniciar);
