import React, { useContext } from 'react';
import errorHandler from '../../../context/errorHandler/ErrorHandlerContext';
import Table from '../../../Components/Table/Table';
import { useGetData } from '../../../hooks/Common';
import { ENV } from '../../../config/config';

const Activities = ({ nftId }: any) => {
	const [activities, setActivities] = React.useState(null);
	const { setError } = useContext(errorHandler);
	//get activities
	const onSuccessGetActivities = (data: any) => {
		if (data.data.success) {
			setActivities(data.data.data);
		} else {
			setError(data.data.message);
		}
	};

	const { isLoading } = useGetData(
		'GetActivities',
		'activity/get',
		ENV.objectToQueryString({ nftId }),
		onSuccessGetActivities,
		null,
		nftId ? true : false
	);
	return (
		<div className="col-12">
			<div className="detail-bg-box">
				<h5>Activity:</h5>
				<hr />
				{activities && (
					<Table
						data={activities}
						titles={['Event', 'Price', 'From', 'To', 'Date']}
						status="Activities"
						lowestNftPrice={0}
						exchangeRate={0}
					/>
				)}
			</div>
		</div>
	);
};
export default Activities;
