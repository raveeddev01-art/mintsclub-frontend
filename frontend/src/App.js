import React, { Suspense, useEffect } from "react";
import routes from "./routes";
import { PrivateRoute } from "./privateRoute";
import { Switch } from "react-router-dom";
import FullPageLoader from "./components/full-page-loader/full-page-loader";
import { useHistory } from "react-router";
import tawkTo from "tawkto-react";
import { ENV } from "./config/config";
import "./App.css";
import { getWalletAddress } from "./utils/web3";
import { toast } from "react-toastify";
import useGaTracker from "./gaTracker/gaTracket";
import { connect } from "react-redux";

import { beforeWallet, setWalletAddress } from "./components/wallet/wallet.action";

const App = React.memo((props) => {
  useGaTracker();
  let walletAddress = false;
  const tawkToPropertyId = ENV.tawkToPropertyId;
  const tawkToKey = ENV.tawkToKey;
  const history = useHistory();
  useEffect(async () => {
    tawkTo(tawkToPropertyId, tawkToKey);
  }, [ENV]);

  // ///set Interval
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleMetamaskStatus();
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  const handleMetamaskStatus = async () => {
    const address = await getWalletAddress();
    if (walletAddress) {
      if (walletAddress !== address || !address) {
        toast.info("Please sign in  with new connected address");
        walletAddress = address;
        // setWalletAddress(address)
        localStorage.clear();
        history.push("/login");
      }
    } else {
      const address = await getWalletAddress();
      walletAddress = address;
      // setWalletAddress(address);
    }
    // }
  };
  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    const accountWasChanged = (accounts) => {
      setWallet(accounts[0])
      // setMetamaskWalletAddress(accounts[0]);
      // logout();
    };
    const getAndSetAccount = async () => {
      const changedAccounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (changedAccounts.length === 0) {
        toast.error("you are not connected with metamask");
      }
      // setMetamaskWalletAddress(changedAccounts[0]);
    };
    const clearAccount = () => {
      // logout();
    };
    window.ethereum.on("accountsChanged", accountWasChanged);
    window.ethereum.on("connect", getAndSetAccount);
    window.ethereum.on("disconnect", clearAccount);
    window.ethereum.request({ method: "eth_requestAccounts" }).then(
      (accounts) => {

        // setMetamaskWalletAddress(accounts[0]);
        // console.log(accounts[0], "accounts");
      },
      (error) => {}
    );
    return () => {
      // Return function of a non-async useEffect will clean up on component leaving screen, or from re-reneder to due dependency change
      // window.ethereum.off('accountsChanged', accountWasChanged);
      // window.ethereum.off('connect', getAndSetAccount);
      // window.ethereum.off('disconnect', clearAccount);
    };
  }, []);
  const setWallet=(address)=>{
    props.beforeWallet()
    props.setWalletAddress(address)
  }

  return (
    <React.Fragment>
      <Suspense fallback={<FullPageLoader />}>
        <div>
          <Switch>
            {routes.map((route, index) => {
              return (
                <PrivateRoute
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  access={
                    ENV.getUserKeys("_id")._id ||
                    route.path === "/login" ||
                    route.path === "Signup"
                      ? true
                      : false
                  }
                  component={(props) => (
                    <route.layout {...props} title={route.title}>
                      <route.component {...props} />
                    </route.layout>
                  )}
                />
              );
            })}
          </Switch>
        </div>
      </Suspense>
    </React.Fragment>
  );
});

const mapStateToProps = (state) =>( {
  
});

export default connect(mapStateToProps, {
  setWalletAddress,
  beforeWallet
})(App);

