var React = require('react');
var FriendsListItem = require('./FriendsListItem.jsx');

var FriendsList = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {
    return (
      <div id="friendsList" className="container" >  
        <ul className="collection hoverable">
          <FriendsListItem name="Chuck Norris" />
          <FriendsListItem name="Jean-CLaude VanDamme" />
          <FriendsListItem name="Steven Seagal" />
          <FriendsListItem name="Kurt Russel" />
        </ul>
      </div>
    );
  }

});

module.exports = FriendsList;