const React = require('react');
const NavBar = require('../navbar/NavBar.jsx');
const MessageList = require('./MessageList.jsx');
const MessageForm = require("./MessageForm.jsx");
const Pagination = require('../Pagination.jsx');
const MessageService = require('../../services/MessageService.jsx');


var Inbox = React.createClass({

  getInitialState() {
    return {
      user: this.props.user,
      messages: [],
      showForm: false
    };
  },

  componentWillReceiveProps(nextProps) {
      this.setState({
        user: nextProps.user
      });
  },

  componentDidMount() {
      this.fetchMessages();  
  },

  fetchMessages() {

      const self = this;
      MessageService.getInbox(function(inbox) {
          if (inbox) {

            console.log(inbox);
            self.setState({
              messages: inbox.messages
            });
          }
      });
  },

  displayMessageForm() {

    var displayToggle = this.state.showForm;

    this.setState({
      showForm: !displayToggle
    });

  },

  

  render() {


    let displayedComponent = <div />;
    let messages = this.state.messages;
    let buttonLabel;

    if (this.state.showForm) {
      buttonLabel = "Annuler";

      displayedComponent = <MessageForm users={this.state.user.friends}/>;
    }
    else {
      buttonLabel = "Nouveau";

      // if (messages.length ==0) {
      //   messages = [
      //     {author: "ZLatan", body: "I'm looking for a new team, call me!", object: "The Legend", date: 1460887462},
      //     {author: "Jack Bauer", body: "Sir, you have to save the President !", object: "2 hours left...", date: 1433412262 },
      //     {author: "Mickael Jackson", body: "Aouh !", object: "Black or White ?", date: 1424257462 }
      //   ];




      // }

        displayedComponent =  <MessageList messages={messages} />;
    }


    return (
      <div>
        <div className="container">
          <div className="row" style={{marginTop: "50px"}}>
            <div className="col s2 offset-s10" >
              <a className="waves-effect waves-light btn green accent-4" onClick={this.displayMessageForm}><i className="material-icons left">mode_edit</i>{buttonLabel}</a>
            </div>
          </div>
          {displayedComponent}
          {/*<Pagination />*/}
        </div>
      </div>
    );
  }

});

module.exports = Inbox;
