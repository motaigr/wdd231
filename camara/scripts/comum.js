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
