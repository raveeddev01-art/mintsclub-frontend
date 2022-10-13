import { Metaplex } from "@metaplex-foundation/js";
import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";

const getMetaplex = (ENDPOINT: string = "devnet") => {
  const connection = new Connection(clusterApiUrl(ENDPOINT as Cluster));
  console.log(
    "🚀 ~ file: config.ts ~ line 6 ~ getMetaplex ~ connection",
    connection
  );

  const metaplex = new Metaplex(connection);

  return metaplex;
};

export { getMetaplex };
