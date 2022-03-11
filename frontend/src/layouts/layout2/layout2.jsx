import React, { Component } from "react";
import Particles from "react-tsparticles";
// import Scrollup from '../../components/scroll-up/sroll-up';

class Layout2 extends Component {
  render() {
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
          speed: 1,
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
      <div className="main">
        <Particles id="tsparticles" options={{ ...particlesData }} />
        {this.props.children}
      </div>
    );
  }
}

export default Layout2;
