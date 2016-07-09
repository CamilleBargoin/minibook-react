var React = require('react');
var UserService = require("../../services/UserService.jsx");


var NavBarSearchItem = React.createClass({

  getInitialState() {
    return {
    };
  },


  selectUser(e) {
    console.log(e.currentTarget);
  },

  clickButton(e) {
    e.stopPropagation();
    UserService.sendInvite(this.props.user, function() {
      Materialize.toast("Demande d'ami envoyée !", 3000, 'toastSuccess');
    });

  },

  render() {

    
      return (
        <li className="collection-item"  onClick={this.selectUser}>
          {this.props.user.firstname} {this.props.user.lastname}
          <i onClick={this.clickButton} className="material-icons send-invite-icon" >person_add</i>
        </li>
      );
    }

});

module.exports = NavBarSearchItem;