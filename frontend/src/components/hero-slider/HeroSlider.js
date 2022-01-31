import React from "react";

import { v4 as uuidv4 } from "uuid";

import Carroussel from "./HeroSliderSetting";
import HeroCards from "../../Screens/rough/hero-cards/HeroCards";

const cards = [
  {
    key: uuidv4(),
    content: <HeroCards />,
  },
  {
    key: uuidv4(),
    content: <HeroCards />,
  },
  {
    key: uuidv4(),
    content: <HeroCards />,
  },
  {
    key: uuidv4(),
    content: <HeroCards />,
  },
  {
    key: uuidv4(),
    content: <HeroCards />,
  },
  {
    key: uuidv4(),
    content: <HeroCards />,
  },
  {
    key: uuidv4(),
    content: <HeroCards />,
  },
  {
    key: uuidv4(),
    content: <HeroCards />,
  },
];

const HeroSlider = () => {
  return (
    <Carroussel
      cards={cards}
      offset={2}
      showArrows={true}
      margin="0 0 0 auto"
    />
  );
};

export default HeroSlider;
