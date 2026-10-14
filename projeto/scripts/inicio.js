/* =========================================================
   inicio.js
   Página inicial: mostra os três primeiros clubes do ranking e
   uma mensagem de boas-vindas baseada na última visita
   (guardada no localStorage).
   ========================================================= */

import { iniciarPagina } from "./comum.mjs";
import { buscarClubes, formatarLocal, formatarPercentual } from "./dados.mjs";

const CHAVE_ULTIMA_VISITA = "guia-rugby-ultima-visita";
const UM_DIA = 1000 * 60 * 60 * 24;

function exibirMensagemVisita() {
  const area = document.getElementById("mensagem-visita");
  const agora = Date.now();
  let ultimaVisita = null;

  try {
    ultimaVisita = Number(localStorage.getItem(CHAVE_ULTIMA_VISITA)) || null;
    localStorage.setItem(CHAVE_ULTIMA_VISITA, agora);
  } catch {
    // Sem acesso ao localStorage: mantém a mensagem padrão
  }

  if (!ultimaVisita) {
    area.textContent = "Bem-vindo! Explore o guia e descubra o rugby perto de você.";
    return;
  }

  const dias = Math.floor((agora - ultimaVisita) / UM_DIA);

  if (dias < 1) {
    area.textContent = "Que bom ver você de novo hoje!";
  } else {
    area.textContent = `Bem-vindo de volta! Sua última visita foi há ${dias} ${dias === 1 ? "dia" : "dias"}.`;
  }
}

function melhoresDoRanking(lista, quantidade) {
  return lista
    .filter((clube) => clube.posicao !== null)
    .sort((a, b) => a.posicao - b.posicao)
    .slice(0, quantidade);
}

function exibirClubesDestaque(clubes) {
  const area = document.getElementById("clubes-destaque");

  if (clubes.length === 0) {
    area.innerHTML = `<p class="mensagem">Não foi possível carregar os clubes no momento.</p>`;
    return;
  }

  area.innerHTML = melhoresDoRanking(clubes, 3)
    .map((clube) => `
      <article class="mini-clube">
        <span class="escudo" aria-hidden="true">${clube.posicao}º</span>
        <div>
          <h3>${clube.nome}</h3>
          <p>${formatarLocal(clube)} · ${formatarPercentual(clube.percentual)}</p>
        </div>
      </article>
    `)
    .join("");
}

async function iniciar() {
  iniciarPagina();
  exibirMensagemVisita();

  const clubes = await buscarClubes();
  exibirClubesDestaque(clubes);
}

iniciar();
