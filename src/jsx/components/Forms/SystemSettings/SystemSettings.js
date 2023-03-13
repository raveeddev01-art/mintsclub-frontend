import React, { Fragment, useEffect, useState } from "react";

// import Multistep from "react-multistep";
// import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { Alert } from "react-bootstrap";

import PageTitle from "../../../layouts/PageTitle";
import { alert } from "../../../../store/reducers/alertSlice";
// import { addFraction } from "../../../../store/reducers/fractionReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ButtonLoader from "../../common/buttonLoader";

const SystemSetting = () => {
  const dispatch = useDispatch();
  const [systemSetting, setSystemSetting] = useState({});
  // const [fractionInput, setFractionInput] = useState(null);
  // const [fractionsValues, setFractionValues] = useState([4, 10, 200]);
  const [loading, setLoading] = useState(false);
  const fetchSystemSetting = async () => {
    try {
      const authToken = (await localStorage.getItem("authToken")) || "";
      let res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}systemSetting/getAllSystemSetting`,
        headers: {
          "x-auth-token": authToken,
        },
      });
      if(!res.data){
        alert('authentication')
      }
      // setFractionValues(res.data?.franctionValues || []);
      setSystemSetting({ ...res.data });
    } catch (error) {
      return false
    }
  };


  const onInputValueChange = (e) => {
    e.preventDefault();
    if (parseFloat(e.target.value) < 0) {
      setSystemSetting({
        ...systemSetting,
        [e.target.name]: e.target.value * -1,
      });
      return;
    }
    setSystemSetting({ ...systemSetting, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchSystemSetting();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let updatedSystemSettings = { ...systemSetting };
    // updatedSystemSettings.franctionValues = fractionsValues;
    setLoading(true);
    try {
      const authToken = (await localStorage.getItem("authToken")) || "";
      let res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}systemSetting/updateSystemSetting`,
        data: updatedSystemSettings,
        headers: {
          "x-auth-token": authToken,
        },
      });

      if (res) {
        dispatch(
          alert({
            title: `Success`,
            message: `System Setting updated successfully`,
            severity: "success",
          })
        );
        setLoading(false);
      }
    } catch (error) {
      dispatch(
        alert({
          title: `failed`,
          message: `failed to update System Setting`,
          severity: "error",
        })
      );
      setLoading(false);
    }
  };

  // const removeFraction = (fraction) => {
  //   // let tempFractions = [...fractionsValues];
  //   const index = tempFractions.findIndex((item) => item === fraction);
  //   if (index >= 0) {
  //     tempFractions.splice(index, 1);
  //     setFractionValues(tempFractions);
  //   }
  // };

  // const addFraction = () => {
  //   // let tempFractions = [...fractionsValues];
  //   tempFractions.push(parseInt(fractionInput));
  //   setFractionValues(tempFractions);
  // };

  // const onFractionAdd = (e) => {
  //   setFractionInput(e.target.value);
  // };

  return (
    <Fragment>
      <PageTitle activeMenu="form" motherMenu="System Setting" />
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">System Settings</h4>
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
                      <label className="text-label">
                        Platform Fee
                      </label>
                      <input
                        type="number"
                        name="platformFee"
                        required = 'true'
                        className="form-control"
                        // placeholder="fee"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.platformFee}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Royality Fee
                      </label>
                      <input
                        type="number"
                        name="royalityFee"
                        className="form-control"
                        required = 'true'
                        // placeholder="fee"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.royalityFee}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Royality Fee Percentage (Percentage)
                      </label>
                      <input
                        type="text"
                        name="royalityFeePercentage"
                        className="form-control"
                        placeholder="Royality Fee In Percentage"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.royalityFeePercentage}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Mint Piqsol Fee (In PQL Tokens)
                      </label>
                      <input
                        type="text"
                        name="mintPiqsolFee"
                        className="form-control"
                        placeholder="Mint Piqsol Fee"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.mintPiqsolFee}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Buy Now Piqsol Fee (In PQL Tokens)
                      </label>
                      <input
                        type="text"
                        name="buyNowPiqsolFee"
                        className="form-control"
                        placeholder="Buy Now Piqsol Fee"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.buyNowPiqsolFee}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Make An Offer Piqsol Fee (In PQL Tokens)
                      </label>
                      <input
                        type="text"
                        name="makeAnOfferPiqsolFee"
                        className="form-control"
                        placeholder="Make An Offer Piqsol Fee"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.makeAnOfferPiqsolFee}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Piqsol Price (In USD)
                      </label>
                      <input
                        type="text"
                        name="piqsolPriceInSol"
                        className="form-control"
                        placeholder="Add Piqsol Price In Sol"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.piqsolPriceInSol}
                        // pattern="^\d*(\.\d{0,10})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Chat Duration In Days (In PQL Tokens)
                      </label>
                      <input
                        type="text"
                        name="chatDurationInDays"
                        className="form-control"
                        placeholder="Add Chat duration"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.chatDurationInDays}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Listing Item Tax (In PQL Tokens)
                      </label>
                      <input
                        type="text"
                        name="listingItemTax"
                        className="form-control"
                        placeholder="Add staking platform fee"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.listingItemTax}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Minimum Stake Locked Amount (In PQL Tokens)
                      </label>
                      <input
                        type="text"
                        name="minimumStakeLockedAmount"
                        className="form-control"
                        placeholder="Add Minimum Stak Locked Amount"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.minimumStakeLockedAmount}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Staking Platform Fees (In PQL Tokens)
                      </label>
                      <input
                        type="text"
                        name="stakingPlatformFee"
                        className="form-control"
                        placeholder="Add staking platform fee"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.stakingPlatformFee}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Batch Upload Tax Fee (In USD)
                      </label>
                      <input
                        type="text"
                        name="batchUploadTaxFee"
                        className="form-control"
                        placeholder="Add Batch upload Fee in USD"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.batchUploadTaxFee}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Apply to be Featured Fee (In USD)
                      </label>
                      <input
                        type="text"
                        name="applyToBeFeturedTaxFee"
                        className="form-control"
                        placeholder="Add Batch upload Fee in USD"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.applyToBeFeturedTaxFee}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <div className="form-group">
                      <label className="text-label">
                        Launch Pad Tax Fee (In USD)
                      </label>
                      <input
                        type="text"
                        name="launchPadTax"
                        className="form-control"
                        placeholder="Add Batch upload Fee in USD"
                        onChange={(e) => onInputValueChange(e)}
                        value={systemSetting?.launchPadTax}
                        // pattern="^\d*(\.\d{0,2})?$"
                        // min={0}
                      />
                    </div>
                  </div> */}
                  {/* <div className="col-lg-6 mb-2">
                    <div className="form-group"></div>
                  </div> */}
                  {/* <div className="col-lg-6 mb-2">
                    <div>
                      <label>Select franctions</label>
                      <input
                        type="number"
                        name="franctionValue"
                        className="form-control"
                        placeholder="Enter Sqaure Number (e.g 5x5 = 25 so 25 will be added here)"
                        onChange={(e) => onFractionAdd(e)}
                        value={fractionInput}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <button
                      type="button"
                      onClick={() => addFraction()}
                      className="btn btn-primary mb-2 add-fraction"
                    >
                      Add Fraction
                    </button>
                  </div>
                  <div className="col-lg-12 mb-4">
                    <div>
                      {fractionsValues?.length &&
                        fractionsValues.map((fraction) => {
                          return (
                            <div className="fraction-values">
                              <div> {fraction}</div>

                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => removeFraction(fraction)}
                              >
                                <FontAwesomeIcon icon={faXmark} />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div> */}
                  <div className="col-lg-6 mb-2">
                    <ButtonLoader
                      loader={loading}
                      title={"Update System Setting"}
                      classes="btn btn-primary mb-2"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary mb-2 cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SystemSetting;
