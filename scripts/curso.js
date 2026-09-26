const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introdução à Programação',
        credits: 2,
        certificate: 'Programação Web e de Computadores',
        description: 'Este curso apresenta os conceitos básicos do desenvolvimento de programas.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Fundamentos da Web',
        credits: 2,
        certificate: 'Programação Web e de Computadores',
        description: 'Este curso apresenta aos alunos a World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programação com Funções',
        credits: 2,
        certificate: 'Programação Web e de Computadores',
        description: 'Os alunos de CSE 111 se tornam mais proficientes na escrita de funções.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programação com Classes',
        credits: 2,
        certificate: 'Programação Web e de Computadores',
        description: 'Este curso apresenta classes, objetos e herança.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Fundamentos de Web Dinâmica',
        credits: 2,
        certificate: 'Programação Web e de Computadores',
        description: 'Os alunos aprendem a criar sites dinâmicos com JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Desenvolvimento Frontend Web I',
        credits: 2,
        certificate: 'Programação Web e de Computadores',
        description: 'Os alunos focam em experiência do usuário, acessibilidade e conteúdo dinâmico.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const containerCursos = document.getElementById('container-cursos');
const totalCreditosEl = document.getElementById('total-creditos');
const modalInfosCurso = document.getElementById('infos-do-curso');

function exibirInfosDoCurso(curso) {
  modalInfosCurso.innerHTML = '';

  const botaoFechar = document.createElement('button');
  botaoFechar.className = 'botao-fechar';
  botaoFechar.setAttribute('aria-label', 'Fechar');
  botaoFechar.textContent = '❌';
  botaoFechar.addEventListener('click', () => modalInfosCurso.close());

  const titulo = document.createElement('h3');
  titulo.textContent = `${curso.subject} ${curso.number}: ${curso.title}`;

  const creditos = document.createElement('p');
  creditos.textContent = `Créditos: ${curso.credits}`;

  const descricao = document.createElement('p');
  descricao.textContent = curso.description;

  const certificado = document.createElement('p');
  certificado.textContent = `Certificado: ${curso.certificate}`;

  const tecnologias = document.createElement('p');
  tecnologias.textContent = `Tecnologias: ${curso.technology.join(', ')}`;

  modalInfosCurso.append(botaoFechar, titulo, creditos, descricao, certificado, tecnologias);
  modalInfosCurso.showModal();
}

function renderizarCursos(listaCursos) {
  containerCursos.innerHTML = '';

  listaCursos.forEach(curso => {
    const card = document.createElement('div');
    card.className = `curso-card ${curso.completed ? 'concluido' : ''}`;
    card.textContent = `${curso.subject} ${curso.number}`;
    card.addEventListener('click', () => exibirInfosDoCurso(curso));
    containerCursos.appendChild(card);
  });

  // Calcula o total de créditos usando reduce
  const totalCreditos = listaCursos.reduce((acc, cur) => acc + cur.credits, 0);
  totalCreditosEl.textContent = `O total de créditos dos cursos acima é: ${totalCreditos}`;
}

// Eventos de Filtro
document.getElementById('btn-todos').addEventListener('click', () => renderizarCursos(courses));
document.getElementById('btn-wdd').addEventListener('click', () => {
  const wddCursos = courses.filter(curso => curso.subject === 'WDD');
  renderizarCursos(wddCursos);
});
document.getElementById('btn-cse').addEventListener('click', () => {
  const cseCursos = courses.filter(curso => curso.subject === 'CSE');
  renderizarCursos(cseCursos);
});

// Renderização inicial
renderizarCursos(courses);