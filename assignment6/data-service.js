const Sequelize = require('sequelize');
var sequelize = new Sequelize('d810qu0lv0l713', 'fsbqeaccxuhpfk', 'e37a8837cad07b1d7c4b04680e648b86436c1f88aeb6e45ad9886b670e6adf59', {
    host: 'ec2-54-221-205-186.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});


const Employee = sequelize.define('Employee', {
    employeeNum:{ type:Sequelize.INTEGER,
    
    primaryKey:true,
    autoIncrement:true
    },
    firstName:	Sequelize.STRING,
    last_name:	Sequelize.STRING,
    email:	Sequelize.STRING,
    SSN:	Sequelize.STRING,
    addressStreet:	Sequelize.STRING,
    addresCity:	Sequelize.STRING,
    addressState:	Sequelize.STRING,
    addressPostal:	Sequelize.STRING,
    maritalStatus:	Sequelize.STRING,
    isManager:	Sequelize.BOOLEAN,
    employeeManagerNum:	Sequelize.INTEGER,
    status:	Sequelize.STRING,
    department:	Sequelize.INTEGER,
    hireDate:	Sequelize.STRING
    },{
    createdAt : false,
    updatedAt: false
});


const Departments = sequelize.define('Department', {
    departmentId:{ type:Sequelize.INTEGER,
    
    primaryKey:true,
    autoIncrement:true
    },
    departmentName: Sequelize.STRING
    },{
    createdAt: false,
    updatedAt: false
});

var Project = sequelize.define('Project', {
    
    title: Sequelize.STRING,
    description: Sequelize.TEXT

});
/*
sequelize.sync().then(function () {
    
        // create a new "Project" and add it to the database
        Project.create({
            title: 'Project_1',
            description: 'First Project'
        }).then(function (project) {
            // you can now access the newly created Project via the variable project
            console.log("success!")
        }).catch(function (error) {
            console.log("something went wrong!");
        });
});
*/

module.exports.initialize = function(){
   
    return new Promise(( resolve, reject) => {
        sequelize.sync().then((Employee)=>{
            resolve();

        }).then((Departments)=>{
            resolve();
        }).catch((err)=>{
            reject("Unable to sync to database");
        });
        reject();
        
    });
}
    module.exports.getAllEmployees = function(){
        
        return new Promise(( resolve, reject)=>{
            sequelize.sync().then(()=>{
                resolve(Employee.findAll());
            }).catch((err)=>{
                reject("No results returned");
            });
          
        });
    }
    
   
module.exports.getEmployeesByStatus = function(status){
    
    return new Promise(function( resolve, reject){
        sequelize.sync().then(()=>{
            resolve(Employee.findAll({
                where:{
                    status: status
                }
            }))
        }).catch((err)=>{
            reject("No results are found");
        })
    });
}
    
    module.exports.getEmployeesByDepartment = function(department){
        
        return new Promise(function( resolve, reject){
            sequelize.sync().then(()=>{
                resolve(Employee.findAll({
                    where:{
                        department:department
                    }
                }));
            }).catch((err)=>{
                reject("No results found empbydept");
            });
        });
    }
    
    module.exports.getEmployeesByManager = function(manager) {
        
        return new Promise(function( resolve, reject){
           sequelize.sync().then(()=>{
               resolve(Employee.findAll({
                   where:{
                       employeeManagerNum: manager
                   }
               }));
           }).catch((err)=>{
               reject("No results found empbymnger");
           });
        });
    }
    
    module.exports.getEmployeeByNum = (num) => {
        return new Promise((resolve, reject) => {
            sequelize.sync().then(() => {
                resolve(Employee.findAll({
                    where:{
                        employeeNum: num
                    }
                }));
                }).catch((err) => {
                    reject("no results returned.");
            });
        });
    }
    
    module.exports.getManagers = function() {
       
         return new Promise(function( resolve, reject){
            sequelize.sync().then(()=>{
                resolve(Employee.findAll({
                    where:{
                        isManager:true
                    }
                }));
            }).then((err)=>{
                reject("No managers returned");
            })
         });
    }
    
    module.exports.getDepartments = function() {
        
        return new Promise(function( resolve, reject){
           sequelize.sync().then(()=>{
               resolve(Departments.findAll());
           }).catch((err)=>{
               reject("No departments returned");
           });
        });
    }
    module.exports.addEmployee = (employeeData) => {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        return new Promise((resolve, reject) => {
            sequelize.sync().then(() => {
                for (let x in employeeData) {
                    if(employeeData[x] == ""){
                        employeeData[x] = null;
                    }
                }
                resolve(Employee.create({
                    employeeNum: employeeData.employeeNum,
                    firstName: employeeData.firstName,
                    last_name: employeeData.last_name,
                    email: employeeData.email,
                    SSN: employeeData.SSN,
                    addressStreet: employeeData.addressStreet,
                    addresCity: employeeData.addresCity,
                    isManager: employeeData.isManager,
                    addressState: employeeData.addressState,
                    addressPostal: employeeData.addressPostal,
                    employeeManagerNum: employeeData.employeeManagerNum,
                    status: employeeData.status,
                    department: employeeData.department,
                    hireDate: employeeData.hireDate}));
                }).catch(() => {
                    reject("unable to create employee.");
                });
            }).catch(() => {
                reject("unable to create employee.");
        });
    
    
    }


    module.exports.addDepartment = (departmentData) => {
        return new Promise((resolve, reject) => {
            sequelize.sync().then(() => {
                for(let x in departmentData){
                    if(departmentData[x] == "") {
                        departmentData[x] = null;
                    }
                }
                Departments.create({
                    departmentId: departmentData.departmentId,
                    departmentName: departmentData.departmentName
                }).then(() => {
                    resolve(Departments);
                }).catch((err) => {
                    reject("unable to create department.");
                });
            }).catch(() => {
                reject("unable to create department.");
            });
        });
    }


    module.exports.updateEmployee = (employeeData) => {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        return new Promise((resolve, reject) => {
            sequelize.sync().then(() => {
                for (let x in employeeData) {
                    if(employeeData[x] == ""){
                        employeeData[x] = null;
                    }
                }
                resolve(Employee.update({
                    firstName: employeeData.firstName,
                    last_name: employeeData.last_name,
                    email: employeeData.email,
                    addressStreet: employeeData.addressStreet,
                    addresCity: employeeData.addresCity,
                    addressPostal: employeeData.addressPostal,
                    addressState: employeeData.addressPostal,
                    isManager: employeeData.isManager,
                    employeeManagerNum: employeeData.employeeManagerNum,
                    status: employeeData.status,
                    department: employeeData.department
                }, { where: {
                    employeeNum: employeeData.employeeNum
                }}));
            }).catch(() => {
                reject("unable to create employee.");
            });
        });
    
    }


    module.exports.updateDepartment = (departmentData) => {
        return new Promise((resolve, reject) => {
            sequelize.sync().then(() => {
                for(let x in departmentData){
                    if(departmentData[x] == "") {
                        departmentData[x] = null;
                    }
                }
                Departments.update({
                    departmentName: departmentData.departmentName
                }, { where: {
                    departmentId: departmentData.departmentId
                }}).then(() =>{
                    resolve(Departments);
                }).catch((err) => {
                    reject("unable to create department.");
                });
            }).catch(() => {
                reject("unable to create department.");
            });
        });
    }


    module.exports.getDepartmentById = (id) => {
        return new Promise((resolve, reject) => {
            sequelize.sync().then(() => {
                resolve(Departments.findAll({
                    where:{
                        departmentId: id
                    }}));
            }).catch((err) => {
                reject("unable to find department");
            });
        });
    }    

   module.exports.deleteEmployeeByNum = (empNum) =>{
return new Promise((resolve,reject)=>{
    sequelize.sync().then(()=>{
        resolve(Employee.destroy({
            where:{
                employeeNum:empNum

            }}));
        }).catch((err)=>{
            reject("Unable to Delete Employee");
        });
        });
    }

