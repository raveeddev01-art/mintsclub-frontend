import { CreateNftInterface } from '../../../interfaces/components';
import { compressImage, handleRequest } from '../../../utils/functions';
import { mintNFt, editNFTUri } from '../../../utils/web3';
import { ENV } from '../../../config/config';
import { mintSingleNft, updateNft } from '../../../utils/solana/helper';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useState } from 'react';
import { createNFT } from '../../../utils/algorand';
import { blockchainIcons } from '../../../assets/assets';
import { useToast } from 'react-toastify';

const CreateNft = ({
	props,
	state,
	toast,
	validator,
	capitalize,
	setLoader,
	blockchainType,
	setError,
}: CreateNftInterface) => {
	const wallet = useWallet();
	const [loading, setLoading] = useState<boolean>(false);

	const insertNFT = async (data: any) => {
		try {
			const res: any = await handleRequest('post', 'nfts/storeNFTData', data);
			const { success } = res.data;
			if (success) {
				toast.success('NFT created successfully');
				props.history.push(`/explore/nftdetail/${res.data.nft._id}`);
			} else {
				setLoader(false);
				toast.error(res.data.message);
			}
		} catch (err: any) {
			setLoader(false);

			toast.error(err.message);
		}
	};

	const createDefaultCollection = async () => {
		const res = await handleRequest(
			'get',
			`collection/myCollectionList?userId=${ENV.getUserKeys('_id')._id}`
		);
		const { Collections: collections } = res.data.data.collections;
		if (collections.length === 0 || !collections.length) {
			const args: any = {
				userId: `${ENV.getUserKeys('_id')._id}`,
				ownerAddress: props.connectedAddress,
				blockchainType: props.blockchainType,
			};
			const test = await handleRequest(
				'post',
				`collection/createDefault`,
				args
			);
			const res_fetchCollection = await handleRequest(
				'get',
				`collection/myCollectionList?userId=${ENV.getUserKeys('_id')._id}`
			);

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
			state.selectedCollection = updatedCollections[0];
			state.nft.categoryId = updatedCollections[0].categoryId;
			state.nft.collectionId = updatedCollections[0].value;
			state.collections = updatedCollections;
		}
	};
	const mintNFT = async (nftInfo: any, metaData: any, image: any) => {
		const data: any = { ...nftInfo };
		data.image = image;
		data.metaData = metaData.metaDataUrl;
		data.remainingCopies = data.copies;
		data.activeAuction = null;
		try {
			let paylaod: any = {};
			if (!state.isFreeMint) {
				if (
					blockchainType === 'ethereum' ||
					blockchainType === 'polygon' ||
					blockchainType === 'bsc'
				) {
					paylaod = await mintEthNFT(metaData, nftInfo, data, image);
				}

				if (props.blockchainType === 'algorand') {
					paylaod = await mintAlgoNFT(metaData, data, image);
				}

				if (props.blockchainType === 'solana') {
					paylaod = await mintSolNFT(data, image);
				}
			} else {
				paylaod = {
					nftToken: 0,
					data: { ...data, blockchainType: blockchainType },
					image,
					lazyMinted: state.isFreeMint,
				};
				if (props.blockchainType === 'algorand') {
					paylaod.algoLazyMinted = state.isFreeMint;
				}
			}
			await insertNFT(paylaod);
		} catch (err: any) {
			console.log(err, 'error');
			toast.error(err);
			setLoader(false);
		}
	};
	const mintEthNFT = async (
		metaData: string,
		nftInfo: any,
		data: any,
		image: string
	) => {
		const mintId = await mintNFt(
			metaData,
			state.nft.copies,
			nftInfo?.contractAddress
		);

		if (mintId) {
			return {
				nftToken: mintId,
				data: { ...data, blockchainType: blockchainType },
				image,
				lazyMinted: false,
			};
		}
	};
	const mintAlgoNFT = async (metaData: string, data: any, image: string) => {
		const { name, copies } = state.nft;
		const tokenId = await createNFT({
			assetName: name,
			total: copies,
			metaData,
			connectedAddress: props.connectedAddress,
		});

		if (tokenId) {
			return {
				nftToken: tokenId,
				data: { ...data, blockchainType: props.blockchainType },
				image,
				lazyMinted: false,
			};
		}
	};
	const mintSolNFT = async (data: any, image: string) => {
		const response = await mintSingleNft(wallet, data.metaData, data.name, 500);
		if (response?.response.signature) {
			return {
				nftToken: -1,
				data: {
					...data,
					blockchainType: blockchainType,
					mint: response?.mintAddress.toBase58(),
					txnHash: response?.response.signature,
				},
				image,
				lazyMinted: false,
			};
		}
	};
	const editNFT = async (
		data: any,
		metaData: any = null,
		image: any = null
	) => {
		try {
			if (props.blockchainType !== 'solana') {
				await editNFTUri(
					state.nftInfo.tokenId,
					metaData,
					state?.nftInfo?.contractAddress
				);
				const payload = { ...data };
				payload.nftId = `${props.match.params.nftId}`;
				if (metaData) {
					payload.metaData = metaData;
					payload.image = image;
				}
				const res = await handleRequest('put', 'nfts/updateNft', payload);
				if (res.data.success) {
					toast.success('NFT updated successfully');
					props.history.push(`/explore/nftdetail/${res.data.data._id}`);
				}
			} else {
				if (!state.nftInfo?.mint) {
					const payload = { ...data };
					payload.nftId = `${props.match.params.nftId}`;
					if (metaData) {
						payload.metaData = metaData;
						payload.image = image;
					}
					const res = await handleRequest('put', 'nfts/updateNft', payload);
					if (res.data.success) {
						toast.success('NFT updated successfully');
						props.history.push(`/explore/nftdetail/${res.data.data._id}`);
					}
					return;
				}
				const response: any = await updateNft(
					metaData,
					state.nftInfo.name,
					state.nftInfo.mint,
					wallet
				);
				if (response?.response?.signature) {
					const payload = { ...data };
					payload.nftId = `${props.match.params.nftId}`;
					if (metaData) {
						payload.metaData = metaData;
						payload.image = image;
					}
					const res = await handleRequest('put', 'nfts/updateNft', payload);
					if (res.data.success) {
						toast.success('NFT updated successfully');
						props.history.push(`/explore/nftdetail/${res.data.data._id}`);
					}
				} else {
					setLoader(false);
					toast.error(response?.message);
				}
			}
		} catch (err: any) {
			setLoader(false);
			toast.error(err?.message);
		}
	};

	const handleSubmit = async (e: any) => {
		try {
			const { nft, videoURL, audioUrl } = state;
			const nftInfo: any = { ...nft };
			nftInfo.properties = JSON.stringify(nftInfo.properties);
			nftInfo.levels = JSON.stringify(nftInfo.levels);
			nftInfo.stats = JSON.stringify(nftInfo.stats);
			nftInfo.name = capitalize(
				nftInfo.name,
				!props.match.params.nftId ? true : false
			);
			nftInfo.blockchainType = props.blockchainType;
			if (props.blockchainType === 'solana') {
				nftInfo.sellerFeeBasisPoints = 500;
			}

			if (videoURL) {
				nftInfo.fileType = 'video';
			} else if (audioUrl !== '') {
				nftInfo.fileType = 'audio';
			} else {
				nftInfo.fileType = 'image';
			}

			if (state.selectedCollection === null) {
				await createDefaultCollection();
			}

			if (validator.allValid()) {
				setLoader(true);
				nftInfo.collectionId = nft.collectionId;
				nftInfo.categoryId = nft.categoryId;
				const res = await uploadDataOnIpfs(nftInfo);
				console.log('This is response: ', res);
				if (res.data.success) {
					toast.success('Data uploaded on IPFS');
				} else {
					toast.error(res.data.message);
					setLoader(false);
				}

				const { compressedFileUrl, image, dataInput } = res.data.data;
				if (props.match.params.nftId) {
					if (nftInfo?.fileType === 'image') {
						nftInfo.compressedFile = state.nftInfo.compressedFile;
					}
					editNFT(nftInfo, dataInput.metaDataUrl, image);
				} else {
					if (nftInfo?.fileType === 'image') {
						nftInfo.compressedFile = compressedFileUrl;
					}

					mintNFT(nftInfo, dataInput, image);
				}
			} else {
				setError();
				toast.error('Please fill all required fields in valid format.');
			}
		} catch (err) {
			setLoading(false);
			console.log(
				'🚀 ~ file: createNft.tsx ~ line 255 ~ handleSubmit ~ err',
				err
			);
		} finally {
			setLoading(false);
		}
	};

	const uploadDataOnIpfs = async (nftInfo: any) => {
		const { selectedCollection } = state;
		nftInfo.collection = JSON.stringify({
			name: selectedCollection.label,
			id: selectedCollection.value,
			categoryId: nftInfo.categoryId,
		});
		if (nftInfo.fileType === 'image') {
			const compressedFile = await compressImage(nftInfo?.image);

			if (compressedFile) {
				nftInfo = { ...nftInfo, compressedFile };
			}
		}
		const formData: any = new FormData();
		for (const val in nftInfo) {
			formData.append(val, nftInfo[val]);
		}

		const res = await handleRequest('post', 'nfts/upload/ipfs', formData);

		return res;
	};

	const getButtonText = () => {
		if (!props.match.params.nftId) {
			if (loading) return 'Creating Nft...';
			return 'Create NFT';
		}
		if (loading) return 'Saving Changes...';
		return 'Save Changes';
	};

	const handleValidation = () => {
		const { copies, name, description, image } = state.nft;
		if (
			name === '' ||
			description === '' ||
			image === '' ||
			(blockchainType !== 'solana' &&
				copies === '' &&
				blockchainType !== 'algorand' &&
				copies === '')
		) {
			return true;
		}
		return false;
	};
	return (
		<div className="create-collection-btn-container">
			<button
				className="btn create-collection-btn btn-linear-gradient mt-5"
				disabled={loading || handleValidation()}
				onClick={(e) => handleSubmit(e)}
			>
				{getButtonText()}
			</button>
		</div>
	);
};

export default CreateNft;
