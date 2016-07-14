var React = require('react');
var WallPost = require("./WallPost.jsx");


var Wall = React.createClass({

  getInitialState() {
    return {
    
    };
  },

 
  render() {
    
    var posts = this.props.posts;
    // posts.propAsort("created_at");

    const self = this;
    const wallPosts = this.props.posts.map(function(post, i) {
      return (
        <WallPost post={post} key={i} postComment={self.props.postComment}/>
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