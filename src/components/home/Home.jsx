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
         {/*<NavBar openChat={this.openChat} search="true" user={this.state.user} refresh={this.refreshState}/>*/}
         <FriendsGrid user={this.state.user} />
            {chat}

          {/*<Footer />*/}
      </div>
    );
  }

});

module.exports = Home;
