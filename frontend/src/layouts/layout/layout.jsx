import React, { Component } from "react";
import NavbarMain from "../../Components/NavbarMain/NavbarMain";
import Footer from "../../Components/Footer/Footer";

class Layout extends Component {
  render() {
    return (
      <>
        <div className="bg-clr">
          <NavbarMain />
          <div className="main">{this.props.children}</div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Layout;
