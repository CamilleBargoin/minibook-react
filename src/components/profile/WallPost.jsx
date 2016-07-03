var React = require('react');
var PostCommentsList = require('./PostCommentsList.jsx');

var WallPost = React.createClass({

  getInitialState() {
    return {
    
    };
  },


  postComment(e) {
    e.preventDefault();



    this.props.postComment(this.refs.commentInput.value, this.props.post._id);
    this.refs.commentInput.value = "";
  },



  render() {

    var commentsContainer;
    
    if (this.props.post.comments) {
      commentsContainer = (<PostCommentsList comments={this.props.post.comments} />); 
    }
    else {
      commentsContainer = (<div />);+0
    }

    const post = this.props.post;
    const author = post.created_by;
    const authorFullname = (author) ? author.firstname + " " + author.lastname : null;

    return (
        <div style={{margin: "50px 0"}} className="wallPost row">
          <div className="col l1 offset-l2 m1 offset-m1 s1">
            <div style={{height: "60px", width: "60px", marginTop: "7px"}} className="blue tooltipped hoverable" data-position="left" data-delay="50" data-tooltip={authorFullname}>
            </div>
          </div>
          <div className="grey lighten-5 card-panel hoverable col l6 m8 offset-m1 s10 offset-s1">
            <p className="feedText">{this.props.post.body}</p>
            {commentsContainer}
            
          </div>
          <form className="input-field col l6 offset-l3 m8 offset-m3 s10 offset-s2" onSubmit={this.postComment}>
            <input id="feedAComment" type="text" className="validate" ref="commentInput" />
            <label for="feedAComment">Un commentaire ?</label>
          </form>
        </div>
    );
  }

});

module.exports = WallPost;