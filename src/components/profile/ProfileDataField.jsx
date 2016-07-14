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



    this.props.updateProfile({
      label: this.props.fieldLabel,
      value: this.refs.input.value
    });

    this.setState({
      edit: false
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

    let className = "collection-item row";

    if (this.props.updateProfile) {
      className += " personalDataField";
    }

    return (
        <li className={className}>
          <p className="col s5">{this.props.label}</p>
          <p className="col s5">{this.props.value}</p>
          <a className="btn-floating btn-medium waves-effect waves-light green accent-4 right" onClick={this.edit}><i className="material-icons">edit</i></a>
        </li> 
    );
  }

});

module.exports = ProfileDataField;