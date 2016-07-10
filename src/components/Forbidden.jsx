var React = require('react');
var Auth = require('../auth.js');
var browserHistory = require('react-router').browserHistory;


var Logout = React.createClass({

  getInitialState() {
    return {};
  },

  componentWillMount() {

  },

  goHome() {
    browserHistory.push('/home');
  },

  
  render() {


    return (   
      <div className="container">
        <div className="row" style={{paddingTop: "15%"}}>
          <div className="col s12">
            <p style={{color: "white"}}>Désolé, Vous n'avez pas accès à cette partie du site :'(</p>
          </div>
          <div className="col s1">
            <a className="waves-effect waves-light btn col s12 green accent-4" onClick={this.goHome}>Accueil</a>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Logout;