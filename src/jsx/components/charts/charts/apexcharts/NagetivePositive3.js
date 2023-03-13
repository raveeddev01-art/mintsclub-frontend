import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ApexNagetivePosative3 extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         data: [
            {
               series: [
                  {
                     name: "Instagram",
                     data: [44, 55, 41, 67, 22, 43, 44, 55],
                  },
                  {
                     name: "Facebook",
                     data: [13, 23, 20, 8, 13, 27, 13, 23],
                  },
                  {
                     name: "Twitter",
                     data: [11, 17, 15, 15, 21, 14, 11, 17],
                  },
               ],
            },
            {
               series: [
                  {
                     name: "Instagram",
                     data: [
                        44,
                        55,
                        41,
                        67,
                        22,
                        43,
                        44,
                        55,
                        41,
                        67,
                        22,
                        43,
                        44,
                        55,
                        41,
                     ],
                  },
                  {
                     name: "Facebook",
                     data: [
                        13,
                        23,
                        20,
                        8,
                        13,
                        27,
                        13,
                        23,
                        20,
                        8,
                        13,
                        27,
                        13,
                        23,
                        20,
                     ],
                  },
                  {
                     name: "Twitter",
                     data: [
                        11,
                        17,
                        15,
                        15,
                        21,
                        14,
                        11,
                        17,
                        15,
                        15,
                        21,
                        14,
                        15,
                        15,
                        21,
                     ],
                  },
               ],
            },
         ],

         options: {
            chart: {
               type: "bar",
               height: 250,
               stacked: true,
               toolbar: {
                  show: false,
               },
            },
            responsive: [
               {
                  breakpoint: 480,
                  options: {
                     legend: {
                        position: "bottom",
                        offsetX: -10,
                        offsetY: 0,
                     },
                  },
               },
            ],
            plotOptions: {
               bar: {
                  horizontal: false,
                  columnWidth: "20%",
                  endingShape: "rounded",
                  backgroundRadius: 10,
                  colors: {
                     backgroundBarColors: [
                        "#f0f0f0",
                        "#f0f0f0",
                        "#f0f0f0",
                        "#f0f0f0",
                        "#f0f0f0",
                        "#f0f0f0",
                        "#f0f0f0",
                     ],
                     backgroundBarOpacity: 1,
                     backgroundBarRadius: 5,
                  },
               },
            },
            colors: ["#ff285c", "#5856ce", "#56c7ce"],
            xaxis: {
               show: true,

               axisBorder: {
                  show: true,
               },

               labels: {
                  style: {
                     colors: "#333",
                     fontSize: "13px",
                     fontFamily: "Poppins",
                     fontWeight: 300,
                     cssClass: "apexcharts-xaxis-label",
                  },
               },
               crosshairs: {
                  show: false,
               },

               categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            },
            yaxis: {
               show: false,
            },
            grid: {
               show: false,
            },
            toolbar: {
               enabled: false,
            },
            dataLabels: {
               enabled: false,
            },
            legend: {
               position: "bottom",
               offsetY: 0,
            },
            fill: {
               opacity: 1,
            },
         },
      };
   }

   render() {
      return (
         <div id="chart">
            <ReactApexChart
               options={this.state.options}
               series={
                  this.state.data[this.props.data ? this.props.data : 0].series
               }
               type="bar"
               height={this.props.height ? this.props.height : 440}
            />
         </div>
      );
   }
}

export default ApexNagetivePosative3;
