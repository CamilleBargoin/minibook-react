var React = require('react');

var Comment = React.createClass({

  getInitialState() {
    return {
    
    };
  },

  
  render() {
    return (

      <div style={{marginTop: "20px"}} className="card hoverable">
        
        <p style={{margin: 0, padding: "5px 20px 0"}}>"{this.props.body}"</p>
        <p style={{fontWeight:"bold", margin: "0 20px 0 0", padding: "0 0 5px 0", textAlign: "right"}}>{this.props.author}</p>
      </div>
        
      
        
    );
  }

});

module.exports = Comment;