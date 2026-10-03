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

function configurarDataEnvio() {
  const campoDataEnvio = document.getElementById("data-envio");
  campoDataEnvio.value = new Date().toISOString();
}

/**
 * Cada botão "Mais informações" tem um atributo data-modal-alvo
 * com o id do <dialog> correspondente. Cada modal tem um botão
 * .botao-fechar-modal responsável por fechá-lo.
 */
function configurarModais() {
  document.querySelectorAll("[data-modal-alvo]").forEach((botao) => {
    const modal = document.getElementById(botao.dataset.modalAlvo);
    if (modal) {
      botao.addEventListener("click", () => modal.showModal());
    }
  });

  document.querySelectorAll(".botao-fechar-modal").forEach((botaoFechar) => {
    botaoFechar.addEventListener("click", () => {
      botaoFechar.closest("dialog").close();
    });
  });
}

function iniciar() {
  configurarDataEnvio();
  configurarModais();
}

document.addEventListener("DOMContentLoaded", iniciar);
