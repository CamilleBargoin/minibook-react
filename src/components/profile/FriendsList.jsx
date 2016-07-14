var React = require('react');
var FriendsListItem = require('./FriendsListItem.jsx');

var FriendsList = React.createClass({

  getInitialState() {
    return {
    
    };
  },


  render() {

    const friendsListItem = this.props.friends.map(function(friendship, index) {
      if( friendship.status == "accepted") {
        return <FriendsListItem user={friendship.user} key={index}/>
      }
    });


    return (
      <div id="friendsList" className="container" >  
        <ul className="collection hoverable">
          {friendsListItem}
        </ul>
      </div>
    );
  }

});

module.exports = FriendsList;