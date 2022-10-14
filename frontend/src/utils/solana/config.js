import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
// const { Metaplex } = require("@metaplex-foundation/js");

const getMetaplex = (ENDPOINT = "devnet") => {
  const connection = new Connection(clusterApiUrl(ENDPOINT));
  console.log(
    "🚀 ~ file: config.ts ~ line 6 ~ getMetaplex ~ connection",
    connection
  );

	const metaplex = new Metaplex(connection);
	console.log(
		'🚀 ~ file: config.ts ~ line 12 ~ getMetaplex ~ metaplex',
		metaplex
	);

	return metaplex;
};

export { getMetaplex };
