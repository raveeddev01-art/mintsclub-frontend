import { useEffect } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
// import { hometest } from "../../Redux/actions/actions";
import Navbar from "../../components/Navbar/navbar";
import SimpleSlider from "../../components/Slider/slider";
// import image from "../../assets/images/test.jpg";
import Polygon from "../../assets/images/icon 2.svg";
// import Ethereum from "../../assets/images/Ethereum.svg";
import Cardano from "../../assets/images/icon 3.svg";
import Binance from "../../assets/images/icon4.svg";
import Ethereum from "../../assets/images/icon1.png";
// import nft2 from "../../assets/images/icon4.svg";
// import nft3 from "../../assets/images/icon 2.svg";
////////////////////////
import nft1 from "../../assets/images/nft1.jpg";
import nft2 from "../../assets/images/nft2.webp";
import nft3 from "../../assets/images/nft3.jpeg";
import nft4 from "../../assets/images/nft4.webp";
import nft5 from "../../assets/images/nft5.jpg";
import GaTracker from "../../gaTracker/gaTracket";
import { WordsFamousNfts } from "../../utils/exportData";
//mineImports
import { Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "../rough/navbar-componnent/NavbarComponent";
import SliderExmp from "../rough/slider-component/sliderExmp";
import "./HomeUi.css";

const HomeUi = (props) => {
  //  useEffect(()=>{
  // },[])
  GaTracker();
  const networksData = [
    { name: "Ethereum", image: Ethereum },
    { name: "Polygon", image: Polygon },
    { name: "Cardano", image: Cardano },
    { name: "Binance SmartChain", image: Binance },
  ];

  const history = useHistory();

  return (
    <div className="home-body">
      <Container>
        <NavbarComponent className="mt-1" />
        <Row className="home-row">
          <Col md="6">
            <div className="hero-content">
              <div className="hero-content-heading">
                <h1>Let's Mint Your NFTs</h1>
                <h6>
                  All You Can Mint For <span>Free</span>
                </h6>
              </div>
              <div className="hero-network">
                <h5 className="mt-5 mb-2">Select Network</h5>
                <div className="hero-network-options d-flex flex-wrap">
                  {networksData.map((item, index) => {
                    return (
                      <div className="network-img" disabled={true} key={index}>
                        <img
                          src={item.image}
                          alt="coming soon"
                          className={` ${
                            "Ethereum" === item.name ? "" : "selected-network"
                          }`}
                        />
                        {/* {"Ethereum" !== item.name && (
                          <span className="text-hover">Coming soon</span>
                        )} */}
                        <p
                          className={`ml-1 mt-2 ${
                            "Ethereum" === item.name
                              ? "network-title-yellow"
                              : "network-title-white"
                          }`}
                        >
                          {item.name === "Binance SmartChain" ? (
                            <p>
                              {"Binance"} <br /> {"SmartChain"}
                            </p>
                          ) : (
                            item.name
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button
                type="button"
                className="btn btn-start my-5"
                onClick={() => history.push("/fourStepForm")}
              >
                Lets Start
              </button>
            </div>
          </Col>
          <Col md="6">
            <div className="hero-slider">
              <div className="hero-slider-conatiner">
                <SliderExmp assetList={WordsFamousNfts} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default HomeUi;
