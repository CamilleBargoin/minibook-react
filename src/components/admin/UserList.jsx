var React = require('react');
var UserListItem = require('./UserListItem.jsx');


var UserList = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  render() {


    var userLines = this.props.users.map(function(user, i) {
      return (
        <UserListItem {...user} key={i}  />
      );
    });

    return (
      <div id="userList">
         <ul className="collection hoverable">
          {userLines}
        </ul>
      </div>
    );
  }

});

module.exports = UserList;
