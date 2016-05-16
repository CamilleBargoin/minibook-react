var React = require('react');
var NavBar = require('../NavBar.jsx');
var Footer = require('../Footer.jsx');
var PostNewFeed = require('./PostNewFeed.jsx');
var Wall = require('./Wall.jsx');
var FriendsList = require("./FriendsList.jsx");
var ProfileData = require("./ProfileData.jsx");

var ToolBar = require("./ToolBar.jsx");

var UserProfile = React.createClass({

  getInitialState() {
    return {
      display: 0
    };
  },

  componentDidMount() {
      $('.profile_parallax').parallax();  
  },

  selectContent(index) {
    console.log(index);
    this.setState({
      display: index
    });
  },

  render() {


    var displayContent;

    if (this.state.display === 0)
      displayContent = <Wall />;
    else if (this.state.display == 1)
      displayContent = <FriendsList />;
    else if (this.state.display == 2)
      displayContent = <ProfileData />;

    return (
        <div id="userProfile">
          <NavBar />

          <div className="parallax-container" >
            <div className="profile_parallax" >
              <img src="/images/user-background1.jpg" />
            </div>
            <div id="profilePicture" className="hoverable">
              <i className="large material-icons" >add</i>
            </div>
            <div className="container">
              <ToolBar selectContent={this.selectContent} />
              <PostNewFeed />
            </div>
          </div>

          {displayContent}
          <div style={{height:"350px"}} />
          <Footer />
        </div>
    );
  }

});

module.exports = UserProfile;
