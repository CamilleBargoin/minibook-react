var React = require('react');
var Comment = require('../Comment.jsx');

var FeedCommentBox = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  
  render() {

        const comments = this.props.comments.map(function(comment, i) {
          return (
            <Comment body={comment.body} author={comment.author} key={i} />
          );
        });


    return (

      <div>
        {comments}
      </div>
    );
  }

});

module.exports = FeedCommentBox;