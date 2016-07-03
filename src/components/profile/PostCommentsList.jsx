var React = require('react');
var Comment = require('../Comment.jsx');

var PostCommentsList = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  
  render() {

        const comments = this.props.comments.map(function(comment, i) {
          return (
            <Comment comment={comment} key={i} />
          );
        });


    return (

      <div>
        {comments}
      </div>
    );
  }

});

module.exports = PostCommentsList;