import React from 'react';
import { Line } from 'react-chartjs-2';

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

function getDates(startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
        const date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
    }
    while (currentDate <= endDate) {
        let date = new Date(currentDate)
        dates.push(date.toLocaleDateString())
        currentDate = addDays.call(currentDate, 1)
    }
    return dates
}

export default function App({ tabledata, days = 7 }) {
    let date = new Date();
    const labels = getDates(new Date(date.setDate(date.getDate() - days)), new Date());
    const statisticData = {
        labels,
        datasets: [
            {
                label: 'Tax Revenue',
                data: tabledata,
                backgroundColor: "#6455E4",
                borderColor: "#6455E4",
            },
        ],
    };
    return <Line options={options} data={statisticData} />;
}
