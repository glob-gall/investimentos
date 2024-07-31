import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";


type ChartProps = {
  labels: string[]
  series: number[]
}

export function Chart (props: ChartProps) {

  const {labels,series} = props
  const options:ApexOptions = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: labels,
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

    return (
      <div>
        <div id="chart">
          <ReactApexChart options={options} series={series} type="pie" width={380} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
}
