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
            console.log(data) 
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
                    // console.log(result);
                    if(result){ 
                        var Title = req.body.Title;
                        var id = data[0]["id"]
                        var token = jwt.sign({Title,id},"todoList",{
                            expiresIn:"2h"
                    })
                    res.cookie("list",token).json({
                        message:"founded",
                        event_token:token
                    })
                    }else{
                        res.send("failed")
                    }
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
    knexcon.select("*").from("todo_list").
    then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
}

exports.listUpate = (req,res)=>{
    // console.log((req));
    var Usertoken = req.headers.cookie;
    
    if(Usertoken){
        
        const token = Usertoken.split(' ')[0];
        // console.log(token)
        const sliceToken = token.slice(5, token.length - 0)
        // console.log(sliceToken)
        let decoded = jwt.decode(sliceToken,"todoList");
        req.decoded=decoded
        // console.log(decoded);
        knexcon.select("id").from("todo_list").where({Title:decoded.Title}).
        then((data)=>{
            // console.log(data);
            if(data.length!=0){
                knexcon("todo_list").where({Title:decoded.Title}).
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
    var Usertoken = req.headers.authorization;    
    if(Usertoken){        
        const token = Usertoken.split(' ')[1];
        // console.log(token)
        const sliceToken = token.slice(5, token.length - 1)
        // console.log(sliceToken)
        let decoded = jwt.decode(sliceToken,"todoList");
        req.decoded=decoded
        console.log(decoded)
        knexcon.select("id").from("todo_list").where({Title:decoded.Title}).
        then((result)=>{
            console.log(result);
            if(result!=0){ 
                knexcon("todo_list").where({Title:req.body.Title}).
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
