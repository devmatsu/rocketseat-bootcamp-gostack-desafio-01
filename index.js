const express = require('express');
const server = express();
server.use(express.json());

let countReq = 0;
let projects = [];

// Crie um middleware global chamado em todas requisições que imprime (console.log)
// uma contagem de quantas requisições foram feitas na aplicação até então
server.use('/projects', (req, res, next) => {
  countReq++;
  console.log(`\nIncoming Method: ${req.method} | Incoming URL: ${req.originalUrl}`);
  console.log(`Quantidade de requisições feitas: ${countReq}\n`);

  return next();
});

// Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto
// nos parâmetros da URL que verifica se o projeto com aquele ID existe. Se não existir 
// retorne um erro, caso contrário permita a requisição continuar normalmente
function checkID(req, res, next) {
  const { id } = req.params;

  for (let k in projects) {
    if (projects[k].id == id) {
      return next();
    }
  }

  return res.status(400).json({ error: "Don`t exist title with this id" });
}

// A rota deve receber id e title dentro corpo de cadastrar um novo projeto
// dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }
server.post('/projects', (req, res) => {
  projects.push(req.body)

  return res.send('Cadastrado com sucesso!');
});

// Rota que lista todos projetos e suas tarefas
server.get('/projects', (req, res) => {
  return res.send(projects);
});

// A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota
server.put('/projects/:id', checkID, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  let oldTitle;

  for (let k in projects) {
    if (projects[k].id == id) {
      oldTitle = projects[k].title;
      projects[k].title = title;
    }
  }

  return res.send(`O projeto com id [${id}] mudou o título de [${oldTitle}] para [${title}] com sucesso!`)
});

// A rota deve deletar o projeto com o id presente nos parâmetros da rota;
server.delete('/projects/:id', checkID, (req, res) => {
  const { id } = req.params;

  for (let k in projects) {
    if (projects[k].id == id) {
      projects.splice(k, 1);
      return res.send('Deletado com sucesso!');
    }
  }
});

// A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas
// de um projeto específico escolhido através do id presente nos parâmetros da rota
server.post('/projects/:id/tasks', checkID, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  for (let k in projects) {
    if (projects[k].id == id) {
      projects[k].tasks = title;
      return res.send('Tarefa cadastrado com sucesso!');
    }
  }
});

server.listen(3000);
