import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropertiesMOdal from "../../assets/images/Properties.svg";
import "./ProppertiesModal.css";
import { connect } from "react-redux";
import { currentStepAction } from "../../redux/actions/actions";
import { IoMdClose } from "react-icons/io";
import { BsFillXCircleFill } from "react-icons/bs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = (props) => {
  const [propertiesValues, setPropertiesValues] = React.useState(
    props.propertiesValues
  );
  const [addMore, setAddMore] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {}, []);

  const addMoreValues = () => {
    setAddMore(!addMore);
    setPropertiesValues([...propertiesValues, { name: "", value: "" }]);
  };
  let handleChange = (i, e) => {
    setError(false);
    let newFormValues = [...propertiesValues];
    newFormValues[i][e.target.name] = e.target.value;
    setPropertiesValues(newFormValues);
  };

  let removeFormFields = (i) => {
    setError(false);
    let newFormValues = [...propertiesValues];
    newFormValues.splice(i, 1);
    setPropertiesValues(newFormValues);
  };

  const handleSubmit = () => {

    var errorFlag = false;
    propertiesValues.map((item) => {
      if (item.name.trim() === "" || item.value.trim() === "") {
        errorFlag = true;
        setError(true);
        return "";
      }
    });
    if (!errorFlag) {
      props.onSubmit(propertiesValues);
      props.handleClose();
    }
  };
  // console.log(props.propertiesValues, "propertiesValues");
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{ maxHeight: "500px", width: "35%" }}
          className="leads-modal"
        >
          <div className="properties-modal-container position-relative">
            <IoMdClose
              className=" position-absolute"
              style={{
                top: "1",
                right: "2",
                fontSize: "1.8rem",
                cursor: "pointer",
              }}
              onClick={() => props.handleClose()}
            />
            <div className="title-container d-flex w-100 justify-content-center ">
              <img src={PropertiesMOdal} style={{ height: "2rem" }} />
              <p
                className="text-white mt-0"
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  marginLeft: "1rem",
                }}
              >
                Properties
              </p>
            </div>

            <p className="text-center mb-0" style={{ color: "red" }}>
              {error && "Please fill all fields to save!"}
            </p>
            <p
              className="text-center w-100 p-4 text-white"
              style={{
                color: "#FFFFFF",
                opacity: "0.70",
                width: "80%",
                fontSize: "14px",
              }}
            >
              Properties show up underneath your item, are clickable, and can be
              filtered in you collection’s sidebar.
            </p>

            <div
              className="row modal-scroll "
              style={{
                height: `${
                  propertiesValues && propertiesValues.length > 0
                    ? " 15vh"
                    : "7vh"
                }`,
              }}
            >
              {propertiesValues &&
                propertiesValues.length > 0 &&
                propertiesValues.map((item, i) => {
                  return (
                    <div className="d-flex" style={{ width: "558px" }} key={i}>
                      <div className="row">
                        <div
                          className="col-9 col-sm-5 col-md-5 col-lg-5 mt-4"
                          key={i}
                        >
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
                              className="step3-input mt-2 "
                              type="text"
                              name="name"
                              onChange={(e) => handleChange(i, e)}
                              placeholder="Name"
                              value={item.name || ""}
                              maxLength="40"
                              style={{
                                backgroundColor: "#000e29 !important",
                                maxWidth: "84%",
                                padding: "0.6rem 1rem",
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-9 col-sm-5 col-md-5 col-lg-5 mt-4 ml-0 ml-md-4">
                          <div
                            className="d-flex position-relative"
                            style={{ flexDirection: "column" }}
                          >
                            <label
                              className="text-white"
                              style={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                              }}
                            >
                              Value
                            </label>
                            <input
                              className="step3-input  mt-2"
                              type="text"
                              name="value"
                              onChange={(e) => handleChange(i, e)}
                              placeholder="Value"
                              value={item.value || ""}
                              maxLength="40"
                              style={{
                                backgroundColor: "#000e29 ",
                                maxWidth: "84%",
                                padding: "0.6rem 1rem",
                              }}
                            />
                            <BsFillXCircleFill
                              className="position-absolute cross-icon"
                              style={{
                                color: "#00d3f3",
                                top: "3rem",
                                left: "13.8rem",
                                cursor: "pointer",
                              }}
                              onClick={() => removeFormFields(i)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div className="W-100 text-center"></div>
            </div>
            <p
              className=" mt-4 ml-4"
              style={{ color: "#00d3f3", cursor: "pointer" }}
              onClick={() => addMoreValues()}
            >
              {" "}
              Add Property
            </p>
            <div className="w-100 text-center">
              <button
                type="button"
                className="btn btn-secondary start-btn mt-5 text-center"
                style={{ width: "9rem" }}
                // disabled={
                //   propertiesValues && propertiesValues?.length > 0
                //     ? false
                //     : true
                // }
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </Box>
      </Modal>
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
})(BasicModal);
