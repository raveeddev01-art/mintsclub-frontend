import React from "react";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";

const Approval = () => {
  return (
    <>
      <NavbarMain />
      <section className="padding-wrapper nft-detail">
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
                        Activity
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTen"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingTen"
                    >
                      <div className="accordion-body">
                        <div className="table-container">
                          {activities && activities.length > 0 && (
                            <table class="table table-borderless">
                              <thead>
                                NavbarMain{" "}
                                <tr>
                                  <th scope="col">Event</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">From</th>
                                  <th scope="col">To</th>
                                  <th scope="col">Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {activities.map((activity) => {
                                  return (
                                    <tr>
                                      <th scope="row">
                                        <div className="d-flex align-items-center">
                                          {handleAcitivityIcon(
                                            activity.activityType
                                          )}
                                          <p className="ps-1">
                                            {" "}
                                            {activity.activityType}{" "}
                                          </p>
                                        </div>
                                      </th>
                                      <td>
                                        {activity.price ? activity.price : ""}
                                      </td>
                                      <td>
                                        {activity.fromAddress
                                          ? activity.fromAddress.slice(-8)
                                          : "null address"}
                                      </td>
                                      <td>
                                        {activity.toAddress
                                          ? activity.toAddress.slice(-8)
                                          : ""}{" "}
                                      </td>
                                      <td>
                                        <div>
                                          <ReactTimeAgo
                                            date={activity.createdAt}
                                            locale="en-US"
                                          />
                                        </div>
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
      <Footer />
    </>
  );
};

export default Approval;
