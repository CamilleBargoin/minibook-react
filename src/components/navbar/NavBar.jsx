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
      }, function() {

        if (this.state.user && this.state.user.friends){


          this.requests = [];
      
            for (var i = 0; i < this.state.user.friends.length; i++) {

              var currentUser = this.state.user.friends[i];
                if (this.state.user.friends[i].status == "pending")
                    this.requests.push(this.state.user.friends[i]);
            }
       
          this.forceUpdate();
        }  
      }); 
  },


  componentDidMount() {

  },

  componentWillMount() {
      
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

        
    const display = this.requests.length > 0 ? {display: "block"} : {display: "none"};

    const requestsList = this.state.showRequests ? <NavBarRequests requests={this.requests} refresh={this.props.refresh}/> : <div />
    
    return (   
        <div className="navbar-fixed ">
          <nav className="green accent-4">
            <div className="nav-wrapper">
              <div className="center" >
                <a href="/home" className="brand-logo">minibook</a>
                <NavBarSearch />
                <ul className="hide-on-med-and-down" style={{position: "absolute", top: 0, right: 0}}>
                  <li><a href="/logout">logout</a></li>
                  <li><a onClick={this.props.openChat} href="#">test chat</a></li>
                  <li><a href={"/profile/" + localStorage.getItem('userId')}>Mon profil</a></li>
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