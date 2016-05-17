var React = require('react');
var moment = require('moment');


var MessageLine = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  
  render() {


    var date = moment(this.props.date * 1000).format("MMMM Do");

    return (
      
      <li>
        <div className="collapsible-header">
          <div className="row">
            <i className="material-icons">whatshot</i>
            <span className="col s2" style={{fontWeight: "bold"}}>{this.props.author}</span>
            <span className="col s4">{this.props.object}</span>
            <span className="col s2 offset-s3" style={{textAlign: "right"}}>{date}</span>
          </div>
        </div>
        <div className="collapsible-body"><p>{this.props.body}</p></div>
      </li>
            
    );
  }

});

module.exports = MessageLine;
