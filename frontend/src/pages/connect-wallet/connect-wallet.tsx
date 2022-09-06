import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { setWalletAddress } from "../wallet/wallet.action";
import { login } from "../../Components/User/user.action";
import { useHistory, useLocation } from "react-router-dom";

import "./connect-wallet.scss";
import { connectModal } from "../../assets/assets";
import {
  signRequest,
  connectWithMetamask,
  getChainId,
  switchNetworkToChainId,
  getWalletAddress,
  validateNetwork,
} from "../../utils/web3";
import { ENV } from "../../config/config";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useInsertData } from "../../hooks/Common";
import { callbackify } from "util";

const ConnectWallet = (props: any) => {
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
  const location: any = useLocation();
  useEffect(() => {
    if (props.error) {
      toast.error(props.error.message);
    }
  }, [props.error]);

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
    ENV.encryptUserData(data.data.data);
    history.push(location?.state ? location.state : "/");
  };
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
  const walletButtons = [
    {
      name: "MetaMask",
      img: connectModal.metaImg,
      type: "ethereum",
      func: () => connectMetamaskCall(),
    },
    // {
    //   name: "Coinbase Wallet",
    //   img: connectModal.coinBaseImg,
    // },
    // {
    //   name: "WalletConnect",
    //   img: connectModal.wcImg,
    // },
    // {
    //   name: "Glow",
    //   img: connectModal.glowImg,
    // },
    // {
    //   name: "Phantom",
    //   img: connectModal.phantomImg,
    // },
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
            {walletButtons.length > 6 && (
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
