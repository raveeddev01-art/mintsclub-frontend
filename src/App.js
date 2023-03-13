import React, { Fragment } from "react";

/// Components
import Markup from "./jsx";

/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

import { withResizeDetector } from "react-resize-detector";

const App = ({ width }) => {
   const body = document.querySelector("body");

   body.setAttribute("data-typography", "poppins");
   body.setAttribute("data-theme-version", "light");
   body.setAttribute("data-layout", "vertical");
   body.setAttribute("data-nav-headerbg", "color_1");
   body.setAttribute("data-headerbg", "color_1");
   body.setAttribute("data-sibebarbg", "color_1");
   body.setAttribute("data-primary", "color_1");
   body.setAttribute("data-sidebar-position", "static");
   body.setAttribute("data-header-position", "fixed");
   body.setAttribute("data-container", "wide");
   body.setAttribute("direction", "ltr");

   width > 767 && width < 1200
      ? body.setAttribute("data-sidebar-style", "overlay")
      : width < 768
      ? body.setAttribute("data-sidebar-style", "overlay")
      : body.setAttribute("data-sidebar-style", "mini");

   return (
      <Fragment>
         <Markup showProfileSideBar={width <= 1300 ? false : true} />
      </Fragment>
   );
};

export default withResizeDetector(App);
