const express = require("express");
const control = require("../controllers/usersignupAndSignIn");
const Todo = require("../controllers/Todo_list_crud")
const auth = require("../authorization/authfile");
var route = new express.Router();

route.post("/userRegister",control.userRegister);
route.post("/userLogin",control.userSignin);
route.post("/authlogin",auth,control.authUser);
route.post("/createTodo",Todo.createTodo);
route.get("/ReadList",Todo.ReadList);
route.put("/listUpate",Todo.listUpate);
route.delete("/ListDelete",Todo.ListDelete);
module.exports = route;      
