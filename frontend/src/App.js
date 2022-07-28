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
import { useLocation } from "react-router";

import {
  beforeWallet,
  setWalletAddress,
} from "./components/wallet/wallet.action";

const App = React.memo((props) => {
  useGaTracker();
  const tawkToPropertyId = ENV.tawkToPropertyId;
  const tawkToKey = ENV.tawkToKey;
  const location = useLocation();
  console.log(location.pathname);
  useEffect(async () => {
    tawkTo(tawkToPropertyId, tawkToKey);
  }, [ENV]);

 
  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    const accountWasChanged = (accounts) => {
      alert(window.ethereum.isConnected())
      setWallet(accounts[0]);
    };
    const getAndSetAccount = async () => {
      const changedAccounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (changedAccounts.length === 0) {
        toast.error("you are not connected with metamask");
      }
      setWallet(changedAccounts[0])

    };
    const clearAccount = () => {
      console.log("account cleared======>")
      alert("account disconnected")
    };
    window.ethereum.on("accountsChanged", accountWasChanged);
    window.ethereum.on("connect", getAndSetAccount);
    window.ethereum.on("disconnect", ()=>alert("account cleared"));
    window.ethereum.request({ method: "eth_requestAccounts" }).then(
      (accounts) => {
        setWallet(accounts[0])
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
  const setWallet = (address) => {
    props.beforeWallet();
    props.setWalletAddress(address);
  };

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
                  access={route.access}
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  setWalletAddress,
  beforeWallet,
})(App);
