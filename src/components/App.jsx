var React = require('react');
var NavLink = require('./NavLink.jsx');
var IndexLink  =require('react-router').IndexLink;


var App = React.createClass({

  getInitialState() {
    return {
      test:  "test"
    };
  },

  render() {
    return (
      <div style={{height:"100%"}}>

        {this.props.children}
        
      </div>
    );
  }

});

module.exports = App;
