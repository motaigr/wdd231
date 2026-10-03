/* =========================================================
   index.js
   Responsabilidades da página inicial da Câmara de Comércio:
   1) Buscar o tempo atual e a previsão de 3 dias para Curitiba
      na API do OpenWeatherMap
   2) Sortear 2-3 membros nível Prata/Ouro do JSON de membros e
      exibi-los como "destaques"
   (rodapé, menu hambúrguer e o cartão de membro compartilhado
   ficam em comum.js)
   ========================================================= */

// Cadastre uma chave gratuita em https://openweathermap.org/api e cole aqui
const CHAVE_API_OPENWEATHER = "721ddef348848a25b016edce82ac0180";

// Coordenadas de Curitiba, PR (sede da Câmara de Comércio)
const LATITUDE_CURITIBA = -25.4284;
const LONGITUDE_CURITIBA = -49.2733;

/**
 * Busca o tempo atual e a previsão de 3 dias em Curitiba e preenche a seção de tempo.
 * Usamos async/await + try/catch para não travar a página caso a API falhe
 * (chave inválida, sem internet, limite de requisições, etc.).
 */
async function buscarClima() {
  const areaAtual = document.getElementById("clima-atual");
  const listaPrevisao = document.getElementById("previsao-clima");

  try {
    const urlAtual = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE_CURITIBA}&lon=${LONGITUDE_CURITIBA}&units=metric&lang=pt_br&appid=${CHAVE_API_OPENWEATHER}`;
    const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE_CURITIBA}&lon=${LONGITUDE_CURITIBA}&units=metric&lang=pt_br&appid=${CHAVE_API_OPENWEATHER}`;

    const [respostaAtual, respostaPrevisao] = await Promise.all([
      fetch(urlAtual),
      fetch(urlPrevisao),
    ]);

    if (!respostaAtual.ok || !respostaPrevisao.ok) {
      throw new Error("Erro HTTP ao consultar o OpenWeatherMap");
    }

    const dadosAtuais = await respostaAtual.json();
    const dadosPrevisao = await respostaPrevisao.json();

    renderizarClimaAtual(dadosAtuais, areaAtual);
    renderizarPrevisao(dadosPrevisao.list, listaPrevisao);
  } catch (erro) {
    console.error("Falha ao carregar o clima:", erro);
    areaAtual.innerHTML = "<p class='mensagem-carregando'>Não foi possível carregar o tempo agora.</p>";
  }
}

function renderizarClimaAtual(dados, area) {
  const temperatura = Math.round(dados.main.temp);
  const descricao = dados.weather[0].description;
  const icone = dados.weather[0].icon;

  area.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${icone}@2x.png" alt="${descricao}" width="60" height="60">
    <p class="clima-temperatura">${temperatura}&deg;C</p>
    <p class="clima-descricao">${descricao}</p>
  `;
}

/**
 * A previsão da API vem em blocos de 3 em 3 horas. Para montar uma
 * previsão de 3 dias, pegamos o horário mais próximo do meio-dia de
 * cada uma das 3 próximas datas (excluindo hoje).
 */
function renderizarPrevisao(listaHoras, area) {
  const hoje = new Date().toISOString().slice(0, 10);
  const porDia = new Map();

  listaHoras.forEach((bloco) => {
    const [data, hora] = bloco.dt_txt.split(" ");
    if (data === hoje) return; // ignora o dia atual, já mostrado acima

    const diferencaParaMeioDia = Math.abs(parseInt(hora, 10) - 12);
    const escolhaAtual = porDia.get(data);

    if (!escolhaAtual || diferencaParaMeioDia < escolhaAtual.diferenca) {
      porDia.set(data, { bloco, diferenca: diferencaParaMeioDia });
    }
  });

  const proximosTresDias = [...porDia.entries()].slice(0, 3);

  area.innerHTML = proximosTresDias
    .map(([data, { bloco }]) => {
      const nomeDia = new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR", { weekday: "short" });
      const temperatura = Math.round(bloco.main.temp);
      return `
        <li class="previsao-dia">
          <span class="previsao-dia-nome">${nomeDia}</span>
          <img src="https://openweathermap.org/img/wn/${bloco.weather[0].icon}.png" alt="${bloco.weather[0].description}" width="40" height="40">
          <span class="previsao-temperatura">${temperatura}&deg;C</span>
        </li>
      `;
    })
    .join("");
}

/**
 * Busca o JSON de membros, filtra apenas nível Prata (2) ou Ouro (3),
 * sorteia 3 (ou menos, se não houver o suficiente) e os exibe como destaques.
 * O sorteio usa Math.random, então a ordem muda a cada carregamento da página.
 */
async function buscarDestaques() {
  const area = document.getElementById("lista-destaques");

  try {
    const resposta = await fetch("dados/membros.json");
    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const dados = await resposta.json();
    const elegiveis = dados.empresas.filter((empresa) => empresa.nivel >= 2);
    const sorteados = elegiveis.sort(() => Math.random() - 0.5).slice(0, 3);

    area.innerHTML = "";
    sorteados.forEach((empresa) => {
      area.appendChild(criarCartaoMembro(empresa));
    });
  } catch (erro) {
    console.error("Falha ao carregar membros em destaque:", erro);
    area.innerHTML = "<p class='mensagem-carregando'>Não foi possível carregar os destaques agora.</p>";
  }
}

async function iniciar() {
  buscarClima();
  buscarDestaques();
}

document.addEventListener("DOMContentLoaded", iniciar);
