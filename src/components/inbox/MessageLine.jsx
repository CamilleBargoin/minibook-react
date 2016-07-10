var React = require('react');
var moment = require('moment');


var MessageLine = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  displayMessage(e) {
console.log(this.props);

    if (this.props.status == "not_read") {
      this.props.readMessage(this.props._id);
    }
  },

  
  render() {



    var date = moment(this.props.created_at).format("MMMM Do");

    let fullname = "";
    if (this.props.created_by)
      fullname = this.props.created_by.firstname + " " + this.props.created_by.lastname;

    const icon = (this.props.status == "not_read") ? "whatshot" : "label";
    
    const backgroundColor = (this.props.status == "not_read") ? "#fff" : "#eee";

    return (
      
      <li>
        <div className="collapsible-header" style={{backgroundColor: backgroundColor}} onClick={this.displayMessage}>
          <div className="row">
            <i className="material-icons">{icon}</i>
            <span className="col s2" style={{fontWeight: "bold"}}>{fullname}</span>
            <span className="col s4">{this.props.subject}</span>
            <span className="col s2 offset-s3" style={{textAlign: "right"}}>{date}</span>
          </div>
        </div>
        <div className="collapsible-body"><p>{this.props.body}</p></div>
      </li>
            
    );
  }

});

module.exports = MessageLine;
