import nft1 from "../assets/images/nft1.jpg";
import nft2 from "../assets/images/nft2.webp";
import nft3 from '../assets/images//nft3.jpeg';
import nft4 from "../assets/images/nft4.webp";
import nft5 from "../assets/images/nft5.jpg";
import {
  AiFillHeart,
  BsTagFill,
  GrTransaction,
  MdShoppingCart,
} from "react-icons/all";
export const WordsFamousNfts = [
    {
      img: nft3,
      link: "https://niftygateway.com/itemdetail/primary/0x0151834a6997f89eb8372ac54ac077d79bb4d1e0/7",
    },
    {
      img: nft1,
      link: "https://onlineonly.christies.com/s/beeple-first-5000-days/beeple-b-1981-1/112924?ldp_breadcrumb=back",
    },
    {
      img: nft2,
      link: "https://niftygateway.com/marketplace?collection=0x12f28e2106ce8fd8464885b80ea865e98b465149&tokenId=100010001",
    },
    { img: nft4, link: "https://foundation.app/@snowden/~/24437" },
    { img: nft5, link: "https://www.phillips.com/mdj" },
  ];


  export const iconByActivity={
    minted:<MdShoppingCart/>,
    transfer:<GrTransaction/>,
    list:<BsTagFill/>
  }