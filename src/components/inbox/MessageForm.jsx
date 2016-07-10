var React = require('react');
const MessageService = require("../../services/MessageService.jsx");

var MessageForm = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  componentDidMount() {
      $('select').material_select();  
  },


  submitMessage() {

    const self = this;
    const selectedUser = this.refs["userSelect"].value;
    const subject = this.refs["messageSubject"].value;
    const text = this.refs["messageBody"].value;

    
    console.log(selectedUser);

    var newMessage = {
      subject: subject,
      body: text,
      created_by: {
        userId: localStorage.getItem('userId')
      }
    };

    MessageService.sendMessage(newMessage, selectedUser, function(result) {
      Materialize.toast("Ton message a été envoyé !", 2000, 'toastSuccess');
    });



  },
  
  render() {


    var options = this.props.users.map(function(obj, index) {
      const name = obj.user.firstname + " " + obj.user.lastname;
      const url = (obj.user.avatar) ? obj.user.avatar.replace("/upload/", "/upload/w_42,h_42,c_fill/") : "";
      return <option value={obj.user._id} key={index} data-icon={url} className="left circle">{name}</option>
    }); 
    

    return (
      <div id="inboxForm" className="row card-panel hoverable white">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <select defaultValue="default" ref="userSelect">
                <option value="default" disabled>Destinataire</option>
                {options}
                
              </select>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="messageSubject" type="text" className="validate" ref="messageSubject"/>
              <label for="messageSubject">Objet du message</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s10">
              <textarea id="textarea1" className="materialize-textarea" ref="messageBody"></textarea>
              <label for="textarea1">Ton message...</label>
            </div>
          </div>
          <div className="row">
            <div className="col s2 offset-s10" >
                <a className="waves-effect waves-light btn green accent-4" onClick={this.submitMessage}><i className="material-icons left">done</i>envoyer</a>
            </div>
          </div>
        </form>
      </div>
    );
  }

});

module.exports = MessageForm;
