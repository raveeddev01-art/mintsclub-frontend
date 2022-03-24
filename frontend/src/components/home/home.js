import React, { useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import Hero from "../hero/hero";
import Auctions from "../auctions/home-auctions";
import TopSeller from "../top-seller/topseller2";
import Work from "../work/work";
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
      {/* <Header /> */}
      <NavbarMain />
      <Hero />

      <Auctions />
      {/* <AuctionsCards /> */}
      <Work />
      <TopSeller viewAll={"View All"} />
      {/* <Collections /> */}
      <PopularCollections />
      {/* <CardSlider /> */}
      {/* <Authors /> */}
      {/* <MyCollections /> */}
      {/* <Explore /> */}
      <OwnCollection />
      <Buysell />
      <Footer />
    </>
  );
}

export default Home;
