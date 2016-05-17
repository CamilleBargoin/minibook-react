var React = require('react');

var UserListItem = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  
  render() {


    return (
      
      <li className="collection-item avatar">
        <img src="http://lorempixel.com/42/42/people" alt="" className="circle" />
        <span className="title" style={{fontWeight:"bold"}}>{this.props.name}</span>
        <p>First Line <br/>
           Second Line
        </p>
        <a href="#!" className="secondary-content"><i className="material-icons">send</i></a>
      </li>
            
    );
  }

});

module.exports = UserListItem;
