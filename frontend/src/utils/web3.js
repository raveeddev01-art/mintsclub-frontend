import Web3 from "web3";
import { toast } from "react-toastify";

import { ENV } from "./../config/config";
import abi from "./abis/v2-abi.json";


const mintsClubContractAddress = ENV.mintsClubContractAddress;
 console.log(mintsClubContractAddress,'mintsClubContractAddress')
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

const getContractMethods = async () => {
  let web3 = await getWeb3();

  const contractM = new web3.eth.Contract(abi, mintsClubContractAddress);
  return contractM;
};

export const mintNFt = async (metaData, id, amount,recipientValue) => {
  let web3 = await getWeb3();

  if (!web3) {
    toast.error("No web3 instance found");
    return false;
  }

  const nftAmount = Number(amount);
  const value=Number(recipientValue)* 1000000000000000000;
  try {
    let connectedAddress = await connectMetamask();
    const contractM = await getContractMethods();
    let result = await contractM.methods
      .mint(connectedAddress, nftAmount, "0x", metaData,connectedAddress,recipientValue)
      .send({ from: connectedAddress, gassPrice: 5000000 });
    console.log(result, "result of minting");
    return result;
  } catch (err) {
    console.log(err, "error while minting");
    toast.error(err.message);
    throw new Error(err);
  }
};

export const openNFTForBidding = async (biddingTime, startTime, tokenId) => {
  try {
    
    let connectedAddress = await connectMetamask();
    const contractM = await getContractMethods();
    let id=Number(tokenId)

    const result = await contractM.methods
      .startAuction(biddingTime, startTime, connectedAddress, id,1)
      .send({ from: connectedAddress });
    if (result) {
      console.log(result, "open for bidding result");
      return result;
    }
  } catch (err) {
    console.log(err, "open for bid error");
    throw new Error(err);
  }
};

export const placeABid = async (amount, tokenId) => {
  try {
    let connectedAddress = await connectMetamask();
    const contractM = await getContractMethods();
    let bidAmount = Number(amount) * 1000000000000000000;

    let id=Number(tokenId)
    
    const result = await contractM.methods
      .bid(id)
      .send({ from: connectedAddress, value: bidAmount, gas: 5000000 });

    if (result) {
      return result;
    }
  } catch (err) {
    
    if (err?.message) {
      toast.error(err.message);
    } else {
      toast.error("Transaction Failed ,Please check wallet history");
    }
    throw new Error(err);
  }
};

export const putonsale= async (tokenId,amount,price)=>{

  try{
  
    /* global BigInt */
    let connectedAddress = await connectMetamask();
      const contractM = await getContractMethods();
      let weiAmount =BigInt( Number(price) * 1000000000000000000);
   
      let id=Number(tokenId)
   
      const result = await contractM.methods
      .putonsale(id,amount,weiAmount)
      .send({ from: connectedAddress, gas: 5000000 });
   
      if(result){
        return result
      }
  }catch(err){
    console.log(err,"error")
    throw new Error(err);
  }
}

export const BuyFixedPriceNFT= async (amount,tokenId,setConfirmed,setTransactionHash)=>{
  try{
    console.log(amount,"amount")
   /* global BigInt */
    let connectedAddress = await connectMetamask();
      const contractM = await getContractMethods();
      let id=Number(tokenId)
      let weiAmount = (amount * 1000000000000000000)
    
      const result = await contractM.methods
      .BuyFixedPriceNFT(id)
      .send({ from: connectedAddress,value:weiAmount,gas: 5000000}).on('transactionHash',function(hash){
        console.log(hash,"hash")
        setTransactionHash(hash)
        setConfirmed(true)
      }).on('confirmation',function(confirmationNumber,receipt){
        console.log("confirmed2")
      })

      console.log(result,"result")
      if(result){
        return result
      }
  }catch(err){
    setConfirmed(false)
    console.log(err)
    setConfirmed(false)
    
    throw new Error(err);
  }
}

// export const acceptOffer= async (amount,tokenId)=>{
//   try{

//     let connectedAddress = await connectMetamask();
//       const contractM = await getContractMethods();
//       let weiAmount = Number(amount) * 1000000000000000000;
//       let id=Number(tokenId)
//       const result = await contractM.methods
//       .BuyFixedPriceNFT(id,weiAmount)
//       .send({ from: connectedAddress});
//       if(result){
//         return result
//       }
//   }catch(err){
//     throw new Error(err);
//   }
// }

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
    let chainId = await web3.eth.getChainId();
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
  } catch (e) {}
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

export const ClaimFundsAfterBidding = () => {};

export const createNft = async () => {};

export const setNftToken = (body) => {
  let url = process.env.REACT_APP_BASE_URL + `nftTokens/addToken`;
  alert("calling");

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

export const NftOwner = async () => {};

export const placeBidNft = async () => {};

export const SellOnFixedPrice = async () => {};

export const BuyFixedPriceNFTs = async () => {};

export const getCurrentAddress = async () => {
  let web3 = await getWeb3();
  let accounts = await web3.eth.getAccounts();
  let address = accounts[0];
  return address;
};

export const acceptNftOffer = async () => {};
export const signTransaction = async () => {};
