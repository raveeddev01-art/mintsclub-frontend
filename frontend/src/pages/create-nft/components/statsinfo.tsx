import React, { FC } from 'react';
import './nftinfo.scss';
import { StatsInfoInterface } from '../../../interfaces/components';
import InputClose from '../../../assets/images/inp-close.svg';
import { handleRemove } from '../../../utils/helpers/helpers';

const StatsInfo: FC<StatsInfoInterface> = ({
	name,
	value,
	nft,
	handlers,
	index,
}) => {
	const filled = () => {
		const filledArray = [];
		for (let i = 1; i <= value; i++) {
			filledArray.push(<div className="level-filled" key={i}></div>);
		}
		return filledArray;
	};

	const unFilled = () => {
		const unFilledArray = [];
		for (let i = 1; i <= 5 - value; i++) {
			unFilledArray.push(<div className="level-unfilled" key={i}></div>);
		}
		return unFilledArray;
	};
	return (
		<div className="nft-info-container-wrap">
			<img
				src={InputClose}
				alt="inputmodal"
				onClick={() => handleRemove(index, 'stats', nft, handlers)}
			/>
			<div className="nft-info-container mx-1 mt-3">
				<div className="content-heading  d-flex align-items-center justify-content-between">
					<p>
						<span>Stat Name: </span>
						{name?.length > 8 ? name.slice(0, 8) + '...' : name}
					</p>
					<div className="stats-content">
						<p>{value} of 5</p>
					</div>
				</div>
				<div className="levels-info-container mt-2">
					<div className="levels-content">
						{filled()}
						{unFilled()}
					</div>
				</div>
			</div>
		</div>
	);
};
export default StatsInfo;
