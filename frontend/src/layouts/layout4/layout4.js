import React, { Component } from 'react';
import Footer from '../../Components/Footer/Footer';

const Layout4 = (props) => {
	return (
		<>
			{' '}
			<div className="main bg-clr">{props.children}</div> <Footer />
		</>
	);
};

export default Layout4;
