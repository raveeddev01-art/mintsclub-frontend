import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimeAgo from 'javascript-time-ago';
import { AppContextProvider } from './context/AppContextProvider';
import en from 'javascript-time-ago/locale/en.json';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';
import { UseWalletChange } from './pages/wallet-change/wallet-change';

const queryClient = new QueryClient();
TimeAgo.addDefaultLocale(en);

toast.configure({
	position: toast.POSITION.TOP_RIGHT,
	pauseOnHover: true,
	newestOnTop: true,
	autoClose: 3000,
});

ReactDOM.render(
	<Provider store={store}>
		<AppContextProvider>
			<ToastContainer />
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<App />
					{/* <UseWalletChange /> */}
					{/* <h1>testing</h1> */}
					<ReactQueryDevtools position="bottom-left" />
				</QueryClientProvider>
			</BrowserRouter>
		</AppContextProvider>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
