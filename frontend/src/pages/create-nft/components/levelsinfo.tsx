import React, { FC } from 'react';
import './nftinfo.scss';
import InputClose from '../../../assets/images/inp-close.svg';
import { LevelsInfoInterface } from '../../../interfaces/components';
import { handleRemove } from '../../../utils/helpers/helpers';

const LevelsInfo: FC<LevelsInfoInterface> = ({
	name,
	value,
	i,
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
	// const { handleModalsRemove } = handlers;
	// const handleRemove = (i: number, status: string) => {
	// 	const newFormValues = [...nft.levels];
	// 	newFormValues.splice(i, 1);
	// 	const newNFTValues = [...nft.levels];
	// 	newNFTValues.splice(i, 1);
	// 	const nftUpdate = { ...nft, levels: newNFTValues };
	// 	handleModalsRemove('levels', newFormValues, nftUpdate);
	// };
	return (
		<div className="nft-info-container-wrap">
			<img
				src={InputClose}
				alt="inputmodal"
				onClick={() => handleRemove(index, 'levels', nft, handlers)}
			/>
			<div className="nft-info-container mx-1 mt-3" key={i}>
				<div className="content-heading  d-flex align-items-center justify-content-between">
					<p>
						<span>Level Name: </span>
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
export default LevelsInfo;
