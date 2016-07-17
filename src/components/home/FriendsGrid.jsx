var React = require('react');
var FriendBox = require('../FriendBox.jsx');
var UserService = require('../../services/UserService.jsx');
var config = require('../../../config.js');


var FriendGrid = React.createClass({

  socket: null,

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

  componentDidMount() {
    
  },

  componentWillUnmount() {
      // this.socket.off('user login');
      // this.socket.off('user logout');
      // this.socket.off('new friend');
  },

  componentWillReceiveProps(nextProps) {

      if (nextProps.user && nextProps.user._id) {

        this.setState({
          friendships: nextProps.user.friends || []
        }, function() {


          // this.socket = io("http://localhost:1337");
          // 
          console.log(config[process.env.NODE_ENV].websocket + ":" + localStorage.getItem('serverPort'));
          this.socket = io.connect(config[process.env.NODE_ENV].websocket + ":" + localStorage.getItem('serverPort'));
          
          this.socket.emit('room', nextProps.user._id);

          this.socket.on('user login', this.updateFriendOnlineStatus);
          this.socket.on('user logout', this.updateFriendOnlineStatus);
          this.socket.on('new friend', this.updateFriendList);      

          
        });  


        
      }
  },

  componentDidUpdate() {
      $('.friendBox.tooltipped').tooltip({delay: 50});    
  },

  updateFriendOnlineStatus(data) {

      var friendships = this.state.friendships;

      var updatedFriendships = friendships.map(function(friendship, index) {
        if (friendship.user._id == data._id)
            friendship.user.online = data.online;

          return friendship;
      });

      this.setState({
        friendships:updatedFriendships
      });

  },

  updateFriendList(data) {
    console.log(data);
      this.setState({
        friendships: data.friends
      });
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

module.exports = FriendGrid;
