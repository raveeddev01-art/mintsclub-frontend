import React from "react";
import ReactDOM from "react-dom";
import store from "./store/store";
import AlertNotification from "./jsx/components/common/alertNotification";
import { Provider } from "react-redux";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";

ReactDOM.render(
   
      <Provider store={store}>
      <AlertNotification />
      <SimpleReactLightbox>
         <App />
      </SimpleReactLightbox>
      </Provider>,
   document.getElementById("root")
);
reportWebVitals();
