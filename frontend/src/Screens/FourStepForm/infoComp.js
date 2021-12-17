import React from 'react';
import {BsFillInfoCircleFill} from 'react-icons/bs'

const InfoComp = (props) =>{
    return(
        <span className='infoIcon'><BsFillInfoCircleFill /> <span className="tooltiptext">{props.text}</span></span>
    )
}
export default  InfoComp;