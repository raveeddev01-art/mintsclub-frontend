import React from 'react';
import './not-found.scss';
import { NavLink } from 'react-router-dom';
import MintsClub from '../../assets/images/main-logo.svg';
import NotFoundImg from '../../assets/images/notfound-img.svg';

function NotFound() {
  return (
    <div className="not-found">
      <div className="container">
        <div className="row">
          <div className="navbar-brand-logo">
            <NavLink to="/">
              <img src={MintsClub} alt="logo" />
            </NavLink>
          </div>
          <div className="not-found-img">
            <img src={NotFoundImg} alt="Not-Found" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
