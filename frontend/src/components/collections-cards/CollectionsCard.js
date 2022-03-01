import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Card } from "react-bootstrap";
import Subimg1 from "../../assets/images/cl-cr-subimg1.png";
import Subimg2 from "../../assets/images/cl-cr-subimg2.png";
import Subimg3 from "../../assets/images/cl-cr-subimg3.png";
import CardImg from "../../assets/images/cl-cr-mainimg.png";
import AvatarImg from "../../assets/images/seller-avatar.png";
import HeartIcon from "../../assets/images/heart-icon.svg";
import "./CollectionsCard.css";

const CollectionsCard = ({
  CardImg,
  Subimg1,
  Subimg2,
  Subimg3,
  name,
  id,
  collection,
  userName,
  NFTCount,
  profileImage,
}) => {
  // const { name, image } = category;
  const history = useHistory();

  return (
    <Card
      className="collection-cards-container"
      onClick={() => {
        history.push({
          pathname: `/collection/detailPage/${id}`,
          state: collection,
        });
      }}
    >
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
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {NFTCount}
              {" items"}
            </Card.Text>
            <div className="d-flex align-items-center justify-content-between collection-card-footer">
              <div className="collection-footer-left d-flex align-items-center">
                {profileImage && (
                  <img src={profileImage} alt="avatar-img" className="me-2" />
                )}
                <span>{userName}</span>
              </div>
              {/* <div className="collection-footer-right d-flex align-items-center">
                <img src={HeartIcon} alt="like-icon" className="me-1" onClick={()=>handleLikesTogle(id)} />
                <span>212k</span>
              </div> */}
            </div>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

export default CollectionsCard;
