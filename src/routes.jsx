
var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

// var TodosApp = require("./components/TodosApp.jsx");
var Users = require('./components/Users.jsx');
var Landing = require('./components/Landing.jsx');
var App = require('./components/App.jsx');

var Home = require('./components/home/Home.jsx');
var UserProfile = require('./components/profile/UserProfile.jsx');
var Inbox = require('./components/inbox/Inbox.jsx');
var Admin = require('./components/admin/Admin.jsx');
var Logout = require('./components/logout.jsx');
var Forbidden = require('./components/forbidden.jsx');

var auth = require("./auth.js");


module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Landing}/>

    <Route path="/home" component={Home} onEnter={requireCredentials}>
    </Route>

    <Route path="/profile" component={UserProfile} onEnter={requireCredentials}>
    </Route>

    <Route path="/profile/:id" component={UserProfile} onEnter={requireCredentials}>
    </Route>

    <Route path="/inbox" component={Inbox} onEnter={requireCredentials}>
    </Route>

    <Route path="/admin" component={Admin} onEnter={requireAdminCredentials}>
    </Route>

    <Route path="/logout" component={Logout} >
    </Route>

    <Route path="/forbidden" component={Forbidden} >
    </Route>
  </Route>
);



function requireCredentials(nextState, replace, next) {

  auth.loggedIn(function() {
    next();
  }, function() {
    replace("/");
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