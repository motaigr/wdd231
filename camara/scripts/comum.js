/* =========================================================
   comum.js
   Funções compartilhadas entre as páginas da Câmara de Comércio:
   preencher o rodapé, controlar o menu hambúrguer e montar o
   cartão de membro (usado no Diretório e nos "destaques" da
   página inicial). Precisa ser carregado antes de qualquer
   script específico de página que dependa dessas funções.
   ========================================================= */

// Mapeia o nível numérico do JSON para um rótulo legível em português
const NIVEIS = {
  1: "Membro",
  2: "Prata",
  3: "Ouro",
};

/**
 * Constrói o HTML de um único cartão de membro a partir do objeto da empresa.
 */
function criarCartaoMembro(empresa) {
  const cartao = document.createElement("article");
  cartao.className = `cartao-membro nivel-${empresa.nivel}`;

  // Caminho da imagem: usamos a pasta local "imagens/" como convenção do projeto
  const caminhoImagem = `imagens/${empresa.imagem}`;

  cartao.innerHTML = `
    <img src="${caminhoImagem}" alt="Logo de ${empresa.nome}" loading="lazy"
         onerror="this.src='imagens/imagem-indisponivel.svg'">
    <div class="info-membro">
      <span class="selo-nivel nivel-${empresa.nivel}">
        ${NIVEIS[empresa.nivel] || "Membro"}
      </span>
      <h2>${empresa.nome}</h2>
      <p>${empresa.endereco}</p>
      <p>${empresa.telefone}</p>
      <p>${empresa.informacoes}</p>
      <a class="link-site" href="${empresa.site}" target="_blank" rel="noopener noreferrer">
        Visitar site
      </a>
    </div>
  `;

  return cartao;
}

function configurarRodape() {
  const anoAtual = new Date().getFullYear();
  document.getElementById("ano-atual").textContent = anoAtual;
  document.getElementById("ultima-modificacao").textContent = document.lastModified;
}

function configurarMenuHamburguer() {
  const botaoMenu = document.getElementById("botao-menu");
  const nav = document.getElementById("nav-principal");

  botaoMenu.addEventListener("click", () => {
    const estaAberto = nav.classList.toggle("open");
    botaoMenu.setAttribute("aria-expanded", estaAberto ? "true" : "false");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  configurarRodape();
  configurarMenuHamburguer();
});
