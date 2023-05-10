/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { setWalletAddress, setBlockchainType } from '../wallet/wallet.action';
import { login } from '../../Components/User/user.action';
import { useHistory, useLocation } from 'react-router-dom';
import FullPageLoader from '../../Components/FullPageLoader/FullPageLoader';

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
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

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

	const detectMobile = async () => {
		const isMobile =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			);
		setIsButtonDisabled(false);
		return isMobile;
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
				history.push(location?.state ? location.state : '/');
				console.log(
					'🚀 ~ file: connect-wallet.tsx:109 ~ signMessageFromUserForSolana ~ state:'
				);

				return {
					publicAddress: await connectedAddress,
					signature: signatureBase64,
				};
			}
		} catch (err: any) {
			toast.error(err.message);
			console.log(
				'🚀 ~ file: connect-wallet.tsx ~ line 146 ~ signMessageFromUser ~ err',
				err.message
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
					const res = await handleSign(
						response?.users[0].nounce,
						setIsButtonDisabled
					);
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
						await response?.users[0].nounce,
						await props.connectedAddress
					);
					authenticate({ ...res, blockchainType: 'algorand' });
					history.push(location?.state ? location.state : '/');
					return;
				}
			}

			if (await connectedAddress) {
				handleSignUp({
					address: connectedAddress,
					blockchainType: props.blockchainType,
				});
			}
		}
		return setError(response.message);
	};
	const { mutate: validateUser, isLoading } = useInsertData(
		`users/validate/${connectedAddress}`,
		onSuccessValidateUser
	);
	///Sign up
	const onSuccessSignUp = async (data: any) => {
		if (data.data.success) {
			if (
				data?.data?.data?.blockchainType !== 'solana' &&
				data?.data?.data?.blockchainType !== 'algorand'
			) {
				const res = await handleSign(
					data?.data?.data?.nounce,
					setIsButtonDisabled
				);
				authenticate({
					...res,
					blockchainType: data?.data?.data.blockchainType,
				});
			} else if (data?.data?.data?.blockchainType === 'solana') {
				const res = await signMessageFromUserForSolana(
					data?.data?.data?.nounce
				);
				authenticate({
					...res,
					blockchainType: data?.data?.data.blockchainType,
				});
			}
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
			history.push(location?.state ? location.state : '/');
			ENV.encryptUserData(data.data.data);
		} else {
			setError(data.data.message);
		}
	};
	const { mutate: authenticate } = useInsertData(
		'users/authenticate',
		onSuccessAuthentication,
		(err: any) => {
			toast.error(err?.message);
		}
	);

	// CONNECT ALGO WALLET
	const connectAlgoWallet = async () => {
		try {
			const addr = await connectWallet(setIsButtonDisabled);
			await setConnectedAddres(addr?.[0]);
			await props.setWalletAddress(addr?.[0]);
			await props.setBlockchainType('algorand');
			return addr?.[0];
		} catch (error: any) {
			toast.error(error.message);
			setIsButtonDisabled(false);
		}
	};
	const connectPhantomWallet = async () => {
		try {
			if (await detectMobile()) {
				toast.info('Phantom is coming soon for Mobile & I-Pad');
				setIsButtonDisabled(false);
			} else {
				if (wallet.wallets[0].readyState === 'NotDetected') {
					toast.error('Please install Phantom to connect to the Marketplace');
					setIsButtonDisabled(false);
				} else {
					// localStorage.clear();
					const itemToKeep = 'walletName';
					for (const key in localStorage) {
						if (localStorage.hasOwnProperty(key) && key !== itemToKeep) {
							localStorage.removeItem(key);
						}
					}
					await wallet.select(wallet.wallets[0].adapter.name);
					if (wallet.publicKey && wallet.connected) {
						setConnectedAddres(wallet.publicKey?.toBase58());
						props.setBlockchainType('solana');
						props.setWalletAddress(wallet.publicKey?.toBase58());
						setIsButtonDisabled(false);
					} else {
						// toast.info(
						// 	'Please Click Again on Wallet-Icon to Approve the account',
						// 	{
						// 		position: 'top-center',
						// 		autoClose: 4000,
						// 		hideProgressBar: false,
						// 		pauseOnHover: true,
						// 		draggable: true,
						// 		theme: 'light',
						// 	}
						// );
						return setIsButtonDisabled(false);
					}
				}
			}
		} catch (error: any) {
			console.log(
				'🚀 ~ file: connect-wallet.tsx:269 ~ connectPhantomWal ~ error:',
				error
			);
			toast.error(error.message);
		}
	};
	const connectSolflareWallet = async () => {
		try {
			if (await detectMobile()) {
				toast.info('Solflare is coming soon for Mobile & I-Pad');
				setIsButtonDisabled(false);
			} else {
				const itemToKeep = 'walletName';
				for (const key in localStorage) {
					if (localStorage.hasOwnProperty(key) && key !== itemToKeep) {
						localStorage.removeItem(key);
					}
				}
				await wallet.select(wallet.wallets[1].adapter.name);

				if (wallet.publicKey && wallet.connected) {
					props.setBlockchainType('solana');
					props.setWalletAddress(wallet.publicKey?.toBase58());
					setConnectedAddres(wallet.publicKey?.toBase58());
					setIsButtonDisabled(false);
				} else {
					// toast.info(
					// 	'Please Click Again on Wallet-Icon to Approve the account',
					// 	{
					// 		position: 'top-center',
					// 		autoClose: 4000,
					// 		hideProgressBar: false,
					// 		pauseOnHover: true,
					// 		draggable: true,
					// 		theme: 'light',
					// 	}
					// );
					setIsButtonDisabled(false);
				}
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};
	const ethereumFunc = async (status: any, chainId: any) => {
		try {
			if ((await detectMobile()) && !window?.ethereum) {
				setIsButtonDisabled(false);
				const connected = window.open(
					'https://metamask.app.link/dapp/mintsclub-v3-marketplace.invo.zone/'
				);
				if (connected) {
					setIsButtonDisabled(false);
				}
				return connected;
			}
			await props.setBlockchainType(status);
			const publicAddress: any = await connectMetamask();
			if (!publicAddress) {
				setIsButtonDisabled(false);
			}
			const currentChainId = await getChainId();
			if (chainId !== currentChainId) {
				const switchNetworkResponse = await switchNetworkToChainId(
					chainId,
					setIsButtonDisabled
				);
				if (!switchNetworkResponse) {
					return false;
				}
			}
			setConnectedAddres(publicAddress);
			await props.setWalletAddress(publicAddress);
			validateUser({ blockchainType: status });
		} catch (error: any) {
			setIsButtonDisabled(false);
			console.log(
				'🚀 ~ file: connect-wallet.tsx:298 ~ ethereumFunc ~ error',
				error.message
			);
		}
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
						await ethereumFunc(
							'ethereum',
							ENV.environment === 'development' ? 5 : 1
						);
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
						await ethereumFunc(
							'polygon',
							ENV.environment === 'development' ? 80001 : 137
						);
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
						await ethereumFunc(
							'bsc',
							ENV.environment === 'development' ? 97 : 56
						);
					},
				},
			],
		},
		{
			title: 'Solana',
			key: 'solana',
			wallets: [
				{
					name: 'Phantom',
					icon: connectModal.phantomImg,
					functionality: async () => {
						await connectPhantomWallet();
						if (wallet.connected) {
							validateUser({ blockchainType: 'solana' });
						}
					},
				},
				{
					name: 'Solflare',
					icon: connectModal.solflareImg,
					functionality: async () => {
						await connectSolflareWallet();
						if (wallet.connected) {
							validateUser({ blockchainType: 'solana' });
						}
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
						} else {
							setIsButtonDisabled(false);
						}
					},
				},
			],
		},
	];

	return (
		<Container>
			{isLoading === true ? <FullPageLoader /> : null}
			<div className="connect-wallet-container">
				<h3 className="modal-title">Connect Your Wallet</h3>
				<p className="modal-description">
					Select what network and wallet you want to connect
				</p>
				<div className="model-tabs">
					<Tabs defaultActiveKey="ethereum" id="uncontrolled-tab-example">
						{CHAINS.map((chain) => (
							<Tab eventKey={chain.key} key={chain.key} title={chain.title}>
								<div className="wrap-content">
									{chain.wallets?.map((wallet, index) => (
										<div className="tab-inner-content" key={index}>
											<button
												disabled={isButtonDisabled}
												className="wallet-button"
												onClick={() => {
													wallet.functionality();
													setIsButtonDisabled(true);
													if (window.navigator.onLine === false) {
														setIsButtonDisabled(false);
														console.log('Disconnected...so sad!!!');
													}
												}}
											>
												<img src={wallet.icon} alt="wallet-icon" />
												{wallet.name}
											</button>
										</div>
									))}
								</div>
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
