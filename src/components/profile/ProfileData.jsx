var React = require('react');
var ProfileDataField = require('./ProfileDataField.jsx');

var ProfileData = React.createClass({

  getInitialState() {
    return {
      edit: false
    };
  },

  componentDidMount() {
    $('#genderSelect').material_select(); 
  },

  render() {
console.log(this.props.profile);
    let email = <div />;
    if (this.props.profile._id == localStorage.getItem('userId')) {
      email = <ProfileDataField label="E-mail" fieldLabel="email" value={this.props.profile.email} index="0" updateProfile={this.props.updateProfile} />
    }

    return (
      <div id="profileData" className="container">
       
          <ul className="collection hoverable">
            {email}
            <ProfileDataField label="Prénom" fieldLabel="firstname" value={this.props.profile.firstname} index="1" updateProfile={this.props.updateProfile}/>
            <ProfileDataField label="Nom" fieldLabel="lastname" value={this.props.profile.lastname} index="2" updateProfile={this.props.updateProfile} />
            <ProfileDataField label="Âge" fieldLabel="age" value={this.props.profile.age + " ans"} index="3" updateProfile={this.props.updateProfile} />
            <ProfileDataField label="Adresse" fieldLabel="address" value={this.props.profile.address} index="5" updateProfile={this.props.updateProfile} />
            <ProfileDataField label="Ville" fieldLabel="city" value={this.props.profile.city} index="6" updateProfile={this.props.updateProfile} />
          </ul>

      </div>
    );
  }

});

module.exports = ProfileData;