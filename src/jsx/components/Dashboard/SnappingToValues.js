import React from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const COLORS = ["red", "green", "blue"];
const colors = [0, 0, 0];

class NonlinerSliderDashBoard extends React.Component {
   state = {
      color: "rgb(127, 127, 127)",
      textValue: null,
      percent: null,
      value: 0,
      disabled: false,
      range: {
         min: 0,
         max: 100,
      },
      ref: null,
   };

   onSlide = (render, handle, value, un, percent) => {
      // console.log(percent);
      this.setState({
         textValue: value[0].toFixed(0),
         percent: percent[1].toFixed(0),
      });
   };
   render() {
      const { textValue, percent } = this.state;
      return (
         <div className="slider" id="NonlinerSliderDashBoard">
            <div className="inputs mb-4">
               <input
                  className="form-control fs-24 text-center text-black"
                  type="number"
                  min={-20}
                  max={40}
                  step={1}
                  id="input-number"
                  value={`${percent ? percent : 100}.00`}
                  defaultValue="100.00"
               />
            </div>
            <Nouislider
               connect
               start={[0, 100]}
               behaviour="tap"
               range={{
                  min: [0],
                  max: [100],
               }}
               onSlide={this.onSlide}
            />
            <div className="d-flex align-items-center justify-content-between text-black">
               <span>${textValue ? textValue : 0}</span>
               <span>${percent ? percent : 100}</span>
            </div>
         </div>
      );
   }
}

export default NonlinerSliderDashBoard;
