import { lazy } from "react";
const layout = lazy(() => import("./layouts/layout/layout"));
const homelayout = lazy(() => import("./layouts/home-layout/home-layout"));
const layout3 = lazy(() => import("./layouts/layout3/layout3"));
const layout4 = lazy(() => import("./layouts/layout4/layout4"));
const Home = lazy(() => import("./pages/home/home"));
const CreateNFT = lazy(() => import("./pages/create-nft/create-nft"));
const Wallet = lazy(() => import("./pages/wallet/wallet"));
const Signup = lazy(() => import("./pages/signup/signup"));
const SellNFT = lazy(() => import("./pages/sell-nft/SellNFT"));
const NotFound = lazy(() => import("./pages/not-found/not-found"));
const NFTDetail = lazy(() => import("./pages/nft-detail/nftdetail"));
const UserProfile = lazy(() => import("./pages/user-profile/UserProfile"));
const TopSellerList = lazy(() => import("./pages/top-seller/topsellerlist"));
const AuctionsList = lazy(() => import("./pages/auctions/home-auction-list"));
const AllNFT = lazy(() => import("./pages/all-nfts/all-nfts/allnft"));
const CreateCollections = lazy(() =>
  import("./pages/create-collections/CreateCollections")
);
const AboutUs = lazy(() => import("./pages/aboutus/aboutus"));
const Faqs = lazy(() => import("./pages/faqs/faqs"));
const PrivacyPolicy = lazy(() =>
  import("./pages/privacy-policy/privacyPolicy")
);
const TermsConditions = lazy(() =>
  import("./pages/terms-conditions/termsConditions")
);
const ConnectWallet = lazy(() =>
  import("./pages/connect-wallet/connect-wallet")
);
const Populars = lazy(() =>
  import("./pages/popular-collections-list/popular-collections-list")
);
const ExploreCollections = lazy(() =>
  import("./pages/explore-collections/explore-collections")
);
const CollectionDetailsPage = lazy(() =>
  import("./pages/collection-details/collectiondetails")
);
const EditProfile = lazy(() =>
  import("./pages/user-edit-profile/user-edit-profile")
);

// routes
const routes = [
  {
    path: "/",
    access: true,
    exact: true,
    title: "Home",
    layout: homelayout,
    component: Home,
  },
  {
    path: "/connect-wallet",
    access: true,
    exact: true,
    title: "ConnectWallet",
    layout: layout,
    component: ConnectWallet,
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
