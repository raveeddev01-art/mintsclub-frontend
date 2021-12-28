import { useState, useEffect } from "react";
import MetamaskImg from "../../../../assets/images/metamask.svg";
import RefreshImg from "../../../../assets/images/Refresh.svg";
import DetailsImg from "../../../../assets/images/Details.svg";
import DiscordImg from "../../../../assets/images/Discord.svg";
import ReactCaptcha from "../../../../components/Captcha/Captcha";
// import { connectMetamaskCopy } from "../../../../Utils/web3";
import PreviewModal from "../../../../components/PreviewModal/PreviewModal";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";
import { getNetworkNameByChainId } from "../../../../utils/web3";
import {
  connectWallet,
  contractResponse,
  sendOtp,
  verifyOtp,
} from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import "./Step4.css";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { getWalletAddress } from "../../../../utils/web3";
import { ENV } from "../../../../config/config";
// import Stepper from "../../../../Components/Stepper/Stepper";
// import { propTypes } from "react-bootstrap/esm/Image";
const Step4 = (props) => {
  const { discordLink } = ENV;
  // console.log(props,"props in setp 4")
  const [isVisible, setIsvisible] = useState(false);
  // const [isValidate, setIsvalidate] = useState(false);
  const [captchaStatus, setCaptchaStatus] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [captchaMessage, setCaptchaMessage] = useState(
    "Invalid Captchca Please Try Again"
  );
  const [email, setEmail] = useState(props.email);
  const [deployNetwork, setDeployNetwork] = useState("");
  const [deploy, setDeploy] = useState(false);
  // const [compile, setCompile] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //otp verification
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);

  //previewModal
  const [previewModal, setPreviewModal] = useState(false);
  const [previewModalStep, setPreviewModalStep] = useState(1);
  const [maxLimit, setMaxLimit] = useState(false);
  // const [textCopy,setTextCopy]=useState(false)

  ///copy text ////////////////

  // const [copySuccess, setCopySuccess] = useState('');
  // const textAreaRef = useRef(null);

  // function copyToClipboard(e) {
  //   textAreaRef.current.select();
  //   document.execCommand('copy');
  //   // This is just personal preference.
  //   // I prefer to not show the the whole text area selected.
  //   e.target.focus();
  //   setCopySuccess('Copied!');
  // };
  ////////////
  const handleCaptcha = (value) => {
    // console.log(value);
    setCaptchaStatus(value);
    setCaptchaError(false);
    // if (value) {
    //   setIsvalidate(true);
    // }
  };

  const onChangeEmail = (e) => {
    setError(false);
    setEmailError(false);
    setEmail(e.target.value.trimStart());
    props.handleStep4Info(e.target.value.trimStart());
  };

  const handleVisible = () => {
    setIsvisible(true);
  };

  const submitCaptcha = () => {
    // console.log(captchaStatus, "captchaStatus");
    if (email && emailValidate()) {
      if (captchaStatus) {
        // setIsvalidate(true);
        props.handleCaptchaValidation(true);
        let data = {
          email,
        };
        toast.success(`Verification OTP code is sent to ${email}`)
        props.sendOtp(data);
      } else {
        setCaptchaError(true);
      }
    } else {
      setEmailError(true);
      setErrorMessage("Please proivde Email.");
    }
  };

  const onConnect = () => {
    // props.connectWallet()
    if (!email) {
      setEmailError(true);
      setErrorMessage("Email is required");
      return "";
    } else {
      const validate = emailValidate();
      if (!validate) return "";
    }

    getWalletAddress().then((address) => {
      // let count = localStorage.getItem(address);
      // // console.log(count,"count")
      // if (+count > 100) {
      //   toast.error("Maximum Deployment Limit Reached with This Wallet Address! Please contact support.");
      //   setMaxLimit(true)
      //   return "";
      // }
      // else {
      //   setMaxLimit(false)
      // }
    });

    if (email === "") {
      setError(true);
      return "";
    }
    // setLoadingMessage("Please wait your contract is Deploying!");
    // setDeploy(true);
    // props.handleStep4Info(email, deployNetwork);
    props.handleDeployContract();
  };
  const emailValidate = () => {
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailError(true);
      setErrorMessage("Email must be valid");
      return false;
    }
    return true;
  };

  const onReload = () => {
    debugger;
    if (!email) {
      setEmailError(true);
      setErrorMessage("Email is required");
      return "";
    } else {
      const validate = emailValidate();
      if (!validate) return "";
    }

    if (!props.contractReponse) {
      setDeploy(true);

      // props.contractResponse();
      props.handleStep4Info(email, deployNetwork);
      props.handleDeployContract();
    }
  };

  const onMint = () => {
    if (email === "") {
      setError(true);
      return "";
    }

    getNetworkNameByChainId()
      .then((network) => {
        // console.log(network,"network==>")
        // console.log(props,"props==>9")
        if (network === props.connectedNetwork || !props.connectedNetwork) {
          setLoadingMessage("Please wait your NFT is Minting...");

          setDeploy(true);
          props.handleStep4Info(email, deployNetwork);

          props.handleMinting(props.contractInfo, email);
        } else {
          toast.error(`Please connect with ${props.connectedNetwork} network`);
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {}, [props.connectedAddressFlag]);

  useEffect(() => {
    // console.log('all props ', props)
    // console.log('response for contract ', props.contractResponse)
  }, [props.contractResponse]);

  // if (props.contractInfo) {
  //   var { contractAddress } = props?.contractInfo;
  //   // console.log(typeof(contractAddress),"type=============>")
  // }
  const handlePreviewModal = () => {
    // if(!email)
    setPreviewModalStep(1);
    setPreviewModal(!previewModal);
  };

  const handlePreviewModalSteps = (action) => {
    if (action === "next") {
      setPreviewModalStep(2);
    } else {
      setPreviewModalStep(1);
    }
  };

  const onDeploy = () => {
    setPreviewModal(false);
    setLoadingMessage("Please wait your contract is Deploying...");
    setDeploy(true);
    props.handleStep4Info(email, deployNetwork);
    props.handleDeployment();
  };
  // console.log(props,"tokenId===>")
  const displayToken = () => {
    if (props?.tokenId) {
      return props.tokenId;
    }
    if (props.tokenMinted) {
      // if (+props.supply === 2) {
      //   return "1,2";
      // } else if (+props.supply === 3) {
      //   return "1,2,3";
      // } else if (+props.supply === 4) {
      //   return "1,2,3,4";
      // } else if (+props.supply === 5) {
      //   return "1,2,3,4,5";
      // }
      if (+props.supply > 1) {
        return ` 1-${props.supply}`;
      }
    }
  };
  const handleOtpVerification = () => {
    if (!otp.trim()) {
      setOtpError(true);
    } else {
      props.verifyOtp(email, otp);
    }
  };
  // console.log(props);
  return (
    <div className="step4-container w-80">
      {/* Metamask container */}
      <div className="metamask-container ">
        <div className="d-md-flex justify-content-between w-100 step-4-wrapper">
          <div class="form-container w-50">
            <div className="d-flex " style={{ flexDirection: "column" }}>
              <div className="position-relative">
                <label className="text-white step4-label">Email</label>
                {error && (
                  <p className="mb-0" style={{ color: "red" }}>
                    {errorMessage}
                  </p>
                )}
                <p
                  className="position-absolute"
                  style={{ color: "red", top: "0", left: "3.9rem" }}
                >
                  *
                </p>
                <p className="mb-1" style={{ color: "red" }}>
                  {emailError && errorMessage}
                </p>
              </div>

              <input
                className="step-4-input mt-2"
                type="text"
                onChange={(e) => onChangeEmail(e)}
                onBlur={(e) => emailValidate(e)}
                disabled={false}
                disabled={props.walletAddress ? true : false}
                value={email}
                placeholder="example@gmail.com"
                style={{ maxWidth: "22rem", color: "white" }}
              />
            </div>
            {/* <div className="position-relative mt-3">
              <label className="text-white step4-label">Network</label>
              <p
                className="position-absolute"
                style={{ color: "red", top: "0", left: "5.4rem" }}
              >
                *
              </p>
            </div>
            <select
              class="form-select mt-2 network-dropdown"
              style={{
                color: "white",
                border: "none",
                outline: "none",
                maxWidth: "22rem",
              }}
              aria-label="Default select example"
              onChange={(e) => setDeployNetwork(e.target.value)}
            >
              <option className="network-option" selected>
                Select Network
              </option>
              <option className="network-option" value="TestNet">
                TestNet
              </option>
              <option className="network-option" value="MainNet">
                MainNet
              </option>
            </select> */}

            {props.isValidate === false ? (
              <div className="mt-4">
                <label className="text-white mb-2 step4-label">
                  Verify Captcha
                </label>
                <ReactCaptcha
                  handleCaptcha={handleCaptcha}
                  handleVisible={handleVisible}
                  isVisible={isVisible}
                />
                <p className="text-danger mb-0 mt-1">
                  {captchaError && captchaMessage}
                </p>
                <button
                  // className="btn btn-primary step4-btn"
                  className="btn btn-secondary start-btn"
                  style={{ marginTop: "0.8rem" }}
                  onClick={() => submitCaptcha()}
                >
                  Submit
                </button>
              </div>
            ) : // <>
            !props.otpVerification ? (
              <div className="d-flex flex-column">
                <label className="text-white step4-label mt-4">OTP</label>
                {otpError && (
                  <p className="text-danger  my-1">Please Enter OTP</p>
                )}
                <input
                  className="step-4-input mt-2"
                  type="Number"
                  onChange={(e) => {
                    setOtpError(false);
                    setOtp(e.target.value);
                  }}
                  placeholder="Enter OTP"
                  style={{ maxWidth: "22rem", color: "white" }}
                />
                <button
                  // className="btn btn-primary step4-btn"
                  className="btn btn-secondary verify-otp-btn mt-4"
                  style={{ marginTop: "0.8rem", maxWidth: "22rem" }}
                  onClick={() => handleOtpVerification()}
                >
                  Verify
                  {/* <div class="spinner-border verify-spinner" role="status">
                    <span class="sr-only">Loading...</span>
                  </div> */}
                </button>
              </div>
            ) : (
              <div className="d-flex mt-4" style={{ flexDirection: "column" }}>
                <div>
                  <img
                    src={MetamaskImg}
                    style={{ width: "2rem", marginRight: "0.8rem" }}
                  />
                  <div className="position-relative">
                    <label className="text-white step4-label">
                      Connect Wallet
                    </label>
                    <p
                      className="position-absolute"
                      style={{ color: "red", top: "0", left: "10.4rem" }}
                    >
                      *
                    </p>
                  </div>
                </div>
                <p className="mb-0 mt-2" style={{ color: "#aaabab" }}>
                  {" "}
                  Connect Wallet with Metamask
                </p>
                <div className="d-flex align-items-center w-100">
                  <button
                    className={`btn btn-primary ${
                      props.walletAddress ? "step4-btn" : "start-btn"
                    }`}
                    style={{ marginTop: "0.8rem" }}
                    disabled={
                      props.contractReponse || props.walletAddress
                        ? true
                        : false
                    }
                    onClick={() => onConnect()}
                  >
                    {props.walletAddress ? props.walletAddress : "Connect"}
                  </button>
                  {!props.loader && !props.contractReponse && (
                    <img
                      src={RefreshImg}
                      style={{
                        width: "2rem",
                        marginLeft: "0.8rem",
                        cursor: "pointer",
                      }}
                      disabled={props.contractReponse ? true : false}
                      onClick={() => onReload()}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="discord-container discordJoinCls w-50">
            <div
              className="d-flex align-items-center"
              style={{ width: "100%" }}
            >
              <img
                src={DiscordImg}
                style={{ width: "2rem", marginRight: "1rem" }}
                alt=""
              />
              <p className="step4-label text-white mb-0"> Join Discord</p>
            </div>
            <p className="" style={{ color: "#aaabab" }}>
              “NFTs are the next big disruptor, just as the internet and
              eCommerce was.” — Gary Vaynerchuck, Investment guru Mainstream
              community of digital celebrities and collectors awaits you on
              Discord!
            </p>
            <button
              className="btn btn-secondary discord-btn  mt-2"
              style={{ padding: "0.4rem 6rem !important" }}
            >
              <a className="navbar-item" href={discordLink} target="_blank">
                Join
              </a>
            </button>
          </div>
        </div>
        {props.walletAddress && (
          <div className="w-100 text-center mt-4">
            <button
              className="btn btn-primary start-btn"
              style={{
                marginTop: "0.8rem",
                backgroundColor: "#FCD70D  !important",
                color: "black !important",
              }}
              disabled={props.contractReponse ? true : false}
              onClick={handlePreviewModal}
            >
              Preview
            </button>
          </div>
        )}
      </div>

      {/* Details */}

      {props.loader &&
      (props.contractReponse == false || props.mintingResponse === false) ? (
        <div className="w-100 text-center mt-4">
          <div
            className="spinner-border"
            style={{ color: "white" }}
            role="status"
          ></div>
          <p className="text-white">{loadingMessage}</p>
          {/* <Stepper/> */}
        </div>
      ) : (
        (props.contractReponse || props.mintingResponse) &&
        !props.contractError && (
          <div className="step4-details-container mb-2 d-flex  w-100 justify-content-center w-100">
            <div>
              <div className=" w-100 d-flex justify-content-center mt-4">
                <div className="d-flex align-items-center">
                  <img
                    src={DetailsImg}
                    style={{ width: "1.4rem", marginRight: "0.5rem" }}
                  />
                  <p className="text-white details-title mb-0">Details</p>
                </div>
              </div>
              <div className="details-box ">
                <div className="d-flex justify-content-between flex-row p-4 mt-4">
                  <div>
                    <p className="info">Contract Address</p>

                    {props.tokenMinted && props.tokenMinted.length > 0 ? (
                      <p className="info"> {"Token ID's"} </p>
                    ) : props.tokenId ? (
                      <p className="info"> {"Token ID"} </p>
                    ) : (
                      ""
                    )}

                    <p className="info">Token Standard</p>
                    <p className="info">Blockchain</p>
                  </div>

                  <div>
                    <div className="d-flex">
                      <p
                        className="info"
                        style={{
                          color: "rgb(68, 209, 249)",
                          marginRight: "0.3rem",
                        }}
                      >
                        {" "}
                        {props.contractAddress
                          ? `${String(props.contractAddress).substr(
                              0,
                              10
                            )}.....${String(props.contractAddress).substr(
                              -10,
                              String(props.contractAddress).length
                            )}`
                          : "0xsbms....dks33"}
                      </p>

                      <MdContentCopy
                        onClick={() => {
                          copy(props?.contractAddress);
                        }}
                        style={{
                          color: "white",
                          width: "1.3rem",
                          height: "1.3rem",
                          cursor: "pointer",
                          marginTop: "0rem",
                        }}
                      />
                    </div>

                    {
                      props.tokenId ? (
                        <p className="info"> {displayToken()} </p>
                      ) : props.tokenMinted && props.tokenMinted.length > 0 ? (
                        <p className="info"> {displayToken()} </p>
                      ) : (
                        ""
                      )
                      // props.tokenId ||(props.tokenMinted && props.tokenMinted.length >0) && (
                      //   <p className="info"> {displayToken()} </p>
                      // )
                    }

                    <p className="info ">ERC-721</p>
                    <p className="info ">Ethereum</p>
                    {/* //if mint successfull */}
                  </div>
                </div>
                <div className="w-100 text-center ">
                  {!props.mintingResponse && (
                    <button
                      className="btn btn-primary mintbtn"
                      onClick={() => onMint()}
                    >
                      Let's Mint
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      )}
      <PreviewModal
        previewModal={previewModal}
        handlePreviewModal={handlePreviewModal}
        handlePreviewModalSteps={handlePreviewModalSteps}
        previewModalStep={previewModalStep}
        onDeploy={onDeploy}
        info={props.info}
        maxLimit={maxLimit}
      />
    </div>
  );
};

const mapStateToProps = (state) =>
  // console.log(state, "state"),
  ({
    connectedAddress: state.dashboard.connectedAddress,
    connectedAddressFlag: state.dashboard.connectedAddressFlag,
    contractReponse: state.dashboard.contractReponse,
    contractError: state.dashboard.contractError,
    contractInfo: state.dashboard.contractInfo,
    mintingResponse: state.dashboard.mintingResponse,
    loader: state.dashboard.loader,
    tokenId: state.dashboard.tokenId,
    contractAddress: state.dashboard.contractAddress,
    tokenMinted: state.dashboard.tokenMinted,
    otpVerification: state.dashboard.otpVerification,
  });

export default connect(mapStateToProps, {
  connectWallet,
  contractResponse,
  sendOtp,
  verifyOtp,
})(Step4);
