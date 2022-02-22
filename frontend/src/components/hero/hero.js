import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connectMetamaskCopy } from "../../utils/web3";
import { ENV } from "./../../config/config";
import "./hero.css";
import CreateIcon from "../../assets/images/create-icon.svg";
import ExploreIcon from "../../assets/images/explore-icon.svg";
import PlayIcon from "../../assets/images/play-icon.svg";
import Slider from "./component/slider";
import Particles from "react-tsparticles";

const Hero = (props) => {
  const [connectedAddress, setConnectedAddress] = useState("");

  useEffect(async () => {
    let connectedAddress = await connectMetamaskCopy();
    setConnectedAddress(connectedAddress);
  }, []);

  // const particlesData = {
  //   backgroundMask: {
  //     composite: "destination-out",
  //     cover: {
  //       color: {
  //         value: "#fff",
  //       },
  //       opacity: 0.5,
  //     },
  //     enable: false,
  //   },
  //   fullScreen: {
  //     enable: true,
  //     zIndex: 1,
  //   },
  //   detectRetina: true,
  //   duration: 0,
  //   fpsLimit: 120,
  //   interactivity: {
  //     detectsOn: "window",
  //     events: {
  //       onClick: {
  //         enable: false,
  //         mode: "push",
  //       },
  //       onDiv: {
  //         selectors: [],
  //         enable: false,
  //         mode: [],
  //         type: "circle",
  //       },
  //       onHover: {
  //         enable: false,
  //         mode: "repulse",
  //         parallax: {
  //           enable: false,
  //           force: 2,
  //           smooth: 10,
  //         },
  //       },
  //       resize: true,
  //     },
  //     modes: {
  //       attract: {
  //         distance: 200,
  //         duration: 0.4,
  //         easing: "ease-out-quad",
  //         factor: 1,
  //         maxSpeed: 50,
  //         speed: 1,
  //       },
  //       bounce: {
  //         distance: 200,
  //       },
  //       bubble: {
  //         distance: 400,
  //         duration: 2,
  //         mix: false,
  //         opacity: 0.5,
  //         size: 40,
  //       },
  //       connect: {
  //         distance: 80,
  //         links: {
  //           opacity: 0.2,
  //         },
  //         radius: 60,
  //       },
  //       grab: {
  //         distance: 400,
  //         links: {
  //           blink: false,
  //           consent: false,
  //           opacity: 0.5,
  //         },
  //       },
  //       light: {
  //         area: {
  //           gradient: {
  //             start: {
  //               value: "#ffffff",
  //             },
  //             stop: {
  //               value: "#000000",
  //             },
  //           },
  //           radius: 1000,
  //         },
  //         shadow: {
  //           color: {
  //             value: "#000000",
  //           },
  //           length: 2000,
  //         },
  //       },
  //       push: {
  //         default: true,
  //         groups: [],
  //         quantity: 4,
  //       },
  //       remove: {
  //         quantity: 2,
  //       },
  //       repulse: {
  //         distance: 200,
  //         duration: 0.4,
  //         factor: 100,
  //         speed: 1,
  //         maxSpeed: 50,
  //         easing: "ease-out-quad",
  //       },
  //       slow: {
  //         factor: 3,
  //         radius: 200,
  //       },
  //       trail: {
  //         delay: 1,
  //         pauseOnStop: false,
  //         quantity: 1,
  //       },
  //     },
  //   },
  //   manualParticles: [],
  //   motion: {
  //     disable: false,
  //     reduce: {
  //       factor: 4,
  //       value: true,
  //     },
  //   },
  //   particles: {
  //     bounce: {
  //       horizontal: {
  //         random: {
  //           enable: false,
  //           minimumValue: 0.1,
  //         },
  //         value: 1,
  //       },
  //       vertical: {
  //         random: {
  //           enable: false,
  //           minimumValue: 0.1,
  //         },
  //         value: 1,
  //       },
  //     },
  //     collisions: {
  //       bounce: {
  //         horizontal: {
  //           random: {
  //             enable: false,
  //             minimumValue: 0.1,
  //           },
  //           value: 1,
  //         },
  //         vertical: {
  //           random: {
  //             enable: false,
  //             minimumValue: 0.1,
  //           },
  //           value: 1,
  //         },
  //       },
  //       enable: false,
  //       mode: "bounce",
  //       overlap: {
  //         enable: true,
  //         retries: 0,
  //       },
  //     },
  //     color: {
  //       value: "#ffffff",
  //       animation: {
  //         h: {
  //           count: 0,
  //           enable: false,
  //           offset: 0,
  //           speed: 1,
  //           sync: true,
  //         },
  //         s: {
  //           count: 0,
  //           enable: false,
  //           offset: 0,
  //           speed: 1,
  //           sync: true,
  //         },
  //         l: {
  //           count: 0,
  //           enable: false,
  //           offset: 0,
  //           speed: 1,
  //           sync: true,
  //         },
  //       },
  //     },
  //     destroy: {
  //       mode: "none",
  //       split: {
  //         count: 1,
  //         factor: {
  //           random: {
  //             enable: false,
  //             minimumValue: 0,
  //           },
  //           value: 3,
  //         },
  //         rate: {
  //           random: {
  //             enable: false,
  //             minimumValue: 0,
  //           },
  //           value: {
  //             min: 4,
  //             max: 9,
  //           },
  //         },
  //         sizeOffset: true,
  //       },
  //     },
  //     gradient: [],
  //     groups: {},
  //     life: {
  //       count: 0,
  //       delay: {
  //         random: {
  //           enable: false,
  //           minimumValue: 0,
  //         },
  //         value: 0,
  //         sync: false,
  //       },
  //       duration: {
  //         random: {
  //           enable: false,
  //           minimumValue: 0.0001,
  //         },
  //         value: 0,
  //         sync: false,
  //       },
  //     },
  //     links: {
  //       blink: true,
  //       color: {
  //         value: "#ffffff",
  //       },
  //       consent: false,
  //       distance: 150,
  //       enable: true,
  //       frequency: 1,
  //       opacity: 0.5,
  //       shadow: {
  //         blur: 5,
  //         color: {
  //           value: "#00ff00",
  //         },
  //         enable: false,
  //       },
  //       triangles: {
  //         enable: false,
  //         frequency: 1,
  //       },
  //       width: 1,
  //       warp: true,
  //     },
  //     move: {
  //       angle: {
  //         offset: 0,
  //         value: 90,
  //       },
  //       attract: {
  //         distance: 200,
  //         enable: false,
  //         rotate: {
  //           x: 600,
  //           y: 1200,
  //         },
  //       },
  //       decay: 0,
  //       distance: {},
  //       direction: "none",
  //       drift: 0,
  //       enable: true,
  //       gravity: {
  //         acceleration: 9.81,
  //         enable: false,
  //         inverse: false,
  //         maxSpeed: 50,
  //       },
  //       path: {
  //         clamp: true,
  //         delay: {
  //           random: {
  //             enable: false,
  //             minimumValue: 0,
  //           },
  //           value: 0,
  //         },
  //         enable: false,
  //         options: {},
  //       },
  //       outModes: {
  //         default: "out",
  //         bottom: "out",
  //         left: "out",
  //         right: "out",
  //         top: "out",
  //       },
  //       random: false,
  //       size: false,
  //       speed: 2,
  //       spin: {
  //         acceleration: 0,
  //         enable: false,
  //       },
  //       straight: false,
  //       trail: {
  //         enable: false,
  //         length: 10,
  //         fillColor: {
  //           value: "#000000",
  //         },
  //       },
  //       vibrate: false,
  //       warp: true,
  //     },
  //     number: {
  //       density: {
  //         enable: true,
  //         area: 800,
  //         factor: 1000,
  //       },
  //       limit: 0,
  //       value: 80,
  //     },
  //     opacity: {
  //       random: {
  //         enable: false,
  //         minimumValue: 0.1,
  //       },
  //       value: 0.5,
  //       animation: {
  //         count: 0,
  //         enable: false,
  //         speed: 2,
  //         sync: false,
  //         destroy: "none",
  //         startValue: "random",
  //         minimumValue: 0.1,
  //       },
  //     },
  //     orbit: {
  //       animation: {
  //         count: 0,
  //         enable: false,
  //         speed: 1,
  //         sync: false,
  //       },
  //       enable: false,
  //       opacity: 0.5,
  //       rotation: {
  //         random: {
  //           enable: false,
  //           minimumValue: 0,
  //         },
  //         value: 45,
  //       },
  //       width: 1,
  //     },
  //     reduceDuplicates: false,
  //     repulse: {
  //       random: {
  //         enable: false,
  //         minimumValue: 0,
  //       },
  //       value: 0,
  //       enabled: false,
  //       distance: 1,
  //       duration: 1,
  //       factor: 1,
  //       speed: 1,
  //     },
  //     roll: {
  //       darken: {
  //         enable: false,
  //         value: 0,
  //       },
  //       enable: false,
  //       enlighten: {
  //         enable: false,
  //         value: 0,
  //       },
  //       mode: "vertical",
  //       speed: 5,
  //     },
  //     rotate: {
  //       random: {
  //         enable: false,
  //         minimumValue: 0,
  //       },
  //       value: 0,
  //       animation: {
  //         enable: false,
  //         speed: 0,
  //         sync: false,
  //       },
  //       direction: "clockwise",
  //       path: false,
  //     },
  //     shadow: {
  //       blur: 0,
  //       color: {
  //         value: "#000000",
  //       },
  //       enable: false,
  //       offset: {
  //         x: 0,
  //         y: 0,
  //       },
  //     },
  //     shape: {
  //       options: {},
  //       type: "circle",
  //     },
  //     size: {
  //       random: {
  //         enable: true,
  //         minimumValue: 1,
  //       },
  //       value: {
  //         min: 1,
  //         max: 3,
  //       },
  //       animation: {
  //         count: 0,
  //         enable: false,
  //         speed: 2,
  //         sync: false,
  //         destroy: "none",
  //         startValue: "random",
  //         minimumValue: 0.1,
  //       },
  //     },
  //     stroke: {
  //       width: 0,
  //     },
  //     tilt: {
  //       random: {
  //         enable: false,
  //         minimumValue: 0,
  //       },
  //       value: 0,
  //       animation: {
  //         enable: false,
  //         speed: 0,
  //         sync: false,
  //       },
  //       direction: "clockwise",
  //       enable: false,
  //     },
  //     twinkle: {
  //       lines: {
  //         enable: false,
  //         frequency: 0.05,
  //         opacity: 0.5,
  //       },
  //       particles: {
  //         enable: false,
  //         frequency: 0.05,
  //         opacity: 0.5,
  //       },
  //     },
  //     wobble: {
  //       distance: 5,
  //       enable: false,
  //       speed: 2,
  //     },
  //     zIndex: {
  //       random: {
  //         enable: false,
  //         minimumValue: 0,
  //       },
  //       value: 0,
  //       opacityRate: 0.5,
  //       sizeRate: 1,
  //       velocityRate: 1,
  //     },
  //   },
  //   fullScreen: {
  //     zIndex: -5,
  //   },
  //   pauseOnBlur: true,
  //   pauseOnOutsideViewport: true,
  //   responsive: [],
  //   style: {},
  //   themes: [],
  //   zLayers: 1,
  // };

  const particlesData = {
    fullScreen: {
      zIndex: -5,
    },
    color: {
      value: "#5666fe",
    },
    twinkle: {
      lines: {
        enable: true,
        frequency: 0.05,
        opacity: 0.5,
      },
      particles: {
        enable: false,
        frequency: 0.05,
        opacity: 0.5,
      },
    },
    wobble: {
      distance: 5,
      enable: false,
      speed: 2,
    },
    particles: {
      number: {
        value: 25,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#5666fe",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 50,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#5666fe",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 2,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
    zLayers: 1,
  };
  return (
    <section className="hero-section padding-wrapper">
      {/* <Particles id="tsparticles" options={{ ...particlesData }} /> */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 col-xl-5">
            <h1 className="mt-4">
              Discover, collect, and sell extraordinary NFTs
            </h1>
            <p className="mp-explore-text">
              Explore on the world's best & largest NFT marketplace
            </p>
            {/* Buttons */}
            <div className="button-group mt-lg-5 d-flex">
              <Link
                className="btn btn-linear-gradient "
                to={connectedAddress ? "/create" : "/login"}
              >
                {/* <i className="icon-note mr-2" /> */}
                <img src={CreateIcon} alt="createIcon" className="me-2" />
                Create
              </Link>
              <Link
                className="btn btn-rounded-bordered btn-hero-explore"
                to="/explore-all"
              >
                {/* <i className="icon-rocket mr-2" /> */}
                <img src={ExploreIcon} alt="exploreIcon" className="me-2" />
                <p>Explore</p>
              </Link>
            </div>
            <div className="watch-video d-flex align-items-center mt-5">
              <img src={PlayIcon} alt="playIcon" className="me-2" />
              <span>Watch video to learn more</span>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-7 ">
            {/* <div className="ms-auto d-flex">
              {/* <HeroCards />
              <HeroCards className="HeroCard-after" /> */}
            {/* <HeroSlider /> */}
            {/* <HeroSlickSlider /> */}
            {/* <CustomSlider /> */}
            {/* </div> */}

            <Slider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
