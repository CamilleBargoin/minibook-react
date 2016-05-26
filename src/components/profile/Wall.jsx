var React = require('react');
var WallFeed = require("./WallFeed.jsx");


var Wall = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  render() {

    const self = this;
    const wallPosts = this.props.posts.map(function(post, i) {
      return (
        <WallFeed post={post} key={i} postComment={self.props.postComment}/>
      );
    });

    return (
      <div className="container">  
        {wallPosts}
      </div>
    );
  }

});

module.exports = Wall;