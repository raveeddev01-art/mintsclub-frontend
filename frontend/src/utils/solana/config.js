import { Cluster, clusterApiUrl, Connection } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';
import { ENV } from '../../config/config';
// const { Metaplex } = require("@metaplex-foundation/js");

const getMetaplex = (ENDPOINT = ENV.networkCluster) => {
	const connection = new Connection(clusterApiUrl(ENDPOINT));
	const metaplex = new Metaplex(connection);
	return metaplex;
};

export { getMetaplex };
