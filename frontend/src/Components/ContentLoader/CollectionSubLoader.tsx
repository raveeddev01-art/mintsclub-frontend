import React, { useState, FC } from 'react';
import ContentLoader from 'react-content-loader';
import { CollectionSubLoaderInt } from '../../interfaces/components';

const CollectionSubLoader: FC<CollectionSubLoaderInt> = ({ image }) => {
	const [loader, setLoader] = useState<any>(true);
	return (
		<>
			<img
				src={image}
				alt="subImg"
				style={{ display: `${!loader ? 'block' : 'none'}` }}
				onLoad={() => setLoader(false)}
			/>

			<ContentLoader
				speed={2}
				style={{
					width: '100%',
					height: '80px',
					display: `${loader ? 'block' : 'none'}`,
				}}
				backgroundColor="#d9d9d9"
				foregroundColor="#ededed"
			>
				<rect className="w-100 h-100" rx="12" ry="12" />
			</ContentLoader>
		</>
	);
};
export default CollectionSubLoader;
