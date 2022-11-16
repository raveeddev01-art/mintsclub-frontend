/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import { connect } from 'react-redux';
import {
	decimalNumberValidator,
	firstInputCharacterSpace,
	formatBytes,
	handleRequest,
} from '../../utils/functions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ENV } from '../../config/config';
import $ from 'jquery';
import SimpleReactValidator from 'simple-react-validator';
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader';
import './createNft.scss';
import AddIcon from '../../assets/images/add-icon.svg';
import Banner from '../../Components/Banner/Banner';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg2.png';
import Select from 'react-select';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import UploadIcon from '../../assets/images/upload-icon.png';
import UploadWhiteIcon from '../../assets/images/uploadWhiteIcon.png';
import { createNFTbanner } from '../../utils/exportData';
import CreateNft from './components/createNft';
import UploadFile from './components/UploadFile/UploadFile';
import AddLevels from './components/AddLevels/AddLevels';
import AddProperties from './components/AddProperties/AddProperties';
import AddStats from './components/AddStats/AddStats';
import FreeMintSwitch from './components/FreeMintSwitch/FreeMintSwitch';
import { handleFilesValidation, capitalize } from '../../utils/helpers/helpers';
import Modals from './components/Modals/Modals';
const placeholderImg = '';

class CreateNFT extends React.Component<
	{
		history: any;
		match: any;
		connectedAddress: string;
		blockchainType: string;
	},
	{
		isSubmitted: boolean;
		formValid: boolean;
		loader: boolean;
		errors: any;
		nft: any;
		properties: any;
		levels: any;
		stats: any;
		imageURL: string;
		videoURL: string;
		collections: any;
		allcollections: any;
		error: boolean;
		errorMessage: string;
		audioUrl: string;
		propertiesmodalShow: boolean;
		levelsmodalShow: boolean;
		statsmodalShow: boolean;
		selectedCollection: any;
		isFreeMint: any;
		playerState: any;
		nftInfo: any;
	}
> {
	validator: SimpleReactValidator;
	myRef: any;
	wallet: any;
	constructor(props: any) {
		super(props);
		this.myRef = React.createRef();
		this.state = {
			isSubmitted: false,
			formValid: true,
			loader: true,
			errors: '',
			nft: {
				userId: ENV.getUserKeys('_id')._id,
				ownerId: ENV.getUserKeys('_id')._id,
				creatorId: ENV.getUserKeys('_id')._id,
				properties: [],
				levels: [],
				stats: [],
				image: '',
				name: '',
				description: '',
				copies: '',
				collectionId: '',
				ownerAddress: '',
				categoryId: '',
				contractAddress: null,
				isApproved: true,
			},
			properties: [{ name: '', type: '' }],
			levels: [{ name: '', value: '', total: 5 }],
			stats: [{ name: '', value: '', total: 5 }],
			imageURL: '',
			videoURL: '',
			collections: [],
			allcollections: null,
			error: false,
			errorMessage: '',
			audioUrl: '',
			propertiesmodalShow: false,
			levelsmodalShow: false,
			statsmodalShow: false,
			selectedCollection: null,
			isFreeMint: false,
			playerState: {
				isPlaying: false,
				progress: 0,
				speed: 1,
				isMuted: false,
			},
			nftInfo: null,
		};
		// const videoElement = this.myRef;

		this.validator = new SimpleReactValidator({
			autoForceUpdate: this,
			messages: {
				required: 'This field is required.', // will override all messages
			},
		});
	}

	componentDidMount = async () => {
		window.scroll(0, 0);
		this.getMyCollections();
		if (!ENV.getUserKeys('_id')._id) {
			this.props.history.push({
				pathname: `/connect-wallet`,
				state: `/create`,
			});
		}

		let { nft } = this.state;
		nft = { ...nft, ownerAddress: this.props.connectedAddress };
		this.setState({
			nft,
		});
	};

	componentDidUpdate = async (prevProps: any, prevState: any) => {
		if (this.state.playerState.isPlaying !== prevState.playerState.isPlaying) {
			this.state.playerState.isPlaying
				? this.myRef?.current?.play()
				: this.myRef?.current?.pause();
		}
	};

	getMyCollections = async () => {
		const res = await handleRequest(
			'get',
			`collection/myCollectionList?userId=${ENV.getUserKeys('_id')._id}`
		);
		const { Collections: collections }: any = res?.data?.data?.collections;
		const updatedCollections = [];
		if (collections?.length > 0) {
			for (const item of collections) {
				const obj = {
					value: item._id,
					label: item.name,
					categoryId: item.categoryId,
					isApproved: item?.isApproved,
					contractAddress: item?.contractAddress,
				};
				updatedCollections.push(obj);
				this.setDefaultCollection(updatedCollections[0]);
			}
		}
		if (this.props?.match.params.nftId) {
			await this.getNFTInfo(updatedCollections);
		}
		this.setState({
			collections: updatedCollections,
			loader: false,
		});
	};
	setDefaultCollection = (data: any) => {
		let { nft } = this.state;
		if (data) {
			nft = {
				...nft,
				collectionId: data?.value,
				categoryId: data?.categoryId,
				contractAddress: data?.contractAddress ? data?.contractAddress : null,
				isApproved: data?.isApproved ? data?.isApproved : false,
			};
			this.setState({
				nft,
				selectedCollection: data,
			});
		}
	};
	getNFTInfo = async (collections: any) => {
		try {
			const res = await handleRequest(
				'get',
				`nfts/get/${this.props?.match.params.nftId}`
			);
			if (res.data.success) {
				const {
					image,
					description,
					name,
					fileType,
					lazyMinted,
					levels,
					properties,
					stats,
					collectionId,
					collection,
					copies,
				} = res?.data.data;

				const selectedCollection = collections.find(
					(item: any) => item.value === collectionId
				);
				let { nft }: any = this.state;
				nft = {
					...nft,
					name,
					description,
					properties,
					levels,
					stats,
					copies,
					categoryId: collection.categoryId,
					image,
					collectionId: collectionId,
				};
				if (fileType === 'image') {
					this.setState({
						isFreeMint: lazyMinted,
						imageURL: image,
						selectedCollection,
						nftInfo: res?.data.data,
					});
				} else if (fileType === 'video') {
					this.setState({
						isFreeMint: lazyMinted,
						videoURL: image,
						nftInfo: res?.data.data,
					});
				} else if (fileType === 'audio') {
					this.setState({ audioUrl: image, nftInfo: res?.data.data });
				} else {
					// empty
				}
				this.setState({ nft });
			} else {
				toast.error(res.data.message);
			}
		} catch (err: any) {
			toast.error(err.message);
		}
	};

	insertNFT = async (data: any) => {
		try {
			const res: any = await handleRequest('post', 'nfts/storeNFTData', data);
			const { success } = res.data;
			if (success) {
				toast.success('NFT created successfully');
				this.props.history.push('/explore/allNFT');
			} else {
				this.setState({ loader: false });
				toast.error(res.data.message);
			}
		} catch (err: any) {
			this.setState({ loader: false });

			toast.error(err.message);
		}
	};

	togglePlay = () => {
		let test = { ...this.state.playerState };
		test = { ...test, isPlaying: !test.isPlaying };
		this.setState({ playerState: test });
	};

	onChange(e: any, status = null) {
		const { name } = e.target;
		let { value } = e.target;
		if (status) value = status;
		let { nft } = this.state;
		nft = { ...nft, [name]: value };
		this.setState({ nft });
	}
	onChangeSelect = (value: any) => {
		let { nft } = this.state;
		nft = {
			...nft,
			collectionId: value.value,
			categoryId: value.categoryId,
			contractAddress: value?.contractAddress ? value?.contractAddress : null,
			isApproved: value?.isApproved ? value?.isApproved : false,
		};
		this.setState({
			nft,
			selectedCollection: value,
		});
	};

	onFileChange = async (e: any, status: any) => {
		if (handleFilesValidation(e, status) === 'file matched') {
			let file: any = '';
			let url: any = '';
			let fileId: any = '';
			if (status === 'onDrag') {
				file = e.dataTransfer.files[0];
				url = URL.createObjectURL(e.dataTransfer.files[0]);
				fileId = e.dataTransfer.id;
			} else {
				file = e.target.files[0];
				url = URL.createObjectURL(e.target.files[0]);
				fileId = e.target.id;
			}
			if (file)
				if (file.type.includes('image')) {
					let { nft } = this.state;
					nft = { ...nft, [e.target.name]: file };

					this.setState(
						{
							nft,
							imageURL: url,
							videoURL: '',
							error: false,
							errorMessage: '',
						},
						() => {
							if (file) {
								const reader = new FileReader();

								reader.onload = function (e: any) {
									$(`#nft-${fileId}`).attr('src', e.target.result);
									$('#nft-image-label').html('File selected');
								};
								reader.readAsDataURL(file);
							}
						}
					);
				} else if (file.type.includes('video')) {
					let { nft } = this.state;
					nft = { ...nft, image: file };

					this.setState({
						nft,
						videoURL: url,
						// image:file,
						imageURL: '',
						error: false,
						errorMessage: '',
					});
				} else if (file.type.includes('audio')) {
					let { nft } = this.state;
					nft = { ...nft, image: file };

					this.setState({
						nft,
						videoURL: '',
						imageURL: '',
						// image:file,
						error: false,
						errorMessage: '',
						audioUrl: url,
					});
				} else {
					$(`#nft-${fileId}`).attr('src', placeholderImg);
					file = {};
				}
		} else {
			const message: any = handleFilesValidation(e, status);
			toast.error(message);
			this.setState({
				error: true,
				errorMessage: message,
			});
		}
	};
	dragOver = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};

	dragEnter = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};

	dragLeave = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};
	onDrop = (e: { nativeEvent: { preventDefault: () => void } }) => {
		e.nativeEvent.preventDefault();
		if (!e) return;
		this.onFileChange(e, 'onDrag');
	};

	////property modal handlers

	onSave = (status: string) => {
		let { nft } = this.state;
		if (status === 'properties') {
			nft = { ...nft, properties: this.state.properties };
			this.setState({
				nft,
				propertiesmodalShow: false,
			});
		} else if (status === 'stats') {
			nft = { ...nft, stats: this.state.stats };
			this.setState({
				nft,
				statsmodalShow: false,
			});
		} else {
			nft = { ...nft, levels: this.state.levels };
			this.setState({
				nft,
				levelsmodalShow: false,
			});
		}
	};
	handleModalsRemove = (name: string, data: any, nft: any) => {
		// let	nft = { ...nft, [name]: data };
		this.setState({
			...this.state,
			[name]: data,
			nft,
		});
	};
	handleModalsOnHide = (name: string) => {
		this.setState({
			...this.state,
			[name]: false,
		});
	};
	handleModalsOnChange = (name: string, data: any) => {
		this.setState({
			...this.state,
			[name]: data,
		});
	};
	handleModalsAddMore = (name: string, data: any) => {
		this.setState({
			...this.state,
			[name]: data,
		});
	};

	handleBtnDisable = () => {
		const { image, description, copies, categoryId } = this.state.nft;
		if (!image || !description || !copies || !categoryId) {
			return true;
		} else {
			return false;
		}
	};
	render() {
		const {
			nft,
			loader,
			collections,
			imageURL,
			videoURL,
			error,
			errorMessage,
			audioUrl,
			selectedCollection,
		} = this.state;

		const { connectedAddress, blockchainType } = this.props;
		const { onDrop, dragOver, dragEnter, dragLeave } = this;
		return (
			<>
				<section className="create-collection create-nft">
					<Banner
						subHeading={createNFTbanner.subHeading}
						heading={createNFTbanner.heading}
						content={createNFTbanner.content}
						bgImg={BannerBg}
						bannerImg={BannerImage}
						bg={true}
					/>
					<div className="container">
						{loader && <FullPageLoader />}

						<div className="row">
							<UploadFile
								data={{
									onDrop,
									dragOver,
									dragEnter,
									dragLeave,
									imageURL,
									onFileChange: this.onFileChange,
									UploadWhiteIcon,
									validator: this.validator,
									videoURL,
									myRef: this.myRef,
									nft,
									playerState: this.state.playerState,
									togglePlay: this.togglePlay,
									audioUrl,
									UploadIcon,
								}}
							/>
							<div
								className={`col-md-6 col-sm-12 ${
									blockchainType === 'solana' ? 'col-lg-6' : 'col-lg-4'
								}`}
							>
								<label className="create-collection-label d-flex">
									Title:*{' '}
									<span className="text-danger ms-2">
										{this.validator.message('name', nft.name, 'required')}
									</span>
								</label>
								<input
									className="create-collection-input mt-2"
									name="name"
									placeholder="Enter title"
									required={true}
									maxLength={25}
									minLength={3}
									onKeyDown={(e) =>
										firstInputCharacterSpace(e, nft.name.length)
									}
									onChange={(e) => {
										if (
											nft?.name.trim() === '' &&
											e.target.value.includes('.')
										) {
											return false;
										}
										this.onChange(e);
									}}
									value={nft.name}
									autoComplete="off"
								/>
							</div>

							{blockchainType !== 'solana' && (
								<div className="col-lg-4 col-md-6 mt-3 mt-md-0">
									<label className="create-collection-label d-flex">
										No of Copies:* (Max 1M)
										<span className="text-danger ms-2">
											{this.validator.message('name', nft.copies, 'required')}
										</span>
									</label>
									<input
										className="create-collection-input mt-2"
										name="copies"
										placeholder="No. of Copies"
										type="text"
										autoComplete="off"
										required={true}
										onKeyDown={(e) => decimalNumberValidator(e)}
										onChange={(e) => {
											if (
												(e.target.value.length && e.target.value === '0') ||
												e.target.value.includes('.') ||
												+e.target.value > 1000000
											) {
												return false;
											} else {
												this.onChange(e);
											}
										}}
										value={nft.copies}
									/>
								</div>
							)}

							<div
								className={`col-md-6 mt-3 mt-lg-0 ${
									blockchainType === 'solana' ? 'col-lg-6' : 'col-lg-4'
								}`}
							>
								<label className="create-collection-label d-flex">
									Select Collection:
									{/* {this.state.selectedCollection === null && ( */}
									{/* <span className="text-danger ms-2">
										{this.validator.message(
											'collectionId',
											selectedCollection,
											'required'
										)}
									</span> */}
									{/* // )} */}
								</label>

								<Select
									className="react-select-cls"
									classNamePrefix="react-select"
									placeholder="Select Collection"
									isSearchable={false}
									value={selectedCollection}
									name="collectionId"
									onChange={this.onChangeSelect}
									options={collections}
								/>
							</div>
							<div className="col-12 mt-3 mt-lg-5">
								<label className="create-collection-label d-flex">
									Description:*{' '}
									<span className="text-danger ms-2">
										{this.validator.message(
											'description',
											nft.description,
											'required'
										)}
									</span>
								</label>

								<textarea
									className="create-collection-area mt-2"
									name="description"
									rows={13}
									placeholder="Max 500 characters"
									maxLength={500}
									onKeyDown={(e) =>
										firstInputCharacterSpace(e, nft?.description.length)
									}
									onChange={(e: any) => {
										if (
											nft?.description.trim() === '' &&
											e.target.value.includes('.')
										) {
											return false;
										}
										this.onChange(e);
									}}
									value={nft.description}
								></textarea>
							</div>

							<AddProperties
								data={{
									showModal: () => this.setState({ propertiesmodalShow: true }),
									AddIcon,
									nft: this.state.nft,
								}}
							/>
							<AddLevels
								data={{
									showModal: () => this.setState({ levelsmodalShow: true }),
									AddIcon,
									nft: this.state.nft,
								}}
							/>
							<AddStats
								data={{
									showModal: () => this.setState({ statsmodalShow: true }),
									AddIcon,
									nft: this.state.nft,
								}}
							/>
							<FreeMintSwitch
								nftId={this.props.match.params.nftId}
								blockchainType={blockchainType}
								isFreeMint={this.state.isFreeMint}
								onSwitch={() => {
									this.setState({
										isFreeMint: !this.state.isFreeMint,
									});
								}}
							/>
							<CreateNft
								props={this.props}
								state={this.state}
								setLoader={(status: any) => this.setState({ loader: status })}
								toast={toast}
								validator={this.validator}
								capitalize={capitalize}
								handleBtnDisable={this.handleBtnDisable}
								blockChainType={blockchainType}
								connectedAddress={connectedAddress}
								setError={() => {
									this.setState({
										formValid: false,
									});
									this.validator.showMessages();
								}}
							/>
						</div>
						{/* </form> */}
					</div>
				</section>
				<Modals
					state={this.state}
					handlers={{
						handleModalsRemove: this.handleModalsRemove,
						handleModalsOnHide: this.handleModalsOnHide,
						handleModalsOnChange: this.handleModalsOnChange,
						handleModalsAddMore: this.handleModalsAddMore,
						onSave: this.onSave,
					}}
				/>
				<OwnCollectionToday />
			</>
		);
	}
}

const mapStateToProps = (state: {
	wallet: { connectedAddress: any; blockchainType: string };
}) => ({
	connectedAddress: state.wallet.connectedAddress,
	blockchainType: ENV.getUserKeys('blockchainType')?.blockchainType,
});

export default connect(mapStateToProps, {})(CreateNFT);
