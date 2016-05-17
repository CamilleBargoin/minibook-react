var React = require('react');


var NavBar = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  render() {
    return (   
        <div className="navbar-fixed ">
          <nav className="green accent-4">
            <div className="nav-wrapper">
              <a href="/home" className="brand-logo">minibook</a>
              <ul className="right hide-on-med-and-down">
                <li><a onClick={this.props.openChat} href="#">test chat</a></li>
                <li><a href="/profile">Mon profil</a></li>
                <li><a href="/inbox"><i className="material-icons">email</i></a></li>
              </ul>
            </div>
          </nav>
        </div>
    );
  }

});

module.exports = NavBar;