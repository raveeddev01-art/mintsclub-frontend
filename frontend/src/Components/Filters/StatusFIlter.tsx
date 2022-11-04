import React from 'react';

const StatusFilter = ({ data }: any) => {
	const {
		statusData,
		statusActive,
		setStatusActive,
		handleStatusFilter,
		handleClearFilter,
	} = data;
	return (
		<div className="filter-container mb-4">
			<h6>Status</h6>
			<hr />
			<div className="d-flex flex-wrap align-items-center ">
				{statusData &&
					statusData.map((status: any, id: any) => {
						return (
							<button
								key={id}
								onClick={() => {
									handleStatusFilter(status);
									setStatusActive(status);
								}}
								className={`${
									status === statusActive ? 'active-filter-btn' : ''
								} filter-btn me-3`}
							>
								{status}
							</button>
						);
					})}
			</div>
			<div className="d-flex align-items-end justify-content-end">
				{statusActive && (
					<button
						className="filter-clear-btn"
						onClick={() => {
							setStatusActive(null);
							handleClearFilter('status');
						}}
					>
						Clear
					</button>
				)}
			</div>
		</div>
	);
};

export default StatusFilter;
