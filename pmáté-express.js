"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express'); js import 
var express_1 = __importDefault(require("express")); // ts import
var app = express_1.default();
var port = process.env.API_PORT || 3000;
;
var todoIndex = 0;
;
var todoArray = [];
todoArray.push({
    id: 1,
    name: 'cica',
    desc: 'macska',
    status: 'new',
    authorID: 1
}, {
    id: 2,
    name: 'doggo',
    desc: 'dog',
    status: 'done',
    authorID: 2
});
var getTodo = function (req, res) {
    res.send(todoArray);
};
var postTodo = function (req, res) {
    console.log(req.body);
    var todo = {
        id: req.body.id,
        name: req.body.name,
        desc: req.body.desc,
        status: req.body.status,
        authorID: req.body.authorID
    };
    todoArray.push(todo);
    res.status(201).json(todo);
};
var getTodoID = function (req, res) {
    for (var i = 0; i < todoArray.length; i++) {
        if (parseInt(req.params.id) === todoArray[i].id) {
            var result = todoArray[i];
            res.send(result);
        }
    }
};
var updateTodo = function (req, res) {
    for (var i = 0; i < todoArray.length; i++) {
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
var delByID = function (req, res) {
    for (var index = 0; index < todoArray.length; index++) {
        var todo = todoArray[index];
        if (todo.id === parseInt(req.params.id)) {
            todoArray.splice(index, 1);
            return res.sendStatus(204);
        }
    }
    res.sendStatus(200);
};
var users = [];
var userID = 0;
var userPostHandler = function (req, res) {
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
var getUserByID = function (req, res) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(req.params.id)) {
            return res.json(users[i]);
        }
    }
    res.sendStatus(200);
};
var updateUserHandler = function (req, res) {
    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
        var user = users_1[_i];
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
var delByIDHandler = function (req, res) {
    for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {
        var user = users_2[_i];
        if (user.id === parseInt(req.params.id)) {
            users.splice(user.id, 1);
            return res.sendStatus(200);
        }
    }
};
app.use(express_1.default.json());
app.get('/', getTodo);
app.post('/todos', postTodo);
app.get('/todos/:id', getTodoID);
app.put('/todos/:id', updateTodo);
app.delete('/todos/:id', delByID);
app.post('/users', userPostHandler);
app.get('/users/:id', getUserByID);
app.put('/users/:id', updateUserHandler);
app.delete('/users/:id', delByIDHandler);
app.listen(port, function () { console.log("running on: " + port); });
