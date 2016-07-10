var React = require('react');
var Auth = require('../auth.js');
var browserHistory = require('react-router').browserHistory;


var Logout = React.createClass({

  getInitialState() {
    return {
      loggedOut: false
    };
  },

  componentWillMount() {

      const self = this;

      Auth.logout(function() {
        self.props.destroyUser();
        self.setState({
          loggedOut: true
        });
      });
  },

  componentDidMount() {
      setTimeout(function() {
        browserHistory.push('/');
      },2000);  
  },

  render() {

    console.log("render");

    const message = (this.state.loggedOut) ? "A bientôt !" : "Déconnexion en cours...";

    return ( 
        <div className="container">
          <div className="row" style={{paddingTop: "15%"}}>
            <div className="col s12">
              <p style={{color: "white"}}>{message}</p>
            </div>
          </div>
        </div>
    );
  }

});

module.exports = Logout;