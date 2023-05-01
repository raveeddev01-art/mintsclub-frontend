import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import darkModeContext from '../../context/darkmode/DarkModeContext';
import { toast } from 'react-toastify';
import { ENV } from '../../config/config';
import { getNetworkNameByChainId } from '../web3';
import { useLocation } from 'react-router-dom';

export const ListenMetaMaskAccs = () => {
	const { darkMode } = useContext(darkModeContext);
	const history = useHistory();
	const location = useLocation();
	useEffect(async () => {
		if (!window.ethereum) {
			return;
		}
		const accountWasChanged = () => {
			if (location.pathname !== '/connect-wallet' && validateChain()) {
				toast.info('Please login with new connected address');
				logout();
			}
		};
		const validateChain = () => {
			let blockChainType = ENV.getUserKeys('blockchainType')?.blockchainType;

			return (
				blockChainType === 'ethereum' ||
				blockChainType === 'polygon' ||
				blockChainType === 'bsc'
			);
		};
		const logout = () => {
			localStorage.clear();
			localStorage.setItem('theme', darkMode ? 'dark' : 'light');
			history.push('/connect-wallet');
		};
		const changeAccount = await window.ethereum.on(
			'accountsChanged',
			accountWasChanged
		);
		await window.ethereum.on('chainChanged', (_chainId) => {
			if (location.pathname !== '/connect-wallet' && validateChain()) {
				toast.info('please login with new connected network');
				logout();
			}
		});

		/////Metamask listeners

		// const getAndSetAccount = async () => {
		//   const changedAccounts = await window.ethereum.request({
		//     method: "eth_requestAccounts",
		//   });
		//   if (changedAccounts.length === 0) {
		//     toast.error("you are not connected with metamask");
		//   }
		//   setWallet(changedAccounts[0]);
		// };
		// window.ethereum.on("connect", () =>getAndSetAccount() );
		// window.ethereum.on("disconnect", ()=>alert("account cleared"));
		// window.ethereum.request({ method: "eth_requestAccounts" }).then(
		//   (accounts) => {
		//     // setWallet(accounts[0]);
		//   },
		//   (error) => {}
		// );
		return () => {
			// unexpected empty errow function
		};
	}, []);
};

export const verifyOwnerShip = (connectedAddress, addressToVerify) => {
	if (!isUserLoggedIn()) {
		toast.info('please log in with wallet');
		return logout();
	}
	if (connectedAddress.toUpperCase() === addressToVerify?.toUpperCase()) {
		return true;
	} else {
		toast.info('you are not owner');
		return logout();
	}
};
export const isUserLoggedIn = (history, loggedInType) => {
	const currentPath = window.location.pathname;
	let blockChainType = ENV.getUserKeys('blockchainType')?.blockchainType;
	if (blockChainType && loggedInType === blockChainType) {
		return true;
	} else {
		toast.info(
			`Please login ${
				loggedInType !== blockChainType
					? `with ${loggedInType} network`
					: !blockChainType
					? `with ${loggedInType} network`
					: `with ${loggedInType} network`
			}  to continue`,
			{
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'light',
				closeButton: true,
			}
		);
		if (!blockChainType) {
			history.push('/connect-wallet', currentPath);
		}

		return false;
	}
};
