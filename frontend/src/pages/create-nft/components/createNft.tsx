import { constants } from 'http2';
import { CreateNftInterface } from '../../../interfaces/components';
import {
	compressImage,
	formatBytes,
	handleRequest,
} from '../../../utils/functions';
import { mintNFt, validateNetwork } from '../../../utils/web3';
import axios from 'axios';
import { ENV } from '../../../config/config';
import { mintSingleNft } from '../../../utils/solana/helper';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useState } from 'react';
import { createNFT } from '../../../utils/algorand';

const CreateNft = ({
	props,
	state,
	toast,
	validator,
	capitalize,
	setLoader,
	blockChainType,
	handleBtnDisable,
}: CreateNftInterface) => {
	const wallet = useWallet();
	const [loading, setLoading] = useState<boolean>(false);

	const insertNFT = async (data: any) => {
		try {
			const res: any = await handleRequest('post', 'nfts/storeNFTData', data);
			const { success } = res.data;
			if (success) {
				toast.success('NFT created successfully');
				props.history.push('/explore/allNFT');
			} else {
				setLoader(false);
				toast.error(res.data.message);
			}
		} catch (err: any) {
			setLoader(false);

			toast.error(err.message);
		}
	};
	const mintNFT = async (nftInfo: any, metaData: any, image: any) => {
		console.log(nftInfo, 'nftInfo');
		const data: any = { ...nftInfo };
		console.log('🚀 ~ file: createNft.tsx ~ line 44 ~ mintNFT ~ data123', data);
		console.log('props.blockchainType', props.blockchainType);
		data.image = image;
		data.metaData = metaData.metaDataUrl;
		data.remainingCopies = data.copies;
		data.activeAuction = null;
		console.log(data, 'data');
		try {
			let paylaod = {};
			console.log(blockChainType, 'blockchainType');
			if (!state.isFreeMint) {
				if (
					blockChainType === 'ethereum' ||
					blockChainType === 'polygon' ||
					blockChainType === 'bsc'
				) {
					const mintId = await mintNFt(
						metaData,
						state.nft.copies,
						nftInfo?.contractAddress
					);

					if (mintId) {
						paylaod = {
							nftToken: mintId,
							data: { ...data, blockchainType: blockChainType },
							image,
							lazyMinted: false,
						};
					}
				}

				if (props.blockchainType === 'algorand') {
					console.log('Algorand Implementation for Minting NFT');
					const { name, copies } = state.nft;
					const tokenId = await createNFT({
						assetName: name,
						total: copies,
						metaData,
						connectedAddress: props.connectedAddress,
					});
					console.log('Algorand Token ID', tokenId);

					if (tokenId) {
						paylaod = {
							nftToken: tokenId,
							data: { ...data, blockchainType: props.blockchainType },
							image,
							lazyMinted: false,
						};
					}
				}

				if (props.blockchainType === 'solana') {
					console.log('Solana Implementation for Minting NFT');
					const response = await mintSingleNft(
						wallet,
						data.metaData,
						data.name,
						500
					);
					console.log(
						'🚀 ~ file: create-nft.tsx ~ line 456 ~ mintNFT= ~ response',
						response
					);
					if (response?.response.signature) {
						paylaod = {
							nftToken: -1,
							data: {
								...data,
								blockchainType: blockChainType,
								mint: response?.mintAddress.toBase58(),
								txnHash: response?.response.signature,
							},
							image,
							lazyMinted: false,
						};
					}
				}
			} else {
				paylaod = {
					nftToken: (Math.floor(Math.random() * 10000) + 10000)
						.toString()
						.substring(1),
					data: { ...data, blockchainType: blockChainType },
					image,
					lazyMinted: state.isFreeMint,
				};
			}
			await insertNFT(paylaod);
		} catch (err: any) {
			console.log(err, 'error');
			toast.error(err);
			setLoader(false);
		}
	};

	const uploadJsonToIpfs = async (fileUrl: any) => {
		const dataInput: any = {};
		const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
		const properties = {
			properties: state.nft.properties,
			levels: state.nft.levels,
			stats: state.nft.stats,
		};
		const data = {
			name: state.nft.name,
			symbol: 'Gamo',
			sellerFeeBasisPoints: 0,
			image: fileUrl,
			description: state.nft.description,
			properties: properties,
			collection: {
				name: state.selectedCollection.label,
				id: state.selectedCollection.value,
				categoryId: state.selectedCollection.categoryId,
			},
		};

		try {
			const response = await axios.post(url, data, {
				headers: {
					Authorization: `Bearer ${ENV.pinataJWT}`,
				},
			});
			dataInput.ipfsJsonData = data;
			dataInput.metaDataUrl =
				'https://mintsclub.mypinata.cloud/ipfs/' + response.data.IpfsHash;
			dataInput.fileUrl = fileUrl;
			return { dataInput, image: fileUrl };
		} catch (err: any) {
			toast.error(err);
			setLoader(false);
		}
	};

	const editNFT = async (
		data: any,
		metaData: any = null,
		image: any = null
	) => {
		const payload = { ...data };
		payload.nftId = `${props.match.params.nftId}`;
		if (metaData) {
			payload.metaData = metaData;
			payload.image = image;
		}
		const res = await handleRequest('put', 'nfts/updateNft', payload);
		console.log(res, 'res');
		if (res.data.success) {
			props.history.push('/userprofile');
		}
	};

	const uploadFileToIpfs = async (formData: any) => {
		try {
			const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
			const response = await axios.post(url, formData, {
				headers: {
					'Content-Type': `multipart/form-data; boundary= ${formData._boundary}`,
					Authorization: `Bearer ${ENV.pinataJWT}`,
				},
			});
			return response;
		} catch (err: any) {
			toast.error(err);
			setLoader(false);
		}
	};
	const pinFileToIPFS = async (file: any, nftInfo: any) => {
		let fileUrl: any = '';
		let compressedFileUrl: any = '';
		if (file.name) {
			const originalFile: any = new FormData();
			const compressedFile: any = new FormData();
			const thumbnail = await compressImage(file);
			originalFile.append('file', file);
			compressedFile.append('file', thumbnail);
			console.log(
				formatBytes(thumbnail.size).split(' '),
				'compressed file size'
			);
			const orignalIpfsFile: any = await uploadFileToIpfs(originalFile);
			const compressedIpfsFile: any = await uploadFileToIpfs(compressedFile);
			fileUrl = `https://mintsclub.mypinata.cloud/ipfs/${orignalIpfsFile.data.IpfsHash}`;
			compressedFileUrl = `https://mintsclub.mypinata.cloud/ipfs/${compressedIpfsFile.data.IpfsHash}`;
			// const fileOutputData: any = { fileUrl, hash: fileData.data.IpfsHash };
		} else {
			fileUrl = file;
		}
		const metaData: any = await uploadJsonToIpfs(fileUrl);
		if (props.match.params.nftId) {
			return editNFT(
				{ ...nftInfo, compressedFile: compressedFileUrl },
				metaData.dataInput.metaDataUrl,
				metaData.image
			);
		}
		mintNFT(
			{ ...nftInfo, compressedFile: compressedFileUrl },
			metaData.dataInput,
			metaData.image
		);
	};
	const handleSubmit = async (e: any) => {
		try {
			setLoading(true);

			const { nft, videoURL, audioUrl } = state;

			const nftInfo: any = { ...nft };
			nftInfo.properties = JSON.stringify(nftInfo.properties);
			nftInfo.levels = JSON.stringify(nftInfo.levels);
			nftInfo.stats = JSON.stringify(nftInfo.stats);
			nftInfo.name = capitalize(nftInfo.name);

			if (videoURL) {
				nftInfo.fileType = 'video';
			} else if (audioUrl !== '') {
				nftInfo.fileType = 'audio';
			} else {
				nftInfo.fileType = 'image';
			}

			if (validator.allValid() && nft.collectionId) {
				const { formValid } = state;

				if (formValid) {
					setLoader(true);
					await pinFileToIPFS(nft.image, nftInfo);
				} else {
					state.formValid = false;
					validator.showMessages();
					toast.error('Please fill all required fields in valid format.');
				}
			}
		} catch (err) {
			console.log(
				'🚀 ~ file: createNft.tsx ~ line 255 ~ handleSubmit ~ err',
				err
			);
		} finally {
			setLoading(false);
		}
	};

	const getButtonText = () => {
		if (!props.match.params.nftId) {
			if (loading) return 'Creating Nft...';
			return 'Create NFT';
		}
		if (loading) return 'Saving Changes...';
		return 'Save Changes';
	};

	return (
		<div className="create-collection-btn-container">
			<button
				className="btn create-collection-btn btn-linear-gradient mt-5"
				disabled={loading}
				onClick={(e) => handleSubmit(e)}
			>
				{getButtonText()}
			</button>
		</div>
	);
};

export default CreateNft;
