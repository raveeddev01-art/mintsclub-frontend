import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";

const getMetaplex = (ENDPOINT: string = "devnet") => {
  const connection = new Connection(clusterApiUrl(ENDPOINT as Cluster));
  console.log(
    "🚀 ~ file: config.ts ~ line 6 ~ getMetaplex ~ connection",
    connection
  );

  const metaplex = new Metaplex(connection);
  console.log(
    "🚀 ~ file: config.ts ~ line 12 ~ getMetaplex ~ metaplex",
    metaplex
  );

  return metaplex;
};

export { getMetaplex };
