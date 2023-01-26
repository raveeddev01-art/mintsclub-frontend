import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import darkModeContext from '../../context/darkmode/DarkModeContext';
import { ENV } from '../../config/config';
export const UseWalletChange = (connectedAddress: any) => {
	const wallet = useWallet();
	const history = useHistory();
	const location = useLocation();
	const { darkMode, setDarkMode } = useContext(darkModeContext);

	console.log(
		'🚀 ~ file: wallet-change.tsx ~ line 6 ~ useWalletChange ~ wallet',
		wallet
	);
	useEffect(() => {
		console.log('wallet.publicKey===>', wallet.publicKey?.toBase58());
		if (
			wallet.publicKey?.toBase58() &&
			connectedAddress &&
			connectedAddress !== wallet.publicKey?.toBase58() &&
			location.pathname !== '/connect-wallet' &&
			ENV?.getUserKeys('blockchainType')?.blockchainType === 'solana'
		) {
			// toast.info('Please login with new connected wallet');
			localStorage.clear();
			localStorage.setItem('theme', darkMode ? 'dark' : 'light');
			return history.push('/connect-wallet');
		}
	}, [wallet.publicKey]);

	useEffect(() => {
		// const interval = setInterval(() => {
		// 	console.log('interval==>', {
		// 		connected: wallet.connected,
		// 		key: wallet.publicKey?.toBase58(),
		// 		blockchainType: ENV.getUserKeys('blockchainType')?.blockchainType,
		// 	});
		// 	if (
		// 		!wallet.connected &&
		// 		ENV.getUserKeys('blockchainType')?.blockchainType === 'solana'
		// 	) {
		// 		// localStorage.clear();
		// 		// localStorage.setItem('theme', darkMode ? 'dark' : 'light');
		// 		// return history.push('/connect-wallet');
		// 	}
		// }, 3000);
		// return () => clearInterval(interval);
	}, []);
	return null;
};
