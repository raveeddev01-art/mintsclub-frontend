import React, { Component } from "react";
import Footer from "../../components/footer/footer";

import Scrollup from "../../components/scroll-up/sroll-up";

class Layout3 extends Component {
  render() {
    return <div className="main">{this.props.children}</div>;
  }
}

export default Layout3;
