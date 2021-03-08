import React from 'react'
import {Line} from 'react-chartjs-2'
import chartOptions from './options'

const productChartData = {
    labels: [
        'September',
        'October',
        'November',
        'December',
        'January',
        'February',
        'March'
    ],
    datasets: [
        {
            lineTension: 0,
            pointRadius: 2,
            data: [15, 30, 60, 90, 88, 90, 90],
            borderColor: 'rgba(148, 53, 49, 0.75)',
            backgroundColor: 'rgba(148, 53, 49, 0.25)'
        }
    ]
}

export default function ProductChart() {
    return (
        <div className="chart-container">
            <Line options={chartOptions} data={productChartData} />
        </div>
    )
}
