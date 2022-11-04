import React from 'react';

const PriceFilter = ({ data }: any) => {
	const {
		minValue,
		maxValue,
		decimalNumberValidator,
		onChangeMinPrice,
		onChangeMaxPrice,
		applyMinMaxFilter,
		disabled,
		handleClearFilter,
	} = data;
	return (
		<div className="filter-container mb-4">
			<h6>Price</h6>
			<hr />
			<div className="min-max-inp d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-between mb-2">
				<div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
					<input
						type="number"
						placeholder="Min"
						className="me-sm-2"
						value={minValue}
						onKeyDown={(e) => decimalNumberValidator(e)}
						onChange={onChangeMinPrice}
					></input>
					<input
						type="number"
						placeholder="Max"
						className="mt-3 mt-sm-0 me-sm-2"
						value={maxValue}
						onKeyDown={(e) => decimalNumberValidator(e)}
						onChange={onChangeMaxPrice}
					></input>
				</div>
				<button
					className="mt-3 mt-sm-0"
					onClick={() => applyMinMaxFilter()}
					disabled={disabled || minValue === '' || maxValue === ''}
				>
					Apply
				</button>
			</div>
			<div className="d-flex align-items-end justify-content-end">
				{minValue && maxValue && (
					<button
						className="filter-clear-btn"
						onClick={() => handleClearFilter('price')}
					>
						Clear
					</button>
				)}
			</div>
		</div>
	);
};
export default PriceFilter;
