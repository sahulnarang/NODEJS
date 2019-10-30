/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name:Sahul Narang    Student ID: 136560166   Date: 18/09/2017
*
*  Online (Heroku) Link:https://infinite-bayou-90478.herokuapp.com/
*
********************************************************************************/ 
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");

var app = express();
var path = require("path");

app.listen(HTTP_PORT);
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", function (req,res){
    res.sendFile(path.join(__dirname, "/views/about.html"))
});

app.use(express.static('public'));