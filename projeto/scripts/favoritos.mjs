/* =========================================================
   favoritos.mjs
   Guarda os ids dos clubes favoritos no localStorage do
   navegador para que continuem salvos entre as visitas.
   ========================================================= */

const CHAVE_FAVORITOS = "guia-rugby-favoritos";

export function lerFavoritos() {
  try {
    const salvos = JSON.parse(localStorage.getItem(CHAVE_FAVORITOS));
    return Array.isArray(salvos) ? salvos : [];
  } catch {
    return [];
  }
}

function salvarFavoritos(lista) {
  try {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(lista));
  } catch (erro) {
    console.error("Não foi possível salvar os favoritos:", erro);
  }
}

export function ehFavorito(id) {
  return lerFavoritos().includes(id);
}

/**
 * Adiciona o clube aos favoritos ou remove, se já estiver lá.
 * Retorna true quando o clube passa a ser favorito.
 */
export function alternarFavorito(id) {
  const favoritos = lerFavoritos();

  if (favoritos.includes(id)) {
    salvarFavoritos(favoritos.filter((item) => item !== id));
    return false;
  }

  salvarFavoritos([...favoritos, id]);
  return true;
}
