
var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;
var Router = require('react-router').Router;

var Auth = require('./components/Landing.jsx');
var App = require('./components/App.jsx');

var Home = require('./components/home/Home.jsx');
var UserProfile = require('./components/profile/UserProfile.jsx');
var MyProfile = require('./components/profile/MyProfile.jsx');
var Inbox = require('./components/inbox/Inbox.jsx');
var Admin = require('./components/admin/Admin.jsx');
var Logout = require('./components/logout.jsx');
var Forbidden = require('./components/forbidden.jsx');

var NoMatch = React.createClass({

  render() {
    return (
        <div className="container">
          <div className="row" style={{paddingTop: "15%"}}>
            <div className="col s12">
              <p style={{color: "white"}}>Cette page est introuvable :&#39;(</p>
            </div>
          </div>
        </div>
    );
  }

});

var auth = require("./auth.js");


module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={requireCredentials}/>

      {/*<Route path="/home" component={Home} onEnter={requireCredentials}>
      </Route>*/}

      <Route path="/profile" component={MyProfile} onEnter={requireCredentials}>
      </Route>

      <Route path="/profile/:id" component={UserProfile} onEnter={requireCredentials}>
      </Route>

      <Route path="/inbox" component={Inbox} onEnter={requireCredentials}>
      </Route>

      <Route path="/admin" component={Admin} onEnter={requireAdminCredentials}>
      </Route>

      <Route path="/auth" component={Auth} >
      </Route>

      <Route path="/logout" component={Logout} >
      </Route>

      <Route path="/forbidden" component={Forbidden} >
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
);



function requireCredentials(nextState, replace, next) {

  auth.loggedIn(function() {
    next();
  }, function() {
    replace("/auth");
    next();
  }); 
  

}

function requireAdminCredentials(nextState, replace, next) {

  auth.loggedInAdmin(function() {
    next();
  }, function() {
    replace("/forbidden");
    next();
  }); 
  

}