var React = require('react');

var userList = [
  {
    firstname:"albert",
    lastname: "King",
    color: "#47B8E0"
  },{
    firstname:"Bertrand",
    lastname: "Forest",
    color: "#FFC952"
  },{
    firstname:"Camille",
    lastname: "Blue",
    color: "#FF7473"
  },{
    firstname:"Donald",
    lastname: "Smith",
    color: "#47B8E0"
  },{
    firstname:"Etienne",
    lastname: "Williamson",
    color: "#FFC952"
  },{
    firstname:"Francois",
    lastname: "Rivers",
    color: "#FF7473"
  },{
    firstname:"Gertrude",
    lastname: "Star",
    color: "#47B8E0"
  },{
    firstname:"Henry",
    lastname: "Bear",
    color: "#FFC952"
  },{
    firstname:"Igor",
    lastname: "Miller",
    color: "#FF7473"
  },{
    firstname:"Janine",
    lastname: "Paulson",
    color: "#47B8E0"
  },{
    firstname:"Kamel",
    lastname: "Frey",
    color: "#FFC952"
  },{
    firstname:"Léonidas",
    lastname: "Silver",
    color: "#FF7473"
  }
];



var FindUser = React.createClass({

  getInitialState() {
    return {
      suggestions: []
    };
  },

  findUsers(string, callback) {
    let stringLow = string.toLowerCase();
    let result = [];
    userList.map(function(user, key) {
      if (user.firstname.toLowerCase().startsWith(stringLow) || user.lastname.toLowerCase().startsWith(stringLow))
        result.push(user);
    });

    callback(result);
  },

  onChange(e) {
    const that = this;
    const input = this.refs["userInput"].value;
    if(input && input != "") {
      this.findUsers(this.refs["userInput"].value, function(result) {
        that.setState({
          suggestions: result
        });
      });
    } else {
      that.setState({
          suggestions: []
        });
    }
    

  },


  selectUser(e) {
    console.log(e.currentTarget);
  },

  render() {

    const that = this;
    const displayUserSuggestions = (this.state.suggestions.length > 0) ? "block" : "none";
    const userSuggestions = this.state.suggestions.map(function(user, key) {
      return (<li className="collection-item"  onClick={that.selectUser} key={key}>{user.firstname} {user.lastname}</li>)
    });

    return (
      <div>
        <form className="input-field col s12" onSubmit={this.searchUser}>
          <input type="text" className="validate white-text green searchinput hoverable" placeholder="rechercher un membre..." ref="userInput" onChange={this.onChange} />
        </form>
        <ul className="collection searchSuggestions" style={{display: displayUserSuggestions}}>
          {userSuggestions}
        </ul>
      </div>
    );
  }

});

module.exports = FindUser;