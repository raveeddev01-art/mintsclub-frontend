// import react from 'react'
import './navbar.css'
import {useHistory} from 'react-router-dom'

const Navbar =()=>{
  const history=useHistory()
    return (
        <div className="nav ">
  <input type="checkbox" id="nav-check"/>
  <div className="nav-header">
    <div className="nav-title" onClick={()=>history.push('/')}>
      MintsClub
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
    <a className="navbar-item" href="#" target="_blank" style={{color:"#ffd33e"}}>Home</a>
    <a className="navbar-item" href="#" target="_blank">Twitter</a>
    <a className="navbar-item" href="#" target="_blank">Discord</a>
    <a className="navbar-item" href="#" target="_blank">Telegram</a>
    <a className="navbar-item" href="#" target="_blank">Reddit</a>
  </div>
</div>
    )
}


export default Navbar