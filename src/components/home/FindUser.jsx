var React = require('react');

var FindUser = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  searchUser(e) {
    e.preventDefault();
    this.refs["userInput"].value = "";
  },

  render() {
    return (
      <div className="row" style={{marginTop: "25px"}}>
        <div className="card-panel hoverable col s8 offset-s2 m6 offset-m3 black">
          <p className="white-text">Recherche un membre dans la communauté !</p>  
          <form className="input-field col s12" onSubmit={this.searchUser}>
              <input id="newFeed" type="text" className="validate white-text" ref="userInput"/>
              <label for="newFeed">nom ou prénom</label>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = FindUser;