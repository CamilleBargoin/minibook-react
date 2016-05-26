var React = require('react');


var PostNewFeed = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  submitNewFeed(e) {
    e.preventDefault();
    this.props.post(this.refs.feedInput.value);

    this.refs.feedInput.value = "";
  },

  render() {
    return (
      <div className="row postNewFeedBox">  
        <div className="card-panel hoverable col s8 offset-s2 m6 offset-m3">
          <form className="input-field col s12" onSubmit={this.submitNewFeed}>
              <input id="newFeed" type="text" className="validate" ref="feedInput"/>
              <label for="newFeed">Exprime-toi !</label>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = PostNewFeed;