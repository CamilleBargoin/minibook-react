var React = require('react');


var ToolBar = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  onClickButton(index, obj) {

    this.props.selectContent(index);
  },

  render() {
    return (
        <div className="row profileToolBar">
          <div className="col s8 offset-s2 " >
            <a onClick={this.onClickButton.bind(this, 0)} className="waves-effect waves-light btn green accent-4"><i className="material-icons left">speaker_notes</i>Journal</a>
            <a onClick={this.onClickButton.bind(this, 1)} index="1" className="waves-effect waves-light btn green accent-4"><i className="material-icons left">supervisor_account</i>Amis</a>
            <a onClick={this.onClickButton.bind(this, 2)} index="2" className="waves-effect waves-light btn green accent-4"><i className="material-icons left">description</i>Infos</a>
          </div>
        </div>
    );
  }
});

module.exports = ToolBar;
