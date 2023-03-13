import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import SpendingDataTable from "./SpendingDataTable";

function Spendings() {
  return (
    <>
      <div className="form-head d-flex mb-0 mb-lg-4 align-items-start">
        <div className="mr-auto d-none d-lg-block">
          <h2 className="text-black font-w600">Spendings</h2>
          <p className="mb-0">Current campaign list</p>
        </div>
        <div className="d-none d-lg-flex align-items-center">
          <div className="text-right">
            <h3 className="fs-20 text-black mb-0">09:62 AM</h3>
            <span className="fs-14">Monday, 3 Augusut 2020</span>
          </div>
          <Link
            className="ml-4 text-black p-3 rounded border text-center width60"
            to="/spendings"
          >
            <i className="las la-cog scale5" />
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="d-flex justify-content-between mb-1 flex-wrap">
            <div>
              <Link to="/spendings" className="btn bg-white mr-2 mb-2">
                <svg
                  className="mr-2 scale5"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.75 13.5H2.25C1.83579 13.5 1.5 13.8358 1.5 14.25V21.75C1.5 22.1642 1.83579 22.5 2.25 22.5H6.75C7.16421 22.5 7.5 22.1642 7.5 21.75V14.25C7.5 13.8358 7.16421 13.5 6.75 13.5Z"
                    fill="#36E799"
                  />
                  <path
                    d="M21.75 7.5H17.25C16.8358 7.5 16.5 7.83579 16.5 8.25V21.75C16.5 22.1642 16.8358 22.5 17.25 22.5H21.75C22.1642 22.5 22.5 22.1642 22.5 21.75V8.25C22.5 7.83579 22.1642 7.5 21.75 7.5Z"
                    fill="#36E799"
                  />
                  <path
                    d="M14.25 1.5H9.75C9.33579 1.5 9 1.83579 9 2.25V21.75C9 22.1642 9.33579 22.5 9.75 22.5H14.25C14.6642 22.5 15 22.1642 15 21.75V2.25C15 1.83579 14.6642 1.5 14.25 1.5Z"
                    fill="#36E799"
                  />
                </svg>
                <span className="text-black">View Analytics</span>
              </Link>
              <Link to="/spendings" className="btn bg-white mr-2 mb-2">
                <svg
                  className="mr-2 scale5"
                  width={14}
                  height={14}
                  viewBox="0 0 20 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0625 6.60156C13.6418 6.60156 13.3008 6.26052 13.3008 5.83984V0H2.38281C1.12278 0 0.0976562 1.02512 0.0976562 2.28516V23.7148C0.0976562 24.9749 1.12278 26 2.38281 26H17.6172C18.8772 26 19.9023 24.9749 19.9023 23.7148V6.60156H14.0625ZM16.527 19.3531C16.1524 20.0021 15.4812 20.3896 14.7318 20.3896C13.9823 20.3896 13.3112 20.0022 12.9365 19.3531L12.0207 17.767H7.97926L7.06352 19.3531C6.68881 20.0021 6.01763 20.3896 5.2682 20.3896C5.26815 20.3896 5.2682 20.3896 5.26815 20.3896C4.51872 20.3896 3.8476 20.0021 3.47293 19.3531C3.09822 18.7041 3.09817 17.9291 3.47293 17.2801C3.84765 16.6311 4.51877 16.2436 5.2682 16.2436H7.09968L9.12042 12.7436L8.20468 11.1575C7.82996 10.5084 7.82991 9.73345 8.20468 9.08441C8.57939 8.43538 9.25052 8.04786 10 8.04786C10.7495 8.04786 11.4206 8.43532 11.7953 9.08441C12.1701 9.73345 12.17 10.5084 11.7953 11.1575L10.8795 12.7436L12.9003 16.2436H14.7317C15.4812 16.2436 16.1523 16.6311 16.527 17.2801C16.9018 17.9291 16.9017 18.7041 16.527 19.3531Z"
                    fill="#FF5F5F"
                  />
                </svg>
                <span className="text-black">Download PDF</span>
              </Link>
            </div>
            <div>
              <Link to="/spendings" className="btn bg-white mr-2">
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
              <Dropdown className="custom-dropdown">
                <Dropdown.Toggle
                  as="a"
                  variant=""
                  className="arrow-false btn bg-white d-flex align-items-center"
                >
                  <div className="text-left mr-3">
                    <span className="text-black">Newest</span>
                  </div>
                  <i className="fa fa-caret-down" aria-hidden="true" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right">
                  <Dropdown.Item className="" to="/spendings">
                    4 June 2020 - 4 July 2020
                  </Dropdown.Item>
                  <Dropdown.Item className="" to="/spendings">
                    5 july 2020 - 4 Aug 2020
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <SpendingDataTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default Spendings;
