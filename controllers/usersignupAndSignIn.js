const express = require("express");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const knex = require('knex');
const connection = require("../knexfile");
const knexcon = knex(connection["development"])
const bcrypt = require('bcrypt');
const saltRounds = 10;


var app = express();
app.use(express.json());
app.use(bodyParser.json());  
app.use(cookie());

exports.userRegister = async (req, res) => {
    console.log("kritika")
    var haspassword = await bcrypt.hash(req.body.password,saltRounds)  
    // console.log(haspassword)
    var user_details = {
        UserName:req.body.UserName,
        profile_picture:req.body.profile_picture,
        Email:req.body.Email,
        Phone_number:req.body.Phone_number,
        password:haspassword,
        Gender:req.body.Gender,       
        DOb:req.body.DOb,
        Qualification:req.body.Qualification, 
        Terms_and_Conditions:req.body.Terms_and_Conditions, 
    }
    knexcon("UserDetails").insert([ 
        {
            UserName:user_details.UserName,profile_picture:user_details.profile_picture, Email:user_details.Email,Phone_number:user_details.Phone_number, password:user_details.password,
            Gender:user_details.Gender, DOb:user_details.DOb, Qualification:user_details.Qualification, 
            Terms_and_Conditions:user_details.Terms_and_Conditions
        }
    ])
    .then(table => {
        res.send("Data Inserted");  
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
};

exports.userSignin = async(req, res) => {
    knexcon.select('Email','password').
        from('UserDetails').where((req.body.Phone_number?{"Phone_number":req.body.Phone_number}:{"Email":req.body.Email}))
        .then(data =>{
            var password = data[0]["password"];
            if(bcrypt.compare(req.body.password,password)){
                if (data.length !== 0) {
                    var email = data[0]["Email"]; 
                    var log_token = jwt.sign({email}, "SecretKey", {
                        expiresIn: "1d"
                    });
                    res.cookie("jwt", log_token).json({
                        message: "user_found", 
                        log_user: log_token
                    })
                    res.status(200);
                }else { 
                    res.status(400).json({
                        message: "failed" 
                    });
                };
            }
            else{
                console.log("password is invalid "); 
            };
            
        })
        .catch(err => 
            res.send(err));
};

exports.authUser = (req,res)=>{
    res.send(req.user);
};

