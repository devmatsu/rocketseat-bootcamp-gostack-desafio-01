const express = require('express');

const server = express();

//server.use(express.json());

let countReq = 0;

// Crie um middleware global chamado em todas requisições que imprime (console.log)
// uma contagem de quantas requisições foram feitas na aplicação até então
server.use('/projects', (req, res, next) => {
  countReq++;
  console.log(`Quantidade de requisições feitas: ${countReq}`);

  return next();
});

// Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto
// nos parâmetros da URL que verifica se o projeto com aquele ID existe. Se não existir 
// retorne um erro, caso contrário permita a requisição continuar normalmente
function checkID(req, res, next) {

  //if () {

  //};

  return next();
}

// A rota deve receber id e title dentro corpo de cadastrar um novo projeto
// dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }
server.post('/projects', (req, res) => {

  res.send('Hi there');
});

// Rota que lista todos projetos e suas tarefas
server.get('/projects', (req, res) => {

});

// A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota
server.put('/projects/:id', (req, res) => {

});

// A rota deve deletar o projeto com o id presente nos parâmetros da rota;
server.delete('/projects/:id', (req, res) => {

});

// A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas
// de um projeto específico escolhido através do id presente nos parâmetros da rota
server.post('projects/:id/tasks', (req, res) => {

});

server.listen(3000);
