import layout from "./layouts/layout/layout";
import layout3 from "./layouts/layout3/layout3";
import layout4 from "./layouts/layout4/layout4";
// components
import Home from "./components/home/home";
import Populars from "./components/popular-collections-list/popular-collections-list";
import CreateNFT from "./components/create-nft/create-nft";
import Wallet from "./components/wallet/wallet";
import Signup from "./components/signup/signup";
import SellNFT from "./components/sell-nft/SellNFT";
import NotFound from "./components/not-found/not-found";
import ExploreCollections from "./components/collections/explore-collections";
import AllNFT from "./components/explore/all-nft/allnft";
import CollectionDetailsPage from "./components/collection-details/collectiondetails";
import NFTDetail from "./components/nft-detail/nftdetail";
import UserProfile from "./components/user-profile/UserProfile";
import TopSellerList from "./components/top-seller/topsellerlist";
import AuctionsList from "./components/auctions/home-auction-list";
import EditProfile from "./components/user-profile/user-edit-profile";
import CreateCollections from "./components/creat-collections/CreateCollections";
import AboutUs from "./components/aboutus/aboutus";
import Faqs from "./components/faqs/faqs";

// routes
const routes = [
  {
    path: "/",
    access: true,
    exact: true,
    title: "Home",
    layout: layout,
    component: Home,
  },
  {
    path: "/auctions",
    access: true,
    exact: true,
    title: "Live Auctions",
    layout: layout,
    component: AuctionsList,
  },

  {
    path: "/sell-item/:id?",
    access: true,
    exact: true,
    title: "Sell Item",
    layout: layout,
    component: SellNFT,
  },

  {
    path: "/popular-collections",
    access: true,
    exact: true,
    title: "Popular Collections",
    layout: layout,
    component: Populars,
  },
  {
    path: "/top-sellers-list",
    access: true,
    exact: true,
    title: "Popular Collections",
    layout: layout,
    component: TopSellerList,
  },

  {
    path: "/create",
    access: true,
    exact: true,
    title: "Create",
    layout: layout,
    component: CreateNFT,
  },
  {
    path: "/explore/nftdetail/:id",
    access: true,
    exact: true,
    title: "Detail",
    layout: layout,
    component: NFTDetail,
  },

  {
    path: "/createcollection",
    access: true,
    exact: true,
    title: "Create Collection",
    layout: layout,
    component: CreateCollections,
  },

  {
    path: "/explore/exploreAll",
    access: true,
    exact: true,
    title: "Explore All",
    layout: layout,
    component: ExploreCollections,
  },
  {
    path: "/explore/allNFT",
    access: true,
    exact: true,
    title: "All NFTs",
    layout: layout,
    component: AllNFT,
  },
  {
    path: "/sellnft",
    access: true,
    exact: true,
    title: "Sell NFT",
    layout: layout,
    component: SellNFT,
  },
  {
    path: "/collection/detailPage/:id",
    access: true,
    exact: true,
    title: "Collection Detail Page",
    layout: layout,
    component: CollectionDetailsPage,
  },
  {
    path: "/userprofile",
    access: true,
    exact: true,
    title: "User Profile",
    layout: layout,
    component: UserProfile,
  },
  {
    path: "/editprofile",
    access: true,
    exact: true,
    title: "Edit Profile",
    layout: layout,
    component: EditProfile,
  },
  {
    path: "/login",
    access: true,
    exact: true,
    title: "login",
    layout: layout4,
    component: Wallet,
  },
  {
    path: "/signup",
    access: true,
    exact: true,
    title: "Signup",
    layout: layout4,
    component: Signup,
  },
  {
    path: "/aboutus",
    access: true,
    exact: true,
    title: "AboutUs",
    layout: layout,
    component: AboutUs,
  },
  {
    path: "/faqs",
    access: true,
    exact: true,
    title: "Faqs",
    layout: layout,
    component: Faqs,
  },

  {
    path: "/*",
    access: true,
    exact: true,
    name: "Not Found",
    layout: layout3,
    component: NotFound,
  },
];

export default routes;
