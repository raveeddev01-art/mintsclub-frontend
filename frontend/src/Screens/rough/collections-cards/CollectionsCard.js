import React from "react";
import { Card } from "react-bootstrap";
import Subimg1 from "../../../assets/images/cl-cr-subimg1.png";
import Subimg2 from "../../../assets/images/cl-cr-subimg2.png";
import Subimg3 from "../../../assets/images/cl-cr-subimg3.png";
import CardImg from "../../../assets/images/cl-cr-mainimg.png";

const CollectionsCard = () => {
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-4">
          <Card>
            <div className="row g-3">
              <div className="col-4">
                <img src={Subimg1} alt="subImg" />
              </div>
              <div className="col-4">
                <img src={Subimg2} alt="subImg" />
              </div>
              <div className="col-4">
                <img src={Subimg3} alt="subImg" />
              </div>
              <div className="col-12">
                <img src={CardImg} alt="card-img" />
              </div>
            </div>
            <Card.Body>
              <Card.Title>Modern Art collection</Card.Title>
              <Card.Text>5 items</Card.Text>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <img src="" alt="" />
                  <span>Pablo-Shing</span>
                </div>
                <div>
                  <img src="" alt="" />
                  <span>212k</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollectionsCard;
