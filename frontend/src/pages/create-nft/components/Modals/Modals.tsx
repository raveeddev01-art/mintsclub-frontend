import React from 'react';
import PropertiesModal from '../../../../Components/Modals/PropertiesModal/PropertiesModal';
import LevelsModal from '../../../../Components/Modals/LevelsModal/LevelsModal';
import StatsModal from '../../../../Components/Modals/StatsModal/StatsModal';
const Modals = ({ handlers, state }: any) => {
	const {
		propertiesmodalShow,
		properties,
		nft,
		levelsmodalShow,
		stats,
		levels,
		statsmodalShow,
	} = state;

	return (
		<>
			<PropertiesModal
				show={propertiesmodalShow}
				properties={properties}
				nftInfo={nft}
				handlers={handlers}
			/>
			<LevelsModal
				show={levelsmodalShow}
				levels={levels}
				nftInfo={nft}
				handlers={handlers}
			/>
			<StatsModal
				show={statsmodalShow}
				stats={stats}
				nftInfo={nft}
				handlers={handlers}
			/>
		</>
	);
};
export default Modals;
