var React = require('react');
var UserService = require("../../services/UserService.jsx");
var NavBarSearchItem = require("./NavBarSearchItem.jsx");


var NavBarSearch = React.createClass({

  getInitialState() {
    return {
      suggestions: []
    };
  },

  

  onChange(e) {
    const that = this;
    const input = this.refs["userInput"].value;

    if(input && input != "" && input.length > 1) {


      UserService.search(this.refs["userInput"].value, function(result) {

        console.log(result);
        if( result) {
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


  selectUser(e) {
    console.log(e.currentTarget);
  },

  render() {

    const that = this;
    const displayUserSuggestions = (this.state.suggestions.length > 0) ? "block" : "none";
    const userSuggestions = this.state.suggestions.map(function(user, key) {
      // return (<li className="collection-item"  onClick={that.selectUser} key={key}>{user.firstname} {user.lastname}</li>)
    
      return <NavBarSearchItem user={user} key={key} />
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

module.exports = NavBarSearch;