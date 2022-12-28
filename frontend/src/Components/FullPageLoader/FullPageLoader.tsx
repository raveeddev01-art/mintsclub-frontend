import React, { useEffect } from 'react';
import AOS from 'aos';
import './FullPageLoader.scss';
import { Typography } from '@mui/material';

interface FULL_PAGE_LOADER {
	message?: string;
}

function FullPageLoader({ message }: FULL_PAGE_LOADER) {
	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<React.Fragment>
			<div className="fullpage-loader-holder">
				<div className="fullpage-loader">
					<div className="circle"></div>
					<div className="circle"></div>
					<div className="circle"></div>
					<div className="shadow"></div>
					<div className="shadow"></div>
					<div className="shadow"></div>
				</div>
				{message && <Typography>{message}</Typography>}
			</div>
		</React.Fragment>
	);
}

export default FullPageLoader;
