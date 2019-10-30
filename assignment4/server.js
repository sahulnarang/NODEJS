/*********************************************************************************
*  WEB322 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Sahul Narang      Student ID: 136560166     Date: 16/10/2017
*
*  Online (Heroku) Link:      https://ass4-sahul.herokuapp.com/
*
********************************************************************************/ 


var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var dataserver = require("./data-service.js");

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');


//var department = require("./data/departments.json");
//var employees = require("./data/departments.json");

var app = express();
var path = require("path");



//app.listen(HTTP_PORT);
app.get("/", function(req,res){
    res.render("home");
});

app.get("/about", function (req,res){
    res.render("about");
});
 


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.engine(".hbs", exphbs({
  extname: ".hbs",
  defaultLayout: 'layout',
  helpers: {
    equal: function (lvalue, rvalue, options) {
      if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
      if (lvalue != rvalue) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    }
  }
}));
app.set("view engine", ".hbs");



app.get("/employees", function(req,res){
    
    if(req.query.status){
      dataserver.getEmployeesByStatus(req.query.status).then(function(data){
        res.render("employeeList", { data: data, title: "Employees" }); 
      }).catch(function(error){
        res.render("employeeList", { data: {}, title: "Employees" });
      });
    }
    
    else if(req.query.department){
          dataserver.getEmployeesByDepartment(req.query.department).then(function(data){
            res.render("employeeList", { data: data, title: "Employees" }); 
          }).catch(function(error){
            res.render("employeeList", { data: {}, title: "Employees" });
          });
    }else if(req.query.manager){
          dataserver.getEmployeesByManager(req.query.manager).then(function(data){
            res.json(data);res.render("employeeList", { data: data, title: "Employees" }); 
          }).catch(function(error){
            res.render("employeeList", { data: {}, title: "Employees" });
          });
    }else
    {
          dataserver.getAllEmployees().then(function(data){
            res.render("employeeList", { data: data, title: "Employees" }); 
          }).catch(function(error){
            res.render("employeeList", { data: {}, title: "Employees" });
          });
    }
});
  
app.get("/employee/:empNum", function(req,res){
  dataserver.getEmployeeByNum(req.params.empNum).then((data) => {
    res.render("employee", { data: data });
}).catch((err) => {
    res.status(404).send("Employee Not Found!!!");
});
});
  
app.post("/employee/update", (req, res) => {
  dataserver.updateEmployee(req.body).then((data) => {
      console.log("data::");
      console.log(req.body);
      res.redirect("/employees");
  }).catch((err) => {
      console.log(err);
  })
});
app.get("/managers", function(req,res){
        dataserver.getManagers().then(function(data){
          res.render("employeeList", { data: data, title: "Employees (Managers)" }); 
        }).catch(function(error){
          res.render("employeeList", { data: {}, title: "Employees (Managers)" }); 
        });
});
  
app.get("/departments", function(req,res){
        dataserver.getDepartments().then(function(data){
          res.render("departmentList", { data: data, title: "Departments" }); 
        }).catch(function(error){
          res.render("departmentList", { data: {}, title: "Departments" });
        });
});

app.get("/employees/add", (req,res) => {
  res.render("addEmployee");
});

app.post("/employees/add", (req, res) => {
  dataserver.addEmployee(req.body).then((data) => {
    console.log(req.body);
    res.redirect("/employees");
}).catch((err) => {
    console.log(err);
});
});


app.use(function(req, res) {
    res.status(404).send(" 404 error : Page Not Found");
});
app.listen(HTTP_PORT, function(res,req){
         console.log("Express http server listening on: " + HTTP_PORT);
         dataserver.initialize().then(function(data){
             console.log(data)
           }).catch(function(error){
             console.log(error);
           });
});
  

app.post("/employee/update", (req, res) => {
  dataserver.updateEmployee(req.body).then((data) => {
      console.log("data::");
      console.log(req.body);
      res.redirect("/employees");
  }).catch((err) => {
      console.log(err);
  })
});
