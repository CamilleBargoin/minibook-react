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

	//
	// SESSIONS
	//
	// var cookieParser = require('cookie-parser');
	// var session = require('express-session');
	// var sessionFileStore = require('session-file-store');
	// var ExpressSessionFileStore = sessionFileStore(session);

	// var fileStore = new ExpressSessionFileStore({
	//   ttl:3600,
	//   path:'./sessions'
	// });

	var app = express();
	// app.use(compression());

	// serve our static stuff like index.css
	//app.use(express.static(__dirname));
	//app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	// app.use(session({
	//   secret: '1a9b829823448061ed5931380efc6c6a',
	//   resave: true,
	//   saveUninitialized: true,
	//   store: fileStore
	// }));

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
	  return '<!doctype html public="storage">' + '<html>' + '<meta charset=utf-8/>' + '<title>My First React Router App</title>' + '<div id=app>${appHtml}</div>' + '<script src="/bundle.js"></script>';
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

	// var TodosApp = require("./components/TodosApp.jsx");
	var Users = __webpack_require__(7);
	var Landing = __webpack_require__(9);
	var App = __webpack_require__(12);

	var Home = __webpack_require__(13);
	var UserProfile = __webpack_require__(19);

	var auth = __webpack_require__(30);

	module.exports = React.createElement(
	  Route,
	  { path: '/', component: App },
	  React.createElement(IndexRoute, { component: Landing }),
	  React.createElement(Route, { path: '/users', component: Users }),
	  React.createElement(Route, { path: '/home', component: Home, onEnter: requireAuth }),
	  React.createElement(Route, { path: '/profile', component: UserProfile, onEnter: requireAuth })
	);

	function requireAuth(nextState, replace) {
	  if (!auth.loggedIn()) {
	    replace({
	      pathname: '/',
	      state: { nextPathname: nextState.location.pathname }
	    });
	  }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavLink = __webpack_require__(8);
	var Users = React.createClass({
	  displayName: 'Users',


	  getInitialState: function getInitialState() {
	    return {
	      test: 'foo'
	    };
	  },
	  contextTypes: {
	    router: React.PropTypes.object
	  },
	  render: function render() {

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        ' USERS !!'
	      )
	    );
	  }

	});

	module.exports = Users;

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var LoginBox = __webpack_require__(10);
	var RegisterBox = __webpack_require__(11);

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

	    var box;
	    if (this.state.showLogin) {
	      box = React.createElement(
	        'div',
	        null,
	        React.createElement(LoginBox, null),
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);

	var browserHistory = __webpack_require__(5).browserHistory;

	var LoginBox = React.createClass({
	  displayName: 'LoginBox',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  login: function login() {

	    browserHistory.push('/home');
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
	            React.createElement('input', { id: 'email', type: 'text', className: 'validate' }),
	            React.createElement(
	              'label',
	              { 'for': 'email' },
	              'e-mail'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'input-field col s12' },
	            React.createElement('input', { id: 'password', type: 'text', className: 'validate' }),
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var browserHistory = __webpack_require__(5).browserHistory;

	var RegisterBox = React.createClass({
	  displayName: 'RegisterBox',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  register: function register(e) {

	    e.preventDefault();

	    var newUser = {
	      firstName: this.refs.firstname.value,
	      lastName: this.refs.lastname.value,
	      email: this.refs.email.value,
	      password: this.refs.password.value
	    };

	    console.log(newUser);

	    $.ajax({
	      type: 'POST',
	      url: 'http://localhost:3000/users/register',
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
	            req.session.test = "ceciestuntest";
	            browserHistory.push('/home');
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavLink = __webpack_require__(8);
	var IndexLink = __webpack_require__(5).IndexLink;

	var App = React.createClass({
	  displayName: 'App',


	  getInitialState: function getInitialState() {
	    return {
	      test: "test"
	    };
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { style: { height: "100%" } },
	      this.props.children
	    );
	  }

	});

	module.exports = App;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavBar = __webpack_require__(14);
	var Footer = __webpack_require__(15);
	var FriendBoxContainer = __webpack_require__(16);
	var FindUser = __webpack_require__(18);

	var Home = React.createClass({
	  displayName: 'Home',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(NavBar, null),
	      React.createElement(FindUser, null),
	      React.createElement(Footer, null)
	    );
	  }
	});

	module.exports = Home;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var NavBar = React.createClass({
	  displayName: "NavBar",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "navbar-fixed " },
	      React.createElement(
	        "nav",
	        { className: "green accent-4" },
	        React.createElement(
	          "div",
	          { className: "nav-wrapper" },
	          React.createElement(
	            "a",
	            { href: "/home", className: "brand-logo" },
	            "minibook"
	          ),
	          React.createElement(
	            "ul",
	            { className: "right hide-on-med-and-down" },
	            React.createElement(
	              "li",
	              null,
	              React.createElement(
	                "a",
	                { href: "/profile" },
	                "Mon profil"
	              )
	            ),
	            React.createElement(
	              "li",
	              null,
	              React.createElement(
	                "a",
	                { href: "badges.html" },
	                "Components"
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = NavBar;

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var FriendBox = __webpack_require__(17);

	var FriendBoxContainer = React.createClass({
	  displayName: 'FriendBoxContainer',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {

	    var friends = [{
	      name: "albert",
	      color: "#47B8E0"
	    }, {
	      name: "Bertrand",
	      color: "#FFC952"
	    }, {
	      name: "Camille",
	      color: "#FF7473"
	    }, {
	      name: "Donald",
	      color: "#47B8E0"
	    }, {
	      name: "Etienne",
	      color: "#FFC952"
	    }, {
	      name: "Francois",
	      color: "#FF7473"
	    }, {
	      name: "Gertrude",
	      color: "#47B8E0"
	    }, {
	      name: "Henry",
	      color: "#FFC952"
	    }, {
	      name: "Igor",
	      color: "#FF7473"
	    }, {
	      name: "Janine",
	      color: "#47B8E0"
	    }, {
	      name: "Kamel",
	      color: "#FFC952"
	    }, {
	      name: "Léonidas",
	      color: "#FF7473"
	    }, {
	      name: "Marine",
	      color: "#47B8E0"
	    }, {
	      name: "Noël",
	      color: "#FFC952"
	    }, {
	      name: "Ophélie",
	      color: "#FF7473"
	    }, {
	      name: "Patrick",
	      color: "#47B8E0"
	    }, {
	      name: "Quiburn",
	      color: "#FFC952"
	    }, {
	      name: "Rahan",
	      color: "#FF7473"
	    }, {
	      name: "Sylvain",
	      color: "#47B8E0"
	    }, {
	      name: "Théodore",
	      color: "#FFC952"
	    }, {
	      name: "Ursula",
	      color: "#FF7473"
	    }, {
	      name: "Voldemort",
	      color: "#47B8E0"
	    }, {
	      name: "Wanda",
	      color: "#FFC952"
	    }, {
	      name: "Xavier",
	      color: "#FF7473"
	    }, {
	      name: "Yvette",
	      color: "#47B8E0"
	    }, {
	      name: "Zoé",
	      color: "#FFC952"
	    }];

	    var friendBoxes = friends.map(function (friend, i) {
	      return React.createElement(FriendBox, { name: friend.name, key: i, color: friend.color });
	    });

	    return React.createElement(
	      'div',
	      { style: { overflow: "hidden", whiteSpace: "nowrap" } },
	      friendBoxes
	    );
	  }
	});

	module.exports = FriendBoxContainer;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var FriendBox = React.createClass({
	  displayName: "FriendBox",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "friendBox hoverable", style: { backgroundColor: this.props.color } },
	      React.createElement(
	        "p",
	        null,
	        this.props.name
	      )
	    );
	  }
	});

	module.exports = FriendBox;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var FindUser = React.createClass({
	  displayName: "FindUser",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "row", style: { marginTop: "75px" } },
	      React.createElement(
	        "div",
	        { className: "card-panel hoverable col s8 offset-s2 m6 offset-m3" },
	        React.createElement(
	          "p",
	          { className: "white-text" },
	          "Recherche un membre dans la communauté !"
	        ),
	        React.createElement(
	          "form",
	          null,
	          React.createElement(
	            "div",
	            { className: "input-field col s12" },
	            React.createElement("input", { id: "newFeed", type: "text", className: "validate" }),
	            React.createElement(
	              "label",
	              { "for": "newFeed" },
	              "nom ou prénom"
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = FindUser;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var NavBar = __webpack_require__(14);
	var Footer = __webpack_require__(15);
	var PostNewFeed = __webpack_require__(20);
	var Wall = __webpack_require__(21);
	var FriendsList = __webpack_require__(25);
	var ProfileData = __webpack_require__(27);

	var ToolBar = __webpack_require__(29);

	var UserProfile = React.createClass({
	  displayName: 'UserProfile',
	  getInitialState: function getInitialState() {
	    return {
	      display: 0
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    $('.profile_parallax').parallax();
	  },
	  selectContent: function selectContent(index) {
	    console.log(index);
	    this.setState({
	      display: index
	    });
	  },
	  render: function render() {

	    var displayContent;

	    if (this.state.display === 0) displayContent = React.createElement(Wall, null);else if (this.state.display == 1) displayContent = React.createElement(FriendsList, null);else if (this.state.display == 2) displayContent = React.createElement(ProfileData, null);

	    return React.createElement(
	      'div',
	      { id: 'userProfile' },
	      React.createElement(NavBar, null),
	      React.createElement(
	        'div',
	        { className: 'parallax-container' },
	        React.createElement(
	          'div',
	          { className: 'profile_parallax' },
	          React.createElement('img', { src: '/images/user-background1.jpg' })
	        ),
	        React.createElement(
	          'div',
	          { id: 'profilePicture', className: 'hoverable' },
	          React.createElement(
	            'i',
	            { className: 'large material-icons' },
	            'add'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'container' },
	          React.createElement(ToolBar, { selectContent: this.selectContent }),
	          React.createElement(PostNewFeed, null)
	        )
	      ),
	      displayContent,
	      React.createElement('div', { style: { height: "350px" } }),
	      React.createElement(Footer, null)
	    );
	  }
	});

	module.exports = UserProfile;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var PostNewFeed = React.createClass({
	  displayName: "PostNewFeed",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "row postNewFeedBox" },
	      React.createElement(
	        "div",
	        { className: "card-panel hoverable col s8 offset-s2 m6 offset-m3" },
	        React.createElement(
	          "div",
	          { className: "input-field col s12" },
	          React.createElement("input", { id: "newFeed", type: "text", className: "validate" }),
	          React.createElement(
	            "label",
	            { "for": "newFeed" },
	            "Exprime-toi !"
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = PostNewFeed;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	var WallFeed = __webpack_require__(22);

	var Wall = React.createClass({
	  displayName: "Wall",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "container" },
	      React.createElement(WallFeed, null),
	      React.createElement(WallFeed, null),
	      React.createElement(WallFeed, null),
	      React.createElement(WallFeed, null),
	      React.createElement(WallFeed, null),
	      React.createElement(WallFeed, null),
	      React.createElement(WallFeed, null),
	      React.createElement(WallFeed, null),
	      React.createElement(WallFeed, null),
	      React.createElement(WallFeed, null)
	    );
	  }
	});

	module.exports = Wall;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var FeedCommentBox = __webpack_require__(23);

	var WallFeed = React.createClass({
	  displayName: 'WallFeed',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { style: { margin: "50px 0" }, className: 'wallFeed row' },
	      React.createElement(
	        'div',
	        { className: 'col l1 offset-l2 m1 offset-m1 s1' },
	        React.createElement('div', { style: { height: "60px", width: "60px", marginTop: "7px" }, className: 'blue tooltipped hoverable', 'data-position': 'left', 'data-delay': '50', 'data-tooltip': 'Camille Bargoin' })
	      ),
	      React.createElement(
	        'div',
	        { className: 'grey lighten-5 card-panel hoverable col l6 m8 offset-m1 s10 offset-s1' },
	        React.createElement(
	          'p',
	          { className: 'feedText' },
	          'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'
	        ),
	        React.createElement(FeedCommentBox, null)
	      ),
	      React.createElement(
	        'div',
	        { className: 'input-field col l6 offset-l3 m8 offset-m3 s10 offset-s2' },
	        React.createElement('input', { id: 'feedAComment', type: 'text', className: 'validate' }),
	        React.createElement(
	          'label',
	          { 'for': 'feedAComment' },
	          'Un commentaire ?'
	        )
	      )
	    );
	  }
	});

	module.exports = WallFeed;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Comment = __webpack_require__(24);

	var FeedCommentBox = React.createClass({
	  displayName: 'FeedCommentBox',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(Comment, { body: 'Yeah ca claque!', author: 'John Rambo' }),
	      React.createElement(Comment, { body: 'Lolilol', author: 'Miley Cirus' }),
	      React.createElement(Comment, { body: 'heuuuu...', author: 'Cmd Cousteau' })
	    );
	  }
	});

	module.exports = FeedCommentBox;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var Comment = React.createClass({
	  displayName: "Comment",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { style: { marginTop: "20px" }, className: "card hoverable" },
	      React.createElement(
	        "p",
	        { style: { margin: 0, padding: "5px 20px 0" } },
	        "\"",
	        this.props.body,
	        "\""
	      ),
	      React.createElement(
	        "p",
	        { style: { fontWeight: "bold", margin: "0 20px 0 0", padding: "0 0 5px 0", textAlign: "right" } },
	        this.props.author
	      )
	    );
	  }
	});

	module.exports = Comment;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var FriendsListItem = __webpack_require__(26);

	var FriendsList = React.createClass({
	  displayName: 'FriendsList',
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { id: 'friendsList', className: 'container' },
	      React.createElement(
	        'ul',
	        { className: 'collection hoverable' },
	        React.createElement(FriendsListItem, { name: 'Chuck Norris' }),
	        React.createElement(FriendsListItem, { name: 'Jean-CLaude VanDamme' }),
	        React.createElement(FriendsListItem, { name: 'Steven Seagal' }),
	        React.createElement(FriendsListItem, { name: 'Kurt Russel' })
	      )
	    );
	  }
	});

	module.exports = FriendsList;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var FriendsListItem = React.createClass({
	  displayName: "FriendsListItem",
	  getInitialState: function getInitialState() {
	    return {};
	  },
	  render: function render() {
	    return React.createElement(
	      "li",
	      { className: "collection-item avatar" },
	      React.createElement("img", { src: "http://lorempixel.com/42/42/people", alt: "", className: "circle" }),
	      React.createElement(
	        "span",
	        { className: "title" },
	        this.props.name
	      ),
	      React.createElement(
	        "p",
	        null,
	        "First Line ",
	        React.createElement("br", null),
	        "Second Line"
	      ),
	      React.createElement(
	        "a",
	        { href: "#!", className: "secondary-content" },
	        React.createElement(
	          "i",
	          { className: "material-icons" },
	          "send"
	        )
	      )
	    );
	  }
	});

	module.exports = FriendsListItem;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var ProfileDataField = __webpack_require__(28);

	var ProfileData = React.createClass({
	  displayName: 'ProfileData',
	  getInitialState: function getInitialState() {
	    return {
	      edit: false
	    };
	  },
	  render: function render() {

	    return React.createElement(
	      'div',
	      { id: 'profileData', className: 'container' },
	      React.createElement(
	        'ul',
	        { className: 'collection hoverable' },
	        React.createElement(ProfileDataField, { label: 'Prénom', value: 'Camille', index: '0' }),
	        React.createElement(ProfileDataField, { label: 'Nom', value: 'Bargoin', index: '1' }),
	        React.createElement(ProfileDataField, { label: 'Âge', value: '29 ans', index: '2' }),
	        React.createElement(ProfileDataField, { label: 'E-mail', value: 'camille@minibook.com', index: '3' }),
	        React.createElement(ProfileDataField, { label: 'Adresse', value: '87 rue Saint Fargeau', index: '4' }),
	        React.createElement(ProfileDataField, { label: 'Ville', value: 'Paris', index: '5' })
	      )
	    );
	  }
	});

	module.exports = ProfileData;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var ProfileDataField = React.createClass({
	  displayName: "ProfileDataField",
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
	    this.setState({
	      edit: false
	    });
	  },
	  render: function render() {
	    console.log(this.state.edit);
	    if (this.state.edit) {
	      return React.createElement(
	        "li",
	        { className: "collection-item row" },
	        React.createElement(
	          "form",
	          { onSubmit: this.save },
	          React.createElement(
	            "div",
	            { className: "input-field col s12" },
	            React.createElement("input", { id: this.props.id, type: "text", className: "validate", onBlur: this.save }),
	            React.createElement(
	              "label",
	              { "for": this.props.id },
	              this.props.label
	            )
	          )
	        )
	      );
	    }

	    return React.createElement(
	      "li",
	      { className: "collection-item row" },
	      React.createElement(
	        "p",
	        { className: "col s5" },
	        this.props.label
	      ),
	      React.createElement(
	        "p",
	        { className: "col s5" },
	        this.props.value
	      ),
	      React.createElement(
	        "a",
	        { className: "btn-floating btn-medium waves-effect waves-light green accent-4 right", onClick: this.edit },
	        React.createElement(
	          "i",
	          { className: "material-icons" },
	          "edit"
	        )
	      )
	    );
	  }
	});

	module.exports = ProfileDataField;

/***/ },
/* 29 */
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
/* 30 */
/***/ function(module, exports) {

	"use strict";

	var auth = {

	  loggedIn: function loggedIn() {
	    return true;
	  }

	};

	module.exports = auth;

/***/ }
/******/ ]);