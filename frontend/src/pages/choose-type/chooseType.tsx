import BannerBg from "../../assets/images/hero-bg.png";
import BannerImage from "../../assets/images/bannerimg2.png";
import { ReactComponent as TypeOne } from "../../assets/images/type1.svg";
import { ReactComponent as TypeTwo } from "../../assets/images/type2.svg";
import Banner from "../../Components/Banner/Banner";
import { useHistory } from "react-router";
import "./chooseType.scss";

const bannerContent = {
  subHeading: "Get Started",
  heading: "Choose Type",
  content:
    "Choose single for one of a kind or multiple if you want to sell a collection multiple times",
};

function ChooseType() {
  const history=useHistory()
  return (
    <div className="choose-type">
      <Banner
        subHeading={bannerContent.subHeading}
        heading={bannerContent.heading}
        content={bannerContent.content}
        bgImg={BannerBg}
        bannerImg={BannerImage}
        bg={true}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <button className="select-nft-card" onClick={()=>history.push("/create/single")}>
              <TypeOne />
              <div>
                <h4>Single</h4>
                <p>
                  If you want to highlight the uniqueness and individuality of
                  your item
                </p>
              </div>
            </button>
          </div>
          <div className="col-md-6 mt-5 mt-md-0">
            <button className="select-nft-card" onClick={()=>history.push("/create/multiple")}>
              <TypeTwo />
              <div>
                <h4>Multiple</h4>
                <p>
                  If you want to share your NFT with a large number of community
                  members
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseType;
