import React, { useState } from "react";
import { useHistory } from "react-router";
import { Card } from "react-bootstrap";
import { Images } from "../../assets/assets";
import PopularCollectionImage from "../cardImage/popularCollectionImage";
import ImageLoader from "../contentLoader/imageLoader";
import ContentLoader from "react-content-loader";
import SubImgLoader from "../contentLoader/collectionSubLoader";
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
  index,
}) => {
  const [loader, setLoader] = useState(true);
  const history = useHistory();

  return (
    <Card
      className="collection-cards-container m-1"
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
              <SubImgLoader image={Subimg1} />
            </div>
            <div className="col-4 collection-subImg2">
              <SubImgLoader image={Subimg2} />
            </div>
            <div className="col-4 collection-subImg3">
              <SubImgLoader image={Subimg3} />
            </div>

            <div style={{ display: `${loader ? "block" : "none"}` }}>
              <ImageLoader />
            </div>
            <div className="col-12 collection-mainImg">
              <img
                src={CardImg}
                onLoad={() => setLoader(false)}
                alt="card-img"
                style={{ display: `${!loader ? "block" : "none"}` }}
              />
            </div>

            {/* <div className="col-12 collection-mainImg">
              <img src={CardImg} alt="card-img" />
            </div> */}
          </div>

          <Card.Body>
            <Card.Title>
              <div>
                {name && name.length > 10 ? name.slice(0, 10) + "..." : name}
              </div>
              <div className="collection-items d-flex align-items-center">
                <span>{NFTCount} items</span>
              </div>
            </Card.Title>
            <div className="d-flex align-items-center justify-content-between collection-card-footer">
              <div className="collection-footer-left d-flex align-items-center">
                <img
                  src={profileImage ? profileImage : Images.placeholderImg}
                  alt="avatar-img"
                  className="me-2"
                />
                <p>
                  Owned by:{" "}
                  <span className="text-capitalize ms-1">
                    {userName ? userName : "unnamed"}
                  </span>
                </p>
              </div>
            </div>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

export default CollectionsCard;
