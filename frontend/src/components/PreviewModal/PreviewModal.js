import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

import "./PreviewModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 830,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const genStyle = {
  row: {
    display: "grid",
  },
};
// let array = [1];

const PreviewModal = (props) => {
  // console.log(props,"props")
  const {
    previewModal,
    handlePreviewModal,
    previewModalStep,
    handlePreviewModalSteps,
    onDeploy,
    info,
  } = props;
  const handleNextStep = () => {
    if (previewModalStep === 1) {
      handlePreviewModalSteps("next");
    } else {
      onDeploy();
    }
  };
  // console.log(props,"props")
  return (
    <div>
      <Modal
        open={previewModal}
        onClose={handlePreviewModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="preview-modal-container pt-4 px-1 px-md-5">
            <div className="w-100 d-flex justify-content-between ">
              {previewModalStep > 1 ? (
                <BiArrowBack
                  className="text-white "
                  style={{
                    fontSize: "1.8rem",
                    cursor: "pointer",
                  }}
                  onClick={() => handlePreviewModalSteps("back")}
                />
              ) : (
                <span></span>
              )}
              <AiOutlineClose
                className="text-white"
                style={{
                  fontSize: "1.8rem",
                  cursor: "pointer",
                }}
                onClick={() => handlePreviewModal()}
              />
            </div>

            {previewModalStep === 1 ? (
              <div className="row  preview-modal-info">
                <div className="w-100 text-center">
                  <p className="text-white preview-text ">Preview</p>
                </div>
                <div className="col-md-6 col-sm-12 mt-4 d-flex justify-content-start flex-column">
                  <div className="previewModal-img">
                    {info.img && (
                      <img
                        src={info.img ? info.img : ""}
                        className="mt-3"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                          objectFit: "contain",
                        }}
                        alt="preview"
                      />
                    )}
                    {info.videoUrl && (
                      <video width="260" controls>
                        <source src={info.videoUrl} />
                      </video>
                    )}
                  </div>
                  <div
                    className="d-flex mt-3 "
                    style={{ flexDirection: "column" }}
                  >
                    <label className="text-white external-label ml-0 my-2 ml-0">
                      External Link
                    </label>
                    <input
                      className=" mt-1 w-100 externalLink-input"
                      type="url"
                      value={
                        (info.externalLink && info.externalLink.trim()) ||
                        "- externalLink -"
                      }
                      placeholder="- externalLink -"
                      style={{ margin: "0", width: "100%" }}
                      maxLength="50"
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 mt-4 d-flex justify-content-start flex-column">
                  <div
                    className="d-flex mt-3 "
                    style={{ flexDirection: "column" }}
                  >
                    <label className="text-white preview-label mb-2 ml-0">
                      Name
                    </label>
                    <input
                      className=" mt-1 w-100 externalLink-input"
                      type="text"
                      value={info.name || ""}
                      placeholder="name"
                      style={{ margin: "0", width: "100%" }}
                      maxLength="50"
                      disabled={true}
                    />
                  </div>
                  <div
                    className="d-flex mt-3 "
                    style={{ flexDirection: "column" }}
                  >
                    <label className="text-white preview-label my-2 ml-0">
                      Email
                    </label>
                    <input
                      className=" mt-1 w-100 externalLink-input"
                      type="email"
                      value={info.email || ""}
                      style={{ margin: "0", width: "100%" }}
                      maxLength="50"
                      disabled={true}
                    />
                  </div>
                  <div
                    className="d-flex mt-3 "
                    style={{ flexDirection: "column" }}
                  >
                    <label className="text-white preview-label my-2 ml-0">
                      Symbol
                    </label>
                    <input
                      className=" mt-1 w-100 externalLink-input"
                      type="text"
                      value={
                        (info.symbol && info.symbol.trim()) || "- symbol -"
                      }
                      placeholder="- symbol -"
                      style={{ margin: "0", width: "100%" }}
                      maxLength="50"
                      disabled={true}
                    />
                  </div>
                  <div
                    className="d-flex mt-3 "
                    style={{ flexDirection: "column" }}
                  >
                    <label className="text-white preview-label my-2 ml-0">
                      Description
                    </label>
                    <textarea
                      className="p-3 mt-1 w-100 externalLink-input"
                      placeholder="- Description -"
                      value={
                        (info.description && info.description.trim()) ||
                        "- Description -"
                      }
                      style={{
                        color: "#aaabab",
                        marginLeft: "2rem",
                        margin: "0",
                        width: "100%",
                      }}
                      maxLength="600"
                      disabled={true}
                    />
                  </div>
                  <div
                    className="d-flex mt-3 "
                    style={{ flexDirection: "column" }}
                  >
                    <label className="text-white preview-label my-2 ml-0">
                      Supply
                    </label>
                    <input
                      className=" mt-1 w-100 externalLink-input"
                      type="number"
                      value={info.supply || "- supply -"}
                      disabled={true}
                      style={{ margin: "0", width: "100%" }}
                      placeholder="- supply -"
                      maxLength="50"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className=" preview-modal-info rowCust">
                <div className="w-100 text-center">
                  <p className="text-white preview-text mb-3">Preview</p>
                </div>

                <p className="text-white preview-properties-title">
                  Properties{" "}
                </p>

                <div
                  className="rowCust px-3"
                  style={{
                    overflowY: "auto",
                    height: "5rem",
                    overflowX: "hidden",
                  }}
                >
                  {props.properties && props.properties.length > 0 ? (
                    props.properties.map((item, index) => {
                      return (
                        <div
                          className="row justify-content-between"
                          key={index}
                        >
                          <div className="col-12  col-md-6 mt-4" key={index}>
                            <input
                              className="preview-input-step-2 "
                              type="url"
                              value={item.name || ""}
                              maxLength="50"
                              placeholder="item name"
                              disabled={true}
                            />
                          </div>

                          <div className="col-12 col-md-6 pr-lg-0 mt-4">
                            <input
                              className="preview-input-step-2 value-input-preview w-100"
                              style={{ maxWidth: "90%" }}
                              type="url"
                              value={item.value || ""}
                              placeholder="Value"
                              maxLength="50"
                              disabled={true}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center" style={{ color: "#A9A9A9" }}>
                      {"No Properties Found"}
                    </p>
                  )}
                </div>

                {/* ////////////////////////////////////////////// */}
                <div
                  className="rowCust mt-5 px-3"
                  style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "6rem",
                  }}
                >
                  <p className="text-white preview-levels-title ml-3">
                    Levels{" "}
                  </p>
                  {props.levels && props.levels.length > 0 ? (
                    props.levels.map((item, index) => {
                      return (
                        <div className="row" key={index}>
                          <div
                            className="col-12 col-md-6 mt-2 w-sm-75 w-md-100"
                            key={index}
                          >
                            <input
                              className="preview-input-step-2  "
                              type="url"
                              value={item.name || ""}
                              placeholder="Levels"
                              style={{
                                marginTop: `${index === 0 ? "0rem" : "1.2rem"}`,
                              }}
                              // maxLength="50"
                              disabled={true}
                            />
                          </div>

                          <div className="col-12 col-md-6 w-sm-75 w-md-100">
                            <div
                              className="d-flex align-items-center  w-100 "
                              style={{
                                marginTop: `${
                                  index === 0 ? "0.3rem" : "1.2rem"
                                }`,
                              }}
                            >
                              <input
                                className="preview-input-step-2  first-value  mt-2 "
                                type="number"
                                pattern="[0-9]+"
                                // maxlength="4"
                                value={item.value || ""}
                                placeholder="Value"
                                name="value"
                                disabled={true}
                                style={{
                                  maxWidth: "84%",
                                  padding: "0.6rem 1rem",
                                }}
                              />

                              <p className="text-white mb-0 of-text">Of</p>
                              <input
                                className="preview-input-step-2  first-value mt-2 "
                                type="number"
                                min="1"
                                max="5"
                                name="total"
                                placeholder="total"
                                disabled={true}
                                // onInput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                                value={item.total || ""}
                                style={{
                                  maxWidth: "84%",
                                  padding: "0.6rem 1rem",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className=" text-center" style={{ color: "#A9A9A9" }}>
                      {"No levels Found"}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="w-100 text-center">
              <p className="text-white my-3">{previewModalStep}/2</p>
              {previewModalStep > 1 && props.maxLimit && (
                <p className="text-danger">
                  {"Maximum deployment limit reached,Please contact support"}
                </p>
              )}
              <button
                type="button"
                className="btn btn-secondary preview-btn mb-3"
                disabled={props.maxLimit && previewModalStep > 1 ? true : false}
                onClick={() => handleNextStep()}
              >
                {previewModalStep === 1 ? "Next" : "Deploy"}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default PreviewModal;
