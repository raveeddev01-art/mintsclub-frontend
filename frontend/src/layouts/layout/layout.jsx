import React, { Component } from "react";
import NavbarMain from "../../components/navbar-main/NavbarMain";
import Footer from "../../components/footer/footer";

class Layout extends Component {
  render() {
    return (
      <>
        <NavbarMain />
        <div className="main bg-clr">{this.props.children}</div>
        <Footer />
      </>
    );
  }
}

export default Layout;
