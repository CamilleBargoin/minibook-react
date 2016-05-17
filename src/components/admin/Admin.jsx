var React = require('react');
var NavBar = require('../NavBar.jsx');
var UserList = require('./UserList.jsx');
var Stats = require('./Stats.jsx');

var Admin = React.createClass({

  getInitialState() {
    return {
    
    };
  },


  componentDidMount() {
      $('#adminTabs ul.tabs').tabs();  
  },

  

  render() {

    var users = [
      {name: "Chuck Norris"},
      {name: "Jean CLaude VanDamme"},
      {name: "Steven Seagal"},
      {name: "Kurt Russel"},
      {name: "Jon Snow"},
      {name: "Beyonce"},
      {name: "John Rambo"},
      {name: "Chuck Norris"},
      {name: "Jean CLaude VanDamme"},
      {name: "Steven Seagal"},
      {name: "Kurt Russel"},
      {name: "Jon Snow"},
      {name: "Beyonce"},
      {name: "John Rambo"}
    ];

    return (
      <div>
        <NavBar />
        <div className="container">
          <div id="adminTabs" className="row">
            <div className="col s12">
              <ul className="tabs transparent">
                <li className="tab col s3"><a className="active" href="#users">Utilisateurs</a></li>
                <li className="tab col s3"><a href="#stats">Statistiques</a></li>
                <li className="tab col s3"><a href="#test3">Test 3</a></li>
                <li className="tab col s3"><a href="#test4">Test 4</a></li>
              </ul>
            </div>
            <div id="users" className="col s12">
              <UserList users={users} />
            </div>
            <div id="stats" className="col s12">
              <Stats />
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
