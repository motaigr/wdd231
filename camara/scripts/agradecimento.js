/* =========================================================
   agradecimento.js
   Extrai os parâmetros enviados via GET pelo formulário de
   associação (associacao.html) e exibe os dados na tela.
   (rodapé e menu hambúrguer ficam em comum.js, compartilhado
   com as demais páginas da Câmara de Comércio)
   ========================================================= */

function formatarTimestamp(valor) {
  if (!valor) return "Não informado";

  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return valor;

  return data.toLocaleString("pt-BR");
}

function exibirDadosEnviados() {
  const parametros = new URLSearchParams(window.location.search);

  const nomeCompleto = `${parametros.get("fname") || ""} ${parametros.get("lname") || ""}`.trim();

  document.getElementById("resumo-nome").textContent = nomeCompleto || "Não informado";
  document.getElementById("resumo-email").textContent = parametros.get("email") || "Não informado";
  document.getElementById("resumo-telefone").textContent = parametros.get("phone") || "Não informado";
  document.getElementById("resumo-empresa").textContent = parametros.get("organization") || "Não informado";
  document.getElementById("resumo-timestamp").textContent = formatarTimestamp(parametros.get("timestamp"));
}

document.addEventListener("DOMContentLoaded", exibirDadosEnviados);
