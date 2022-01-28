import React, { useEffect } from "react";
import { Table, Pagination } from "react-bootstrap";
import Hero from "../hero/hero";
import Auctions from "../auctions/home-auctions";
import TopSeller from "../top-seller/topseller2";
import Collections from "../collections/popular-collections";
import MyCollections from "../collections/my-collections";
import Explore from "../explore/explore-home";
import Work from "../work/work";
import Authors from "../authors/authors";
import Header from "../header/header";
import NavbarMain from "../../Screens/rough/navbar-main/NavbarMain";
import OwnCollection from "../owncollection/OwnCollection";
import Buysell from "../buy-sell/Buysell";
import Footer from "../footer/footer";
import PopularCollections from "../collections/popular-collections";
import AuctionsCards from "../../Screens/rough/auctions-cards/AuctionsCards";

function Home() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      {/* <Header /> */}
      <NavbarMain />
      <Hero />
      {/* <button onClick={()=>Redirection('/explore-all')}>test cases</button>  */}
      <Auctions />
      {/* <AuctionsCards /> */}
      <Work />
      <TopSeller viewAll={"View All"} />
      {/* <Collections /> */}
      {/* <PopularCollections /> */}
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
