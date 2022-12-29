import React from 'react';
import Table from '../../../Components/Table/Table';

const Offers = ({ data }: any) => {
	const { bids, exchangeRate, lowestNftPrice, sellingMethod } = data;
	return (
		<div className="col-12">
			<div className="detail-bg-box">
				<h5>Offers:</h5>
				<hr />
				<Table
					data={bids}
					titles={['Price', 'USD Price', 'Floor Difference', 'From', 'Time']}
					exchangeRate={exchangeRate}
					lowestNftPrice={lowestNftPrice}
					status="offer"
					show={sellingMethod === 2}
				/>
			</div>
		</div>
	);
};
export default Offers;
