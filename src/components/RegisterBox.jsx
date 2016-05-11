var React = require('react');



var RegisterBox = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  register() {
    alert("inscription !");
  },

  render() {
    return (
      <div className="row "> 
        <form className="col s4 offset-s4 hoverable">
          <div className="row">
           <div className="input-field col s6">
              <input id="first_name" type="text" className="validate" />
              <label for="first_name">prénom</label>
            </div>
             <div className="input-field col s6">
              <input id="last_name" type="text" className="validate" />
              <label for="last_name">nom de famille</label>
            </div>
            <div className="input-field col s12">
              <input id="email" type="text" className="validate" />
              <label for="email">e-mail</label>
            </div>
            <div className="input-field col s12">
              <input id="password" type="text" className="validate" />
              <label for="password">password</label>
            </div>
            <div className="input-field col s12">
              <input id="password" type="text" className="validate" />
              <label for="password">confirmation du password</label>
            </div>
          </div>
          <div className="row">
            <a className="waves-effect waves-light btn col s12 green accent-4" onClick={this.register}>Inscription</a>
          </div>
        </form>
      </div>
    );
  }

});

module.exports = RegisterBox;
