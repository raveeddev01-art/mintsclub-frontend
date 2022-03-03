import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ENV } from "./../../config/config";
import { getTopSellers, beforeUser } from "./../user/user.action";
import AvatarImg from "../../assets/images/seller-avatar.png";
import SellerTickIcon from "../../assets/images/seller-tick-icon.svg";
import "./topseller.css";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import Breadcrumb from "../breadcrumb/breadcrumb";

const TopSellerList = (props) => {
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    props.getTopSellers();
  }, []);
  useEffect(() => {
    setSellers(props.user.sellers);
  }, [props.user.topSellersAuth]);

  return (
    <>
      <NavbarMain />
      <Breadcrumb title1={"Sellers"} title2={"TopSellers"} />
      <section className="top-seller-area padding-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <span>CREATIVE ARTIST</span>
                  <h3 className="mb-0">Top Sellers</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row items">
            {sellers && sellers.length ? (
              sellers.map((author, idx) => {
                return (
                  <div
                    key={`ts_${idx}`}
                    className="col-12 col-sm-6 col-lg-4 col-xl-3 item top-seller-cards"
                  >
                    {/* Single Seller */}
                    <div className="card">
                      <div className="single-seller d-flex align-items-center">
                        <Link to={`/author/${author._id}`}>
                          <div className="seller-avatar-container">
                            <img
                              className="avatar-md rounded-circle"
                              src={AvatarImg}
                              alt=""
                            />
                            <span className="seller-avatar-active">
                              <img src={SellerTickIcon} alt="tick-icon" />
                            </span>
                          </div>
                        </Link>
                        {/* Seller Info */}
                        <div className="seller-info ml-3 w-100">
                          <Link
                            className="seller mb-2"
                            to={`/author/${author._id}`}
                          >
                            {author.username}
                          </Link>
                          <span className="text-end">{"256.6ETH"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Top Sellers not available</p>
            )}
            <div className="col-12">
              <div className="mt-5 text-center">
                {/* {!empty &&
                  collections?.length > 10 &&
                  pagination.totalRecords <= collections.length && ( */}
                <button className="btn btn-linear-gradient px-5">
                  Load more
                </button>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { beforeUser, getTopSellers })(
  TopSellerList
);
