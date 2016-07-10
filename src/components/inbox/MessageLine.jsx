var React = require('react');
var moment = require('moment');


var MessageLine = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  
  render() {



    var date = moment(this.props.date).format("MMMM Do");

    let fullname = "";
    if (this.props.author)
      fullname = this.props.author.firstname + " " + this.props.author.lastname;

    return (
      
      <li>
        <div className="collapsible-header">
          <div className="row">
            <i className="material-icons">whatshot</i>
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
