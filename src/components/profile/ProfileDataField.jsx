var React = require('react');
var config = require('../../../config.js');


var ProfileDataField = React.createClass({

  getInitialState() {
    return {
      edit: false
    };
  },

  edit() {
    this.setState({
      edit: true
    });
  },

  save(e) {
    e.preventDefault();

    const self = this;
    const updatedFields = {};

    updatedFields[this.props.fieldLabel] = this.refs.input.value;



    $.ajax({
        type: 'POST',
        url: config[process.env.NODE_ENV].api + '/users/update',
        // post payload:
        data: JSON.stringify({
          userId: localStorage.getItem('userId'), 
          sessionId: localStorage.getItem('sessionId'),
          updatedFields: updatedFields
        }),
        dataType: 'json',
        contentType: "application/json",
        success: function(data, status, jqXHR) {


           if (data.error) {
              console.log(data.error);
              Materialize.toast(data.error, 3000, 'toastError');
           }
           else {

                Materialize.toast("Champs modifié avec succès", 2000, 'toastSuccess', function() {
                  
                  self.props.updateProfile({
                    label: self.props.fieldLabel,
                    value: self.refs.input.value
                  });

                  self.setState({
                    edit: false
                  });

                });
           }
        },
        error: function(jqXHR, status, error) {
          Materialize.toast("Une erreur est survenue :(", 3000, 'toastError');
        }

    }); 


    
  },

  render() {

    if (this.state.edit) {
      return (
        <li className="collection-item row">
          <form onSubmit={this.save}>
            <div className="input-field col s12">
                <input id={this.props.id} type="text" className="validate" onBlur={this.save} ref="input"/>
                <label for={this.props.id}>{this.props.label}</label>
            </div>
          </form>
        </li> 
      );
    }

    return (
        <li className="collection-item row">
          <p className="col s5">{this.props.label}</p>
          <p className="col s5">{this.props.value}</p>
          <a className="btn-floating btn-medium waves-effect waves-light green accent-4 right" onClick={this.edit}><i className="material-icons">edit</i></a>
        </li> 
    );
  }

});

module.exports = ProfileDataField;