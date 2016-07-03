var React = require('react');
var Auth = require('../auth.js');


var Logout = React.createClass({

  getInitialState() {
    return {
      loggedOut: false
    };
  },

  componentWillMount() {

      const self = this;

      Auth.logout(function() {
        self.setState({
          loggedOut: true
        });
      });

  },

  render() {

    console.log("render");

    const message = (this.state.loggedOut) ? "A bientôt !" : "Déconnexion en cours...";

    return (   
        <div className="">
          <p style={{color: "white"}}>{message}</p>
        </div>
    );
  }

});

module.exports = Logout;