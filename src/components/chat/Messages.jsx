var React = require('react');


var Messages = React.createClass({

    render() {

        var texts = this.props.messages.map(function(message, i) {

            if (message.author == "me") {
                return <p>{message.text}</p>
            }
            return 
                <p style={{textAlign:"right", width: "100%"}}>{message.text}</p>
        });


        return (

            
            
            <div>
                {texts}
            </div>
                    
        );
    }
});


module.exports = Messages;