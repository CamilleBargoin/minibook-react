var express = require('express');
var path = require('path');

// var compression = require('compression');

var React = require('react');
var ReactDOM = require('react-dom');
var match = require('react-router').match;
var RouterContext = require('react-router').RouterContext;
var routes = require('./src/routes.jsx');




var app = express();
// app.use(compression());



// serve our static stuff like index.css
//app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));


// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {

  match({routes: routes, location: req.url}, function(err, redirect, props) {


    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message);
    } else if (redirect) {
      
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      
      var appHtml = ReactDOM.renderToString(<RouterContext {...props}/>);
      res.send(renderPage(appHtml));
    } else {


      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }
  });
});




function renderPage(appHtml) {
  return  '<!doctype html public="storage">'
      +   '<html>'
      +   '<meta charset=utf-8/>'
      +   '<title>My First React Router App</title>'
      +   '<div id=app>${appHtml}</div>'
      +   '<script src="/bundle.js"></script>';
};




var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
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