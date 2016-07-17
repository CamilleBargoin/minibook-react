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
            console.log(message);
            let avatar = "";

            if (message.created_by.avatar)
              avatar = message.created_by.avatar.replace("/upload/", "/upload/w_30,h_30,c_fill/");

          let className = "messageContainer";


            if (message.created_by._id != localStorage.getItem("userId")) {
               className += " stickRight";
            }
       
            return <div className={className} key={i}>
                        <img src={avatar} className="circle" alt=""/>
                        <p className="message">{message.body}</p> 
                    </div>; 
            
        });

        return (

            
            
            <div>
                {texts}
            </div>
                    
        );
    }
});


module.exports = Messages;