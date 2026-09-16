const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';
const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
  const resposta = await fetch(url);
  const dados = await resposta.json();
  // console.table(dados.profetas); // Descomente para testar no console
  exibirProfetas(dados.profetas);
}

const exibirProfetas = (profetas) => {
  profetas.forEach((profeta) => {
    // 1. Cria os elementos HTML
    let cartao = document.createElement('section');
    let nomeCompleto = document.createElement('h2');
    let dataNascimento = document.createElement('p');
    let localNascimento = document.createElement('p');
    let retrato = document.createElement('img');

    // 2. Preenche os campos usando as chaves em PORTUGUÊS do JSON
    nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;
    dataNascimento.textContent = `Nascimento: ${profeta.nascimento}`;
    localNascimento.textContent = `Lugar: ${profeta.localNascimento}`;

    // 3. Configura a imagem com a chave urlImagem
    retrato.setAttribute('src', profeta.urlImagem);
    retrato.setAttribute('alt', `Retrato de ${profeta.nome} ${profeta.sobrenome}`);
    retrato.setAttribute('loading', 'lazy');
    retrato.setAttribute('width', '340');
    retrato.setAttribute('height', '440');

    // 4. Monta o cartão
    cartao.appendChild(nomeCompleto);
    cartao.appendChild(dataNascimento);
    cartao.appendChild(localNascimento);
    cartao.appendChild(retrato);

    // 5. Insere no elemento principal
    cartoes.appendChild(cartao);
  });
};

obterDadosDeProfetas();