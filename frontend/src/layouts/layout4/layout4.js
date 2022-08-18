import React, { Component } from "react";
import Footer from "../../components/footer/footer";

class Layout4 extends Component {
  render() {
    return (
      <>
        {" "}
        <div className="main bg-clr">{this.props.children}</div> <Footer />
      </>
    );
  }
}

export default Layout4;
