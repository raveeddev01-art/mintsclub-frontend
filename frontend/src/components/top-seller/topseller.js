import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTopSellers, beforeUser } from "../user/user.action";
import ViewAllIcon from "../../assets/images/view-all-arrow.svg";
import SellerTickIcon from "../../assets/images/seller-tick-icon.svg";
import "./topseller.css";
import { Images } from "../../assets/assets";

const TopSeller = (props) => {
  const [sellers, setSellers] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    props.getTopSellers();
  }, []);

  useEffect(() => {
    if (props.user.topSellersAuth) {
      const { topSellers } = props.user.sellers;
      setLoader(false);
      if (topSellers?.length > 11) {
        setSellers(topSellers.slice(0, 11));
      } else {
        setSellers(topSellers);
      }
    }
  }, [props.user.topSellersAuth]);
  return (
    <section className="top-seller-area padding-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content clr-blue">
                <span>Creative Artists</span>
                <h3 className="mb-5">Top Sellers</h3>
              </div>
              {sellers && sellers.length > 12 && props.viewAll && (
                <div className="intro-btn mb-5">
                  <Link
                    className="btn btn-rounded-bordered btn-viewAll "
                    to="/top-sellers-list"
                  >
                    {props.viewAll}
                    <img src={ViewAllIcon} alt="arrow-left" className="ms-2" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row g-3 items">
          {loader ? (
            <div className="top-seller spinner-loader-wrapper">
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : sellers && sellers.length ? (
            sellers.map((author, idx) => {
              return (
                <div
                  key={`ts_${idx}`}
                  className="col-12 col-sm-6 col-lg-4 col-xl-3 item top-seller-cards"
                >
                  {/* Single Seller */}
                  <div className="card top-seller-card">
                    <div className="single-seller d-flex align-items-center">
                      <div className="seller-avatar-container">
                        <img
                          className="avatar-md rounded-circle"
                          src={
                            !author.profileImage
                              ? Images.placeholderImg
                              : author.profileImage
                          }
                          alt="AvatarImg"
                        />
                        {author.profileImage ? (
                          <span className="seller-avatar-active">
                            <img src={SellerTickIcon} alt="tick-icon" />
                          </span>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* Seller Info */}
                      <div className="seller-info ml-3 w-100">
                        <p className="seller text-capitalize mb-2">
                          {author.username}
                        </p>
                        <span className="text-end">
                          {" "}
                          {author.totalETH.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center">No Top Sellers Found</p>
          )}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { beforeUser, getTopSellers })(
  TopSeller
);
