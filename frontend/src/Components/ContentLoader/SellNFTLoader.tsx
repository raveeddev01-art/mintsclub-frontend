import React from 'react';
import ContentLoader from 'react-content-loader';
const SellNFTLoader = (props: any) => {
	return (
		<ContentLoader
			// width={450}
			// height={400}
			backgroundColor="#f0f0f0"
			foregroundColor="#dedede"
			style={{ width: '100%', height: '500px' }}
			className=""
			{...props}
		>
			{/* <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
        <rect x="44" y="323" rx="3" ry="3" width="119" height="6" /> */}
			<rect className="w-100 h-100" rx="30" ry="30" />
		</ContentLoader>
	);
};

export default SellNFTLoader;
