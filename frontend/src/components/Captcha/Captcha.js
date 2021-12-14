import React, { Component } from "react";
import Captcha from "demos-react-captcha";
import ReCAPTCHA from "react-recaptcha";

import "./Captcha.css";

class ReactCaptcha extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      isValidate: false,
      isVisible: false
    };
  }
onRefresh=()=>{

}

  render() {

    return (
      <div className="App">
        <ReCAPTCHA
          sitekey="6LeRA8MUAAAAAE2DL-"
          render="explicit"
          onloadCallback={this.props.handleVisible}
          verifyCallback={this.props.handleCaptcha}
          onRefresh={this.onRefresh}
          
        />
        {this.props.isVisible ? null : (
          <Captcha onChange={this.props.handleCaptcha} onRefresh={this.onRefresh}  placeholder="Enter captcha" />
        )}
      </div>
    );
  }
}

export default  ReactCaptcha
// const rootElement = document.getElementById("root");
// ReactDOM.render(<ReactCaptcha />, rootElement);
