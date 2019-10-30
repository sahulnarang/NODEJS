const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;
const userSchema = new Schema({
    "user": { type: String, unique: true },
    "password": String
});


let User; // to be defined on new connection (see initialize)


module.exports.initialize = function () {
   /* return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://sang:sang@ds149144.mlab.com:49144/web322a7");

        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            User = db.model("users", userSchema);
            resolve();
        });
    });*/

    return new Promise((resolve, reject) => {
        let db = mongoose.createConnection("mongodb://sang:sang@ds149144.mlab.com:49144/web322a7");
        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            User = db.model("users", userSchema);
            resolve("Secess initialize MongoDB");
        });
    });
}


module.exports.registerUser = function (userData) {
    //const username = req.body.username;
    //const password = req.body.password;
    /*
        let newUser = new User(userData);
        newUser.save(function (err) {
            if (this.User == userData.User) {
                reject(res.status(11000)+ "User Name already taken");
               if (res.status(err) != 11000)
               {
                   reject("There was an error saving User "+ err);
               }
               
            }
            else 
            resolve();
        })*/


        return new Promise((resolve, reject) => {
            if (userData.password != userData.password2) {
                reject("Passwords do not match.");
            } else {
            let newUser = new User(userData);
            newUser.save((err) => {
                console.log("===   Object is saving in the database.  ===");
                console.log("============================================");
                console.log(userData);
                console.log("============================================");
                console.log("This is User object id from userSchema: " + newUser._id);
                resolve();
            }).catch((err) => {
                if (err) {
                    if (err.code == 11000) {
                        reject("User Name already taken");
                    } else {
                        reject("There was an error creating the user: ${user}");
                    }
                }
                // reject("There was an error creating the user222222");
            });
        }});
    
}


module.exports.checkUser = function (userData){
    /*return new Promise (function(resolve, reject){
        User.find({user:userData.user});
        if(user.length == 0)
        reject('Unable to find user: ' + user);

        else {
            if(user[0].password==user.password)
            reject('Incorrect Password for user: ' + user);
            else
            resolve();
        }
    })*/


    return new Promise((resolve, reject) => {
        User.find({user: userData.user}).exec().then((user) => {
        console.log("Sucess!!!!!!" + user);
        if (user == null) {
            reject('Unable to find user: ' + userData.user);
        } else if (user[0].password != userData.password) {
            reject('Incorrect Password for user: ' + user[0].user);
        }
        resolve();
        }).catch((err) => {
            console.log("There is Error");
            reject("Unable to find user: " + userData.user);
        });
    });
}

