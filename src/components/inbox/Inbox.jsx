var React = require('react');
var NavBar = require('../NavBar.jsx');
var MessageList = require('./MessageList.jsx');
var Pagination = require('../Pagination.jsx');


var Inbox = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {

    var messages = [
      {author: "ZLatan", body: "I'm looking for a new team, call me!", object: "The Legend", date: 1460887462},
      {author: "Jack Bauer", body: "Sir, you have to save the President !", object: "2 hours left...", date: 1433412262 },
      {author: "Mickael Jackson", body: "Aouh !", object: "Black or White ?", date: 1424257462 }
    ];

    return (
      <div>
        <NavBar />
        <div className="container">
          <MessageList messages={messages} />
          <Pagination />
        </div>
      </div>
    );
  }

});

module.exports = Inbox;
