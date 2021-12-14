import { useState } from "react";
import PropertiesImage from "../../../../Assets/Images/Properties.svg";
import AddBtnImage from "../../../../Assets/Images/Add Button.svg";
import LevelsBtn from "../../../../Assets/Images/Levels.svg";
import { currentStepAction } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import PropertiesModal from "../../../../components/PropertiesModal/ProppertiesModal";
import LevelsModal from "../../../../components/LevelsModal/LevelsModal";
import "./Step3.css";

const Step3 = (props) => {
  const [open, setOpen] = useState(false);
  const [openLevelModal, setOpenLevelModal] = useState(false);

  //for levels Modal
  const [levelsInputs, setlevelsInputs] = useState(props.levels);
  const [addMore, setAddMore] = useState(false);

  //for properties Modal
  const [propertiesValues, setPropertiesValues] = useState(props.properties);
  const [addMoreProperty,setAddMoreProperty]=useState(false)

  ///////
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenLevel = () => setOpenLevelModal(true);
  const handleCloseLevel = () => {
  
    setOpenLevelModal(false);
  }
  //levels Methods

  const addMoreValues = () => {
    setAddMore(!addMore);
    setlevelsInputs([...levelsInputs, { name: "", value: "", total: "" }]);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...levelsInputs];
    newFormValues[i][e.target.name] = e.target.value;
    // console.log(newFormValues,"levels handle change")
    setlevelsInputs(newFormValues);
  };

  let removeFormFields = (i) => {
      // let newFormValues = [...levelsInputs];
      if ( levelsInputs.length> 1) {
      let newFormValues = [...levelsInputs];
      newFormValues.splice(i, 1);
      setlevelsInputs(newFormValues);
    }
  };

  //propertiesMethods
  const addMoreProperties=()=>{
    setAddMoreProperty(!addMoreProperty)
    setPropertiesValues([...propertiesValues, { name: "", value: "" }])
  }
  let handleChangeProperties = (i, e) => {
    let newFormValues = [...propertiesValues];
    // console.log(newFormValues,"new form values before")
    newFormValues[i][e.target.name] = e.target.value;
    // console.log(newFormValues,"properties handle change")
    setPropertiesValues(newFormValues);
 }

 let removeFormProperties = (i) => {
      let newFormValues = [...propertiesValues];
      newFormValues.splice(i, 1);
      setPropertiesValues(newFormValues)
  
}
const onSubmit =(propertiesField)=>{
  setPropertiesValues(propertiesField)
  props.handleStep3PropertiesInfo(propertiesField)
  // props.currentStepAction()

}
const onSubmitLevels=(levelsFields)=>{
  setlevelsInputs(levelsFields)
  props.handleStep3LevelsInfo(levelsFields)
}
  return (
    <div className="step3-container " style={{ height: "45vh" }}>
      <div className="properties-container d-flex justify-content-between ">
        <div>
          <div className="d-flex align-items-center ">
            <img src={PropertiesImage} style={{ height: "2rem" }} />
            <p className="mb-0 text-white" style={{ marginLeft: "1rem" }}>
              Properties
            </p>
          </div>
          <p className="text-white mt-1">
         Textual traits that show up as a rectangles
          </p>
        </div>

        <div onClick={() => handleOpen()}>
          <img src={AddBtnImage} style={{ height: "1.5rem",cursor:"pointer"  }} />
        </div>
      </div>

      <div className="properties-container d-flex justify-content-between mt-4 ">
        <div>
          <div className="d-flex align-items-center ">
            <img src={LevelsBtn} style={{ height: "2rem" }} />
            <p className="mb-0 text-white" style={{ marginLeft: "1rem" }}>
              Levels
            </p>
          </div>
          <p className="text-white mt-1">
            Numerical traits that show as a progress bar
          </p>
        </div>

        <div onClick={() => handleOpenLevel()}>
          <img src={AddBtnImage} style={{ height: "1.5rem",cursor:"pointer" }} />
        </div>
      </div>
      <button
        type="button"
        className="btn btn-secondary start-btn mt-5 mb-5"
        onClick={() =>  props.currentStepAction()}
      >
        Next
      </button>

      <PropertiesModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        addMoreProperties={addMoreProperties}
        handleChangeProperties={handleChangeProperties}
        removeFormProperties={removeFormProperties}
        propertiesValues={propertiesValues}
        addMoreProperty={addMoreProperty}
        onSubmit={onSubmit}
      />
      <LevelsModal
        open={openLevelModal}
        handleOpen={handleOpenLevel}
        handleClose={handleCloseLevel}
        addMoreValues={addMoreValues}
        handleChange={handleChange}
        removeFormFields={removeFormFields}
        levelsInputs={levelsInputs}
        addMore={addMore}
        onSubmitLevels={onSubmitLevels}
      />
    </div>
  );
};

const mapStateToProps = (state) => (
  // console.log(state, "state"),
  {
    currentStep: state.dashboard.currentStep,
  }
);

export default connect(mapStateToProps, {
  currentStepAction,
})(Step3);
