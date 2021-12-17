// import react from 'react'
import './navbar.css'
import {useHistory} from 'react-router-dom'
import {BsTwitter} from 'react-icons/bs'
import {SiDiscord} from 'react-icons/si'
import {FaTelegramPlane} from 'react-icons/fa'
import {GrReddit} from 'react-icons/gr'
import  {AiFillHome} from 'react-icons/ai'
import mintsLogoSmily from '../../assets/images/mintsClubSmilyLogo1.png'
import MintsClub from '../../assets/images/MintsClub-White.png'

import fullNavIcon from '../../assets/images/mintsClubLogo1.png'

const Navbar =()=>{
  const history=useHistory()
    return (
        <div className="nav ">
  <input type="checkbox" id="nav-check"/>
  {/* <div className="nav-icon" ><img src={fullNavIcon} width="20%" /></div> */}
  <div className="nav-header" style={{width:"25%"}}>
    <div className="nav-title" onClick={()=>history.push('/')}>
      <img src={MintsClub} width="100%" />
    </div>
  </div>
  <div className="nav-btn">
    <label htmlFor="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div className="nav-links">
    <AiFillHome className="home-icon " />
    <a className="navbar-item" href="#" target="_blank" style={{color:"#ffd33e"}}>Home</a>
    <BsTwitter className="home-icon " />
    <a className="navbar-item" href="#" target="_blank">Twitter</a>
    <SiDiscord className="home-icon " />
    <a className="navbar-item" href="#" target="_blank">Discord</a>
    <FaTelegramPlane className="home-icon " />
    <a className="navbar-item" href="#" target="_blank">Telegram</a>
    <GrReddit className="home-icon " />
    <a className="navbar-item" href="#" target="_blank">Reddit</a>
  </div>
</div>
    )
}


export default Navbar