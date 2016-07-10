var React = require('react');
var NavLink = require('./NavLink.jsx');
var IndexLink  =require('react-router').IndexLink;
var NavBar = require('./navbar/NavBar.jsx');
var UserService = require('../services/UserService.jsx');

var App = React.createClass({

  getInitialState() {
    return {
      user: {}
    };
  },

  componentDidMount() {
        
    this.getUser();
  },

  getUser() {

    console.log("GET USER");

      const self = this;
      UserService.get(localStorage.getItem('userId'), function(user) {
          self.setState({
            user: user
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
