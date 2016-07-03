var config = require('../../config.js');


var UserService = {

    get: function(userId, callback) {


        $.ajax({
            method: "GET",
              url: config[process.env.NODE_ENV].api + '/users/' + userId,
              data: {sessionId: localStorage.getItem("sessionId")},
              success: function(data, status) {

                if (callback)
                    callback(data);
              },
              error: function(jqXHR, status, error) {
                console.log("find user by id error");
                Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
              }
        });
    },

    getFriends: function(userId, callback) {

        var payload = {
          userId: userId, 
          sessionId: localStorage.getItem('sessionId')
        };

        $.ajax({
            type: 'POST',
            url: config[process.env.NODE_ENV].api + '/users/friends',
            // post payload:
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json",
            success: function(data, status, jqXHR) {


                if (data.error) {
                    Materialize.toast(data.error, 3000, 'toastError');
                }
                else {
                    if (callback)
                        callback(data);
                }
            },
            error: function(jqXHR, status, error) {
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }

        }); 


    },

    update: function(userId, fields, callback) {

        var payload = {
          userId: userId, 
          sessionId: localStorage.getItem('sessionId'),
          updatedFields: fields
        };

        $.ajax({
            type: 'POST',
            url: config[process.env.NODE_ENV].api + '/users/update',
            // post payload:
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json",
            success: function(data, status, jqXHR) {


                if (data.error) {
                    Materialize.toast(data.error, 3000, 'toastError');
                }
                else {
                    if (callback)
                        callback();
                }
            },
            error: function(jqXHR, status, error) {
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }

        }); 

    },

    search: function(string, callback) {
        const payload = {
            string: string,
            sessionId: localStorage.getItem('sessionId')
        }

        $.ajax({
            type: 'POST',
            url: config[process.env.NODE_ENV].api + '/users/search',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json",
            success: function(data, status, jqXHR) {

                if (data.error) {
                    Materialize.toast(data.error, 3000, 'toastError');
                }
                else {
                    if (callback)
                        callback(data);
                }
            },
            error: function(jqXHR, status, error) {
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }

        }); 
    },

    sendInvite: function(user, callback) {


        var payload = {
            sessionId: localStorage.getItem('sessionId'),
            userId: user._id
        };

        $.ajax({
            type: "POST",
            url: config[process.env.NODE_ENV].api + '/users/invite',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json",
            success: function(data, status, jqXHR) {

                if (data.error) {
                    Materialize.toast(data.error, 3000, 'toastError');
                }
                else {
                    if (callback)
                        callback(data);
                }
            },
            error: function(jqXHR, status, error) {
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }
        });
    },

    getRequests: function(callback) {


        var payload = {
            sessionId: localStorage.getItem('sessionId')
        };

        $.ajax({
            type: "POST",
            url: config[process.env.NODE_ENV].api + '/users/requests',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json",
            success: function(data, status, jqXHR) {
                if (data.error) {
                    Materialize.toast(data.error, 3000, 'toastError');
                }
                else {
                    if (callback)
                        callback(data);
                }
            },
            error: function(jqXHR, status, error) {
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }
        })


    },

    befriend: function(newFriendId, callback) {

        var payload = {
            sessionId: localStorage.getItem('sessionId'),
            friendId: newFriendId
        };

        $.ajax({
            type: "POST",
            url: config[process.env.NODE_ENV].api + '/users/befriend',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json",
            success: function(data, status, jqXHR) {
                if (data.error) {
                    Materialize.toast(data.error, 3000, 'toastError');
                }
                else {

                    if (callback)
                        callback(data);
                }
            },
            error: function(jqXHR, status, error) {
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }
        });

    },

    deleteRequest: function(requestId, callback) {

        var payload = {
            sessionId: localStorage.getItem('sessionId'),
            requestId: requestId
        };


        $.ajax({
            type: "POST",
            url: config[process.env.NODE_ENV].api + '/users/deleteRequest',
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: "application/json",
            success: function(data, status, jqXHR) {
                if (data.error) {
                    Materialize.toast(data.error, 3000, 'toastError');
                }
                else {

                    if (callback)
                        callback(data);
                }
            },
            error: function(jqXHR, status, error) {
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }
        });
    },

};


module.exports = UserService;