import React from 'react';

const CollectionFilter = ({ data }: any) => {
	const {
		isHideCollection,
		collections,
		handleCollectionsFilter,
		setCollectionActive,
		collectionActive,
		handleClearFilter,
	} = data;
	return (
		isHideCollection() && (
			<div className="filter-container hoc-collections-container mb-4">
				<h6>Collections</h6>
				<hr />
				<div className="d-flex flex-wrap align-items-center ">
					{collections && collections.length > 0 ? (
						collections.map((collection: any, id: any) => {
							return (
								<button
									key={id}
									onClick={() => {
										handleCollectionsFilter(collection._id);
										setCollectionActive(id);
									}}
									className={`${
										id === collectionActive ? 'active-filter-btn' : ''
									} filter-btn me-2 me-xl-3`}
								>
									{collection.name}
								</button>
							);
						})
					) : (
						<p className="text-center mx-auto not-found">
							No collections found
						</p>
					)}
				</div>
				<div className="d-flex align-items-end justify-content-end">
					{collectionActive !== null && (
						<button
							className="filter-clear-btn"
							onClick={() => {
								setCollectionActive(null);
								handleClearFilter('collections');
							}}
						>
							Clear
						</button>
					)}
				</div>
			</div>
		)
	);
};
export default CollectionFilter;
