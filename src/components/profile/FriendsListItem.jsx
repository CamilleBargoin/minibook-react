var React = require('react');


var FriendsListItem = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {
    return (
      <li className="collection-item avatar">
        <img src="http://lorempixel.com/42/42/people" alt="" className="circle" />
        <span className="title">{this.props.name}</span>
        <p>First Line <br/>
           Second Line
        </p>
        <a href="#!" className="secondary-content"><i className="material-icons">send</i></a>
      </li>
          
    );
  }

});

module.exports = FriendsListItem;