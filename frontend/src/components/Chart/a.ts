const a = {
  legend: {
    show: true,
    labels: {
      colors: '#fff'
    }
},
  chart: {
    height: 350,
    type: 'radialBar',
  },
  plotOptions: {
    value: {
      color:'#fff'
    },
    color:'#fff',
    barLabels:{
      useSeriesColors: true,
    },
    radialBar: {
      value: {
        color:'#fff'
      },
      dataLabels: {
        name: {
          fontSize: '22px',

        },
        value: {
          fontSize: '16px',
          style:{color:"#fff"},
          label:{
            style:{color:"#fff"},
          }
        },
        total: {
          show: true,
          label: 'Total',
          color:"#fff",
          formatter: function (w:string) {
            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
            return 100
          }
        }
      }
    }
  },
  value: {
    color:'#fff'
  },
  colors:["blue", "red"],
  // theme:{mode:'dark'},
  labels: ["a","b"],
}