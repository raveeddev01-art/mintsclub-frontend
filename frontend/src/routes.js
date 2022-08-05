import layout from "./layouts/layout/layout";
import layout3 from "./layouts/layout3/layout3";
import layout4 from "./layouts/layout4/layout4";
// components
import Home from "./pages/home/home";
import Populars from "./pages/popular-collections-list/popular-collections-list";
import CreateNFT from "./pages/create-nft/create-nft";
import Wallet from "./pages/wallet/wallet";
import Signup from "./pages/signup/signup";
import SellNFT from "./pages/sell-nft/SellNFT";
import NotFound from "./pages/not-found/not-found";
import ExploreCollections from "./pages/explore-collections/explore-collections";
import AllNFT from "./pages/all-nfts/all-nfts/allnft";
import CollectionDetailsPage from "./pages/collection-details/collectiondetails";
import NFTDetail from "./pages/nft-detail/nftdetail";
import UserProfile from "./pages/user-profile/UserProfile";
import TopSellerList from "./pages/top-seller/topsellerlist";
import AuctionsList from "./pages/auctions/home-auction-list";
import EditProfile from "./pages/user-edit-profile/user-edit-profile";
import CreateCollections from "./pages/create-collections/CreateCollections";
import AboutUs from "./pages/aboutus/aboutus";
import Faqs from "./pages/faqs/faqs";
import PrivacyPolicy from "./pages/privacy-policy/privacyPolicy";
import TermsConditions from "./pages/terms-conditions/termsConditions";


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
    access: false,
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
    access: false,
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
    access: false,
    exact: false,
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
    access: false,
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
    access: false,
    exact: true,
    title: "User Profile",
    layout: layout,
    component: UserProfile,
  },
  {
    path: "/editprofile",
    access: false,
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
    path: "/privacypolicy",
    access: true,
    exact: true,
    title: "PrivacyPolicy",
    layout: layout,
    component: PrivacyPolicy,
  },
  {
    path: "/termsandconditions",
    access: true,
    exact: true,
    title: "Terms&Conditions",
    layout: layout,
    component: TermsConditions,
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
