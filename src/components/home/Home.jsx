var React = require('react');
var NavBar = require('../navbar/NavBar.jsx');
var Footer = require('../Footer.jsx');
var FriendsGrid = require('./FriendsGrid.jsx');
var UserService = require('../../services/UserService.jsx');

var Chat = require('../chat/Chat.jsx');

var Home = React.createClass({



  getInitialState() {
    return {
      chat: null,
      user: this.props.user
    };
  },

  componentWillReceiveProps(nextProps) {
      this.setState({
        user: nextProps.user
      }); 
  },


  componentDidMount() {
      // this.getUser();
      
  },

  refreshState(stateProperty) {
    switch(stateProperty) {

      case 'user':
        this.getUser();

    }
  },

  getUser() {
      const self = this;
      UserService.get(localStorage.getItem('userId'), function(user) {
          self.setState({
            user: user
          });
      });
  },


  openChat(user) {

    if (this.state.chat) {
      alert("un seul chat à la fois !");
    }
    else {
      this.setState({
        chat: {target: user}
      });
      
    }




  },

  closeChat() {
    this.setState({
      chat: null
    });
  },

  render() {

    var chat = <div />;

    if (this.state.chat)
      chat = <Chat target={this.state.chat.target} closeChat={this.closeChat}/>

    return (
      <div>
         <FriendsGrid user={this.state.user} openChat={this.openChat} />
          {chat}
      </div>
    );
  }

});

module.exports = Home;
