import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

const options:ApexOptions = {
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  legend: {
        show:true,
        labels:{
          colors:'#71717a'
        }
      },
  responsive: [{
    breakpoint: 470,
    options: {
      chart: {
        width: 200
      },
      legend: {
        show:true,
        labels:{
          colors:'#71717a'
        },
        position: 'bottom',
      }
    }
  }]
}

const series = [44, 55, 13, 43, 22]

export function Chart () {

    return (
      <div>
        <div id="chart">
          <ReactApexChart options={options} series={series} type="pie" width={380} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
}
