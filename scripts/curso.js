const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of program development.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more proficient in writing functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces classes, objects, and inheritance.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to create dynamic websites with JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students focus on user experience, accessibility, and dynamic content.',
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