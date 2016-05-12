var React = require('react');
var NavBar = require('./NavBar.jsx');
var Footer = require('./Footer.jsx');
var FriendBoxContainer = require('./FriendBoxContainer.jsx');
var FindUser = require('./FindUser.jsx');


var Home = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {
    return (
      <div>
         <NavBar />
         {/*<FriendBoxContainer />*/}
         
            
              <FindUser />
            
         
         

         <Footer />
      </div>
    );
  }

});

module.exports = Home;
