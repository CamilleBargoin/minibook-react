var React = require('react');


var PostNewFeed = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {
    return (
      <div className="row postNewFeedBox">  
        <div className="card-panel hoverable col s8 offset-s2 m6 offset-m3">
          <div className="input-field col s12">
              <input id="newFeed" type="text" className="validate" />
              <label for="newFeed">Exprime-toi !</label>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = PostNewFeed;