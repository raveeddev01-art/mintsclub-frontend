import { useEffect } from "react";
import Hero from "../../Components/Hero/Hero";
import Auctions from "../auctions/home-auctions";
import TopSeller from "../top-seller/topseller";
import Buysell from "../../Components/BuySell/BuySell";
import PopularCollections from "../collections/popular-collections";
import OwnCollectionToday from "../../Components/OwnCollectionToday/OwnCollectionToday";
function Home() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Hero getLiveAuctions={function (qs: any) {
        // throw new Error("Function not implemented.");
      } } beforeAuction={function () {
        // throw new Error("Function not implemented.");
      } } auction={undefined} />
      <Auctions />
      <TopSeller viewAll={"View All"} />
      <PopularCollections />
      <Buysell />
      <OwnCollectionToday />
    </>
  );
}

export default Home;
