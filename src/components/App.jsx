var React = require('react');
var NavLink = require('./NavLink.jsx');
var IndexLink  =require('react-router').IndexLink;
var NavBar = require('./navbar/NavBar.jsx');
var UserService = require('../services/UserService.jsx');
var Auth = require("../auth.js");

var App = React.createClass({

  getInitialState() {
    return {
      user: null
    };
  },

  componentDidMount() {
        
    this.getUser();
  },

  getUser() {
    const self = this;

    Auth.loggedIn(function(data) {
      UserService.get(localStorage.getItem('userId'), function(user) {
          self.setState({
            user: user
          });
      });
      
    }, function(data) {
      self.setState({
        user: null
      });
    });
  },

  destroyUser() {
    this.setState({
      user: {}
    });
  },
  
  render() {

    return (
      <div style={{height:"100%"}}>
        <NavBar user={this.state.user}/>

        {React.cloneElement(this.props.children, {user: this.state.user, refreshUser: this.getUser, destroyUser: this.destroyUser})}
        
      </div>
    );
  }

});

module.exports = App;
