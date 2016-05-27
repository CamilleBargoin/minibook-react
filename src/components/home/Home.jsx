var React = require('react');
var NavBar = require('../NavBar.jsx');
var Footer = require('../Footer.jsx');
var FriendsGrid = require('./FriendsGrid.jsx');
var FindUser = require('./FindUser.jsx');

var Chat = require('../chat/Chat.jsx');

var Home = React.createClass({

  getInitialState() {
    return {
      chat: null
    };
  },


  openChat() {
    this.setState({
      chat: true
    });
  },

  closeChat() {
    this.setState({
      chat: null
    });
  },

  render() {

    var chat;

    if (this.state.chat)
      chat = <Chat name="Chuck Norris" closeChat={this.closeChat}/>;
    else
      chat = <div></div>;


    return (
      <div>
         <NavBar openChat={this.openChat} search="true"/>
         {/*<FindUser />*/}
         <FriendsGrid />
            {chat}

          {/*<Footer />*/}
      </div>
    );
  }

});

module.exports = Home;
