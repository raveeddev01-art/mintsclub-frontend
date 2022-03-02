import Web3 from "web3";
import { toast } from "react-toastify";

import { ENV } from "./../config/config";
import abi from "./abis/v2-abi.json";

const mintsClubContractAddress = ENV.mintsClubContractAddress;

let requiredChainId = parseInt(process.env.REACT_APP_REQUIRED_CHAIN);

/////////////////////////////////////////////////////////////////////////////MintsClub market start /////////////////////////

    const getWeb3 = async () => {
        let instance;
  if (window.ethereum) {
    await window.web3.currentProvider.enable();
    instance = new Web3(window.web3.currentProvider);
  } else {
    instance = new Web3("http://localhost:7545");
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
    
    const contractM = new web3.eth.Contract(abi, mintsClubContractAddress);
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

export const connectMetamaskCopy = async (address) => {
  if (window.ethereum) {
    let web3 = await getWeb3();
    let accounts = await web3.eth.getAccounts();
    let chainId = await web3.eth.getChainId();
  
    let currentNetwork = getNetworkName(chainId);
    if (!currentNetwork) {
      toast.error("Please Connect your metamask with Ethereum Network");
      return false;
    }
    if (chainId !== requiredChainId) {
      
    }
  
    if (accounts[0]) {
      if (accounts[0] === address) {
        toast.success("wallet is already connected");
      } else {
        toast.success("wallet connected");
      }
   
      return accounts[0];
    } else {
      let address = await signRequest();

      toast.success("wallet connected");
      return address[0];
    }
  } else {
    toast.error("This app requires metamask,Please Install Metamask ");
  }
};
export const getWalletAddress = async () => {
  let web3 = await getWeb3();
 
    let accounts = await web3.eth.getAccounts();
    return accounts[0];
  
};
export const connectMetamask = async () => {
  if (window.ethereum) {
    let web3 = await getWeb3();
    let accounts = await web3.eth.getAccounts();
    let chainId = await web3.eth.getChainId();
    if (chainId !== requiredChainId) {
    }
    return accounts[0];
  } else {
    toast.error("Please install metamask to connect to the Marketplace");
  }
};

export const getNetworkNameByChainId = async () => {
  if (window.ethereum) {
    let web3 = await getWeb3();
    let accounts = await web3.eth.getAccounts();
    let chainId = await web3.eth.getChainId();;
    let currentNetwork = getNetworkName(chainId);
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
    let web3 = await getWeb3();
    let accounts = await web3.eth.getAccounts();
    let address = accounts[0];
    let signature = await handleSignMessage(address);
    return signature;
  } else {
    alert("Please install metamask to connect to the Marketplace");
  }
};



export const mint = async () => {
  
  const web3 = await getWeb3();
  if (!web3) {
    toast.error("No web3 instance found");
    return false;
  }
  
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

export const ClaimFundsAfterBidding = () => {
  };

export const createNft = async () => {

};


export const openNFTForBidding = async () => {
 
};

export const setNftToken = (body) => {

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
     
      if (data.success) {
        window.location.href = "/explore-all";
      
      } else {
      }
    })
    .catch((error) => {
   
      console.log(error, "error in catch blcok");
      if (error.response && error.response.data) {
      }
    });
};

export const NftOwner = async () => {
  
};

export const placeBidNft = async () => {
 
};

export const SellOnFixedPrice = async () => {
 
};

export const BuyFixedPriceNFTs = async () => {

};

export const getCurrentAddress = async () => {
  let web3 = await getWeb3();
  let accounts = await web3.eth.getAccounts();
  let address = accounts[0];
  return address;
};

export const acceptNftOffer = async () => {

};
export const signTransaction = async () => {

};
