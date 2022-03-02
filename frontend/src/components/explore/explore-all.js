import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { beforeNFT, getNFTs } from "../nfts/nfts.action";
import { ENV } from "../../config/config";
import FullPageLoader from "../full-page-loader/full-page-loader";
import ExploreItems from "./explore-items";
import NftCard from "../collections/components/NftCard/NftCard";
import { Link, useHistory } from "react-router-dom";
import { getCreators, beforeUser } from "./../user/user.action";

const initData = {
  pre_heading: "Explore",
  heading: "Exclusive Digital Assets",
  content: "",
  btn_1: "Load More",
};

function ExploreAll(props) {
  const [nftPagination, setNFTPagination] = useState(null);
  const [nfts, setNFTs] = useState([]); // NFTs for explore section
  const [loader, setLoader] = useState(true);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [intro, setIntro] = useState(false);
  const [creators, setCreator] = useState([]);
  const pathname = useHistory().location.pathname;

  useEffect(() => {
    window.scroll(0, 0);
    if (pathname === "/explore-all") setIntro(true);
    getNFTs();
    props.getCreators();
  }, []);
  useEffect(() => {
    if (props.user.topSellersAuth) {
      setCreator(props.user.sellers);
    }
  }, [props.user.topSellersAuth]);
  useEffect(() => {
    if (props.user.creatorsAuth) {
      setCreator(props.user.creators);
      setLoader(false);
    }
  }, [props.user.creatorsAuth]);
  useEffect(() => {
    if (props.nft.nftsAuth) {
      const { nftsData } = props.nft;
      if (nftsData) {
        setNFTs(nftsData);
        setNFTPagination(nftsData.pagination);
        props.beforeNFT();
        if (props.setLoader) props.setLoader(false);
      }
      setLoader(false);
    }
  }, [props.nft.nftsAuth]);

  useEffect(() => {
    if (nftPagination)
      setLoadMoreBtn(
        nftPagination.total > 0 &&
          nftPagination.total > nfts.length &&
          nfts.length > 0
      );
  }, [nftPagination]);

  const loadMore = () => {
    const { page, limit } = nftPagination;
    setLoader(true);
    getNFTs(1, limit * (page + 1));
  };

  const getNFTs = (page = 1, limit = 4) => {
    const nftQS = { page, limit, explore: true };

    if (props.collectionId) nftQS.collectionId = props.collectionId;

    const qs = ENV.objectToQueryString(nftQS);
    props.getNFTs(qs);
  };

  return (
    <section
      className="explore-area"
      style={{ paddingTop: `${intro ? "150" : "30"}px` }}
    >
      {loader && <FullPageLoader />}
      <div className="container">
        {intro && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              <div className="intro text-center mb-4">
                <span>{initData.pre_heading}</span>
                <h3 className="mt-3 mb-0">{initData.heading}</h3>
              </div>
            </div>
          </div>
        )}
        <div className="row items gx-4 explore-items">
          {nfts && nfts.length > 0 && creators.length > 0 ? (
            nfts.map((item, idx) => {
              return (
                <div className="col-3 mt-5" style={{}}>
                  <NftCard
                    nft={item}
                    creators={creators}
                    userId={ENV.getUserKeys("_id")._id}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-center">No Items Found to Exploree</p>
          )}
        </div>
        {loadMoreBtn && (
          <div className="row">
            <div className="col-12 text-center">
              <a
                id="load-btn"
                className="btn btn-bordered-white mt-5"
                onClick={() => loadMore()}
              >
                {initData.btn_1}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  nft: state.nft,
  user: state.user,
});

export default connect(mapStateToProps, { beforeNFT, getNFTs, getCreators })(
  ExploreAll
);
