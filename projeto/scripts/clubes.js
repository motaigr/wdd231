/* =========================================================
   clubes.js
   Página de clubes:
   1) Busca os clubes no JSON e monta os cartões
   2) Filtra por região (ou só os favoritos)
   3) Abre um modal (<dialog>) com os detalhes do clube
   4) Salva/remove favoritos no localStorage
   ========================================================= */

import { iniciarPagina } from "./comum.mjs";
import { buscarClubes, formatarLocal, formatarPercentual } from "./dados.mjs";
import { lerFavoritos, ehFavorito, alternarFavorito } from "./favoritos.mjs";

let todosOsClubes = [];
let filtroAtual = "todos";

const areaClubes = document.getElementById("lista-clubes");
const contador = document.getElementById("contador-clubes");
const modal = document.getElementById("modal-clube");
const conteudoModal = document.getElementById("conteudo-modal");

// Clubes que não responderam ao diagnóstico têm posição e percentual nulos
function foiAvaliado(clube) {
  return clube.posicao !== null;
}

function textoRanking(clube) {
  return foiAvaliado(clube)
    ? `${clube.posicao}º no ranking · ${formatarPercentual(clube.percentual)}`
    : "Não avaliado no diagnóstico 2025";
}

function criarCartao(clube) {
  const favorito = ehFavorito(clube.id);

  return `
    <article class="cartao-clube" data-id="${clube.id}">
      <span class="escudo" aria-hidden="true">${foiAvaliado(clube) ? `${clube.posicao}º` : "–"}</span>
      <div class="cartao-clube-info">
        <span class="selo-regiao">${clube.regiao}</span>
        <h2>${clube.nome}</h2>
        <p>${formatarLocal(clube)}</p>
        <p>${textoRanking(clube)}</p>
      </div>
      <div class="cartao-clube-acoes">
        <button type="button" class="botao-detalhes" data-acao="detalhes">Ver detalhes</button>
        <button type="button" class="botao-favorito" data-acao="favorito" aria-pressed="${favorito}"
                aria-label="${favorito ? "Remover" : "Adicionar"} ${clube.nome} ${favorito ? "dos" : "aos"} favoritos">
          ${favorito ? "★ Favorito" : "☆ Favoritar"}
        </button>
      </div>
    </article>
  `;
}

function filtrarClubes() {
  if (filtroAtual === "favoritos") {
    const favoritos = lerFavoritos();
    return todosOsClubes.filter((clube) => favoritos.includes(clube.id));
  }

  if (filtroAtual === "todos") {
    return todosOsClubes;
  }

  return todosOsClubes.filter((clube) => clube.regiao === filtroAtual);
}

function renderizar() {
  if (todosOsClubes.length === 0) {
    areaClubes.innerHTML = `<p class="mensagem">Não foi possível carregar os clubes no momento.</p>`;
    contador.textContent = "";
    return;
  }

  const lista = filtrarClubes();

  if (lista.length > 0) {
    areaClubes.innerHTML = lista.map(criarCartao).join("");
  } else if (filtroAtual === "favoritos") {
    areaClubes.innerHTML = `<p class="mensagem">Você ainda não salvou nenhum clube. Use o botão "☆ Favoritar" em um cartão.</p>`;
  } else {
    areaClubes.innerHTML = `<p class="mensagem">Nenhum clube encontrado para esta região.</p>`;
  }

  const totalFavoritos = lerFavoritos().length;
  contador.textContent = `Exibindo ${lista.length} de ${todosOsClubes.length} clubes · ${totalFavoritos} ${totalFavoritos === 1 ? "favorito" : "favoritos"}`;
}

function criarDetalhesRanking(clube) {
  if (!foiAvaliado(clube)) {
    return `
      <dl class="detalhes-clube">
        <dt>Local</dt><dd>${formatarLocal(clube)}</dd>
        <dt>Ranking nacional</dt><dd>Não avaliado: o clube disputa competições nacionais, mas não respondeu ao diagnóstico de 2025.</dd>
      </dl>
    `;
  }

  const avaliados = todosOsClubes.filter(foiAvaliado);
  const media = avaliados.reduce((soma, item) => soma + item.percentual, 0) / avaliados.length;
  const clubesDaRegiao = avaliados.filter((item) => item.regiao === clube.regiao);
  const posicaoNaRegiao = clubesDaRegiao.findIndex((item) => item.id === clube.id) + 1;
  const comparacao = clube.percentual >= media ? "acima" : "abaixo";

  return `
    <dl class="detalhes-clube">
      <dt>Local</dt><dd>${formatarLocal(clube)}</dd>
      <dt>Ranking nacional</dt><dd>${clube.posicao}º de ${avaliados.length}</dd>
      <dt>Na região</dt><dd>${posicaoNaRegiao}º de ${clubesDaRegiao.length} clubes do ${clube.regiao}</dd>
      <dt>Avaliação</dt><dd>${formatarPercentual(clube.percentual)} (${comparacao} da média de ${formatarPercentual(Math.round(media * 10) / 10)})</dd>
    </dl>
    <label for="barra-avaliacao" class="rotulo-barra">Percentual alcançado no diagnóstico</label>
    <progress id="barra-avaliacao" class="barra-avaliacao" max="100" value="${clube.percentual}">${formatarPercentual(clube.percentual)}</progress>
  `;
}

function abrirModal(clube) {
  conteudoModal.innerHTML = `
    <span class="selo-regiao">${clube.regiao}</span>
    <h2 id="titulo-modal">${clube.nome}</h2>
    ${criarDetalhesRanking(clube)}
    <p class="nota-fonte">O Diagnóstico dos Clubes da CBRu avalia gestão, rugby adulto, rugby de base, captação de jogadores, treinadores, preparação física, saúde e arbitragem.</p>
  `;

  modal.showModal();
}

function configurarEventos() {
  // Delegação de eventos: um único ouvinte para os botões de todos os cartões
  areaClubes.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-acao]");
    if (!botao) return;

    const id = botao.closest(".cartao-clube").dataset.id;

    if (botao.dataset.acao === "detalhes") {
      abrirModal(todosOsClubes.find((clube) => clube.id === id));
    } else {
      alternarFavorito(id);
      renderizar();
      // Mantém o foco no botão do mesmo clube depois de redesenhar a lista
      areaClubes.querySelector(`[data-id="${id}"] .botao-favorito`)?.focus();
    }
  });

  document.getElementById("filtro-regiao").addEventListener("change", (evento) => {
    filtroAtual = evento.target.value;
    renderizar();
  });

  document.getElementById("botao-fechar-modal").addEventListener("click", () => modal.close());

  // Fecha o modal ao clicar fora da caixa (no fundo escurecido)
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) modal.close();
  });
}

// Permite abrir a página já filtrada, por exemplo clubes.html?regiao=Sul
function aplicarFiltroDaUrl() {
  const regiao = new URLSearchParams(window.location.search).get("regiao");
  const seletor = document.getElementById("filtro-regiao");
  const opcaoValida = [...seletor.options].some((opcao) => opcao.value === regiao);

  if (opcaoValida) {
    seletor.value = regiao;
    filtroAtual = regiao;
  }
}

async function iniciar() {
  iniciarPagina();
  configurarEventos();
  aplicarFiltroDaUrl();

  todosOsClubes = await buscarClubes();
  todosOsClubes.sort((a, b) => (a.posicao ?? Infinity) - (b.posicao ?? Infinity));
  renderizar();
}

iniciar();
