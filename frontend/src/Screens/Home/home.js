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
import { Container } from "react-bootstrap";

import "./home.css";

const Home = (props) => {
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
    <div className="home-container">
      <div className="container">
        <div className="pt-3">
          <Navbar />
        </div>
        <div className="mt-4 details-container">
          <div className=" d-flex justify-content-between home-info-container">
            <div className=" ">
              <div className="details">
                <div className="" style={{ maxWidth: "31rem" }}>
                  <p
                    className="text-white mint-title"
                    style={{ fontSize: "46px", fontWeight: "bold" }}
                  >
                    Let's Mint Your NFTs
                  </p>
                  <p
                    className="text-white mint-title"
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                  >
                    All you can Mint for {" "}
                    <span style={{color: "#fcd70d"}}>Free !</span> 
                  </p>
                  {/* <p className="text-white" style={{ fontSize: "20px" }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.{" "}
                  </p> */}
                </div>
              </div>

              <div className="networks ">
                <p
                  className="text-white select-network-heading"
                  style={{ fontSize: "36px" }}
                >
                  Select Network
                </p>
                <div className="networks-list-container mt-4 d-flex ">
                  {/* {networksData.map((item, index) => {
                    return (
                      <div
                        className="network"
                        disabled={true}
                        key={index}
                     
                      >
                      
                        <img
                          src={item.image}
                          alt="coming soon"
                          style={{
                            width: "4rem",
                            cursor: "pointer",
                            // padding: "0rem 0rem 0rem 1rem",
                          }}
                          className={`network-img ${
                            "Ethereum" === item.name ? "" : "selected-network"
                          }`}
                        />
                        {"Ethereum" !== item.name && (
                          <span className="tooltiptext">Coming soon</span>
                        )}
                      
                        <p
                          className={`ml-1 mt-2 ${
                            "Ethereum" === item.name
                              ? "network-title-yellow"
                              : "network-title-white"
                          }`}
                          style={{ fontSize: "14px" }}
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
                  })} */}
                  {
                    <div
                      className="network d-flex"
                      disabled={true}
                      //  key={index}
                    >
                      {/* {networksData.map((item, index) => {
                        return (
                          <div>
                            <img
                              src={item.image}
                              alt="coming soon"
                              style={{
                                width: "4rem",
                                cursor: "pointer",
                              }}
                              className={`network-img  ${
                                "Ethereum" === item.name
                                  ? ""
                                  : "selected-network"
                              } ${index !== 0 ? "ml-3" : "ml-0"}`}
                            />
                            <p
                              className={`text-white mt-1  ${
                                index !== 0 ? "ml-3" : "ml-0"
                              }`}
                            >
                              {item.name}
                            </p>
                            {"Ethereum" !== item.name && (
                              <span
                                className="tooltiptext"
                                style={{
                                  display: `${
                                    "Ethereum" === item.name ? "none" : "block"
                                  }`,
                                }}
                              >
                                Coming soon
                              </span>
                            )}
                          </div>
                        );
                      })} */}
                      <div className="">
                        <img
                          src={networksData[0].image}
                          alt="coming soon"
                          style={{
                            width: "4rem",
                            cursor: "pointer",
                            // padding: "0rem 0rem 0rem 1rem",
                          }}
                          className={`network-img ${
                            "Ethereum" === networksData[0].name
                              ? ""
                              : "selected-network"
                          }`}
                        />
                        <p className="text-white mt-2">
                          {networksData[0].name}
                        </p>
                      </div>
                      <div className=" ml-3 polygon position-relative">
                        <span className="tooltiptext1 tooltiptext">Coming soon</span>
                        <img
                          src={networksData[1].image}
                          alt="coming soon"
                          style={{
                            width: "4rem",
                            cursor: "pointer",
                            // padding: "0rem 0rem 0rem 1rem",
                          }}
                          className={`network-img ${"selected-network"}`}
                        />
                        <p className="text-white mt-2">
                          {networksData[1].name}
                        </p>
                      </div>

                      <div className=" ml-3 cardano position-relative" >
                        <span className="tooltiptext2 tooltiptext">Coming soon</span>
                        <img
                          src={networksData[2].image}
                          alt="coming soon"
                          style={{
                            width: "4rem",
                            cursor: "pointer",
                            // padding: "0rem 0rem 0rem 1rem",
                          }}
                          className={`network-img ${"selected-network"}`}
                        />
                        <p className="text-white mt-2">
                          {networksData[2].name}
                        </p>
                      </div>

                      <div className=" ml-3 binance position-relative">
                        <span className="tooltiptext3 tooltiptext">Coming soon</span>
                        <img
                          src={networksData[3].image}
                          alt="coming soon"
                          style={{
                            width: "4rem",
                            cursor: "pointer",
                            // padding: "0rem 0rem 0rem 1rem",
                          }}
                          className={`network-img   ${"selected-network"}`}
                        />
                        <p className="text-white mt-2">
                        {"Binance"} <br /> {"SmartChain"}
                        </p>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <button
                type="button"
                className="btn btn-secondary start-btn mt-4"
                onClick={() => history.push("/fourStepForm")}
              >
                Lets Start
              </button>
            </div>

            <div className="d-flex  home-slider-wrapper ">
              <div
                className="home-slider-container"
                style={{ marginLeft: "2rem" }}
              >
                <SimpleSlider assetList={WordsFamousNfts} />
                {/* {
                  !spinner &&

                  }
                  <div className="d-flex justify-content-center align-items-center h-100" style={{display:`${spinner?"none":"block"}`}}>

                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                  </div>  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) =>
//   // console.log(state, "state"),
//   ({
//     hometest: state.home,
//   });

// export default connect(mapStateToProps, {
//   hometest,
// })(Home);
export default Home;
