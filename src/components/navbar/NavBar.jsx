var React = require('react');
var NavBarSearch = require('./NavBarSearch.jsx');
var UserService = require('../../services/UserService.jsx');

var NavBarRequests = require("./NavBarRequests.jsx");



var NavBar = React.createClass({


  requests: [],

  getInitialState() {
    return {
      user: this.props.user,
      showRequests: false
    };
  },

  componentWillReceiveProps(nextProps) {
      this.setState({
        user: nextProps.user
      }); 
  },

  componentDidMount() {

  },

  searchUser(e) {
    e.preventDefault();
    alert(this.refs["userInput"].value);
  },

  showRequests() {

    if (this.requests && this.requests.length > 0) {
      this.setState({
        showRequests: !this.state.showRequests
      });
    }
  },
  
  render() {

    

    if (this.state.user && this.state.user.friends){
    
        this.requests = this.state.user.friends.map(function(user, index) {
          if (user.status == "request")
            return user;
        });
    }


    const display = this.requests.length > 0 ? {display: "block"} : {display: "none"};

    const requestsList = this.state.showRequests ? <NavBarRequests requests={this.requests} /> : <div />
    
    return (   
        <div className="navbar-fixed ">
          <nav className="green accent-4">
            <div className="nav-wrapper">
              <a href="/home" className="brand-logo">minibook</a>

              <div className="center" >
                <NavBarSearch />
                <ul className="hide-on-med-and-down" style={{position: "absolute", top: 0, right: 0}}>
                  <li><a href="/logout">logout</a></li>
                  <li><a onClick={this.props.openChat} href="#">test chat</a></li>
                  <li><a href="/profile">Mon profil</a></li>
                  <li style={{position: "relative"}}><a><i onClick={this.showRequests}  className="material-icons">group</i><div style={display} className="requestsBadge">{this.requests.length}</div></a></li>
                  <li><a href="/inbox"><i className="material-icons">email</i></a></li>
                </ul>
              </div>
            </div>
          </nav>

          {requestsList}
        </div>
    );
  }

});

module.exports = NavBar;