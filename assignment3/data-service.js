/*********************************************************************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Sahul Narang   Student ID: 136560166        Date: 03/10/2017
*
*  Online (Heroku) Link:    https://assign3-snarang.herokuapp.com/
*
********************************************************************************/
var fs = require("fs");
var employees = [];
var department = [];
var empCount=0;

module.exports.initialize = function(){
    
    return new Promise(function(resolve,reject){
        try{
            fs.readFile('./data/employees.json', function(error, data){
                if(error) 
                throw error;
                employees = JSON.parse(data);
                empCount=employees.length;
            });
            fs.readFile('./data/departments.json', function(error,data){
                if(error) throw error;
                departments = JSON.parse(data);
            });
        }catch(ex){
            reject("Unable to read file!");
        }
        resolve("Reading Data Successful.");
    });
}
    module.exports.getAllEmployees = function(){
        var EmpAll=[];
        return new Promise(function(resolve,reject){
            for (var i = 0; i < employees.length; i++) {
                EmpAll.push(employees[i]);
            }
            if (EmpAll.length == 0){
                reject("No Result Returned!!!");
            }
        resolve(EmpAll);
        })
    }
    
   
module.exports.getEmployeesByStatus = function(status){
    var arryByStatus = [];
    return new Promise(function(resolve,reject){
        for(let i = 0; i < employees.length; i++){
            if(employees[i].status == status){
                arryByStatus.push(employees[i]);
            }
        }
        if (arryByStatus.length == 0){
            reject("No Result Returned!!!");
        }
        resolve(arryByStatus);
    });
}
    
    module.exports.getEmployeesByDepartment = function(department){
        var EmpDep = [];
        return new Promise(function(resolve,reject){
            for(let i = 0; i < employees.length; i++){
                if(employees[i].department == department){
                    EmpDep.push(employees[i]);
                }
            }
            if(EmpDep.length == 0){
                reject("No Result");
            }
        resolve(EmpDep);
        });
    }
    
    module.exports.getEmployeesByManager = function(manager) {
        var EmpMan = [];
    
        return new Promise(function(resolve,reject) {
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].employeeManagerNum == manager) {
                    EmpMan.push(employees[i]);
                }
            }
            if (EmpMan.length == 0 ) {
                reject("No Result");
            }
        resolve(EmpMan);
        });
    }
    
    module.exports.getEmployeeByNum = function(num) {
        return new Promise(function(resolve,reject){
            for(let j = 0; j < employees.length; j++){
                if(employees[j].employeeNum == num){
                    resolve(employees[j]);
                }
            }
        reject("No Result Returned!!!");
        });
    }
    
    module.exports.getManagers = function() {
        var Managers = [];
        return new Promise(function(resolve,reject){
            if(employees.length == 0){
                reject("No Result Returned!!!");
            }else{
                for (var q = 0; q < employees.length; q++) {
                     if (employees[q].isManager == true) {
                        Managers.push(employees[q]);       
                     }
                }
                if (Managers.length == 0) {
                         reject("No Result Returned!!!");
                 }
            }
            resolve(Managers);
         });
    }
    
    module.exports.getDepartments = function() {
        var Department = [];
        return new Promise(function(resolve,reject){
            if(employees.length == 0){
                reject("No Result Returned!!!");
            }else{
                for (var v = 0; v < departments.length; v++) {
                    Department.push(departments[v]);       
                }
                if (Department.length == 0) {
                    reject("No Result Return!!!");
                }
            }
        resolve(Department);
        });
    }

    module.exports.addEmployee = (employeeData) => {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        employeeData.employeeNum = ++empCount;
        return new Promise((resolve, reject) => {
            employees.push(employeeData);
            if (employees.length == 0) {
                reject();
            }
            resolve(employees);
        });
    }
    module.exports.updateEmployee = (employeeData) => {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        return new Promise((resolve, reject) => {
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].employeeNum == employeeData.employeeNum) {
                    employees.splice(employeeData.employeeNum - 1, 1, employeeData);
                }
            }
            if (employees.length == 0) {
                reject("No Result Returned!!!");
            }
            resolve(employees);
        });
    }