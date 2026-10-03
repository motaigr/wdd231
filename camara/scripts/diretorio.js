/* =========================================================
   diretorio.js
   Responsabilidades:
   1) Buscar os dados dos membros em dados/membros.json
   2) Renderizar os cartões na área #lista-membros
   3) Alternar entre visualização em Grade e em Lista
   (rodapé e menu hambúrguer ficam em comum.js, compartilhado
   com as demais páginas da Câmara de Comércio)
   ========================================================= */

/**
 * Busca os dados dos membros no arquivo JSON.
 * Usamos async/await + try/catch para tratar falhas de rede
 * ou de leitura do arquivo sem travar a página.
 */
async function buscarMembros() {
  try {
    const resposta = await fetch("dados/membros.json");

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const dados = await resposta.json();
    return dados.empresas; // lista de empresas
  } catch (erro) {
    console.error("Falha ao carregar membros.json:", erro);
    return []; // retorna lista vazia para a página não quebrar
  }
}

/**
 * Renderiza a lista completa de membros dentro da área principal.
 * (criarCartaoMembro vem de comum.js, compartilhado com a página inicial)
 */
function renderizarMembros(listaEmpresas) {
  const area = document.getElementById("lista-membros");
  area.innerHTML = ""; // limpa a mensagem de "Carregando..."

  if (listaEmpresas.length === 0) {
    area.innerHTML = "<p class='mensagem-carregando'>Não foi possível carregar os membros no momento.</p>";
    return;
  }

  listaEmpresas.forEach((empresa) => {
    const cartao = criarCartaoMembro(empresa);
    area.appendChild(cartao);
  });
}

/**
 * Controla a alternância entre os modos Grade e Lista.
 * A troca é feita apenas trocando classes CSS na área de membros e
 * atualizando o estado visual/aria dos botões (acessibilidade).
 */
function configurarAlternanciaDeVisualizacao() {
  const botaoGrade = document.getElementById("botao-grade");
  const botaoLista = document.getElementById("botao-lista");
  const area = document.getElementById("lista-membros");

  botaoGrade.addEventListener("click", () => {
    area.classList.remove("visualizacao-lista");
    area.classList.add("visualizacao-grade");

    botaoGrade.classList.add("ativo");
    botaoGrade.setAttribute("aria-pressed", "true");

    botaoLista.classList.remove("ativo");
    botaoLista.setAttribute("aria-pressed", "false");
  });

  botaoLista.addEventListener("click", () => {
    area.classList.remove("visualizacao-grade");
    area.classList.add("visualizacao-lista");

    botaoLista.classList.add("ativo");
    botaoLista.setAttribute("aria-pressed", "true");

    botaoGrade.classList.remove("ativo");
    botaoGrade.setAttribute("aria-pressed", "false");
  });
}

/**
 * Ponto de entrada: espera o DOM carregar, busca os dados e inicializa
 * as funcionalidades específicas desta página (rodapé e menu hambúrguer
 * já são cuidados por comum.js).
 */
async function iniciar() {
  configurarAlternanciaDeVisualizacao();

  const membros = await buscarMembros();
  renderizarMembros(membros);
}

document.addEventListener("DOMContentLoaded", iniciar);
