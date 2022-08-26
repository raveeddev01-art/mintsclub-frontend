import React, { Suspense, useEffect, useContext } from "react";
import routes from "./routes";
import { PrivateRoute } from "./privateRoute";
import { Switch } from "react-router-dom";
import FullPageLoader from "./Components/FullPageLoader/FullPageLoader";
import tawkTo from "tawkto-react";
import { ENV } from "./config/config";
import "./App.css";
import { toast } from "react-toastify";
import useGaTracker from "./gaTracker/gaTracket";
import { connect } from "react-redux";
import { beforeWallet, setWalletAddress } from "./pages/wallet/wallet.action";

const App = React.memo((props) => {
  useGaTracker();
  const tawkToPropertyId = ENV.tawkToPropertyId;
  const tawkToKey = ENV.tawkToKey;

  useEffect(async () => {
    tawkTo(tawkToPropertyId, tawkToKey);
  }, [ENV]);

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    const accountWasChanged = (accounts) => {
      setWallet(accounts[0]);
    };

    const getAndSetAccount = async () => {
      const changedAccounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (changedAccounts.length === 0) {
        toast.error("you are not connected with metamask");
      }
      setWallet(changedAccounts[0]);
    };
    window.ethereum.on("accountsChanged", accountWasChanged);
    window.ethereum.on("connect", getAndSetAccount);
    // window.ethereum.on("disconnect", ()=>alert("account cleared"));
    window.ethereum.request({ method: "eth_requestAccounts" }).then(
      (accounts) => {
        setWallet(accounts[0]);
      },
      (error) => {}
    );
    return () => {};
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
