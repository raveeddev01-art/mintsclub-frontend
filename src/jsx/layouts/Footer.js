import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <div className="footer">
         <div className="copyright">
            <p>
               Copyright © Designed &amp; Developed by{" "}
               <a href="https://mintsclub-v3-marketplace.invo.zone/" target="_blank">
                  MintsClub.io
               </a>{" "}
               2023
            </p>
         </div>
      </div>
   );
};

export default Footer;
