const express = require("express");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const knex = require('knex');
const connection = require("../knexfile");
const knexcon = knex(connection["development"])
const bcryptpass = require("bcrypt");

var app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookie());
exports.userRester = (req, res) => {
    const user_details = {
        UserName:req.body.UserName,
        Email:req.body.Email,
        password:req.body.password,
        Gender:req.body.Gender,        
        DOb:req.body.DOb,cd
        Qualification:req.body.Qualification,
        Terms_and_Conditions:req.body.Terms_and_Conditions,
    }
    knexcon("usersignup").insert([
        {
            UserName:user_details.UserName, Email:user_details.Email, password:user_details.password,
            Gender:user_details.Gender, DOb:user_details.DOb, Qualification:user_details.Qualification,
            Terms_and_Conditions:user_details.Terms_and_Conditions
        }
    ])
    .then(table => {
        res.send("Data Inserted")
    }).catch(err => {
        res.send(err);
    });
};
exports.userSignip = (req, res) => {
    knexcon.select('Email', 'password').
        from('usersignup').where('Email', req.body.Email)
        .then(data => {
            console.log(data)
            if (data.length !== 0) {
                var email = req.body.email;
                var password = req.body.password;
                var log_token = jwt.sign({ email, password }, "SecretKey", {
                    expiresIn: "2h"
                });
                res.cookie("jwt", log_token).json({
                    message: "user_found",
                    log_user: log_token
                });
            }else {
                res.status(400).json({
                    message: "failed"
                });
            };
        })
        .catch(err => 
            res.send(err));
};

exports.authUser = (req,res)=>{
    res.send(req.user)
}
