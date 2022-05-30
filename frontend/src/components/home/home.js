import React, { useEffect } from "react";
import Hero from "../hero/hero";
import Auctions from "../auctions/home-auctions";
import TopSeller from "../top-seller/topseller";

import NavbarMain from "../navbar-main/NavbarMain";
import OwnCollection from "../owncollection/OwnCollection";
import Buysell from "../buy-sell/Buysell";
import Footer from "../footer/footer";
import PopularCollections from "../collections/popular-collections";

function Home() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Hero />

      <Auctions />

      <TopSeller viewAll={"View All"} />

      <PopularCollections />

      <OwnCollection />
      <Buysell />
    </>
  );
}

export default Home;
