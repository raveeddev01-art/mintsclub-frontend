import React, { useState, useEffect } from 'react';
import BannerBg from '../../assets/images/hero-bg.png';
import BannerImage from '../../assets/images/bannerimg2.png';
import Banner from '../../Components/Banner/Banner';
import UploadIcon from '../../assets/images/upload-icon.png';
import { ReactComponent as BinIcon } from '../../assets/images/bin.svg';
import { ReactComponent as ZipFileIcon } from '../../assets/images/zip-file.svg';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { formatBytes, handleRequest } from '../../utils/functions';
import './createMultipleNFT.scss';
import { Link, useHistory } from 'react-router-dom';
import { uploadToS3Bucket } from '../../utils/s3Bucket';
import { ChainsOptions, nftTypesOptions } from '../../utils/exportData';
import { useGetData, useInsertData } from '../../hooks/Common';
import { ENV } from '../../config/config';
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader';
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
import { CHAIN_LOGOS, CHAIN_TITLE } from '../../utils/helpers/helpers';
import { CHAINS_INTERFACE } from '../../interfaces/components';
import JSZip from 'jszip';
const bannerContent = {
	subHeading: 'Get Started',
	heading: 'Create Multiple NFT',
	content:
		'If you want to share your NFT with a large number of community members',
};

function CreateMultipleNFT(props: any) {
	const [checkBox, setCheckBox] = useState<any>(false);
	const [fileName, setFileName] = useState<string>('');
	const [uploadStatus, setUploadStatus] = useState<any>(false);
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [selectedCollection, setSelectedCollection] = useState<any>(null);

	const [selectedCollectionType, setSelectedCollectionType] =
		useState<any>(null);
	const [selectedChain, setSelectedChain] = useState<any>(null);
	const [collectionsOptions, setCollectionsOptions] = useState<any>([]);
	const [loader, setLoader] = useState(false);
	const forceUpdate = useForceUpdate();
	const [batchFile, setBatchFile] = useState<any>({
		file: '',
		collectionId: '',
		categoryId: '',
	});
	const history = useHistory();

	function useForceUpdate() {
		const [value, setValue] = useState(0);
		return () => setValue((value) => value + 1);
	}

	useEffect(() => {
		refetch();
	}, []);
	const dragOver = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};

	const dragEnter = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};

	const dragLeave = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};
	const onDrop = (e: any) => {
		e.nativeEvent.preventDefault();
		if (!e) return;
		onFileChange(e, 'onDrag');
	};

	//////React Query////////////

	const { isLoading: isFetchingCollections, refetch } = useGetData(
		'myCollections',
		'collection/myCollectionList',
		ENV.objectToQueryString({
			userId: ENV.getUserKeys('_id')._id,
			page: 1,
			limit: 10000000,
		}),
		(res: any) => {
			if (res.data.success) {
				const collectionsOptions = res?.data?.data?.collections.Collections.map(
					(item: any) => {
						return {
							value: item._id,
							label: item.name,
							categoryId: item.categoryId,
						};
					}
				);
				setCollectionsOptions(collectionsOptions);
			}
		}
	);
	const { isLoading: isUploadingFiles, mutate: uploadFiles } = useInsertData(
		'batchUpload',
		(res: any) => {
			if (res?.data?.success === false) {
				toast.error(res?.data?.message);
				setLoader(false);
			} else {
				setLoader(false);
				toast.success('your NFTs are added to the queue');
				history.push('/my-pending-batches');
			}
		}
	);
	///////React Query End ////////

	const handleFilesValidation = (
		e: {
			dataTransfer: { files: { type: string }[] };
			target: { files: { type: string }[] };
		},
		status: string
	) => {
		let files: any;
		let type: any;
		if (status === 'onDrag') {
			files = e?.dataTransfer?.files[0];
			type = e?.dataTransfer?.files[0].type;
		} else {
			files = e?.target?.files[0];
			type = e?.target?.files[0].type;
		}
		if (files) {
			if (type.includes('zip')) {
				const fileSize = files?.size;
				if (fileSize > 400000000) {
					toast.error('Maximum Zip File size should be 400MB');
				} else {
					return 'file matched';
				}
			} else {
				toast.error('File not supported!');
			}
		}
	};

	const onFileChange = (e: any, status: any) => {
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
				if (file.type.includes('zip')) {
					setUploadStatus(true);
					setBatchFile({ ...batchFile, file: file });
					setFileName(file.name);
					setError(false);
					setErrorMessage('');
					toast.success('File successfully added');
				}
		} else {
			setError(true);
		}
	};

	const removeFile = (e: any) => {
		setUploadStatus(false);
		setBatchFile({ ...batchFile, file: '' });
		setFileName('');
	};
	const validator = new SimpleReactValidator({
		autoForceUpdate: forceUpdate,
		messages: {
			required: 'This field is required.',
		},
	});

	const createDefaultCollection = async () => {
		const res = await handleRequest(
			'get',
			`collection/myCollectionList?userId=${ENV.getUserKeys('_id')._id}`
		);
		const { Collections: collections } = res.data.data.collections;
		if (!collections.length) {
			const blockchainType = ENV.getUserKeys('blockchainType').blockchainType;
			const args: any = {
				userId: `${ENV.getUserKeys('_id')._id}`,
				ownerAddress: props.connectedAddress,
				blockchainType,
			};
			await handleRequest('post', `collection/createDefault`, args);
			const res_fetchCollection = await handleRequest(
				'get',
				`collection/myCollectionList?userId=${ENV.getUserKeys('_id')._id}`
			);
			validator.fields['collectionId'] = true;
			const { Collections: collections } =
				res_fetchCollection.data.data.collections;
			const updatedCollections = [];
			for (const item of collections) {
				const obj = {
					value: item._id,
					label: item.name,
					categoryId: item.categoryId,
				};
				updatedCollections.push(obj);
			}
			batchFile.categoryId = updatedCollections[0].categoryId;
			batchFile.collectionId = updatedCollections[0].value;
		}
	};

	const submit = async () => {
		try {
			setLoader(true);

			const verificationResponse = await handleRequest(
				'get',
				'batchUpload/verifyFileAlreadyProcessed',
				null,
				ENV.objectToQueryString({
					fileName: fileName.replace('.zip', ''),
					userId: ENV.getUserKeys('_id')?._id,
				})
			);

			const { message, success } = verificationResponse.data;

			if (!success) throw new Error(message);

			if (selectedCollection === null) {
				await createDefaultCollection();
			}

			if (!validator.allValid() && !batchFile?.collectionId) {
				throw new Error('Zip file and collection is required.');
			}

			const acceptedFiles = ['png', 'jpg', 'jpeg', 'json'];

			const zip = new JSZip();

			const zipFileContent = await zip.loadAsync(batchFile.file);

			let isFileContainsFolder = false;
			let isSupportedFiles = true;

			if (Object.entries(zipFileContent?.files)?.length > 0) {
				Object.entries(zipFileContent.files).every(([key, value]) => {
					if (value.dir === true) {
						isFileContainsFolder = true;
						return false;
					}

					const fileType = key.split('.').reverse()[0];

					if (!acceptedFiles.find((file) => file === fileType)) {
						isSupportedFiles = false;
						return false;
					}
				});

				if (isFileContainsFolder) {
					throw new Error(
						'This file contains directory, please make sure zip file only contains images and json files with only supported file types.'
					);
				}

				if (!isSupportedFiles) {
					throw new Error(
						'This file contains un-supported files. Please make sure you have supported files in your zip files.'
					);
				}

				toast.warning(
					"Please wait and don't refresh/switch page while uploading file.",
					{
						position: 'top-center',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						theme: 'light',
						closeButton: false,
					}
				);

				const uploadFile = await uploadToS3Bucket(
					batchFile.file,
					batchFile.file.name
				);
				const payload = {
					key: uploadFile.key,
					fileName: batchFile.file.name.substring(
						0,
						batchFile.file.name.indexOf('.')
					),
					collectionId: selectedCollection?.value || batchFile?.collectionId,
					blockchainType: ENV.getUserKeys('blockchainType').blockchainType,
					categoryId: batchFile.categoryId,
					status: 'pending',
					location: uploadFile?.location,
					ownerAddress: props?.connectedAddress,
					userId: ENV.getUserKeys('_id')._id,
				};
				uploadFiles(payload);
			}
		} catch (err: any) {
			console.log('🚀 ~ file: createMultipleNFT.tsx:271 ~ submit ~ err ', err);
			toast.error('Something went wrong ' + err.message);
		} finally {
			setLoader(false);
		}
	};
	return (
		<>
			{loader && <FullPageLoader />}

			<div className="create-multiple-nft">
				<Banner
					subHeading={bannerContent.subHeading}
					heading={bannerContent.heading}
					content={bannerContent.content}
					bgImg={BannerBg}
					bannerImg={BannerImage}
					bg={true}
				/>
				<div className="page-content">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 col-md-6 mt-3 mt-lg-0">
								<label className="create-collection-label d-flex align-items-center">
									You Are Minting On:
									<span className="text-danger ms-2 d-flex align-items-center">
										{
											CHAIN_TITLE[
												ENV.getUserKeys(
													'blockchainType'
												).blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
											]
										}
										<img
											src={
												CHAIN_LOGOS[
													ENV.getUserKeys(
														'blockchainType'
													).blockchainType?.toLowerCase() as keyof CHAINS_INTERFACE
												]
											}
											alt=""
											className="ms-1"
											width="20"
											height="20"
										/>
									</span>
								</label>
							</div>
							<div className="col-12 mb-4">
								<label className="w-100 mb-3">Upload*</label>
								<div
									className="upload-icon-container text-center "
									onDrop={(e) => onDrop(e)}
									onDragOver={(e) => dragOver(e)}
									onDragEnter={(e) => dragEnter(e)}
									onDragLeave={(e) => dragLeave(e)}
								>
									<img src={UploadIcon} alt="upload" className="mb-2" />
									<h6 className="mb-2">Drag and drop your zip files</h6>
									<div className="">
										<span>|</span>
										<h6>OR</h6>
										<span>|</span>
									</div>
									<input
										type="file"
										onChange={(e) => onFileChange(e, 'onChange')}
										accept=".zip"
										name="zip"
										value=""
									/>
									<span className="btn btn-linear-gradient upload-nft-btn text-white mt-3">
										Browse File
									</span>
									<span className="text-danger text-center mb-3">
										{validator.message('zip', fileName, 'required')}
									</span>
								</div>
								{uploadStatus && (
									<div className="upload-file-wapper">
										<div className="d-flex align-items-center">
											<ZipFileIcon />
											<div className="ms-4">
												<p>
													Uploaded File : <span>{fileName}</span>
												</p>
												{/* <ProgressBar now={60} /> */}
											</div>
										</div>
										<button
											onClick={(e) => {
												removeFile(e);
											}}
										>
											<BinIcon />
										</button>
									</div>
								)}
							</div>
							<div className="col-lg-4 col-md-6 mt-3 mt-lg-0">
								<label className="create-collection-label d-flex">
									Select Collection:*
									<span className="text-danger ms-2">
										{validator.message(
											'collectionId',
											selectedCollection,
											'required'
										)}
									</span>
								</label>
								<Select
									className="react-select-cls"
									classNamePrefix="react-select"
									placeholder="Select Collection"
									isSearchable={false}
									value={selectedCollection}
									name="collectionId"
									onChange={(value: any) => {
										setSelectedCollection(value);
										setBatchFile({
											...batchFile,
											collectionId: value.value,
											categoryId: value.categoryId,
										});
									}}
									options={collectionsOptions}
								/>
							</div>
							<div className="col-12">
								<div className="second-section">
									<h5>
										When uploadng your collection please take note of the
										following:
									</h5>
									<ul>
										<li>Only .png or .jpeg image file types.</li>
										<li>All meadata must be in a .json format.</li>
										<li>Please make sure you zip the folder and upload.</li>
										<li>Zip file should not contain any folder.</li>
										<li>Max zip file size should be 400MB</li>
										<li>
											Download our sample .json file to get the corrrect format
											of metadata.
										</li>
										<li>
											This will help to prevent any issues that may hinder your
											collections display and listing properties.{' '}
										</li>
									</ul>
									<Link to="/files/test.json" target="_blank" download>
										<button className="download">
											Download sample json file
										</button>
									</Link>
									<div className="checkbox-container d-flex align-items-start mt-5">
										{checkBox ? (
											<span
												className="custom-check-box me-4"
												onClick={() => setCheckBox(!checkBox)}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="13"
													height="10"
												>
													<path
														fillRule="evenodd"
														fill="#182338"
														d="M11.356.624c.034.009-.617.141-.838.368-1.93 1.93-3.692 3.823-5.546 5.712L2.794 4.961h-.001a1.223 1.223 0 0 0-.897-.26c-.321.036-.616.198-.116.45-.904.252-.997.574-.962 1.309.036-.093.342.201.451.403l3.049 2.434a1.218 1.218 0 0 0 1.626-.095C8.138 7.8 10.103 4.854 12.246 2.71A1.22 1.22 0 0 0 12.24.967c.16-.229-.555-.352-.884-.343z"
													/>
												</svg>
											</span>
										) : (
											<span
												className="custom-check-box me-4"
												onClick={() => setCheckBox(!checkBox)}
											></span>
										)}
										<p>
											I agree to all terms and conditions of the Mintsclub web
											platform and duly accept the entire copyright agreement
											included in the terms and conditions secttion of the
											platform
										</p>
									</div>
								</div>
								<button
									className="btn upload btn-linear-gradient mt-5"
									disabled={!checkBox || batchFile?.file === ''}
									onClick={() => submit()}
								>
									Upload
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
const mapStateToProps = (state: any) => ({
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {})(CreateMultipleNFT);
