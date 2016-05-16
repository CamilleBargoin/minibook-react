var React = require('react');

var browserHistory = require('react-router').browserHistory;

var LoginBox = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  login() {

    browserHistory.push('/home');
  },

  render() {
    return (
      <div className="row "> 
        <form className="col s4 offset-s4 hoverable">
          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="text" className="validate" />
              <label for="email">e-mail</label>
            </div>
            <div className="input-field col s12">
              <input id="password" type="text" className="validate" />
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
