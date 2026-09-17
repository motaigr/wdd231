/* =========================================================
   diretorio.js
   Responsabilidades:
   1) Buscar os dados dos membros em dados/membros.json
   2) Renderizar os cartões na área #members-container
   3) Alternar entre visualização em Grade e em Lista
   4) Preencher o rodapé com ano atual e data de última modificação
   5) Controlar o menu hambúrguer (responsividade)
   ========================================================= */

// Mapeia o nível numérico do JSON para um rótulo legível em português
const NIVEIS = {
  1: "Membro",
  2: "Prata",
  3: "Ouro",
};

/**
 * Busca os dados dos membros no arquivo JSON.
 * Usamos async/await + try/catch para tratar falhas de rede
 * ou de parsing sem travar a página.
 */
async function buscarMembros() {
  try {
    const resposta = await fetch("dados/membros.json");

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const dados = await resposta.json();
    return dados.empresas; // array de empresas
  } catch (erro) {
    console.error("Falha ao carregar membros.json:", erro);
    return []; // retorna array vazio para a página não quebrar
  }
}

/**
 * Constrói o HTML de um único cartão de membro a partir do objeto da empresa.
 * Mantemos a lógica de montagem separada da lógica de "onde inserir no DOM"
 * para facilitar testes e reaproveitamento entre os modos grid/lista.
 */
function criarCartaoMembro(empresa) {
  const card = document.createElement("article");
  card.className = `member-card level-${empresa.membership_level}`;

  // Caminho da imagem: usamos a pasta local "imagens/" como convenção do projeto
  const caminhoImagem = `imagens/${empresa.image}`;

  card.innerHTML = `
    <img src="${caminhoImagem}" alt="Logo de ${empresa.name}" loading="lazy"
         onerror="this.src='imagens/placeholder.svg'">
    <div class="member-info">
      <span class="membership-badge level-${empresa.membership_level}">
        ${NIVEIS[empresa.membership_level] || "Membro"}
      </span>
      <h2>${empresa.name}</h2>
      <p>${empresa.address}</p>
      <p>${empresa.phone}</p>
      <p>${empresa.additional_info}</p>
      <a class="website-link" href="${empresa.website}" target="_blank" rel="noopener noreferrer">
        Visitar site
      </a>
    </div>
  `;

  return card;
}

/**
 * Renderiza a lista completa de membros dentro do container principal.
 */
function renderizarMembros(listaEmpresas) {
  const container = document.getElementById("members-container");
  container.innerHTML = ""; // limpa a mensagem de "Carregando..."

  if (listaEmpresas.length === 0) {
    container.innerHTML = "<p class='loading-message'>Não foi possível carregar os membros no momento.</p>";
    return;
  }

  listaEmpresas.forEach((empresa) => {
    const cartao = criarCartaoMembro(empresa);
    container.appendChild(cartao);
  });
}

/**
 * Controla a alternância entre os modos Grid e Lista.
 * A troca é feita apenas trocando classes CSS no container e
 * atualizando o estado visual/aria dos botões (acessibilidade).
 */
function configurarAlternanciaDeVisualizacao() {
  const botaoGrid = document.getElementById("grid-btn");
  const botaoLista = document.getElementById("list-btn");
  const container = document.getElementById("members-container");

  botaoGrid.addEventListener("click", () => {
    container.classList.remove("list-view");
    container.classList.add("grid-view");

    botaoGrid.classList.add("active");
    botaoGrid.setAttribute("aria-pressed", "true");

    botaoLista.classList.remove("active");
    botaoLista.setAttribute("aria-pressed", "false");
  });

  botaoLista.addEventListener("click", () => {
    container.classList.remove("grid-view");
    container.classList.add("list-view");

    botaoLista.classList.add("active");
    botaoLista.setAttribute("aria-pressed", "true");

    botaoGrid.classList.remove("active");
    botaoGrid.setAttribute("aria-pressed", "false");
  });
}

/**
 * Preenche o rodapé com o ano atual e a data da última modificação
 * do documento (informação nativa do navegador via document.lastModified).
 */
function configurarRodape() {
  const anoAtual = new Date().getFullYear();
  document.getElementById("current-year").textContent = anoAtual;
  document.getElementById("last-modified").textContent = document.lastModified;
}

/**
 * Controla a abertura/fechamento do menu hambúrguer em telas pequenas.
 */
function configurarMenuHamburguer() {
  const botaoMenu = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");

  botaoMenu.addEventListener("click", () => {
    const estaAberto = nav.classList.toggle("open");
    botaoMenu.setAttribute("aria-expanded", estaAberto ? "true" : "false");
  });
}

/**
 * Ponto de entrada: espera o DOM carregar, busca os dados e inicializa
 * todas as funcionalidades da página.
 */
async function iniciar() {
  configurarRodape();
  configurarMenuHamburguer();
  configurarAlternanciaDeVisualizacao();

  const membros = await buscarMembros();
  renderizarMembros(membros);
}

document.addEventListener("DOMContentLoaded", iniciar);
