import React, { useContext } from 'react';
import Table from '../../../Components/Table/Table';
import errorHandler from '../../../context/errorHandler/ErrorHandlerContext';
import { useGetData } from '../../../hooks/Common';
import { ENV } from '../../../config/config';

const Offers = ({ data }: any) => {
	const [bids, setBids] = React.useState(null);
	const { exchangeRate, lowestNftPrice, sellingMethod, nftId, beforeGetBids } =
		data;
	const { setError } = useContext(errorHandler);

	const onSuccessGetBids = (data: any) => {
		if (data.data.success) {
			setBids(data.data.data.Bids);
		} else {
			setError(data.data.message);
		}
	};

	const { isLoading: isLoadingBids } = useGetData(
		'GetBids',
		'bid/list',
		ENV.objectToQueryString({ nftId }),
		onSuccessGetBids,
		null,
		nftId ? true : false
	);
	return (
		<div className="col-12">
			<div className="detail-bg-box">
				<h5>Offers:</h5>
				<hr />
				<Table
					data={bids}
					titles={['Price', 'USD Price', 'Floor Difference', 'From', '']}
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
