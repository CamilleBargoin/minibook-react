var React = require('react');

var Stats = React.createClass({

  getInitialState() {
    return {
      users: this.props.users || []
    };
  },

  componentWillReceiveProps(nextProps) {
      this.setState({
        users: nextProps.users
      });
  },

  componentDidUpdate() {

      var cat1 = 0, cat2 = 0, cat3 = 0, cat4 = 0;
      var cat1Ratio = 0, cat2Ratio = 0, cat3Ratio = 0, cat4Ratio = 0;
      var total = 0;
      for (var i = 0; i < this.state.users.length; i++) {
        var user = this.state.users[i];
        if (user.age) {
          total ++;
          if (user.age <= 18)
            cat1++;
          else if (user.age <= 30)
            cat2++;
          else if (user.age <= 50)
            cat3++;
          else
            cat4++;
        }
      }

      cat1Ratio = Math.round(cat1 / total * 100);
      cat2Ratio = Math.round(cat2 / total * 100);
      cat3Ratio = Math.round(cat3 / total * 100);
      cat4Ratio = Math.round(cat4 / total * 100);

      var chart = new CanvasJS.Chart("chartContainer",
      {
        title:{
          text: "Répartition des utilisateurs par tranche d'âge",
          fontFamily: "Impact",
          fontWeight: "normal"
        },

        legend:{
          verticalAlign: "bottom",
          horizontalAlign: "center"
        },
        data: [
        {
          //startAngle: 45,
          indexLabelFontSize: 20,
          indexLabelFontFamily: "Garamond",
          indexLabelFontColor: "darkgrey",
          indexLabelLineColor: "darkgrey",
          indexLabelPlacement: "outside",
          type: "doughnut",
          showInLegend: true,
          dataPoints: [
            {  y: cat1Ratio, legendText:"Moins de 18 ans " + cat1Ratio + "%", indexLabel: "Moins de 18 ans " + cat1Ratio + "%" },
            {  y: cat2Ratio, legendText:"Entre 18 et 30 ans " + cat2Ratio + "%", indexLabel: "Entre 18 et 30 ans " + cat2Ratio  + "%"},
            {  y: cat3Ratio, legendText:"Entre 30 et 50 ans " + cat3Ratio + "%", indexLabel: "Entre 30 et 50 ans " + cat3Ratio + "%" },
            {  y: cat4Ratio, legendText:"50 ans et plus " + cat4Ratio + "%", indexLabel: "50 ans et plus " + cat4Ratio + "%" },
          
          ]
        }
        ]
      });

      chart.render();  
  },

  render() {
  

    return (
      <div id="stats">
         
        <h1 style={{}}>Statistiques</h1>
        <div>
        <div id="chartContainer" style={{height: "300px", width: "100%"}}></div>
        </div>
      </div>
    );
  }

});

module.exports = Stats;
