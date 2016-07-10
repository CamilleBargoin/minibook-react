var React = require('react');
var LoginBox = require('./LoginBox.jsx');
var RegisterBox = require('./RegisterBox.jsx');


var Landing = React.createClass({

  getInitialState() {
    return {
      showLogin: true
    };
  },

  showRegisterBox() {
    this.setState({
      showLogin: false
    });
  },

  showLoginBox() {
    this.setState({
      showLogin: true
    });
  },

  render() {

    console.log(this.props);

    var box;
    if (this.state.showLogin) {
      box = (
        <div>
          <LoginBox refreshUser = {this.props.refreshUser}/>
          <p>Pas encore membre? <a className="changeBox" onClick={this.showRegisterBox}>inscris-toi !</a></p>
        </div>
      );
    }
    else {
      box = (
        <div>
          <RegisterBox />
          <p>J'ai déjà un compte, <a className="changeBox" onClick={this.showLoginBox}>je me connecte !</a></p>
        </div>
      );
    }

    return (
      <div id="homePage" className="container">

        <div className="row">
            <h1 className="appTitle col s12">minibook</h1>
            {box}
            
        </div>
      </div>
    );
  }

});

module.exports = Landing;
