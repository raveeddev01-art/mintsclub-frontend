import React from 'react';
import StatsInfo from '../../pages/create-nft/components/statsinfo';
import LevelsInfo from '../../pages/create-nft/components/levelsinfo';
import './MetaDataSmall.scss';
const MetaDataSmall = ({ properties, stats, levels, nftInfo }: any) => {
	return (
		<div className="col-12 d-block d-lg-none">
			<div className="detail-box">
				<h6>Properties</h6>
				<hr />
				{properties && properties.length > 0 ? (
					properties.map((detail: any, key: any) => {
						return (
							<div
								className="detail-rounded-type d-flex align-items-center"
								key={key}
							>
								<div className="detail-rounded-name">
									<p>{detail.name}:</p>
								</div>
								<div className="detail-content">
									<p>{detail.type}</p>
								</div>
							</div>
						);
					})
				) : (
					<p className="text-center no-found">No Properties Found</p>
				)}
			</div>
			<div className="detail-box">
				<h6>Stats</h6>
				<hr />
				{stats && stats?.length > 0 ? (
					stats.map((item: any, index: any) => {
						return (
							<StatsInfo
								name={item.name}
								value={item.value}
								key={index}
								index={index}
							/>
						);
					})
				) : (
					<p className="text-center no-found">No Stats Found</p>
				)}
			</div>

			<div className="detail-box">
				<h6>Levels</h6>
				<hr />
				<div>
					{levels && levels.length > 0 ? (
						levels.map((item: any, i: any) => {
							return (
								<LevelsInfo
									name={item.name}
									value={item.value}
									i={i}
									key={i}
									index={i}
								/>
							);
						})
					) : (
						<p className="text-center no-found">No Levels Found</p>
					)}
				</div>
			</div>
			<div className="detail-box">
				<h6>Details</h6>
				<hr />
				{nftInfo.map((detail: any, i: any) => {
					return (
						<div
							className="detail-rounded-type d-flex align-items-center"
							key={i}
						>
							<div className="detail-rounded-name">
								<p>{detail.title}:</p>
							</div>
							<div className="detail-content">
								<p>{detail.value}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default MetaDataSmall;
