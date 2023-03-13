import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

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
    // date.toLocaleDateString()
    dates.push(date.toLocaleDateString())
    currentDate = addDays.call(currentDate, 1)
  }
  return dates
}


// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July' , 'August' , 'Septermber' , 'October' , 'November' , 'December' ,'January', 'February', 'March', 'April', 'May', 'June', 'July' , 'August' , 'Septermber' , 'October' , 'November' , 'December' , 'July' , 'August' , 'Septermber' , 'October' , 'November' , 'December'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Monthly Sales',
//       data: [100 , 150 , 200 , 200 , 120 , 160 , 160 , 100 , 150 , 200 , 200 , 120 , 160 , 160 , 20 , 50],
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Weekly Sales Sales',
//       data: [100 , 150 , 200 , 200 , 120 , 160 , 160 , 0 , 0 , 0 , 0 , 0, 0 , 0 , 0 , 0] ,
//       backgroundColor: 'rgba(255, 99, 71, 1)',
//     },
//   ],
// };

export default function App({ da }) {
  let date = new Date();
  const labels = getDates(new Date(date.setDate(date.getDate() - 31)), new Date());
  const statisticData = {
    labels,
    datasets: [
      {
        label: 'Monthly Sales',
        data: da.monthlySales,
        backgroundColor: "#6455E4",
        borderColor: "#6455E4",
      },
      // {
      //   label: 'Weekly Sales',
      //   data: da.weeklySales,
      //   backgroundColor: "#59C1FE",
      //     borderColor: "#59C1FE",
      // },
    ],
  };
  return <Line options={options} data={statisticData} />;
}
