import React, { Component } from 'react';
import './CreateCollections.scss';
import { connect } from 'react-redux';
import {
	firstInputCharacterSpace,
	handleRequest,
	compressImage,
} from '../../utils/functions';
import SimpleReactValidator from 'simple-react-validator';
import { ENV } from '../../config/config';
import $ from 'jquery';
import { toast } from 'react-toastify';
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader';
import { Images } from '../../assets/assets';
import Banner from '../../Components/Banner/Banner';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg2.png';
import Select from 'react-select';
import OwnCollectionToday from '../../Components/OwnCollectionToday/OwnCollectionToday';
import { useQuery } from 'react-query';
import { QueryClientHook } from 'react-query-class-component';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { deployCollectionContract } from '../../utils/web3';
import UploadFiles from './Components/UploadFiles';

const MintSwitch = styled(Switch)(({ theme }: any) => ({
	width: 28,
	height: 16,
	padding: 0,
	display: 'flex',
	'&:active': {
		'& .MuiSwitch-thumb': {
			width: 15,
		},
		'& .MuiSwitch-switchBase.Mui-checked': {
			transform: 'translateX(9px)',
		},
	},
	'& .MuiSwitch-switchBase': {
		padding: 2,
		'&.Mui-checked': {
			transform: 'translateX(12px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: theme.palette.mode === 'dark' ? '#387fff' : '#387fff',
			},
		},
	},
	'& .MuiSwitch-thumb': {
		boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
		width: 12,
		height: 12,
		borderRadius: 6,
		transition: theme.transitions.create(['width'], {
			duration: 200,
		}),
	},
	'& .MuiSwitch-track': {
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor:
			theme.palette.mode === 'dark'
				? 'rgba(255,255,255,.35)'
				: 'rgb(159, 159, 159)',
		boxSizing: 'border-box',
	},
}));
class CreateCollections extends Component<
	{
		blockchainType: string;
		connectedAddress: string;
		history: any;
		match: any;
	},
	{
		isSubmitted?: boolean;
		formValid?: boolean;
		loader?: boolean;
		errors?: any;
		collection?: any;
		categories?: any;
		selectedCategory?: string;
		selectedOption?: any;
		deploy?: boolean;
		abi?: any;
		contractAddress?: string;
		blockchainType?: string;
	}
> {
	validator: SimpleReactValidator;
	constructor(props: any) {
		super(props);
		this.state = {
			isSubmitted: false,
			formValid: true,
			loader: true,
			errors: '',
			collection: {
				userId: ENV.getUserKeys('_id')._id,
				ownerAddress: this.props.connectedAddress,
				categoryId: '',
				logo: '',
				featuredImg: '',
				banner: '',
				name: '',
				url: '',
				logoUrl: '',
				bannerUrl: '',
				featuredImgUrl: '',
				description: '',
				deploy: false,
			},

			categories: null,
			selectedCategory: '',
			selectedOption: '',
		};
		this.validator = new SimpleReactValidator({
			autoForceUpdate: this,
			messages: {
				required: 'This field is required.', // will override all messages
			},
		});
	}
	componentDidMount() {
		window.scroll(0, 0);
		// this.props.getCategories();
		this.getCategories();
		if (this.props.match.params.id) {
			this.getCollectionInfo();
		}
	}

	componentDidUpdate(prevProps: any) {
		const { connectedAddress } = this.props;

		if (prevProps.connectedAddress === '' && connectedAddress) {
			let { collection } = this.state;
			collection = { ...collection, ownerAddress: connectedAddress };
			this.setState({
				collection,
			});
		}
	}
	getCategories = async () => {
		try {
			const res = await handleRequest('get', 'category/list');

			const { success, categories, message } = res.data;
			if (success) {
				const updatedCategories = [];
				for (const item of categories) {
					if (item.name !== 'Default Collection') {
						const obj = {
							value: item._id,
							label: item.name,
						};
						updatedCategories.push(obj);
					}
				}
				this.setState({ categories: updatedCategories, loader: false }, () => {
					// empty arrow function
				});
			} else {
				toast.error(message);
			}
		} catch (err: any) {
			toast.error(err.message);
		}
	};
	insertCollection = async (data: any) => {
		try {
			const res: any = await handleRequest('post', 'collection/create', data);
			if (res.data.success) {
				toast.success(res.data.message);
				this.props.history.push('/explore/exploreAll');
			} else {
				toast.error(res.data.message);
				this.setState({ loader: false });
			}
		} catch (err: any) {
			toast.error(err.message);
			this.setState({ loader: false });
		}
	};

	getCollectionInfo = async () => {
		try {
			const res = await handleRequest(
				'get',
				`collection/get/${this.props.match.params.id}`
			);
			if (res.data.success) {
				const { _id, name } = res.data.collection.categoryId;
				const {
					name: collectionName,
					description,
					url,
					logo,
					featuredImg,
				} = res.data.collection;
				let { collection } = this.state;
				collection = {
					...collection,
					name: collectionName,
					description,
					logoUrl: logo,
					logo,
					featuredImgUrl: featuredImg,
					featuredImg,
					categoryId: _id,
				};
				if (url) {
					collection.url = url;
				}
				this.setState({
					selectedOption: { value: _id._id, label: name },
					collection,
				});
			} else {
				toast.error(res.data.message);
			}
		} catch (err: any) {
			toast.error(err.message);
			this.setState({ loader: false });
		}
	};
	editCollectionInfo = async (data: any) => {
		try {
			const res = await handleRequest('put', `collection/edit`, data);
			if (res.data.success) {
				toast.success('collection updated successfully');
				this.props.history.push('/my-collection');
			} else {
				toast.error(res.data.message);
			}
		} catch (err: any) {
			toast.error(err.message);
		}
	};
	deleteCollection = async () => {
		try {
			const res = await handleRequest(
				'delete',
				`collection/delete/${this.props.match.params.id}`
			);
			if (res.data.success) {
				toast.success('collection deleted successfully');
				this.props.history.push('/my-collection');
			} else {
				toast.error(res.data.message);
			}
		} catch (err: any) {
			toast.error(err.message);
		}
	};
	deployCollection = async () => {
		try {
			const res = await handleRequest('post', 'collection/deploy');
			const { success, data, message } = res.data;
			if (success) {
				const bytecode = data?.bytecode;
				const resp = await deployCollectionContract(bytecode);
				const contractAddress = resp?.contractadd;
				const res = { ...data, contractAddress };
				return res;
			} else {
				toast.error(message);
			}
		} catch (err: any) {
			this.setState({ loader: false });
			throw new Error(err.message);
		}
	};

	formateCategories = (data: any) => {
		if (data && data?.length > 0) {
			const updatedCategories = [];
			for (const item of data) {
				const obj = {
					value: item._id,
					label: item.name,
				};
				updatedCategories.push(obj);
			}
			return updatedCategories;
		} else {
			return [];
		}
	};
	onFileChange(e: any) {
		const file = e.target.files[0];
		if (file)
			if (file.type.includes('image')) {
				const fileSize = this.formatBytes(file.size).split(' ');
				if (
					(+fileSize[0] > 100 && fileSize[1] === 'MB') ||
					fileSize[1] === 'GB'
				) {
					return toast.error('File Max Limit Reached.');
				}
				let { collection } = this.state;
				collection = { ...collection, [e.target.name]: file };
				if (e.target.name) {
					collection[`${e.target.name}Url`] = URL.createObjectURL(
						e.target.files[0]
					);
					$(`#collection-${e.target.name}-label`).html('File selected');
				}
				this.setState({ collection });
			}
	}
	formatBytes = (bytes: number, decimals = 2) => {
		if (bytes === 0) return '0 Bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	};

	onChange(e: any) {
		const { name, value } = e.target;
		const userId = ENV.getUserKeys('_id')._id;
		let { collection } = this.state;
		collection = { ...collection, [name]: value, userId: userId };

		this.setState({ collection });
	}

	reset = () => {
		const collection = {
			userId: '',
			categoryId: '',
			logo: '',
			featuredImg: '',
			banner: '',
			name: '',
			url: '',
			description: '',
			deploy: false,
		};
		this.setState({ collection, isSubmitted: false });
	};

	submit = async (e: any) => {
		e.preventDefault();
		this.setState(
			{
				isSubmitted: true,
				formValid: this.validator.allValid() ? true : false,
			},
			() => {
				const { formValid } = this.state;
				if (formValid) {
					this.setState(
						{
							loader: true,
						},
						async () => {
							const { collection } = this.state;
							collection['blockchainType'] =
								ENV.getUserKeys('blockchainType')?.blockchainType;
							const formData: any = new FormData();
							for (const val in collection) {
								if (val === 'logo' || val === 'featuredImg') {
									if (
										collection['logo']?.name &&
										collection['featuredImg']?.name
									) {
										const compressedFile: any = await compressImage(
											collection[val]
										);
										formData.append(val, compressedFile);
									} else {
										formData.append(val, collection[val]);
									}
								} else {
									formData.append(val, collection[val]);
								}
								if (collection[val]) {
									// empty block statement
								}
							}
							formData.append('_id', `${this.props.match.params.id}`);
							if (this.props.match.params.id) {
								return await this.editCollectionInfo(formData);
							}
							if (collection?.deploy) {
								try {
									const response = await this.deployCollection();
									console.log(
										response?.contractAddress,
										'response?.contractAddress'
									);
									formData.append('isApproved', false);
									formData.append(
										'contractAddress',
										`${response?.contractAddress}`
									);
									console.log(
										'🚀 ~ file: CreateCollections.tsx ~ line 423 ~ formData before time',
										formData
									);

									this.insertCollection(formData);
								} catch (err: any) {
									return toast.error(err?.message);
								}
							} else {
								console.log(
									'🚀 ~ file: CreateCollections.tsx ~ line 427 ~ formData',
									formData
								);
								formData.append('isApproved', true);

								this.insertCollection(formData);
							}
						}
					);
				} else {
					this.validator.showMessages();
					this.setState(
						{
							errors: 'Please fill all required fields in valid format.',
							formValid: false,
						},
						() => {
							$('#create-collection').scrollTop(0);
						}
					);
				}
			}
		);
	};
	handleSelectChange = (selectedOption: any) => {
		let { collection } = this.state;
		collection = { ...collection, categoryId: selectedOption.value };
		this.setState({
			selectedOption,
			collection,
		});
	};

	handleDeployChange = (selectedOption: any) => {
		let { collection } = this.state;
		collection = { ...collection, deploy: selectedOption.target.checked };
		this.setState({ collection });
	};

	handleValidation = () => {
		const { categoryId, logo, name, description, featuredImg, deploy } =
			this.state.collection;
		if (
			description === '' ||
			logo === '' ||
			categoryId === '' ||
			name === '' ||
			featuredImg === '' ||
			deploy === ''
		) {
			return true;
		} else {
			return false;
		}
	};

	clearData = () => {
		let { collection } = this.state;
		collection = { ...collection, featuredImg: '', featuredImgUrl: '' };
		this.setState({ collection });
	};

	render() {
		const {
			collection,
			errors,
			loader,
			isSubmitted,
			categories,
			selectedOption,
		}: any = this.state;

		const bannerData = {
			subHeading: 'Create New',
			heading: 'Create New Collection',
			content:
				'Explore on the world’s best & largest NFT marketplace with our beautiful NFT products. We want to be a part of your smile, success and future growth.',
		};
		//create collection max size validation
		return (
			<>
				{loader && <FullPageLoader />}
				<section className="create-collection">
					<Banner
						subHeading={bannerData.subHeading}
						heading={bannerData.heading}
						content={bannerData.content}
						bgImg={BannerBg}
						bannerImg={BannerImage}
						bg={true}
					/>
					<div className="container">
						<div className="row">
							<UploadFiles
								data={{
									collection,
									onFileChange: (e: any) => this.onFileChange(e),
									Images,
								}}
							/>

							<div className="col-lg-4 col-md-6 col-sm-12">
								<label className="create-collection-label">Name:*</label>
								<input
									className="create-collection-input mt-2"
									id="name"
									type="text"
									name="name"
									onChange={(e) => this.onChange(e)}
									value={collection.name}
									onKeyDown={(e) =>
										firstInputCharacterSpace(e, collection.name.length)
									}
									placeholder="Enter name"
									maxLength={55}
									autoComplete="off"
								/>
							</div>

							<div className="col-lg-4 col-md-6 mt-3 mt-md-0 position-relative">
								<label className="create-collection-label">URL:</label>
								<span className="text-danger position-absolute top-0">
									{this.validator.message('url', collection.url, 'url')}
								</span>
								<input
									className="create-collection-input mt-2"
									id="url"
									type="text"
									name="url"
									placeholder="Enter URL"
									onChange={(e) => this.onChange(e)}
									value={collection.url}
									onKeyDown={(e) =>
										firstInputCharacterSpace(e, collection.url.length)
									}
									maxLength={55}
									autoComplete="off"
								/>
							</div>

							<div className="col-lg-4 col-md-6 mt-3 mt-lg-0">
								<QueryClientHook
									hook={useQuery} // react query hook
									params={[
										'categories', // keyName
										() => handleRequest('get', 'category/list'),
										// ...options
									]}
								>
									{({ data }: any) => {
										return (
											<>
												<label className="create-collection-label">
													Select Category:*
												</label>
												<Select
													className="react-select-cls"
													classNamePrefix="react-select"
													value={selectedOption}
													isSearchable={false}
													onChange={this.handleSelectChange}
													options={this.formateCategories(
														data?.data?.categories
													)}
													placeholder="Select Category"
												/>
											</>
										);
									}}
								</QueryClientHook>
							</div>

							<div className="col-12 mt-3 mt-lg-5">
								<label className="create-collection-label">Description:*</label>

								<textarea
									className="create-collection-area mt-2"
									name="description"
									placeholder="Max 500 characters"
									maxLength={500}
									rows={3}
									onChange={(e) => this.onChange(e)}
									onKeyDown={(e) =>
										firstInputCharacterSpace(e, collection.description.length)
									}
									value={collection.description}
								></textarea>
							</div>
							{ENV.getUserKeys('blockchainType')?.blockchainType !==
								'solana' && (
								<div className="col-12 col-lg-6 mt-3 d-flex align-items-center justify-content-between px-3">
									<div className="col-12 col-lg-6 mt-3 d-flex align-items-center justify-content-between px-3">
										<div className="create-collection-label ms-0">
											<label>Deploy Collection</label>
											<p>It&apos;s free</p>
										</div>
										<MintSwitch
											checked={this.state.collection.deploy}
											onChange={this.handleDeployChange}
											inputProps={{ 'aria-label': 'mint' }}
										/>
									</div>
								</div>
							)}
							<div className="create-collection-btn-container">
								<button
									className="btn create-collection-btn btn-linear-gradient mt-5"
									disabled={this.handleValidation()}
									onClick={(e) => this.submit(e)}
								>
									Create Collection
								</button>
							</div>
						</div>
					</div>
				</section>

				<OwnCollectionToday />
			</>
		);
	}
}

const mapStateToProps = (state: any) => ({
	connectedAddress: state.wallet.connectedAddress,
	blockchainType: state.wallet.blockchainType,
});

export default connect(mapStateToProps, {})(CreateCollections);
