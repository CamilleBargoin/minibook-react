/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var express = __webpack_require__(1);
	var path = __webpack_require__(2);

	// var compression = require('compression');

	var React = __webpack_require__(3);
	var ReactDOM = __webpack_require__(4);
	var match = __webpack_require__(5).match;
	var RouterContext = __webpack_require__(5).RouterContext;
	var routes = __webpack_require__(6);

	var app = express();

	app.use(express.static(path.join(__dirname, 'public')));

	app.use(function (req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});

	// send all requests to index.html so browserHistory in React Router works
	app.get('*', function (req, res) {

	  match({ routes: routes, location: req.url }, function (err, redirect, props) {

	    if (err) {
	      // there was an error somewhere during route matching
	      res.status(500).send(err.message);
	    } else if (redirect) {

	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {

	      var appHtml = ReactDOM.renderToString(React.createElement(RouterContext, props));
	      res.send(renderPage(appHtml));
	    } else {

	      // no errors, no redirect, we just didn't match anything
	      res.status(404).send('Not Found');
	    }
	  });
	});

	function renderPage(appHtml) {
	  return '<!doctype html public="storage">' + '<html>' + '<meta charset=utf-8/>' + '<meta http-equiv="x-ua-compatible" content="ie=edge">' + '<meta name="viewport" content="width=device-width, initial-scale=1">' + '<link rel="stylesheet" type="text/css" href="main.css">' + '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css">' + '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' + '<title>My First React Router App</title>' + '<div id=app>${appHtml}</div>' + '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>' + '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js"></script>' + "<script src='jquery.ui.widget.js' type='text/javascript'></script>" + "<script src='jquery.iframe-transport.js' type='text/javascript'></script>" + "<script src='jquery.fileupload.js' type='text/javascript'></script>" + "<script src='jquery.cloudinary.js' type='text/javascript'></script>" + "<script src='/bundle.js'></script>";
	};

	var PORT = process.env.PORT || 8080;
	app.listen(PORT, function () {
	  console.log('Production Express server running at localhost:' + PORT);
	});

	/* 
	    pour lancer l'app en mode production (pas de hot push code):
	      $ set NODE_ENV=production
	      $ npm start

	    pour lancer l'app en mode dev:
	      $ set NODE_ENV=development
	      $ npm start


	    pour afficher l'environnement:
	      $ echo %NODE_ENV%
	 */
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Route = __webpack_require__(5).Route;
	var IndexRoute = __webpack_require__(5).IndexRoute;
	var browserHistory = __webpack_require__(5).browserHistory;
	var Router = __webpack_require__(5).Router;

	var Auth = __webpack_require__(7);
	var App = __webpack_require__(13);

	var Home = __webpack_require__(20);
	var UserProfile = __webpack_require__(27);
	var MyProfile = __webpack_require__(39);
	var Inbox = __webpack_require__(40);
	var Admin = __webpack_require__(47);
	var Logout = __webpack_require__(51);
	var Forbidden = __webpack_require__(52);

	var NoMatch = React.createClass({
	  displayName: 'NoMatch',
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'container' },
	      React.createElement(
	        'div',
	        { className: 'row', style: { paddingTop: "15%" } },
	        React.createElement(
	          'div',
	          { className: 'col s12' },
	          React.createElement(
	            'p',
	            { style: { color: "white" } },
	            'Cette page est introuvable :\'('
	          )
	        )
	      )
	    );
	  }
	});

	var auth = __webpack_require__(9);

	module.exports = React.createElement(
	  Router,
	  { history: browserHistory },
	  React.createElement(
	    Route,
	    { path: '/', component: App },
	    React.createElement(IndexRoute, { component: Home, onEnter: requireCredentials }),
	    React.createElement(Route, { path: '/profile', component: MyProfile, onEnter: requireCredentials }),
	    React.createElement(Route, { path: '/profile/:id', component: UserProfile, onEnter: requireCredentials }),
	    React.createElement(Route, { path: '/inbox', component: Inbox, onEnter: requireCredentials }),
	    React.createElement(Route, { path: '/admin', component: Admin, onEnter: requireAdminCredentials }),
	    React.createElement(Route, { path: '/auth', component: Auth }),
	    React.createElement(Route, { path: '/logout', component: Logout }),
	    React.createElement(Route, { path: '/forbidden', component: Forbidden }),
	    React.createElement(Route, { path: '*', component: NoMatch })
	  )
	);

	function requireCredentials(nextState, replace, next) {

	  auth.loggedIn(function () {
	    next();
	  }, function () {
	    replace("/auth");
	    next();
	  });
	}

	function requireAdminCredentials(nextState, replace, next) {

	  auth.loggedInAdmin(function () {
	    next();
	  }, function () {
	    replace("/forbidden");
	    next();
	  });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var LoginBox = __webpack_require__(8);
	var RegisterBox = __webpack_require__(12);

	var Landing = React.createClass({
	  displayName: 'Landing',
	  getInitialState: function getInitialState() {
	    return {
	      showLogin: true
	    };
	  },
	  showRegisterBox: function showRegisterBox() {
	    this.setState({
	      showLogin: false
	    });
	  },
	  showLoginBox: function showLoginBox() {
	    this.setState({
	      showLogin: true
	    });
	  },
	  render: function render() {

	    console.log(this.props);

	    var box;
	    if (this.state.showLogin) {
	      box = React.createElement(
	        'div',
	        null,
	        React.createElement(LoginBox, { refreshUser: this.props.refreshUser }),
	        React.createElement(
	          'p',
	          null,
	          'Pas encore membre? ',
	          React.createElement(
	            'a',
	            { className: 'changeBox', onClick: this.showRegisterBox },
	            'inscris-toi !'
	          )
	        )
	      );
	    } else {
	      box = React.createElement(
	        'div',
	        null,
	        React.createElement(RegisterBox, null),
	        React.createElement(
	          'p',
	          null,
	          'J\'ai déjà un compte, ',
	          React.createElement(
	            'a',
	            { className: 'changeBox', onClick: this.showLoginBox },
	            'je me connecte !'
	          )
	        )
	      );
	    }

	    return React.createElement(
	      'div',
	      { id: 'homePage', className: 'container' },
	      React.createElement(
	        'div',
	        { className: 'row' },
	        React.createElement(
	          'h1',
	          { className: 'appTitle col s12' },
	          'minibook'
	        ),
	        box
	      )
	    );
	  }
	});

	module.exports = Landing;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Auth = __webpack_require__(9);
	var browserHistory = __webpack_require__(5).browserHistory;
	var config = __webpack_require__(11);

	var LoginBox = React.createClass({
	  displayName: 'LoginBox',

	  socket: null,
	  getInitialState: function getInitialState() {
	    return {
	      email: "",
	      password: ""
	    };
	  },
	  updateField: function updateField(e) {
	    var obj = {};
	    obj[e.target.name] = e.target.value;
	    this.setState(obj);
	  },
	  login: function login() {

	    var self = this;
	    // this.socket = io("http://minibook-express.herokuapp.com:8080");

	    Auth.login(this.state.email, this.state.password, function () {

	      self.props.refreshUser();
	      browserHistory.push('/');
	    });
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'row ' },
	      React.createElement(
	        'form',
	        { className: 'col s4 offset-s4 hoverable' },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'input-field col s12' },
	            React.createElement('input', { id: 'email', name: 'email', type: 'text', className: 'validate', onChange: this.updateField }),
	            React.createElement(
	              'label',
	              { 'for': 'email' },
	              'e-mail'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-field col s12' },
	            React.createElement('input', { id: 'password', type: 'password', name: 'password', className: 'validate', onChange: this.updateField }),
	            React.createElement(
	              'label',
	              { 'for': 'password' },
	              'password'
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'a',
	            { className: 'waves-effect waves-light btn col s12 green accent-4', onClick: this.login },
	            'Connexion'
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = LoginBox;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var $ = __webpack_require__(10);

	var config = __webpack_require__(11);

	var AuthService = {

	  loggedIn: function loggedIn(_success, error) {

	    if (Storage) {
	      $.ajax({
	        method: "GET",
	        url: config[process.env.NODE_ENV].api + '/users/secure',
	        data: { sessionId: localStorage.getItem("sessionId") },
	        success: function success(data, status) {

	          if (data.success) {
	            // console.log("loggedIn success");
	            console.log(data);
	            if (data && data.port) localStorage.setItem("serverPort", data.port);
	            _success(data);
	          } else {
	            console.log(data);
	            if (data && data.port) localStorage.setItem("serverPort", data.port);
	            error(data);
	          }
	        },
	        error: function error(jqXHR, status, _error) {
	          // console.log("loggedIn error");
	          Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	          _error();
	        }

	      });
	    }
	  },

	  loggedInAdmin: function loggedInAdmin(_success2, error) {

	    if (Storage) {
	      $.ajax({
	        method: "GET",
	        url: config[process.env.NODE_ENV].api + '/users/secureAdmin',
	        data: { sessionId: localStorage.getItem("sessionId") },
	        success: function success(data, status) {

	          if (data.success) {
	            // console.log("loggedIn success");
	            // console.log(data);
	            _success2();
	          } else {
	            // console.log(data);
	            error();
	          }
	        },
	        error: function error(jqXHR, status, _error2) {
	          // console.log("loggedIn error");
	          Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	          _error2();
	        }

	      });
	    }
	  },

	  login: function login(email, password, callback) {

	    if (Storage) {
	      // console.log(config[process.env.NODE_ENV].api);
	      $.ajax({
	        type: 'POST',
	        url: config[process.env.NODE_ENV].api + '/users/login',
	        // post payload:
	        data: JSON.stringify({ email: email, password: password }),
	        dataType: 'json',
	        contentType: "application/json",
	        success: function success(data, status, jqXHR) {

	          if (data.error) {
	            // console.log(data.error);
	            Materialize.toast(data.error, 3000, 'toastError');
	          } else {

	            Materialize.toast("Loggé avec succès", 2000, 'toastSuccess', function () {

	              localStorage.setItem('sessionId', data.sessionId);
	              localStorage.setItem('userId', data.userId);
	              callback();
	            });
	          }
	        },
	        error: function error(jqXHR, status, _error3) {
	          Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	        }

	      });
	    }
	  },

	  logout: function logout(callback) {

	    // console.log("LOGOUT");

	    if (Storage) {
	      $.ajax({
	        method: "GET",
	        url: config[process.env.NODE_ENV].api + '/users/logout',
	        data: { sessionId: localStorage.getItem("sessionId") },
	        success: function success(data, status) {
	          // console.log("logout success");

	          if (data.success) {
	            localStorage.setItem("sessionId", "");
	            callback();
	          }
	        },
	        error: function error(jqXHR, status, _error4) {
	          // console.log("logout error");
	          Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	        }

	      });
	    }
	  }
	};

	module.exports = AuthService;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("jquery");

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    "production": {
	        "api": "http://minibook-express.herokuapp.com",
	        "websocket": "http://minibook-express.herokuapp.com"
	    },
	    "development": {
	        "api": "http://localhost:3000",
	        "websocket": "http://localhost:3001"
	    }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var browserHistory = __webpack_require__(5).browserHistory;
	var config = __webpack_require__(11);
	var Auth = __webpack_require__(9);

	var RegisterBox = React.createClass({
	  displayName: 'RegisterBox',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  register: function register(e) {

	    e.preventDefault();

	    var newUser = {
	      firstname: this.refs['firstname'].value,
	      lastname: this.refs['lastname'].value,
	      email: this.refs['email'].value,
	      password: this.refs['password'].value
	    };

	    console.log(newUser);

	    $.ajax({
	      type: 'POST',
	      url: config[process.env.NODE_ENV].api + '/users/register',
	      // post payload:
	      data: JSON.stringify(newUser),
	      dataType: 'json',
	      contentType: "application/json",
	      success: function success(data, status) {

	        if (data.error) {
	          console.log(data.error);
	          Materialize.toast(data.error, 3000, 'toastError');
	        } else {

	          Materialize.toast("Ton compte vient d'être créé!", 2000, 'toastSuccess', function () {
	            //req.session.test = "ceciestuntest";
	            Auth.login(newUser.email, newUser.password, function () {
	              browserHistory.push('/');
	            });
	          });
	        }
	      },
	      error: function error(jqXHR, status, _error) {
	        Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	      }

	    });
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'row ' },
	      React.createElement(
	        'form',
	        { className: 'col s4 offset-s4 hoverable' },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'input-field col s6' },
	            React.createElement('input', { id: 'first_name', type: 'text', className: 'validate', ref: 'firstname' }),
	            React.createElement(
	              'label',
	              { 'for': 'first_name' },
	              'prénom'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-field col s6' },
	            React.createElement('input', { id: 'last_name', type: 'text', className: 'validate', ref: 'lastname' }),
	            React.createElement(
	              'label',
	              { 'for': 'last_name' },
	              'nom de famille'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-field col s12' },
	            React.createElement('input', { id: 'email', type: 'email', className: 'validate', ref: 'email' }),
	            React.createElement(
	              'label',
	              { 'for': 'email' },
	              'e-mail'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-field col s12' },
	            React.createElement('input', { id: 'password', type: 'password', className: 'validate', ref: 'password' }),
	            React.createElement(
	              'label',
	              { 'for': 'password' },
	              'password'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-field col s12' },
	            React.createElement('input', { id: 'password', type: 'password', className: 'validate', ref: 'password-conf' }),
	            React.createElement(
	              'label',
	              { 'for': 'password' },
	              'confirmation du password'
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'a',
	            { className: 'waves-effect waves-light btn col s12 green accent-4', onClick: this.register },
	            'Inscription'
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = RegisterBox;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavLink = __webpack_require__(14);
	var IndexLink = __webpack_require__(5).IndexLink;
	var NavBar = __webpack_require__(15);
	var UserService = __webpack_require__(17);
	var Auth = __webpack_require__(9);

	var App = React.createClass({
	  displayName: 'App',
	  getInitialState: function getInitialState() {
	    return {
	      user: null
	    };
	  },
	  componentDidMount: function componentDidMount() {

	    this.getUser();
	  },
	  getUser: function getUser() {
	    var self = this;

	    Auth.loggedIn(function (data) {
	      UserService.get(localStorage.getItem('userId'), function (user) {
	        self.setState({
	          user: user
	        });
	      });
	    }, function (data) {
	      self.setState({
	        user: null
	      });
	    });
	  },
	  destroyUser: function destroyUser() {
	    this.setState({
	      user: {}
	    });
	  },
	  render: function render() {

	    return React.createElement(
	      'div',
	      { style: { height: "100%" } },
	      React.createElement(NavBar, { user: this.state.user }),
	      React.cloneElement(this.props.children, { user: this.state.user, refreshUser: this.getUser, destroyUser: this.destroyUser })
	    );
	  }
	});

	module.exports = App;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Link = __webpack_require__(5).Link;

	var NavLink = React.createClass({
	  displayName: 'NavLink',


	  render: function render() {
	    return React.createElement(Link, this.props);
	  }

	});

	module.exports = NavLink;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavBarSearch = __webpack_require__(16);
	var UserService = __webpack_require__(17);
	var browserHistory = __webpack_require__(5).browserHistory;

	var NavBarRequests = __webpack_require__(19);

	var NavBar = React.createClass({
	  displayName: 'NavBar',


	  requests: [],

	  getInitialState: function getInitialState() {
	    return {
	      user: this.props.user || {},
	      showRequests: false
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      user: nextProps.user
	    }, function () {

	      if (this.state.user && this.state.user.friends) {

	        this.requests = [];

	        for (var i = 0; i < this.state.user.friends.length; i++) {

	          var currentUser = this.state.user.friends[i];
	          if (this.state.user.friends[i].status == "pending") this.requests.push(this.state.user.friends[i]);
	        }

	        this.forceUpdate();
	      }
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    var self = this;

	    $(window).click(function () {
	      if (self.state.showRequests) {
	        self.setState({
	          showRequests: false
	        });
	      }
	    });
	  },
	  componentWillMount: function componentWillMount() {},
	  searchUser: function searchUser(e) {
	    e.preventDefault();
	    alert(this.refs["userInput"].value);
	  },
	  showRequests: function showRequests(e) {

	    e.stopPropagation();

	    if (this.requests && this.requests.length > 0) {
	      this.setState({
	        showRequests: !this.state.showRequests
	      });
	    }
	  },
	  acceptRequest: function acceptRequest(request, index) {

	    var self = this;

	    UserService.befriend(request.user._id, function (result) {
	      var t = self.requests.splice(index, 1);
	      self.forceUpdate();
	    });
	  },
	  displayHome: function displayHome() {
	    browserHistory.push('/');
	  },
	  logout: function logout() {
	    browserHistory.push('/logout');
	  },
	  displayProfile: function displayProfile() {
	    browserHistory.push("/profile/");
	  },
	  displayInbox: function displayInbox() {
	    browserHistory.push("/inbox");
	  },
	  displayAdmin: function displayAdmin() {
	    browserHistory.push("/admin");
	  },
	  render: function render() {

	    var components = void 0;

	    if (this.state.user && this.state.user._id) {

	      var display = this.requests.length > 0 ? { display: "block" } : { display: "none" };
	      var name = this.state.user ? this.state.user.firstname : "";
	      var requestsList = this.state.showRequests ? React.createElement(NavBarRequests, { requests: this.requests, acceptRequest: this.acceptRequest }) : React.createElement('div', null);

	      var url = "";
	      if (this.props.user.avatar) {
	        url = this.props.user.avatar.replace("/upload/", "/upload/w_32,h_32,c_fill/");
	      }

	      var adminControl = React.createElement('div', null);
	      if (this.props.user.role == "2") {
	        adminControl = React.createElement(
	          'a',
	          { onClick: this.displayAdmin, className: 'adminControl' },
	          React.createElement(
	            'i',
	            { className: 'material-icons' },
	            'settings'
	          ),
	          'Administration'
	        );
	      }

	      components = React.createElement(
	        'div',
	        { className: 'center' },
	        React.createElement(
	          'a',
	          { onClick: this.displayHome, className: 'brand-logo pointer' },
	          'minibook'
	        ),
	        adminControl,
	        React.createElement(NavBarSearch, null),
	        React.createElement(
	          'ul',
	          { className: 'hide-on-med-and-down', style: { position: "absolute", top: 0, right: 0 } },
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              'a',
	              { onClick: this.displayProfile },
	              React.createElement('img', { src: url, alt: '', className: 'navbar-avatar circle' }),
	              name
	            )
	          ),
	          React.createElement(
	            'li',
	            { id: 'showRequestsButton', style: { position: "relative" } },
	            React.createElement(
	              'a',
	              null,
	              ' ',
	              React.createElement(
	                'i',
	                { onClick: this.showRequests, className: 'material-icons' },
	                'group'
	              ),
	              React.createElement(
	                'div',
	                { style: display, className: 'requestsBadge' },
	                this.requests.length
	              )
	            )
	          ),
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              'a',
	              { onClick: this.displayInbox },
	              React.createElement(
	                'i',
	                { className: 'material-icons' },
	                'email'
	              )
	            )
	          ),
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              'a',
	              { onClick: this.logout },
	              React.createElement(
	                'i',
	                { className: 'material-icons' },
	                'exit_to_app'
	              )
	            )
	          )
	        ),
	        requestsList
	      );
	    } else {
	      components = React.createElement(
	        'div',
	        { className: 'center' },
	        React.createElement(
	          'a',
	          { onClick: this.displayHome, className: 'brand-logo' },
	          'minibook'
	        )
	      );
	    }

	    return React.createElement(
	      'div',
	      { className: 'navbar-fixed ' },
	      React.createElement(
	        'nav',
	        { className: 'green accent-4' },
	        React.createElement(
	          'div',
	          { className: 'nav-wrapper' },
	          components
	        )
	      )
	    );
	  }
	});

	module.exports = NavBar;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	var UserService = __webpack_require__(17);
	var NavBarSearchItem = __webpack_require__(18);

	var NavBarSearch = React.createClass({
	  displayName: "NavBarSearch",
	  getInitialState: function getInitialState() {
	    return {
	      suggestions: []
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var self = this;

	    $(window).on("click", function () {
	      if (self.state) {
	        self.setState({
	          suggestions: []
	        });
	      }
	    });
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    $(window).off("click");
	  },
	  onChange: function onChange(e) {
	    var that = this;
	    var input = this.refs["userInput"].value;

	    if (input && input != "" && input.length > 1) {

	      UserService.search(this.refs["userInput"].value, function (result) {

	        console.log(result);
	        if (result) {
	          that.setState({
	            suggestions: result.users
	          });
	        }
	      });
	    } else {
	      that.setState({
	        suggestions: []
	      });
	    }
	  },
	  selectUser: function selectUser(e) {
	    console.log(e.currentTarget);
	  },
	  invite: function invite(user) {
	    UserService.sendInvite(user, function () {
	      Materialize.toast("Demande d'ami envoyée !", 3000, 'toastSuccess');
	    });
	  },
	  render: function render() {

	    var self = this;
	    var displayUserSuggestions = this.state.suggestions.length > 0 ? "block" : "none";
	    var userSuggestions = this.state.suggestions.map(function (user, key) {
	      return React.createElement(NavBarSearchItem, { user: user, invite: self.invite, key: key });
	    });

	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "form",
	        { className: "input-field col s12", onSubmit: this.searchUser },
	        React.createElement("input", { type: "text", className: "validate white-text green searchinput hoverable", placeholder: "rechercher un membre...", ref: "userInput", onChange: this.onChange })
	      ),
	      React.createElement(
	        "ul",
	        { className: "collection searchSuggestions", style: { display: displayUserSuggestions } },
	        userSuggestions
	      )
	    );
	  }
	});

	module.exports = NavBarSearch;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(11);

	var UserService = {

	    get: function get(userId, callback) {

	        var payload = {
	            sessionId: localStorage.getItem("sessionId")
	        };

	        this.getHTTPRequest(config[process.env.NODE_ENV].api + '/users/' + userId, payload, callback);
	    },

	    getAll: function getAll(callback) {

	        var payload = {
	            sessionId: localStorage.getItem('sessionId')
	        };

	        this.postHTTPRequest(config[process.env.NODE_ENV].api + '/users/all', payload, callback);
	    },

	    getFriends: function getFriends(userId, callback) {

	        var payload = {
	            userId: userId,
	            sessionId: localStorage.getItem('sessionId')
	        };

	        this.postHTTPRequest(config[process.env.NODE_ENV].api + '/users/friends', payload, callback);
	    },

	    update: function update(userId, fields, callback) {

	        var payload = {
	            userId: userId,
	            sessionId: localStorage.getItem('sessionId'),
	            updatedFields: fields
	        };

	        this.postHTTPRequest(config[process.env.NODE_ENV].api + '/users/update', payload, callback);
	    },

	    search: function search(string, callback) {

	        var payload = {
	            string: string,
	            sessionId: localStorage.getItem('sessionId')
	        };

	        this.postHTTPRequest(config[process.env.NODE_ENV].api + '/users/search', payload, callback);
	    },

	    sendInvite: function sendInvite(user, callback) {

	        var payload = {
	            sessionId: localStorage.getItem('sessionId'),
	            userId: user._id
	        };

	        this.postHTTPRequest(config[process.env.NODE_ENV].api + '/users/invite', payload, callback);
	    },

	    befriend: function befriend(newFriendId, callback) {

	        var payload = {
	            sessionId: localStorage.getItem('sessionId'),
	            friendId: newFriendId
	        };

	        this.postHTTPRequest(config[process.env.NODE_ENV].api + '/users/befriend', payload, callback);
	    },

	    postHTTPRequest: function postHTTPRequest(url, payload, callback) {

	        $.ajax({
	            type: 'POST',
	            url: url,
	            // post payload:
	            data: JSON.stringify(payload),
	            dataType: 'json',
	            contentType: "application/json",
	            success: function success(data, status, jqXHR) {

	                if (data.error) {
	                    Materialize.toast(data.error, 3000, 'toastError');
	                } else {
	                    if (callback) callback(data);
	                }
	            },
	            error: function error(jqXHR, status, _error) {
	                Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	            }
	        });
	    },

	    getHTTPRequest: function getHTTPRequest(url, payload, callback) {

	        $.ajax({
	            method: "GET",
	            url: url,
	            data: payload,
	            success: function success(data, status) {

	                if (data.error) {
	                    Materialize.toast(data.error, 3000, 'toastError');
	                } else {
	                    if (callback) callback(data);
	                }
	            },
	            error: function error(jqXHR, status, _error2) {
	                console.log("find user by id error");
	                Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	            }
	        });
	    }
	};

	module.exports = UserService;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	var UserService = __webpack_require__(17);

	var NavBarSearchItem = React.createClass({
	  displayName: "NavBarSearchItem",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  selectUser: function selectUser(e) {
	    console.log(e.currentTarget);
	  },
	  clickButton: function clickButton(e) {
	    e.stopPropagation();

	    this.props.invite(this.props.user);
	  },
	  render: function render() {

	    return React.createElement(
	      "li",
	      { className: "collection-item", onClick: this.selectUser },
	      this.props.user.firstname,
	      " ",
	      this.props.user.lastname,
	      React.createElement(
	        "i",
	        { onClick: this.clickButton, className: "material-icons send-invite-icon" },
	        "person_add"
	      )
	    );
	  }
	});

	module.exports = NavBarSearchItem;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	var UserService = __webpack_require__(17);

	var NavBarRequests = React.createClass({
	    displayName: "NavBarRequests",
	    getInitialState: function getInitialState() {
	        return {
	            requests: this.props.requests
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({
	            requests: nextProps.requests
	        });
	    },
	    acceptRequest: function acceptRequest(index, e) {
	        e.stopPropagation();

	        var requests = this.state.requests;
	        var request = this.state.requests[index];
	        this.props.acceptRequest(request, index);
	    },
	    render: function render() {

	        var self = this;

	        var requestsItems = this.state.requests.map(function (request, index) {

	            var requestFrom = request.user;
	            var fromFullname = requestFrom.firstname + " " + requestFrom.lastname;

	            return React.createElement(
	                "li",
	                { key: index, className: "collection-item requests-item" },
	                fromFullname,
	                React.createElement(
	                    "a",
	                    { className: "btn-floating", onClick: self.acceptRequest.bind(null, index) },
	                    React.createElement(
	                        "i",
	                        { className: "material-icons" },
	                        "add"
	                    )
	                )
	            );
	        });

	        return React.createElement(
	            "div",
	            { className: "requestsList" },
	            React.createElement(
	                "ul",
	                { className: "collection" },
	                requestsItems
	            )
	        );
	    }
	});

	module.exports = NavBarRequests;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavBar = __webpack_require__(15);
	var Footer = __webpack_require__(21);
	var FriendsGrid = __webpack_require__(22);
	var UserService = __webpack_require__(17);

	var Chat = __webpack_require__(24);

	var Home = React.createClass({
	  displayName: 'Home',
	  getInitialState: function getInitialState() {
	    return {
	      chat: null,
	      user: this.props.user
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      user: nextProps.user
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    // this.getUser();

	  },
	  refreshState: function refreshState(stateProperty) {
	    switch (stateProperty) {

	      case 'user':
	        this.getUser();

	    }
	  },
	  getUser: function getUser() {
	    var self = this;
	    UserService.get(localStorage.getItem('userId'), function (user) {
	      self.setState({
	        user: user
	      });
	    });
	  },
	  openChat: function openChat(user) {

	    if (this.state.chat) {
	      alert("un seul chat à la fois !");
	    } else {
	      this.setState({
	        chat: { target: user }
	      });
	    }
	  },
	  closeChat: function closeChat() {
	    this.setState({
	      chat: null
	    });
	  },
	  render: function render() {

	    var chat = React.createElement('div', null);

	    if (this.state.chat) chat = React.createElement(Chat, { target: this.state.chat.target, closeChat: this.closeChat });

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(FriendsGrid, { user: this.state.user, openChat: this.openChat }),
	      chat
	    );
	  }
	});

	module.exports = Home;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var Footer = React.createClass({
	  displayName: "Footer",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      "footer",
	      { className: "page-footer green accent-4" },
	      React.createElement(
	        "div",
	        { className: "container" },
	        React.createElement(
	          "div",
	          { className: "row" },
	          React.createElement(
	            "div",
	            { className: "col l6 s12" },
	            React.createElement(
	              "h5",
	              { className: "white-text" },
	              "minibook"
	            ),
	            React.createElement(
	              "p",
	              { className: "white-text text-lighten-4" },
	              "Le mini réseau social entièrement développé avec React !"
	            )
	          ),
	          React.createElement(
	            "div",
	            { className: "col l4 offset-l2 s12" },
	            React.createElement(
	              "h5",
	              { className: "white-text" },
	              "Links"
	            ),
	            React.createElement(
	              "ul",
	              null,
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { className: "grey-text text-lighten-3", href: "#!" },
	                  "Link 1"
	                )
	              ),
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { className: "grey-text text-lighten-3", href: "#!" },
	                  "Link 2"
	                )
	              ),
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { className: "grey-text text-lighten-3", href: "#!" },
	                  "Link 3"
	                )
	              ),
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { className: "grey-text text-lighten-3", href: "#!" },
	                  "Link 4"
	                )
	              )
	            )
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "footer-copyright" },
	        React.createElement(
	          "div",
	          { className: "container" },
	          "© 2016 Copyright Camille Bargoin",
	          React.createElement(
	            "a",
	            { className: "white-text text-lighten-4 right", href: "#!" },
	            "More Links"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Footer;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var FriendBox = __webpack_require__(23);
	var UserService = __webpack_require__(17);
	var config = __webpack_require__(11);

	var FriendGrid = React.createClass({
	  displayName: 'FriendGrid',


	  socket: null,

	  getInitialState: function getInitialState() {
	    if (this.props.user) {
	      return {
	        friendships: this.props.user.friends || []
	      };
	    }

	    return {
	      friendships: []
	    };
	  },
	  componentDidMount: function componentDidMount() {},
	  componentWillUnmount: function componentWillUnmount() {
	    // this.socket.off('user login');
	    // this.socket.off('user logout');
	    // this.socket.off('new friend');
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {

	    if (nextProps.user && nextProps.user._id) {

	      this.setState({
	        friendships: nextProps.user.friends || []
	      }, function () {

	        // this.socket = io("http://localhost:1337");
	        //
	        // console.log(config[process.env.NODE_ENV].websocket + ":" + localStorage.getItem('serverPort'));
	        // this.socket = io.connect(config[process.env.NODE_ENV].websocket + ":" + localStorage.getItem('serverPort'));

	        // this.socket.emit('room', nextProps.user._id);

	        // this.socket.on('user login', this.updateFriendOnlineStatus);
	        // this.socket.on('user logout', this.updateFriendOnlineStatus);
	        // this.socket.on('new friend', this.updateFriendList);     

	      });
	    }
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    $('.friendBox.tooltipped').tooltip({ delay: 50 });
	  },
	  updateFriendOnlineStatus: function updateFriendOnlineStatus(data) {

	    var friendships = this.state.friendships;

	    var updatedFriendships = friendships.map(function (friendship, index) {
	      if (friendship.user._id == data._id) friendship.user.online = data.online;

	      return friendship;
	    });

	    this.setState({
	      friendships: updatedFriendships
	    });
	  },
	  updateFriendList: function updateFriendList(data) {
	    console.log(data);
	    this.setState({
	      friendships: data.friends
	    });
	  },
	  render: function render() {

	    var self = this;
	    var friendBoxes = this.state.friendships.map(function (friendship, i) {
	      if (friendship.status == "accepted") {
	        return React.createElement(FriendBox, { friendship: friendship, key: i, openChat: self.props.openChat });
	      }
	    });

	    var width = Math.floor($(document).width() / 164) * 164 + "px";

	    return React.createElement(
	      'div',
	      { style: { textAlign: "center" } },
	      React.createElement(
	        'div',
	        { style: { display: "flex", flexWrap: "wrap", width: width, margin: "0 auto" } },
	        friendBoxes
	      )
	    );
	  }
	});

	module.exports = FriendGrid;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var browserHistory = __webpack_require__(5).browserHistory;

	var FriendBox = React.createClass({
	  displayName: 'FriendBox',
	  componentDidMount: function componentDidMount() {},
	  openFriendProfile: function openFriendProfile() {
	    $('.friendBox.tooltipped').tooltip("remove");
	    browserHistory.push('/profile/' + this.props.friendship.user._id);
	  },
	  openChat: function openChat(e) {
	    e.stopPropagation();

	    this.props.openChat(this.props.friendship.user);
	  },
	  render: function render() {

	    var lastPost = this.props.friendship.user.last_post || "";
	    var tooltip = void 0;

	    if (!lastPost || lastPost == "") {
	      var statusArray = ["Hasta la vista baby !", "Why so serious ?", "May the force be with you.", "I'll be back.", "Are you not entertained ?", "You talkin' to me ?", "I love the smell of Napalm in the morning", "I am your father", "I’m the king of the world !", "It’s alive! It’s alive !", "You shall not pass !", "Madness ? This is Sparta !", "Winter is coming.", "I see dead people"];
	      tooltip = statusArray[Math.floor(Math.random() * statusArray.length)];
	    } else if (lastPost.length < 50) tooltip = lastPost;else {
	      tooltip = lastPost.substr(0, 50) + "...";
	    }

	    var colorArray = ["#1ABC9C", "#2ECC71", "#3498DB", "#AF7AC4", "#34495E", "#F1C40F", "#E67E22", "#E74C3C", "#ECF0F1", "#AAB7B7"];

	    var backgroundColor = colorArray[Math.floor(Math.random() * colorArray.length)];

	    // console.log(this.props.friendship.user);
	    var avatar = React.createElement('div', null);
	    if (this.props.friendship.user.avatar) {
	      var url = this.props.friendship.user.avatar.replace("/upload/", "/upload/w_160,h_160,c_fill/");
	      avatar = React.createElement('img', { src: url });
	    }

	    var connectedColor = this.props.friendship.user.online ? "#00C853" : "red";

	    return React.createElement(
	      'div',
	      { onClick: this.openFriendProfile, className: 'friendBox hoverable tooltipped', 'data-position': 'bottom', 'data-delay': '50', 'data-tooltip': tooltip, style: { backgroundColor: backgroundColor } },
	      avatar,
	      React.createElement('div', { className: 'connexionStatus', style: { backgroundColor: connectedColor } }),
	      React.createElement(
	        'p',
	        { onClick: this.openChat },
	        this.props.friendship.user.firstname + " " + this.props.friendship.user.lastname
	      )
	    );
	  }
	});

	module.exports = FriendBox;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var ChatService = __webpack_require__(25);
	var Messages = __webpack_require__(26);

	var Chat = React.createClass({
	    displayName: 'Chat',
	    getInitialState: function getInitialState() {
	        return {
	            id: null,
	            messages: [],
	            target: this.props.target
	        };
	    },


	    refreshInterval: null,

	    onClose: function onClose() {
	        this.props.closeChat();
	    },
	    submitMessage: function submitMessage(e) {
	        e.preventDefault();

	        var newMessage = {
	            created_by: localStorage.getItem("userId"),
	            created_at: new Date().getTime(),
	            body: this.refs.messageInput.value
	        };

	        var messages = this.state.messages;
	        messages.push({
	            created_by: { _id: localStorage.getItem("userId") },
	            created_at: new Date().getTime(),
	            body: this.refs.messageInput.value
	        });
	        this.setState({
	            messages: messages
	        });

	        var self = this;
	        ChatService.create(this.state.id, newMessage, function (result) {

	            self.refs.messageInput.value = "";
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        var self = this;

	        this.openChat(function () {
	            self.startRefreshInterval();
	        });
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        clearTimeout(this.refreshInterval);
	    },
	    openChat: function openChat(callback) {

	        var self = this;

	        ChatService.openChat(this.state.target._id, function (result) {
	            if (result && result.discussion) {

	                self.setState({
	                    id: result.discussion._id
	                });

	                callback();
	            }
	        });
	    },
	    startRefreshInterval: function startRefreshInterval() {

	        var self = this;
	        var timer;

	        this.refreshInterval = setTimeout(delay, 0);
	        function delay() {
	            ChatService.get(self.state.id, function (result) {
	                if (result && result.discussion) {

	                    self.setState({
	                        messages: result.discussion.messages
	                    });
	                }
	            });
	            self.refreshInterval = setTimeout(delay, 3000);
	        }
	    },
	    render: function render() {

	        var messages = this.state.messages;
	        var targetName = this.state.target.firstname + " " + this.state.target.lastname;

	        return React.createElement(
	            'div',
	            { id: 'chatContainer', className: 'grey lighten-5 hoverable' },
	            React.createElement(
	                'div',
	                { className: 'chatTop green accent-4' },
	                React.createElement(
	                    'div',
	                    { className: 'white-text left username' },
	                    targetName
	                ),
	                React.createElement(
	                    'div',
	                    { onClick: this.onClose, className: 'closeButton waves-effect waves-light btn right light-blue darken-3' },
	                    React.createElement(
	                        'i',
	                        { className: 'material-icons small white-text' },
	                        'close'
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'chatBody', style: {} },
	                React.createElement(
	                    'div',
	                    { className: 'messagesListContainer' },
	                    React.createElement(Messages, { messages: this.state.messages })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'chatBottom', style: {} },
	                    React.createElement(
	                        'form',
	                        { id: 'chatInputForm', onSubmit: this.submitMessage },
	                        React.createElement(
	                            'div',
	                            { className: 'input-field' },
	                            React.createElement('input', { type: 'text', placeholder: 'Ton message...', ref: 'messageInput' })
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = Chat;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(11);

	var ChatService = {

	    openChat: function openChat(userId, callback) {

	        var payload = {
	            target: userId,
	            sessionId: localStorage.getItem("sessionId")
	        };

	        this.sendHTTPRequest(config[process.env.NODE_ENV].api + '/discussions/open', 'POST', JSON.stringify(payload), callback);
	    },

	    get: function get(discussionId, callback) {

	        var payload = {
	            discussionId: discussionId,
	            sessionId: localStorage.getItem("sessionId")
	        };

	        this.sendHTTPRequest(config[process.env.NODE_ENV].api + '/discussions/get', 'POST', JSON.stringify(payload), callback);
	    },

	    create: function create(discussionId, newMessage, callback) {

	        var payload = {
	            discussionId: discussionId,
	            message: newMessage,
	            sessionId: localStorage.getItem("sessionId")
	        };

	        this.sendHTTPRequest(config[process.env.NODE_ENV].api + '/discussions/newMessage', 'POST', JSON.stringify(payload), callback);
	    },

	    sendHTTPRequest: function sendHTTPRequest(url, method, payload, callback) {

	        $.ajax({
	            type: method,
	            url: url,
	            data: payload,
	            dataType: 'json',
	            contentType: "application/json",
	            success: function success(data, status, jqXHR) {

	                if (data) {

	                    if (data.error) {
	                        Materialize.toast(data.error, 3000, 'toastError');
	                    } else {
	                        if (callback) callback(data);
	                    }
	                } else {
	                    Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	                }
	            },
	            error: function error(jqXHR, status, _error) {
	                Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	            }
	        });
	    }
	};

	module.exports = ChatService;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var Messages = React.createClass({
	    displayName: "Messages",
	    getInitialState: function getInitialState() {
	        return {
	            messages: this.props.messages || []
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({
	            messages: nextProps.messages
	        });
	    },
	    render: function render() {

	        var texts = this.state.messages.map(function (message, i) {
	            console.log(message);
	            var avatar = "";

	            if (message.created_by.avatar) avatar = message.created_by.avatar.replace("/upload/", "/upload/w_30,h_30,c_fill/");

	            var className = "messageContainer";

	            if (message.created_by._id != localStorage.getItem("userId")) {
	                className += " stickRight";
	            }

	            return React.createElement(
	                "div",
	                { className: className, key: i },
	                React.createElement("img", { src: avatar, className: "circle", alt: "" }),
	                React.createElement(
	                    "p",
	                    { className: "message" },
	                    message.body
	                )
	            );
	        });

	        return React.createElement(
	            "div",
	            null,
	            texts
	        );
	    }
	});

	module.exports = Messages;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavBar = __webpack_require__(15);
	var Footer = __webpack_require__(21);
	var PostInput = __webpack_require__(28);
	var Wall = __webpack_require__(29);
	var FriendsList = __webpack_require__(33);
	var ProfileData = __webpack_require__(35);
	var config = __webpack_require__(11);
	var PostsService = __webpack_require__(37);
	var UserService = __webpack_require__(17);

	var ToolBar = __webpack_require__(38);

	var UserProfile = React.createClass({
	  displayName: 'UserProfile',
	  getInitialState: function getInitialState() {

	    console.log("profile initial state");

	    return {
	      display: 0,
	      user: {},
	      wall: [],
	      quote: ""
	    };
	  },
	  componentDidMount: function componentDidMount() {

	    console.log("component did mount");

	    var self = this;
	    $('.profile_parallax').parallax();

	    $('#profilePicture').append($.cloudinary.unsigned_upload_tag("ygdxw3yr", { cloud_name: 'minibook' }));

	    $('.cloudinary_fileupload').hide();

	    $('.cloudinary_fileupload').bind('cloudinarydone', function (e, data) {

	      self.updateProfile({
	        label: "avatar",
	        value: data.result.secure_url
	      });
	    });

	    var self = this;
	    this.findUserWallById(this.props.params.id, function (wall) {

	      self.setState({
	        user: wall.user,
	        wall: wall.posts
	      });

	      self.fetchRandomQuote(function (data) {
	        if (data && data.quote) self.setState({
	          quote: data.quote
	        });
	      });
	    });
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    $('.wallPost .tooltipped').tooltip({ delay: 50 });
	  },
	  findUserWallById: function findUserWallById(id, callback) {

	    $.ajax({
	      method: "GET",
	      url: config[process.env.NODE_ENV].api + '/users/wall/' + id,
	      data: { sessionId: localStorage.getItem("sessionId") },
	      success: function success(data, status) {

	        callback(data);
	      },
	      error: function error(jqXHR, status, _error) {
	        console.log("find user by id error");
	        Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	      }

	    });
	  },
	  fetchRandomQuote: function fetchRandomQuote(callback) {

	    $.ajax({
	      method: "GET",
	      url: config[process.env.NODE_ENV].api + '/quotes/random',
	      success: function success(data, status) {
	        callback(data);
	      },
	      error: function error(jqXHR, status, _error2) {
	        Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	      }

	    });
	  },
	  selectContent: function selectContent(index) {
	    this.setState({
	      display: index
	    });
	  },
	  createPost: function createPost(post) {

	    var self = this;
	    var user = this.state.user;
	    var wall = this.state.wall;

	    var newPost = {
	      body: post,
	      created_by: {
	        userId: localStorage.getItem('userId')
	      }
	    };

	    PostsService.create(newPost, user._id, function (result) {

	      self.setState({
	        wall: result.data.posts
	      });
	    });
	  },
	  postComment: function postComment(comment, postId) {

	    var self = this;
	    var user = this.state.user;
	    var wall = this.state.wall;

	    var newComment = {
	      body: comment,
	      created_by: {
	        userId: localStorage.getItem('userId')
	      }
	    };

	    PostsService.addComment(newComment, postId, function (result) {
	      self.setState({
	        wall: result.data.posts
	      });
	    });
	  },
	  selectAvatar: function selectAvatar() {
	    $('.cloudinary_fileupload').trigger('click');
	  },
	  updateProfile: function updateProfile(field) {

	    var user = this.state.user;

	    user[field.label] = field.value;
	    this.setState({
	      user: user
	    });

	    var updatedFields = {};
	    updatedFields[field.label] = field.value;

	    UserService.update(user._id, updatedFields, function () {
	      Materialize.toast("Champs modifié avec succès", 2000, 'toastSuccess');
	    });
	  },
	  render: function render() {

	    console.log("profile render");

	    var displayContent;

	    if (this.state.display === 0) displayContent = React.createElement(Wall, { posts: this.state.wall, postComment: this.postComment });else if (this.state.display == 1) displayContent = React.createElement(FriendsList, { friends: this.state.user.friends });else if (this.state.display == 2) displayContent = React.createElement(ProfileData, { profile: this.state.user });

	    var avatar = React.createElement(
	      'i',
	      { className: 'large material-icons' },
	      'add'
	    );
	    if (this.state.user.avatar) {
	      var url = this.state.user.avatar;
	      url = url.replace("/upload/", "/upload/w_200,h_200,c_fill/");
	      avatar = React.createElement('img', { src: url });
	    }

	    var background = "/images/user-background-day.jpg";

	    var hours = new Date().getHours();

	    if (hours > 5 && hours <= 10) {
	      background = "/images/user-background-morning.jpg";
	    } else if (hours > 10 && hours < 17) {
	      background = "/images/user-background-day.jpg";
	    } else if (hours >= 20 && hours <= 20) {
	      background = "/images/user-background-evening.jpg";
	    } else {
	      background = "/images/user-background-night.jpg";
	    }

	    return React.createElement(
	      'div',
	      { id: 'userProfile' },
	      React.createElement(
	        'div',
	        { className: 'parallax-container' },
	        React.createElement(
	          'div',
	          { className: 'profile_parallax' },
	          React.createElement('img', { src: background })
	        ),
	        React.createElement(
	          'div',
	          { id: 'profilePicture', className: 'hoverable', onClick: this.selectAvatar },
	          avatar
	        ),
	        React.createElement(
	          'div',
	          { id: 'profileHeadData' },
	          React.createElement(
	            'h1',
	            null,
	            this.state.user.firstname + " " + this.state.user.lastname
	          ),
	          React.createElement(
	            'blockquote',
	            null,
	            this.state.quote
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'container' },
	          React.createElement(ToolBar, { selectContent: this.selectContent }),
	          React.createElement(PostInput, { post: this.createPost })
	        )
	      ),
	      displayContent,
	      React.createElement('div', { style: { height: "350px" } })
	    );
	  }
	});

	module.exports = UserProfile;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var PostInput = React.createClass({
	  displayName: "PostInput",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  submitPost: function submitPost(e) {
	    e.preventDefault();
	    this.props.post(this.refs.postInput.value);

	    this.refs.postInput.value = "";
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "row postInputComponent" },
	      React.createElement(
	        "div",
	        { className: "card-panel hoverable col s8 offset-s2 m6 offset-m3" },
	        React.createElement(
	          "form",
	          { className: "input-field col s12", onSubmit: this.submitPost },
	          React.createElement("input", { id: "newPost", type: "text", className: "validate", ref: "postInput" }),
	          React.createElement(
	            "label",
	            { "for": "newPost" },
	            "Exprime-toi !"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = PostInput;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	var WallPost = __webpack_require__(30);

	var Wall = React.createClass({
	  displayName: "Wall",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    var posts = this.props.posts;
	    // posts.propAsort("created_at");

	    var self = this;
	    var wallPosts = this.props.posts.map(function (post, i) {
	      return React.createElement(WallPost, { post: post, key: i, postComment: self.props.postComment });
	    });

	    return React.createElement(
	      "div",
	      { className: "container" },
	      wallPosts
	    );
	  }
	});

	module.exports = Wall;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PostCommentsList = __webpack_require__(31);

	var WallPost = React.createClass({
	  displayName: 'WallPost',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  postComment: function postComment(e) {
	    e.preventDefault();

	    this.props.postComment(this.refs.commentInput.value, this.props.post._id);
	    this.refs.commentInput.value = "";
	  },
	  render: function render() {

	    var commentsContainer;

	    if (this.props.post.comments) {
	      commentsContainer = React.createElement(PostCommentsList, { comments: this.props.post.comments });
	    } else {
	      commentsContainer = React.createElement('div', null);+0;
	    }

	    var post = this.props.post;
	    var author = post.created_by;
	    var authorFullname = author ? author.firstname + " " + author.lastname : null;

	    var avatar = "";
	    if (author && author.avatar) {
	      avatar = author.avatar.replace("/upload/", "/upload/w_60,h_60,c_fill/");
	    }

	    return React.createElement(
	      'div',
	      { style: { margin: "50px 0" }, className: 'wallPost row' },
	      React.createElement(
	        'div',
	        { className: 'col l1 offset-l2 m1 offset-m1 s1' },
	        React.createElement('div', { style: { height: "60px", width: "60px", marginTop: "7px", background: "url(" + avatar + ")" }, className: 'blue tooltipped hoverable', 'data-position': 'left', 'data-delay': '50', 'data-tooltip': authorFullname })
	      ),
	      React.createElement(
	        'div',
	        { className: 'grey lighten-5 card-panel hoverable col l6 m8 offset-m1 s10 offset-s1' },
	        React.createElement(
	          'p',
	          { className: 'feedText' },
	          this.props.post.body
	        ),
	        commentsContainer
	      ),
	      React.createElement(
	        'form',
	        { className: 'input-field col l6 offset-l3 m8 offset-m3 s10 offset-s2', onSubmit: this.postComment },
	        React.createElement('input', { id: 'feedComment', type: 'text', className: 'validate', ref: 'commentInput' }),
	        React.createElement(
	          'label',
	          { 'for': 'feedComment' },
	          'Un commentaire ?'
	        )
	      )
	    );
	  }
	});

	module.exports = WallPost;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Comment = __webpack_require__(32);

	var PostCommentsList = React.createClass({
	  displayName: 'PostCommentsList',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    var comments = this.props.comments.map(function (comment, i) {
	      return React.createElement(Comment, { comment: comment, key: i });
	    });

	    return React.createElement(
	      'div',
	      null,
	      comments
	    );
	  }
	});

	module.exports = PostCommentsList;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var Comment = React.createClass({
	  displayName: "Comment",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    var comment = this.props.comment;
	    var author = comment.created_by;
	    var authorFullname = author ? author.firstname + " " + author.lastname : null;

	    return React.createElement(
	      "div",
	      { style: { marginTop: "20px" }, className: "card hoverable" },
	      React.createElement(
	        "p",
	        { style: { margin: 0, padding: "5px 20px 0" } },
	        comment.body
	      ),
	      React.createElement(
	        "p",
	        { style: { fontWeight: "bold", margin: "0 20px 0 0", padding: "0 0 5px 0", textAlign: "right" } },
	        authorFullname
	      )
	    );
	  }
	});

	module.exports = Comment;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var FriendsListItem = __webpack_require__(34);

	var FriendsList = React.createClass({
	  displayName: 'FriendsList',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    var friendsListItem = this.props.friends.map(function (friendship, index) {
	      if (friendship.status == "accepted") {
	        return React.createElement(FriendsListItem, { user: friendship.user, key: index });
	      }
	    });

	    return React.createElement(
	      'div',
	      { id: 'friendsList', className: 'container' },
	      React.createElement(
	        'ul',
	        { className: 'collection hoverable' },
	        friendsListItem
	      )
	    );
	  }
	});

	module.exports = FriendsList;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var browserHistory = __webpack_require__(5).browserHistory;

	var FriendsListItem = React.createClass({
	  displayName: 'FriendsListItem',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  displayProfile: function displayProfile(e) {
	    browserHistory.push("/profile/" + this.props.user._id);
	  },
	  render: function render() {

	    console.log(this.props.user);

	    var user = this.props.user;
	    var avatar = "";

	    if (user.avatar) avatar = user.avatar.replace("/upload/", "/upload/w_42,h_42,c_fill/");

	    return React.createElement(
	      'li',
	      { className: 'collection-item avatar' },
	      React.createElement('img', { onClick: this.displayProfile, src: avatar, alt: '', className: 'circle pointer' }),
	      React.createElement(
	        'span',
	        { className: 'title' },
	        user.firstname + " " + user.lastname
	      ),
	      React.createElement(
	        'a',
	        { onClick: this.displayProfile, className: 'secondary-content pointer' },
	        React.createElement(
	          'i',
	          { className: 'material-icons' },
	          'send'
	        )
	      )
	    );
	  }
	});

	module.exports = FriendsListItem;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var ProfileDataField = __webpack_require__(36);

	var ProfileData = React.createClass({
	  displayName: 'ProfileData',
	  getInitialState: function getInitialState() {
	    return {
	      edit: false
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    $('#genderSelect').material_select();
	  },
	  render: function render() {
	    console.log(this.props.profile);
	    var email = React.createElement('div', null);
	    if (this.props.profile._id == localStorage.getItem('userId')) {
	      email = React.createElement(ProfileDataField, { label: 'E-mail', fieldLabel: 'email', value: this.props.profile.email, index: '0', updateProfile: this.props.updateProfile });
	    }

	    return React.createElement(
	      'div',
	      { id: 'profileData', className: 'container' },
	      React.createElement(
	        'ul',
	        { className: 'collection hoverable' },
	        email,
	        React.createElement(ProfileDataField, { label: 'Prénom', fieldLabel: 'firstname', value: this.props.profile.firstname, index: '1', updateProfile: this.props.updateProfile }),
	        React.createElement(ProfileDataField, { label: 'Nom', fieldLabel: 'lastname', value: this.props.profile.lastname, index: '2', updateProfile: this.props.updateProfile }),
	        React.createElement(ProfileDataField, { label: 'Âge', fieldLabel: 'age', value: this.props.profile.age + " ans", index: '3', updateProfile: this.props.updateProfile }),
	        React.createElement(ProfileDataField, { label: 'Adresse', fieldLabel: 'address', value: this.props.profile.address, index: '5', updateProfile: this.props.updateProfile }),
	        React.createElement(ProfileDataField, { label: 'Ville', fieldLabel: 'city', value: this.props.profile.city, index: '6', updateProfile: this.props.updateProfile })
	      )
	    );
	  }
	});

	module.exports = ProfileData;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var config = __webpack_require__(11);

	var ProfileDataField = React.createClass({
	  displayName: 'ProfileDataField',
	  getInitialState: function getInitialState() {
	    return {
	      edit: false
	    };
	  },
	  edit: function edit() {
	    this.setState({
	      edit: true
	    });
	  },
	  save: function save(e) {
	    e.preventDefault();

	    this.props.updateProfile({
	      label: this.props.fieldLabel,
	      value: this.refs.input.value
	    });

	    this.setState({
	      edit: false
	    });
	  },
	  render: function render() {

	    if (this.state.edit) {
	      return React.createElement(
	        'li',
	        { className: 'collection-item row' },
	        React.createElement(
	          'form',
	          { onSubmit: this.save },
	          React.createElement(
	            'div',
	            { className: 'input-field col s12' },
	            React.createElement('input', { id: this.props.id, type: 'text', className: 'validate', onBlur: this.save, ref: 'input' }),
	            React.createElement(
	              'label',
	              { 'for': this.props.id },
	              this.props.label
	            )
	          )
	        )
	      );
	    }

	    var className = "collection-item row";

	    if (this.props.updateProfile) {
	      className += " personalDataField";
	    }

	    return React.createElement(
	      'li',
	      { className: className },
	      React.createElement(
	        'p',
	        { className: 'col s5' },
	        this.props.label
	      ),
	      React.createElement(
	        'p',
	        { className: 'col s5' },
	        this.props.value
	      ),
	      React.createElement(
	        'a',
	        { className: 'btn-floating btn-medium waves-effect waves-light green accent-4 right', onClick: this.edit },
	        React.createElement(
	          'i',
	          { className: 'material-icons' },
	          'edit'
	        )
	      )
	    );
	  }
	});

	module.exports = ProfileDataField;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// var $ = require('jquery');
	var config = __webpack_require__(11);

	var PostsService = {

	    getByUserId: function getByUserId(userId, callback) {

	        $.ajax({
	            type: 'GET',
	            url: config[process.env.NODE_ENV].api + '/posts/user/' + userId,
	            data: { sessionId: localStorage.getItem("sessionId") },
	            success: function success(data, status, jqXHR) {

	                if (data.error) {
	                    console.log(data.error);
	                    Materialize.toast(data.error, 3000, 'toastError');
	                } else {
	                    callback(data);
	                }
	            },
	            error: function error(jqXHR, status, _error) {
	                Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	            }
	        });
	    },

	    create: function create(newPost, target, callback) {

	        var payload = {
	            post: newPost,
	            sessionId: localStorage.getItem("sessionId"),
	            target: target
	        };

	        $.ajax({
	            type: 'POST',
	            url: config[process.env.NODE_ENV].api + '/posts/create',
	            // post payload:
	            data: JSON.stringify(payload),
	            dataType: 'json',
	            contentType: "application/json",
	            success: function success(data, status, jqXHR) {

	                if (data.error) {
	                    console.log(data.error);
	                    Materialize.toast(data.error, 3000, 'toastError');
	                } else {
	                    callback(data);
	                }
	            },
	            error: function error(jqXHR, status, _error2) {
	                Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	            }
	        });
	    },

	    addComment: function addComment(newComment, postId, callback) {

	        var payload = {
	            comment: newComment,
	            sessionId: localStorage.getItem("sessionId"),
	            postId: postId
	        };

	        $.ajax({
	            type: 'POST',
	            url: config[process.env.NODE_ENV].api + '/posts/addComment',
	            // post payload:
	            data: JSON.stringify(payload),
	            dataType: 'json',
	            contentType: "application/json",
	            success: function success(data, status, jqXHR) {

	                if (data.error) {
	                    console.log(data.error);
	                    Materialize.toast(data.error, 3000, 'toastError');
	                } else {
	                    callback(data);
	                }
	            },
	            error: function error(jqXHR, status, _error3) {
	                Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	            }

	        });
	    }

	};

	module.exports = PostsService;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var ToolBar = React.createClass({
	  displayName: "ToolBar",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  onClickButton: function onClickButton(index, obj) {

	    this.props.selectContent(index);
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "row profileToolBar" },
	      React.createElement(
	        "div",
	        { className: "col s8 offset-s2 " },
	        React.createElement(
	          "a",
	          { onClick: this.onClickButton.bind(this, 0), className: "waves-effect waves-light btn green accent-4" },
	          React.createElement(
	            "i",
	            { className: "material-icons left" },
	            "speaker_notes"
	          ),
	          "Journal"
	        ),
	        React.createElement(
	          "a",
	          { onClick: this.onClickButton.bind(this, 1), index: "1", className: "waves-effect waves-light btn green accent-4" },
	          React.createElement(
	            "i",
	            { className: "material-icons left" },
	            "supervisor_account"
	          ),
	          "Amis"
	        ),
	        React.createElement(
	          "a",
	          { onClick: this.onClickButton.bind(this, 2), index: "2", className: "waves-effect waves-light btn green accent-4" },
	          React.createElement(
	            "i",
	            { className: "material-icons left" },
	            "description"
	          ),
	          "Infos"
	        )
	      )
	    );
	  }
	});

	module.exports = ToolBar;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavBar = __webpack_require__(15);
	var Footer = __webpack_require__(21);
	var PostInput = __webpack_require__(28);
	var Wall = __webpack_require__(29);
	var FriendsList = __webpack_require__(33);
	var ProfileData = __webpack_require__(35);
	var config = __webpack_require__(11);
	var PostsService = __webpack_require__(37);
	var UserService = __webpack_require__(17);

	var ToolBar = __webpack_require__(38);

	var MyProfile = React.createClass({
	  displayName: 'MyProfile',
	  getInitialState: function getInitialState() {

	    console.log("profile initial state");

	    return {
	      display: 0,
	      user: {},
	      wall: []
	    };
	  },
	  componentDidMount: function componentDidMount() {

	    console.log("component did mount");

	    var self = this;
	    $('.profile_parallax').parallax();

	    $('#profilePicture').append($.cloudinary.unsigned_upload_tag("ygdxw3yr", { cloud_name: 'minibook' }));

	    $('.cloudinary_fileupload').hide();

	    $('.cloudinary_fileupload').bind('cloudinarydone', function (e, data) {

	      self.updateProfile({
	        label: "avatar",
	        value: data.result.secure_url
	      });
	    });

	    var self = this;

	    this.findUserWallById(localStorage.getItem('userId'), function (wall) {

	      self.setState({
	        user: wall.user,
	        wall: wall.posts
	      });

	      self.fetchRandomQuote(function (data) {
	        if (data && data.quote) self.setState({
	          quote: data.quote
	        });
	      });
	    });
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    $('.wallPost .tooltipped').tooltip({ delay: 50 });
	  },
	  findUserWallById: function findUserWallById(id, callback) {

	    $.ajax({
	      method: "GET",
	      url: config[process.env.NODE_ENV].api + '/users/wall/' + id,
	      data: { sessionId: localStorage.getItem("sessionId") },
	      success: function success(data, status) {

	        callback(data);
	      },
	      error: function error(jqXHR, status, _error) {
	        console.log("find user by id error");
	        Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	      }

	    });
	  },
	  fetchRandomQuote: function fetchRandomQuote(callback) {

	    $.ajax({
	      method: "GET",
	      url: config[process.env.NODE_ENV].api + '/quotes/random',
	      success: function success(data, status) {
	        callback(data);
	      },
	      error: function error(jqXHR, status, _error2) {
	        Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	      }

	    });
	  },
	  selectContent: function selectContent(index) {
	    this.setState({
	      display: index
	    });
	  },
	  createPost: function createPost(post) {

	    var self = this;
	    var user = this.state.user;
	    var wall = this.state.wall;

	    var newPost = {
	      body: post,
	      created_by: {
	        userId: localStorage.getItem('userId')
	      }
	    };

	    PostsService.create(newPost, user._id, function (result) {
	      console.log("posts service callback");
	      self.setState({
	        wall: result.data.posts
	      });
	    });
	  },
	  postComment: function postComment(comment, postId) {

	    var self = this;
	    var user = this.state.user;
	    var wall = this.state.wall;

	    var newComment = {
	      body: comment,
	      created_by: {
	        userId: localStorage.getItem('userId')
	      }
	    };

	    PostsService.addComment(newComment, postId, function (result) {

	      self.setState({
	        wall: result.data.posts
	      });
	    });
	  },
	  selectAvatar: function selectAvatar() {
	    $('.cloudinary_fileupload').trigger('click');
	  },
	  updateProfile: function updateProfile(field) {

	    var user = this.state.user;

	    user[field.label] = field.value;
	    this.setState({
	      user: user
	    });

	    var updatedFields = {};
	    updatedFields[field.label] = field.value;

	    UserService.update(user._id, updatedFields, function () {
	      Materialize.toast("Champs modifié avec succès", 2000, 'toastSuccess');
	    });
	  },
	  render: function render() {

	    console.log("my profile render");

	    var displayContent;

	    if (this.state.display === 0) displayContent = React.createElement(Wall, { posts: this.state.wall, postComment: this.postComment });else if (this.state.display == 1) displayContent = React.createElement(FriendsList, { friends: this.state.user.friends });else if (this.state.display == 2) displayContent = React.createElement(ProfileData, { profile: this.state.user, updateProfile: this.updateProfile });

	    console.log(this.state.user);

	    var avatar = React.createElement(
	      'i',
	      { className: 'large material-icons' },
	      'add'
	    );
	    if (this.state.user.avatar) {
	      var url = this.state.user.avatar;
	      url = url.replace("/upload/", "/upload/w_200,h_200,c_fill/");
	      avatar = React.createElement('img', { src: url });
	    }

	    var background = "/images/user-background-day.jpg";

	    var hours = new Date().getHours();

	    if (hours > 5 && hours <= 10) {
	      background = "/images/user-background-morning.jpg";
	    } else if (hours > 10 && hours < 17) {
	      background = "/images/user-background-day.jpg";
	    } else if (hours >= 20 && hours <= 20) {
	      background = "/images/user-background-evening.jpg";
	    } else {
	      background = "/images/user-background-night.jpg";
	    }

	    return React.createElement(
	      'div',
	      { id: 'userProfile' },
	      React.createElement(
	        'div',
	        { className: 'parallax-container' },
	        React.createElement(
	          'div',
	          { className: 'profile_parallax' },
	          React.createElement('img', { src: background })
	        ),
	        React.createElement(
	          'div',
	          { id: 'profilePicture', className: 'hoverable', onClick: this.selectAvatar },
	          avatar
	        ),
	        React.createElement(
	          'div',
	          { id: 'profileHeadData' },
	          React.createElement(
	            'h1',
	            null,
	            this.state.user.firstname + " " + this.state.user.lastname
	          ),
	          React.createElement(
	            'blockquote',
	            null,
	            this.state.quote
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'container' },
	          React.createElement(ToolBar, { selectContent: this.selectContent }),
	          React.createElement(PostInput, { post: this.createPost })
	        )
	      ),
	      displayContent,
	      React.createElement('div', { style: { height: "350px" } })
	    );
	  }
	});

	module.exports = MyProfile;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavBar = __webpack_require__(15);
	var MessageList = __webpack_require__(41);
	var MessageForm = __webpack_require__(44);
	var Pagination = __webpack_require__(46);
	var MessageService = __webpack_require__(45);

	var Inbox = React.createClass({
	  displayName: 'Inbox',
	  getInitialState: function getInitialState() {
	    return {
	      user: this.props.user,
	      messages: [],
	      showForm: false
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      user: nextProps.user
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    this.fetchMessages();
	  },
	  fetchMessages: function fetchMessages() {

	    var self = this;
	    MessageService.getInbox(function (inbox) {
	      if (inbox) {

	        console.log(inbox);
	        self.setState({
	          messages: inbox.messages
	        });
	      }
	    });
	  },
	  displayMessageForm: function displayMessageForm() {

	    var displayToggle = this.state.showForm;

	    this.setState({
	      showForm: !displayToggle
	    });
	  },
	  readMessage: function readMessage(id) {

	    var self = this;
	    var messages = this.state.messages;

	    MessageService.readMessage(id, this.state.user._id, function () {

	      for (var i = 0; i < messages.length; i++) {
	        if (messages[i]._id == id) {
	          messages[i].status = 'read';
	          break;
	        }
	      }

	      self.setState({
	        messages: messages
	      });
	    });
	  },
	  render: function render() {

	    var displayedComponent = React.createElement('div', null);
	    var messages = this.state.messages;
	    var buttonLabel = void 0;

	    if (this.state.showForm) {
	      buttonLabel = "Annuler";

	      displayedComponent = React.createElement(MessageForm, { users: this.state.user.friends });
	    } else {
	      buttonLabel = "Nouveau";

	      displayedComponent = React.createElement(MessageList, { messages: messages, readMessage: this.readMessage });
	    }

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'container' },
	        React.createElement(
	          'div',
	          { className: 'row', style: { marginTop: "50px" } },
	          React.createElement(
	            'div',
	            { className: 'col s2 offset-s10' },
	            React.createElement(
	              'a',
	              { className: 'waves-effect waves-light btn green accent-4', onClick: this.displayMessageForm },
	              React.createElement(
	                'i',
	                { className: 'material-icons left' },
	                'mode_edit'
	              ),
	              buttonLabel
	            )
	          )
	        ),
	        displayedComponent
	      )
	    );
	  }
	});

	module.exports = Inbox;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(3);
	var MessageLine = __webpack_require__(42);

	var MessageList = React.createClass({
	  displayName: 'MessageList',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  componentDidMount: function componentDidMount() {
	    $('#messageList').collapsible({
	      accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	    });
	  },
	  render: function render() {

	    console.log(this.props.messages);

	    var self = this;
	    var messageLines = this.props.messages.map(function (message, i) {
	      return React.createElement(MessageLine, _extends({}, message, { key: i, readMessage: self.props.readMessage }));
	    });

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'ul',
	        { id: 'messageList', className: 'collapsible popout', 'data-collapsible': 'accordion' },
	        messageLines
	      )
	    );
	  }
	});

	module.exports = MessageList;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var moment = __webpack_require__(43);

	var MessageLine = React.createClass({
	  displayName: 'MessageLine',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  displayMessage: function displayMessage(e) {
	    console.log(this.props);

	    if (this.props.status == "not_read") {
	      this.props.readMessage(this.props._id);
	    }
	  },
	  render: function render() {

	    var date = moment(this.props.created_at).format("MMMM Do");

	    var fullname = "";
	    if (this.props.created_by) fullname = this.props.created_by.firstname + " " + this.props.created_by.lastname;

	    var icon = this.props.status == "not_read" ? "whatshot" : "label";

	    var backgroundColor = this.props.status == "not_read" ? "#fff" : "#eee";

	    return React.createElement(
	      'li',
	      null,
	      React.createElement(
	        'div',
	        { className: 'collapsible-header', style: { backgroundColor: backgroundColor }, onClick: this.displayMessage },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'i',
	            { className: 'material-icons' },
	            icon
	          ),
	          React.createElement(
	            'span',
	            { className: 'col s2', style: { fontWeight: "bold" } },
	            fullname
	          ),
	          React.createElement(
	            'span',
	            { className: 'col s4' },
	            this.props.subject
	          ),
	          React.createElement(
	            'span',
	            { className: 'col s2 offset-s3', style: { textAlign: "right" } },
	            date
	          )
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'collapsible-body' },
	        React.createElement(
	          'p',
	          null,
	          this.props.body
	        )
	      )
	    );
	  }
	});

	module.exports = MessageLine;

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var MessageService = __webpack_require__(45);

	var MessageForm = React.createClass({
	  displayName: 'MessageForm',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  componentDidMount: function componentDidMount() {
	    $('select').material_select();
	  },
	  submitMessage: function submitMessage() {

	    var self = this;
	    var selectedUser = this.refs["userSelect"].value;
	    var subject = this.refs["messageSubject"].value;
	    var text = this.refs["messageBody"].value;

	    console.log(selectedUser);

	    var newMessage = {
	      subject: subject,
	      body: text,
	      created_by: {
	        userId: localStorage.getItem('userId')
	      }
	    };

	    MessageService.sendMessage(newMessage, selectedUser, function (result) {
	      Materialize.toast("Ton message a été envoyé !", 2000, 'toastSuccess');
	    });
	  },
	  render: function render() {

	    var options = this.props.users.map(function (obj, index) {
	      var name = obj.user.firstname + " " + obj.user.lastname;
	      var url = obj.user.avatar ? obj.user.avatar.replace("/upload/", "/upload/w_42,h_42,c_fill/") : "";
	      return React.createElement(
	        'option',
	        { value: obj.user._id, key: index, 'data-icon': url, className: 'left circle' },
	        name
	      );
	    });

	    return React.createElement(
	      'div',
	      { id: 'inboxForm', className: 'row card-panel hoverable white' },
	      React.createElement(
	        'form',
	        { className: 'col s12' },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'input-field col s6' },
	            React.createElement(
	              'select',
	              { defaultValue: 'default', ref: 'userSelect' },
	              React.createElement(
	                'option',
	                { value: 'default', disabled: true },
	                'Destinataire'
	              ),
	              options
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'input-field col s6' },
	            React.createElement('input', { id: 'messageSubject', type: 'text', className: 'validate', ref: 'messageSubject' }),
	            React.createElement(
	              'label',
	              { 'for': 'messageSubject' },
	              'Objet du message'
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'input-field col s10' },
	            React.createElement('textarea', { id: 'textarea1', className: 'materialize-textarea', ref: 'messageBody' }),
	            React.createElement(
	              'label',
	              { 'for': 'textarea1' },
	              'Ton message...'
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'col s2 offset-s10' },
	            React.createElement(
	              'a',
	              { className: 'waves-effect waves-light btn green accent-4', onClick: this.submitMessage },
	              React.createElement(
	                'i',
	                { className: 'material-icons left' },
	                'done'
	              ),
	              'envoyer'
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = MessageForm;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// var $ = require('jquery');
	var config = __webpack_require__(11);

	var MessageService = {
	    getInbox: function getInbox(callback) {

	        var payload = {
	            sessionId: localStorage.getItem("sessionId")
	        };

	        this.sendHTTPRequest(config[process.env.NODE_ENV].api + '/messages/inbox', "GET", payload, callback);
	    },
	    sendMessage: function sendMessage(newMessage, target, callback) {

	        var payload = {
	            message: newMessage,
	            sessionId: localStorage.getItem("sessionId"),
	            target: target
	        };

	        this.sendHTTPRequest(config[process.env.NODE_ENV].api + '/messages/new', "POST", JSON.stringify(payload), callback);
	    },
	    readMessage: function readMessage(messageId, userId, callback) {

	        var payload = {
	            messageId: messageId,
	            userId: userId,
	            sessionId: localStorage.getItem("sessionId")
	        };

	        this.sendHTTPRequest(config[process.env.NODE_ENV].api + '/messages/read', "POST", JSON.stringify(payload), callback);
	    },


	    sendHTTPRequest: function sendHTTPRequest(url, method, payload, callback) {

	        $.ajax({
	            type: method,
	            url: url,
	            data: payload,
	            dataType: 'json',
	            contentType: "application/json",
	            success: function success(data, status, jqXHR) {

	                if (data) {

	                    if (data.error) {
	                        Materialize.toast(data.error, 3000, 'toastError');
	                    } else {
	                        if (callback) callback(data);
	                    }
	                } else {
	                    Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	                }
	            },
	            error: function error(jqXHR, status, _error) {
	                Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
	            }
	        });
	    }

	};

	module.exports = MessageService;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var Pagination = React.createClass({
	  displayName: "Pagination",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    return React.createElement(
	      "ul",
	      { className: "pagination" },
	      React.createElement(
	        "li",
	        { className: "disabled" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          React.createElement(
	            "i",
	            { className: "material-icons transparent", style: { color: "#00C853" } },
	            "chevron_left"
	          )
	        )
	      ),
	      React.createElement(
	        "li",
	        { className: "active" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          "1"
	        )
	      ),
	      React.createElement(
	        "li",
	        { className: "waves-effect" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          "2"
	        )
	      ),
	      React.createElement(
	        "li",
	        { className: "waves-effect" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          "3"
	        )
	      ),
	      React.createElement(
	        "li",
	        { className: "waves-effect" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          "4"
	        )
	      ),
	      React.createElement(
	        "li",
	        { className: "waves-effect" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          "5"
	        )
	      ),
	      React.createElement(
	        "li",
	        { className: "waves-effect" },
	        React.createElement(
	          "a",
	          { href: "#!" },
	          React.createElement(
	            "i",
	            { className: "material-icons transparent", style: { color: "#00C853" } },
	            "chevron_right"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Pagination;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavBar = __webpack_require__(15);
	var UserList = __webpack_require__(48);
	var Stats = __webpack_require__(50);
	var UserService = __webpack_require__(17);

	var Admin = React.createClass({
	  displayName: 'Admin',

	  socket: null,
	  getInitialState: function getInitialState() {
	    return {
	      users: []
	    };
	  },


	  contextTypes: {
	    router: React.PropTypes.object
	  },

	  componentDidMount: function componentDidMount() {
	    $('#adminTabs ul.tabs').tabs();

	    this.getUsers();
	  },
	  getUsers: function getUsers() {

	    var self = this;
	    UserService.getAll(function (users) {
	      self.setState({
	        users: users
	      });
	    });
	  },
	  render: function render() {

	    var users = this.state.users;

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'container' },
	        React.createElement(
	          'div',
	          { id: 'adminTabs', className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'col s12' },
	            React.createElement(
	              'ul',
	              { className: 'tabs transparent' },
	              React.createElement(
	                'li',
	                { className: 'tab col s6' },
	                React.createElement(
	                  'a',
	                  { className: 'active', href: '#users' },
	                  'Utilisateurs'
	                )
	              ),
	              React.createElement(
	                'li',
	                { className: 'tab col s6' },
	                React.createElement(
	                  'a',
	                  { href: '#stats' },
	                  'Statistiques'
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { id: 'users', className: 'col s12' },
	            React.createElement(UserList, { users: users })
	          ),
	          React.createElement(
	            'div',
	            { id: 'stats', className: 'col s12' },
	            React.createElement(Stats, { users: users })
	          ),
	          React.createElement(
	            'div',
	            { id: 'test3', className: 'col s12' },
	            'Test 3'
	          ),
	          React.createElement(
	            'div',
	            { id: 'test4', className: 'col s12' },
	            'Test 4'
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Admin;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(3);
	var UserListItem = __webpack_require__(49);

	var UserList = React.createClass({
	  displayName: 'UserList',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    console.log(this.props.users);

	    var userLines = this.props.users.map(function (user, i) {
	      return React.createElement(UserListItem, _extends({}, user, { key: i }));
	    });

	    return React.createElement(
	      'div',
	      { id: 'userList' },
	      React.createElement(
	        'h1',
	        null,
	        'Liste des utilisateurs'
	      ),
	      React.createElement(
	        'ul',
	        { className: 'collection hoverable' },
	        userLines
	      )
	    );
	  }
	});

	module.exports = UserList;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var moment = __webpack_require__(43);
	var browserHistory = __webpack_require__(5).browserHistory;
	var UserService = __webpack_require__(17);

	var UserListItem = React.createClass({
	  displayName: 'UserListItem',
	  getInitialState: function getInitialState() {
	    return {
	      user: this.props
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      user: nextProps
	    });
	  },
	  displayProfile: function displayProfile() {
	    browserHistory.push("/profile/" + this.props._id);
	  },
	  handleSwitch: function handleSwitch(e) {

	    var user = jQuery.extend({}, this.state.user);

	    if (user.role % 10 == 0) {
	      user.role = parseInt(user.role, 10) / 10;
	      console.log(user.role);
	    } else {
	      user.role = parseInt(user.role, 10) * 10;
	      console.log(user.role);
	    }

	    var updatedFields = {
	      role: user.role
	    };

	    var self = this;

	    UserService.update(user._id, updatedFields, function () {

	      self.setState({
	        user: user
	      });
	    });
	  },
	  render: function render() {

	    var registerDate = moment(this.state.created_at);

	    var url = "";
	    if (this.state.user.avatar) {
	      url = this.state.user.avatar.replace("/upload/", "/upload/w_42,h_42,c_fill/");
	    }

	    var friendships = this.state.user.friends;
	    var friendsNumber = 0,
	        sentInvitesNumber = 0,
	        receivedInvitesNumber = 0;

	    for (var i = 0; i < friendships.length; i++) {
	      if (friendships[i].status == "accepted") friendsNumber++;else if (friendships[i].status == "pending") receivedInvitesNumber++;else if (friendships[i].status == "sentRequest") sentInvitesNumber++;
	    }

	    var blocked = false;
	    var cssClass = "collection-item avatar";

	    if (this.state.user.role == 2) {
	      cssClass += " admin";
	    } else if (this.state.user.role % 10 == 0) {
	      cssClass += " blocked";
	      blocked = true;
	    }

	    return React.createElement(
	      'li',
	      { className: cssClass },
	      React.createElement(
	        'a',
	        { onClick: this.displayProfile },
	        React.createElement('img', { src: url, alt: '', className: 'circle' })
	      ),
	      React.createElement(
	        'span',
	        { className: 'title', style: { fontWeight: "bold" } },
	        this.state.user.firstname + " " + this.state.user.lastname
	      ),
	      React.createElement(
	        'p',
	        null,
	        'Date d\'inscription: ',
	        React.createElement(
	          'strong',
	          null,
	          registerDate.format("DD/MM/YYYY")
	        ),
	        React.createElement('br', null),
	        'Amis: ',
	        React.createElement(
	          'strong',
	          null,
	          friendsNumber
	        ),
	        ' / Invitations envoyées: ',
	        React.createElement(
	          'strong',
	          null,
	          sentInvitesNumber
	        ),
	        ' / Invitations en attentes: ',
	        React.createElement(
	          'strong',
	          null,
	          receivedInvitesNumber
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'switch' },
	        React.createElement(
	          'label',
	          null,
	          React.createElement('input', { type: 'checkbox', checked: blocked, onChange: this.handleSwitch, ref: 'switch' }),
	          React.createElement('span', { className: 'lever' }),
	          'Bloqué'
	        )
	      ),
	      React.createElement(
	        'a',
	        { onClick: this.displayProfile, className: 'secondary-content' },
	        React.createElement(
	          'i',
	          { className: 'material-icons' },
	          'send'
	        )
	      )
	    );
	  }
	});

	module.exports = UserListItem;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var Stats = React.createClass({
	  displayName: "Stats",
	  getInitialState: function getInitialState() {
	    return {
	      users: this.props.users || []
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      users: nextProps.users
	    });
	  },
	  componentDidUpdate: function componentDidUpdate() {

	    var cat1 = 0,
	        cat2 = 0,
	        cat3 = 0,
	        cat4 = 0;
	    var cat1Ratio = 0,
	        cat2Ratio = 0,
	        cat3Ratio = 0,
	        cat4Ratio = 0;
	    var total = 0;
	    for (var i = 0; i < this.state.users.length; i++) {
	      var user = this.state.users[i];
	      if (user.age) {
	        total++;
	        if (user.age <= 18) cat1++;else if (user.age <= 30) cat2++;else if (user.age <= 50) cat3++;else cat4++;
	      }
	    }

	    cat1Ratio = Math.round(cat1 / total * 100);
	    cat2Ratio = Math.round(cat2 / total * 100);
	    cat3Ratio = Math.round(cat3 / total * 100);
	    cat4Ratio = Math.round(cat4 / total * 100);

	    var chart = new CanvasJS.Chart("chartContainer", {
	      title: {
	        text: "Répartition des utilisateurs par tranche d'âge",
	        fontFamily: "Impact",
	        fontWeight: "normal"
	      },

	      legend: {
	        verticalAlign: "bottom",
	        horizontalAlign: "center"
	      },
	      data: [{
	        //startAngle: 45,
	        indexLabelFontSize: 20,
	        indexLabelFontFamily: "Garamond",
	        indexLabelFontColor: "darkgrey",
	        indexLabelLineColor: "darkgrey",
	        indexLabelPlacement: "outside",
	        type: "doughnut",
	        showInLegend: true,
	        dataPoints: [{ y: cat1Ratio, legendText: "Moins de 18 ans " + cat1Ratio + "%", indexLabel: "Moins de 18 ans " + cat1Ratio + "%" }, { y: cat2Ratio, legendText: "Entre 18 et 30 ans " + cat2Ratio + "%", indexLabel: "Entre 18 et 30 ans " + cat2Ratio + "%" }, { y: cat3Ratio, legendText: "Entre 30 et 50 ans " + cat3Ratio + "%", indexLabel: "Entre 30 et 50 ans " + cat3Ratio + "%" }, { y: cat4Ratio, legendText: "50 ans et plus " + cat4Ratio + "%", indexLabel: "50 ans et plus " + cat4Ratio + "%" }]
	      }]
	    });

	    chart.render();
	  },
	  render: function render() {

	    return React.createElement(
	      "div",
	      { id: "stats" },
	      React.createElement(
	        "h1",
	        { style: {} },
	        "Statistiques"
	      ),
	      React.createElement(
	        "div",
	        null,
	        React.createElement("div", { id: "chartContainer", style: { height: "300px", width: "100%" } })
	      )
	    );
	  }
	});

	module.exports = Stats;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Auth = __webpack_require__(9);
	var browserHistory = __webpack_require__(5).browserHistory;

	var Logout = React.createClass({
	  displayName: 'Logout',
	  getInitialState: function getInitialState() {
	    return {
	      loggedOut: false
	    };
	  },
	  componentWillMount: function componentWillMount() {

	    var self = this;

	    Auth.logout(function () {
	      self.props.destroyUser();
	      self.setState({
	        loggedOut: true
	      });
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    setTimeout(function () {
	      browserHistory.push('/');
	    }, 2000);
	  },
	  render: function render() {

	    console.log("render");

	    var message = this.state.loggedOut ? "A bientôt !" : "Déconnexion en cours...";

	    return React.createElement(
	      'div',
	      { className: 'container' },
	      React.createElement(
	        'div',
	        { className: 'row', style: { paddingTop: "15%" } },
	        React.createElement(
	          'div',
	          { className: 'col s12' },
	          React.createElement(
	            'p',
	            { style: { color: "white" } },
	            message
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Logout;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Auth = __webpack_require__(9);
	var browserHistory = __webpack_require__(5).browserHistory;

	var Logout = React.createClass({
	  displayName: 'Logout',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  componentWillMount: function componentWillMount() {},
	  goHome: function goHome() {
	    browserHistory.push('/home');
	  },
	  render: function render() {

	    return React.createElement(
	      'div',
	      { className: 'container' },
	      React.createElement(
	        'div',
	        { className: 'row', style: { paddingTop: "15%" } },
	        React.createElement(
	          'div',
	          { className: 'col s12' },
	          React.createElement(
	            'p',
	            { style: { color: "white" } },
	            'Désolé, Vous n\'avez pas accès à cette partie du site :\'('
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'col s1' },
	          React.createElement(
	            'a',
	            { className: 'waves-effect waves-light btn col s12 green accent-4', onClick: this.goHome },
	            'Accueil'
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Logout;

/***/ }
/******/ ]);