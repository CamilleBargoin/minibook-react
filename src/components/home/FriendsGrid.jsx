var React = require('react');
var FriendBox = require('../FriendBox.jsx');
var UserService = require('../../services/UserService.jsx');


var FriendBoxContainer = React.createClass({

  getInitialState() {
    if (this.props.user) {
        return {
          friendships: this.props.user.friends || []
        };
    }

    return {
      friendships: []
    }
  },

  componentWillReceiveProps(nextProps) {
      this.setState({
        friendships: nextProps.user.friends || []
      });  
  },

  componentDidUpdate() {
      $('.friendBox.tooltipped').tooltip({delay: 50});    
  },

  render() {



    var friendBoxes = this.state.friendships.map(function(friendship, i) {
      if (friendship.status == "accepted") {
        return (
           <FriendBox friendship={friendship} key={i} />
        );
      }
    });

    var width = Math.floor($(document).width() / 164) * 164 + "px";

    return (
      <div style={{textAlign: "center"}}>
        <div style={{display: "flex", flexWrap: "wrap", width: width, margin: "0 auto"}} >
           {friendBoxes}
        </div>
      </div>
    );
  }
});

module.exports = FriendBoxContainer;
