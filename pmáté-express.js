const express = require('express');
const app = express();

let todos = [];
todos.push({ id: '1', name: 'cica', desc: 'macska', status: 'new', author: 'anonymus' });
todos.push({ id: '2', name: 'doggo', desc: 'dog', status: 'done', author: 'anonymus' });

const getTodo = (req, res) => {
  res.send(todos);
};

const postTodo = (req, res) => {
  console.log(req.body);
  const todo = {
    id: req.body.id,
    name: req.body.name,
    desc: req.body.desc,
    status: req.body.status,
    author: 'anonymus'
  };
  todos.push(todo);
  res.status(201).json(todo);
};

const getTodoID = (req, res) => {
  let result = 0;
  for (let i = 0; i < todos.length; i++) {
    if (req.params.id === todos[i].id) {
      result = todos[i];
    }
  }
  res.send(result);
};

const updateTodo = (req, res) => {
  for (let i = 0; i < todos.length; i++) {
    if (req.params.id === todos[i].id) {
      todos[i] = {
        id: req.body.id,
        name: req.body.name,
        desc: req.body.desc,
        status: req.body.status
      };
    }
  }
  res.send(todos);
  //res.sendStatus(200);
};

const delByID = (req, res) => {
  for (let index = 0; index < todos.length; index++) {
    const todo = todos[index];
    if (todo.id === req.params.id) {
      todos.splice(index, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
};

const users = [];
let userID = 0;
const userPostHandler = (req, res) => {
  users.push({
    id: userID,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    passwd: req.body.passwd
  });
  userID++;
  res.json(users);
};

const getUserByID = (req, res) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === parseInt(req.params.id)) {
      return res.json(users[i]);
    }
  }
  res.sendStatus(200);
};

const updateUserHandler = (req, res) => {
  for (const user of users) {
    if (user.id === parseInt(req.params.id)) {
      user.username = req.body.username;
      user.email = req.body.email;
      user.role = req.body.role;
      user.passwd = req.body.passwd;
      res.send(user);
    }
  }
  res.send({});
};

const delByIDHandler = (req, res) => {
  for (const user of users) {
    if (user.id === parseInt(req.params.id)) {
      users.splice(user.id, 1);
      return res.sendStatus(200);
    }
  }
};

app.use(express.json());
app.get('/', getTodo);
app.post('/todos', postTodo);
app.get('/todos/:id', getTodoID);
app.put('/todos/:id', updateTodo);
app.delete('/todos/:id', delByID);
app.post('/users', userPostHandler);
app.get('/users/:id', getUserByID);
app.put('/users/:id', updateUserHandler);
app.delete('/users/:id', delByIDHandler);
app.listen(3030);
