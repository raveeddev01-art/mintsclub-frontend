import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LevelsImage from "../../assets/images/Levels.svg";
import "./LevelModal.css";
import { connect } from "react-redux";
import { currentStepAction } from "../../Redux/actions/actions";
import { IoMdClose } from "react-icons/io";
import { BsFillXCircleFill } from "react-icons/bs";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 630,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LevelsModal = (props) => {
  const [levelsInputs, setlevelsInputs] = React.useState(
    props.levelsInputs
  );
  const [addMore, setAddMore] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage,setErrorMessage]=React.useState("")
  const [validate,setValidate]=React.useState(false)

  React.useEffect(() => {}, []);

  const addMoreValues = () => {
    setAddMore(!addMore);
    setlevelsInputs([...levelsInputs, { name: "", value: "", total: "" }]);
  };
  let handleChange = (i, e) => {
    setError(false);
    let newFormValues = [...levelsInputs];
    newFormValues[i][e.target.name] = e.target.value;
    setlevelsInputs(newFormValues);
  };

  let removeFormFields = (i) => {
    setError(false);
      let newFormValues = [...levelsInputs];
      newFormValues.splice(i, 1);
      setlevelsInputs(newFormValues);
 
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    var errorFlag = false;
    levelsInputs.map((item) => {
      if (item.name.trim() === "" || item.value === "" || item.total ==="") {
        errorFlag = true;
        setError(true);
        setErrorMessage("Please fill all fields to save!")
        return "";
      }
      if(+item.value > +item.total){
        alert("inside")
        setError(true)
        setValidate(true)
        setErrorMessage("Value should be less then total!")
        return "";
      }
 
    });
    if (!errorFlag) {
      props.onSubmitLevels(levelsInputs);
      props.handleClose();
    }
  };
//  const handleValue=(item)=>{
//    if(item.value > item.total){

//      setError(true)
//      return true
//    }
//    return false
//  }
//  const handleTotal=(item)=>{

//  }
// console.log(levelsInputs,"props.levelsInputs")

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="properties-modal-container position-relative">
            <IoMdClose
              className="text-white position-absolute"
              style={{
                top: "1",
                right: "2",
                color: "#00d3f3",
                fontSize: "1.8rem",
                cursor:"pointer"
              }}
              onClick={() => props.handleClose()}
            />
            <div className="title-container d-flex w-100 justify-content-center ">
              <img src={LevelsImage} alt={"levels"} style={{ height: "2rem" }} />
              <p
                className="text-white"
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  marginLeft: "1rem",
                }}
              >
                Add Levels
              </p>
            </div>
              {/* <p style={{color:"red"}}>{"Value should be less then total"}</p> */}

            <p className="text-center mb-0" style={{ color: "red" }}>
              {error && "Please fill all fields to save!"}
            </p>
            <p className="text-center w-100 p-4 text-white" style={{color:"#FFFFFF",opacity:"0.70",width:"80%",fontSize:"14px" }}>
           Levels show up underneath your item, are clickable, and can be
filtered in you collection’s sidebar.
            </p>
       <form onSubmit={handleSubmit}>
            <div className="row levels-scroll p-3" style={{height:`${levelsInputs &&   levelsInputs.length > 0 ?" 22vh":"14vh"}`}}>
              {levelsInputs &&
                levelsInputs.length > 0 &&
              levelsInputs.map((item, i) => {
                return (
                  <div className="d-flex" key={i}>
                    <div className="col-6 mt-2 " key={i}>
                      <div
                        className="d-flex"
                        style={{ flexDirection: "column" }}
                      >
                     
                        <label
                          className="text-white"
                          style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                        >
                          Name
                        </label>

                        <input
                          className="step-2-input mt-3 "
                          type="text"
                          name="name"
                          onChange={(e) => handleChange(i, e)}
                          value={item.name || ""}
                          placeholder="Name"
                          maxLength="50"
                          style={{
                            backgroundColor: "#000e29",
                            maxWidth: "84%",
                            padding: "0.6rem 1rem",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 mt-3">
               
                      <div
                        className="d-flex position-relative"
                        style={{ flexDirection: "column" }}
                      >
                          
                          
                        <label
                          className="text-white"
                          style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                        >
                          Value
                        </label>
                        {/* <p style={{color:"red"}}>{"value should be less then total"}</p> */}
                        <div className="d-flex align-items-center  w-100">

                          <input
                            className={`step-2-input first-value mt-2 ${validate && item.value > item.total ? "levels-value":""}`}
                            type="number"      
                            min="1"
                            max={item.total ?item.total :"1"}
                            onChange={(e) => handleChange(i, e)}
                            value={item.value || ""}
                            placeholder="Value"
                            name="value"
                    
                            style={{
                              backgroundColor: "#000e29",
                              maxWidth: "84%",
                              padding: "0.6rem 1rem",
                            }}
                          />
                       
                          
                          <p className="text-white mb-0 value-label">Of</p>
                          <input
                            className={`step-2-input first-value mt-2 ${validate && item.total < item.value ? "levels-value":""}`}
                            type="number"
                            min={item.value ?item.value :"1"}
                            max="9999"
                            name="total"
                            placeholder="total"
                   
                            onChange={(e) => handleChange(i, e)}
                            value={item.total || ""}
                            style={{
                              backgroundColor: "#000e29",
                              maxWidth: "84%",
                              padding: "0.6rem 1rem",
                            }}
                          />
                        </div>
                        <BsFillXCircleFill
                          className="position-absolute levels-cross-icon"
                          style={{
                            color: "#00d3f3",
                            top: "3rem",
                            right: "0",
                            cursor: "pointer",
                          }}
                          onClick={() => removeFormFields(i)}
                          />
                      </div>
                        
                    </div>
                  </div>
                );
              })}

              <p
                className=" mt-4"
                style={{ color: "#00d3f3" ,cursor:"pointer"}}
                onClick={() => addMoreValues()}
              >
                {" "}
                Add Level
              </p>
              <div className="W-100 text-center"></div>
            </div>
            {/* <button type="submit" class="btn btn-primary">Submit</button> */}
        
            <div className="w-100 text-center">
              <button
                type="submit"
                className="btn btn-secondary start-btn mt-5 text-center"
                style={{ width: "9rem" }}
                disabled={
                  levelsInputs && levelsInputs?.length > 0
                    ? false
                    : true
                }
                // onClick={() => {
                //   handleSubmit()
                // }}
              >
                Save
              </button>
            </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => (
  // console.log(state, "state"),
  {
    currentStep: state.reducer.currentStep,
  }
);

export default connect(mapStateToProps, {
  currentStepAction,
})(LevelsModal);
