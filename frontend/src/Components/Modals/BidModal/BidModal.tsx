import React, { useState, useEffect, FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalClose from '../../../assets/images/modal-close.svg';
import '../BuyModal/BuyModal.scss';
import TickIcon from '../../assets/images/tick-checkbox.svg';
import axios from 'axios';
import { BidModalInt, CHAINS_INTERFACE } from '../../../interfaces/components';
import { ENV } from '../../../config/config';
import { CHAIN_CURRENCY } from '../../../utils/helpers/helpers';

const BidModal: FC<BidModalInt> = (props) => {
	const [checkBox, setCheckBox] = useState<any>(false);
	const [blockchainType, setBlockchainType] = useState<any>('');
	const [exchangeRate, setExchangeRate] = useState<any>(0);

	useEffect(() => {
		if (ENV.getUserKeys('blockchainType').blockchainType === 'ethereum') {
			setBlockchainType(ENV.getUserKeys('blockchainType').blockchainType);
		} else {
			setBlockchainType(ENV.getUserKeys('blockchainType').blockchainType);
		}
		axios
			.get(
				'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ETH'
			)
			.then((res) => {
				const currentUSD = res.data.USD;
				setExchangeRate(currentUSD);
			});
	}, []);
	const {
		onChange,
		decimalNumberValidator,
		handleModalSubmit,
		calculatePricePercantage,
		onHide,
		balance,
		price,
		show,
	} = props;

	return (
		<Modal
			{...props}
			size="lg"
			dialogClassName="buy-modal-dialog"
			contentClassName="buy-modal-content"
			className={`buy-modal bid-modal ${show === true ? 'modal-is-open' : ' '}`}
			centered
			autoFocus={true}
		>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					Place a Bid
				</Modal.Title>

				<p className="text-danger text-center mt-1 mb-0 insufienct-funds">
					{+price > +balance && 'Insufficient funds to place bid!'}
				</p>

				<div className="modal-close-container">
					<Button onClick={props.onHide}>
						<img src={ModalClose} alt="closemodal" />
					</Button>
				</div>
				<div className="buy-modal-subheadings-container d-flex align-items-center">
					<div className="buy-modal-subheadings">
						<p>Price</p>
					</div>
				</div>
			</Modal.Header>
			<Modal.Body>
				<div className="bid-inp-container d-flex align-items-center">
					<div className="inp-container d-flex align-items-center justify-content-between">
						<div>
							<input
								type="number"
								placeholder="Place Your Bid"
								name="nftConfig.price.amount"
								style={{ borderRadius: '4px' }}
								onChange={(e) => onChange(e)}
								onKeyDown={(e) => decimalNumberValidator(e)}
								defaultValue={calculatePricePercantage()}
								value={price}
							/>
						</div>
						<div className="dollar-rate text-end">
							<p className="">
								${price ? (price * exchangeRate).toFixed(2) : 0}
							</p>
						</div>
					</div>
					<div className="inp-currency">
						<h6>
							{
								CHAIN_CURRENCY[
									blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
								]
							}
						</h6>
					</div>
				</div>
				<div className="bid-balance text-start">
					<p>
						Balance: {Number(balance).toFixed(4)}{' '}
						{
							CHAIN_CURRENCY[
								blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
							]
						}
					</p>
				</div>
				{balance !== '' && balance === 0 && (
					<p className="text-center insufcient-funds text-danger">
						Please Add Balance to place bid
					</p>
				)}
			</Modal.Body>
			<Modal.Footer>
				<div className="modal-nft-footer">
					<div className="checkbox-container d-flex align-items-center mt-5">
						{checkBox ? (
							<span
								className="custom-checked-box me-2"
								onClick={() => setCheckBox(!checkBox)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="13" height="10">
									<path
										fillRule="evenodd"
										fill="#FFF"
										d="M11.356.624c.034.009-.617.141-.838.368-1.93 1.93-3.692 3.823-5.546 5.712L2.794 4.961h-.001a1.223 1.223 0 0 0-.897-.26c-.321.036-.616.198-.116.45-.904.252-.997.574-.962 1.309.036-.093.342.201.451.403l3.049 2.434a1.218 1.218 0 0 0 1.626-.095C8.138 7.8 10.103 4.854 12.246 2.71A1.22 1.22 0 0 0 12.24.967c.16-.229-.555-.352-.884-.343z"
									/>
								</svg>
							</span>
						) : (
							<span
								className="custom-uncheck-box me-2"
								onClick={() => setCheckBox(!checkBox)}
							></span>
						)}
						<p>
							By checking this box, I agree to MintsClub{' '}
							<Link to="/termsandconditions" target="_blank">
								Terms of Services
							</Link>
						</p>
					</div>
				</div>
				<button
					className="btn btn-linear-gradient btn-bid-modal mt-2"
					onClick={() => {
						handleModalSubmit();
						onHide();
					}}
					disabled={
						+price < calculatePricePercantage() ||
						balance === 0 ||
						!checkBox ||
						+price > +balance
					}
				>
					Confirm Checkout
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default BidModal;
