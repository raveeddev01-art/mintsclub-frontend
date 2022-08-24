import React, { useEffect } from "react";
import Hero from "../../components/hero/hero";
import Auctions from "../auctions/home-auctions";
import TopSeller from "../top-seller/topseller";
import Buysell from "../../components/buy-sell/Buysell";
import PopularCollections from "../collections/popular-collections";
import OwnCollectionToday from "../../components/own-collection-today/own-collection-today";

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
      <Buysell />
      <OwnCollectionToday />
    </>
  );
}

export default Home;
