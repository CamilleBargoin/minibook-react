var React = require('react');

var Pagination = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  

  render() {

    return (
      <ul className="pagination">
        <li className="disabled"><a href="#!"><i className="material-icons transparent" style={{color: "#00C853"}}>chevron_left</i></a></li>
        <li className="active"><a href="#!">1</a></li>
        <li className="waves-effect"><a href="#!">2</a></li>
        <li className="waves-effect"><a href="#!">3</a></li>
        <li className="waves-effect"><a href="#!">4</a></li>
        <li className="waves-effect"><a href="#!">5</a></li>
        <li className="waves-effect"><a href="#!"><i className="material-icons transparent" style={{color: "#00C853"}}>chevron_right</i></a></li>
      </ul>
    );
  }

});

module.exports = Pagination;
