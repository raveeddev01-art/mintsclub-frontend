import { useState, useEffect, useContext } from "react";
import MyAlgoConnect from "@randlabs/myalgo-connect";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { setWalletAddress } from "../wallet/wallet.action";
import { login } from "../../Components/User/user.action";
import { useHistory, useLocation } from "react-router-dom";
import {connectWallet} from "../../utils/algorand"
import { useMutation, useQuery } from "react-query";
import { handleRequest } from "../../utils/functions";



import "./connect-wallet.scss";
import { connectModal } from "../../assets/assets";
import {
  signRequest,
  connectWithMetamask,
  getChainId,
  switchNetworkToChainId,
  getWalletAddress,
  validateNetwork,
  getWeb3,
  connectMetamask,
  handleSign,
} from "../../utils/web3";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useGetData, useInsertData } from "../../hooks/Common";
import Web3 from "web3";
import { ENV } from "../../config/config";
import errorHandler from "../../context/errorHandler/ErrorHandlerContext";
const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });



const ConnectWallet = (props: any) => {
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
  const location: any = useLocation();
  const [connectedAddress, setConnectedAddres] = useState<any>(null);
  const { setError } = useContext(errorHandler);
  useEffect(() => {
    if (props.error) {
      toast.error(props.error.message);
    }
  }, [props.error]);
  // useEffect(() => {
  //   const getAddress = async () => {
  //     const address = await connectMetamask();
  //     setConnectedAddres(address);
  //   };
  //   getAddress();
  // }, []);

  const settings = {
    shouldSelectOneAccount: false,
    openManager: false,
  };

const connectAlgoWallet = async () => {
   const addr  = await connectWallet()
   console.log("addr",addr?.[0])
   props.setWalletAddress(addr?.[0]);
   
   let payload = {
    address: addr?.[0],
    blockchainType: "algorand"
  };

  algoLogin(payload)
  authAlgo({address: addr?.[0]})

};

const onSuccessAlog = (res:any)=>{
  if(res){
    console.log(res)
  }
}
const {mutate: algoLogin} = useInsertData( `users/validate/${connectedAddress}`, onSuccessAlog);

  const connectMetamaskCall = async () => {
    if (detectMobile() && !window?.ethereum) {
      window.open(
        "https://metamask.app.link/dapp/mintsclub-v2-marketplace.invo.zone/"
      );
    } else {
      // if (getChainId !== ENV.chainId) {
      //   try {
      //     await switchNetworkToChainId(ENV.chainId);
      //   } catch (error:any) {
      //     return toast.error(error.message);
      //   }
      // }
      let connectedAddress: any = false;
      if (detectMobile()) {
        connectedAddress = await getWalletAddress();
      } else {
        try {
          connectedAddress = await connectWithMetamask();
        } catch (err: any) {
          return "";
        }
      }
      login(connectedAddress);
      console.log(connectedAddress, "connectedAddress");
    }
  };

  const onSuccessLogin = (data: any) => {
    if (data.data.success) {
      ENV.encryptUserData(data.data.data);
      history.push(location?.state ? location.state : "/");
    } else {
      setError(data.data.message);
    }
  };


  const { mutate: authAlgo } = useInsertData("auth/login/", onSuccessLogin);

  const { mutate: auth } = useInsertData("auth/login/", onSuccessLogin);

  const login = async (connectedAddress: any) => {
    if (connectedAddress) {
      try {
        setDisabled(true);
        await signRequest();
        let payload = {
          address: connectedAddress,
        };
        props.setWalletAddress(connectedAddress);
        auth(payload);
      } catch (err: any) {
        setDisabled(false);
        toast.error(err.message);
      }
    }
    //
  };
  const detectMobile = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  /////////////////////////////////////

  ///Validate
  const onSuccessValidateUser = async (data: any) => {
    if (data.data.success) {
      const publicAddress: any = await connectMetamask();
      if (data?.data?.users?.length > 0) {
        const res = await handleSign(data?.data?.users[0].nounce);
        authenticate(res);
      } else {
        handleSignUp({ address: publicAddress });
      }
    } else {
      setError(data.data.message);
    }
  };
  const { mutate: validateUser } = useInsertData(
    `users/validate/${connectedAddress}`,
    onSuccessValidateUser
  );

  ///Sign up
  const onSuccessSignUp = async (data: any) => {
    if (data.data.success) {
      const res = await handleSign(data?.data?.data?.nounce);
      authenticate(res);
    } else {
      setError(data.data.message);
    }
  };

  const { mutate: handleSignUp } = useInsertData(
    "users/createUser",
    onSuccessSignUp
  );
  ///Authenticate
  const onSuccessAuthentication = (data: any) => {
    if (data.data.success) {
      ENV.encryptUserData(data.data.data);
      history.push(location?.state ? location.state : "/");
    } else {
      setError(data.data.message);
    }
  };
  const { mutate: authenticate } = useInsertData(
    "users/authenticate",
    onSuccessAuthentication,
    (err: any) => toast.error(err?.message)
  );


  // Metamask Button
  const walletButtons = [
    {
      name: "MetaMask",
      img: connectModal.metaImg,
      type: "ethereum",
      func: () => validateUser(null),
    },
  ];

  // Algorand Button
  const algoButtons = [
    {
      name: "Algorand",
      img: "connectModal.metaImg",
      type: "algorand",
      func: async() =>  {
      validateUser({ blockchainType: "algorand" })
    }
    },
  ];


  return (
    <>
      <Container>
        <div className="connect-wallet-container">
          <h3 className="modal-title">Connect Your Wallet</h3>
          <p className="modal-description">
            Select what network and wallet you want to connect
          </p>
          
          <div className="model-tabs">
            <Tabs defaultActiveKey="ethereum" id="uncontrolled-tab-example">
              <Tab eventKey="ethereum" title="Ethereum">
                <div className="tab-inner-content">
                  {walletButtons.map((button: any) => {
                    return (
                      <button
                        className="wallet-button"
                        onClick={() => button.func()}
                      >
                        <img src={button.img} alt="services" />
                        {button.name}
                      </button>
                    );
                  })}
                </div>
              </Tab>

              <Tab eventKey="algorand" title="Algorand">
                <div className="tab-inner-content">
                  {algoButtons.map((button: any) => {
                    return (
                      <button
                        className="wallet-button"
                        onClick={connectAlgoWallet}
                      >
  
                        {button.name}
                      </button>
                    );
                  })}
                </div>
              </Tab>

              <Tab eventKey="polygon" title="Polygon">
                2
              </Tab>
              <Tab eventKey="cardano" title="Cardano">
                3
              </Tab>
              <Tab eventKey="bsc" title="BSC">
                3
              </Tab>
            </Tabs>
            {walletButtons && walletButtons.length > 6 && (
              <button className="show-more-btn">Show More</button>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  error: state.error,
});

export default connect(mapStateToProps, {
  setWalletAddress,
  login,
})(ConnectWallet);
