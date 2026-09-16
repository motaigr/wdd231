// Define o ano atual do footer
document.getElementById('anoAtual').textContent = new Date().getFullYear();

// Formata a última modificação do documento no formato brasileiro
const dataModificacao = new Date(document.lastModified);
const dataFormatada = dataModificacao.toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});
const horaFormatada = dataModificacao.toLocaleTimeString('pt-BR');

document.getElementById('ultimaModificacao').textContent = `Última Modificação: ${dataFormatada} ${horaFormatada}`;