import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const allData = [
   {
      first: [
         30,
         35,
         40,
         30,
         38,
         32,
         42,
         32,
         42,
         35,
         40,
         30,
         38,
         32,
         42,
         30,
         35,
         22,
         30,
         45,
      ],
   },
   {
      first: [
         35,
         35,
         40,
         30,
         38,
         40,
         30,
         38,
         32,
         42,
         32,
         42,
         32,
         42,
         30,
         35,
         22,
         30,
         45,
         30,
      ],
   },
   {
      first: [
         35,
         40,
         40,
         30,
         38,
         32,
         42,
         32,
         42,
         30,
         38,
         32,
         42,
         30,
         35,
         22,
         30,
         45,
         30,
         35,
      ],
   },
   {
      first: [
         35,
         40,
         30,
         38,
         32,
         42,
         30,
         35,
         22,
         30,
         45,
         30,
         35,
         40,
         30,
         38,
         32,
         42,
         32,
         42,
      ],
   },
];

class LineChart8 extends Component {
   render() {
      const data = {
         labels: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
         ],
         datasets: [
            {
               label: "Active",
               backgroundColor: this.props.backgroundColor,
               borderColor: this.props.backgroundColor,
               data: allData[this.props.data ? this.props.data : 0].first,
               borderWidth: "none",
            },
         ],
      };

      const options = {
         responsive: true,
         maintainAspectRatio: false,
         elements: {
            point: {
               radius: 0,
            },
         },
         legend: false,

         scales: {
            yAxes: [
               {
                  gridLines: {
                     color: "rgba(89, 59, 219,0.1)",
                     drawBorder: true,
                  },
                  ticks: {
                     fontColor: "#999",
                  },
               },
            ],
            xAxes: [
               {
                  gridLines: {
                     display: false,
                     zeroLineColor: "transparent",
                  },
                  ticks: {
                     stepSize: 5,
                     fontColor: "#999",
                     fontFamily: "Nunito, sans-serif",
                  },
               },
            ],
         },
         tooltips: {
            enabled: false,
            mode: "index",
            intersect: false,
            titleFontColor: "#888",
            bodyFontColor: "#555",
            titleFontSize: 12,
            bodyFontSize: 15,
            backgroundColor: "rgba(256,256,256,0.95)",
            displayColors: true,
            xPadding: 10,
            yPadding: 7,
            borderColor: "rgba(220, 220, 220, 0.9)",
            borderWidth: 2,
            caretSize: 6,
            caretPadding: 10,
         },
      };
      return (
         <div style={{ height: "300px" }}>
            <Line
               data={data}
               options={options}
               height={this.props.height ? this.props.height : 300}
            />
         </div>
      );
   }
}

export default LineChart8;
