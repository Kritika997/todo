const express = require("express");
const contsignup = require("./controllers/usersignupAndSignIn");
const route = require("./routers/routes");
const knexfile = require("./knexfile"); 
const cors = require("cors")

var app = express();
app.use(cors())
app.use(express.json());
app.use(route);

app.listen(8080,function(){
    console.log("running.....");
}); 

