var React = require('react');


var FriendBox = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {
    return (
        <div className="friendBox hoverable" style={{backgroundColor: this.props.color}}>
           <p>{this.props.name}</p>
        </div>
    );
  }

});

module.exports = FriendBox;
