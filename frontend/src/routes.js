import layout2 from "./layouts/layout2/layout2";
import layout3 from "./layouts/layout3/layout3";
import layout4 from "./layouts/layout4/layout4";
// components
import Home from "./components/home/home";
import ExploreAll from "./components/explore/explore-all";
import ItemDetails from "./components/item-detail/item-detail";
import Activity from "./components/activity/activity";
import Blog from "./components/blog/blog";
import BlogSingle from "./components/blog-single/blog-single";
import HelpCenter from "./components/help-center/help-center";
import Populars from "./components/popular-collections-list/popular-collections-list";
import Author from "./components/author/author";
import Profile from "./components/profile/profile";
import CreateNFT from "./components/create-nft/create-nft";
import MyCollections from "./components/collections/my-collections";
// import CreateCollections from "./components/create-collection/create-collection";
import CollectionDetails from "./components/collections/collection-details";
import Wallet from "./components/wallet/wallet";
import Signup from "./components/signup/signup";
import Contact from "./components/contact/contact";
import SellNFT from "./components/sell-nft/SellNFT";
import NotFound from "./components/not-found/not-found";
import HowItWorks from "./components/how-it-works/how-it-works";
import PrivacyTerms from "./components/privacy-&-terms/privacy-&-terms";
import ExploreCollections from "./components/collections/explore-collections";
import AllNFT from "./components/explore/all-nft/allnft";
import CollectionDetailsPage from "./components/collection-details/collectiondetails";
import NFTDetail from "./components/nft-detail/nftdetail";
import UserProfile from "./components/user-profile/UserProfile";
import TopSellerList from "./components/top-seller/topsellerlist";
import AuctionsList from "./components/auctions/home-auction-list";
import EditProfile from "./components/user-profile/user-edit-profile";
import CreateCollections from "./components/creat-collections/CreateCollections";
import Approval from "./components/approval/Approval";

// routes
const routes = [
  {
    path: "/",
    access: true,
    exact: true,
    title: "Home",
    layout: layout2,
    component: Home,
  },
  {
    path: "/explore-all",
    access: true,
    exact: true,
    title: "Explore",
    layout: layout2,
    component: ExploreAll,
  },
  {
    path: "/auctions",
    access: true,
    exact: true,
    title: "Live Auctions",
    layout: layout2,
    component: AuctionsList,
  },
  {
    path: "/item-details",
    access: true,
    exact: true,
    title: "Item Details",
    layout: layout2,
    component: ItemDetails,
  },
  {
    path: "/sell-item/:id?",
    access: true,
    exact: true,
    title: "Sell Item",
    layout: layout2,
    component: SellNFT,
  },
  {
    path: "/approval",
    access: true,
    exact: true,
    title: "Approval",
    layout: layout2,
    component: Approval,
  },
  {
    path: "/activity",
    access: true,
    exact: true,
    title: "Activity",
    layout: layout2,
    component: Activity,
  },
  {
    path: "/blog",
    access: true,
    exact: true,
    title: "Blog",
    layout: layout2,
    component: Blog,
  },
  {
    path: "/blog-single",
    access: true,
    exact: true,
    title: "Blog Single",
    layout: layout2,
    component: BlogSingle,
  },
  {
    path: "/help-center",
    access: true,
    exact: true,
    title: "Help Center",
    layout: layout2,
    component: HelpCenter,
  },
  {
    path: "/popular-collections",
    access: true,
    exact: true,
    title: "Popular Collections",
    layout: layout2,
    component: Populars,
  },
  {
    path: "/top-sellers-list",
    access: true,
    exact: true,
    title: "Popular Collections",
    layout: layout2,
    component: TopSellerList,
  },

  {
    path: "/author/:authorId?",
    access: true,
    exact: true,
    title: "Author Profile",
    layout: layout2,
    component: Author,
  },
  {
    path: "/profile",
    access: true,
    exact: true,
    title: "Profile",
    layout: layout2,
    component: Profile,
  },
  {
    path: "/create",
    access: true,
    exact: true,
    title: "Create",
    layout: layout2,
    component: CreateNFT,
  },
  {
    path: "/nftdetail/:id",
    access: true,
    exact: true,
    title: "Detail",
    layout: layout2,
    component: NFTDetail,
  },
  {
    path: "/collections",
    access: true,
    exact: true,
    title: "Collections",
    layout: layout2,
    component: MyCollections,
  },
  {
    path: "/createcollection",
    access: true,
    exact: true,
    title: "Create Collection",
    layout: layout2,
    component: CreateCollections,
  },
  {
    path: "/collection-details/:collectionId?",
    access: true,
    exact: true,
    title: "Collection Details",
    layout: layout2,
    component: CollectionDetails,
  },
  {
    path: "/explore/exploreAll",
    access: true,
    exact: true,
    title: "Explore All",
    layout: layout2,
    component: ExploreCollections,
  },
  {
    path: "/explore/allNFT",
    access: true,
    exact: true,
    title: "All NFTs",
    layout: layout2,
    component: AllNFT,
  },
  {
    path: "/sellnft",
    access: true,
    exact: true,
    title: "Sell NFT",
    layout: layout2,
    component: SellNFT,
  },
  {
    path: "/collection/detailPage/:id",
    access: true,
    exact: true,
    title: "Collection Detail Page",
    layout: layout2,
    component: CollectionDetailsPage,
  },
  {
    path: "/userprofile",
    access: true,
    exact: true,
    title: "User Profile",
    layout: layout2,
    component: UserProfile,
  },
  {
    path: "/editprofile",
    access: true,
    exact: true,
    title: "Edit Profile",
    layout: layout2,
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
    path: "/contact",
    access: true,
    exact: true,
    title: "Contact",
    layout: layout2,
    component: Contact,
  },
  {
    path: "/how-it-works",
    access: true,
    exact: true,
    title: "How It Works",
    layout: layout2,
    component: HowItWorks,
  },
  {
    path: "/privacy-and-terms",
    access: true,
    exact: true,
    title: "Privacy & Terms",
    layout: layout2,
    component: PrivacyTerms,
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
