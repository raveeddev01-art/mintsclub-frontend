import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
// import { hometest } from "../../Redux/actions/actions";
import Navbar from '../../components/Navbar/navbar';
import SimpleSlider from '../../components/Slider/slider';
// import image from "../../assets/images/test.jpg";
import Polygon from '../../assets/images/icon 2.svg';
// import Ethereum from "../../assets/images/Ethereum.svg";
import Cardano from '../../assets/images/icon 3.svg';
import Binance from '../../assets/images/icon4.svg';
import Ethereum from '../../assets/images/icon1.png';
// import nft2 from "../../assets/images/icon4.svg";
// import nft3 from "../../assets/images/icon 2.svg";
////////////////////////
import nft1 from '../../assets/images/nft1.jpg';
import nft2 from '../../assets/images/nft2.webp';
import nft3 from '../../assets/images/nft3.jpeg';
import nft4 from '../../assets/images/nft4.webp';
import nft5 from '../../assets/images/nft5.jpg';
import GaTracker from '../../gaTracker/gaTracket';

import './home.css';

const Home = (props) => {
  //  useEffect(()=>{
  // },[])
  GaTracker();
  const networksData = [
    { name: 'Ethereum', image: Ethereum },
    { name: 'Polygon', image: Polygon },
    { name: 'Cardano', image: Cardano },
    { name: 'Binance SmartChain', image: Binance },
  ];

  const history = useHistory();
  const wordsFamousNfts = [
    {
      img: nft3,
      link: 'https://niftygateway.com/itemdetail/primary/0x0151834a6997f89eb8372ac54ac077d79bb4d1e0/7',
    },
    {
      img: nft1,
      link: 'https://onlineonly.christies.com/s/beeple-first-5000-days/beeple-b-1981-1/112924?ldp_breadcrumb=back',
    },
    {
      img: nft2,
      link: 'https://niftygateway.com/marketplace?collection=0x12f28e2106ce8fd8464885b80ea865e98b465149&tokenId=100010001',
    },
    { img: nft4, link: 'https://foundation.app/@snowden/~/24437' },
    { img: nft5, link: 'https://www.phillips.com/mdj' },
  ];

  return (
    <div className='home-container p-1'>
      <div className='content'>
        <div className='home-navbar'>
          <Navbar />
        </div>
        <div className='mt-4 details-container'>
          <div className=' d-flex justify-content-between home-info-container'>
            <div className=' '>
              <div className='details'>
                <div className='' style={{ maxWidth: '31rem' }}>
                  <p
                    className='text-white mint-title'
                    style={{ fontSize: '46px', fontWeight: 'bold' }}
                  >
                    Let's Mint Your NFTs
                  </p>
                  <p
                    className='text-white mint-title'
                    style={{ fontSize: '30px', fontWeight: 'bold' }}
                  >
                    Free..! Minting Always!!
                  </p>
                  {/* <p className="text-white" style={{ fontSize: "20px" }}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.{" "}
                  </p> */}
                </div>
              </div>

              <div className='networks '>
                <p
                  className='text-white select-network-heading'
                  style={{ fontSize: '36px' }}
                >
                  Select Network
                </p>
                <div className='networks-list-container mt-4 d-flex '>
                  {networksData.map((item, index) => {
                    return (
                      <div
                        className='network'
                        disabled={true}
                        key={index}
                        // onClick={() => {
                        //   if (item.name === "Ethereum") {
                        //     setNetwork(item.name);
                        //     // setFlag(true);
                        //   }
                        // }}
                      >
                        {/* <div
                        className="position-relative network-image"
                          style={{
                            backgroundColor: "white",
                            width: "4.7rem",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                        > */}
                        <img
                          src={item.image}
                          alt='coming soon'
                          style={{
                            width: '4rem',
                            cursor: 'pointer',
                            // padding: "0rem 0rem 0rem 1rem",
                          }}
                          className={`network-img ${
                            'Ethereum' === item.name ? '' : 'selected-network'
                          }`}
                        />
                        {'Ethereum' !== item.name && (
                          <span className='tooltiptext'>Coming soon</span>
                        )}
                        {/* </div> */}
                        <p
                          className={`ml-1 mt-2 ${
                            'Ethereum' === item.name
                              ? 'network-title-yellow'
                              : 'network-title-white'
                          }`}
                          style={{ fontSize: '14px' }}
                        >
                          {item.name === 'Binance SmartChain' ? (
                            <p>
                              {'Binance'} <br /> {'SmartChain'}
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
                type='button'
                className='btn btn-secondary start-btn mt-4'
                onClick={() => history.push('/fourStepForm')}
              >
                Lets Start
              </button>
            </div>

            <div className='d-flex  home-slider-wrapper '>
              <div
                className='home-slider-container'
                style={{ marginLeft: '2rem' }}
              >
                <SimpleSlider wordsFamousNfts={wordsFamousNfts} />
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
