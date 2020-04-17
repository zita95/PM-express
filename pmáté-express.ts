// const express = require('express'); js import 
import express, { Request, Response } from 'express'; // ts import
const app = express();
const port = process.env.API_PORT || 3000;

interface Users {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  passwd: string;
};
let todosIndex:number = 0;
interface Todos {
  id: number;
  name: string;
  desc: string;
  status: 'new' | 'done' | 'in-progress';
  authorID: number;
};

let todoArray: Array<Todos> = [];



todoArray.push(
  {
    id: 1,
    name: 'cica',
    desc: 'macska',
    status: 'new',
    authorID: 1
  },
  {
    id: 2,
    name: 'doggo',
    desc: 'dog',
    status: 'done',
    authorID: 2
  });

const getTodo = (req: Request, res: Response) => {
  res.send(todoArray);
};

const postTodo = (req: Request, res: Response) => {
  console.log(req.body);
  const todo: Todos = {
    id: req.body.id,
    name: req.body.name,
    desc: req.body.desc,
    status: req.body.status,
    authorID: req.body.authorID
  };
  todoArray.push(todo);
  res.status(201).json(todo);
};

const getTodoID = (req: Request, res: Response) => {
  
  for (let i = 0; i < todoArray.length; i++) {
    if (parseInt(req.params.id) === todoArray[i].id) {
      let result: Todos = todoArray[i];
      res.send(result);
    }
  }
};

const updateTodo = (req: Request, res: Response) => {
  for (let i = 0; i < todoArray.length; i++) {
    if (parseInt(req.params.id) === todoArray[i].id) {
      todoArray[i] = {
        id: req.body.id,
        name: req.body.name,
        desc: req.body.desc,
        status: req.body.status,
        authorID: req.body.authorID
      };
    }
  }
  res.send(todoArray);
};

const delByID = (req: Request, res: Response) => {
  for (let index = 0; index < todoArray.length; index++) {
    const todo = todoArray[index];
    if (todo.id === parseInt(req.params.id)) {
      todoArray.splice(index, 1);
      return res.sendStatus(204);
    }
  }
  res.sendStatus(200);
};

const users: Array<Users> = [];
let userID = 0;
const userPostHandler = (req: Request, res: Response) => {
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

const getUserByID = (req: Request, res: Response) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === parseInt(req.params.id)) {
      return res.json(users[i]);
    }
  }
  res.sendStatus(200);
};

const updateUserHandler = (req: Request, res: Response) => {
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

const delByIDHandler = (req: Request, res: Response) => {
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
app.listen(port, () => { console.log(`running on: ${port}` )});
