import React, { FC } from 'react';
import './nftinfo.scss';
import { PropertiesInfoInterface } from '../../../interfaces/components';
import InputClose from '../../../assets/images/inp-close.svg';
import { handleRemove } from '../../../utils/helpers/helpers';
const PropertiesInfo: FC<PropertiesInfoInterface> = ({
	index,
	nft,
	name,
	type,
	handlers,
}) => {
	const { handleModalsRemove }: any = handlers;
	return (
		<>
			<div className="nft-propinfo-container mx-1">
				<img
					src={InputClose}
					alt="inputmodal"
					onClick={() => handleRemove(index, 'properties', nft, handlers)}
				/>
				<div className="properties-content">
					<p>
						<span>Type: </span>
						{type?.length > 5 ? type.slice(0, 5) + '...' : type}
					</p>
					<p>
						<span>Name: </span>
						{name?.length > 5 ? name.slice(0, 5) + '...' : name}
					</p>
				</div>
			</div>
		</>
	);
};
export default PropertiesInfo;
