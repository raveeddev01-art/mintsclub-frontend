import React from "react";
import { Carousel } from "react-bootstrap";
import "./sliderExmp.css";

const SliderExmp = (props) => {
  return (
    <div>
      <Carousel>
        {props.assetList.map((nft, index) => {
          return (
            <Carousel.Item key={index} onClick={() => window.open(nft.link)}>
              <img src={nft.img} className="carousel-img" alt={nft} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default SliderExmp;

// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const sliderExmp = () => {
//   return <div></div>;
// };

// export default sliderExmp;

// ///////////////
// import React, { Component } from "react";
// import Slider from "react-slick";
// import './sliderComponent.scss';
// import { Container, Row , Col } from "react-bootstrap";
// import SliderImg from '../../assets/images/reviewimg.svg';
// import ArrowLeft from '../../assets/images/arrowleft.svg';
// import ArrowRight from '../../assets/images/arrowright.svg';

// export default class SliderComponent extends Component {

//     constructor(props) {
//         super(props);
//         this.next = this.next.bind(this);
//         this.previous = this.previous.bind(this);
//       }
//       next() {
//         this.slider.slickNext();
//       }
//       previous() {
//         this.slider.slickPrev();
//       }

//   render() {
//     const settings = {
//         autoplay: true,
//         autoplaySpeed: 3000,
//         dots: true,
//         arrows: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1
//     };

//     return (
//         <Container className="slider-container">
//       <div className="custom-slider">
//         <div className="services-heading text-center">
//                 <h2>What our customer are saying</h2>
//             </div>
//         <Slider ref={c => (this.slider = c)} {...settings}>
//             <div key={1}>
//                 <Row className="custom-slide align-items-center">
//                 <Col md="3">
//                     <div>
//                     <img className="slider__content__img" src={SliderImg} alt="sliderimg"/>
//                     </div>
//                 </Col>
//                 <Col md="3" className="slide-left">
//                     <h4 >Edward Newgate</h4>
//                     <p >Founder Circle</p>
//                 </Col>
//                 <Col md="6" className="slide-right">
//                     <h5>“Our dedicated patient engagement app and web portal allow you to access information instantaneously (no tedeous form, long calls, or administrative hassle) and securely”</h5>
//                 </Col>
//                 </Row>
//             </div>
//             <div key={2}>
//                 <Row className="custom-slide align-items-center">
//                 <Col md="3">
//                     <div>
//                     <img className="slider__content__img" src={SliderImg} alt="sliderimg"/>
//                     </div>
//                 </Col>
//                 <Col md="3" className="slide-left">
//                     <h4 >Edward Newgate</h4>
//                     <p >Founder Circle</p>
//                 </Col>
//                 <Col md="6" className="slide-right">
//                     <h5>“Our dedicated patient engagement app and web portal allow you to access information instantaneously (no tedeous form, long calls, or administrative hassle) and securely”</h5>
//                 </Col>
//                 </Row>
//             </div>
//             <div key={3}>
//                 <Row className="custom-slide align-items-center">
//                 <Col md="3">
//                     <div>
//                     <img className="slider__content__img" src={SliderImg} alt="sliderimg"/>
//                     </div>
//                 </Col>
//                 <Col md="3" className="slide-left">
//                     <h4 >Edward Newgate</h4>
//                     <p >Founder Circle</p>
//                 </Col>
//                 <Col md="6" className="slide-right">
//                     <h5>“Our dedicated patient engagement app and web portal allow you to access information instantaneously (no tedeous form, long calls, or administrative hassle) and securely”</h5>
//                 </Col>
//                 </Row>
//             </div>
//             <div key={4}>
//                 <Row className="custom-slide align-items-center">
//                 <Col md="3">
//                     <div>
//                     <img className="slider__content__img" src={SliderImg} alt="sliderimg"/>
//                     </div>
//                 </Col>
//                 <Col md="3" className="slide-left">
//                     <h4 >Edward Newgate</h4>
//                     <p >Founder Circle</p>
//                 </Col>
//                 <Col md="6" className="slide-right">
//                     <h5>“Our dedicated patient engagement app and web portal allow you to access information instantaneously (no tedeous form, long calls, or administrative hassle) and securely”</h5>
//                 </Col>
//                 </Row>
//             </div>

//         </Slider>
//       </div>
//       <div className="arrows-container">
//           <button className="btn-arrows" onClick={this.previous}>
//             <img src={ArrowLeft} />
//           </button>
//           <button className="btn-arrows" onClick={this.next}>
//           <img src={ArrowRight} />
//           </button>
//         </div>
//       </Container>
//     );
//   }
// }
