import React from 'react'
import Chart from 'react-apexcharts'

const HistoryHeatmap = ({ seriesData, highestDistance }) => {
  const options = {
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [{
              from: -0.01,
              to: 0.01,
              name: 'No activities',
              color: '#CFD8DC'
            },
            {
              from: 0.01,
              to: highestDistance,
              name: 'Activities',
              color: '#008FFB'
            },
          ]
        }
      }
    },
  }
  return (
    <Chart options={options} series={seriesData} type='heatmap' height='350' width='800'/>
  )
}

export default HistoryHeatmap
