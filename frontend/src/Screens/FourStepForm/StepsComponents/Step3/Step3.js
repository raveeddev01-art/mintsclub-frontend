import { useState, useEffect } from "react";

import PropertiesImage from "../../../../assets/images/Properties.svg";
import AddBtnImage from "../../../../assets/images/Add Button.svg";
import LevelsBtn from "../../../../assets/images/Levels.svg";
import {
  currentStepAction,
  setProperties,
  setLevels,
} from "../../../../redux/actions/actions";
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
import { BsFillInfoCircleFill } from "react-icons/bs";
/////////////////
import { ProgressBar } from "react-bootstrap";
import PropertyModal from "./PropertyModal";
import LevelModal from "./LevelsModal";

const Step3 = (props) => {
  // const [open, setOpen] = useState(false);
  // const [openLevelModal, setOpenLevelModal] = useState(false);

  ///////
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const handleOpenLevel = () => setOpenLevelModal(true);
  // const handleCloseLevel = () => {
  //   setOpenLevelModal(false);
  // };

  const onSubmit = (propertiesField) => {
    props.setProperties(propertiesField);
  };
  const onSubmitLevels = (levelsFields) => {
    props.setLevels(levelsFields);
  };
  function onClickDelete(event) {
    event.stopPropagation();
    // Handle click here
  }

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
                <p className="mb-0 text-white " style={{ marginLeft: "1rem" }}>
                  Properties{" "}
                  <span className="infoIcon position-relative">
                    <BsFillInfoCircleFill />{" "}
                    <span className="tooltiptext properties-tooltip">
                      Textual Traits Of NFTs
                    </span>
                  </span>
                </p>
                {/* <img
                  src={AddBtnImage}
                  onClick={() => handleOpen()}
                  className="ml-3"
                  style={{ height: "1.5rem", cursor: "pointer" }}
                /> */}
                <PropertyModal
                  propertiesValues={props.properties}
                  onSubmit={onSubmit}
                />
              </div>
              <p className="text-white mt-1">
                Textual traits that show up as a rectangles
              </p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="transBG">
          {props.properties && props.properties.length > 0 && (
            <ListItem>
              <Grid className="text-white list-title py-0" item xs={6}>
                {"Name"}
              </Grid>
              <Grid className="text-white list-title py-0" item xs={6}>
                {"Value"}
              </Grid>
            </ListItem>
          )}
          <ListItem>
            <Grid container xs={12} className="properties-grid">
              {props.properties && props.properties.length > 0 ? (
                props.properties.map((property, i) => {
                  return (
                    <>
                      <>
                        <Grid
                          className="py-2 text-white list-item break-word pr-1"
                          item
                          xs={6}
                        >
                          {property.name}
                        </Grid>
                        <Grid
                          className="py-2 text-white list-item break-word pl-1"
                          item
                          xs={6}
                        >
                          {property.value}
                        </Grid>
                      </>
                      <span className="grid-divider"></span>
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
                  <span className="infoIcon position-relative">
                    <BsFillInfoCircleFill />{" "}
                    <span className="tooltiptext properties-tooltip">
                      Numerical Traits Of NFTs
                    </span>
                  </span>
                </p>
                <LevelModal
                  levels={props.levels}
                  onSubmitLevels={onSubmitLevels}
                />
              </div>
              <p className="text-white mt-1">
                Numerical traits that show as a progress bar
              </p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {props.levels && props.levels.length > 0 && (
            <ListItem>
              <Grid className="text-white list-title py-0" item xs={4}>
                {"Name"}
              </Grid>
              <Grid className="text-white list-title py-0" item xs={4}>
                {"Value"}
              </Grid>
              <Grid className="text-white list-title py-0" item xs={4}>
                {"Total"}
              </Grid>
            </ListItem>
          )}

          <ListItem>
            <Grid container xs={12} className="properties-grid">
              {props.levels && props.levels.length > 0 ? (
                props.levels.map((level, i) => {
                  return (
                    <>
                      <>
                        <Grid
                          className="py-2 text-white list-item break-word"
                          item
                          xs={4}
                        >
                          {level.name}
                        </Grid>
                        <Grid className="py-2 text-white list-item" item xs={4}>
                          {level.value}
                        </Grid>
                        <Grid className="py-2 text-white list-item" item xs={4}>
                          {level.total}
                        </Grid>
                      </>
                      <span className="grid-divider"></span>
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

      {/* <PropertiesModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        propertiesValues={props.properties}
        onSubmit={onSubmit}
      /> */}
      {/* <LevelsModal
        open={openLevelModal}
        handleOpen={handleOpenLevel}
        handleClose={handleCloseLevel}
        levelsInputs={props.levels}
        onSubmitLevels={onSubmitLevels}
      /> */}
    </div>
  );
};

const mapStateToProps = (state) =>
  // console.log(state, "state"),
  ({
    currentStep: state.dashboard.currentStep,
    levels: state.dashboard.levels,
    properties: state.dashboard.properties,
  });

export default connect(mapStateToProps, {
  currentStepAction,
  setLevels,
  setProperties,
})(Step3);
