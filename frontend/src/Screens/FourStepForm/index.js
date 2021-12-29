import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  currentStepAction,
  currentStepDecrement,
  clearCurrentStep,
  deployContract,
  mintToken,
  connectWallet,
} from "../../redux/actions/actions";
import { connect } from "react-redux";
import "./index.css";
import Step1 from "./StepsComponents/Step1/Step1";
import Step2 from "./StepsComponents/Step2/Step2";
import Step3 from "./StepsComponents/Step3/Step3";
import Step4 from "./StepsComponents/Step4/Step4";
import { ProgressBar } from "react-bootstrap";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";
import { connectMetamaskCopy, getNetworkNameByChainId } from "../../utils/web3";
import GaTracker from "../../gaTracker/gaTracket";


const FourStepForm = (props) => {
  // console.log(props, "currentStep==>");
  GaTracker();

  //step 1 form
  const [imgFile, setImgFile] = useState({});
  const [img, setImge] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  //step 2 form
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState(1);

  //step 3 form
  const [properties, setProperties] = useState([]);
  const [levels, setLevels] = useState([]);

  //step 4 form
  const [email, setEmail] = useState("");
  // const [deployNetwork, setDeployNetwork] = useState("");
  const [isValidate, setIsvalidate] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [connectedNetwork, setNetworkConnected] = useState("");

  /////////
  const history = useHistory();
  const { currentStep } = props;

  const handleGoBack = () => {
    if(props.mintingResponse){
      props.clearCurrentStep();
      history.push("/");
      return ""
    }
    if (currentStep === 1) {
      history.push("/");
    } else {
      props.currentStepDecrement();
    }
  };
  useEffect(()=>{

  },[videoUrl])

  const handleBackHome = () => {
    history.push("/");
    props.clearCurrentStep();
  };
  const handleStep1Info = (file, video, imgUrl) => {
    // console.log(file, "file==>");
    setImgFile(file);
    if (video) {
      setVideoUrl(video);
      setImge("");
    }
    if (imgUrl) {
      setImge(imgUrl);
      setVideoUrl("");
    }
  };
  const handleStep2Info = (
    nameValue,
    symbolvalue,
    externalLinkValue,
    descriptionValue,
    supplyValue
  ) => {
    // console.log(nameValue, "NAME");

    setName(nameValue);

    setSymbol(symbolvalue);

    setExternalLink(externalLinkValue);

    setDescription(descriptionValue);

    setSupply(supplyValue);
  };

  const handleStep3PropertiesInfo = (propertiesValues) => {
    // console.log("hanlde step 3 info")
    setProperties(propertiesValues);
  };
  const handleStep3LevelsInfo = (levelsInputs) => {
    setLevels(levelsInputs);
  };

  const handleStep4Info = (emailValue, network) => {
    setEmail(emailValue);
    // setDeployNetwork(network);
  };

  const handleMinting = async (contractInfo, email) => {

    props.mintToken(contractInfo, walletAddress, +supply, email);


  };

  // const connectWalletAddress=()=>{

  // }
  const handleDeployContract = async () => {
    connectMetamaskCopy(walletAddress)
      .then((address) => {
      
        if (address) {
     
          if (walletAddress) {
          }
          setWalletAddress(address);
        }
      })
      .catch((err) => console.log(err, "err1"));

    handleNetwork();
  };

  const handleNetwork = () => {
    getNetworkNameByChainId()
      .then((network) => {
        // console.log(network,"connected network==>")
        setNetworkConnected(network);
      })
      .catch((err) => {});
  };

  const handleDeployment = () => {
    let obj = {
      name,
      description,
      symbol,
      externalLink,
      supply,
      image: imgFile,
      email,
      walletAddress,
    };
    props.deployContract(jsonToFormData(obj), walletAddress, +supply);
  };

  function buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? "" : data;

      formData.append(parentKey, value);
    }
  }
  function jsonToFormData(data) {
    const formData = new FormData();

    buildFormData(formData, data);

    formData.append("attributes", JSON.stringify(properties));
    formData.append("levels", JSON.stringify(levels));

    return formData;
  }



  const handleCaptchaValidation = (value) => {
    setIsvalidate(value);
  };

  return (
    <div className="home-container steps-container">
      <div className="steps ">
        <div className="steps-menu py-5">
          {currentStep > 0 && (
            <div
              className="text-white d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleGoBack()}
            >
              <HiOutlineChevronDoubleLeft
                style={{ marginRight: "0.4rem" }}
                color="#44D1F9"
              />
              <p className="mb-0 mt-0">{props.mintingResponse?"Home":" Go Back"}</p>
            </div>
          )}
          {currentStep === 4 && !props.mintingResponse && (
            <div
              className="text-white"
              style={{ cursor: "pointer" }}
              onClick={() => handleBackHome()}
            >
              Back to Home
            </div>
          )}
        </div>
        {currentStep && currentStep === 1 ? (
          <Step1
            handleStep1Info={handleStep1Info}
            imageURl={img}
            videoURL={videoUrl}
          />
        ) : currentStep === 2 ? (
          <Step2
            handleStep2Info={handleStep2Info}
            name={name}
            symbol={symbol}
            externalLink={externalLink}
            description={description}
            supply={supply}
          />
        ) : currentStep === 3 ? (
          <Step3
            handleStep3PropertiesInfo={handleStep3PropertiesInfo}
            handleStep3LevelsInfo={handleStep3LevelsInfo}
            properties={properties}
            levels={levels}
          />
        ) : currentStep === 4 ? (
          <Step4
            handleStep4Info={handleStep4Info}
            handleDeployContract={handleDeployContract}
            handleMinting={handleMinting}
            supply={supply}
            email={email}
            handleCaptchaValidation={handleCaptchaValidation}
            isValidate={isValidate}
            walletAddress={walletAddress}
            handleDeployment={handleDeployment}
            info={{
              name,
              symbol,
              externalLink,
              description,
              properties,
              levels,
              img,
              videoUrl,
              email,
              supply,
            }}
            connectedNetwork={connectedNetwork}
          />
        ) : (
          ""
        )}
        {/* <div
          className="progress-bar-custom"
          style={{ width: "64%", margin: "14rem auto 0 auto" }}
        >
          <ProgressBar
            className={`${
              currentStep === 4 ? "progress-bar-green" : "progress-bar-yellow"
            }`}
            now={currentStep * 25}
          />
          <p className="text-white text-center mt-2">{currentStep}/4</p>
        </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) =>
(
    console.log(state, "state"),
    {
    currentStep: state.dashboard.currentStep,
    contractInfo: state.dashboard.contractInfo,
    contractReponse:state.dashboard.contractReponse,
    mintingResponse:state.dashboard.mintingResponse
  });

export default connect(mapStateToProps, {
  currentStepAction,
  currentStepDecrement,
  clearCurrentStep,
  deployContract,
  mintToken,
  connectWallet,
})(FourStepForm);
