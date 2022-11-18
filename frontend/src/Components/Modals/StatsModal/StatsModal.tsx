import React, { FC } from 'react';
import { Modal } from 'react-bootstrap';
import ModalClose from '../../../assets/images/modal-close.svg';
import InputClose from '../../../assets/images/inp-close.svg';
import '../PropertiesModal/PropertiesModal.scss';
import '../BuyModal/BuyModal.scss';
import { toast } from 'react-toastify';
import {
	decimalNumberValidator,
	firstInputCharacterSpace,
} from '../../../utils/functions';
import { StatsInt } from '../../../interfaces/components';
const StatsModal: FC<any> = (props) => {
	const { stats, show, nftInfo, addMore, handlers } = props;
	const {
		handleModalsRemove,
		handleModalsOnHide,
		handleModalsOnChange,
		handleModalsAddMore,
		onSave,
	} = handlers;
	const handleChange = (i: any, e: any, status: string) => {
		const newFormValues = [...stats];
		newFormValues[i][e.target.name] =
			e.target.name === 'value' && e.target.value !== ''
				? +e.target.value
				: e.target.value;
		handleModalsOnChange('stats', newFormValues);
	};
	const handleRemove = (i: number, status: string) => {
		const newFormValues = [...stats];
		newFormValues.splice(i, 1);
		const newNFTValues = [...nftInfo.stats];
		newNFTValues.splice(i, 1);
		const nft = { ...nftInfo, stats: newNFTValues };
		handleModalsRemove('stats', newFormValues, nft);
	};
	const handleAddMore = () => {
		const addState = [...stats, { name: '', value: '', total: 5 }];
		handleModalsAddMore('stats', addState);
	};
	const handleSubmit = () => {
		if (stats && stats.length > 0) {
			const isEmpty = stats.filter(
				(item: any) => item.name === '' || item.value === ''
			);
			if (isEmpty.length > 0) {
				toast.error('Please Fill Empty Fields ');
				return '';
			} else {
				onSave('stats');
			}
		}
	};
	return (
		<Modal
			{...props}
			show={show}
			onHide={() => handleModalsOnHide('statsmodalShow')}
			size="lg"
			dialogClassName="buy-modal-dialog"
			contentClassName="buy-modal-content"
			className="buy-modal properties-modal"
			centered
		>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">Add Stats</Modal.Title>

				<div className="modal-close-container">
					<button onClick={() => handleModalsOnHide('statsmodalShow')}>
						<img src={ModalClose} alt="closemodal" />
					</button>
				</div>
			</Modal.Header>
			<Modal.Body className="mt-0 pt-0 px-0 px-sm-3">
				<form>
					<div className="nft-modalfields-container pe-2 pe-sm-0 px-sm-2 py-sm-2">
						{stats &&
							stats.length > 0 &&
							stats.map((item: any, i: any) => {
								return (
									<div
										className="row g-2 align-items-center justify-content-between mt-3"
										key={i}
									>
										<div className="col-sm-5 order-1 order-sm-0 mt-0">
											<div className="bid-inp-container d-flex align-items-center mt-0">
												<div className="ps-2">
													<h6>Name:</h6>
												</div>
												<div className="inp-container">
													<input
														type="text"
														name="name"
														maxLength={10}
														value={item.name}
														onKeyDown={(e) =>
															firstInputCharacterSpace(e, item.name.length)
														}
														onChange={(e) => handleChange(i, e, 'stats')}
														autoComplete="off"
													/>
												</div>
											</div>
										</div>
										<div className="col-sm-5 order-2 order-sm-1 mt-3 mt-sm-0">
											<div className="d-flex align-items-center justify-content-between">
												<div className="bid-inp-container modal-value-inp d-flex align-items-center">
													<div className="ps-2">
														<h6>Value:</h6>
													</div>
													<div className="inp-container">
														<input
															type="number"
															name="value"
															min="1"
															onKeyDown={(e) => {
																decimalNumberValidator(e);
															}}
															value={item.value}
															onChange={(e) => {
																if (
																	+e.target.value > 5 ||
																	(+e.target.value <= 0 && item.value === '') ||
																	e.target.value.includes('.')
																) {
																	return '';
																}
																handleChange(i, e, 'stats');
															}}
															autoComplete="off"
														/>
													</div>
												</div>
												<div className="value-inp-of mx-3">
													<h6>of</h6>
												</div>
												<div className="bid-inp-container modal-value-inp">
													<div className="inp-container ">
														<input
															type="number"
															name="value"
															value={5}
															autoComplete="off"
															className="text-center"
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-1 order-0 order-sm-2 mb-2 mb-sm-0">
											<div className="inp-close text-end me-2">
												<span>
													<img
														src={InputClose}
														alt="closemodal"
														onClick={() => handleRemove(i, 'stats')}
													/>
												</span>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<div className="modal-nft-footer d-flex align-items-center">
					<span
						className="btn modal-btn-addMore mt-2"
						onClick={(e) => {
							e.preventDefault();
							handleAddMore();
						}}
					>
						Add more
					</span>
					<button
						className="btn btn-linear-gradient modal-btn-save mt-2 ms-3"
						type="submit"
						disabled={stats && stats.length === 0}
						onClick={handleSubmit}
					>
						Save
					</button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default StatsModal;
