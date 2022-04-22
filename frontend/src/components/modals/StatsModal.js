import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ModalClose from "../../assets/images/modal-close.svg";
import InputClose from "../../assets/images/inp-close.svg";
import "./PropertiesModal.css";
import { toast } from "react-toastify";
const StatsModal = (props) => {
  const { show, onHide } = props;
  const { addMoreValues, handleChange, removeFormFields, stats, onSave } =
    props;
  const handleSubmit = () => {
    if (stats && stats.length > 0) {
      let isEmpty = stats.filter(
        (item) => item.name === "" || item.value === ""
      );
      if (isEmpty.length > 0) {
        toast.error("Please Fill Empty Fields ");
        return "";
      } else {
        onSave("stats");
      }
    }
  };
  return (
    <Modal
      {...props}
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName="buy-modal-dialog"
      contentClassName="buy-modal-content"
      className="buy-modal properties-modal"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Add Stats</Modal.Title>

        <div className="modal-close-container">
          <button onClick={onHide}>
            <img src={ModalClose} alt="closemodal" />
          </button>
        </div>

        <div className="buy-modal-subheadings-container d-flex align-items-center">
          <div className="buy-modal-subheadings">
            <p>Item</p>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="nft-modalfields-container">
          {stats &&
            stats.length > 0 &&
            stats.map((item, i) => {
              return (
                <div className="row g-2 align-items-center justify-content-between mt-2">
                  <div className="col-sm-5 order-1 order-sm-0">
                    <div className="bid-inp-container d-flex align-items-center">
                      <div className="ps-2">
                        <h6>Name:</h6>
                      </div>
                      <div className="inp-container">
                        <input
                          type="text"
                          name="name"
                          maxLength="40"
                          value={item.name}
                          onChange={(e) => handleChange(i, e, "stats")}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 order-2 order-sm-1">
                    <div className="bid-inp-container d-flex align-items-center">
                      <div className="ps-2">
                        <h6>Value:</h6>
                      </div>
                      <div className="inp-container">
                        <input
                          type="number"
                          name="value"
                          value={item.value}
                          onChange={(e) => {
                            if (+e.target.value > 5 || +e.target.value === 0) {
                              return "";
                            }
                            handleChange(i, e, "stats");
                          }}
                          autoComplete="off"
                        />
                      </div>
                      <div className="w-100 d-flex align-items-center justify-content-between pe-3 pe-sm-4 pe-md-5">
                        <h6>of</h6>
                        <h6>5</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-1 order-0 order-sm-2">
                    <div className="inp-close text-end">
                      <button>
                        <img
                          src={InputClose}
                          alt="closemodal"
                          onClick={() => removeFormFields(i, "stats")}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-nft-footer d-flex align-items-center">
          <button
            className="btn btn-linear-gradient mt-2"
            onClick={() => addMoreValues("stats")}
          >
            Add more
          </button>
          <button
            className="btn btn-linear-gradient mt-2 ms-3"
            disabled={stats && stats.length === 0}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default StatsModal;
