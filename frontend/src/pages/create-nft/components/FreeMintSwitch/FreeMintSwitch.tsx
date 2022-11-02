import MintSwitch from '../../../../Components/MintSwitch/MintSwitch';
import React from 'react';

const FreeMintSwitch = (props: any) => {
	const { nftId, isFreeMint, blockchainType, onSwitch } = props;
	return (
		<>
			{!nftId && (
				<div className="col-12 col-lg-6 mt-3 d-flex align-items-center justify-content-between px-3">
					{blockchainType !== 'algorand' && (
						<>
							{' '}
							<div>
								<label className="create-collection-label ms-0">
									Free minting
								</label>
								<p>Buyer will pay gas fess for minting</p>
							</div>{' '}
							<MintSwitch
								checked={isFreeMint}
								onChange={() => {
									onSwitch();
								}}
								inputProps={{ 'aria-label': 'mint' }}
							/>
						</>
					)}
				</div>
			)}
		</>
	);
};
export default FreeMintSwitch;
