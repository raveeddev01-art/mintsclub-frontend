import React, { useState, FC } from "react";
import { ReactComponent as CloseBtn } from "../../assets/images/modal-close.svg";
import Nftimg from "../../assets/images/nft5.jpg";
import { SideNftListInterface } from "../../interfaces/components";
import "./SideNftList.scss";

const SideNftList: FC<SideNftListInterface> = ({
  showSideList,
  setShowSideList,
}) => {
  return (
    <div className={`sidelist ${showSideList ? "d-block" : "d-none"}`}>
      <div className="fade offcanvas-backdrop show"></div>
      <div
        role="dialog"
        aria-modal="true"
        className={`offcanvas ${showSideList ? "offcanvas-end show" : ""}`}
      >
        <div className="offcanvas-header">
          <div className="offcanvas-title h5">All Items</div>
          <button
            type="button"
            onClick={() => {
              setShowSideList(false);
            }}
          >
            <CloseBtn />
          </button>
        </div>
        <div className="offcanvas-body">
          <div className="nft-list-item">
            <div className="img-div">
              <img src={Nftimg} />
            </div>
            <div className="nft-detail">
              <h5>NFT Name</h5>
              <p>Required Detail</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNftList;
