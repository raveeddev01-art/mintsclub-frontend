import React, { Fragment } from "react";

import { Switch, Route } from "react-router-dom";

/// Componetns
import Nav from "./nav";
import Footer from "./Footer";

/// Deshboard
import Home from "../components/Dashboard/Home/Home";
import Application from "../components/Dashboard/Application/Application";
import Profile from "../components/Dashboard/Profile/Profile";
import Companies from "../components/Dashboard/Companies/Companies";
import Statistics from "../components/Dashboard/Statistics/Statistics";
import SearchJobs from "../components/Dashboard/SearchJobs/SearchJobs";

/// Bo
import UiAlert from "../components/bootstrap/Alert";
import UiAccordion from "../components/bootstrap/Accordion";
import UiBadge from "../components/bootstrap/Badge";
import UiButton from "../components/bootstrap/Button";
import UiModal from "../components/bootstrap/Modal";
import UiButtonGroup from "../components/bootstrap/ButtonGroup";
import UiListGroup from "../components/bootstrap/ListGroup";
import UiMediaObject from "../components/bootstrap/MediaObject";
import UiCards from "../components/bootstrap/Cards";
import UiCarousel from "../components/bootstrap/Carousel";
import UiDropDown from "../components/bootstrap/DropDown";
import UiPopOver from "../components/bootstrap/PopOver";
import UiProgressBar from "../components/bootstrap/ProgressBar";
import UiTab from "../components/bootstrap/Tab";
import UiPagination from "../components/bootstrap/Pagination";
import UiGrid from "../components/bootstrap/Grid";
import UiTypography from "../components/bootstrap/Typography";

/// App
import AppProfile from "../components/AppsMenu/AppProfile/AppProfile";
import Compose from "../components/AppsMenu/Email/Compose/Compose";
import Inbox from "../components/AppsMenu/Email/Inbox/Inbox";
import Read from "../components/AppsMenu/Email/Read/Read";
import Calendar from "../components/AppsMenu/Calendar/Calendar";
/// Product List
import ProductGrid from "../components/AppsMenu/Shop/ProductGrid/delete-NftGrid";
import CollectionGrid from "../components/AppsMenu/Shop/ProductGrid/CollectionGrid";
import UsersGrid from "../components/AppsMenu/Shop/ProductGrid/UsersGrid";
import ProductList from "../components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "../components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "../components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "../components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "../components/AppsMenu/Shop/ProductOrder";
import Customers from "../components/AppsMenu/Shop/Customers/Customers";

/// Chirt
import ChartChartist from "../components/charts/chartflot";
import SparklineChart from "../components/charts/Sparkline";
import ChartJs from "../components/charts/Chartjs";
import Chartist from "../components/charts/Chartist";

import BtcChart from "../components/charts/apexcharts/ApexChart";

/// Table
import DataTable from "../components/table/DataTable";
import BootstrapTable from "../components/table/BootstrapTable";
import ApexChart from "../components/charts/apexcharts";

/// Widget
import Widget from "../pages/Widget";

/// Form
import Element from "../components/Forms/Element/Element";
import Wizard from "../components/Forms/Wizard/Wizard";
import SummerNote from "../components/Forms/Summernote/SummerNote";
import Pickers from "../components/Forms/Pickers/Pickers";
import jQueryValidation from "../components/Forms/jQueryValidation/jQueryValidation";

/// Pulgin
import Select2 from "../components/PluginsMenu/Select2/Select2";
import Nestable from "../components/PluginsMenu/Nestable/Nestable";
import MainNouiSlider from "../components/PluginsMenu/Noui Slider/MainNouiSlider";
import MainSweetAlert from "../components/PluginsMenu/Sweet Alert/SweetAlert";
import Toastr from "../components/PluginsMenu/Toastr/Toastr";
import JqvMap from "../components/PluginsMenu/Jqv Map/JqvMap";
import RechartJs from "../components/charts/rechart";
import BlogsForm from "../components/AppsMenu/Shop/ProductGrid/BlogsForm";
import BlogsGrid from "../components/AppsMenu/Shop/ProductGrid/BlogsGrid";
import Blogsinglepage from "../components/blog/details/BlogDetails";
import PricingForm from "../components/AppsMenu/Shop/ProductGrid/PricingForm";
import FractionsForm from "../components/AppsMenu/Shop/ProductGrid/FractionsForm";
import AuctionsListing from "../components/AppsMenu/Shop/ProductGrid/AuctionsListing";
import SystemSetting from "../components/Forms/SystemSettings/SystemSettings";
import UpdateBlog from "../components/Blog/update/UpdateBlog";
import TaxPaymentListing from "../components/TaxPayment/TaxPaymentListing";
import FaqGrid from "../components/FAQ/FaqListing";
import FaqForm from "../components/FAQ/FaqForm";
import UpdateFaq from "../components/FAQ/UpdateFaq";
import RevenueReport from "../components/revenue/revenue";
import WalletListing from "../components/Wallets/WalletListing";
import WeekTrending from "../components/WeekTrending/weekTrending";

//Protected Route
// import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  const routes = [
    /// Deshborad
    { url: "", component: Home },
    { url: "application", component: Application },
    { url: "profile", component: Profile },
    { url: "companies", component: Companies },
    { url: "search-job", component: SearchJobs },
    { url: "statistics", component: Statistics },
    /// Bootstrap
    { url: "ui-alert", component: UiAlert },
    { url: "ui-badge", component: UiBadge },
    { url: "ui-button", component: UiButton },
    { url: "ui-modal", component: UiModal },
    { url: "ui-button-group", component: UiButtonGroup },
    { url: "ui-accordion", component: UiAccordion },
    { url: "ui-list-group", component: UiListGroup },
    { url: "ui-media-object", component: UiMediaObject },
    { url: "ui-card", component: UiCards },
    { url: "ui-carousel", component: UiCarousel },
    { url: "ui-dropdown", component: UiDropDown },
    { url: "ui-popover", component: UiPopOver },
    { url: "ui-progressbar", component: UiProgressBar },
    { url: "ui-tab", component: UiTab },
    { url: "ui-pagination", component: UiPagination },
    { url: "ui-typography", component: UiTypography },
    { url: "ui-grid", component: UiGrid },
    /// Apps
    { url: "app-profile", component: AppProfile },
    { url: "email-compose", component: Compose },
    { url: "email-inbox", component: Inbox },
    { url: "email-read", component: Read },
    { url: "app-calender", component: Calendar },
    /// Shop
    { url: "ecom-product-grid", component: ProductGrid },
    { url: "ecom-product-list", component: ProductList },
    { url: "ecom-product-detail", component: ProductDetail },
    { url: "ecom-product-order", component: ProductOrder },
    { url: "ecom-checkout", component: Checkout },
    { url: "ecom-invoice", component: Invoice },
    { url: "ecom-product-detail", component: ProductDetail },
    { url: "ecom-customers", component: Customers },
    { url: "users-listing", component: UsersGrid },
    { url: "collection-listing", component: CollectionGrid },
    { url: "blogs-form", component: BlogsForm },
    { url: "blogs-listing", component: BlogsGrid },
    { url: "blogs-details/:id", component: Blogsinglepage },
    { url: "update-blog/:id", component: UpdateBlog },
    { url: "pricing-form", component: PricingForm },
    { url: "fractions-form", component: FractionsForm },
    { url: "auctions-listing", component: AuctionsListing },
    { url: "tax-payment", component: TaxPaymentListing },
    //WeekTrending
    { url: "week-trending/", component: WeekTrending, private: true },

    /// Chart
    { url: "chart-flot", component: ChartChartist },
    { url: "chart-sparkline", component: SparklineChart },
    { url: "chart-chartjs", component: ChartJs },
    { url: "chart-chartist", component: Chartist },
    { url: "chart-btc", component: BtcChart },
    { url: "chart-apexchart", component: ApexChart },
    { url: "chart-rechart", component: RechartJs },

    /// table
    { url: "table-datatable-basic", component: DataTable },
    { url: "table-bootstrap-basic", component: BootstrapTable },

    /// Widget
    { url: "widget-basic", component: Widget },

    /// Form
    { url: "form-element", component: Element },
    { url: "form-wizard", component: Wizard },
    { url: "form-wizard", component: Wizard },
    { url: "form-editor-summernote", component: SummerNote },
    { url: "form-pickers", component: Pickers },
    { url: "form-pickers", component: jQueryValidation },
    { url: "form-validation-jquery", component: Pickers },
    { url: "system-setting", component: SystemSetting },

    /// Plugin

    { url: "uc-select2", component: Select2 },
    { url: "uc-nestable", component: Nestable },
    { url: "uc-noui-slider", component: MainNouiSlider },
    { url: "uc-sweetalert", component: MainSweetAlert },
    { url: "uc-toastr", component: Toastr },
    { url: "map-jqvmap", component: JqvMap },

    // Faq
    { url: "faq-listing", component: FaqGrid },
    { url: "faq-form", component: FaqForm },
    { url: "update-faq/:id", component: UpdateFaq },

    //Revenue
    { url: "revenue", component: RevenueReport },
    //Wallet
    { url: "wallets", component: WalletListing, private: true },
  ];

  return (
    <Fragment>
      <Switch>
        {routes.map((data, i) => (
          <Route
            key={i}
            exact
            path={`/${data.url}`}
            component={data.component}
          />
        ))}
      </Switch>

      {/* <Footer /> */}
    </Fragment>
  );
};

export default Routes;
