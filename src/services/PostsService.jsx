
// var $ = require('jquery');
var config = require('../../config.js');


var PostsService = {

    getByUserId: function(userId, callback) {

        $.ajax({
            type: 'GET',
            url: config[process.env.NODE_ENV].api + '/posts/user/' + userId,
            data: {sessionId: localStorage.getItem("sessionId")},
            success: function(data, status, jqXHR) {

             if (data.error) {
                console.log(data.error);
                Materialize.toast(data.error, 3000, 'toastError');
             }
             else {                    
                callback(data);
             }
            },
            error: function(jqXHR, status, error) {
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }
        }); 
    },


    create: function(newPost, target, callback) {

        var payload = {
            post: newPost,
            sessionId: localStorage.getItem("sessionId"),
            target: target
        };

        
        $.ajax({
            type: 'POST',
            url: config[process.env.NODE_ENV].api + '/posts/create',
            // post payload:
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json",
            success: function(data, status, jqXHR) {


             if (data.error) {
                console.log(data.error);
                Materialize.toast(data.error, 3000, 'toastError');
             }
             else {                    
                callback();
             }
            },
            error: function(jqXHR, status, error) {
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }
        }); 
    },

    addComment: function(newComment, postId, callback) {


        var payload = {
            comment: newComment,
            sessionId: localStorage.getItem("sessionId"),
            postId: postId
        };

        $.ajax({
            type: 'POST',
            url: config[process.env.NODE_ENV].api + '/posts/addComment',
            // post payload:
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json",
            success: function(data, status, jqXHR) {

             if (data.error) {
                console.log(data.error);
                Materialize.toast(data.error, 3000, 'toastError');
             }
             else {                    
                callback();
             }
            },
            error: function(jqXHR, status, error) {
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }

        }); 


    }



};




module.exports = PostsService;