import Web3 from "web3";
import { toast } from "react-toastify";

import { ENV } from "./../config/config";
import abi from "./abis/v2-abi.json";
import { placeBid } from "../components/bids/bids.action";
import { setFixedPriceNftTOken, acceptBit, placeBidApi } from "./functions";
import { changeOwnerShip } from "./functions";
import { Redirect } from "react-router-dom";

let Contract = require("web3-eth-contract");

const mintsClubContractAddress = ENV.mintsClubContractAddress;

let tokenContract = new Contract(abi, mintsClubContractAddress);

let requiredChainId = parseInt(process.env.REACT_APP_REQUIRED_CHAIN);

//get web3
var web3Provider = null;
/////////////////////////////////////////////////////////////////////////////MintsClub market start /////////////////////////

    const getWeb3 = async () => {
        let instance;
        //         web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  if (window.ethereum) {
    await window.web3.currentProvider.enable();
    instance = new Web3(window.web3.currentProvider);
  } else {
    instance = new Web3("https://rpc-mumbai.maticvigil.com");
  }

  return instance;
};

export const mintNFt = async (metaData) => {
  let web3 = await getWeb3();
  console.log(web3, "web3==>");
  if (!web3) {
    toast.error("No web3 instance found");
    return false;
  }

  try {
    let connectedAddress = await connectMetamask();
    
    const contractM = new web3.eth.Contract(abi, ENV.mintsClubContractAddress);
    let result = await contractM.methods
      .mint(connectedAddress, 1, 23, "0x", metaData)
      .send({ from: connectedAddress });
   
    console.log(result, "result");
    return result;
  } catch (err) {
    console.log(err, "error while minting");
    return err;
  }
};

//////////////////////////////////////////////////////////////////////////////////ariswap functions start///////////////////////////

// TEMP. ADDING THIS METHOD - COPY OF CONNECTMETAMASK
// export const connectMetamaskCopy = async ()=> {
//     if(window.ethereum) {
//         const web3 = new Web3(Web3.givenProvider);
//         const network = await web3.eth.net.getNetworkType();
//         await window.ethereum.enable();
//         let accounts = await web3.eth.getAccounts();
//         let chainId = await web3.eth.getChainId();
//         if(chainId !== requiredChainId) {
//             // toast.error(`Please switch to ${ENV.requiredChainName} testnet`);
//         }
//         return accounts[0];
//     }
//     else {
//         // alert("Please install metamask to connect to the Marketplace");
//         toast.error("Please install metamask to connect to the Marketplace");
//     }
// }
export const connectMetamaskCopy = async (address) => {
  if (window.ethereum) {
    const web3 = new Web3(Web3.givenProvider);
    // const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    let accounts = await web3.eth.getAccounts();
    let chainId = await web3.eth.getChainId();
    // console.log(chainId, "chainId");
    let currentNetwork = getNetworkName(chainId);
    if (!currentNetwork) {
      toast.error("Please Connect your metamask with Ethereum Network");
      return false;
    }
    if (chainId !== requiredChainId) {
      // toast.error(`Please switch to ${ENV.requiredChainName} testnet`);
    }
    // console.log(accounts[0],"account==>")
    if (accounts[0]) {
      if (accounts[0] === address) {
        toast.success("wallet is already connected");
      } else {
        toast.success("wallet connected");
      }
      //    console.log('hello');
      return accounts[0];
    } else {
      let address = await signRequest();

      toast.success("wallet connected");
      return address[0];
    }
  } else {
    // alert("Please install metamask to connect to the Marketplace");
    toast.error("This app requires metamask,Please Install Metamask ");
  }
};
export const getWalletAddress = async () => {
  const web3 = new Web3(Web3.givenProvider);
  // const network = await web3.eth.net.getNetworkType();
  if (window.ethereum) {
    await window.ethereum.enable();
    let accounts = await web3.eth.getAccounts();
    return accounts[0];
  }
};
export const connectMetamask = async () => {
  if (window.ethereum) {
    const web3 = new Web3(Web3.givenProvider);
    window.web3 = new Web3(window.ethereum);
    const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    let accounts = await web3.eth.getAccounts();
    let chainId = await web3.eth.getChainId();
    if (chainId !== requiredChainId) {
      // toast.error(`Please switch to ${ENV.requiredChainName} testnet`);
    }
    return accounts[0];
  } else {
    // alert("Please install metamask to connect to the Marketplace");
    toast.error("Please install metamask to connect to the Marketplace");
  }
};

export const getNetworkNameByChainId = async () => {
  if (window.ethereum) {
    const web3 = new Web3(Web3.givenProvider);
    // const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    let accounts = await web3.eth.getAccounts();
    let chainId = await web3.eth.getChainId();
    // console.log(chainId,"chainId")
    // console.log(chainId, "chainId");
    let currentNetwork = getNetworkName(chainId);
    // console.log(currentNetwork,"currentNetwork==>")
    return currentNetwork;
  }
};

const getNetworkName = (chainId) => {
  let networks = {
    1: "Ethereum Mainnet",
    4: "Ethereum Rinkby",
    3: "Ethereum Ropsten",
    42: "Ethereum Kovan",
    5: "Ethereum Goerli",
  };
  return networks[chainId];
};

export const signRequest = async () => {
  if (window.ethereum) {
    // const web3 = await getWeb3();
    // if (!web3) {
    //     toast.error("No web3 instance found");
    //     return false;
    // }

    const web3 = new Web3(Web3.givenProvider);
    let accounts = await web3.eth.getAccounts();
    let address = accounts[0];
    let signature = await handleSignMessage(address);
    // placeBid()
    // console.log(signature,"signature===>")
    return signature;
  } else {
    alert("Please install metamask to connect to the Marketplace");
  }
};

// export const testing=()=>{
//     const test=web3.eth.
// }

export const mint = async (metaData) => {
  // alert("dfdfdf")
  const web3 = await getWeb3();
  if (!web3) {
    toast.error("No web3 instance found");
    return false;
  }
  // let tokenContract1 = new Contract(liveAuctionsAbi., nftContractAddress);
  try {
   
  } catch (e) {
  
  }
};

const handleSignMessage = (address) => {
  return new Promise((resolve, reject) => {
    try {
      const web3 = new Web3(Web3.givenProvider);
      web3.eth.personal.sign(
        web3.utils.fromUtf8(
          `${ENV.appName} uses this cryptographic signature in place of a password, verifying that you are the owner of this address.`
        ),
        address,
        (err, signature) => {
          if (err) return reject(err);
          return resolve(signature);
        }
      );
    } catch (e) {
      console.log(e);
    }
  });
};

export const ClaimFundsAfterBidding = (token) => {
  };

export const createNft = async (metaData, nftId) => {

};

// openNFTForBidding
export const openNFTForBidding = async (token, timeduration) => {
 
};

export const setNftToken = (body) => {
  // console.log(body,"body===>")
  // let dummy={
  //     nftToken:"123",
  //     nftId:"123"

  // }

  let url = process.env.REACT_APP_BASE_URL + `nftTokens/addToken`;

  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: ENV.Authorization,
      "x-auth-token": ENV.x_auth_token,
      "Access-Control-Allow-Origin": "*",
      "x-access-token":
        ENV.getUserKeys("accessToken") &&
        ENV.getUserKeys("accessToken").accessToken
          ? ENV.getUserKeys("accessToken").accessToken
          : "",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      // alert("in setting nft then")
      // console.log(data,"data==>")
      if (data.success) {
        window.location.href = "/explore-all";
        //    console.log(data,"data in success")
      } else {
      }
    })
    .catch((error) => {
      // alert("in setting nft then")
      console.log(error, "error in catch blcok");
      if (error.response && error.response.data) {
      }
    });
};

export const NftOwner = async () => {
  
};

export const placeBidNft = async (
  body,
  tokenId,
  price,
  toAddress,
  fromAddress
) => {
 
};

export const SellOnFixedPrice = async (tokenId, price) => {
 
};

export const BuyFixedPriceNFTs = async (price, tokenId, nftOwnerId) => {

};

export const getCurrentAddress = async () => {
  const web3 = new Web3(Web3.givenProvider);

  let accounts = await web3.eth.getAccounts();
  // console.log(accounts,"accounts")
  let address = accounts[0];
  return address;
};

export const acceptNftOffer = async (tokenId, body) => {

};
export const signTransaction = async () => {

};
