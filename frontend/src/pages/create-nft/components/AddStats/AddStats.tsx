import React from 'react';
import StatsInfo from '../statsinfo';

const AddStats = ({ data, handlers }: any) => {
	const { showModal, AddIcon, nft } = data;
	return (
		<div className="col-12 col-lg-6 mt-3 ">
			<label className="create-collection-label">Stats:</label>
			<div className="create-collection-input mt-2 d-flex align-items-center justify-content-between">
				<div className="properties-content">
					<p>Add Stats</p>
				</div>
				<div className="properties-btn">
					<button
						onClick={() => {
							showModal({
								statsmodalShow: true,
							});
						}}
					>
						<img src={AddIcon} alt="add" />
					</button>
				</div>
			</div>

			<div className="nft-stat-container mx-2 mt-3">
				{nft.stats.map((item: { name: any; value: any }, index: any) => {
					return (
						<StatsInfo
							nft={nft}
							name={item.name}
							value={item.value}
							key={index}
							handlers={handlers}
							index={index}
						/>
					);
				})}
			</div>
		</div>
	);
};
export default AddStats;
