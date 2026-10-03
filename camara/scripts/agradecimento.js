/* =========================================================
   agradecimento.js
   Extrai os parâmetros enviados via GET pelo formulário de
   associação (associacao.html) e exibe os dados na tela.
   (rodapé e menu hambúrguer ficam em comum.js, compartilhado
   com as demais páginas da Câmara de Comércio)
   ========================================================= */

function formatarDataEnvio(valor) {
  if (!valor) return "Não informado";

  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return valor;

  return data.toLocaleString("pt-BR");
}

function exibirDadosEnviados() {
  const parametros = new URLSearchParams(window.location.search);

  const nomeCompleto = `${parametros.get("nome") || ""} ${parametros.get("sobrenome") || ""}`.trim();

  document.getElementById("resumo-nome").textContent = nomeCompleto || "Não informado";
  document.getElementById("resumo-email").textContent = parametros.get("email") || "Não informado";
  document.getElementById("resumo-telefone").textContent = parametros.get("telefone") || "Não informado";
  document.getElementById("resumo-empresa").textContent = parametros.get("empresa") || "Não informado";
  document.getElementById("resumo-data-envio").textContent = formatarDataEnvio(parametros.get("data-envio"));
}

document.addEventListener("DOMContentLoaded", exibirDadosEnviados);
