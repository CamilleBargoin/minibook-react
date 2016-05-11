var React = require('react');



var Home = React.createClass({

  getInitialState: function() {
    return {
      test: 'foo'
    };
  },
  render: function() {
    return (
      <div >
        <h2> HOME !!!!</h2>
      </div>
    );
  }

});

module.exports = Home;
