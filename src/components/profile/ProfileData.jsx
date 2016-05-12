var React = require('react');
var ProfileDataField = require('./ProfileDataField.jsx');

var ProfileData = React.createClass({

  getInitialState() {
    return {
      edit: false
    };
  },

  

  render() {

    return (
      <div id="profileData" className="container">
       
          <ul className="collection hoverable">
            <ProfileDataField label="Prénom" value="Camille" index="0"/>
            <ProfileDataField label="Nom" value="Bargoin" index="1" />
            <ProfileDataField label="Âge" value="29 ans" index="2" />
            <ProfileDataField label="E-mail" value="camille@minibook.com" index="3" />
            <ProfileDataField label="Adresse" value="87 rue Saint Fargeau" index="4" />
            <ProfileDataField label="Ville" value="Paris" index="5" />
          </ul>

      </div>
    );
  }

});

module.exports = ProfileData;