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
  p: 4,
};
// let array = [1];

const PreviewModal = (props) => {
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
          <div className="preview-modal-container ">
            <div className="w-100 d-flex justify-content-between ">
              {previewModalStep > 1 ? (
                <BiArrowBack
                  className="text-white "
                  style={{
                    fontSize: "1.8rem",
                    marginLeft: "2rem",
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
                  marginRight: "2rem",
                  cursor: "pointer",
                }}
                onClick={() => handlePreviewModal()}
              />
            </div>

            {previewModalStep === 1 ? (
              <div className="row  preview-modal-info">
                <div className="w-100 text-center">
                  <p className="text-white preview-text">Preview</p>
                </div>
                <div className="col-md-6 col-sm-12 mt-4 d-flex justify-content-between flex-column">
                  {info.img && (
                    <img
                      src={info.img ? info.img : ""}
                      style={{
                        width: "100%",
                        height: "33.6vh",
                        borderRadius: "10px",
                      }}
                      alt="preview"
                    />
                  )}
                  {info.videoUrl && (
                    <video width="260" controls>
                      <source src={info.videoUrl} />
                    </video>
                  )}

                  <div
                    className="d-flex  mt-4"
                    style={{ flexDirection: "column" }}
                  >
                    <input
                      className="preview-input mt-1"
                      type="url"
                      value={
                        (info.externalLink && info.externalLink.trim()) ||
                        "- externalLink -"
                      }
                      placeholder="- externalLink -"
                      style={{ margin: "0" }}
                      maxLength="50"
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="col-md-6 col-sm-12 mt-4">
                  <input
                    className="preview-input "
                    type="text"
                    value={info.name || ""}
                    placeholder="name"
                    maxLength="50"
                    disabled={true}
                  />
                  <input
                    className="preview-input mt-4"
                    type="email"
                    value={info.email || ""}
                    maxLength="50"
                    disabled={true}
                  />
                  <input
                    className="preview-input mt-4"
                    type="text"
                    value={(info.symbol && info.symbol.trim()) || "- symbol -"}
                    placeholder="- symbol -"
                    maxLength="50"
                    disabled={true}
                  />
                  <textarea
                    className="preview-description p-3 mt-4"
                    placeholder="- Description -"
                    value={
                      (info.description && info.description.trim()) ||
                      "- Description -"
                    }
                    style={{ color: "#aaabab", marginLeft: "2rem" }}
                    maxLength="600"
                    disabled={true}
                  />
                  <input
                    className="preview-input mt-4"
                    type="number"
                    value={info.supply || "- supply -"}
                    disabled={true}
                    placeholder="- supply -"
                    maxLength="50"
                  />
                </div>
              </div>
            ) : (
              <div className="row preview-modal-info ">
                <div className="w-100 text-center">
                  <p className="text-white preview-text">Preview</p>
                </div>

                <p className="text-white preview-properties-title">
                  Properties{" "}
                </p>
                <div
                  className="row"
                  style={{ overflowY: "auto", height: "5rem" }}
                >
                  {info.properties && info.properties.length > 0 ? (
                    info.properties.map((item, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-6  mt-4" key={index}>
                            <input
                              className="preview-input "
                              type="url"
                              value={item.name || ""}
                              maxLength="50"
                              placeholder="item name"
                              disabled={true}
                            />
                          </div>

                          <div className="col-6  mt-4">
                            <input
                              className="preview-input "
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
                  className="row mt-5"
                  style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "6rem",
                  }}
                >
                  <p className="text-white preview-properties-title">Levels </p>

                  {info.levels && info.levels.length > 0 ? (
                    info.levels.map((item, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-6 mt-2" key={index}>
                            <input
                              className="preview-input "
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

                          <div className="col-6">
                            <div
                              className="d-flex align-items-center  w-100 "
                              style={{
                                marginTop: `${
                                  index === 0 ? "0.3rem" : "1.2rem"
                                }`,
                              }}
                            >
                              <input
                                className="preview-input first-value  mt-2 "
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
                                className="preview-input first-value mt-2 "
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
              <p className="text-white">{previewModalStep}/2</p>
              <button
                type="button"
                className="btn btn-secondary preview-btn mt-4"
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
