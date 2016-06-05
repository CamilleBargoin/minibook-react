
var $ = require("jquery");

var AuthService = {


  loggedIn: function() {
    // return true;

     $.ajax({
      method: "GET",
        url: 'http://localhost:3000/users/secure',
        data: {sessionId: localStorage.getItem("sessionId")},
        success: function(data, status) {


         console.log(data);
        },
        error: function(jqXHR, status, error) {
          Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
        }

    }); 


  },

  login(email, password, callback) {


  	// CALL API SERVER

  	// callback:
  	let jwt = 123456789; // id_token

  	// LoginActions.loginUser(jwt);
    

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/users/login',
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
                callback();
              });
         }
        },
        error: function(jqXHR, status, error) {
          Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
        }

    }); 

  	


  }

};


module.exports = AuthService;