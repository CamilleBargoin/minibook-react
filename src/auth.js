
var $ = require("jquery");

var config = require('../config.js');

var AuthService = {


  loggedIn: function(callback) {

    if (Storage) {
        $.ajax({
          method: "GET",
            url: config[process.env.NODE_ENV].api + '/users/secure',
            data: {sessionId: localStorage.getItem("sessionId")},
            success: function(data, status) {
              console.log("loggedIn success");
              console.log(data);
              callback();

            },
            error: function(jqXHR, status, error) {
              console.log("loggedIn error");
              Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
            }

        });
      }
    },
     


    login: function(email, password, callback) {

      if (Storage) {
        console.log(config[process.env.NODE_ENV].api);
        $.ajax({
            type: 'POST',
            url: config[process.env.NODE_ENV].api + '/users/login',
            // post payload:
            data: JSON.stringify({email: email, password: password}),
            dataType: 'json',
            contentType: "application/json",
            success: function(data, status, jqXHR) {


             if (data.error) {
                console.log(data.error);
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
    }
};



module.exports = AuthService;