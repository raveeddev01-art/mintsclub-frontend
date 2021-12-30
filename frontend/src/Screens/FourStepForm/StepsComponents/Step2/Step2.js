import { useState ,useEffect} from "react";
import "./Step2.css";
import { currentStepAction } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import InfoComp from "../../infoComp";
import { ProgressBar } from "react-bootstrap";

const Step2 = (props) => {
  // console.log(props,"props in step 2")
  const [name, setName] = useState(props.name);
  const [symbol, setSymbol] = useState(props.symbol);
  const [externalLink, setExternalLink] = useState(props.externalLink);
  const [description, setDescription] = useState(props.description);
  const [supply, setSupply] = useState(props.supply);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [linkError, setLinkError] = useState(false);

  const dataDescription = {
    name: "Name of NFT contract",
    supply: "Number of NFTs to mint",
    externalLink: "Link of NFT details page",
    symbol: "Symbol for NFT contract",
    description: "Description of NFT",
  };


  const patternValidation = (val) => {
    return /\s/g.test(val);
  };

  const httpValidation = (val) => {
    return /https|http:\/\/.*.com/g.test(val);
  };

  const onChangeName = (e) => {
    if (!name) {
      if (patternValidation(e.target.value.trimStart())) {
        e.preventDefault();
      } else {
        setName(e.target.value.trimStart());
      }
    } else {
      setName(e.target.value.trimStart());
    }
  };

  const onChangeSymbol = (e) => {
    if (!symbol) {
      if (patternValidation(e.target.value.trimStart())) {
        e.preventDefault();
      } else {
        setSymbol(e.target.value.trimStart());
      }
    } else {
      setSymbol(e.target.value.trimStart());
    }
  };

  const onChangeExternalLink = (e) => {
    const { value } = e.target;
    if (value && value.length > 0) {
      setLinkError(false);
      setExternalLink(value.trimStart());
    } else {
      setExternalLink(value);
    }
  };

  const onChangeDescription = (e) => {
    if (!description) {
      if (patternValidation(e.target.value.trimStart())) {
        e.preventDefault();
      } else {
        setDescription(e.target.value.trimStart());
      }
    } else {
      setDescription(e.target.value.trimStart());
    }
  };

  const onChangeSupply = (e) => {
    setSupply(e.target.value);
  };

  const onSubmit = (e) => {
    // props.scrollToTop()
    let validatePointer = true;
    e.preventDefault();
    // console.log(name, "name==>");
    if (name.trim() === "") {
      setErrorMessage("Please Fill required fields!");
      toast.error("Please Fill required fields!");
      setName("");
      setError(true);
      validatePointer = false;
      return "";
    }
    // console.log(name.trim().length <3)
    if (name.trim().length < 3) {
      setErrorMessage("Name should have atleast 3 characters");
      toast.error("Name should have atleast 3 characters.");
      validatePointer = false;
      setError(true);
      return " ";
    }
    // if (externalLink) {
    //   // /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    //   if (
    //     !externalLink.match(
    //       /^(http[s]?:\/\/){0,1}(w{3,3}\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/
    //     )
    //   ) {
    //     // alert("external link must be a valid uri")
    //     validatePointer = false;
    //     setLinkError(true);
    //     toast.error("Please provide a valid Url.");
    //     return "";
    //   }
    // }
    // console.log(name,"nmae")
    if (validatePointer) {
      props.handleStep2Info(name, symbol, externalLink, description, supply);
      props.currentStepAction();
    }
  };
  return (
    <div className="step2-container "  style={{ marginBottom: "14%" }}>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="d-flex" style={{ color: "red" }}>
              {error && errorMessage}{" "}
            </div>
            <div className="d-flex " style={{ flexDirection: "column" }}>
              <div className="position-relative">
                <label className="text-white step-2-label">
                  Name <InfoComp text={dataDescription.name} />
                </label>
                <p
                  className="position-absolute"
                  style={{ color: "red", bottom: "-6px", left: "52px" }}
                >
                  *
                </p>
              </div>
              <input
                className="step-2-input mt-2"
                type="text"
                onChange={(e) => onChangeName(e)}
                value={name}
                placeholder="item name"
                // required={true}
                maxLength="50"
                minLength="3"
              />
            </div>

            <div className="d-flex mt-4" style={{ flexDirection: "column" }}>
              <label className="text-white step-2-label ">
                Symbol <InfoComp text={dataDescription.symbol} />
              </label>

              {/* <p className="" style={{ maxWidth: "80%", color: "#A9A9A9" }}>
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.Printing and typesetting industry{" "}
            </p> */}
              <input
                className="step-2-input mt-2"
                type="text"
                onChange={(e) => onChangeSymbol(e)}
                value={symbol}
                placeholder="NFT Symbol"
                maxLength="50"
              />
            </div>

            <div className="d-flex  mt-4" style={{ flexDirection: "column" }}>
              <label className="text-white step-2-label">
                External Link <InfoComp text={dataDescription.externalLink} />
              </label>

              {/* <p className="" style={{ maxWidth: "80%", color: "#A9A9A9" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.Printing and typesetting industry{" "}
            </p> */}
              {/* <p style={{color:"red"}}>{linkError &&"External Link must be a valid Url"}</p> */}
              <input
                className="step-2-input mt-1"
                type="url"
                onChange={(e) => onChangeExternalLink(e)}
                value={externalLink}
                placeholder="https://yousite.com/item.1004"
                maxLength="50"
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12 mt-5 mt-md-0">
            <div className="d-flex " style={{ flexDirection: "column" }}>
              <label className="text-white step-2-label">
                Supply <InfoComp text={dataDescription.supply} />
              </label>
              <p className="mb-0" style={{ maxWidth: "80%", color: "#A9A9A9" }}>
                The number of copies that can be minted{" "}
              </p>
              <input
                className="step-2-input mt-2"
                type="number"
                onChange={(e) => onChangeSupply(e)}
                value={supply}
                placeholder="supply"
                max="100"
                min="1"
              />
              {/* <select
              className="form-select mt-2 network-dropdown"
              style={{
                color: "white",
                border: "none",
                outline: "none",
                maxWidth: "22rem",
              }}
              aria-label="Default select example"
              value={supply}
              onChange={(e) => onChangeSupply(e)}
            >
              <option className="network-option" value="1" defaultValue={"1"}>
                1
              </option>
              <option className="network-option" value="2">
                2
              </option>
              <option className="network-option" value="3">
                3
              </option>
              <option className="network-option" value="4">
                4
              </option>
              <option className="network-option" value="5">
                5
              </option>
            </select> */}
            </div>
            {/* //////////////////////// */}
            <div className="d-flex  mt-4" style={{ flexDirection: "column" }}>
              <label className="text-white step-2-label">
                Description <InfoComp text={dataDescription.description} />
              </label>

              {/* <p className="" style={{ maxWidth: "80%", color: "#A9A9A9" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.Printing and typesetting industry{" "}
            </p> */}
              <textarea
                className="description p-3 mt-2"
                placeholder="Add Description"
                onChange={onChangeDescription}
                value={description}
                style={{ color: "white" }}
                maxLength="600"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12 mt-5 mt-md-0">
            <button
              type="submit"
              className="btn btn-secondary start-btn mt-5"
              // onClick={() => onSubmit()}
            >
              Next
            </button>
          </div>
          <div
            className="progress-bar-custom"
            style={{ width: "64%", margin: "3rem auto 0 auto" }}
          >
            <ProgressBar
              className={`${
                props.currentStep === 4
                  ? "progress-bar-green"
                  : "progress-bar-yellow"
              }`}
              now={props.currentStep * 25}
            />
            <p className="text-white text-center mt-2">{props.currentStep}/4</p>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) =>
  // console.log(state, "state"),
  ({
    currentStep: state.dashboard.currentStep,
  });

export default connect(mapStateToProps, {
  currentStepAction,
})(Step2);
