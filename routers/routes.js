const express = require("express");
const control = require("../controllers/usersignupAndSignIn");
const auth = require("../authorization/authfile");
var route = new express.Router();

route.post("/userRegister",control.userRegister);
route.post("/userLogin",control.userSignin);
route.post("/authlogin",auth,control.authUser);
route.get("/check",control.check)

module.exports = route;  