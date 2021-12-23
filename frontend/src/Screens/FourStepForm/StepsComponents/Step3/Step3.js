import { useState } from "react";

import PropertiesImage from "../../../../assets/images/Properties.svg";
import AddBtnImage from "../../../../assets/images/Add Button.svg";
import LevelsBtn from "../../../../assets/images/Levels.svg";
import { currentStepAction } from "../../../../redux/actions/actions";
import { connect } from "react-redux";
import PropertiesModal from "../../../../components/PropertiesModal/ProppertiesModal";
import LevelsModal from "../../../../components/LevelsModal/LevelsModal";
import "./Step3.css";
////For Accordian
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, ListItem, ListItemText } from "@mui/material";
import InfoComp from "../../infoComp";
/////////////////

const Step3 = (props) => {
  const [open, setOpen] = useState(false);
  const [openLevelModal, setOpenLevelModal] = useState(false);

  //for levels Modal
  const [levelsInputs, setlevelsInputs] = useState(props.levels);
  const [addMore, setAddMore] = useState(false);

  //for properties Modal
  const [propertiesValues, setPropertiesValues] = useState(props.properties);
  const [addMoreProperty, setAddMoreProperty] = useState(false);

  ///////
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenLevel = () => setOpenLevelModal(true);
  const handleCloseLevel = () => {
    setOpenLevelModal(false);
  };
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
    if (levelsInputs.length > 1) {
      let newFormValues = [...levelsInputs];
      newFormValues.splice(i, 1);
      setlevelsInputs(newFormValues);
    }
  };

  //propertiesMethods
  const addMoreProperties = () => {
    setAddMoreProperty(!addMoreProperty);
    setPropertiesValues([...propertiesValues, { name: "", value: "" }]);
  };
  let handleChangeProperties = (i, e) => {
    let newFormValues = [...propertiesValues];
    // console.log(newFormValues,"new form values before")
    newFormValues[i][e.target.name] = e.target.value;
    // console.log(newFormValues,"properties handle change")
    setPropertiesValues(newFormValues);
  };

  let removeFormProperties = (i) => {
    let newFormValues = [...propertiesValues];
    newFormValues.splice(i, 1);
    setPropertiesValues(newFormValues);
  };
  const onSubmit = (propertiesField) => {
    setPropertiesValues(propertiesField);
    props.handleStep3PropertiesInfo(propertiesField);
    // props.currentStepAction()
  };
  const onSubmitLevels = (levelsFields) => {
    setlevelsInputs(levelsFields);
    props.handleStep3LevelsInfo(levelsFields);
  };
  function onClickDelete(event) {
    event.stopPropagation();
    // Handle click here
  }
  // const {propertiesValues}=props;
  return (
    <div className="step3-container " style={{ height: "45vh" }}>
      {/* ///////////////////// */}
      <Accordion
        className="transBG"
        style={{ backgroundColor: "unset !important" }}
      >
        <AccordionSummary
          className="transBG"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {/* <Typography>Accordion 1</Typography> */}
          <div
            className="properties-container d-flex justify-content-between "
            onClick={onClickDelete}
          >
            <div className="ml-2">
              <div className="d-flex align-items-center ">
                <img src={PropertiesImage} style={{ height: "2rem" }} />
                <p className="mb-0 text-white" style={{ marginLeft: "1rem" }}>
                  Properties <InfoComp text="Textual Traits of the NFTs" />
                </p>
                <img
                  src={AddBtnImage}
                  onClick={() => handleOpen()}
                  className="ml-3"
                  style={{ height: "1.5rem", cursor: "pointer" }}
                />
              </div>
              <p className="text-white mt-1">
                Textual traits that show up as a rectangles
              </p>
            </div>

            {/* <div className="content-center"  >
          <img src={AddBtnImage} style={{ height: "1.5rem",cursor:"pointer"  }} />
        </div> */}
          </div>
        </AccordionSummary>
        <AccordionDetails className="transBG">
          {propertiesValues && propertiesValues.length > 0 && (
            <ListItem>
              <Grid className="mt-4 text-white list-title" item xs={6}>
                {"Name"}
              </Grid>
              <Grid className="mt-4 text-white list-title" item xs={6}>
                {"Value"}
              </Grid>
            </ListItem>
          )}
          <ListItem>
            <Grid container xs={12}>
              {propertiesValues && propertiesValues.length > 0 ? (
                propertiesValues.map((property, i) => {
                  return (
                    <>
                      <Grid className="mt-4 text-white list-item" item xs={6}>
                        {property.name}
                      </Grid>
                      <Grid className="mt-4 text-white list-item" item xs={6}>
                        {property.value}
                      </Grid>
                    </>
                  );
                })
              ) : (
                <p className="text-white">{"No Properies Found"} </p>
              )}
            </Grid>
          </ListItem>
        </AccordionDetails>
      </Accordion>

      {/* /////////////////// */}
      <Accordion className="transBG">
        <AccordionSummary
          className="transBG"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {/* <Typography>Accordion 1</Typography> */}
          <div
            className="properties-container d-flex justify-content-between mt-4 "
            onClick={onClickDelete}
          >
            <div className="ml-2">
              <div className="d-flex align-items-center ">
                <img src={LevelsBtn} style={{ height: "2rem" }} />
                <p className="mb-0 text-white" style={{ marginLeft: "1rem" }}>
                  Levels{" "}
                  <InfoComp text="Numerical traits that shows as a progress bar." />
                </p>
                <img
                  src={AddBtnImage}
                  onClick={() => handleOpenLevel()}
                  className="ml-5"
                  style={{ height: "1.5rem", cursor: "pointer" }}
                />
              </div>
              <p className="text-white mt-1">
                Numerical traits that show as a progress bar
              </p>
            </div>

            {/* <div className="content-center" onClick={() => handleOpenLevel()}>
          <img src={AddBtnImage} style={{ height: "1.5rem",cursor:"pointer" }} />
        </div> */}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {levelsInputs && levelsInputs.length > 0 && (
            <ListItem>
              <Grid className="mt-4 text-white list-title" item xs={4}>
                {"Name"}
              </Grid>
              <Grid className="mt-4 text-white list-title" item xs={4}>
                {"Value"}
              </Grid>
              <Grid className="mt-4 text-white list-title" item xs={4}>
                {"Total"}
              </Grid>
            </ListItem>
          )}

          <ListItem>
            <Grid container xs={12}>
              {levelsInputs && levelsInputs.length > 0 ? (
                levelsInputs.map((level, i) => {
                  return (
                    <>
                      <Grid className="mt-4 text-white list-item" item xs={4}>
                        {level.name}
                      </Grid>
                      <Grid className="mt-4 text-white list-item" item xs={4}>
                        {level.value}
                      </Grid>
                      <Grid className="mt-4 text-white list-item" item xs={4}>
                        {level.total}
                      </Grid>
                    </>
                  );
                })
              ) : (
                <p className="text-white">{"No Levels Found"}</p>
              )}
            </Grid>
          </ListItem>
        </AccordionDetails>
      </Accordion>

      <button
        type="button"
        className="btn btn-secondary start-btn mt-3 mb-5"
        onClick={() => props.currentStepAction()}
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

const mapStateToProps = (state) =>
  // console.log(state, "state"),
  ({
    currentStep: state.dashboard.currentStep,
  });

export default connect(mapStateToProps, {
  currentStepAction,
})(Step3);
