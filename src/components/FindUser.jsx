var React = require('react');

var FindUser = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {
    return (
      <div className="row" style={{marginTop: "75px"}}>
        <div className="card-panel hoverable col s8 offset-s2 m6 offset-m3">
          <p className="white-text">Recherche un membre dans la communauté !</p>  
          <form>
            <div className="input-field col s12">
                <input id="newFeed" type="text" className="validate" />
                <label for="newFeed">nom ou prénom</label>
            </div>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = FindUser;