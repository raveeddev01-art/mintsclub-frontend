import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ModalClose from "../../assets/images/modal-close.svg";
import InputClose from "../../assets/images/inp-close.svg";
import "./PropertiesModal.css";
import { toast } from "react-toastify";

const PropertiesModal = (props) => {
  const { show, onHide,addMoreValues, handleChange, removeFormFields, properties,onSave } = props;
  const handleSubmit = () => {
    if (properties && properties.length > 0) {
      let isEmpty = properties.filter(
        (item) => item.name === "" || item.type === ""
      );
      if (isEmpty.length > 0) {
        toast.error("Please Fill Empty Fields ");
        return "";
      } else {
        onSave("properties");
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
        <Modal.Title id="contained-modal-title-vcenter">
          Add Properties
        </Modal.Title>
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
        {properties.map((item, i) => {
          return (
            <div className="row g-2 align-items-center justify-content-between mt-2">
              <div className="col-sm-5 order-1 order-sm-0">
                <div className="bid-inp-container d-flex align-items-center">
                  <div className="ps-2">
                    <h6>Type:</h6>
                  </div>
                  <div className="inp-container">
                    <input
                      type="text"
                      name="type"
                      maxLength="40"
                      value={item.type}
                      onChange={(e) => handleChange(i, e,"properties")}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-5 order-2 order-sm-1">
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
                      onChange={(e) => handleChange(i, e,"properties")}
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-1 order-0 order-sm-2">
                <div className="inp-close text-end">
                  <button onClick={() => removeFormFields(i,"properties")}>
                    <img src={InputClose} alt="closemodal" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-nft-footer d-flex align-items-center">
          <button
            className="btn btn-linear-gradient mt-2"
            onClick={() => addMoreValues("properties")}
          >
            Add more
          </button>
          <button className="btn btn-linear-gradient mt-2 ms-3"  disabled={properties&&properties.length===0}onClick={handleSubmit}>Save</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PropertiesModal;
