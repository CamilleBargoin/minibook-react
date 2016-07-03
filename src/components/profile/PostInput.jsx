var React = require('react');


var PostInput = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  submitPost(e) {
    e.preventDefault();
    this.props.post(this.refs.postInput.value);

    this.refs.postInput.value = "";
  },

  render() {
    return (
      <div className="row postInputComponent">  
        <div className="card-panel hoverable col s8 offset-s2 m6 offset-m3">
          <form className="input-field col s12" onSubmit={this.submitPost}>
              <input id="newPost" type="text" className="validate" ref="postInput"/>
              <label for="newPost">Exprime-toi !</label>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = PostInput;