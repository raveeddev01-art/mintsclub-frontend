import React from 'react';
import StatsInfo from '../../pages/create-nft/components/statsinfo';
import LevelsInfo from '../../pages/create-nft/components/levelsinfo';
const MetaData = ({ properties, stats, levels, nftInfo }: any) => {
	return (
		<div className="col-lg-4 col-xl-3 order-1 order-lg-0 d-none d-lg-block">
			{/* <button onClick={() => BuyLazyNft()}>buyNOw</button> */}
			<div className="detail-box">
				<h6>Properties</h6>
				<hr />
				{properties && properties.length > 0 ? (
					properties.map((detail: any, i: any) => {
						return (
							<div
								className="detail-rounded-type d-flex align-items-center"
								key={i}
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
					<p className="text-center npf-text">No Properties Found</p>
				)}
			</div>
			<div className="detail-box">
				<h6>Stats</h6>
				<hr />
				<div>
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
						<p className="text-center npf-text">No Stats Found</p>
					)}
				</div>
			</div>
			<div className="detail-box">
				<h6>Levels</h6>
				<hr />
				<div>
					{levels && levels.length > 0 ? (
						levels.map((item: any, index: any) => {
							return (
								<LevelsInfo
									name={item.name}
									value={item.value}
									key={index}
									index={index}
								/>
							);
						})
					) : (
						<p className=" text-center npf-text">No Levels Found</p>
					)}
				</div>
			</div>
			<div className="detail-box">
				<h6>Details</h6>
				<hr />
				{nftInfo.map((item: any, index: any) => {
					if (item.value && item.value !== '') {
						return (
							<div
								key={index}
								className={`detail-rounded-type d-flex align-items-center ${
									item.title === 'Contract Address' ? 'text-highlighted' : ''
								}`}
								onClick={() => {
									// eslint-disable-next-line no-unused-expressions
									item.title === 'Contract Address' &&
										window.open(
											'https://rinkeby.etherscan.io/address/0x328106925e0e5721725ec92fc256b7e6cbdd8e43',
											'_blank'
										);
								}}
							>
								<div className={`detail-rounded-name `}>
									<p>{item.title}:</p>
								</div>
								<div className={`detail-content`}>
									<p> {item.value}</p>
								</div>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};
export default MetaData;
