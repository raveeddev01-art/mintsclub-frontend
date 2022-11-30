import React, { Component } from 'react';
import NavbarMain from '../../Components/NavbarMain/NavbarMain';
import Footer from '../../Components/Footer/Footer';

const Layout = (props) => {
	return (
		<>
			<div className="bg-clr">
				<NavbarMain />
				<div className="main">{props.children}</div>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
