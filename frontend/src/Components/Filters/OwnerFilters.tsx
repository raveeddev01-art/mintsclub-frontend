import React from 'react';

const OwnerFilters = ({ data }: any) => {
	const {
		menuData,
		setIsActive,
		isActive,
		handleNftFilter,
		setMenuFilter,
		nftPagination,
	} = data;
	return (
		<div className="col-12 my-5 order-2 order-lg-1 ">
			<div className="hero-nav d-flex flex-column flex-sm-row align-items-center justify-content-between">
				<div>
					{' '}
					{menuData &&
						menuData.length > 0 &&
						menuData.map((item: any, id: any) => {
							return (
								<button
									key={id}
									onClick={() => {
										setIsActive(id);
										handleNftFilter?.(item);
										setMenuFilter?.(item);
									}}
									className={`${
										id === isActive ? 'active-hero-nav' : ''
									} me-2 me-xl-3`}
								>
									{item}
								</button>
							);
						})}
				</div>
				<div className="total-items mt-3 mt-sm-0">
					<p>
						Total items:{' '}
						<span>{nftPagination?.total ? nftPagination?.total : 0}</span>
					</p>
				</div>
			</div>
		</div>
	);
};
export default OwnerFilters;
