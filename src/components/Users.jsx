var React = require('react');
var NavLink = require('./NavLink.jsx');
var Users = React.createClass({

  getInitialState: function() {
    return {
      test: 'foo'
    };
  },
  contextTypes: {
    router: React.PropTypes.object
  },
  render: function() {

    return (
      <div >
        <h2> USERS !!</h2>
       
      </div>
    );
  }

});

module.exports = Users;
