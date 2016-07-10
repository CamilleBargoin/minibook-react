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

    var messageLines = this.props.messages.map(function(message, i) {
      return (
        <MessageLine author={message.created_by} body={message.body} subject={message.subject} date={message.created_at} key={i}  />
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
