var config = require('../../config.js');


var UserService = {

    get: function(userId, callback) {

        const payload = {
            sessionId: localStorage.getItem("sessionId")
        };

        this.getHTTPRequest(config[process.env.NODE_ENV].api + '/users/' + userId, payload, callback);
    },

    getAll: function(callback) {

        const payload = {
          sessionId: localStorage.getItem('sessionId')
        };

        this.postHTTPRequest(config[process.env.NODE_ENV].api + '/users/all', payload, callback);
    },

    getFriends: function(userId, callback) {

        const payload = {
          userId: userId, 
          sessionId: localStorage.getItem('sessionId')
        };

        this.postHTTPRequest(config[process.env.NODE_ENV].api + '/users/friends', payload, callback);
    },

    update: function(userId, fields, callback) {

        const payload = {
          userId: userId, 
          sessionId: localStorage.getItem('sessionId'),
          updatedFields: fields
        };

        this.postHTTPRequest(config[process.env.NODE_ENV].api + '/users/update', payload, callback);
    },


    search: function(string, callback) {

        const payload = {
            string: string,
            sessionId: localStorage.getItem('sessionId')
        }

        this.postHTTPRequest(config[process.env.NODE_ENV].api + '/users/search', payload, callback);
    },

    sendInvite: function(user, callback) {


        const payload = {
            sessionId: localStorage.getItem('sessionId'),
            userId: user._id
        };

        this.postHTTPRequest(config[process.env.NODE_ENV].api + '/users/invite', payload, callback);
    },

    befriend: function(newFriendId, callback) {

        const payload = {
            sessionId: localStorage.getItem('sessionId'),
            friendId: newFriendId
        };

        this.postHTTPRequest(config[process.env.NODE_ENV].api + '/users/befriend', payload, callback);
    },

    postHTTPRequest: function(url, payload, callback) {

        $.ajax({
            type: 'POST',
            url: url,
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

    getHTTPRequest: function(url, payload, callback) {


        $.ajax({
            method: "GET",
              url: url,
              data: payload,
              success: function(data, status) {

                if (data.error) {
                    Materialize.toast(data.error, 3000, 'toastError');
                }
                else {
                    if (callback)
                        callback(data);
                }
              },
              error: function(jqXHR, status, error) {
                console.log("find user by id error");
                Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
              }
        });


    }
};


module.exports = UserService;