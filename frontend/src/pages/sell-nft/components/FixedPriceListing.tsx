import React from 'react';
import { CHAINS_INTERFACE } from '../../../interfaces/components';
import { CHAIN_CURRENCY } from '../../../utils/helpers/helpers';

const FixedPriceListing = ({ data }: any) => {
	const {
		submit,
		onChange,
		decimalNumberValidator,
		fixedPriceConfig,
		copiesError,
		nftDetail,
		remainingCopies,
		setCopiesError,
		copies,
		setCopies,
	} = data;
	return (
		<form onSubmit={submit}>
			<div className="row g-4 g-xl-5">
				<div className="col-md-6">
					<div className="sell-detail-box">
						<h5>Price:*</h5>
						<hr />
						<div className="sell-inp-container d-flex align-items-center">
							<input
								type="text"
								name="fixedPriceConfig.price.amount"
								placeholder="Amount"
								style={{
									borderRadius: '4px',
								}}
								maxLength={8}
								onChange={(e) => {
									if (e.target.value === '00') {
										return '';
									}
									onChange(e);
								}}
								onKeyDown={(e) => decimalNumberValidator(e)}
								value={fixedPriceConfig.price.amount}
								required
								autoComplete="off"
							/>
							<div className="inp-tag">
								{
									CHAIN_CURRENCY[
										nftDetail?.blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
									]
								}
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="sell-detail-box">
						<h5>
							No of Copies:*{' '}
							{copiesError && (
								<span className="text-danger ms-2 error-msg">{`This NFT has only ${remainingCopies} copies`}</span>
							)}
						</h5>
						<hr />
						<div className="sell-inp-container d-flex align-items-center">
							<input
								type="number"
								name="copies"
								placeholder="Copies"
								style={{
									borderRadius: '4px',
								}}
								min={'1'}
								onChange={(e: any) => {
									if (+e.target.value > remainingCopies) {
										setCopiesError(true);
										return false;
									}
									if (
										(e.target.value === 0 && copies === '') ||
										e.target.value.includes('.')
									) {
										return false;
									}
									setCopiesError(false);
									setCopies(e.target.value);
								}}
								onKeyDown={(e) => decimalNumberValidator(e)}
								value={copies}
								required
								autoComplete="off"
							/>
							<div className="inp-tag">Copies</div>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="sell-detail-box">
						<h5>Fees:</h5>
						<hr />
						<div className="fee-details d-flex align-items-center justify-content-between">
							<div>
								<p>
									Service Fee:
									<span className="ms-2">2.5%</span>
								</p>
							</div>
							<div>
								<p>
									Creator Royalty:
									<span className="ms-2">2.5%</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="sell-btn-container d-flex justify-content-center justify-content-lg-start">
					<button
						className="btn btn-linear-gradient sell-btn-completed"
						type="submit"
					>
						Complete Listing
					</button>
				</div>
			</div>
		</form>
	);
};
export default FixedPriceListing;
