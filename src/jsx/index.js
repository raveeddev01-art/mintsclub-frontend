import React, { useState, useEffect } from "react";

/// React router dom
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import LockScreen from "./pages/LockScreen";
// import Error400 from "./pages/Error400";
// import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
// import Error500 from "./pages/Error500";
// import Error503 from "./pages/Error503";
/// Widget
// import Widget from "./pages/Widget";

/// Deshboard
import Home from "./components/Dashboard/Home";
import Campaign from "./components/Dashboard/Campaign";
import SocialNetworkCampaign from "./components/Dashboard/SocialNetworkCampaign";
import Spendings from "./components/Dashboard/Spendings";
import Analytics from "./components/Dashboard/Analytics";
import NewCompaign from "./components/Dashboard/NewCompaign";

/// Bo
// import UiAlert from "./components/bootstrap/Alert";
// import UiAccordion from "./components/bootstrap/Accordion";
// import UiBadge from "./components/bootstrap/Badge";
// import UiButton from "./components/bootstrap/Button";
// import UiModal from "./components/bootstrap/Modal";
// import UiButtonGroup from "./components/bootstrap/ButtonGroup";
// import UiListGroup from "./components/bootstrap/ListGroup";
// import UiMediaObject from "./components/bootstrap/MediaObject";
// import UiCards from "./components/bootstrap/Cards";
// import UiCarousel from "./components/bootstrap/Carousel";
// import UiDropDown from "./components/bootstrap/DropDown";
// import UiPopOver from "./components/bootstrap/PopOver";
// import UiProgressBar from "./components/bootstrap/ProgressBar";
// import UiTab from "./components/bootstrap/Tab";
// import UiPagination from "./components/bootstrap/Pagination";
// import UiGrid from "./components/bootstrap/Grid";
// import UiTypography from "./components/bootstrap/Typography";

/// App
// import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
// import Compose from "./components/AppsMenu/Email/Compose/Compose";
// import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
// import Read from "./components/AppsMenu/Email/Read/Read";
// import Calendar from "./components/AppsMenu/Calendar/Calendar";
// import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
// import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/delete-NftGrid";
// import NftListing from "./components/listings/Nft/NftListing";
// import CollectionGrid from "./components/AppsMenu/Shop/ProductGrid/CollectionGrid";
// import FeaturedCollectionGrid from "./components/AppsMenu/Shop/ProductGrid/FeaturedCollectionGrid";
// import RequestedApprovalLaunchers from "./components/AppsMenu/Shop/ProductGrid/RequestedUpcomingLauncherGrid";
// import UsersGrid from "./components/AppsMenu/Shop/ProductGrid/UsersGrid";
// import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
// import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
// import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
// import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
// import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
// import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Chirt
// import SparklineChart from "./components/charts/Sparkline";
// import ChartJs from "./components/charts/Chartjs";
// import Chartist from "./components/charts/chartist";

// import BtcChart from "./components/charts/apexcharts/ApexChart";

/// Table
// import DataTable from "./components/table/DataTable";
// import BootstrapTable from "./components/table/BootstrapTable";
// import ApexChart from "./components/charts/apexcharts";

/// Form
// import Element from "./components/Forms/Element/Element";
// import Wizard from "./components/Forms/Wizard/Wizard";
// import SummerNote from "./components/Forms/Summernote/SummerNote";
// import Pickers from "./components/Forms/Pickers/Pickers";
// import jQueryValidation from "./components/Forms/jQueryValidation/jQueryValidation";

/// Pulgin
// import Select2 from "./components/PluginsMenu/Select2/Select2";
// import Nestable from "./components/PluginsMenu/Nestable/Nestable";
// import MainNouiSlider from "./components/PluginsMenu/Noui Slider/MainNouiSlider";
// import MainSweetAlert from "./components/PluginsMenu/Sweet Alert/SweetAlert";
// import Toastr from "./components/PluginsMenu/Toastr/Toastr";
// import JqvMap from "./components/PluginsMenu/Jqv Map/JqvMap";
// import RechartJs from "./components/charts/rechart";
import ProfileSidebar from "./layouts/ProfileSidebar";
// import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";
// import BlogsForm from "./components/AppsMenu/Shop/ProductGrid/BlogsForm";
// import BlogsGrid from "./components/AppsMenu/Shop/ProductGrid/BlogsGrid";
// import NewsGrid from "./components/AppsMenu/Shop/ProductGrid/NewsGrid";
// import PricingForm from "./components/AppsMenu/Shop/ProductGrid/PricingForm";

// Protected Routes
import ProtectedRoute from "./layouts/ProtectedRoute";
// import FractionsForm from "./components/AppsMenu/Shop/ProductGrid/FractionsForm";
// import AuctionsListing from "./components/AppsMenu/Shop/ProductGrid/AuctionsListing";
// import SwappingRevenueGrid from "./components/AppsMenu/Shop/ProductGrid/SwappingRevenueGrid";
import SystemSetting from "./components/Forms/SystemSettings/SystemSettings";
// import Blogsinglepage from "./components/Blog/details/BlogDetails";
// import UpdateBlog from "./components/Blog/update/UpdateBlog";
// import TaxPaymentListing from "./components/TaxPayment/TaxPaymentListing";
// import Collection from "./pages/Collection/CollectionDetail";
// import Nft from "./pages/Nfts/Nft";
// import Blog from "./pages/Blogs/Blog";
// import Auction from "./pages/Auction/AuctionDetail";
// import User from "./pages/User/UserDetail";
// import Swapping from "./pages/Swapping/SwappingDetail";
// import Payment from "./pages/Payment/PaymentDetail";
// import FaqGrid from "./components/FAQ/FaqListing";
// import FaqForm from "./components/FAQ/FaqForm";
// import UpdateFaq from "./components/FAQ/UpdateFaq";
// import EditProfile from "./pages/Admin/editProfile";
// import RevenueReport from "./components/revenue/revenue";
// import WeekTrending from "./components/WeekTrending/weekTrending";

// Wallet
// import WalletListing from "./components/Wallets/WalletListing";
// import NftSales from "./components/listings/Nft/NftSales";
// import NewsForm from "./components/AppsMenu/Shop/ProductGrid/NewsForm";
// import ImportCollections from "./components/Forms/ImportCollections/ImportCollection";

const Markup = ({ showProfileSideBar }) => {
  const [showProfile, setShowProfile] = useState(false);
  const routes = [
    /// Deshborad
    // { url: "", component: Home, private: true },
    // { url: "campaign", component: Campaign, private: true },
    // {
    //   url: "social-network-campaign",
    //   component: SocialNetworkCampaign,
    //   private: true,
    // },
    // { url: "spendings", component: Spendings, private: true },
    // { url: "analytics", component: Analytics, private: true },
    // { url: "new-compaign", component: NewCompaign, private: true },
    // /// Bootstrap
    // { url: "ui-alert", component: UiAlert, private: true },
    // { url: "ui-badge", component: UiBadge, private: true },
    // { url: "ui-button", component: UiButton, private: true },
    // { url: "ui-modal", component: UiModal },
    // { url: "ui-button-group", component: UiButtonGroup },
    // { url: "ui-accordion", component: UiAccordion },
    // { url: "ui-list-group", component: UiListGroup },
    // { url: "ui-media-object", component: UiMediaObject },
    // { url: "ui-card", component: UiCards },
    // { url: "ui-carousel", component: UiCarousel },
    // { url: "ui-dropdown", component: UiDropDown },
    // { url: "ui-popover", component: UiPopOver },
    // { url: "ui-progressbar", component: UiProgressBar },
    // { url: "ui-tab", component: UiTab },
    // { url: "ui-pagination", component: UiPagination },
    // { url: "ui-typography", component: UiTypography },
    // { url: "ui-grid", component: UiGrid },
    // /// Apps
    // { url: "app-profile", component: AppProfile },
    // { url: "email-compose", component: Compose },
    // { url: "email-inbox", component: Inbox },
    // { url: "email-read", component: Read },
    // { url: "app-calender", component: Calendar },
    // { url: "post-details", component: PostDetails },

    // /// Shop
    // { url: "nft-listing", component: NftListing, private: true },
    // { url: "nft-sales", component: NftSales, private: true },
    // { url: "collection-listing", component: CollectionGrid, private: true },
    // {
    //   url: "featured-collection-listing",
    //   component: FeaturedCollectionGrid,
    //   private: true,
    // },
    // {
    //   url: "collection-importing",
    //   component: ImportCollections,
    //   private: true,
    // },
    // {
    //   url: "launchers-collection-listing",
    //   component: RequestedApprovalLaunchers,
    //   private: true,
    // },
    // { url: "users-listing", component: UsersGrid, private: true },
    // { url: "ecom-product-list", component: ProductList, private: true },
    // { url: "ecom-product-detail", component: ProductDetail },
    // { url: "ecom-product-order", component: ProductOrder },
    // { url: "ecom-checkout", component: Checkout },
    // { url: "ecom-invoice", component: Invoice },
    // { url: "ecom-product-detail", component: ProductDetail },
    // { url: "ecom-customers", component: Customers },
    // { url: "blogs-form", component: BlogsForm, private: true },
    // { url: "news-form", component: NewsForm, private: true },
    // { url: "blogs-listing", component: BlogsGrid, private: true },
    // { url: "news-listing", component: NewsGrid, private: true },
    // { url: "blogs-details/:id", component: Blogsinglepage, private: true },
    // { url: "update-blog/:id", component: UpdateBlog, private: true },
    // { url: "pricing-form", component: PricingForm, private: true },
    // { url: "fractions-form", component: FractionsForm, private: true },
    // { url: "auctions-listing", component: AuctionsListing, private: true },
    // { url: "tax-payment", component: TaxPaymentListing, private: true },
    // { url: "swapping-revenue", component: SwappingRevenueGrid, private: true },
    // { url: "collection-detail/:id", component: Collection, private: true },
    // { url: "nft-detail/:id", component: Nft, private: true },
    // { url: "blog-detail/:id", component: Blog, private: true },
    // { url: "auction-detail/:id", component: Auction, private: true },
    // { url: "swapping-detail/:id", component: Swapping, private: true },
    // { url: "user-detail/:id", component: User, private: true },
    // { url: "payment-detail/:id", component: Payment, private: true },
    // { url: "faq-listing", component: FaqGrid, private: true },
    // { url: "faq-form", component: FaqForm, private: true },
    // { url: "update-faq/:id", component: UpdateFaq, private: true },
    // { url: "revenue", component: RevenueReport, private: true },
    // { url: "wallets", component: WalletListing, private: true },
    // { url: "week-trending/", component: WeekTrending, private: true },

    /// Chart
    // { url: "chart-sparkline", component: SparklineChart },
    // { url: "chart-chartjs", component: ChartJs },
    // { url: "chart-chartist", component: Chartist },
    // { url: "chart-btc", component: BtcChart },
    // { url: "chart-apexchart", component: ApexChart },
    // { url: "chart-rechart", component: RechartJs },

    /// table
    // { url: "table-datatable-basic", component: DataTable },
    // { url: "table-bootstrap-basic", component: BootstrapTable },

    /// Form
    // { url: "form-element", component: Element },
    // { url: "form-wizard", component: Wizard },
    // { url: "form-wizard", component: Wizard },
    // { url: "form-editor-summernote", component: SummerNote },
    // { url: "form-pickers", component: Pickers },
    // { url: "form-validation-jquery", component: jQueryValidation },
    { url: "system-setting", component: SystemSetting, private: false },

    /// Plugin
    // { url: "uc-select2", component: Select2 },
    // { url: "uc-nestable", component: Nestable },
    // { url: "uc-noui-slider", component: MainNouiSlider },
    // { url: "uc-sweetalert", component: MainSweetAlert },
    // { url: "uc-toastr", component: Toastr },
    // { url: "map-jqvmap", component: JqvMap },
    // { url: "uc-lightgallery", component: Lightgallery },

    /// pages
    // { url: "edit-profile", component: EditProfile },
    // { url: "widget-basic", component: Widget },

    { url: "adminRegister", component: Registration },
    // { url: "page-lock-screen", component: LockScreen },
    { url: "page-login", component: Login },
    // { url: "page-forgot-password", component: ForgotPassword },
    // { url: "page-error-400", component: Error400 },
    // { url: "page-error-403", component: Error403 },
    { url: "page-error-404", component: Error404 },
    // { url: "page-error-500", component: Error500 },
    // { url: "page-error-503", component: Error503 },
  ];

  const [show404Page, setShow404Page] = useState(false);
  let path = window.location.pathname;
  path = path.split("/");
  const parentPath = path[1];
  path = path[path.length - 1];
  let pagePath = path.split("-").includes("page");

  useEffect(() => {
    const pathName = window.location.pathname;

    const pageFound = routes.filter(
      (route) => route.url.replaceAll("/", "") === pathName.replaceAll("/", "")
    );
    if (pageFound?.length == 0) {
      const verifyPageExists = routes.filter(
        (route) => route.url.split("/")[0] === parentPath
      );

      if (verifyPageExists[0]?.url?.includes(":id") && path?.length === 24) {
        return setShow404Page(false);
      }

      return setShow404Page(true);
    }
    return setShow404Page(false);
  }, [window.location.pathname]);

  return (
    <Router>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"} ${
          !path ? "right-profile" : ""
        }`}
      >
        {show404Page && <Error404 />}
        {!pagePath && !show404Page && (
          <Nav
            showProfileSideBar={showProfileSideBar}
            showProfile={() => setShowProfile(true)}
          />
        )}
        {!path && !pagePath && !show404Page && (
          <ProfileSidebar
            addClass={showProfile ? "active" : ""}
            hideProfile={() => setShowProfile(false)}
          />
        )}
        <div className={`  ${!pagePath ? "content-body" : ""}`}>
          <div className={`${!pagePath ? "container-fluid" : ""}`}>
            <Switch>
              {routes.map((data, i) => {
                return data.hasOwnProperty("private") && data?.private ? (
                  <ProtectedRoute
                    key={i}
                    exact
                    path={`/${data.url}/page-login`}
                    component={data.component}
                  />
                ) : (
                  <Route
                    key={i}
                    exact
                    path={`/${data.url}`}
                    component={data.component}
                  />
                );
              })}
            </Switch>
          </div>
        </div>

        {!pagePath && <Footer />}
      </div>
    </Router>
  );
};

export default Markup;
