var React = require('react');
var NavLink = require('./NavLink.jsx');
var IndexLink  =require('react-router').IndexLink;

var App = React.createClass({

  getInitialState: function() {
    return {
      test:  "test"
    };
  },
  render: function() {
    return (
      <div style={{height:"100%"}}>
        {/*<h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
          <li><NavLink to="/users" >Users</NavLink></li>
          <li><NavLink to="/todos" >Todos</NavLink></li>
        </ul>
        */}
        {this.props.children}
        
      </div>
    );
  }

});

module.exports = App;
