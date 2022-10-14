import React, { Suspense, useEffect, useMemo } from "react";
import routes from "./routes";
import { PrivateRoute } from "./privateRoute";
import { Switch } from "react-router-dom";
import FullPageLoader from "./Components/FullPageLoader/FullPageLoader";
import tawkTo from "tawkto-react";
import { ENV } from "./config/config";
import "./App.scss";
import useGaTracker from "./gaTracker/gaTracket";
import { connect } from "react-redux";
import { beforeWallet, setWalletAddress } from "./pages/wallet/wallet.action";
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
require('@solana/wallet-adapter-react-ui/styles.css');

const App = React.memo((props) => {
	const network = 'devnet';
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);
	const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

	useGaTracker();

  useEffect(async () => {
    tawkTo(ENV.tawkToPropertyId, ENV.tawkToKey);
    if(ENV.getUserKeys("address")?.address){
      props.beforeWallet()
      props.setWalletAddress(ENV.getUserKeys("address")?.address)
    }
  }, [ENV]);
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
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
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
	setWalletAddress,
	beforeWallet,
})(App);
