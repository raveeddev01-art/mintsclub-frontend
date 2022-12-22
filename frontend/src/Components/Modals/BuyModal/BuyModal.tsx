import React, { useState, FC } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalClose from '../../../assets/images/modal-close.svg';
import './BuyModal.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TickIcon from '../../../assets/images/tick-checkbox.svg';
import { ReactComponent as FbIcon } from '../../../assets/images/fb-blue.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/images/twitter-blue.svg';
import { ReactComponent as LinkedinIcon } from '../../../assets/images/linkedin-blue.svg';
import { ReactComponent as InstaIcon } from '../../../assets/images/insta-blue.svg';
import { ReactComponent as VideoIcon } from '../../../assets/images/buy-video-icon.svg';
import { ReactComponent as AudioIcon } from '../../../assets/images/audio-icon.svg';
import ModalSmiley from '../../../assets/images/model-smiley.svg';
import { Buy, CHAINS_INTERFACE } from '../../../interfaces/components';
import {
	CHAIN_CURRENCY,
	blockchainScanUrlData,
} from '../../../utils/helpers/helpers';
const BuyModal: FC<Buy> = (props) => {
	const [purchase, setPurchase] = useState<any>(true);
	const [checkBox, setCheckBox] = useState<any>(false);
	const {
		blockchainType,
		name,
		image,
		price,
		exchangeRate,
		tokenId,
		buyNow,
		confirmed,
		transactionHash,
		transactionSuccess,
		onHide,
		disabled,
		balance,
		fileType,
	} = props;
	return confirmed === '' || confirmed === false || confirmed === 'pending' ? (
		<Modal
			{...props}
			size="lg"
			dialogClassName="buy-modal-dialog"
			contentClassName="buy-modal-content"
			className="buy-modal"
			centered
		>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					Complete Checkout
				</Modal.Title>
				<p className="text-danger text-center mt-1 mb-0 insufienct-funds">
					{+price > +balance && 'Insufficient funds to buy this NFT'}
				</p>
				<div className="modal-close-container">
					<Button onClick={onHide}>
						<img src={ModalClose} alt="closemodal" />
					</Button>
				</div>
				<div className="buy-modal-subheadings-container d-flex justify-content-between align-items-center">
					<div className="buy-modal-subheadings">
						<p>Item</p>
					</div>
					<div className="buy-modal-subheadings">
						<p>Subtotal</p>
					</div>
				</div>
			</Modal.Header>
			<Modal.Body>
				<div className="row w-100 align-items-center justify-content-center g-4">
					<div className="col-md-3">
						<div className="modal-nft-container mx-auto mx-md-0">
							<div className="modal-nft-img">
								{fileType === 'image' ? (
									<img src={image} alt="nft-img" />
								) : fileType === 'video' ? (
									<div className="buy-media-wrapper">
										<VideoIcon />
									</div>
								) : fileType === 'audio' ? (
									<div className="buy-media-wrapper">
										<AudioIcon />
									</div>
								) : (
									''
								)}
							</div>
						</div>
					</div>
					<div className="col-md-9">
						<div className="modal-nft-content">
							<div className="row align-items-center justify-content-between">
								<div className="col-12 mb-3">
									<div className="modal-nft-detail-heading">
										<p>
											{name && name.length > 10
												? name.slice(0, 10) + '...'
												: name}
										</p>
									</div>
								</div>
								<div className="col-6">
									<div className="modal-nft-detail">
										<span>
											{name && name.length > 10
												? name.slice(0, 10) + '...'
												: name}{' '}
											# {tokenId}
										</span>
									</div>
								</div>
								<div className="col-6">
									<div className="modal-nft-detail text-end">
										<p>
											{price}{' '}
											<span>
												{
													CHAIN_CURRENCY[
														blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
													]
												}
											</span>
										</p>
									</div>
								</div>
								<div className="col-6">
									<div className="modal-nft-detail">
										<h6>
											Creator Fees: <span>1.5%</span>
										</h6>
									</div>
								</div>
								<div className="col-6">
									<div className="modal-nft-detail text-end">
										<p>${(price * exchangeRate).toFixed(2)}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row w-100 align-items-center total-row mt-3">
					<div className="col-4">
						<div className="modal-nft-detail">
							<p>Total</p>
						</div>
					</div>
					<div className="col-8">
						<div className="modal-nft-detail text-end">
							<h6>
								{price}{' '}
								<span>
									{
										CHAIN_CURRENCY[
											blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
										]
									}
								</span>
							</h6>
							<span>${(price * exchangeRate).toFixed(2)}</span>
						</div>
					</div>
				</div>
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
							<Link
								to="/termsandconditions"
								target="_blank"
								className="services-link"
							>
								Terms of Services
							</Link>
						</p>
					</div>
				</div>
				<button
					onClick={() => {
						buyNow();
					}}
					disabled={!checkBox || disabled || +price > +balance}
					className="btn btn-linear-gradient btn-bid-modal mt-2"
				>
					{confirmed === 'pending' ? (
						<div className="spinner-border approve-spinner" role="status"></div>
					) : (
						'Confirm Checkout'
					)}
				</button>
			</Modal.Footer>
		</Modal>
	) : (
		<Modal
			{...props}
			size="lg"
			dialogClassName="buy-modal-dialog"
			contentClassName="buy-modal-content"
			className="buy-modal purchase-modal"
			centered
		>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					{!transactionSuccess
						? 'Your Purchase is Processing'
						: 'Your Purchase has processed!'}
				</Modal.Title>
				<div className="modal-close-container">
					<Button onClick={props.onHide}>
						<img src={ModalClose} alt="closemodal" />
					</Button>
				</div>
				{transactionSuccess && (
					<div className="modal-nft-purchased  mt-3">
						<p>
							<span className="me-4">
								<img src={ModalSmiley} alt="smiley" />
							</span>
							{`  Woo! You just Purchased ${
								name && name.length > 10 ? name.slice(0, 10) + '...' : name
							}. It should be confirmed on the
              blockchain`}
						</p>
					</div>
				)}
				<div className="buy-modal-subheadings-container d-flex justify-content-between align-items-center">
					<div className="buy-modal-subheadings">
						<p>Item</p>
					</div>
					<div className="buy-modal-subheadings">
						<p>Subtotal</p>
					</div>
				</div>
			</Modal.Header>
			<Modal.Body>
				<div className="row w-100 align-items-center justify-content-center g-4">
					<div className="col-md-3">
						<div className="modal-nft-container mx-auto mx-md-0">
							<div className="modal-nft-img">
								{fileType === 'image' ? (
									<img src={image} alt="nft-img" />
								) : fileType === 'video' ? (
									<div className="buy-media-wrapper">
										<VideoIcon />
									</div>
								) : fileType === 'audio' ? (
									<div className="buy-media-wrapper">
										<AudioIcon />
									</div>
								) : (
									''
								)}
							</div>
						</div>
					</div>
					<div className="col-md-9">
						<div className="modal-nft-content">
							<div className="row align-items-center justify-content-between">
								<div className="col-12 mb-3">
									<div className="modal-nft-detail-heading">
										<p>
											{name && name.length > 10
												? name.slice(0, 10) + '...'
												: name}
										</p>
									</div>
								</div>
								<div className="col-6">
									<div className="modal-nft-detail">
										<span>
											{name && name.length > 10
												? name.slice(0, 10) + '...'
												: name}
											# {tokenId}
										</span>
									</div>
								</div>
								<div className="col-6">
									<div className="modal-nft-detail text-end">
										<p>
											{price}{' '}
											<span>
												{
													CHAIN_CURRENCY[
														blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
													]
												}
											</span>
										</p>
									</div>
								</div>
								<div className="col-6">
									<div className="modal-nft-detail">
										<h6>
											Creator Fees: <span>1.5%</span>
										</h6>
									</div>
								</div>
								<div className="col-6">
									<div className="modal-nft-detail text-end">
										<p>${(price * exchangeRate).toFixed(2)}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row w-100 align-items-center total-row mt-3">
					<div className="col-4">
						<div className="modal-nft-detail">
							<p>Total</p>
						</div>
					</div>
					<div className="col-8">
						<div className="modal-nft-detail text-end">
							<h6>
								{price}{' '}
								<span>
									{
										CHAIN_CURRENCY[
											blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
										]
									}
								</span>
							</h6>
							<span>${(price * exchangeRate).toFixed(2)}</span>
						</div>
					</div>
				</div>
				<div className="buy-modal-subheadings-container buy-modal-status w-100 d-flex justify-content-between align-items-center">
					<div className="buy-modal-subheadings">
						<p>Status</p>
					</div>
					<div className="buy-modal-subheadings">
						<p>Transaction Hash</p>
					</div>
				</div>
				<div className="modal-status-content d-flex align-items-center justify-content-between mt-2 pb-5">
					<div className="status-process d-flex align-items-center">
						{!transactionSuccess ? (
							<>
								<Spinner
									animation="border"
									role="status"
									size="sm"
									variant="primary"
									className="me-2"
								></Spinner>
								<p>Processing</p>
							</>
						) : (
							<>
								<CheckCircleIcon />
							</>
						)}
					</div>
					<div
						className="status-address"
						onClick={() => {
							window.open(
								blockchainScanUrlData(blockchainType, transactionHash),
								'_blank'
							);
						}}
					>
						<p>
							{transactionHash.slice(0, 6) +
								'.....' +
								transactionHash.slice(-6)}
						</p>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className="modal-nft-footer">
					<p>Share</p>
				</div>
				<div className="social-icons d-flex justify-content-center justify-content-lg-start">
					<FbIcon
						className="social-icon"
						onClick={() =>
							window.open('https://www.facebook.com/MintsClub.io/')
						}
					/>
					<TwitterIcon
						className="social-icon"
						onClick={() => window.open('https://twitter.com/MintsClub')}
					/>
					<LinkedinIcon
						className="social-icon"
						onClick={() =>
							window.open('https://www.linkedin.com/showcase/mints-club')
						}
					/>
					<InstaIcon
						className="social-icon"
						onClick={() => window.open('https://www.instagram.com/mintsclub/')}
					/>
				</div>
			</Modal.Footer>
		</Modal>
	);
};
export default BuyModal;
