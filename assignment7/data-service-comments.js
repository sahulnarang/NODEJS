const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;
const commentSchema = new Schema({
    "authorName": String,
    "authorEmail": String,
    "subject": String,
    "commentText": String,
    "postedDate": Date,
    "replies": [{
        "comment_id": String,
        "authorName": String,
        "authorName": String,
        "commentText": String,
        "repliedDate": Date

    }]
});

let Comment; // to be defined on new connection 

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://san:san@ds141786.mlab.com:41786/web322_a6");

        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });
        db.once('open', () => {
            Comment = db.model("comments", commentSchema);
            resolve();
        });
    });
}

module.exports.addComment = function (data) {
    return new Promise((resolve, reject) => {
        data.postedDate = Date.now();
        
        var newComment = new Comment(data);


        newComment.save(function (err) {
            console.log(newComment._id);
            if (err)
                reject("There was an error saving the comment" + err);
            else
                resolve(this._id);
        });
    }); 
}

module.exports.getAllComments = function () {
    return new Promise((resolve, reject) => {
        Comment.find().sort({postedDate:1}).exec().then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log('There was an error: ${err}');
        });
    });
}


module.exports.addReply = (data) => {
    data.repliedDate = Date.now();
    return new Promise((resolve, reject) => {
        if (data._id == data.comment_id) {
            Comment.update({ _id: data.comment_id},
            { $addToSet: { replies: data}},{ multi: false }).exec();
            resolve(data);
        }
    }).catch((err) => {
        reject("Unable to Reply");
    });
};