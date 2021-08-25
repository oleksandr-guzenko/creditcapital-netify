import React, {useState} from 'react'
import ReactApexChart from 'react-apexcharts'

const Chart = () => {
  const [series, setSeries] = useState([
    {
      name: 'CPT',
      data: [100, 300, 200, 400, 320, 400, 300],
      data: [20, 29, 37, 36, 44, 45, 50, 58],
    },
  ])
  const [options, setOptions] = useState({
    chart: {
      height: 150,
      type: 'area',
      fontFamily: 'Circular Std',
      foreColor: '#848e9c',
      zoom: {
        enabled: false,
      },
    },
    colors: ['#06397e', '#E91E63', '#9C27B0'],
    fill: {
      colors: ['#06397e', '#06397e', '#06397e'],
    },
    markers: {
      colors: ['#00bd94', '#E91E63', '#9C27B0'],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },

    // title: {
    //   text: 'Fundamental Analysis of Stocks',
    //   align: 'left',
    // },
    subtitle: {
      text: 'Price Movements',
      align: 'left',
    },
    labels: [2, 4, 6, 8, 10, 12, 14, 16],
    xaxis: {
      type: 'number',
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: 'left',
    },
  })

  return (
    <div id='chart'>
      <ReactApexChart
        options={options}
        series={series}
        type='area'
        height={190}
      />
    </div>
  )
}

export default Chart
