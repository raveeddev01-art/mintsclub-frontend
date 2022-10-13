import React from 'react';
import PropertiesInfo from '../propertiesinfo';

const AddProperties = ({ data }: any) => {
	const { showModal, AddIcon, nft } = data;

	return (
		<div className="col-12 col-lg-6 mt-3 mt-lg-5">
			<label className="create-collection-label">Properties:</label>
			<div className="create-collection-input mt-2 d-flex align-items-center justify-content-between">
				<div className="properties-content">
					<p>Add Properties</p>
				</div>
				<div className="properties-btn">
					<button
						onClick={() => {
							showModal();
						}}
					>
						<img src={AddIcon} alt="add" />
					</button>
				</div>
			</div>
			<div className="nft-properties-container mx-2 mt-3">
				<div className="row g-2">
					{nft.properties.map((item: { name: any; type: any }, index: any) => {
						return (
							<div key={index} className="col-md-6">
								<PropertiesInfo name={item.name} type={item.type} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default AddProperties;
