var React = require('react');
var FriendBox = require('../FriendBox.jsx');
var UserService = require('../../services/UserService.jsx');


var FriendBoxContainer = React.createClass({

  getInitialState() {
    return {
      friends: []
    };
  },

  componentDidMount() {
      $('.friendBox.tooltipped').tooltip({delay: 50});    


      const self = this;

      // UserService.getFriends(localStorage.getItem('userId'), function(user) {

      //   console.log(user);
      //   console.log("_____");
      //   self.setState({
      //     friends: user.friends
      //   });
      // });

  },

  render() {


    var friendBoxes = this.state.friends.map(function(friend, i) {
      return (
         <FriendBox name={friend.firstname + " " + friend.lastname} key={i} color={"#FFC952"} />
      );
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
