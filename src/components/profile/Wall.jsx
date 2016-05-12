var React = require('react');
var WallFeed = require("./WallFeed.jsx");


var Wall = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {
    return (
      <div className="container">  
        
        <WallFeed />
        <WallFeed />
        <WallFeed />
        <WallFeed />
        <WallFeed />
        <WallFeed />
        <WallFeed />
        <WallFeed />
        <WallFeed />
        <WallFeed />
      </div>
    );
  }

});

module.exports = Wall;