var React = require('react');
var UserSearch = require('./UserSearch.jsx');




var NavBar = React.createClass({

  getInitialState() {
    return {
      
    };
  },

  searchUser(e) {
    e.preventDefault();
    alert(this.refs["userInput"].value);
  },

  
  render() {

    

    return (   
        <div className="navbar-fixed ">
          <nav className="green accent-4">
            <div className="nav-wrapper">
              <a href="/home" className="brand-logo">minibook</a>

              <div className="center" >
                <UserSearch />
                <ul className="hide-on-med-and-down" style={{position: "absolute", top: 0, right: 0}}>
                  <li><a onClick={this.props.openChat} href="#">test chat</a></li>
                  <li><a href="/profile">Mon profil</a></li>
                  <li><a href="/inbox"><i className="material-icons">email</i></a></li>
                </ul>
              </div>
              
              
            </div>
          </nav>
        </div>
    );
  }

});

module.exports = NavBar;