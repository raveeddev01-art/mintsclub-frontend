import "./slider.css";
import { useState } from "react";
import { map } from "jquery";

const Slider = () => {
    const sliderRadioButtons=[
        {
          id:  "s1",
          value:"radio1",
        },
        {
            id:  "s2",
            value:"radio2",
          },
          {
            id:  "s3",
            value:"radio3",
          },
          {
            id:  "s4",
            value:"radio4",
          },
          {
            id:  "s5",
            value:"radio5",
          }
      
    ]

    const [sliderChecked,setSliderChecked]=useState()
    const handleRadioInputs=(e)=>{
        setSliderChecked(e.target.value)
    }
  return (
    <section id="slider">
        {
            sliderRadioButtons.map((item)=>{
               return (

                   <input type="radio" name="slider" value={item.value}  checked={(sliderChecked===item.value)} onChange={(e)=>handleRadioInputs(e)}   id={item.id} />
               )
            })
        }

      {/* <input type="radio" name="slider" id="s2" />
      <input type="radio" name="slider" id="s3" />
      <input type="radio" name="slider" id="s4" />
      <input type="radio" name="slider" id="s5" />  */}

      <label for="s1" id="slide1">
        <img
          src="https://i.pinimg.com/originals/2b/de/de/2bdede0647e3cdf75b44ea33723201d9.jpg"
          alt=""
        />
      </label>
      <label for="s2" id="slide2">
        <img
          src="https://images6.alphacoders.com/462/thumb-1920-462371.jpg"
          alt=""
        />
      </label>
      <label for="s3" id="slide3">
        <img src="https://wallpaperaccess.com/full/1154341.jpg" alt="" />
      </label>
      <label for="s4" id="slide4">
        <img src="https://wallpapercave.com/wp/wp2634222.jpg" alt="" />
      </label>
      <label for="s5" id="slide5">
        <img
          src="https://images5.alphacoders.com/343/thumb-1920-343645.jpg"
          alt=""
        />
      </label>
    </section>
  );
};

export default Slider;
