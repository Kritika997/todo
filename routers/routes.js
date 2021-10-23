const express = require("express");
const control = require("../controllers/usersignupAndSignIn");
const auth = require("../authorization/authfile");
var route = new express.Router();

route.post("/userRester",control.userRester);
route.post("/userLogin",control.userSignip);
route.post("/authlogin",auth,control.authUser);

module.exports = route;  