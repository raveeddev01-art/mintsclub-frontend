import React, { Fragment, useEffect, useState } from "react";

// import Multistep from "react-multistep";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";

import PageTitle from "../../../layouts/PageTitle";
import { alert } from "../../../../store/reducers/alertSlice";
import { addFraction } from "../../../../store/reducers/fractionReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ButtonLoader from "../../common/buttonLoader";

const ImportCollections = () => {
  const dispatch = useDispatch();
  const [collectionDetails, setCollectionDetails] = useState({});

  const [loading, setLoading] = useState(false);

  const onInputValueChange = (e) => {
    e.preventDefault();
    setCollectionDetails({
      ...collectionDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(
        "🚀 ~ file: ImportCollection.js:19 ~ ImportCollections ~ collectionDetails",
        collectionDetails
      );

      if (
        !collectionDetails?.contractAddress ||
        !collectionDetails?.avatar ||
        !collectionDetails?.cover ||
        !collectionDetails?.name ||
        !collectionDetails?.blockchain
      ) {
        throw new Error("Some information is misisng");
      }
      setLoading(true);

      const authToken = (await localStorage.getItem("authToken")) || "";
      let res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}importcollection/addImportedCollection`,
        data: collectionDetails,
        headers: {
          "x-auth-token": authToken,
        },
      });

      if (res?.data?.success) {
        dispatch(
          alert({
            title: `Success`,
            message: res?.data?.message,
            severity: "success",
          })
        );
        setCollectionDetails({});
        return;
      }
    } catch (error) {
      dispatch(
        alert({
          title: `failed`,
          message: error.message || `failed to update System Setting`,
          severity: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <PageTitle activeMenu="form" motherMenu="Import Collections" />
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Import Collection</h4>
            </div>
            <div className="card-body">
              <form
                onSubmit={(e) => handleSubmit(e)}
                id="step-form-horizontal"
                className="step-form-horizontal"
              >
                <div className="row">
                  <div className="col-lg-6 mb-2 align-left">
                    <div
                      className="form-group align-left"
                      style={{ textAlign: "left" }}
                    >
                      <label className="text-label">Collection Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Collection Name"
                        onChange={(e) => onInputValueChange(e)}
                        value={collectionDetails?.name || ""}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Collection Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder="Description"
                        onChange={(e) => onInputValueChange(e)}
                        value={collectionDetails?.description || ""}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Collection Contract Address
                      </label>
                      <input
                        type="text"
                        name="contractAddress"
                        className="form-control"
                        placeholder="Contract Address"
                        onChange={(e) => onInputValueChange(e)}
                        value={collectionDetails?.contractAddress || ""}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Collection Blockchain (eth, bsc & polygon)
                      </label>
                      <input
                        type="text"
                        name="blockchain"
                        className="form-control"
                        placeholder="Collection Blockchain"
                        onChange={(e) => onInputValueChange(e)}
                        value={collectionDetails?.blockchain || ""}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Collection Avatar Link
                      </label>
                      <input
                        type="text"
                        name="avatar"
                        className="form-control"
                        placeholder="Collection Avatar URL"
                        onChange={(e) => onInputValueChange(e)}
                        value={collectionDetails?.avatar || ""}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Collection Cover Link
                      </label>
                      <input
                        type="text"
                        name="cover"
                        className="form-control"
                        placeholder="Collection Cover URL"
                        onChange={(e) => onInputValueChange(e)}
                        value={collectionDetails?.cover || ""}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-2">
                  <ButtonLoader
                    loader={loading}
                    title={"Import Collection"}
                    classes="btn btn-primary mb-2"
                    disabled={loading}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ImportCollections;
