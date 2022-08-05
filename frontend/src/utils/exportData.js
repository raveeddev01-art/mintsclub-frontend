import nft1 from "../assets/images/famous1.jpeg";
import nft2 from "../assets/images/famous2.webp";
import nft3 from "../assets/images/famous3.jpg";
import nft4 from "../assets/images/famous4.jpg";
import nft5 from "../assets/images/famous5.png";
import nft6 from "../assets/images/famous6.jpeg";
import nft7 from "../assets/images/famous7.jpeg";
import { aboutusImages } from "../assets/assets";

import {
  AiFillHeart,
  BsTagFill,
  GrTransaction,
  MdShoppingCart,
} from "react-icons/all";
export const WordsFamousNfts = [
  {
    img: nft3,
  },
  {
    img: nft2,
  },
  {
    img: nft1,
  },
  { img: nft4 },
  { img: nft5 },
  { img: nft6 },
  { img: nft7 },
];

export const iconByActivity = {
  minted: <MdShoppingCart />,
  transfer: <GrTransaction />,
  list: <BsTagFill />,
};
////About Us/////

export const aboutUsBanner = {
  subHeading: "Who we are",
  heading: "Company Profile",
  content:
    "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
};

export const services = [
  {
    name: "Blockchain Consultancy",
    img: aboutusImages.consultancy,
  },
  {
    name: "Token Development",
    img: aboutusImages.development,
  },
  {
    name: "NFT Marketplace",
    img: aboutusImages.marketplace,
  },
  {
    name: "DApp Development",
    img: aboutusImages.dapp,
  },
  {
    name: "DeFi Development",
    img: aboutusImages.defi,
  },
  {
    name: "Crypto Exchange Development",
    img: aboutusImages.crypto,
  },
];

export const comingSoon = [
  {
    name: "Binance",
    img: aboutusImages.binance,
  },
  {
    name: "Cardano",
    img: aboutusImages.cardano,
  },
  {
    name: "Solana",
    img: aboutusImages.solana,
  },
  {
    name: "Algorand",
    img: aboutusImages.algoran,
  },
];

export const getBannerData=(subHeading,heading)=>{
 return  {
    subHeading: subHeading,
    heading: heading,
    content:
      "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
  };
}
//All NFTs
export const AllNFTsbBanner = {
  subHeading: "Explore",
  heading: "All NFTs",
  content:
    "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
};

//Explore Collections
export const exploreCollectionBanner = {
  subHeading: "Collections",
  heading: "Explore all",
  content:
    " Explore on the world’s best & largest NFT marketplace with our beautiful NFT products. We want to be a part of your smile, success and future growth.",
};

//Create NFT
export const createNFTbanner = {
  subHeading: "Get Started",
  heading: "Create NFT",
  content:
    "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
};

//Faqs
export const faqsBanner = {
  subHeading: "Ask",
  heading: "FAQ",
  content:
    "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
};

export const faqsData = [
  {
    question: "What is MintsClub?",
    ans: "MintsClub is a revolutionary 21st Century blockchain product that brings users one step closer to experiencing Metaverse. The users can mint their digital assets such as images, GIFs, games, sports accessories and more into the cryptomarket and establish a stable revenue stream.",
  },
  {
    question: "What is a MintsClub token?",
    ans: "MintsClub token, famously known as Non-fungible Token (NFT) is a distinct cryptographic token that exists on the blockchain platform and cannot be replicated. Tokenization of digital assets has made it easier to buy and sell while reducing the threat of fraudulent acts.",
  },
  {
    question: "What is the total supply of MINT?",
    ans: "The total supply of 1-inch Mint tokens is 1.5 billion.",
  },
  {
    question: "Where can I buy/sell MINT?",
    ans: "You can sell your NFTs on blockchain marketplaces such as Binance, Cardano, Solana and Algoran and now, MintsClub.",
  },
];

//NFT Data
export const nftBanner = {
  subHeading: "NFT",
  heading: "NFT Details",
  content:
    "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
};

//popular-collections-list
export const popularBanner = {
  subHeading: "Collections",
  heading: "Popular Collections",
  content:
    " Explore on the world’s best & largest NFT marketplace with our beautiful NFT products. We want to be a part of your smile, success and future growth.",
};

//privacePolicy 
export const privacyBanner = {
  subHeading: "Our Privacy Policy",
  heading: "Privacy Policy",
  content:
    "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
};

//sellNFT
export const sellNFTBanner = {
  subHeading: "NFT",
  heading: "NFT Details",
  content:
    "Explore on the world’s best & largest NFT marketplace with our  beautiful NFT products. We want to be a part of your smile, success and future growth.",
};