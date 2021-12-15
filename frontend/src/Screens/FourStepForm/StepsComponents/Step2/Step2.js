import { useState } from "react";
import "./Step2.css";
import { currentStepAction } from "../../../../redux/actions/actions";
import { connect } from "react-redux";

const Step2 = (props) => {
  // console.log(props,"props in step 2")
  const [name, setName] = useState(props.name);
  const [symbol, setSymbol] = useState(props.symbol);
  const [externalLink, setExternalLink] = useState(props.externalLink);
  const [description, setDescription] = useState(props.description);
  const [supply, setSupply] = useState(props.supply);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [linkError,setLinkError]=useState(false)
  const patternValidation = val => {
    return /\s/g.test(val);
  };
  const onChangeName = (e) => {
 if(!name)
 {

   if (patternValidation(e.target.value)) {
     e.preventDefault();
   }
   else {

     setName(e.target.value);
   }
 }
 else {
  setName(e.target.value);
 }
  };

  const onChangeSymbol = (e) => {
  

    if(!symbol)
    {
   
      if (patternValidation(e.target.value)) {
        e.preventDefault();
      }
      else {
   
        setSymbol(e.target.value);
      }
    }
    else {

      setSymbol(e.target.value);
    }
   
  };

  const onChangeExternalLink = (e) => {
    if(!externalLink)
    {
   
      if (patternValidation(e.target.value)) {
        e.preventDefault();
      }
      else {
        setLinkError(false)
        setExternalLink(e.target.value);
      }
    }
    else{

      setLinkError(false)
      setExternalLink(e.target.value);
    }
  };

  const onChangeDescription = (e) => {
    
    if(!description)
    {
   
      if (patternValidation(e.target.value)) {
        e.preventDefault();
      }
      else {
   
        setDescription(e.target.value);
      }
    }
    else {

      setDescription(e.target.value);
    }
  };
  const onChangeSupply = (e) => {
    setSupply(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault()
    // console.log(name, "name==>");
    if (name.trim() === "") {
      setErrorMessage("Please Fill required fields!");
      setName('')
      setError(true);
      return "";
    }
    // console.log(name.trim().length <3)
    if(name.trim().length <3)
    {
      setErrorMessage("Name should have atleast 3 characters");
      setError(true);
      return " "

    }
    if(externalLink){

      if (
        !externalLink.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        )
      ) {
        // alert("external link must be a valid uri")
        setLinkError(true)
        return  ""
      }
    }
    // console.log(name,"nmae")
    props.handleStep2Info(name, symbol, externalLink, description, supply);
    props.currentStepAction();
  };
  return (
    <div className="step2-container " style={{marginBottom:"14%"}}>
      <form onSubmit={onSubmit}>
        
      <div className="row">
        <p style={{ color: "red" }}>{error && errorMessage} </p>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex " style={{ flexDirection: "column" }}>
            <div className="position-relative">
              <label className="text-white step-2-label">Name</label>
              <p
                className="position-absolute"
                style={{ color: "red", top: "0", left: "3.8rem" }}
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
              required={true}
              maxLength="50"
              minLength="3"
            />
          </div>

          <div className="d-flex mt-4" style={{ flexDirection: "column" }}>
            <label className="text-white step-2-label">Symbol</label>

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
            <label className="text-white step-2-label">External Link</label>
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
          <button
            type="submit"
            className="btn btn-secondary start-btn mt-5"
            // onClick={() => onSubmit()}
          >
            Next
          </button>
        </div>

        <div className="col-md-6 col-sm-12 mt-5 mt-md-0">
          <div className="d-flex " style={{ flexDirection: "column" }}>
            <label className="text-white step-2-label">Supply</label>
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
            <label className="text-white step-2-label">Description</label>

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
