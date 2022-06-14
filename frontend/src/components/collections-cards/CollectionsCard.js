import React, { useState } from "react";
import { useHistory } from "react-router";
import { Card } from "react-bootstrap";
import { Images } from "../../assets/assets";
import PopularCollectionImage from "../cardImage/popularCollectionImage";
import ImageLoader from "../contentLoader/imageLoader";
import ContentLoader from 'react-content-loader'
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
              <img src={Subimg1} alt="subImg" />
              {/* <ContentLoader
                speed={2}
                width={400}
                height={160}
                viewBox="0 0 400 160"
                backgroundColor="#d9d9d9"
                foregroundColor="#ededed"
                // {...props}
              > */}
                {/* <rect x="50" y="6" rx="4" ry="4" width="343" height="38" /> */}
                {/* <rect  rx="4" ry="4" width="50" height="50" />
             
              </ContentLoader> */}
            </div>
            <div className="col-4 collection-subImg2">
              <img src={Subimg2} alt="subImg" />
            </div>
            <div className="col-4 collection-subImg3">
              <img src={Subimg3} alt="subImg" />
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
                  <span className="text-capitalize">
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
