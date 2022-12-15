import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';

export const UseWalletChange = () => {
	const wallet = useWallet();
	console.log(
		'🚀 ~ file: wallet-change.tsx ~ line 6 ~ useWalletChange ~ wallet',
		wallet
	);

	useEffect(() => {
		console.log('wallet.publicKey', wallet.publicKey?.toBase58());
	}, [wallet.publicKey]);
	return null;
};
