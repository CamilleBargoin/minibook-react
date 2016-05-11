var React = require('react');
var NavBar = require('./NavBar.jsx');
var FriendBoxContainer = require('./FriendBoxContainer.jsx');


var Home = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {
    return (
      <div>
         <NavBar />
         <FriendBoxContainer />

      </div>
    );
  }

});

module.exports = Home;
