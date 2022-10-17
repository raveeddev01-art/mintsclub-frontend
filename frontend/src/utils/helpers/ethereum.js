import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import darkModeContext from '../../context/darkmode/DarkModeContext';
import { toast } from 'react-toastify';
import { ENV } from '../../config/config';

export const ListenMetaMaskAccs = () => {
	const { darkMode } = useContext(darkModeContext);
	const history = useHistory();
	useEffect(() => {
		if (!window.ethereum) {
			return;
		}
		const accountWasChanged = () => {
			if (ENV.getUserKeys('blockchainType')?.blockchainType === 'ethereum') {
				toast.info('Please login with new connected address');
				localStorage.clear();
				localStorage.setItem('theme', darkMode ? 'dark' : 'light');
				history.push('/connect-wallet');
			}
		};
		window.ethereum.on('accountsChanged', accountWasChanged);

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
		//     console.log("accounts");
		//   },
		//   (error) => {}
		// );
		return () => {
			// unexpected empty errow function
		};
	}, []);
};
