const control = require("../controllers/usersignupAndSignIn");
const express = require("express");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const knex = require('knex');
const connection = require("../knexfile");
const knexcon = knex(connection["development"])

exports.createTodo = (req, res) =>{
    // console.log(req);
    var Usertoken = req.headers.cookie;
    if(Usertoken){
        const token = Usertoken.split(' ')[0];
        const sliceToken = token.slice(4, token.length - 1)
        console.log(sliceToken) 
        let decoded = jwt.decode(sliceToken,"SecretKey");
        req.decoded=decoded
        // console.log(decoded)
        knexcon.select("id").from("UserDetails").
        where({Email:decoded.email}).
        then((data)=>{
            // console.log(data) 
            if(data.length!=0){
                knexcon("todo_list").insert([
                    {
                    Todo_Status:req.body.Todo_Status,
                    Title:req.body.Title,
                    description:req.body.description,
                    DetailKey:data[0]["id"]
                    }
                ])
                .then((result)=>{
                    res.send("Todo Created")
                })
                .catch((err)=>{
                    res.send(err);
                });
            }
            else{
                res.send("data is not here ")
            };
        })
        .catch((err)=>{
            res.send(err)
        });
    }
    else{
        res.send("token is not valid")
    };
};

exports.ReadList = (req,res)=>{
    var Usertoken = req.headers.cookie;
    if(Usertoken){
        const token = Usertoken.split(' ')[0];
        const sliceToken = token.slice(4, token.length - 1);
        // console.log(sliceToken) 
        let decoded = jwt.decode(sliceToken,"SecretKey");
        req.decoded=decoded
        // console.log(decoded);
        knexcon.select("id").from("UserDetails").
        where({Email:decoded.email}).
        then((data)=>{
            if(data.length!=0){
                // console.log(data[0]["id"])
                knexcon.select("*").from("todo_list").where({Todo_Status:req.body.Todo_Status}).
                then((data)=>{
                    res.send(data)
                })
                .catch((err)=>{
                    res.send(err)
                })
            }
            else{
                res.send("data is not exits")
            };
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    else{
        res.send("token is not")
    }
}

exports.listUpate = (req,res)=>{
    // console.log((req));
    var Usertoken = req.headers.cookie;
    if(Usertoken){
        const token = Usertoken.split(' ')[0];
        const sliceToken = token.slice(4, token.length - 1);
        // console.log(sliceToken) 
        let decoded = jwt.decode(sliceToken,"SecretKey");
        req.decoded=decoded
        // console.log(decoded);
        knexcon.select("id").from("UserDetails").
        where({Email:decoded.email}).
        then((data)=>{
            // console.log(data);
            if(data.length!=0){
                knexcon("todo_list").where({Todo_Status:req.body.Todo_Status}).
                update({
                    Todo_Status:req.body.Todo_Status,
                    Title:req.body.Title,
                    description:req.body.description
                })
                .then((result)=>{
                    res.send("updated")
                })
                .catch((err)=>{
                    res.send(err)
                })
            }
            else{
                res.send("data is not exits")
            };
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    else{
        res.send("token is not valid ")
    };
};

exports.ListDelete = (req,res)=>{
    // console.log(req)
    var Usertoken = req.headers.cookie;    
    if(Usertoken){        
        const token = Usertoken.split(' ')[0];
        // console.log(token)
        const sliceToken = token.slice(4, token.length - 1)
        // console.log(sliceToken)
        let decoded = jwt.decode(sliceToken,"SecretKey");
        req.decoded=decoded
        // console.log(decoded)
        knexcon.select("id").from("UserDetails").
        where({Email:decoded.email}).
        then((result)=>{
            console.log(result[0]["id"]);
            if(result!=0){ 
                knexcon.select("*").from("todo_list").where({DetailKey:result[0]["id"]}).
                del()
                .then(()=>{
                    res.send("data deleted")
                })
                .catch((err)=>{
                    res.send(err)
                })
            }else{
                res.send("data is not there")
            }
        })
        .catch((err)=>{
            res.send(err)
        })
    }
    else{
        res.send("token is not valid")
    };
};
