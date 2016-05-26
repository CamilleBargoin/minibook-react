var React = require('react');
var Messages = require('./Messages.jsx');


var Chat = React.createClass({

    getInitialState() {
        return {
            messages: []  
        };
    },

    onClose() {
        this.props.closeChat(this.props.name);
    },

    submitMessage(e) {
        e.preventDefault();
        var messages = this.state.messages;
        messages.push({author:"me", text: this.refs.messageInput.value});
        this.setState({messages: messages});
        this.refs.messageInput.value = "";
    },

    componentDidMount() {
        
        var self = this;
        setTimeout(function() {
            var messages = self.state.messages;
            messages.push({author:"Chuck", text: "HAHAHAHA"});
            self.setState({messages: messages});
        }, 5000);  
    },

    render() {

        var messages = this.state.messages;

        return (
            <div style={{width: "250px", height: "360px", position: "fixed", bottom: 0, right: "20px", margin: 0, padding: 0}} className="grey lighten-5 hoverable">
                <div className="green" style={{width:"100%", height: "35px", margin: 0}}>
                    <div className="white-text left" style={{width: "80%", height: "35px", lineHeight: "35px", paddingLeft: "10px"}}>{this.props.name}</div>
                    <div onClick={this.onClose} className="waves-effect waves-light btn right green" style={{width: "34px", height: "34px", padding: 0}}><i className="material-icons small white-text">close</i></div>
                </div>
                
                <div  style={{width: "250px", height: "320px", margin: "0 auto", padding: 0}}>

                    <div id="chatBody" style={{display:"block", width: "100%", height: "260px", margin: 0, padding: 0}}>
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