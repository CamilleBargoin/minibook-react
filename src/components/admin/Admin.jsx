var React = require('react');
var NavBar = require('../navbar/NavBar.jsx');
var UserList = require('./UserList.jsx');
var Stats = require('./Stats.jsx');
var UserService = require('../../services/UserService.jsx');

var Admin = React.createClass({
  socket: null,
  getInitialState() {
    return {
      users: []
    };
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  componentDidMount() {
      $('#adminTabs ul.tabs').tabs();  

      this.getUsers();


      
      
  },


  getUsers() {

    const self = this;
    UserService.getAll(function(users) {
        self.setState({
          users: users
        });
    });

  },
  

  render() {

    var users = this.state.users;

    return (
      <div>
        <div className="container">
          <div id="adminTabs" className="row">
            <div className="col s12">
              <ul className="tabs transparent">
                <li className="tab col s6"><a className="active" href="#users">Utilisateurs</a></li>
                <li className="tab col s6"><a href="#stats">Statistiques</a></li>
              </ul>
            </div>
            <div id="users" className="col s12">
              <UserList users={users} />
            </div>
            <div id="stats" className="col s12">
              <Stats users={users}/>
            </div>
            <div id="test3" className="col s12">Test 3</div>
            <div id="test4" className="col s12">Test 4</div>
          </div>
          

        </div>
      </div>
    );
  }

});

module.exports = Admin;
