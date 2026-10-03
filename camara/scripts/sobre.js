/* =========================================================
   sobre.js (módulo ES)
   Responsabilidades da página "Sobre":
   1) Criar os 8 cartões de pontos de interesse a partir de
      dados/locais.mjs
   2) Abrir o modal "Saiba mais" com detalhes de cada local
   3) Exibir uma mensagem sobre o intervalo entre as visitas,
      usando o localStorage
   (rodapé e menu hambúrguer ficam em comum.js, compartilhado
   com as demais páginas da Câmara de Comércio)
   ========================================================= */

import { locais } from "../dados/locais.mjs";

const CHAVE_ULTIMA_VISITA = "camara-ultima-visita";
const MS_POR_DIA = 1000 * 60 * 60 * 24;

/**
 * Monta um cartão com h2, figure, address, p e botão "Saiba mais".
 * A posição de cada parte é definida no CSS com grid-template-areas.
 */
function criarCartaoLocal(local, indice) {
  const card = document.createElement("article");
  card.className = "local-card";

  card.innerHTML = `
    <h2>${local.nome}</h2>
    <figure>
      <img src="imagens/sobre/${local.imagem}" alt="Foto de ${local.nome}"
           width="300" height="200" loading="lazy"
           onerror="this.src='imagens/placeholder.svg'">
    </figure>
    <address>${local.endereco}</address>
    <p>${local.descricao}</p>
    <button type="button" class="saiba-mais" data-indice="${indice}">Saiba mais</button>
  `;

  return card;
}

function exibirLocais() {
  const container = document.getElementById("locais");
  locais.forEach((local, indice) => {
    container.appendChild(criarCartaoLocal(local, indice));
  });
}

function configurarModal() {
  const modal = document.getElementById("local-modal");
  const titulo = document.getElementById("modal-titulo");
  const detalhe = document.getElementById("modal-detalhe");
  const mapa = document.getElementById("modal-mapa");

  // Um único listener no container atende a todos os botões "Saiba mais"
  document.getElementById("locais").addEventListener("click", (evento) => {
    const botao = evento.target.closest(".saiba-mais");
    if (!botao) return;

    const local = locais[botao.dataset.indice];
    titulo.textContent = local.nome;
    detalhe.textContent = local.detalhe;
    mapa.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${local.nome}, ${local.endereco}`)}`;
    modal.showModal();
  });

  modal.querySelector(".modal-close-btn").addEventListener("click", () => modal.close());
}

/**
 * Retorna a mensagem de acordo com o tempo desde a última visita.
 * ultimaVisita é o valor salvo com Date.now() (milissegundos) ou null.
 */
function mensagemDeVisita(ultimaVisita, agora) {
  if (!ultimaVisita) {
    return "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
  }

  const dias = Math.floor((agora - ultimaVisita) / MS_POR_DIA);
  if (dias < 1) {
    return "Já voltou? Que legal!";
  }

  return `Seu último acesso foi há ${dias} ${dias === 1 ? "dia" : "dias"}.`;
}

function exibirMensagemDeVisita() {
  const agora = Date.now();
  const ultimaVisita = Number(localStorage.getItem(CHAVE_ULTIMA_VISITA)) || null;

  const caixa = document.getElementById("visit-message");
  document.getElementById("visit-text").textContent = mensagemDeVisita(ultimaVisita, agora);
  caixa.hidden = false;

  document.getElementById("visit-close").addEventListener("click", () => {
    caixa.hidden = true;
  });

  localStorage.setItem(CHAVE_ULTIMA_VISITA, agora);
}

// Módulos ES já são executados depois que o HTML é analisado (como defer)
exibirMensagemDeVisita();
exibirLocais();
configurarModal();
