import React, { useEffect, useState } from "react";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import OfferIcon from "../../assets/images/offer-icon.svg";
import ListingIcon from "../../assets/images/listing-icon.svg";
import ActivityIcon from "../../assets/images/activity.svg";
import { connect } from "react-redux";
import { getApprovals, updateApprovals } from "../user/user.action";
import ReactTimeAgo from "react-time-ago";

const Approval = (props) => {
  const [approvals, setApprovals] = useState([]);
  const [disabled,setDisabled]=useState(false)
  useEffect(() => {
    props.getApprovals();
  }, []);

  useEffect(() => {
    if (props.approvals) {
      setApprovals(props.approvals);
    }
  }, [props.approvalsAuth]);
  useEffect(()=>{
    if(props.editApprovalAuth)
    {
      setDisabled(false)
    }

  },[props.editApprovalAuth])

  const acceptApproval = (id) => {
    setDisabled(true)
    let updatedApprovals=approvals.filter((item)=>item._id!==id)
    setApprovals(updatedApprovals)
    let data = {
      id,
      isAccepted: true,
    };
    props.updateApprovals(data);
  };
  console.log(approvals);

  return (
    <>
      <NavbarMain />
      <section className="padding-wrapper nft-detail ">
        <div className="container">
          <div className="row">
            <div className="col-12 mt-0 mt-md-4 order-3">
              <div className="nftDetail-accordion">
                <div
                  className="accordion accordion-flush "
                  id="accordionFlushExample"
                >
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingTen">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#flush-collapseTen"
                        aria-expanded="false"
                        aria-controls="flush-collapseTen"
                      >
                        <img
                          src={ActivityIcon}
                          alt="price-history"
                          className="me-2"
                        />
                        Approvals
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTen"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingTen"
                    >
                      <div className="accordion-body">
                        <div className="table-container">
                          {approvals && approvals.length > 0 && (
                            <table class="table table-borderless">
                              <thead>
                                <tr>
                                  <th scope="col">UserName</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Address</th>
                                  {/* <th scope="col">To</th> */}
                                  <th scope="col">Date</th>
                                  <th scope="col">{""}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {approvals.map((approval) => {
                                  return (
                                    <tr>
                                      <th scope="row">
                                        <p className="ps-1">
                                          {" "}
                                          {approval.username}{" "}
                                        </p>
                                      </th>
                                      <td>{approval.email}</td>
                                      <td>
                                        {approval.address
                                          ? approval.address.slice(-8)
                                          : ""}{" "}
                                      </td>
                                      <td>
                                        <div>
                                          <ReactTimeAgo
                                            date={approval.createdAt}
                                            locale="en-US"
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <button
                                          className="cancel-Bid-btn"
                                          onClick={() =>
                                            acceptApproval(approval._id)
                                          }
                                        >
                                          Accept
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })} 
                            </tbody>
                          </table>
                          )} 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  approvals: state.user.approvals,
  approvalsAuth: state.user.approvalsAuth,
  editApprovalAuth:state.user.editApprovalAuth
});

export default connect(mapStateToProps, {
  getApprovals,
  updateApprovals,
})(Approval);
