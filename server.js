var express = require('express');
var path = require('path');

// var compression = require('compression');

var React = require('react');
var ReactDOM = require('react-dom/server');
var match = require('react-router').match;
var RouterContext = require('react-router').RouterContext;
var routes = require('./src/routes.jsx');







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

// app.use(session({
//   secret: '1a9b829823448061ed5931380efc6c6a',
//   resave: true,
//   saveUninitialized: true,
//   //store: fileStore,
//   cookie: { maxAge: 60000 }
// }));
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
      +   '<meta http-equiv="x-ua-compatible" content="ie=edge">'
      +   '<meta name="viewport" content="width=device-width, initial-scale=1">'
      +   '<link rel="stylesheet" type="text/css" href="main.css">'
      +   '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css">'
      +   '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'
      +   '<title>My First React Router App</title>'
      +   '<div id=app>${appHtml}</div>'
      +   '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>'
      +   '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js"></script>'
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