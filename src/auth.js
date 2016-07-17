
var $ = require("jquery");

var config = require('../config.js');

var AuthService = {


  loggedIn: function(success, error) {

    if (Storage) {
        $.ajax({
          method: "GET",
            url: config[process.env.NODE_ENV].api + '/users/secure',
            data: {sessionId: localStorage.getItem("sessionId")},
            success: function(data, status) {

              if (data.success) {
                // console.log("loggedIn success");
                console.log(data);
                success(data);
                }
              else {
                console.log(data);
                error(data);
              }
            },
            error: function(jqXHR, status, error) {
              // console.log("loggedIn error");
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
              error();
            }

        });
      }
    },

    loggedInAdmin: function(success, error) {

      if (Storage) {
        $.ajax({
          method: "GET",
            url: config[process.env.NODE_ENV].api + '/users/secureAdmin',
            data: {sessionId: localStorage.getItem("sessionId")},
            success: function(data, status) {

              if (data.success) {
                // console.log("loggedIn success");
                // console.log(data);
                success();
                }
              else {
                // console.log(data);
                error();
              }
            },
            error: function(jqXHR, status, error) {
              // console.log("loggedIn error");
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
              error();
            }

        });
      }
    },
     


    login: function(email, password, callback) {

      if (Storage) {
        // console.log(config[process.env.NODE_ENV].api);
        $.ajax({
            type: 'POST',
            url: config[process.env.NODE_ENV].api + '/users/login',
            // post payload:
            data: JSON.stringify({email: email, password: password}),
            dataType: 'json',
            contentType: "application/json",
            success: function(data, status, jqXHR) {


             if (data.error) {
                // console.log(data.error);
                Materialize.toast(data.error, 3000, 'toastError');
             }
             else {

                  Materialize.toast("Loggé avec succès", 2000, 'toastSuccess', function() {
                    
                    localStorage.setItem('sessionId', data.sessionId);
                    localStorage.setItem('userId', data.userId);
                    callback();
                  });
             }
            },
            error: function(jqXHR, status, error) {
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }

        }); 

      }
    },

    logout: function(callback) {

      // console.log("LOGOUT");

      if (Storage) {
        $.ajax({
          method: "GET",
            url: config[process.env.NODE_ENV].api + '/users/logout',
            data: {sessionId: localStorage.getItem("sessionId")},
            success: function(data, status) {
              // console.log("logout success");

              if (data.success) {
                localStorage.setItem("sessionId", "");
                callback();
              }
            
            },
            error: function(jqXHR, status, error) {
              // console.log("logout error");
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }

        });
      }
    }
};



module.exports = AuthService;