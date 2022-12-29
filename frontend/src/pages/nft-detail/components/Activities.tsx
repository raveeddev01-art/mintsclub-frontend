import React from 'react';
import Table from '../../../Components/Table/Table';
const Activities = ({ activities }: any) => {
	return (
		<div className="col-12">
			<div className="detail-bg-box">
				<h5>Activity:</h5>
				<hr />
				{activities && activities.length > 0 && (
					<Table
						data={activities}
						titles={['Event', 'Price', 'From', 'To', 'Time']}
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
