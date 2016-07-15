var React = require('react');
var Auth = require('../auth.js');
var browserHistory = require('react-router').browserHistory;
var config = require('../../config.js');


var LoginBox = React.createClass({
  socket: null,
  getInitialState() {
    return {
      email: "",
      password: ""
    };
  },

  updateField(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  },

  login() {


    const self = this;
    // this.socket = io("http://minibook-express.herokuapp.com:8080");

    Auth.login(this.state.email, this.state.password, function() {


      self.props.refreshUser();
      browserHistory.push('/home');
    });

  },

  render() {
    return (
      <div className="row "> 
        <form className="col s4 offset-s4 hoverable">
          <div className="row">
            <div className="input-field col s12">
              <input id="email" name="email" type="text" className="validate" onChange={this.updateField}/>
              <label for="email">e-mail</label>
            </div>
            <div className="input-field col s12">
              <input id="password" type="password" name="password" className="validate" onChange={this.updateField}/>
              <label for="password">password</label>
            </div>
          </div>
          <div className="row">
            <a className="waves-effect waves-light btn col s12 green accent-4" onClick={this.login}>Connexion</a>
          </div>
        </form>
      </div>
    );
  }

});

module.exports = LoginBox;
