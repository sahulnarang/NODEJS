//sahul
//https://git.heroku.com/web322-app5.git | https://git.heroku.com/web322-app5.git
/*********************************************************************************
*  WEB322 – Assignment 05
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Sahul Narang      Student ID: 136560166      Date: 12/10/2017
*
*  Online (Heroku) Link:           https://web322-app5.herokuapp.com/
*
********************************************************************************/ 


var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var dataserver = require("./data-service.js");
const dataServiceComments = require("./data-service-comments.js");

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');


//var department = require("./data/departments.json");
//var employees = require("./data/departments.json");

var app = express();
var path = require("path");




app.get("/", function(req,res){
    res.render("home");
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
  
app.get("/employee/:empNum", (req, res) => {
  
     let viewData = {};
     dataserver.getEmployeeByNum(req.params.empNum).then((data) => {
         viewData.data = data; 
     }).catch(() => {
         viewData.data = null; 
     }).then(dataserver.getDepartments).then((data) => {
         viewData.departments = data; 
         for (let i = 0; i < viewData.departments.length; i++) {
             if (viewData.departments[i].departmentId == viewData.data[0].department) {
                 viewData.departments[i].selected = true;
             }
         }
         
         if (viewData.departments[viewData.departments.length-1].departmentId != viewData.data[0].department) {
             viewData.departments.Selected = false;
         }
     }).catch(() => {
         viewData.departments = []; 
     }).then(() => {
         if (viewData.data == null){ 
             res.status(404).send("Employee Not Found!!!");
         } else {
             res.render("employee", { viewData: viewData }); 
         }
     });
 });


 
app.get("/department/:departmentId", (req, res) => {
  dataserver.getDepartmentById(req.params.departmentId).then((data) => {
      res.render("department", {
         data: data
      });
  }).catch((err) => {
      res.status(404).send("Department Not Found");
  });
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

app.get("/employees/add", (req, res) => {
  dataserver.getDepartments().then((data) => {
      res.render("addEmployee",{departments: data});
  }).catch((err) => {
      res.render("addEmployee", {departments: []});
  });
});

app.get("/departments/add", (req,res) => {
  res.render("addDepartment",{title: "Department"});
});

app.post("/employees/add", (req, res) => {
  dataserver.addEmployee(req.body).then((data) => {
    
    res.redirect("/employees");
}).catch((err) => {
    console.log(err);
});
});

app.post("/departments/add", (req, res) => {
  dataserver.addDepartment(req.body).then((data) => {
   
    res.redirect("/departments");
}).catch((err) => {
    console.log(err);
});
});

  
app.post("/employee/update", (req, res) => {
  dataserver.updateEmployee(req.body).then((data) => {
      res.redirect("/employees");
  }).catch((err) => {
      console.log(err);
  });
});


app.post("/department/update", (req,res) => {
  dataserver.updateDepartment(req.body).then((data) => {
      res.redirect("/departments");
  }).catch(function(err){ });
});


app.get("/employee/delete/:empNum", (req, res) => {
  dataserver.deleteEmployeeByNum(req.params.empNum).then((data) => {
      res.redirect("/employees");
  }).catch((err) => {
      res.status(500).send("Unable to Remove Employee / Employee not found");
  });
});




app.post("/about/addComment", (req, res) => {
  dataServiceComments.addComment(req.body).then((data)=>{

    res.redirect("/about");
  }).catch((err)=>{
    console.log(err);
    res.redirect("/about");
  });
});

app.post("/about/addReply", (req,res)=>{
  dataServiceComments.addReply(req.body).then((data)=>{
    res.redirect("/about");

  }).catch((err)=>{
    console.log(err);
    res.redirect("/about");
    
  });
});

app.get("/about",(req,res)=>{
  console.log("hello");
  dataServiceComments.getAllComments().then((data)=>{
    console.log("hello");
    res.render("about", {data: data});
  }).catch((err)=>{
    res.render("about");
  })
})

app.use(function(req, res) {
  res.status(404).send(" 404 error : Page Not Found");
});



/*
dataServiceComments.initialize()
.then(() => {
  dataServiceComments.addComment({
    authorName: "Comment 1 Author",
    authorEmail: "comment1@mail.com",
    subject: "Comment 1",
    commentText: "Comment Text 1"
  }).then((id) => {
    dataServiceComments.addReply({
      comment_id: id,
      authorName: "Reply 1 Author",
      authorEmail: "reply1@mail.com",
      commentText: "Reply Text 1"
    }).then(dataServiceComments.getAllComments)
    .then((data) => {
      console.log("comment: " + data[data.length - 1]);
      process.exit();
    });
  });
}).catch((err) => {
  console.log("Error: " + err);
  process.exit();
});

*/

dataServiceComments.initialize()


.then(()=>{
  

  app.listen(HTTP_PORT, onHttpStart());
})

.catch(()=>{
  console.log("unable to start dataService");
});


//app.listen(HTTP_PORT);
var onHttpStart = function(){
  console.log("Server listening on "+ HTTP_PORT);
};