const express = require("express");
const contsignup = require("./controllers/usersignupAndSignIn");
const route = require("./routers/routes");
const knexfile = require("./knexfile"); 

var app = express();
app.use(express.json());
app.use(route);

app.listen(8080,function(){
    console.log("running.....");
}); 

