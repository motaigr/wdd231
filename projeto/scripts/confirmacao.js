/* =========================================================
   confirmacao.js
   Lê os dados enviados pelo formulário (método GET) a partir
   da URL, exibe um resumo para o usuário e lista os clubes do
   estado que ele escolheu (a partir de dados/clubes.json).
   ========================================================= */

import { iniciarPagina } from "./comum.mjs";
import { buscarClubes, formatarLocal, formatarPercentual } from "./dados.mjs";

const MAXIMO_CLUBES = 5;

const NOMES_EXPERIENCIA = {
  nenhuma: "Nunca joguei",
  pouca: "Já joguei algumas vezes",
  experiente: "Já joguei em clube",
};

const parametros = new URLSearchParams(window.location.search);

function formatarData(valor) {
  const data = new Date(valor);
  return valor && !Number.isNaN(data.getTime()) ? data.toLocaleString("pt-BR") : "Não informado";
}

function exibirResumo() {
  const valor = (campo) => parametros.get(campo)?.trim() || "Não informado";

  const cidade = parametros.get("cidade")?.trim();
  const estado = parametros.get("estado");

  document.getElementById("resumo-nome").textContent = valor("nome");
  document.getElementById("resumo-email").textContent = valor("email");
  document.getElementById("resumo-telefone").textContent = valor("telefone");
  document.getElementById("resumo-local").textContent = cidade && estado ? `${cidade} - ${estado}` : "Não informado";
  document.getElementById("resumo-modalidade").textContent = valor("modalidade");
  document.getElementById("resumo-experiencia").textContent = NOMES_EXPERIENCIA[parametros.get("experiencia")] || "Não informado";
  document.getElementById("resumo-data").textContent = formatarData(parametros.get("data-envio"));

  const primeiroNome = parametros.get("nome")?.trim().split(" ")[0];
  if (primeiroNome) {
    document.getElementById("titulo-confirmacao").textContent = `Obrigado, ${primeiroNome}!`;
  }
}

function criarItemClube(clube) {
  const ranking = clube.posicao !== null
    ? `${clube.posicao}º no ranking · ${formatarPercentual(clube.percentual)}`
    : "Não avaliado no diagnóstico 2025";

  return `
    <li class="mini-clube">
      <span class="escudo" aria-hidden="true">${clube.posicao !== null ? `${clube.posicao}º` : "–"}</span>
      <div>
        <h3>${clube.nome}</h3>
        <p>${formatarLocal(clube)} · ${ranking}</p>
      </div>
    </li>
  `;
}

async function exibirClubesDoEstado() {
  const descricao = document.getElementById("descricao-clubes-estado");
  const lista = document.getElementById("clubes-estado");
  const link = document.getElementById("link-clubes-regiao");

  const clubes = await buscarClubes();
  if (clubes.length === 0) {
    descricao.textContent = "Não foi possível carregar os clubes no momento.";
    return;
  }

  // O estado vem da URL: só é usado para comparar com os dados do JSON
  const estado = parametros.get("estado");
  const clubesDoEstado = clubes
    .filter((clube) => clube.estado === estado)
    .sort((a, b) => (a.posicao ?? Infinity) - (b.posicao ?? Infinity));

  if (clubesDoEstado.length === 0) {
    descricao.textContent = "Ainda não temos clubes cadastrados no seu estado. Veja a lista completa e encontre o mais próximo de você.";
    return;
  }

  const { regiao } = clubesDoEstado[0];
  const exibidos = clubesDoEstado.slice(0, MAXIMO_CLUBES);
  const restantes = clubesDoEstado.length - exibidos.length;

  if (clubesDoEstado.length === 1) {
    descricao.textContent = `Encontramos 1 clube em ${estado}:`;
  } else if (restantes > 0) {
    descricao.textContent = `Encontramos ${clubesDoEstado.length} clubes em ${estado}. Estes são os ${exibidos.length} mais bem colocados no ranking:`;
  } else {
    descricao.textContent = `Encontramos ${clubesDoEstado.length} clubes em ${estado}:`;
  }

  lista.innerHTML = exibidos.map(criarItemClube).join("");

  link.href = `clubes.html?regiao=${encodeURIComponent(regiao)}`;
  link.textContent = `Ver clubes do ${regiao}`;
}

iniciarPagina();
exibirResumo();
exibirClubesDoEstado();
