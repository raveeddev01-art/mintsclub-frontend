import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ENV } from "./../../config/config";
import { getTopSellers, beforeUser } from "./../user/user.action";
import SellerTickIcon from "../../assets/images/seller-tick-icon.svg";
import "./topseller.css";
import NavbarMain from "../navbar-main/NavbarMain";
import Footer from "../footer/footer";
import Breadcrumb from "../breadcrumb/breadcrumb";
import { Images } from "../../assets/assets";

const TopSellerList = (props) => {
  const [sellers, setSellers] = useState([]);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState(null);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    props.getTopSellers();
  }, []);

  useEffect(() => {
    if (props.user.topSellersAuth) {
      const { topSellers, pagination } = props.user.sellers;
      if (topSellers === null) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }
      setPagination(pagination);
      setSellers(topSellers);
      props.beforeUser();
    }
  }, [props.user.topSellersAuth]);

  const handlePagination = () => {
    let qs = { limit: limit + 10, page: 1 };
    qs = ENV.objectToQueryString(qs);
    props.getTopSellers(qs);
  };
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
                    <div className="card top-seller-card">
                      <div className="single-seller d-flex align-items-center">
                        <div className="seller-avatar-container">
                          <img
                            className="avatar-md rounded-circle"
                            src={
                              author.profileImage === null
                                ? Images.profilePlaceholder
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
                          <Link
                            className="seller text-capitalize mb-2"
                            to={`/author/${author._id}`}
                          >
                            {author.username}
                          </Link>
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
              <p>No Top Sellers Found</p>
            )}
            <div className="col-12">
              <div className="mt-5 text-center">
                {!empty &&
                  sellers?.length === 10 &&
                  pagination.totalRecords > sellers.length && (
                    <button
                      className="btn btn-linear-gradient px-5"
                      onClick={() => handlePagination()}
                    >
                      Load more
                    </button>
                  )}
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
  TopSellerList,
  beforeUser
);
