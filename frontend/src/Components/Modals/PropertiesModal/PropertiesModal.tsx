import { FC } from "react";
import { Modal } from "react-bootstrap";
import ModalClose from "../../../assets/images/modal-close.svg";
import InputClose from "../../../assets/images/inp-close.svg";
import "./PropertiesModal.scss";
import "../BuyModal/BuyModal.scss";
import { toast } from "react-toastify";
import { firstInputCharacterSpace } from "../../../utils/functions";
import { PropertiesInt } from "../../../interfaces/components";

const PropertiesModal: FC<PropertiesInt> = (props) => {
  const {
    show,
    onHide,
    addMoreValues,
    handleChange,
    removeFormFields,
    properties,
    onSave,
  } = props;
  const handleSubmit = () => {
    if (properties && properties.length > 0) {
      let isEmpty = properties.filter(
        (item: any) => item.name === "" || item.type === ""
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
      </Modal.Header>
      <Modal.Body className="mt-0 pt-0 px-0 px-sm-3">
        <div className="nft-modalfields-container pe-2 pe-sm-0 px-sm-2 py-sm-2">
          {properties.map((item: any, i: any) => {
            return (
              <div
                className="row g-2 align-items-center justify-content-between mt-3"
                key={i}
              >
                <div className="col-sm-5 order-1 order-sm-0 mt-0">
                  <div className="bid-inp-container d-flex align-items-center">
                    <div className="ps-2">
                      <h6>Type:</h6>
                    </div>
                    <div className="inp-container">
                      <input
                        type="text"
                        name="type"
                        value={item.type}
                        onKeyDown={(e) =>
                          firstInputCharacterSpace(e, item.type.length)
                        }
                        onChange={(e) => handleChange(i, e, "properties")}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-5 order-2 order-sm-1 mt-3 mt-sm-0">
                  <div className="bid-inp-container d-flex align-items-center">
                    <div className="ps-2">
                      <h6>Name:</h6>
                    </div>
                    <div className="inp-container">
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onKeyDown={(e) =>
                          firstInputCharacterSpace(e, item.name.length)
                        }
                        onChange={(e) => handleChange(i, e, "properties")}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 order-0 order-sm-2 mb-2 mb-sm-0">
                  <div className="inp-close text-end me-2">
                    <button onClick={() => removeFormFields(i, "properties")}>
                      <img src={InputClose} alt="closemodal" />
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
            className="btn modal-btn-addMore mt-2"
            onClick={() => addMoreValues("properties")}
          >
            Add more
          </button>
          <button
            className="btn btn-linear-gradient modal-btn-save mt-2 ms-3"
            disabled={properties && properties.length === 0}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PropertiesModal;
