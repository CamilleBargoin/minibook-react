var React = require('react');
var browserHistory = require('react-router').browserHistory;
var config = require('../../config.js');
var Auth = require('../auth.js');


var RegisterBox = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  register(e) {

    e.preventDefault();

    var newUser = {
      firstname: this.refs['firstname'].value,
      lastname: this.refs['lastname'].value,
      email: this.refs['email'].value,
      password: this.refs['password'].value
    };
    
    console.log(newUser);



    $.ajax({
        type: 'POST',
        url: config[process.env.NODE_ENV].api + '/users/register',
        // post payload:
        data: JSON.stringify(newUser),
        dataType: 'json',
        contentType: "application/json",
        success: function(data, status) {


         if (data.error) {
            console.log(data.error);
            Materialize.toast(data.error, 3000, 'toastError');
         }
         else {

            Materialize.toast("Ton compte vient d'être créé!", 2000, 'toastSuccess', function() {
              //req.session.test = "ceciestuntest";
              Auth.login(newUser.email, newUser.password, function() {
                browserHistory.push('/home');
              });
            });
         }
        },
        error: function(jqXHR, status, error) {
          Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
        }

    });

  },

  render() {
    return (
      <div className="row "> 
        <form className="col s4 offset-s4 hoverable">
          <div className="row">
           <div className="input-field col s6">
              <input id="first_name" type="text" className="validate" ref="firstname" />
              <label for="first_name">prénom</label>
            </div>
             <div className="input-field col s6">
              <input id="last_name" type="text" className="validate" ref="lastname"/>
              <label for="last_name">nom de famille</label>
            </div>
            <div className="input-field col s12">
              <input id="email" type="email" className="validate" ref="email"/>
              <label for="email">e-mail</label>
            </div>
            <div className="input-field col s12">
              <input id="password" type="password" className="validate" ref="password"/>
              <label for="password">password</label>
            </div>
            <div className="input-field col s12">
              <input id="password" type="password" className="validate" ref="password-conf"/>
              <label for="password">confirmation du password</label>
            </div>
          </div>
          <div className="row">
            <a className="waves-effect waves-light btn col s12 green accent-4" onClick={this.register}>Inscription</a>
          </div>
        </form>
      </div>
    );
  }

});

module.exports = RegisterBox;
