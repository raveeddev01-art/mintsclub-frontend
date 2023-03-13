import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ApexRedialBar2 extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         series: [73, 64, 48],
         options: {
            chart: {
               type: "radialBar",
               //width:320,
               height: 370,
               offsetY: 0,
               offsetX: 0,
            },
            plotOptions: {
               radialBar: {
                  size: undefined,
                  inverseOrder: false,
                  hollow: {
                     margin: 0,
                     size: "30%",
                     background: "transparent",
                  },

                  track: {
                     show: true,
                     background: "#e1e5ff",
                     strokeWidth: "10%",
                     opacity: 1,
                     margin: 18, // margin is in pixels
                  },
               },
            },
            responsive: [
               {
                  breakpoint: 480,
                  options: {
                     chart: {
                        offsetY: 0,
                        offsetX: 0,
                     },
                     legend: {
                        position: "bottom",
                        offsetX: 0,
                        offsetY: 0,
                     },
                  },
               },
            ],

            fill: {
               opacity: 1,
            },

            colors: ["#FF285C", "#5856CE", "#56C7CE"],
            labels: ["Instagram", "Facebook", "Twitter"],
            legend: {
               fontSize: "16px",
               show: false,
            },
         },
      };
   }

   render() {
      return (
         <div id="chart">
            <ReactApexChart
               options={this.state.options}
               series={this.state.series}
               type="radialBar"
               height={this.props.height ? this.props.height : 350}
            />
         </div>
      );
   }
}
export default ApexRedialBar2;
