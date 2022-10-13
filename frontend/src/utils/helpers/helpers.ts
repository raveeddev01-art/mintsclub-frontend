import polygonIcon from "../../assets/images/poligon.svg";
import ethereumIcon from "../../assets/images/ethereum2.svg";
import binance from "../../assets/images/about-binance.svg";
import algoran from "../../assets/images/about-algoran.svg";
import solana from "../../assets/images/about-solana.svg";

const CHAIN_LOGOS = {
  polygon: polygonIcon,
  ethereum: ethereumIcon,
  binance: binance,
  solana: solana,
  algorand: algoran,
};

const CHAIN_TITLE = {
  ethereum: "Ethereum",
  polygon: "Polygon",
  binance: "BSC",
  solana: "Solana",
  algorand: "Algorand",
};

const CHAIN_CURRENCY = {
  ethereum: "ETH",
  polygon: "MATIC",
  binance: "BNB",
  solana: "SOL",
  algorand: "ALGO",
};

export { CHAIN_CURRENCY, CHAIN_LOGOS, CHAIN_TITLE };
