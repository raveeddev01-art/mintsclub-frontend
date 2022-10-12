import Web3 from "web3";
import { toast } from "react-toastify";
import { ENV } from "./../config/config";
import abi from "./abis/ethereum/abi.json";
import typedDataV4 from "./typeDatav4";
import voucherAbi from "./abis/voucher-abi.json";
import batchMintAbi from "./abis/batchMint-abi.json";
const mintsClubContractAddress = ENV.mintsClubContractAddress;

let requiredChainId = parseInt(process.env.REACT_APP_REQUIRED_CHAIN);

/////////////////////////////////////////////////////////////////////////////MintsClub market start /////////////////////////

export const getWeb3 = async () => {
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
const getNetworkName = (chainId) => {
  let networks = {
    1: "Ethereum Mainnet",
    4: "Ethereum Rinkeyby",
    3: "Ethereum Ropsten",
    42: "Ethereum Kovan",
    5: "Ethereum Goerli",
  };
  return networks[chainId];
};

export const getNetworkNameByChainId = async () => {
  if (window.ethereum) {
    let web3 = await getWeb3();
    let chainId = await web3.eth.getChainId();
    let currentNetwork = getNetworkName(chainId);
    return currentNetwork;
  }
};
export const getChainId = async () => {
  if (window.ethereum) {
    let web3 = await getWeb3();
    let chainId = await web3.eth.getChainId();
    return chainId;
  }
};
export const validateNetwork = async () => {
  let prevNetwork = await getNetworkNameByChainId();

  if (prevNetwork === "Ethereum Goerli") {
    return true;
  } else {
    return false;
  }
};
export const getBalance = async () => {
  let web3 = await getWeb3();
  let address = await getWalletAddress();
  let balance = await web3.eth.getBalance(address);
  let ethBalance = web3.utils.fromWei(balance, "ether");

  return ethBalance;
};

export const mintNFt = async (metaData, amount) => {
  let web3 = await getWeb3();

  if (!web3) {
    toast.error("No web3 instance found");
    return false;
  }

  const nftAmount = Number(amount);

  try {
    let connectedAddress = await connectMetamask();
    const contractM = await getContractMethods();
    let result = await contractM.methods
      .mint(connectedAddress, nftAmount, metaData)
      .send({ from: connectedAddress });

    return result;
  } catch (err) {
    toast.error(err.message);
    throw new Error(err);
  }
};

export const openNFTForBidding = async (
  biddingTime,
  startTime,
  tokenId,
  copies
) => {
  try {
    let connectedAddress = await connectMetamask();
    const contractM = await getContractMethods();
    let id = Number(tokenId);
    const result = await contractM.methods
      .startAuction(biddingTime, startTime, connectedAddress, id, copies)
      .send({ from: connectedAddress });
    let web3 = await getWeb3();
    let sellId = await web3.utils.hexToNumber(
      result.events.AuctionStart.raw.data
    );
    if (sellId) {
      return sellId;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const placeABid = async (amount, tokenId) => {
  try {
    let connectedAddress = await connectMetamask();
    const contractM = await getContractMethods();
    const bidAmount = Number(BigInt(Web3.utils.toWei(`${amount}`, "ether")));
    // let bidAmount = Number(amount) * 1000000000000000000;
    let id = Number(tokenId);
    let web3 = await getWeb3();

    const result = await contractM.methods.bid(id).send({
      from: connectedAddress,
      value: bidAmount,
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    });

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

export const putonsale = async (tokenId, amount, price) => {
  try {
    /* global BigInt */
    let connectedAddress = await connectMetamask();
    const contractM = await getContractMethods();
    let weiAmount = BigInt(Web3.utils.toWei(price, "ether"));
    let web3 = await getWeb3();
    let id = Number(tokenId);
    const result = await contractM.methods
      .putonsale(id, amount, weiAmount)
      .send({
        from: connectedAddress,
        gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      });
    let sellId = await web3.utils.hexToNumber(result.events.OfferSale.raw.data);
    if (sellId) {
      return sellId;
    }
  } catch (err) {
    // console.log(err, "error");
    throw new Error(err);
  }
};

export const BuyFixedPriceNFT = async (
  amount,
  tokenId,
  setConfirmed,
  setTransactionHash
) => {
  setConfirmed("pending");
  try {
    /* global BigInt */
    let connectedAddress = await connectMetamask();
    const contractM = await getContractMethods();

    const weiAmount = Number(BigInt(Web3.utils.toWei(`${amount}`, "ether")));

    const result = await contractM.methods
      .BuyFixedPriceNFT(tokenId)
      .send({ from: connectedAddress, value: weiAmount, gas: 5000000 })
      .on("transactionHash", function (hash) {
        setTransactionHash(hash);
        setConfirmed(true);
      })
      .on("confirmation", function (confirmationNumber, receipt) {});
    if (result) {
      return result;
    }
  } catch (err) {
    setConfirmed(false);
    // console.log(err);

    throw new Error(err);
  }
};
export const setApprovalForAll = async (setApprovalStatus) => {
  try {
    let connectedAddress = await connectMetamask();
    const contractM = await getContractMethods();
    const result = await contractM.methods
      .setApprovalForAll(ENV.mintsClubContractAddress, true)
      .send({
        from: connectedAddress,
      })
      .on("transactionHash", function (hash) {
        // setTransactionHash(hash);
        setApprovalStatus("in-progress");
      });
    if (result) {
      return result;
    }
  } catch (err) {
    toast.error(err.message);
    throw new Error(err);
  }
};

export const claimNFTfromContract = async (tokenId) => {
  try {
    let web3 = await getWeb3();
    let connectedAddress = await getMetamaskConnectedAddress();
    const contractM = await getContractMethods();
    const result = contractM.methods.claimNft(tokenId).send({
      from: connectedAddress,
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    });
    if (result) {
      return result;
    }
  } catch (err) {
    // console.log(err, "error");
    throw new Error(err);
  }
};
export const endAuctionFromContract = async (tokenId) => {
  try {
    let web3 = await getWeb3();
    let connectedAddress = await getMetamaskConnectedAddress();
    const contractM = await getContractMethods();
    const result = contractM.methods.auctionEnd(tokenId).send({
      from: connectedAddress,
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    });
    if (result) {
      // console.log(result, "result");
      return result;
    }
  } catch (err) {
    // console.log(err, "error");
    throw new Error(err);
  }
};

export const getMetamaskConnectedAddress = async () => {
  let web3 = await getWeb3();
  let accounts = await web3.eth.getAccounts();
  return accounts[0];
};

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

export const getCurrentAddress = async (wallet) => {
  if (wallet?.connected) {
    return wallet.publicKey.toBase58();
  }
  let web3 = await getWeb3();
  let accounts = await web3.eth.getAccounts();
  let address = accounts[0];
  return address;
};

export const handleSign = async (nounce) => {
  const web3 = new Web3(Web3.givenProvider);
  const publicAddress = await connectMetamask();
  return new Promise((resolve, reject) =>
    web3.eth.personal.sign(
      web3.utils.fromUtf8(`I am signing my one-time nonce: ${nounce}`),
      publicAddress?.toLowerCase(),
      (err, signature) => {
        console.log(signature, "signature==>");
        if (err) return reject(err);
        return resolve({ publicAddress, signature });
      }
    )
  );
};

export const createVoucher = async (tokenId, amount, uri, price) => {
  let data = { ...typedDataV4 };
  data.message.tokenId = tokenId;
  data.message.amount = amount;
  data.message.uri = uri;
  data.message.minPrice = price;

  const publicAddress = await connectMetamask();
  return new Promise((resolve, reject) => {
    const web3 = new Web3(Web3.givenProvider);
    try {
      web3.currentProvider.sendAsync(
        {
          method: "eth_signTypedData_v4",
          params: [publicAddress, JSON.stringify(data)],
          from: publicAddress,
        },
        function (err, result) {
          if (err) {
            resolve({ success: false, data: err });
          }
          console.log(result.result, "result");
          resolve({ success: true, data: result.result });
        }
      );
    } catch (err) {
      resolve({ success: false, data: err });
    }
  });
};

export const redeemVoucher = async (
  voucher,
  setTransactionHash,
  setConfirmed
) => {
  const { tokenId, uri, minPrice, copies, signature } = voucher;
  let web3 = await getWeb3();
  const publicAddress = await connectMetamask();
  // BigInt(Web3.utils.toWei(`${minPrice}`, "ether"))
  try {
    const contractM = new web3.eth.Contract(
      batchMintAbi,
      // "0x3EB384f3BbF38be551a00b4e5549Eb1eF4C883A8" //ERC-721 WORKING
      ENV.batchMintLazyContract
    );
    let result = await contractM.methods
      .redeem(publicAddress, {
        tokenId,
        uri,
        minPrice: Web3.utils.toWei(`${minPrice}`, "ether"),
        amount: copies,
        signature,
      })
      .send({
        from: publicAddress,
        value: Web3.utils.toWei(`${minPrice}`, "ether"),
      })
      .on("transactionHash", function (hash) {
        setTransactionHash(hash);
        setConfirmed(true);
      });
    return result;
  } catch (err) {
    console.log(err, "error");
    setConfirmed(false);
    throw new Error(err);
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
      // toast.error("Please Connect your metamask with Ethereum Network");
      return false;
    }
    if (chainId !== requiredChainId) {
    }

    if (accounts[0]) {
      if (accounts[0] === address) {
        toast.success("wallet is already connected");
      } else {
        // toast.success("wallet connected");
      }

      return accounts[0];
    } else {
      let address = await signRequest();

      // toast.success("wallet connected");
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
    if (accounts?.length === 0) {
      await connectMetamask();
    }
    let chainId = await web3.eth.getChainId();
    if (chainId !== requiredChainId) {
    }
    return accounts[0];
  } else {
    toast.error("Please install metamask to connect to the Marketplace");
  }
};
export const connectWithMetamask = async () => {
  try {
    let web3 = await getWeb3();
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    let accounts = await web3.eth.getAccounts();
    return accounts[0];
  } catch (err) {
    toast.error(err.message);
  }
};

export const switchNetworkToChainId = async (id) => {
  if (window.ethereum) {
    try {
      let web3 = await getWeb3();
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(4) }],
      });
      let accounts = await web3.eth.getAccounts();
      return accounts[0];
    } catch (err) {
      toast.error(err.message);
      throw new Error(err);
    }
  }
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
      // console.log(e);
    }
  });
};

export const deployCollectionContract = (abi, bytecode) => {
  return new Promise(async (resolve, reject) => {
    try {
      const web3 = new Web3(Web3.givenProvider);
      const address = await connectMetamask();
      let contract = await new web3.eth.Contract(abi, null, {
        data: bytecode,
        from: address,
      });
      contract
        .deploy({
          data: bytecode,
          arguments: ["test"],
        })
        .send({
          from: address,
        })
        .then((contractInstance) => {
          toast.success("Contract Deployed Successfully!");
          const contractData = {
            contractadd: contractInstance.options.address,
            Network: "Ethereum",
            Deployed: true,
          };
          return resolve(contractData);
        })
        .catch((err) => {
          console.log("error", err);
          toast.error("Transaction Failed please check wallet history!");
          return reject(err);
        });
    } catch (err) {
      console.log("error", err);
      toast.error("Transaction Failed please check wallet history!");
      return reject(err);
    }
  });
};
