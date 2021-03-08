import React from 'react'
import {Line} from 'react-chartjs-2'
import chartOptions from './options'

const contactChartData = {
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
            data: [5, 15, 25, 45, 65, 80, 90],
            borderColor: 'rgba(99, 62, 105, 0.75)',
            backgroundColor: 'rgba(99, 62, 105, 0.25)'
        }
    ]
}

export default function ContactChart() {
    return (
        <div className="chart-container">
            <Line data={contactChartData} options={chartOptions} />
        </div>
    )
}
