import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import ChartDoughnut2 from "../charts/Chartjs/donught2";

function Campaign() {
  return (
    <>
      <div className="form-head d-flex mb-0 mb-lg-4 align-items-start">
        <div className="mr-auto d-none d-lg-block">
          <h2 className="text-black font-w600">Campaign</h2>
          <p className="mb-0">Current campaign list</p>
        </div>
        <div className="d-none d-lg-flex align-items-center">
          <div className="text-right">
            <h3 className="fs-20 text-black mb-0">09:62 AM</h3>
            <span className="fs-14">Monday, 3 Augusut 2020</span>
          </div>
          <Link
            className="ml-4 text-black p-3 rounded border text-center width60"
            to="/campaign"
          >
            <i className="las la-cog scale5" />
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="d-lg-flex d-block pl-0 pr-0 border-0 align-items-end justify-content-between mb-3">
            <div className>
              <Link to="/campaign" className="btn bg-white mb-2 mr-2">
                <svg
                  className="mr-2 scale5"
                  width={14}
                  height={14}
                  viewBox="0 0 18 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.9375 4.6875V22.5625C17.9378 22.7117 17.897 22.8581 17.8196 22.9857C17.7422 23.1132 17.6312 23.217 17.4987 23.2856C17.3831 23.3449 17.2549 23.3755 17.125 23.375C16.9593 23.3746 16.7977 23.3236 16.6619 23.2288L9 17.8662L1.33813 23.2288C1.21968 23.3089 1.08218 23.3564 0.939516 23.3664C0.796853 23.3763 0.65408 23.3485 0.525625 23.2856C0.388595 23.2204 0.272581 23.118 0.190727 22.9902C0.108873 22.8624 0.064453 22.7143 0.0625 22.5625V4.6875C0.0625 3.61006 0.490512 2.57675 1.25238 1.81488C2.01425 1.05301 3.04756 0.625 4.125 0.625H13.875C14.9524 0.625 15.9858 1.05301 16.7476 1.81488C17.5095 2.57675 17.9375 3.61006 17.9375 4.6875Z"
                    fill="#353751"
                  />
                </svg>
                <span className="text-black">Boookmark</span>
              </Link>
              <Link to="/campaign" className="btn bg-white mb-2 mr-2">
                <svg
                  className="mr-2 scale5"
                  width={14}
                  height={14}
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.72803 10.4999L9.72796 3.1005C9.72795 1.31868 11.8822 0.426337 13.1422 1.68627L21.0416 9.58573C21.8227 10.3668 21.8227 11.6331 21.0416 12.4142L13.1422 20.3136C11.8822 21.5735 9.72795 20.6812 9.72796 18.8994L9.72803 10.4999Z"
                    fill="#36E799"
                  />
                </svg>
                <span className="text-black">Start</span>
              </Link>
              <Link to="/campaign" className="btn bg-white mb-2 mr-2">
                <svg
                  className="mr-2 scale5 scale5"
                  width={14}
                  height={14}
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1C8 0.447716 8.44772 0 9 0H11C11.5523 0 12 0.447715 12 1V17C12 17.5523 11.5523 18 11 18H9C8.44772 18 8 17.5523 8 17V1Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M0 1C0 0.447716 0.447715 0 1 0H3C3.55228 0 4 0.447715 4 1V17C4 17.5523 3.55228 18 3 18H1C0.447715 18 0 17.5523 0 17V1Z"
                    fill="#8E8E8E"
                  />
                </svg>
                <span className="text-black">Pause</span>
              </Link>
              <Link to="/campaign" className="btn bg-white mb-2 mr-2">
                <svg
                  className="mr-2 scale5"
                  width={14}
                  height={14}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width={14} height={14} rx={2} fill="#F83737" />
                </svg>
                <span className="text-black">Stop</span>
              </Link>
            </div>
            <div>
              <Link to="/campaign" className="btn bg-white mb-2 mr-2">
                <svg
                  width={14}
                  height={14}
                  className="scale5"
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
              <Dropdown className="custom-dropdown mb-2">
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
                  <Dropdown.Item className="" to="/campaign">
                    4 June 2020 - 4 July 2020
                  </Dropdown.Item>
                  <Dropdown.Item className="" to="/campaign">
                    5 july 2020 - 4 Aug 2020
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="campaign-audio col-md-12">
          <div className="compaign-row align-items-center p-sm-4 p-3 row sp16 mx-0 mb-2">
            <div className="my-2 col-xl-4 col-xxl-6 col-lg-6 col-md-8 col-sm-12">
              <div className="media align-items-center">
                <div className="d-inline-block position-relative donut-chart-sale mr-4">
                  <ChartDoughnut2
                    backgroundColor="#36E799"
                    height="90"
                    width="90"
                    value="63"
                  />
                  <small>63%</small>
                </div>
                <div className="media-body">
                  <p className="text-primary mb-1">#ADS001245</p>
                  <h3 className="fs-20">
                    <Link className="text-black" to="/analytics">
                      50% OFF Floor Lamp Get it Now!
                    </Link>
                  </h3>
                  <svg
                    width={17}
                    height={14}
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 2L5 12.01L2 9.01"
                      stroke="#737373"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="fs-14 ml-1">Published on 5 March 2020</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-xxl-6 col-lg-6 col-md-4 col-sm-8 px-3">
              <div className="row align-items-center my-2">
                <div className="col-6">
                  <h3 className="fs-20 text-black">$63.04</h3>
                  <span className="fs-14">Today Spends</span>
                </div>
                <div className="col-6">
                  <h3 className="fs-20 text-black">$652.86</h3>
                  <span className="fs-14">Today Spends</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-xxl-4 col-lg-4 col-md-6 text-center my-2 col-sm-4">
              <Link className="btn btn-outline-dark p-3 text-ov" to="/campaign">
                <svg
                  className="mr-2 scale5"
                  width={14}
                  height={14}
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1583 3.8476H1.93099C0.971333 3.8476 0.191895 4.62703 0.191895 5.58669V20.2608C0.191895 21.2205 0.971333 21.9999 1.93099 21.9999H12.1583C13.118 21.9999 13.8974 21.2205 13.8974 20.2608V5.58669C13.8929 4.62703 13.1135 3.8476 12.1583 3.8476ZM12.6764 20.2563C12.6764 20.5447 12.4422 20.779 12.1538 20.779H1.92648C1.63814 20.779 1.40385 20.5447 1.40385 20.2563V5.58669C1.40385 5.29834 1.63814 5.06406 1.92648 5.06406H12.1538C12.4422 5.06406 12.6764 5.29834 12.6764 5.58669V20.2563Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M16.069 0H5.84163C4.88198 0 4.10254 0.779439 4.10254 1.73909C4.10254 2.077 4.37286 2.34733 4.71077 2.34733C5.04868 2.34733 5.319 2.077 5.319 1.73909C5.319 1.45075 5.55329 1.21647 5.84163 1.21647H16.069C16.3573 1.21647 16.5916 1.45075 16.5916 1.73909V16.4133C16.5916 16.7016 16.3573 16.9359 16.069 16.9359C15.731 16.9359 15.4607 17.2062 15.4607 17.5441C15.4607 17.882 15.731 18.1524 16.069 18.1524C17.0286 18.1524 17.808 17.3729 17.808 16.4133V1.73909C17.808 0.779439 17.0286 0 16.069 0Z"
                    fill="#8E8E8E"
                  />
                </svg>
                https://eclan.io/campaign0123...
              </Link>
            </div>
            <div className="col-xl-4 col-xxl-8 col-lg-8 col-md-6 text-left text-md-right my-2">
              <Link
                to="/campaign"
                className="btn bgl-primary text-primary cl-btn mb-2"
              >
                On Going
              </Link>
              <Link
                to="/campaign"
                className="border border-primary audio-btn ml-2 mb-2"
              >
                <svg
                  width={20}
                  height={18}
                  viewBox="0 0 13 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.272217 9.5L0.272153 2.10056C0.272138 0.318742 2.42643 -0.573602 3.68637 0.686334L11.5858 8.58579C12.3669 9.36684 12.3669 10.6332 11.5858 11.4142L3.68636 19.3137C2.42643 20.5736 0.272136 19.6813 0.27215 17.8994L0.272217 9.5Z"
                    fill="#36E799"
                  />
                </svg>
              </Link>
              <Link
                to="/campaign"
                className="border border-dark audio-btn ml-2 mb-2"
              >
                <svg
                  width={12}
                  height={18}
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1C8 0.447716 8.44772 0 9 0H11C11.5523 0 12 0.447715 12 1V17C12 17.5523 11.5523 18 11 18H9C8.44772 18 8 17.5523 8 17V1Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M0 1C0 0.447716 0.447715 0 1 0H3C3.55228 0 4 0.447715 4 1V17C4 17.5523 3.55228 18 3 18H1C0.447715 18 0 17.5523 0 17V1Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </Link>
              <Link
                to="/campaign"
                className="border border-danger audio-btn ml-2 mb-2"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width={18} height={18} rx={2} fill="#F83737" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="compaign-row align-items-center p-sm-4 p-3 row sp16 mx-0 mb-2">
            <div className="my-2 col-xl-4 col-xxl-6 col-lg-6 col-md-8 col-sm-12">
              <div className="media align-items-center">
                <div className="d-inline-block position-relative donut-chart-sale mr-4">
                  <ChartDoughnut2
                    backgroundColor="#36E799"
                    height="90"
                    width="90"
                    value="38"
                  />
                  <small>38%</small>
                </div>
                <div className="media-body">
                  <p className="text-primary mb-1">#ADS001245</p>
                  <h3 className="fs-20">
                    <Link className="text-black" to="/analytics">
                      15% OFF Granite Stone
                    </Link>
                  </h3>
                  <svg
                    width={17}
                    height={14}
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 2L5 12.01L2 9.01"
                      stroke="#737373"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="fs-14 ml-1">Published on 5 March 2020</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-xxl-6 col-lg-6 col-md-4 col-sm-8 px-3">
              <div className="row align-items-center my-2">
                <div className="col-6">
                  <h3 className="fs-20 text-black">$63.04</h3>
                  <span className="fs-14">Today Spends</span>
                </div>
                <div className="col-6">
                  <h3 className="fs-20 text-black">$652.86</h3>
                  <span className="fs-14">Today Spends</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-xxl-4 col-lg-4 col-md-6 text-center my-2 col-sm-4">
              <Link className="btn btn-outline-dark p-3 text-ov" to="/campaign">
                <svg
                  className="mr-2 scale5"
                  width={14}
                  height={14}
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1583 3.8476H1.93099C0.971333 3.8476 0.191895 4.62703 0.191895 5.58669V20.2608C0.191895 21.2205 0.971333 21.9999 1.93099 21.9999H12.1583C13.118 21.9999 13.8974 21.2205 13.8974 20.2608V5.58669C13.8929 4.62703 13.1135 3.8476 12.1583 3.8476ZM12.6764 20.2563C12.6764 20.5447 12.4422 20.779 12.1538 20.779H1.92648C1.63814 20.779 1.40385 20.5447 1.40385 20.2563V5.58669C1.40385 5.29834 1.63814 5.06406 1.92648 5.06406H12.1538C12.4422 5.06406 12.6764 5.29834 12.6764 5.58669V20.2563Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M16.069 0H5.84163C4.88198 0 4.10254 0.779439 4.10254 1.73909C4.10254 2.077 4.37286 2.34733 4.71077 2.34733C5.04868 2.34733 5.319 2.077 5.319 1.73909C5.319 1.45075 5.55329 1.21647 5.84163 1.21647H16.069C16.3573 1.21647 16.5916 1.45075 16.5916 1.73909V16.4133C16.5916 16.7016 16.3573 16.9359 16.069 16.9359C15.731 16.9359 15.4607 17.2062 15.4607 17.5441C15.4607 17.882 15.731 18.1524 16.069 18.1524C17.0286 18.1524 17.808 17.3729 17.808 16.4133V1.73909C17.808 0.779439 17.0286 0 16.069 0Z"
                    fill="#8E8E8E"
                  />
                </svg>
                https://eclan.io/campaign0123...
              </Link>
            </div>
            <div className="col-xl-4 col-xxl-8 col-lg-8 col-md-6 text-left text-md-right my-2">
              <Link
                to="/campaign"
                className="btn bgl-primary text-primary cl-btn mb-2"
              >
                On Going
              </Link>
              <Link
                to="/campaign"
                className="border border-primary audio-btn ml-2 mb-2"
              >
                <svg
                  width={20}
                  height={18}
                  viewBox="0 0 13 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.272217 9.5L0.272153 2.10056C0.272138 0.318742 2.42643 -0.573602 3.68637 0.686334L11.5858 8.58579C12.3669 9.36684 12.3669 10.6332 11.5858 11.4142L3.68636 19.3137C2.42643 20.5736 0.272136 19.6813 0.27215 17.8994L0.272217 9.5Z"
                    fill="#36E799"
                  />
                </svg>
              </Link>
              <Link
                to="/campaign"
                className="border border-dark audio-btn ml-2 mb-2"
              >
                <svg
                  width={12}
                  height={18}
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1C8 0.447716 8.44772 0 9 0H11C11.5523 0 12 0.447715 12 1V17C12 17.5523 11.5523 18 11 18H9C8.44772 18 8 17.5523 8 17V1Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M0 1C0 0.447716 0.447715 0 1 0H3C3.55228 0 4 0.447715 4 1V17C4 17.5523 3.55228 18 3 18H1C0.447715 18 0 17.5523 0 17V1Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </Link>
              <Link
                to="/campaign"
                className="border border-danger audio-btn ml-2 mb-2"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width={18} height={18} rx={2} fill="#F83737" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="compaign-row align-items-center p-sm-4 p-3 row sp16 mx-0 mb-2">
            <div className="my-2 col-xl-4 col-xxl-6 col-lg-6 col-md-8 col-sm-12">
              <div className="media align-items-center">
                <div className="d-inline-block position-relative donut-chart-sale mr-4">
                  <ChartDoughnut2
                    backgroundColor="#36E799"
                    height="90"
                    width="90"
                    value="50"
                  />
                  <small>50%</small>
                </div>
                <div className="media-body">
                  <p className="text-primary mb-1">#ADS001245</p>
                  <h3 className="fs-20">
                    <Link className="text-black" to="/analytics">
                      Game Online Vouchers 20% OFF
                    </Link>
                  </h3>
                  <svg
                    width={17}
                    height={14}
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 2L5 12.01L2 9.01"
                      stroke="#737373"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="fs-14 ml-1">Published on 5 March 2020</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-xxl-6 col-lg-6 col-md-4 col-sm-8 px-3">
              <div className="row align-items-center my-2">
                <div className="col-6">
                  <h3 className="fs-20 text-black">$63.04</h3>
                  <span className="fs-14">Today Spends</span>
                </div>
                <div className="col-6">
                  <h3 className="fs-20 text-black">$652.86</h3>
                  <span className="fs-14">Today Spends</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-xxl-4 col-lg-4 col-md-6 text-center my-2 col-sm-4">
              <Link className="btn btn-outline-dark p-3 text-ov" to="/campaign">
                <svg
                  className="mr-2 scale5"
                  width={14}
                  height={14}
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1583 3.8476H1.93099C0.971333 3.8476 0.191895 4.62703 0.191895 5.58669V20.2608C0.191895 21.2205 0.971333 21.9999 1.93099 21.9999H12.1583C13.118 21.9999 13.8974 21.2205 13.8974 20.2608V5.58669C13.8929 4.62703 13.1135 3.8476 12.1583 3.8476ZM12.6764 20.2563C12.6764 20.5447 12.4422 20.779 12.1538 20.779H1.92648C1.63814 20.779 1.40385 20.5447 1.40385 20.2563V5.58669C1.40385 5.29834 1.63814 5.06406 1.92648 5.06406H12.1538C12.4422 5.06406 12.6764 5.29834 12.6764 5.58669V20.2563Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M16.069 0H5.84163C4.88198 0 4.10254 0.779439 4.10254 1.73909C4.10254 2.077 4.37286 2.34733 4.71077 2.34733C5.04868 2.34733 5.319 2.077 5.319 1.73909C5.319 1.45075 5.55329 1.21647 5.84163 1.21647H16.069C16.3573 1.21647 16.5916 1.45075 16.5916 1.73909V16.4133C16.5916 16.7016 16.3573 16.9359 16.069 16.9359C15.731 16.9359 15.4607 17.2062 15.4607 17.5441C15.4607 17.882 15.731 18.1524 16.069 18.1524C17.0286 18.1524 17.808 17.3729 17.808 16.4133V1.73909C17.808 0.779439 17.0286 0 16.069 0Z"
                    fill="#8E8E8E"
                  />
                </svg>
                https://eclan.io/campaign0123...
              </Link>
            </div>
            <div className="col-xl-4 col-xxl-8 col-lg-8 col-md-6 text-left text-md-right my-2">
              <Link
                to="/campaign"
                className="btn bgl-primary text-primary cl-btn mb-2"
              >
                On Going
              </Link>
              <Link
                to="/campaign"
                className="border border-primary audio-btn ml-2 mb-2"
              >
                <svg
                  width={20}
                  height={18}
                  viewBox="0 0 13 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.272217 9.5L0.272153 2.10056C0.272138 0.318742 2.42643 -0.573602 3.68637 0.686334L11.5858 8.58579C12.3669 9.36684 12.3669 10.6332 11.5858 11.4142L3.68636 19.3137C2.42643 20.5736 0.272136 19.6813 0.27215 17.8994L0.272217 9.5Z"
                    fill="#36E799"
                  />
                </svg>
              </Link>
              <Link
                to="/campaign"
                className="border border-dark audio-btn ml-2 mb-2"
              >
                <svg
                  width={12}
                  height={18}
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1C8 0.447716 8.44772 0 9 0H11C11.5523 0 12 0.447715 12 1V17C12 17.5523 11.5523 18 11 18H9C8.44772 18 8 17.5523 8 17V1Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M0 1C0 0.447716 0.447715 0 1 0H3C3.55228 0 4 0.447715 4 1V17C4 17.5523 3.55228 18 3 18H1C0.447715 18 0 17.5523 0 17V1Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </Link>
              <Link
                to="/campaign"
                className="border border-danger audio-btn ml-2 mb-2"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width={18} height={18} rx={2} fill="#F83737" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="compaign-row align-items-center p-sm-4 p-3 row sp16 mx-0 mb-2">
            <div className="my-2 col-xl-4 col-xxl-6 col-lg-6 col-md-8 col-sm-12">
              <div className="media align-items-center">
                <div className="d-inline-block position-relative donut-chart-sale mr-4">
                  <ChartDoughnut2
                    backgroundColor="#36E799"
                    height="90"
                    width="90"
                    value="63"
                  />
                  <small>63%</small>
                </div>
                <div className="media-body">
                  <p className="text-primary mb-1">#ADS001245</p>
                  <h3 className="fs-20">
                    <Link className="text-black" to="/analytics">
                      50% OFF Floor Lamp Get it Now!
                    </Link>
                  </h3>
                  <svg
                    width={17}
                    height={14}
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 2L5 12.01L2 9.01"
                      stroke="#737373"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="fs-14 ml-1">Published on 5 March 2020</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-xxl-6 col-lg-6 col-md-4 col-sm-8 px-3">
              <div className="row align-items-center my-2">
                <div className="col-6">
                  <h3 className="fs-20 text-black">$63.04</h3>
                  <span className="fs-14">Today Spends</span>
                </div>
                <div className="col-6">
                  <h3 className="fs-20 text-black">$652.86</h3>
                  <span className="fs-14">Today Spends</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-xxl-4 col-lg-4 col-md-6 text-center my-2 col-sm-4">
              <Link className="btn btn-outline-dark p-3 text-ov" to="/campaign">
                <svg
                  className="mr-2 scale5"
                  width={14}
                  height={14}
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1583 3.8476H1.93099C0.971333 3.8476 0.191895 4.62703 0.191895 5.58669V20.2608C0.191895 21.2205 0.971333 21.9999 1.93099 21.9999H12.1583C13.118 21.9999 13.8974 21.2205 13.8974 20.2608V5.58669C13.8929 4.62703 13.1135 3.8476 12.1583 3.8476ZM12.6764 20.2563C12.6764 20.5447 12.4422 20.779 12.1538 20.779H1.92648C1.63814 20.779 1.40385 20.5447 1.40385 20.2563V5.58669C1.40385 5.29834 1.63814 5.06406 1.92648 5.06406H12.1538C12.4422 5.06406 12.6764 5.29834 12.6764 5.58669V20.2563Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M16.069 0H5.84163C4.88198 0 4.10254 0.779439 4.10254 1.73909C4.10254 2.077 4.37286 2.34733 4.71077 2.34733C5.04868 2.34733 5.319 2.077 5.319 1.73909C5.319 1.45075 5.55329 1.21647 5.84163 1.21647H16.069C16.3573 1.21647 16.5916 1.45075 16.5916 1.73909V16.4133C16.5916 16.7016 16.3573 16.9359 16.069 16.9359C15.731 16.9359 15.4607 17.2062 15.4607 17.5441C15.4607 17.882 15.731 18.1524 16.069 18.1524C17.0286 18.1524 17.808 17.3729 17.808 16.4133V1.73909C17.808 0.779439 17.0286 0 16.069 0Z"
                    fill="#8E8E8E"
                  />
                </svg>
                https://eclan.io/campaign0123...
              </Link>
            </div>
            <div className="col-xl-4 col-xxl-8 col-lg-8 col-md-6 text-left text-md-right my-2">
              <Link
                to="/campaign"
                className="btn bgl-danger text-danger cl-btn"
              >
                Expired
              </Link>
              <Link
                to="/campaign"
                className="border border-primary audio-btn ml-2 mb-2"
              >
                <svg
                  width={20}
                  height={18}
                  viewBox="0 0 13 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.272217 9.5L0.272153 2.10056C0.272138 0.318742 2.42643 -0.573602 3.68637 0.686334L11.5858 8.58579C12.3669 9.36684 12.3669 10.6332 11.5858 11.4142L3.68636 19.3137C2.42643 20.5736 0.272136 19.6813 0.27215 17.8994L0.272217 9.5Z"
                    fill="#36E799"
                  />
                </svg>
              </Link>
              <Link
                to="/campaign"
                className="border border-dark audio-btn ml-2 mb-2"
              >
                <svg
                  width={12}
                  height={18}
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1C8 0.447716 8.44772 0 9 0H11C11.5523 0 12 0.447715 12 1V17C12 17.5523 11.5523 18 11 18H9C8.44772 18 8 17.5523 8 17V1Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M0 1C0 0.447716 0.447715 0 1 0H3C3.55228 0 4 0.447715 4 1V17C4 17.5523 3.55228 18 3 18H1C0.447715 18 0 17.5523 0 17V1Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </Link>
              <Link
                to="/campaign"
                className="border border-danger audio-btn ml-2 mb-2"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width={18} height={18} rx={2} fill="#F83737" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="compaign-row align-items-center p-sm-4 p-3 row sp16 mx-0 mb-2">
            <div className="my-2 col-xl-4 col-xxl-6 col-lg-6 col-md-8 col-sm-12">
              <div className="media align-items-center">
                <div className="d-inline-block position-relative donut-chart-sale mr-4">
                  <ChartDoughnut2
                    backgroundColor="#36E799"
                    height="90"
                    width="90"
                    value="38"
                  />
                  <small>38%</small>
                </div>
                <div className="media-body">
                  <p className="text-primary mb-1">#ADS001245</p>
                  <h3 className="fs-20">
                    <Link className="text-black" to="/analytics">
                      15% OFF Granite Stone
                    </Link>
                  </h3>
                  <svg
                    width={17}
                    height={14}
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 2L5 12.01L2 9.01"
                      stroke="#737373"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="fs-14 ml-1">Published on 5 March 2020</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-xxl-6 col-lg-6 col-md-4 col-sm-8 px-3">
              <div className="row align-items-center my-2">
                <div className="col-6">
                  <h3 className="fs-20 text-black">$63.04</h3>
                  <span className="fs-14">Today Spends</span>
                </div>
                <div className="col-6">
                  <h3 className="fs-20 text-black">$652.86</h3>
                  <span className="fs-14">Today Spends</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-xxl-4 col-lg-4 col-md-6 text-center my-2 col-sm-4">
              <Link className="btn btn-outline-dark p-3 text-ov" to="/campaign">
                <svg
                  className="mr-2 scale5"
                  width={14}
                  height={14}
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1583 3.8476H1.93099C0.971333 3.8476 0.191895 4.62703 0.191895 5.58669V20.2608C0.191895 21.2205 0.971333 21.9999 1.93099 21.9999H12.1583C13.118 21.9999 13.8974 21.2205 13.8974 20.2608V5.58669C13.8929 4.62703 13.1135 3.8476 12.1583 3.8476ZM12.6764 20.2563C12.6764 20.5447 12.4422 20.779 12.1538 20.779H1.92648C1.63814 20.779 1.40385 20.5447 1.40385 20.2563V5.58669C1.40385 5.29834 1.63814 5.06406 1.92648 5.06406H12.1538C12.4422 5.06406 12.6764 5.29834 12.6764 5.58669V20.2563Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M16.069 0H5.84163C4.88198 0 4.10254 0.779439 4.10254 1.73909C4.10254 2.077 4.37286 2.34733 4.71077 2.34733C5.04868 2.34733 5.319 2.077 5.319 1.73909C5.319 1.45075 5.55329 1.21647 5.84163 1.21647H16.069C16.3573 1.21647 16.5916 1.45075 16.5916 1.73909V16.4133C16.5916 16.7016 16.3573 16.9359 16.069 16.9359C15.731 16.9359 15.4607 17.2062 15.4607 17.5441C15.4607 17.882 15.731 18.1524 16.069 18.1524C17.0286 18.1524 17.808 17.3729 17.808 16.4133V1.73909C17.808 0.779439 17.0286 0 16.069 0Z"
                    fill="#8E8E8E"
                  />
                </svg>
                https://eclan.io/campaign0123...
              </Link>
            </div>
            <div className="col-xl-4 col-xxl-8 col-lg-8 col-md-6 text-left text-md-right my-2">
              <Link
                to="/campaign"
                className="btn bgl-danger text-danger cl-btn"
              >
                Expired
              </Link>
              <Link
                to="/campaign"
                className="border border-primary audio-btn ml-2 mb-2"
              >
                <svg
                  width={20}
                  height={18}
                  viewBox="0 0 13 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.272217 9.5L0.272153 2.10056C0.272138 0.318742 2.42643 -0.573602 3.68637 0.686334L11.5858 8.58579C12.3669 9.36684 12.3669 10.6332 11.5858 11.4142L3.68636 19.3137C2.42643 20.5736 0.272136 19.6813 0.27215 17.8994L0.272217 9.5Z"
                    fill="#36E799"
                  />
                </svg>
              </Link>
              <Link
                to="/campaign"
                className="border border-dark audio-btn ml-2 mb-2"
              >
                <svg
                  width={12}
                  height={18}
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1C8 0.447716 8.44772 0 9 0H11C11.5523 0 12 0.447715 12 1V17C12 17.5523 11.5523 18 11 18H9C8.44772 18 8 17.5523 8 17V1Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M0 1C0 0.447716 0.447715 0 1 0H3C3.55228 0 4 0.447715 4 1V17C4 17.5523 3.55228 18 3 18H1C0.447715 18 0 17.5523 0 17V1Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </Link>
              <Link
                to="/campaign"
                className="border border-danger audio-btn ml-2 mb-2"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width={18} height={18} rx={2} fill="#F83737" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="compaign-row align-items-center p-sm-4 p-3 row sp16 mx-0 mb-2">
            <div className="my-2 col-xl-4 col-xxl-6 col-lg-6 col-md-8 col-sm-12">
              <div className="media align-items-center">
                <div className="d-inline-block position-relative donut-chart-sale mr-4">
                  <ChartDoughnut2
                    backgroundColor="#36E799"
                    height="90"
                    width="90"
                    value="50"
                  />
                  <small>50%</small>
                </div>
                <div className="media-body">
                  <p className="text-primary mb-1">#ADS001245</p>
                  <h3 className="fs-20">
                    <Link className="text-black" to="/analytics">
                      Game Online Vouchers 20% OFF
                    </Link>
                  </h3>
                  <svg
                    width={17}
                    height={14}
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 2L5 12.01L2 9.01"
                      stroke="#737373"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="fs-14 ml-1">Published on 5 March 2020</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-xxl-6 col-lg-6 col-md-4 col-sm-8 px-3">
              <div className="row align-items-center my-2">
                <div className="col-6">
                  <h3 className="fs-20 text-black">$63.04</h3>
                  <span className="fs-14">Today Spends</span>
                </div>
                <div className="col-6">
                  <h3 className="fs-20 text-black">$652.86</h3>
                  <span className="fs-14">Today Spends</span>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-xxl-4 col-lg-4 col-md-6 text-center my-2 col-sm-4">
              <Link className="btn btn-outline-dark p-3 text-ov" to="/campaign">
                <svg
                  className="mr-2 scale5"
                  width={14}
                  height={14}
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1583 3.8476H1.93099C0.971333 3.8476 0.191895 4.62703 0.191895 5.58669V20.2608C0.191895 21.2205 0.971333 21.9999 1.93099 21.9999H12.1583C13.118 21.9999 13.8974 21.2205 13.8974 20.2608V5.58669C13.8929 4.62703 13.1135 3.8476 12.1583 3.8476ZM12.6764 20.2563C12.6764 20.5447 12.4422 20.779 12.1538 20.779H1.92648C1.63814 20.779 1.40385 20.5447 1.40385 20.2563V5.58669C1.40385 5.29834 1.63814 5.06406 1.92648 5.06406H12.1538C12.4422 5.06406 12.6764 5.29834 12.6764 5.58669V20.2563Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M16.069 0H5.84163C4.88198 0 4.10254 0.779439 4.10254 1.73909C4.10254 2.077 4.37286 2.34733 4.71077 2.34733C5.04868 2.34733 5.319 2.077 5.319 1.73909C5.319 1.45075 5.55329 1.21647 5.84163 1.21647H16.069C16.3573 1.21647 16.5916 1.45075 16.5916 1.73909V16.4133C16.5916 16.7016 16.3573 16.9359 16.069 16.9359C15.731 16.9359 15.4607 17.2062 15.4607 17.5441C15.4607 17.882 15.731 18.1524 16.069 18.1524C17.0286 18.1524 17.808 17.3729 17.808 16.4133V1.73909C17.808 0.779439 17.0286 0 16.069 0Z"
                    fill="#8E8E8E"
                  />
                </svg>
                https://eclan.io/campaign0123...
              </Link>
            </div>
            <div className="col-xl-4 col-xxl-8 col-lg-8 col-md-6 text-left text-md-right my-2">
              <Link
                to="/campaign"
                className="btn bgl-primary text-primary cl-btn mb-2"
              >
                On Going
              </Link>
              <Link
                to="/campaign"
                className="border border-primary audio-btn ml-2 mb-2"
              >
                <svg
                  width={20}
                  height={18}
                  viewBox="0 0 13 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.272217 9.5L0.272153 2.10056C0.272138 0.318742 2.42643 -0.573602 3.68637 0.686334L11.5858 8.58579C12.3669 9.36684 12.3669 10.6332 11.5858 11.4142L3.68636 19.3137C2.42643 20.5736 0.272136 19.6813 0.27215 17.8994L0.272217 9.5Z"
                    fill="#36E799"
                  />
                </svg>
              </Link>
              <Link
                to="/campaign"
                className="border border-dark audio-btn ml-2 mb-2"
              >
                <svg
                  width={12}
                  height={18}
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1C8 0.447716 8.44772 0 9 0H11C11.5523 0 12 0.447715 12 1V17C12 17.5523 11.5523 18 11 18H9C8.44772 18 8 17.5523 8 17V1Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M0 1C0 0.447716 0.447715 0 1 0H3C3.55228 0 4 0.447715 4 1V17C4 17.5523 3.55228 18 3 18H1C0.447715 18 0 17.5523 0 17V1Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </Link>
              <Link
                to="/campaign"
                className="border border-danger audio-btn ml-2 mb-2"
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width={18} height={18} rx={2} fill="#F83737" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Campaign;
