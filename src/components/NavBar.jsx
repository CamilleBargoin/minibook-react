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
              <a href="#!" className="brand-logo">Logo</a>
              <ul className="right hide-on-med-and-down">
                <li><a href="/profile">Mon profil</a></li>
                <li><a href="badges.html">Components</a></li>
              </ul>
            </div>
          </nav>
        </div>
    );
  }

});

module.exports = NavBar;