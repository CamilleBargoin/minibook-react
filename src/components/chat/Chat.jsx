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
        messages.push(newMessage);
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
        clearInterval(this.refreshInterval);  
    },

    openChat(callback) {

        var self = this;

        ChatService.openChat(this.state.target._id, function(result) {
            if(result && result.discussion) {

                self.setState({
                    id: result.discussion._id,
                    messages: result.discussion.messages
                });

                callback();
            }
        });
    },

    startRefreshInterval() {

        var self = this;
        this.refreshInterval = setInterval(function() {
            ChatService.get(self.state.id, function(result) {
                if (result && result.discussion) {
                    self.setState({
                        messages: result.discussion.messages
                    });
                }
            });
        }, 3000);

    },

    render() {

        var messages = this.state.messages;
        var targetName = this.state.target.firstname + " " + this.state.target.lastname;

        return (
            <div style={{width: "250px", height: "360px", position: "fixed", bottom: 0, right: "20px", margin: 0, padding: 0}} className="grey lighten-5 hoverable">
                <div className="green" style={{width:"100%", height: "35px", margin: 0}}>
                    <div className="white-text left" style={{width: "80%", height: "35px", lineHeight: "35px", paddingLeft: "10px"}}>{targetName}</div>
                    <div onClick={this.onClose} className="waves-effect waves-light btn right green" style={{width: "34px", height: "34px", padding: 0}}><i className="material-icons small white-text">close</i></div>
                </div>
                
                <div  style={{width: "250px", height: "320px", margin: "0 auto", padding: 0}}>

                    <div id="chatBody" style={{display:"block", width: "100%", height: "260px", margin: 0, padding: 0, overflowX: "scroll"}}>
                        <Messages messages={this.state.messages} />
                    </div>
                    <div style={{display:"block", width: "100%", height: "40px"}}>
                        <form onSubmit={this.submitMessage}>
                            <div className="input-field" style={{borderTop: "2px solid #202020"}}>
                              <input type="text" placeholder="Ton message..." ref="messageInput" style={{paddingLeft: "10px"}}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = Chat;