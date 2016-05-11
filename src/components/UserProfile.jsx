var React = require('react');
var NavBar = require('./NavBar.jsx');
var PostNewFeed = require('./PostNewFeed.jsx');
var Wall = require('./Wall.jsx');


var UserProfile = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {
    return (
        <div id="userProfile">
          <NavBar />

          <div className="background hoverable">
            <div className="container">
              <PostNewFeed />
            </div>
          </div>

          <Wall />

        </div>
    );
  }

});

module.exports = UserProfile;
