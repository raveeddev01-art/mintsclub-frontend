import React, { Suspense, useState,useEffect } from "react";
import routes from "./routes";
import { PrivateRoute } from "./privateRoute";
import { Switch } from "react-router-dom";
import FullPageLoader from "./components/full-page-loader/full-page-loader";
import { useHistory } from "react-router";
import tawkTo from "tawkto-react";
import { ENV } from "./config/config";
import "./App.css";
import {getWalletAddress} from './utils/web3'
import { toast } from "react-toastify";
// import 'swiper/swiper-bundle.css';

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const tawkToPropertyId = ENV.tawkToPropertyId;
  const tawkToKey = ENV.tawkToKey;
const history=useHistory()
  useEffect(() => {
    tawkTo(tawkToPropertyId, tawkToKey);
  }, [ENV]);

  // ///set Interval
  // useEffect(() => {

  //   const interval = setInterval(() => {
  //     handleMetamaskStatus();
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, [walletAddress]);


  // const handleMetamaskStatus = async () => {
  //   const address = await getWalletAddress();
  
  //   if (walletAddress) {
  //     if (walletAddress !== address) {
  //       toast.info("Please login with new address")
  //      history.push('/login')
  //     }
  //   } else {
  //     const address = await getWalletAddress();
  //     setWalletAddress(address);
  //   }
  //   // }
  // };
  // console.log()

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
                  access={true}
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
};

export default App;
