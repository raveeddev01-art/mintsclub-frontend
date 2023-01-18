import React, {
	createContext,
	Suspense,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import routes from './routes';
import { PrivateRoute } from './privateRoute';
import { Switch } from 'react-router-dom';
import FullPageLoader from './Components/FullPageLoader/FullPageLoader';
import LoadingText from './context/loadingText/LoadingTextContext';
import tawkTo from 'tawkto-react';
import { ENV } from './config/config';
import './App.scss';
import useGaTracker from './gaTracker/gaTracket';
import { connect } from 'react-redux';
import { beforeWallet, setWalletAddress } from './pages/wallet/wallet.action';
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { UseWalletChange } from './pages/wallet-change/wallet-change';
import { clusterApiUrl } from '@solana/web3.js';
import {
	PhantomWalletAdapter,
	SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
require('@solana/wallet-adapter-react-ui/styles.css');
import Socket from './utils/socket';
import SocketContext from './contexts/SocketContext';

const App = React.memo((props) => {
	const network = ENV.networkCluster;
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);
	const wallets = useMemo(
		() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
		[network]
	);
	const [socket, setSocket] = useState(undefined);
	const { loadingText } = useContext(LoadingText);
	console.log('🚀 ~ file: App.js:36 ~ App ~ socket', socket);

	useGaTracker();

	useEffect(async () => {
		tawkTo(ENV.tawkToPropertyId, ENV.tawkToKey);
		if (ENV.getUserKeys('address')?.address) {
			props.beforeWallet();
			props.setWalletAddress(ENV.getUserKeys('address')?.address);
		}
	}, [ENV]);

	useEffect(() => {
		if (!socket) {
			const connectedSocket = Socket.connectSocket();
			setSocket(connectedSocket);
		}
		return () => {
			if (socket) {
				socket.disconnect();
			}
		};
	}, [ENV.websocketURL]);

	return (
		<SocketContext.Provider value={socket}>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider wallets={wallets} autoConnect>
					<WalletModalProvider>
						<React.Fragment>
							<Suspense fallback={<FullPageLoader message={loadingText} />}>
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
						<UseWalletChange />
					</WalletModalProvider>
				</WalletProvider>
			</ConnectionProvider>
		</SocketContext.Provider>
	);
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
	setWalletAddress,
	beforeWallet,
})(App);
