import React, { useEffect } from 'react';
import Hero from '../../Components/Hero/Hero';
import Auctions from '../auctions/home-auctions';
import TopSeller from '../top-seller/topseller';
import Buysell from '../../Components/BuySell/BuySell';
import PopularCollections from '../collections/popular-collections';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
function Home() {
	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	return (
		<>
			<Hero />
			<Auctions />
			<TopSeller viewAll={'View All'} />
			<PopularCollections />
			<Buysell />
			<OwnCollectionToday />
		</>
	);
}

export default Home;
