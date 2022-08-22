import React, { Component } from "react";
import NavbarMain from "../../components/navbar-main/NavbarMain";
import Footer from "../../components/footer/footer";

class HomeLayout extends Component {
  render() {
    return (
      <>
        <div className="home-layout">
          <NavbarMain />
          <div className="main">{this.props.children}</div>
          <Footer />
        </div>
      </>
    );
  }
}

export default HomeLayout;
