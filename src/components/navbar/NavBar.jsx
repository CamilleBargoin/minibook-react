var React = require('react');
var NavBarSearch = require('./NavBarSearch.jsx');
var UserService = require('../../services/UserService.jsx');
var browserHistory = require('react-router').browserHistory;

var NavBarRequests = require("./NavBarRequests.jsx");



var NavBar = React.createClass({


  requests: [],

  getInitialState() {
    return {
      user: this.props.user || {},
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

  displayHome() {
    browserHistory.push('/home');
  },

  logout() {
    browserHistory.push('/logout');
  },

  displayProfile() {
    browserHistory.push("/profile/");
  },
  
  displayInbox() {
    browserHistory.push("/inbox");
  },

  displayAdmin() {
    browserHistory.push("/admin");
  },

  render() {


    let components;

    if (localStorage.getItem('sessionId')) {

      const display = this.requests.length > 0 ? {display: "block"} : {display: "none"};
      const name = this.state.user ? this.state.user.firstname : "";
      const requestsList = this.state.showRequests ? <NavBarRequests requests={this.requests} refresh={this.props.refresh}/> : <div />

      let url = ""
      if (this.props.user.avatar) {
        url = this.props.user.avatar.replace("/upload/", "/upload/w_32,h_32,c_fill/");
      }

      let adminControl = <div />;
      if (this.props.user.role == 2) {
        adminControl = <a onClick={this.displayAdmin} className="adminControl"><i className="material-icons">settings</i>Administration</a>
      }

      components = (

        <div className="center" >
          <a onClick={this.displayHome}  className="brand-logo">minibook</a>
          {adminControl}
          <NavBarSearch />
          <ul className="hide-on-med-and-down" style={{position: "absolute", top: 0, right: 0}}>
            <li><a onClick={this.displayProfile}><img src={url} alt="" className="navbar-avatar circle" />{name}</a></li>
            <li><a onClick={this.props.openChat} href="#">test chat</a></li>
            <li style={{position: "relative"}}><a> <i onClick={this.showRequests}  className="material-icons">group</i><div style={display} className="requestsBadge">{this.requests.length}</div></a></li>
            <li><a onClick={this.displayInbox} ><i className="material-icons">email</i></a></li>
            <li><a onClick={this.logout} ><i className="material-icons">exit_to_app</i></a></li>
          </ul>
          {requestsList}
        </div>

      );



    }
    else {
      components = (
        <div className="center" >
          <a onClick={this.displayHome}  className="brand-logo">minibook</a>
        </div>
      );
    }

        



    return (   
        <div className="navbar-fixed ">
          <nav className="green accent-4">
            <div className="nav-wrapper">
              {components}
            </div>
          </nav>

        </div>
    );
  }

});

module.exports = NavBar;