/* =========================================================
   dados.mjs
   Busca a lista de clubes no arquivo JSON. Usa async/await
   com try/catch para que uma falha de rede não quebre a página.
   ========================================================= */

const URL_CLUBES = "dados/clubes.json";

export async function buscarClubes() {
  try {
    const resposta = await fetch(URL_CLUBES);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const dados = await resposta.json();
    return dados.clubes;
  } catch (erro) {
    console.error("Falha ao carregar clubes.json:", erro);
    return [];
  }
}

// O ranking não traz a cidade de todos os clubes: nesse caso mostramos só o estado
export function formatarLocal(clube) {
  return clube.cidade ? `${clube.cidade} - ${clube.estado}` : clube.estado;
}

export function formatarPercentual(valor) {
  return `${valor.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}%`;
}
