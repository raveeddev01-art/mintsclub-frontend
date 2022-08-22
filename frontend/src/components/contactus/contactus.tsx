import { useEffect } from "react";
import "./contactus.css";
import Banner from "../banner/banner";
import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg2.png";

const bannerData = {
  subHeading: "Get in touch",
  heading: "Contact Us",
  content:
    "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
};
const ContactUs = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <Banner
        subHeading={bannerData.subHeading}
        heading={bannerData.heading}
        content={bannerData.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
      />
      <div className="padding-wrapper contactus">
        <div className="container">
          <div className="contactus-content">
            <h5 className="mb-5">We Would Love To Hear From You!</h5>
            <div className="row g-4">
              <div className="col-md-6">
                <h6>Become A Member</h6>
                <p>Want to create something amazing with MintsClub?</p>
                <button className="btn btn-linear-gradient conatct-btn-join mx-auto mx-md-0">
                  Join MintsClub
                </button>
              </div>
              <div className="col-md-6">
                <h6>Get Suppoprt</h6>
                <p>MintsClub values your opinion. Facing a challenge?</p>
                <button className="btn btn-linear-gradient conatct-btn-join mx-auto mx-md-0">
                  Drop Us a line
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
