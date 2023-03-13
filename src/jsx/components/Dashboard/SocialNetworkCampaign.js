import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import ChartDoughnut2 from "../charts/Chartjs/donught2";

function SocialNetworkCampaign() {
  return (
    <>
      <div className="form-head d-flex mb-0 mb-lg-4 align-items-start">
        <div className="mr-auto d-none d-lg-block">
          <h2 className="text-black font-w600">Social Network Campaign</h2>
          <div>
            <Link
              to="/social-network-campaign"
              className="fs-18 text-primary font-w600"
            >
              Campaign /{" "}
            </Link>
            <Link to="/social-network-campaign" className="fs-18">
              Social Network Campaign
            </Link>
          </div>
        </div>
        <div className="d-none d-lg-flex align-items-center">
          <div className="text-right">
            <h3 className="fs-20 text-black mb-0">09:62 AM</h3>
            <span className="fs-14">Monday, 3 Augusut 2020</span>
          </div>
          <Link
            className="ml-4 text-black p-3 rounded border text-center width60"
            to="/social-network-campaign"
          >
            <i className="las la-cog scale5" />
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="flex-wrap d-flex align-items-center justify-content-between">
            <div className="d-flex flex-wrap">
              <div className="d-flex mb-3 mr-3 align-items-center bgl-primary p-0 p-lg-2 pr-lg-3 rounded">
                <i className="las la-laptop-code social-icon bg-primary mr-0 mr-lg-3 text-white" />
                <div className="d-none d-lg-block">
                  <h5 className="text-black fs-18 mb-0">Show All</h5>
                  <span className="fs-13">67,124 Campaign</span>
                </div>
              </div>
              <div className="d-flex mr-3 mb-3 align-items-center bgl-secondary p-0 p-lg-2 pr-lg-3 rounded">
                <i className="lab la-instagram social-icon bg-secondary mr-0 mr-lg-3 text-white" />
                <div className="d-none d-lg-block">
                  <h5 className="text-black fs-18 mb-0">Instagram</h5>
                  <span className="fs-13">457 Campaign</span>
                </div>
              </div>
              <div className="d-flex mr-3 mb-3 align-items-center bgl-info p-0 p-lg-2 pr-lg-3 rounded">
                <i className="lab la-facebook-f social-icon bg-info mr-0 mr-lg-3 text-white" />
                <div className="d-none d-lg-block">
                  <h5 className="text-black fs-18 mb-0">Facebook</h5>
                  <span className="fs-13">125 Campaign</span>
                </div>
              </div>
              <div className="d-flex mb-3 align-items-center bgl-success p-0 p-lg-2 pr-lg-3 rounded">
                <i className="lab la-twitter social-icon bg-success mr-0 mr-lg-3  text-white" />
                <div className="d-none d-lg-block">
                  <h5 className="text-black fs-18 mb-0">Twitter</h5>
                  <span className="fs-13">5125 Campaign</span>
                </div>
              </div>
            </div>
            <div>
              <Link to="/social-network-campaign" className="btn bg-white">
                <svg
                  width={20}
                  height={18}
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 2.25H8.5C8.5 1.42275 7.82725 0.75 7 0.75H5.5C4.67275 0.75 4 1.42275 4 2.25H1C0.586 2.25 0.25 2.58525 0.25 3C0.25 3.41475 0.586 3.75 1 3.75H4C4 4.57725 4.67275 5.25 5.5 5.25H7C7.82725 5.25 8.5 4.57725 8.5 3.75H19C19.414 3.75 19.75 3.41475 19.75 3C19.75 2.58525 19.414 2.25 19 2.25ZM5.5 3.75V2.25H7L7.00075 2.997C7.00075 2.9985 7 2.99925 7 3C7 3.00075 7.00075 3.0015 7.00075 3.003V3.75H5.5Z"
                    fill="#2E2E2E"
                  />
                  <path
                    d="M19 8.25H14.5C14.5 7.42275 13.8273 6.75 13 6.75H11.5C10.6727 6.75 10 7.42275 10 8.25H1C0.586 8.25 0.25 8.58525 0.25 9C0.25 9.41475 0.586 9.75 1 9.75H10C10 10.5773 10.6727 11.25 11.5 11.25H13C13.8273 11.25 14.5 10.5773 14.5 9.75H19C19.414 9.75 19.75 9.41475 19.75 9C19.75 8.58525 19.414 8.25 19 8.25ZM11.5 9.75V8.25H13L13.0007 8.997C13.0007 8.9985 13 8.99925 13 9C13 9.00075 13.0007 9.0015 13.0007 9.003V9.75H11.5Z"
                    fill="#2E2E2E"
                  />
                  <path
                    d="M19 14.25H8.5C8.5 13.4227 7.82725 12.75 7 12.75H5.5C4.67275 12.75 4 13.4227 4 14.25H1C0.586 14.25 0.25 14.5853 0.25 15C0.25 15.4148 0.586 15.75 1 15.75H4C4 16.5773 4.67275 17.25 5.5 17.25H7C7.82725 17.25 8.5 16.5773 8.5 15.75H19C19.414 15.75 19.75 15.4148 19.75 15C19.75 14.5853 19.414 14.25 19 14.25ZM5.5 15.75V14.25H7L7.00075 14.997C7.00075 14.9985 7 14.9992 7 15C7 15.0008 7.00075 15.0015 7.00075 15.003V15.75H5.5Z"
                    fill="#2E2E2E"
                  />
                </svg>
              </Link>
              <Dropdown className="custom-dropdown ml-3">
                <Dropdown.Toggle
                  variant=""
                  className="arrow-false btn bg-white d-flex align-items-center"
                >
                  <div className="text-left mr-3">
                    <span className="text-black">Newest</span>
                  </div>
                  <i className="fa fa-caret-down" aria-hidden="true" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right">
                  <Dropdown.Item className="" to="/social-network-campaign">
                    4 June 2020 - 4 July 2020
                  </Dropdown.Item>
                  <Dropdown.Item className="" to="/social-network-campaign">
                    5 july 2020 - 4 Aug 2020
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="col-xl-12 social-Campaign-audio">
          <div className="sca-row p-3 row align-items-center sp16 mx-0 mb-2 bg-white">
            <div className="mb-3 col-xl-4 col-xxl-3 col-md-4 col-sm-12 my-2">
              <p className="text-primary mb-0">#ADS001245</p>
              <h3 className="fs-20 mb-2 text-ov mr-3">
                <Link className="text-black" to="/analytics">
                  50% OFF Floor Lamp Get it Now!
                </Link>
              </h3>
              <Link
                to="/social-network-campaign"
                className="lab la-facebook-f text-info mr-4"
              />
              <Link
                to="/social-network-campaign"
                className="lab la-instagram mr-4 text-secondary scale5"
              />
              <Link
                to="/social-network-campaign"
                className="lab la-twitter text-success scale5"
              />
            </div>
            <div className="col-xl-5 col-xxl-5 col-md-8 col-sm-12">
              <div className="row">
                <div className="d-flex col-xl-4 align-items-center col-md-4 col-sm-4 my-2 col-6">
                  <svg
                    className="mr-3 min-w28  ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                      fill="#C6A564"
                    />
                    <path
                      d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                      fill="#C6A564"
                    />
                    <path
                      d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                      fill="#C6A564"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">$63.04</h3>
                    <span className="fs-14">Conversion</span>
                  </div>
                </div>
                <div className="d-flex col-xl-4 align-items-center col-md-4  col-sm-4 my-2 col-6">
                  <svg
                    className="mr-3 min-w28  ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip1)">
                      <path
                        d="M14.0001 18.3131C16.3808 18.3131 18.3108 16.3831 18.3108 14.0024C18.3108 11.6217 16.3808 9.69177 14.0001 9.69177C11.6194 9.69177 9.68945 11.6217 9.68945 14.0024C9.68945 16.3831 11.6194 18.3131 14.0001 18.3131Z"
                        fill="#46A985"
                      />
                      <path
                        d="M27.5705 12.8083C24.257 8.80427 19.2413 4.95001 14.0001 4.95001C8.75776 4.95001 3.74086 8.80697 0.429583 12.8083C-0.143194 13.5002 -0.143194 14.5046 0.429583 15.1964C1.26208 16.2024 3.00735 18.1444 5.33834 19.8412C11.2089 24.1147 16.7783 24.1242 22.6618 19.8412C24.9928 18.1444 26.738 16.2024 27.5705 15.1964C28.1416 14.5059 28.1446 13.5025 27.5705 12.8083ZM14.0001 7.96747C17.3279 7.96747 20.035 10.6746 20.035 14.0024C20.035 17.3302 17.3279 20.0373 14.0001 20.0373C10.6722 20.0373 7.96514 17.3302 7.96514 14.0024C7.96514 10.6746 10.6722 7.96747 14.0001 7.96747Z"
                        fill="#46A985"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip1">
                        <rect width={28} height={28} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">5,412k</h3>
                    <span className="fs-14">Viewers</span>
                  </div>
                </div>
                <div className="d-flex align-items-center col-xl-4 col-md-4 col-sm-4 my-2 col-12">
                  <svg
                    className="mr-3 min-w28 ml-2"
                    width={28}
                    height={24}
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.0002 5.70001H2.8002C1.6452 5.70001 0.700195 6.62648 0.700195 7.75884V21.1412C0.700195 22.2735 1.6452 23.2 2.8002 23.2H7.0002C8.11109 23.2 9.10019 22.2293 9.10019 21.1412C9.10019 21.1412 9.10019 7.76295 9.10019 7.75884C9.10019 6.6656 8.12159 5.70001 7.0002 5.70001Z"
                      fill="#A949D7"
                    />
                    <path
                      d="M27.3002 10.0897V12.8199C27.3002 13.2026 27.2298 13.5646 27.0989 13.9162L24.7141 20.4833C24.2513 21.714 23.1444 22.5 21.8765 22.5H11.2002V5.93221C11.8643 4.76357 13.3536 2.09535 13.3536 2.09535C14.1787 0.637138 16.1912 0.347563 17.3584 1.54723C17.9119 2.11603 18.2439 2.91236 18.2439 3.73972V6.98709H24.2814C25.9418 6.98709 27.3002 8.38325 27.3002 10.0897Z"
                      fill="#A949D7"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">4,625k</h3>
                    <span className="fs-14">Likes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-md-12 col-sm-12">
              <div className="row">
                <div className="d-flex col-xl-8 col-xxl-6 align-items-center col-md-9 col-sm-8 my-2 col-7">
                  <svg
                    className="min-w28 mr-3 ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.001 0.875C6.7577 0.875 0.875983 6.75685 0.875983 14.0009C0.880359 16.319 1.51022 18.5877 2.67725 20.5873L0.8982 25.9244C0.78417 26.2666 1.10987 26.5921 1.45191 26.4782L6.55665 24.7769C8.74457 26.2915 11.3349 27.121 14.0001 27.125C21.2438 27.1248 27.1251 21.2435 27.1251 14C27.1251 6.75632 21.2442 0.875166 14.001 0.875ZM9.61488 12.6875C10.3345 12.6875 10.9274 13.2804 10.9274 14C10.9274 14.7198 10.3345 15.3125 9.61488 15.3125C8.89522 15.3125 8.30324 14.7198 8.30323 14C8.30323 13.2804 8.89521 12.6875 9.61488 12.6875ZM14.001 12.6875C14.7207 12.6875 15.3135 13.2804 15.3135 14C15.3135 14.7198 14.7206 15.3125 14.001 15.3125C13.2813 15.3125 12.6885 14.7198 12.6885 14C12.6885 13.2804 13.2813 12.6875 14.001 12.6875ZM18.3649 12.6875C19.0845 12.6875 19.6774 13.2804 19.6774 14C19.6774 14.7198 19.0845 15.3125 18.3649 15.3125C17.6452 15.3125 17.0524 14.7198 17.0524 14C17.0524 13.2804 17.6452 12.6875 18.3649 12.6875Z"
                      fill="#FF8E26"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">2,512</h3>
                    <span className="fs-14">Comments</span>
                  </div>
                </div>
                <div className="d-flex col-xl-4 col-xxl-6 align-items-center col-md-3  col-sm-4 my-2 col-5">
                  <div className="d-inline-block position-relative donut-chart-sale mr-sm-3 mr-xl-0">
                    <ChartDoughnut2
                      backgroundColor="#36E799"
                      height="90"
                      width="90"
                      value="71"
                    />
                    <small>71%</small>
                  </div>
                  <Dropdown className="ml-auto">
                    <Dropdown.Toggle
                      variant=""
                      className="icon-false btn-link p-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x={0} y={0} width={24} height={24} />
                          <circle fill="#000000" cx={12} cy={5} r={2} />
                          <circle fill="#000000" cx={12} cy={12} r={2} />
                          <circle fill="#000000" cx={12} cy={19} r={2} />
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                      <Dropdown.Item
                        className="text-black"
                        to="/social-network-campaign"
                      >
                        Info
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item text-black"
                        to="/social-network-campaign"
                      >
                        Details
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <div className="sca-row p-3 row align-items-center sp16 mx-0 mb-2 bg-white">
            <div className="mb-3 col-xl-4 col-xxl-3 col-md-4 col-sm-12 my-2">
              <p className="text-primary mb-0">#ADS001246</p>
              <h3 className="fs-20 mb-2 text-ov mr-3">
                <Link className="text-black" to="/analytics">
                  15% OFF Granite Stone
                </Link>
              </h3>
              <Link
                to="/social-network-campaign"
                className="lab la-facebook-f text-info mr-4"
              />
              <Link
                to="/social-network-campaign"
                className="lab la-instagram mr-4 text-secondary scale5"
              />
              <Link
                to="/social-network-campaign"
                className="lab la-twitter text-success scale5"
              />
            </div>
            <div className="col-xl-5 col-xxl-5 col-md-8 col-sm-12">
              <div className="row">
                <div className="d-flex col-xl-4 align-items-center col-md-4 col-sm-4 my-2 col-6">
                  <svg
                    className="mr-3 min-w28  ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                      fill="#C6A564"
                    />
                    <path
                      d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                      fill="#C6A564"
                    />
                    <path
                      d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                      fill="#C6A564"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">$74.02</h3>
                    <span className="fs-14">Conversion</span>
                  </div>
                </div>
                <div className="d-flex col-xl-4 align-items-center col-md-4  col-sm-4 my-2 col-6">
                  <svg
                    className="mr-3 min-w28  ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip2)">
                      <path
                        d="M14.0001 18.3131C16.3808 18.3131 18.3108 16.3831 18.3108 14.0024C18.3108 11.6217 16.3808 9.69177 14.0001 9.69177C11.6194 9.69177 9.68945 11.6217 9.68945 14.0024C9.68945 16.3831 11.6194 18.3131 14.0001 18.3131Z"
                        fill="#46A985"
                      />
                      <path
                        d="M27.5705 12.8083C24.257 8.80427 19.2413 4.95001 14.0001 4.95001C8.75776 4.95001 3.74086 8.80697 0.429583 12.8083C-0.143194 13.5002 -0.143194 14.5046 0.429583 15.1964C1.26208 16.2024 3.00735 18.1444 5.33834 19.8412C11.2089 24.1147 16.7783 24.1242 22.6618 19.8412C24.9928 18.1444 26.738 16.2024 27.5705 15.1964C28.1416 14.5059 28.1446 13.5025 27.5705 12.8083ZM14.0001 7.96747C17.3279 7.96747 20.035 10.6746 20.035 14.0024C20.035 17.3302 17.3279 20.0373 14.0001 20.0373C10.6722 20.0373 7.96514 17.3302 7.96514 14.0024C7.96514 10.6746 10.6722 7.96747 14.0001 7.96747Z"
                        fill="#46A985"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip2">
                        <rect width={28} height={28} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">3,687k</h3>
                    <span className="fs-14">Viewers</span>
                  </div>
                </div>
                <div className="d-flex align-items-center col-xl-4 col-md-4 col-sm-4 my-2 col-12">
                  <svg
                    className="mr-3 min-w28 ml-2"
                    width={28}
                    height={24}
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.0002 5.70001H2.8002C1.6452 5.70001 0.700195 6.62648 0.700195 7.75884V21.1412C0.700195 22.2735 1.6452 23.2 2.8002 23.2H7.0002C8.11109 23.2 9.10019 22.2293 9.10019 21.1412C9.10019 21.1412 9.10019 7.76295 9.10019 7.75884C9.10019 6.6656 8.12159 5.70001 7.0002 5.70001Z"
                      fill="#A949D7"
                    />
                    <path
                      d="M27.3002 10.0897V12.8199C27.3002 13.2026 27.2298 13.5646 27.0989 13.9162L24.7141 20.4833C24.2513 21.714 23.1444 22.5 21.8765 22.5H11.2002V5.93221C11.8643 4.76357 13.3536 2.09535 13.3536 2.09535C14.1787 0.637138 16.1912 0.347563 17.3584 1.54723C17.9119 2.11603 18.2439 2.91236 18.2439 3.73972V6.98709H24.2814C25.9418 6.98709 27.3002 8.38325 27.3002 10.0897Z"
                      fill="#A949D7"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">3,842k</h3>
                    <span className="fs-14">Likes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-md-12 col-sm-12">
              <div className="row">
                <div className="d-flex col-xl-8 col-xxl-6 align-items-center col-md-9 col-sm-8 my-2 col-7">
                  <svg
                    className="min-w28 mr-3 ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.001 0.875C6.7577 0.875 0.875983 6.75685 0.875983 14.0009C0.880359 16.319 1.51022 18.5877 2.67725 20.5873L0.8982 25.9244C0.78417 26.2666 1.10987 26.5921 1.45191 26.4782L6.55665 24.7769C8.74457 26.2915 11.3349 27.121 14.0001 27.125C21.2438 27.1248 27.1251 21.2435 27.1251 14C27.1251 6.75632 21.2442 0.875166 14.001 0.875ZM9.61488 12.6875C10.3345 12.6875 10.9274 13.2804 10.9274 14C10.9274 14.7198 10.3345 15.3125 9.61488 15.3125C8.89522 15.3125 8.30324 14.7198 8.30323 14C8.30323 13.2804 8.89521 12.6875 9.61488 12.6875ZM14.001 12.6875C14.7207 12.6875 15.3135 13.2804 15.3135 14C15.3135 14.7198 14.7206 15.3125 14.001 15.3125C13.2813 15.3125 12.6885 14.7198 12.6885 14C12.6885 13.2804 13.2813 12.6875 14.001 12.6875ZM18.3649 12.6875C19.0845 12.6875 19.6774 13.2804 19.6774 14C19.6774 14.7198 19.0845 15.3125 18.3649 15.3125C17.6452 15.3125 17.0524 14.7198 17.0524 14C17.0524 13.2804 17.6452 12.6875 18.3649 12.6875Z"
                      fill="#FF8E26"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">2,512</h3>
                    <span className="fs-14">Comments</span>
                  </div>
                </div>
                <div className="d-flex col-xl-4 col-xxl-6 align-items-center col-md-3  col-sm-4 my-2 col-5">
                  <div className="d-inline-block position-relative donut-chart-sale mr-sm-3 mr-xl-0">
                    <ChartDoughnut2
                      backgroundColor="#36E799"
                      height="90"
                      width="90"
                      value="71"
                    />
                    <small>71%</small>
                  </div>
                  <Dropdown className="ml-auto">
                    <Dropdown.Toggle
                      variant=""
                      className="icon-false btn-link p-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x={0} y={0} width={24} height={24} />
                          <circle fill="#000000" cx={12} cy={5} r={2} />
                          <circle fill="#000000" cx={12} cy={12} r={2} />
                          <circle fill="#000000" cx={12} cy={19} r={2} />
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                      <Dropdown.Item
                        className="text-black"
                        to="/social-network-campaign"
                      >
                        Info
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-black"
                        to="/social-network-campaign"
                      >
                        Details
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <div className="sca-row p-3 row align-items-center sp16 mx-0 mb-2 bg-white">
            <div className="mb-3 col-xl-4 col-xxl-3 col-md-4 col-sm-12 my-2">
              <p className="text-primary mb-0">#ADS001247</p>
              <h3 className="fs-20 mb-2 text-ov mr-3">
                <Link className="text-black" to="/analytics">
                  Game Online Vouchers 20% OFF
                </Link>
              </h3>
              <Link
                to="/social-network-campaign"
                className="lab la-facebook-f text-info mr-4"
              />
              <Link
                to="/social-network-campaign"
                className="lab la-instagram mr-4 text-secondary scale5"
              />
              <Link
                to="/social-network-campaign"
                className="lab la-twitter text-success scale5"
              />
            </div>
            <div className="col-xl-5 col-xxl-5 col-md-8 col-sm-12">
              <div className="row">
                <div className="d-flex col-xl-4 align-items-center col-md-4 col-sm-4 my-2 col-6">
                  <svg
                    className="mr-3 min-w28  ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                      fill="#C6A564"
                    />
                    <path
                      d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                      fill="#C6A564"
                    />
                    <path
                      d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                      fill="#C6A564"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">$245.55</h3>
                    <span className="fs-14">Conversion</span>
                  </div>
                </div>
                <div className="d-flex col-xl-4 align-items-center col-md-4  col-sm-4 my-2 col-6">
                  <svg
                    className="mr-3 min-w28  ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip3)">
                      <path
                        d="M14.0001 18.3131C16.3808 18.3131 18.3108 16.3831 18.3108 14.0024C18.3108 11.6217 16.3808 9.69177 14.0001 9.69177C11.6194 9.69177 9.68945 11.6217 9.68945 14.0024C9.68945 16.3831 11.6194 18.3131 14.0001 18.3131Z"
                        fill="#46A985"
                      />
                      <path
                        d="M27.5705 12.8083C24.257 8.80427 19.2413 4.95001 14.0001 4.95001C8.75776 4.95001 3.74086 8.80697 0.429583 12.8083C-0.143194 13.5002 -0.143194 14.5046 0.429583 15.1964C1.26208 16.2024 3.00735 18.1444 5.33834 19.8412C11.2089 24.1147 16.7783 24.1242 22.6618 19.8412C24.9928 18.1444 26.738 16.2024 27.5705 15.1964C28.1416 14.5059 28.1446 13.5025 27.5705 12.8083ZM14.0001 7.96747C17.3279 7.96747 20.035 10.6746 20.035 14.0024C20.035 17.3302 17.3279 20.0373 14.0001 20.0373C10.6722 20.0373 7.96514 17.3302 7.96514 14.0024C7.96514 10.6746 10.6722 7.96747 14.0001 7.96747Z"
                        fill="#46A985"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip3">
                        <rect width={28} height={28} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">2,412k</h3>
                    <span className="fs-14">Viewers</span>
                  </div>
                </div>
                <div className="d-flex align-items-center col-xl-4 col-md-4 col-sm-4 my-2 col-12">
                  <svg
                    className="mr-3 min-w28 ml-2"
                    width={28}
                    height={24}
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.0002 5.70001H2.8002C1.6452 5.70001 0.700195 6.62648 0.700195 7.75884V21.1412C0.700195 22.2735 1.6452 23.2 2.8002 23.2H7.0002C8.11109 23.2 9.10019 22.2293 9.10019 21.1412C9.10019 21.1412 9.10019 7.76295 9.10019 7.75884C9.10019 6.6656 8.12159 5.70001 7.0002 5.70001Z"
                      fill="#A949D7"
                    />
                    <path
                      d="M27.3002 10.0897V12.8199C27.3002 13.2026 27.2298 13.5646 27.0989 13.9162L24.7141 20.4833C24.2513 21.714 23.1444 22.5 21.8765 22.5H11.2002V5.93221C11.8643 4.76357 13.3536 2.09535 13.3536 2.09535C14.1787 0.637138 16.1912 0.347563 17.3584 1.54723C17.9119 2.11603 18.2439 2.91236 18.2439 3.73972V6.98709H24.2814C25.9418 6.98709 27.3002 8.38325 27.3002 10.0897Z"
                      fill="#A949D7"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">1,254</h3>
                    <span className="fs-14">Likes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-md-12 col-sm-12">
              <div className="row">
                <div className="d-flex col-xl-8 col-xxl-6 align-items-center col-md-9 col-sm-8 my-2 col-7">
                  <svg
                    className="min-w28 mr-3 ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.001 0.875C6.7577 0.875 0.875983 6.75685 0.875983 14.0009C0.880359 16.319 1.51022 18.5877 2.67725 20.5873L0.8982 25.9244C0.78417 26.2666 1.10987 26.5921 1.45191 26.4782L6.55665 24.7769C8.74457 26.2915 11.3349 27.121 14.0001 27.125C21.2438 27.1248 27.1251 21.2435 27.1251 14C27.1251 6.75632 21.2442 0.875166 14.001 0.875ZM9.61488 12.6875C10.3345 12.6875 10.9274 13.2804 10.9274 14C10.9274 14.7198 10.3345 15.3125 9.61488 15.3125C8.89522 15.3125 8.30324 14.7198 8.30323 14C8.30323 13.2804 8.89521 12.6875 9.61488 12.6875ZM14.001 12.6875C14.7207 12.6875 15.3135 13.2804 15.3135 14C15.3135 14.7198 14.7206 15.3125 14.001 15.3125C13.2813 15.3125 12.6885 14.7198 12.6885 14C12.6885 13.2804 13.2813 12.6875 14.001 12.6875ZM18.3649 12.6875C19.0845 12.6875 19.6774 13.2804 19.6774 14C19.6774 14.7198 19.0845 15.3125 18.3649 15.3125C17.6452 15.3125 17.0524 14.7198 17.0524 14C17.0524 13.2804 17.6452 12.6875 18.3649 12.6875Z"
                      fill="#FF8E26"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">6,125</h3>
                    <span className="fs-14">Comments</span>
                  </div>
                </div>
                <div className="d-flex col-xl-4 col-xxl-6 align-items-center col-md-3  col-sm-4 my-2 col-5">
                  <div className="d-inline-block position-relative donut-chart-sale mr-sm-3 mr-xl-0">
                    <ChartDoughnut2
                      backgroundColor="#36E799"
                      height="90"
                      width="90"
                      value="71"
                    />
                    <small>71%</small>
                  </div>
                  <Dropdown className="ml-auto">
                    <Dropdown.Toggle
                      variant=""
                      className="icon-false btn-link p-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x={0} y={0} width={24} height={24} />
                          <circle fill="#000000" cx={12} cy={5} r={2} />
                          <circle fill="#000000" cx={12} cy={12} r={2} />
                          <circle fill="#000000" cx={12} cy={19} r={2} />
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                      <Dropdown.Item
                        className="text-black"
                        to="/social-network-campaign"
                      >
                        Info
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-black"
                        to="/social-network-campaign"
                      >
                        Details
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <div className="sca-row p-3 row align-items-center sp16 mx-0 mb-2 bg-white">
            <div className="mb-3 col-xl-4 col-xxl-3 col-md-4 col-sm-12 my-2">
              <p className="text-primary mb-0">#ADS001245</p>
              <h3 className="fs-20 mb-2 text-ov mr-3">
                <Link className="text-black" to="/analytics">
                  50% OFF Floor Lamp Get it Now!
                </Link>
              </h3>
              <Link
                to="/social-network-campaign"
                className="lab la-facebook-f text-info mr-4"
              />
              <Link
                to="/social-network-campaign"
                className="lab la-instagram mr-4 text-secondary scale5"
              />
              <Link
                to="/social-network-campaign"
                className="lab la-twitter text-success scale5"
              />
            </div>
            <div className="col-xl-5 col-xxl-5 col-md-8 col-sm-12">
              <div className="row">
                <div className="d-flex col-xl-4 align-items-center col-md-4 col-sm-4 my-2 col-6">
                  <svg
                    className="mr-3 min-w28  ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                      fill="#C6A564"
                    />
                    <path
                      d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                      fill="#C6A564"
                    />
                    <path
                      d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                      fill="#C6A564"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">$63.04</h3>
                    <span className="fs-14">Conversion</span>
                  </div>
                </div>
                <div className="d-flex col-xl-4 align-items-center col-md-4  col-sm-4 my-2 col-6">
                  <svg
                    className="mr-3 min-w28  ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip4)">
                      <path
                        d="M14.0001 18.3131C16.3808 18.3131 18.3108 16.3831 18.3108 14.0024C18.3108 11.6217 16.3808 9.69177 14.0001 9.69177C11.6194 9.69177 9.68945 11.6217 9.68945 14.0024C9.68945 16.3831 11.6194 18.3131 14.0001 18.3131Z"
                        fill="#46A985"
                      />
                      <path
                        d="M27.5705 12.8083C24.257 8.80427 19.2413 4.95001 14.0001 4.95001C8.75776 4.95001 3.74086 8.80697 0.429583 12.8083C-0.143194 13.5002 -0.143194 14.5046 0.429583 15.1964C1.26208 16.2024 3.00735 18.1444 5.33834 19.8412C11.2089 24.1147 16.7783 24.1242 22.6618 19.8412C24.9928 18.1444 26.738 16.2024 27.5705 15.1964C28.1416 14.5059 28.1446 13.5025 27.5705 12.8083ZM14.0001 7.96747C17.3279 7.96747 20.035 10.6746 20.035 14.0024C20.035 17.3302 17.3279 20.0373 14.0001 20.0373C10.6722 20.0373 7.96514 17.3302 7.96514 14.0024C7.96514 10.6746 10.6722 7.96747 14.0001 7.96747Z"
                        fill="#46A985"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip4">
                        <rect width={28} height={28} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">5,412k</h3>
                    <span className="fs-14">Viewers</span>
                  </div>
                </div>
                <div className="d-flex align-items-center col-xl-4 col-md-4 col-sm-4 my-2 col-12">
                  <svg
                    className="mr-3 min-w28 ml-2"
                    width={28}
                    height={24}
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.0002 5.70001H2.8002C1.6452 5.70001 0.700195 6.62648 0.700195 7.75884V21.1412C0.700195 22.2735 1.6452 23.2 2.8002 23.2H7.0002C8.11109 23.2 9.10019 22.2293 9.10019 21.1412C9.10019 21.1412 9.10019 7.76295 9.10019 7.75884C9.10019 6.6656 8.12159 5.70001 7.0002 5.70001Z"
                      fill="#A949D7"
                    />
                    <path
                      d="M27.3002 10.0897V12.8199C27.3002 13.2026 27.2298 13.5646 27.0989 13.9162L24.7141 20.4833C24.2513 21.714 23.1444 22.5 21.8765 22.5H11.2002V5.93221C11.8643 4.76357 13.3536 2.09535 13.3536 2.09535C14.1787 0.637138 16.1912 0.347563 17.3584 1.54723C17.9119 2.11603 18.2439 2.91236 18.2439 3.73972V6.98709H24.2814C25.9418 6.98709 27.3002 8.38325 27.3002 10.0897Z"
                      fill="#A949D7"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">4,625k</h3>
                    <span className="fs-14">Likes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-md-12 col-sm-12">
              <div className="row">
                <div className="d-flex col-xl-8 col-xxl-6 align-items-center col-md-9 col-sm-8 my-2 col-7">
                  <svg
                    className="min-w28 mr-3 ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.001 0.875C6.7577 0.875 0.875983 6.75685 0.875983 14.0009C0.880359 16.319 1.51022 18.5877 2.67725 20.5873L0.8982 25.9244C0.78417 26.2666 1.10987 26.5921 1.45191 26.4782L6.55665 24.7769C8.74457 26.2915 11.3349 27.121 14.0001 27.125C21.2438 27.1248 27.1251 21.2435 27.1251 14C27.1251 6.75632 21.2442 0.875166 14.001 0.875ZM9.61488 12.6875C10.3345 12.6875 10.9274 13.2804 10.9274 14C10.9274 14.7198 10.3345 15.3125 9.61488 15.3125C8.89522 15.3125 8.30324 14.7198 8.30323 14C8.30323 13.2804 8.89521 12.6875 9.61488 12.6875ZM14.001 12.6875C14.7207 12.6875 15.3135 13.2804 15.3135 14C15.3135 14.7198 14.7206 15.3125 14.001 15.3125C13.2813 15.3125 12.6885 14.7198 12.6885 14C12.6885 13.2804 13.2813 12.6875 14.001 12.6875ZM18.3649 12.6875C19.0845 12.6875 19.6774 13.2804 19.6774 14C19.6774 14.7198 19.0845 15.3125 18.3649 15.3125C17.6452 15.3125 17.0524 14.7198 17.0524 14C17.0524 13.2804 17.6452 12.6875 18.3649 12.6875Z"
                      fill="#FF8E26"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">2,512</h3>
                    <span className="fs-14">Comments</span>
                  </div>
                </div>
                <div className="d-flex col-xl-4 col-xxl-6 align-items-center col-md-3  col-sm-4 my-2 col-5">
                  <div className="d-inline-block position-relative donut-chart-sale mr-sm-3 mr-xl-0">
                    <ChartDoughnut2
                      backgroundColor="#36E799"
                      height="90"
                      width="90"
                      value="71"
                    />
                    <small>71%</small>
                  </div>
                  <Dropdown className="ml-auto">
                    <Dropdown.Toggle
                      variant=""
                      className="icon-false btn-link p-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x={0} y={0} width={24} height={24} />
                          <circle fill="#000000" cx={12} cy={5} r={2} />
                          <circle fill="#000000" cx={12} cy={12} r={2} />
                          <circle fill="#000000" cx={12} cy={19} r={2} />
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                      <Dropdown.Item
                        className="text-black"
                        to="/social-network-campaign"
                      >
                        Info
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-black"
                        to="/social-network-campaign"
                      >
                        Details
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <div className="sca-row p-3 row align-items-center sp16 mx-0 mb-2 bg-white">
            <div className="mb-3 col-xl-4 col-xxl-3 col-md-4 col-sm-12 my-2">
              <p className="text-primary mb-0">#ADS001246</p>
              <h3 className="fs-20 mb-2 text-ov mr-3">
                <Link className="text-black" to="/analytics">
                  15% OFF Granite Stone
                </Link>
              </h3>
              <Link
                to="/social-network-campaign"
                className="lab la-facebook-f text-info mr-4"
              />
              <Link
                to="/social-network-campaign"
                className="lab la-instagram mr-4 text-secondary scale5"
              />
              <Link
                to="/social-network-campaign"
                className="lab la-twitter text-success scale5"
              />
            </div>
            <div className="col-xl-5 col-xxl-5 col-md-8 col-sm-12">
              <div className="row">
                <div className="d-flex col-xl-4 align-items-center col-md-4 col-sm-4 my-2 col-6">
                  <svg
                    className="mr-3 min-w28  ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                      fill="#C6A564"
                    />
                    <path
                      d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                      fill="#C6A564"
                    />
                    <path
                      d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                      fill="#C6A564"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">$74.02</h3>
                    <span className="fs-14">Conversion</span>
                  </div>
                </div>
                <div className="d-flex col-xl-4 align-items-center col-md-4  col-sm-4 my-2 col-6">
                  <svg
                    className="mr-3 min-w28  ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip5)">
                      <path
                        d="M14.0001 18.3131C16.3808 18.3131 18.3108 16.3831 18.3108 14.0024C18.3108 11.6217 16.3808 9.69177 14.0001 9.69177C11.6194 9.69177 9.68945 11.6217 9.68945 14.0024C9.68945 16.3831 11.6194 18.3131 14.0001 18.3131Z"
                        fill="#46A985"
                      />
                      <path
                        d="M27.5705 12.8083C24.257 8.80427 19.2413 4.95001 14.0001 4.95001C8.75776 4.95001 3.74086 8.80697 0.429583 12.8083C-0.143194 13.5002 -0.143194 14.5046 0.429583 15.1964C1.26208 16.2024 3.00735 18.1444 5.33834 19.8412C11.2089 24.1147 16.7783 24.1242 22.6618 19.8412C24.9928 18.1444 26.738 16.2024 27.5705 15.1964C28.1416 14.5059 28.1446 13.5025 27.5705 12.8083ZM14.0001 7.96747C17.3279 7.96747 20.035 10.6746 20.035 14.0024C20.035 17.3302 17.3279 20.0373 14.0001 20.0373C10.6722 20.0373 7.96514 17.3302 7.96514 14.0024C7.96514 10.6746 10.6722 7.96747 14.0001 7.96747Z"
                        fill="#46A985"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip5">
                        <rect width={28} height={28} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">3,687k</h3>
                    <span className="fs-14">Viewers</span>
                  </div>
                </div>
                <div className="d-flex align-items-center col-xl-4 col-md-4 col-sm-4 my-2 col-12">
                  <svg
                    className="mr-3 min-w28 ml-2"
                    width={28}
                    height={24}
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.0002 5.70001H2.8002C1.6452 5.70001 0.700195 6.62648 0.700195 7.75884V21.1412C0.700195 22.2735 1.6452 23.2 2.8002 23.2H7.0002C8.11109 23.2 9.10019 22.2293 9.10019 21.1412C9.10019 21.1412 9.10019 7.76295 9.10019 7.75884C9.10019 6.6656 8.12159 5.70001 7.0002 5.70001Z"
                      fill="#A949D7"
                    />
                    <path
                      d="M27.3002 10.0897V12.8199C27.3002 13.2026 27.2298 13.5646 27.0989 13.9162L24.7141 20.4833C24.2513 21.714 23.1444 22.5 21.8765 22.5H11.2002V5.93221C11.8643 4.76357 13.3536 2.09535 13.3536 2.09535C14.1787 0.637138 16.1912 0.347563 17.3584 1.54723C17.9119 2.11603 18.2439 2.91236 18.2439 3.73972V6.98709H24.2814C25.9418 6.98709 27.3002 8.38325 27.3002 10.0897Z"
                      fill="#A949D7"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">3,842k</h3>
                    <span className="fs-14">Likes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-md-12 col-sm-12">
              <div className="row">
                <div className="d-flex col-xl-8 col-xxl-6 align-items-center col-md-9 col-sm-8 my-2 col-7">
                  <svg
                    className="min-w28 mr-3 ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.001 0.875C6.7577 0.875 0.875983 6.75685 0.875983 14.0009C0.880359 16.319 1.51022 18.5877 2.67725 20.5873L0.8982 25.9244C0.78417 26.2666 1.10987 26.5921 1.45191 26.4782L6.55665 24.7769C8.74457 26.2915 11.3349 27.121 14.0001 27.125C21.2438 27.1248 27.1251 21.2435 27.1251 14C27.1251 6.75632 21.2442 0.875166 14.001 0.875ZM9.61488 12.6875C10.3345 12.6875 10.9274 13.2804 10.9274 14C10.9274 14.7198 10.3345 15.3125 9.61488 15.3125C8.89522 15.3125 8.30324 14.7198 8.30323 14C8.30323 13.2804 8.89521 12.6875 9.61488 12.6875ZM14.001 12.6875C14.7207 12.6875 15.3135 13.2804 15.3135 14C15.3135 14.7198 14.7206 15.3125 14.001 15.3125C13.2813 15.3125 12.6885 14.7198 12.6885 14C12.6885 13.2804 13.2813 12.6875 14.001 12.6875ZM18.3649 12.6875C19.0845 12.6875 19.6774 13.2804 19.6774 14C19.6774 14.7198 19.0845 15.3125 18.3649 15.3125C17.6452 15.3125 17.0524 14.7198 17.0524 14C17.0524 13.2804 17.6452 12.6875 18.3649 12.6875Z"
                      fill="#FF8E26"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">2,512</h3>
                    <span className="fs-14">Comments</span>
                  </div>
                </div>
                <div className="d-flex col-xl-4 col-xxl-6 align-items-center col-md-3  col-sm-4 my-2 col-5">
                  <div className="d-inline-block position-relative donut-chart-sale mr-sm-3 mr-xl-0">
                    <ChartDoughnut2
                      backgroundColor="#36E799"
                      height="90"
                      width="90"
                      value="71"
                    />
                    <small>71%</small>
                  </div>
                  <Dropdown className="ml-auto">
                    <Dropdown.Toggle
                      variant=""
                      className="icon-false btn-link p-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x={0} y={0} width={24} height={24} />
                          <circle fill="#000000" cx={12} cy={5} r={2} />
                          <circle fill="#000000" cx={12} cy={12} r={2} />
                          <circle fill="#000000" cx={12} cy={19} r={2} />
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                      <Dropdown.Item
                        className="text-black"
                        to="/social-network-campaign"
                      >
                        Info
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-black"
                        to="/social-network-campaign"
                      >
                        Details
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <div className="sca-row p-3 row align-items-center sp16 mx-0 mb-2 bg-white">
            <div className="mb-3 col-xl-4 col-xxl-3 col-md-4 col-sm-12 my-2">
              <p className="text-primary mb-0">#ADS001247</p>
              <h3 className="fs-20 mb-2 text-ov mr-3">
                <Link className="text-black" to="/analytics">
                  Game Online Vouchers 20% OFF
                </Link>
              </h3>
              <Link
                to="/social-network-campaign"
                className="lab la-facebook-f text-info mr-4"
              />
              <Link
                to="/social-network-campaign"
                className="lab la-instagram mr-4 text-secondary scale5"
              />
              <Link
                to="/social-network-campaign"
                className="lab la-twitter text-success scale5"
              />
            </div>
            <div className="col-xl-5 col-xxl-5 col-md-8 col-sm-12">
              <div className="row">
                <div className="d-flex col-xl-4 align-items-center col-md-4 col-sm-4 my-2 col-6">
                  <svg
                    className="mr-3 min-w28  ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                      fill="#C6A564"
                    />
                    <path
                      d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                      fill="#C6A564"
                    />
                    <path
                      d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                      fill="#C6A564"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">$245.55</h3>
                    <span className="fs-14">Conversion</span>
                  </div>
                </div>
                <div className="d-flex col-xl-4 align-items-center col-md-4  col-sm-4 my-2 col-6">
                  <svg
                    className="mr-3 min-w28  ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip6)">
                      <path
                        d="M14.0001 18.3131C16.3808 18.3131 18.3108 16.3831 18.3108 14.0024C18.3108 11.6217 16.3808 9.69177 14.0001 9.69177C11.6194 9.69177 9.68945 11.6217 9.68945 14.0024C9.68945 16.3831 11.6194 18.3131 14.0001 18.3131Z"
                        fill="#46A985"
                      />
                      <path
                        d="M27.5705 12.8083C24.257 8.80427 19.2413 4.95001 14.0001 4.95001C8.75776 4.95001 3.74086 8.80697 0.429583 12.8083C-0.143194 13.5002 -0.143194 14.5046 0.429583 15.1964C1.26208 16.2024 3.00735 18.1444 5.33834 19.8412C11.2089 24.1147 16.7783 24.1242 22.6618 19.8412C24.9928 18.1444 26.738 16.2024 27.5705 15.1964C28.1416 14.5059 28.1446 13.5025 27.5705 12.8083ZM14.0001 7.96747C17.3279 7.96747 20.035 10.6746 20.035 14.0024C20.035 17.3302 17.3279 20.0373 14.0001 20.0373C10.6722 20.0373 7.96514 17.3302 7.96514 14.0024C7.96514 10.6746 10.6722 7.96747 14.0001 7.96747Z"
                        fill="#46A985"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip6">
                        <rect width={28} height={28} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">2,412k</h3>
                    <span className="fs-14">Viewers</span>
                  </div>
                </div>
                <div className="d-flex align-items-center col-xl-4 col-md-4 col-sm-4 my-2 col-12">
                  <svg
                    className="mr-3 min-w28 ml-2"
                    width={28}
                    height={24}
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.0002 5.70001H2.8002C1.6452 5.70001 0.700195 6.62648 0.700195 7.75884V21.1412C0.700195 22.2735 1.6452 23.2 2.8002 23.2H7.0002C8.11109 23.2 9.10019 22.2293 9.10019 21.1412C9.10019 21.1412 9.10019 7.76295 9.10019 7.75884C9.10019 6.6656 8.12159 5.70001 7.0002 5.70001Z"
                      fill="#A949D7"
                    />
                    <path
                      d="M27.3002 10.0897V12.8199C27.3002 13.2026 27.2298 13.5646 27.0989 13.9162L24.7141 20.4833C24.2513 21.714 23.1444 22.5 21.8765 22.5H11.2002V5.93221C11.8643 4.76357 13.3536 2.09535 13.3536 2.09535C14.1787 0.637138 16.1912 0.347563 17.3584 1.54723C17.9119 2.11603 18.2439 2.91236 18.2439 3.73972V6.98709H24.2814C25.9418 6.98709 27.3002 8.38325 27.3002 10.0897Z"
                      fill="#A949D7"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">1,254</h3>
                    <span className="fs-14">Likes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-md-12 col-sm-12">
              <div className="row">
                <div className="d-flex col-xl-8 col-xxl-6 align-items-center col-md-9 col-sm-8 my-2 col-7">
                  <svg
                    className="min-w28 mr-3 ml-2"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.001 0.875C6.7577 0.875 0.875983 6.75685 0.875983 14.0009C0.880359 16.319 1.51022 18.5877 2.67725 20.5873L0.8982 25.9244C0.78417 26.2666 1.10987 26.5921 1.45191 26.4782L6.55665 24.7769C8.74457 26.2915 11.3349 27.121 14.0001 27.125C21.2438 27.1248 27.1251 21.2435 27.1251 14C27.1251 6.75632 21.2442 0.875166 14.001 0.875ZM9.61488 12.6875C10.3345 12.6875 10.9274 13.2804 10.9274 14C10.9274 14.7198 10.3345 15.3125 9.61488 15.3125C8.89522 15.3125 8.30324 14.7198 8.30323 14C8.30323 13.2804 8.89521 12.6875 9.61488 12.6875ZM14.001 12.6875C14.7207 12.6875 15.3135 13.2804 15.3135 14C15.3135 14.7198 14.7206 15.3125 14.001 15.3125C13.2813 15.3125 12.6885 14.7198 12.6885 14C12.6885 13.2804 13.2813 12.6875 14.001 12.6875ZM18.3649 12.6875C19.0845 12.6875 19.6774 13.2804 19.6774 14C19.6774 14.7198 19.0845 15.3125 18.3649 15.3125C17.6452 15.3125 17.0524 14.7198 17.0524 14C17.0524 13.2804 17.6452 12.6875 18.3649 12.6875Z"
                      fill="#FF8E26"
                    />
                  </svg>
                  <div>
                    <h3 className="fs-20 text-black mb-0">6,125</h3>
                    <span className="fs-14">Comments</span>
                  </div>
                </div>
                <div className="d-flex col-xl-4 col-xxl-6 align-items-center col-md-3  col-sm-4 my-2 col-5">
                  <div className="d-inline-block position-relative donut-chart-sale mr-sm-3 mr-xl-0">
                    <ChartDoughnut2
                      backgroundColor="#36E799"
                      height="90"
                      width="90"
                      value="71"
                    />
                    <small>71%</small>
                  </div>
                  <Dropdown className="ml-auto">
                    <Dropdown.Toggle
                      variant=""
                      className="icon-false btn-link p-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x={0} y={0} width={24} height={24} />
                          <circle fill="#000000" cx={12} cy={5} r={2} />
                          <circle fill="#000000" cx={12} cy={12} r={2} />
                          <circle fill="#000000" cx={12} cy={19} r={2} />
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                      <Dropdown.Item
                        className="text-black"
                        to="/social-network-campaign"
                      >
                        Info
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-black"
                        to="/social-network-campaign"
                      >
                        Details
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SocialNetworkCampaign;
