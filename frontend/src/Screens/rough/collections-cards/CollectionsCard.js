import React from "react";
import { Card } from "react-bootstrap";
import Subimg1 from "../../../assets/images/cl-cr-subimg1.png";
import Subimg2 from "../../../assets/images/cl-cr-subimg2.png";
import Subimg3 from "../../../assets/images/cl-cr-subimg3.png";
import CardImg from "../../../assets/images/cl-cr-mainimg.png";
import AvatarImg from "../../../assets/images/seller-avatar.png";
import HeartIcon from "../../../assets/images/heart-icon.svg";
import "./CollectionsCard.css";

const CollectionsCard = () => {
  // const { name, image } = category;
  return (
    <Card className="collection-cards-container">
      <div className="row">
        <div className="col-12">
          <div className="row g-3">
            <div className="col-4 collection-subImg1">
              <img src={Subimg1} alt="subImg" />
            </div>
            <div className="col-4 collection-subImg2">
              <img src={Subimg2} alt="subImg" />
            </div>
            <div className="col-4 collection-subImg3">
              <img src={Subimg3} alt="subImg" />
            </div>
            <div className="col-12 collection-mainImg">
              <img src={CardImg} alt="card-img" />
            </div>
          </div>
          <Card.Body>
            <Card.Title>Moder Art Collections</Card.Title>
            <Card.Text>5 items</Card.Text>
            <div className="d-flex align-items-center justify-content-between collection-card-footer">
              <div className="collection-footer-left d-flex align-items-center">
                <img src={AvatarImg} alt="avatar-img" className="me-2" />
                <span>Pablo-Shing</span>
              </div>
              <div className="collection-footer-right d-flex align-items-center">
                <img src={HeartIcon} alt="like-icon" className="me-1" />
                <span>212k</span>
              </div>
            </div>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

export default CollectionsCard;
