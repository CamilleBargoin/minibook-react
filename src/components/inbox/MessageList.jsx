var React = require('react');
var MessageLine = require('./MessageLine.jsx');


var MessageList = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  componentDidMount() {
    $('#messageList').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });  
  },
  

  render() {

console.log(this.props.messages);

    const self = this;
    var messageLines = this.props.messages.map(function(message, i) {
      return (
        <MessageLine {...message} key={i}  readMessage = {self.props.readMessage}/>
      );
    });

    return (
      <div>
         <ul id="messageList" className="collapsible popout" data-collapsible="accordion">
          {messageLines}
        </ul>
      </div>
    );
  }

});

module.exports = MessageList;
