import nft1 from "../assets/images/famous1.jpeg";
import nft2 from "../assets/images/famous2.webp";
import nft3 from "../assets/images/famous3.jpg";
import nft4 from "../assets/images/famous4.jpg";
import nft5 from "../assets/images/famous5.png";
import nft6 from "../assets/images/famous6.jpeg";
import nft7 from "../assets/images/famous7.jpeg";
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
