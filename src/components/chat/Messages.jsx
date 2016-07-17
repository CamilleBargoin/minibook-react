var React = require('react');


var Messages = React.createClass({

    getInitialState() {
        return {
            messages: this.props.messages || []
        };
    },

    componentWillReceiveProps(nextProps) {
          this.setState({
            messages: nextProps.messages
          });
    },

    render() {


        var texts = this.state.messages.map(function(message, i) {


            if (message.created_by == localStorage.getItem("userId")) {
                return <p key= {i}>{message.body}</p>
            }
            return <p style={{textAlign:"right", width: "100%"}} key={i}> {message.body} </p>; 
        });

        return (

            
            
            <div>
                {texts}
            </div>
                    
        );
    }
});


module.exports = Messages;