var React = require('react');
var Comment = require('../Comment.jsx');

var FeedCommentBox = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  
  render() {
    return (

      <div>
        <Comment body="Yeah ca claque!" author="John Rambo"/>
        <Comment body="Lolilol" author="Miley Cirus"/>
        <Comment body="heuuuu..." author="Cmd Cousteau"/>
      </div>
    );
  }

});

module.exports = FeedCommentBox;