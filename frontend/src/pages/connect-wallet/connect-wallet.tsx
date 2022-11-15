import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { setWalletAddress, setBlockchainType } from '../wallet/wallet.action';
import { login } from '../../Components/User/user.action';
import { useHistory, useLocation } from 'react-router-dom';

import './connect-wallet.scss';
import { connectModal } from '../../assets/assets';
import {
	connectMetamask,
	handleSign,
	getChainId,
	switchNetworkToChainId,
} from '../../utils/web3';

import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { useInsertData } from '../../hooks/Common';
import { ENV } from '../../config/config';
import errorHandler from '../../context/errorHandler/ErrorHandlerContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import {
	connectWallet,
	signMessageFromUserForAlgorand,
} from '../../utils/algorand';

// require("@solana/wallet-adapter-react-ui/styles.css");

const ConnectWallet = (props: any) => {
	const [disabled, setDisabled] = useState(false);
	const history = useHistory();
	const location: any = useLocation();
	const [connectedAddress, setConnectedAddres] = useState<any>(null);

	const { setError } = useContext(errorHandler);

	const wallet = useWallet();

	useEffect(() => {
		if (props.error) {
			toast.error(props.error.message);
		}
	}, [props.error]);

	//   if (detectMobile() && !window?.ethereum) {
	//     window.open(
	//       "https://metamask.app.link/dapp/mintsclub-v2-marketplace.invo.zone/"
	//     );
	//   }else {
	//     // if (getChainId !== ENV.chainId) {
	//     //   try {
	//     //     await switchNetworkToChainId(ENV.chainId);
	//     //   } catch (error:any) {
	//     //     return toast.error(error.message);
	//     //   }
	//     // }
	//     let connectedAddress: any = false;
	//     if (detectMobile()) {
	//       connectedAddress = await getWalletAddress();
	//     } else {
	//       try {
	//         connectedAddress = await connectWithMetamask();
	//       } catch (err: any) {
	//         return "";
	//       }
	//     }
	//     login(connectedAddress);
	//     console.log(connectedAddress, "connectedAddress");
	//   }
	// };

	const onSuccessLogin = (data: any) => {
		if (data.data.success) {
			ENV.encryptUserData(data.data.data);
			history.push(location?.state ? location.state : '/create');
		} else {
			setError(data.data.message);
		}
	};

	const { mutate: authAlgo } = useInsertData('auth/login/', onSuccessLogin);

	const { mutate: auth } = useInsertData('auth/login/', onSuccessLogin);

	const detectMobile = () => {
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			return true;
		} else {
			return false;
		}
	};

	const signMessageFromUserForSolana = async (nounce: number) => {
		try {
			if (wallet.connected) {
				const data = new TextEncoder().encode(
					`I am signing my one-time nonce: ${nounce}`
				);
				const signature: any =
					wallet.signMessage && (await wallet.signMessage(data));

				const signatureBase64 = Buffer.from(signature).toString('base64');
				return { publicAddress: connectedAddress, signature: signatureBase64 };
			}
		} catch (err) {
			console.log(
				'🚀 ~ file: connect-wallet.tsx ~ line 146 ~ signMessageFromUser ~ err',
				err
			);
		}
	};
	/////////////////////////////////////

	///Validate
	const onSuccessValidateUser = async (data: any) => {
		const response = data.data;
		let selectedBlockchainType = undefined;
		if (response.success) {
			if (
				response.blockchainType === 'ethereum' ||
				response.blockchainType === 'polygon' ||
				response.blockchainType === 'bsc'
			) {
				selectedBlockchainType = 'ethereum';
				if (response?.users?.length > 0) {
					const res = await handleSign(response?.users[0].nounce);
					authenticate({
						...res,
						blockchainType: response?.users[0]?.blockchainType,
					});
					return;
				}
			}

			if (response.blockchainType === 'solana') {
				selectedBlockchainType = 'solana';
				if (response?.users?.length > 0) {
					const res = await signMessageFromUserForSolana(
						response?.users[0].nounce
					);
					authenticate({ ...res, blockchainType: 'solana' });
					return;
				}
			}

			if (response.blockchainType === 'algorand') {
				selectedBlockchainType = 'algorand';
				if (response?.users?.length > 0) {
					const res = await signMessageFromUserForAlgorand(
						response?.users[0].nounce,
						props.connectedAddress
					);

					authenticate({ ...res, blockchainType: 'algorand' });
					return;
				}
			}

			handleSignUp({
				address: connectedAddress,
				blockchainType: props.blockchainType,
			});
		}

		return setError(response.message);
	};
	const { mutate: validateUser } = useInsertData(
		`users/validate/${connectedAddress}`,
		onSuccessValidateUser
	);

	///Sign up
	const onSuccessSignUp = async (data: any) => {
		if (data.data.success) {
			const res = await handleSign(data?.data?.data?.nounce);
			authenticate({ ...res, blockchainType: data?.data?.data.blockchainType });
		} else {
			setError(data.data.message);
		}
	};

	const { mutate: handleSignUp } = useInsertData(
		'users/createUser',
		onSuccessSignUp
	);
	///Authenticate
	const onSuccessAuthentication = (data: any) => {
		if (data.data.success) {
			ENV.encryptUserData(data.data.data);
			history.push(location?.state ? location.state : '/');
		} else {
			setError(data.data.message);
		}
	};
	const { mutate: authenticate } = useInsertData(
		'users/authenticate',
		onSuccessAuthentication,
		(err: any) => toast.error(err?.message)
	);

	// CONNECT ALGO WALLET
	const connectAlgoWallet = async () => {
		const addr = await connectWallet();
		setConnectedAddres(addr?.[0]);
		props.setWalletAddress(addr?.[0]);
		props.setBlockchainType('algorand');
		return addr?.[0];
	};
	const ethereumFunc = async (status: any, chainId: any) => {
		if (detectMobile() && !window?.ethereum) {
			return window.open(
				'https://metamask.app.link/dapp/mintsclub-v3-marketplace.invo.zone/'
			);
		}
		const currentChainId = await getChainId();
		if (chainId !== currentChainId) {
			await switchNetworkToChainId(chainId);
		}
		await wallet.disconnect();
		props.setBlockchainType(status);
		const publicAddress: any = await connectMetamask();
		setConnectedAddres(publicAddress);
		props.setWalletAddress(publicAddress);
		validateUser({ blockchainType: status });
	};

	const CHAINS = [
		{
			title: 'Ethereum',
			key: 'ethereum',
			wallets: [
				{
					name: 'Metamask Ethereum',
					icon: connectModal.metaImg,
					functionality: async () => {
						await ethereumFunc('ethereum', 5);
					},
				},
			],
		},
		{
			title: 'Polygon',
			key: 'polygon',
			wallets: [
				{
					name: 'Metamask Polygon',
					icon: connectModal.metaImg,
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					functionality: async () => {
						await ethereumFunc('polygon', 80001);
					},
				},
			],
		},
		{
			title: 'BSC',
			key: 'binance',
			wallets: [
				{
					name: 'Metamask BSC',
					icon: connectModal.metaImg,
					functionality: async () => {
						await ethereumFunc('bsc', 97);
					},
				},
			],
		},
		{
			title: 'Solana',
			key: 'solana',
			wallets: [
				{
					name: 'Solana',
					icon: connectModal.phantomImg,
					functionality: async () => {
						await wallet.disconnect();
						wallet.select('Phantom' as WalletName);
					},
				},
			],
		},

		{
			title: 'Algorand',
			key: 'algorand',
			wallets: [
				{
					name: 'Algorand',
					icon: connectModal.algorandImg,
					functionality: async () => {
						const res = await connectAlgoWallet();
						if (res) {
							validateUser({ blockchainType: 'algorand' });
						}
					},
				},
			],
		},
	];

	useEffect(() => {
		if (wallet.publicKey && wallet.connected) {
			props.setBlockchainType('solana');
			props.setWalletAddress(wallet.publicKey?.toBase58());
			setConnectedAddres(wallet.publicKey?.toBase58());
			if (connectedAddress) {
				validateUser({ blockchainType: 'solana' });
			}
		}
	}, [wallet.connected, wallet.publicKey]);

	return (
		<Container>
			<div className="connect-wallet-container">
				<h3 className="modal-title">Connect Your Wallet</h3>
				<p className="modal-description">
					Select what network and wallet you want to connect
				</p>
				<div className="model-tabs">
					<Tabs defaultActiveKey="ethereum" id="uncontrolled-tab-example">
						{CHAINS.map((chain) => (
							<Tab eventKey={chain.key} key={chain.key} title={chain.title}>
								{chain.wallets?.map((wallet) => (
									<div className="tab-inner-content" key={chain.key}>
										<button
											className="wallet-button"
											onClick={wallet.functionality}
										>
											<img src={wallet.icon} alt="wallet-icon" />
											{wallet.name}
										</button>
									</div>
								))}
							</Tab>
						))}
					</Tabs>
					{CHAINS && CHAINS.length > 6 && (
						<button className="show-more-btn">Show More</button>
					)}
				</div>
			</div>

			{/* <WalletDisconnectButton /> */}
			{/* Your app's components go here, nested within the context providers. */}
		</Container>
	);
};

const mapStateToProps = (state: any) => ({
	error: state.error,
	blockchainType: state.wallet.blockchainType,
	connectedAddress: state.wallet.connectedAddress,
});

export default connect(mapStateToProps, {
	setBlockchainType,
	setWalletAddress,
	login,
})(ConnectWallet);
