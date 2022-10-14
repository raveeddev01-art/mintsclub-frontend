import { constants } from 'http2';
import { CreateNftInterface } from '../../../interfaces/components';
import {
  compressImage,
  formatBytes,
  handleRequest,
} from "../../../utils/functions";
import { createNFT } from "../../../utils/algorand";
import { mintNFt, validateNetwork, editNFTUri } from "../../../utils/web3";
import axios from "axios";
import { ENV } from "../../../config/config";
import { mintSingleNft } from "../../../utils/solana/helper";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
const CreateNft = ({
  props,
  state,
  toast,
  validator,
  capitalize,
  setState,
  blockChainType,
  nftPreviousData,
  handleBtnDisable,
}: CreateNftInterface) => {
	const wallet = useWallet();
	const [loading, setLoading] = useState<boolean>(false);

  const insertNFT = async (data: any) => {
    try {
      const res: any = await handleRequest("post", "nfts/storeNFTData", data);
      const { success } = res.data;
      if (success) {
        toast.success("NFT created successfully");
        props.history.push("/explore/allNFT");
      } else {
        setState();
        toast.error(res.data.message);
      }
    } catch (err: any) {
      setState();

      toast.error(err.message);
    }
  };

  const mintNFT = async (nftInfo: any, metaData: any, image: any) => {
    let data: any = { ...nftInfo };
    data.image = image;
    data.metaData = metaData.metaDataUrl;
    data.remainingCopies = data.copies;
    data.activeAuction = null;

		try {
			let paylaod = {};

      console.log(blockChainType,"blockchian")
      if (!state.isFreeMint) {
        if (
          blockChainType === "ethereum" ||
          blockChainType === "polygon" ||
          blockChainType === "bsc"
        ) {
          let mintId = await mintNFt(metaData, state.nft.copies);
          if (mintId) {
            paylaod = {
              nftToken:mintId,
              data: { ...data, blockchainType: blockChainType },
              image,
              lazyMinted: false,
            };
          }
        }
        if (blockChainType === "solana") {
          console.log("Solana Implementation for Minting NFT");
          const response: any = await mintSingleNft(
            wallet,
            data.metaData,
            data.name,
            500
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
          data: { ...data, blockchainType:blockChainType },
          image,
          lazyMinted: state.isFreeMint,
        };
      }
      await insertNFT(paylaod);
    } catch (err: any) {
  console.log(err,"error in dash")
      toast.error(err);
      setState();
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
        "https://mintsclub.mypinata.cloud/ipfs/" + response.data.IpfsHash;
      dataInput.fileUrl = fileUrl;
      return { dataInput, image: fileUrl };
    } catch (err: any) {
      toast.error(err);
      setState();
    }
  };

  const editNFT = async (
    data: any,
    metaData: any = null,
    image: any = null
  ) => {
    let payload = { ...data };
    payload.nftId = `${props.match.params.nftId}`;
    if (metaData) {
      payload.metaData = metaData;
      payload.image = image;
    }
    try {
      await editNFTUri(nftPreviousData?.tokenId, metaData);
      let res = await handleRequest("put", "nfts/updateNft", payload);
      console.log(res, "res");
      if (res.data.success) {
        props.history.push("/userprofile");
      }
    } catch (err) {}
  };

  const uploadFileToIpfs = async (formData: any) => {
    try {
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary= ${formData._boundary}`,
          Authorization: `Bearer ${ENV.pinataJWT}`,
        },
      });
      return response;
    } catch (err: any) {
      toast.error(err);
      setState();
    }
  };
  const pinFileToIPFS = async (file: any, nftInfo: any) => {
    let fileUrl: any = "";
    let compressedFileUrl: any = "";
    if (file.name) {
      let originalFile: any = new FormData();
      let compressedFile: any = new FormData();
      let thumbnail = await compressImage(file);
      originalFile.append("file", file);
      compressedFile.append("file", thumbnail);
      console.log(
        formatBytes(thumbnail.size).split(" "),
        "compressed file size"
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
