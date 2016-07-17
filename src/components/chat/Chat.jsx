var React = require('react');
var ChatService = require('../../services/ChatService.jsx');
var Messages = require('./Messages.jsx');


var Chat = React.createClass({

    getInitialState() {
        return {
            id: null,
            messages: [],
            target: this.props.target  
        };
    },

    refreshInterval: null,

    onClose() {
        this.props.closeChat();
    },

    submitMessage(e) {
        e.preventDefault();


        var newMessage = {
            created_by: localStorage.getItem("userId"),
            created_at: new Date().getTime(),
            body: this.refs.messageInput.value
        };

        var messages = this.state.messages;
        messages.push({
            created_by: {_id: localStorage.getItem("userId")},
            created_at: new Date().getTime(),
            body: this.refs.messageInput.value
        });
        this.setState({
            messages: messages
        });

        var self = this;
        ChatService.create(this.state.id, newMessage, function(result) {

            self.refs.messageInput.value = "";
        });


    },

    componentDidMount() {
        var self = this;

        this.openChat(function() {
            self.startRefreshInterval();
        });

    },

    componentWillUnmount() {
        clearTimeout(this.refreshInterval)
    },

    openChat(callback) {

        var self = this;

        ChatService.openChat(this.state.target._id, function(result) {
            if(result && result.discussion) {

                self.setState({
                    id: result.discussion._id
                });

                callback();
            }
        });
    },

    startRefreshInterval() {

        var self = this;
        var timer;

        this.refreshInterval = setTimeout(delay, 0);
        function delay() {
          ChatService.get(self.state.id, function(result) {
                if (result && result.discussion) {

                    self.setState({
                        messages: result.discussion.messages
                    });
                }
            });
          self.refreshInterval = setTimeout(delay, 3000);
        }
    },

    render() {

        var messages = this.state.messages;
        var targetName = this.state.target.firstname + " " + this.state.target.lastname;

        return (
            <div id="chatContainer" className="grey lighten-5 hoverable">
                <div className="chatTop green accent-4" >
                    <div className="white-text left username">{targetName}</div>
                    <div onClick={this.onClose} className="closeButton waves-effect waves-light btn right light-blue darken-3"><i className="material-icons small white-text">close</i></div>
                </div>
                
                <div className="chatBody" style={{}}>

                    <div className="messagesListContainer" >
                        <Messages messages={this.state.messages} />
                    </div>
                    <div className="chatBottom" style={{}}>
                        <form id= "chatInputForm" onSubmit={this.submitMessage}>
                            <div className="input-field" >
                              <input type="text" placeholder="Ton message..." ref="messageInput"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = Chat;