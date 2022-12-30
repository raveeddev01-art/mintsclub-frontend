import Select from 'react-select';
import React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/images/searchicon.svg';
const SortFilter = ({ data }: any) => {
	const {
		keyword,
		handleSearchKeyword,
		setKeyword,
		handleSelectChange,
		handleSortOptions,
		priceOptions,
		selectedOption,
		selectCustomStyles,
		filterActive,
		handleFilters,
	} = data;	
	return (
		<div className="col-12 order-0">
			<div
				className={`d-flex flex-column flex-md-row align-items-center justify-content-md-between`}
			>
				<div className="search-input mb-4 mb-md-0">
					<input
						type="text"
						placeholder="Search items and accounts"
						maxLength={50}
						onChange={(e: any) => {
							if (keyword.trim() === '' && e.target.value.trim() === '') {
								return false;
							} else if (e.target.value === '') {
								handleSearchKeyword(false);
								setKeyword(e.target.value);
							} else {
								setKeyword(e.target.value);
							}
						}}
						onKeyPress={(e: any) =>
							e.key === 'Enter' && handleSearchKeyword(keyword)
						}
						value={keyword}
					/>
					<SearchIcon />
				</div>
				<div className="sort-by-select mb-4 mb-md-0">
					<p className="me-3">Sort by:</p>
					<Select
						className="react-select-cls"
						classNamePrefix="react-select"
						styles={selectCustomStyles}
						// defaultValue={priceOptions[3]}
						value={selectedOption}
						isSearchable={false}
						onChange={(value: any) => {
							handleSelectChange(value);
							handleSortOptions(value);
						}}
						options={priceOptions}
					/>
				</div>
				<div className="mob-filters-btn d-flex d-lg-none align-items-center justify-content-center">
					<button
						className={`${filterActive ? 'mob-active-filter' : ''}`}
						onClick={handleFilters}
					>
						Filters
					</button>
				</div>
			</div>
		</div>
	);
};
export default SortFilter;
