import React, { Fragment } from "react";

import PageTitle from "../../../layouts/PageTitle";

import { Badge, Dropdown, Table } from "react-bootstrap";

const ProductOrder = () => {
   const chackbox = document.querySelectorAll(".product_order_single");
   const motherChackBox = document.querySelector(".product_order");
   // console.log(document.querySelectorAll(".publish_review input")[0].checked);
   const chackboxFun = (type) => {
      for (let i = 0; i < chackbox.length; i++) {
         const element = chackbox[i];
         if (type === "all") {
            if (motherChackBox.checked) {
               element.checked = true;
            } else {
               element.checked = false;
            }
         } else {
            if (!element.checked) {
               motherChackBox.checked = false;
               break;
            } else {
               motherChackBox.checked = true;
            }
         }
      }
   };

   return (
      <div className="h-80">
         <PageTitle activeMenu="Product Order" motherMenu="Shop" />
         <div className="row">
            <div className="col-lg-12">
               <div className="card">
                  <div className="card-body">
                     <div className="table-responsive">
                        <table className="table table-sm mb-0 table-responsive-lg text-black">
                           <thead>
                              <tr>
                                 <th className="align-middle">
                                    <div className="custom-control custom-checkbox">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun("all")}
                                          className="custom-control-input product_order"
                                          id="checkAll"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkAll"
                                       />
                                    </div>
                                 </th>
                                 <th className="align-middle">Order</th>
                                 <th className="align-middle pr-7">Date</th>
                                 <th className="align-middle minw200">
                                    Ship To
                                 </th>
                                 <th className="align-middle text-right">
                                    Status
                                 </th>
                                 <th className="align-middle text-right">
                                    Amount
                                 </th>
                                 <th className="no-sort" />
                              </tr>
                           </thead>
                           <tbody id="orders">
                              <tr className="btn-reveal-trigger">
                                 <td className="py-2">
                                    <div className="custom-control custom-checkbox checkbox-success">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun()}
                                          className="custom-control-input product_order_single"
                                          id="checkbox"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkbox"
                                       />
                                    </div>
                                 </td>
                                 <td className="py-2">
                                    <a href="#">
                                       <strong>#181</strong>
                                    </a>{" "}
                                    by <strong>Ricky Antony</strong>
                                    <br />
                                    <a href="mailto:ricky@example.com">
                                       ricky@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">20/04/2020</td>
                                 <td className="py-2">
                                    Ricky Antony, 2392 Main Avenue, Penasauka,
                                    New Jersey 02149
                                    <p className="mb-0 text-500">
                                       Via Flat Rate
                                    </p>
                                 </td>
                                 <td className="py-2 text-right">
                                    <span className="badge badge-success">
                                       Completed
                                       <span className="ml-1 fa fa-check" />
                                    </span>
                                 </td>
                                 <td className="py-2 text-right">$99</td>
                                 <td className="py-2 text-right">
                                    <Dropdown className="dropdown text-sans-serif">
                                       <Dropdown.Toggle
                                          variant=""
                                          className="btn btn-primary tp-btn-light sharp icon-false"
                                          type="button"
                                          id="order-dropdown-0"
                                          data-toggle="dropdown"
                                          data-boundary="viewport"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                       >
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                             >
                                                <g
                                                   stroke="none"
                                                   strokeWidth={1}
                                                   fill="none"
                                                   fillRule="evenodd"
                                                >
                                                   <rect
                                                      x={0}
                                                      y={0}
                                                      width={24}
                                                      height={24}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={5}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={12}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={19}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                </g>
                                             </svg>
                                          </span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu
                                          className="dropdown-menu dropdown-menu-right border py-0"
                                          aria-labelledby="order-dropdown-0"
                                       >
                                          <div className="py-2">
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Completed
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Processing
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                On Hold
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Pending
                                             </a>
                                             <div className="dropdown-divider" />
                                             <a
                                                className="dropdown-item text-danger"
                                                href="#!"
                                             >
                                                Delete
                                             </a>
                                          </div>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                              <tr className="btn-reveal-trigger">
                                 <td className="py-2">
                                    <div className="custom-control custom-checkbox ">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun()}
                                          className="custom-control-input product_order_single"
                                          id="checkbox1"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkbox1"
                                       />
                                    </div>
                                 </td>
                                 <td className="py-2">
                                    <a href="#">
                                       <strong>#182</strong>
                                    </a>{" "}
                                    by <strong>Kin Rossow</strong>
                                    <br />
                                    <a href="mailto:kin@example.com">
                                       kin@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">20/04/2020</td>
                                 <td className="py-2">
                                    Kin Rossow, 1 Hollywood Blvd,Beverly Hills,
                                    California 90210
                                    <p className="mb-0 text-500">
                                       Via Free Shipping
                                    </p>
                                 </td>
                                 <td className="py-2 text-right">
                                    <span className="badge badge-primary">
                                       Processing
                                       <span className="ml-1 fa fa-redo" />
                                    </span>
                                 </td>
                                 <td className="py-2 text-right">$120</td>
                                 <td className="py-2 text-right">
                                    <Dropdown className="dropdown text-sans-serif">
                                       <Dropdown.Toggle
                                          variant=""
                                          className="btn btn-primary tp-btn-light sharp icon-false"
                                          type="button"
                                          id="order-dropdown-0"
                                          data-toggle="dropdown"
                                          data-boundary="viewport"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                       >
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                             >
                                                <g
                                                   stroke="none"
                                                   strokeWidth={1}
                                                   fill="none"
                                                   fillRule="evenodd"
                                                >
                                                   <rect
                                                      x={0}
                                                      y={0}
                                                      width={24}
                                                      height={24}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={5}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={12}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={19}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                </g>
                                             </svg>
                                          </span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu
                                          className="dropdown-menu dropdown-menu-right border py-0"
                                          aria-labelledby="order-dropdown-0"
                                       >
                                          <div className="py-2">
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Completed
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Processing
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                On Hold
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Pending
                                             </a>
                                             <div className="dropdown-divider" />
                                             <a
                                                className="dropdown-item text-danger"
                                                href="#!"
                                             >
                                                Delete
                                             </a>
                                          </div>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                              <tr className="btn-reveal-trigger">
                                 <td className="py-2">
                                    <div className="custom-control custom-checkbox checkbox-secondary">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun()}
                                          className="custom-control-input product_order_single"
                                          id="checkbox2"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkbox2"
                                       />
                                    </div>
                                 </td>
                                 <td className="py-2">
                                    <a href="#">
                                       <strong>#183</strong>
                                    </a>{" "}
                                    by <strong>Merry Diana</strong>
                                    <br />
                                    <a href="mailto:merry@example.com">
                                       merry@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">30/04/2020</td>
                                 <td className="py-2">
                                    Merry Diana, 1 Infinite Loop, Cupertino,
                                    California 90210
                                    <p className="mb-0 text-500">
                                       Via Link Road
                                    </p>
                                 </td>
                                 <td className="py-2 text-right">
                                    <span className="badge badge-secondary">
                                       On Hold
                                       <span className="ml-1 fa fa-ban" />
                                    </span>
                                 </td>
                                 <td className="py-2 text-right">$70</td>
                                 <td className="py-2 text-right">
                                    <Dropdown className="dropdown text-sans-serif">
                                       <Dropdown.Toggle
                                          variant=""
                                          className="btn btn-primary tp-btn-light sharp icon-false"
                                          type="button"
                                          id="order-dropdown-0"
                                          data-toggle="dropdown"
                                          data-boundary="viewport"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                       >
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                             >
                                                <g
                                                   stroke="none"
                                                   strokeWidth={1}
                                                   fill="none"
                                                   fillRule="evenodd"
                                                >
                                                   <rect
                                                      x={0}
                                                      y={0}
                                                      width={24}
                                                      height={24}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={5}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={12}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={19}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                </g>
                                             </svg>
                                          </span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu
                                          className="dropdown-menu dropdown-menu-right border py-0"
                                          aria-labelledby="order-dropdown-0"
                                       >
                                          <div className="py-2">
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Completed
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Processing
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                On Hold
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Pending
                                             </a>
                                             <div className="dropdown-divider" />
                                             <a
                                                className="dropdown-item text-danger"
                                                href="#!"
                                             >
                                                Delete
                                             </a>
                                          </div>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                              <tr className="btn-reveal-trigger">
                                 <td className="py-2">
                                    <div className="custom-control custom-checkbox  checkbox-warning">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun()}
                                          className="custom-control-input product_order_single"
                                          id="checkbox3"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkbox3"
                                       />
                                    </div>
                                 </td>
                                 <td className="py-2">
                                    <a href="#">
                                       <strong>#184</strong>
                                    </a>{" "}
                                    by <strong>Bucky Robert</strong>
                                    <br />
                                    <a href="mailto:bucky@example.com">
                                       bucky@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">30/04/2020</td>
                                 <td className="py-2">
                                    Bucky Robert, 1 Infinite Loop, Cupertino,
                                    California 90210
                                    <p className="mb-0 text-500">
                                       Via Free Shipping
                                    </p>
                                 </td>
                                 <td className="py-2 text-right">
                                    <span className="badge badge-warning">
                                       Pending
                                       <span className="ml-1 fas fa-stream" />
                                    </span>
                                 </td>
                                 <td className="py-2 text-right">$92</td>
                                 <td className="py-2 text-right">
                                    <Dropdown className="dropdown text-sans-serif">
                                       <Dropdown.Toggle
                                          variant=""
                                          className="btn btn-primary tp-btn-light sharp icon-false"
                                          type="button"
                                          id="order-dropdown-0"
                                          data-toggle="dropdown"
                                          data-boundary="viewport"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                       >
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                             >
                                                <g
                                                   stroke="none"
                                                   strokeWidth={1}
                                                   fill="none"
                                                   fillRule="evenodd"
                                                >
                                                   <rect
                                                      x={0}
                                                      y={0}
                                                      width={24}
                                                      height={24}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={5}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={12}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={19}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                </g>
                                             </svg>
                                          </span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu
                                          className="dropdown-menu dropdown-menu-right border py-0"
                                          aria-labelledby="order-dropdown-0"
                                       >
                                          <div className="py-2">
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Completed
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Processing
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                On Hold
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Pending
                                             </a>
                                             <div className="dropdown-divider" />
                                             <a
                                                className="dropdown-item text-danger"
                                                href="#!"
                                             >
                                                Delete
                                             </a>
                                          </div>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                              <tr className="btn-reveal-trigger">
                                 <td className="py-2">
                                    <div className="custom-control custom-checkbox checkbox-secondary">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun()}
                                          className="custom-control-input product_order_single"
                                          id="checkbox4"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkbox4"
                                       />
                                    </div>
                                 </td>
                                 <td className="py-2">
                                    <a href="#">
                                       <strong>#185</strong>
                                    </a>{" "}
                                    by <strong>Rocky Zampa</strong>
                                    <br />
                                    <a href="mailto:rocky@example.com">
                                       rocky@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">30/04/2020</td>
                                 <td className="py-2">
                                    Rocky Zampa, 1 Infinite Loop, Cupertino,
                                    California 90210
                                    <p className="mb-0 text-500">
                                       Via Free Road
                                    </p>
                                 </td>
                                 <td className="py-2 text-right">
                                    <span className="badge badge-secondary">
                                       On Hold
                                       <span className="ml-1 fa fa-ban" />
                                    </span>
                                 </td>
                                 <td className="py-2 text-right">$120</td>
                                 <td className="py-2 text-right">
                                    <Dropdown className="dropdown text-sans-serif">
                                       <Dropdown.Toggle
                                          variant=""
                                          className="btn btn-primary tp-btn-light sharp icon-false"
                                          type="button"
                                          id="order-dropdown-0"
                                          data-toggle="dropdown"
                                          data-boundary="viewport"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                       >
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                             >
                                                <g
                                                   stroke="none"
                                                   strokeWidth={1}
                                                   fill="none"
                                                   fillRule="evenodd"
                                                >
                                                   <rect
                                                      x={0}
                                                      y={0}
                                                      width={24}
                                                      height={24}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={5}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={12}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={19}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                </g>
                                             </svg>
                                          </span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu
                                          className="dropdown-menu dropdown-menu-right border py-0"
                                          aria-labelledby="order-dropdown-0"
                                       >
                                          <div className="py-2">
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Completed
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Processing
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                On Hold
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Pending
                                             </a>
                                             <div className="dropdown-divider" />
                                             <a
                                                className="dropdown-item text-danger"
                                                href="#!"
                                             >
                                                Delete
                                             </a>
                                          </div>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                              <tr className="btn-reveal-trigger">
                                 <td className="py-2">
                                    <div className="custom-control custom-checkbox ">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun()}
                                          className="custom-control-input product_order_single"
                                          id="checkbox5"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkbox5"
                                       />
                                    </div>
                                 </td>
                                 <td className="py-2">
                                    <a href="#">
                                       <strong>#186</strong>
                                    </a>{" "}
                                    by <strong>Ricky John</strong>
                                    <br />
                                    <a href="mailto:ricky@example.com">
                                       ricky@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">30/04/2020</td>
                                 <td className="py-2">
                                    Ricky John, 1 Infinite Loop, Cupertino,
                                    California 90210
                                    <p className="mb-0 text-500">
                                       Via Free Shipping
                                    </p>
                                 </td>
                                 <td className="py-2 text-right">
                                    <span className="badge badge-primary">
                                       Processing
                                       <span className="ml-1 fa fa-redo" />
                                    </span>
                                 </td>
                                 <td className="py-2 text-right">$145</td>
                                 <td className="py-2 text-right">
                                    <Dropdown className="dropdown text-sans-serif">
                                       <Dropdown.Toggle
                                          variant=""
                                          className="btn btn-primary tp-btn-light sharp icon-false"
                                          type="button"
                                          id="order-dropdown-0"
                                          data-toggle="dropdown"
                                          data-boundary="viewport"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                       >
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                             >
                                                <g
                                                   stroke="none"
                                                   strokeWidth={1}
                                                   fill="none"
                                                   fillRule="evenodd"
                                                >
                                                   <rect
                                                      x={0}
                                                      y={0}
                                                      width={24}
                                                      height={24}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={5}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={12}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={19}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                </g>
                                             </svg>
                                          </span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu
                                          className="dropdown-menu dropdown-menu-right border py-0"
                                          aria-labelledby="order-dropdown-0"
                                       >
                                          <div className="py-2">
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Completed
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Processing
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                On Hold
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Pending
                                             </a>
                                             <div className="dropdown-divider" />
                                             <a
                                                className="dropdown-item text-danger"
                                                href="#!"
                                             >
                                                Delete
                                             </a>
                                          </div>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                              <tr className="btn-reveal-trigger">
                                 <td className="py-2">
                                    <div className="custom-control custom-checkbox checkbox-success">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun()}
                                          className="custom-control-input product_order_single"
                                          id="checkbox6"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkbox6"
                                       />
                                    </div>
                                 </td>
                                 <td className="py-2">
                                    <a href="#">
                                       <strong>#187</strong>
                                    </a>{" "}
                                    by <strong>Cristofer Henric</strong>
                                    <br />
                                    <a href="mailto:cristofer@example.com">
                                       cristofer@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">30/04/2020</td>
                                 <td className="py-2">
                                    Cristofer Henric, 1 Infinite Loop,
                                    Cupertino, California 90210
                                    <p className="mb-0 text-500">
                                       Via Flat Rate
                                    </p>
                                 </td>
                                 <td className="py-2 text-right">
                                    <span className="badge badge-success">
                                       Completed
                                       <span className="ml-1 fa fa-check" />
                                    </span>
                                 </td>
                                 <td className="py-2 text-right">$55</td>
                                 <td className="py-2 text-right">
                                    <Dropdown className="dropdown text-sans-serif">
                                       <Dropdown.Toggle
                                          variant=""
                                          className="btn btn-primary tp-btn-light sharp icon-false"
                                          type="button"
                                          id="order-dropdown-0"
                                          data-toggle="dropdown"
                                          data-boundary="viewport"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                       >
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                             >
                                                <g
                                                   stroke="none"
                                                   strokeWidth={1}
                                                   fill="none"
                                                   fillRule="evenodd"
                                                >
                                                   <rect
                                                      x={0}
                                                      y={0}
                                                      width={24}
                                                      height={24}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={5}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={12}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={19}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                </g>
                                             </svg>
                                          </span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu
                                          className="dropdown-menu dropdown-menu-right border py-0"
                                          aria-labelledby="order-dropdown-0"
                                       >
                                          <div className="py-2">
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Completed
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Processing
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                On Hold
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Pending
                                             </a>
                                             <div className="dropdown-divider" />
                                             <a
                                                className="dropdown-item text-danger"
                                                href="#!"
                                             >
                                                Delete
                                             </a>
                                          </div>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                              <tr className="btn-reveal-trigger">
                                 <td className="py-2">
                                    <div className="custom-control custom-checkbox checkbox-secondary">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun()}
                                          className="custom-control-input product_order_single"
                                          id="checkbox7"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkbox7"
                                       />
                                    </div>
                                 </td>
                                 <td className="py-2">
                                    <a href="#">
                                       <strong>#188</strong>
                                    </a>{" "}
                                    by <strong>Brate Lee</strong>
                                    <br />
                                    <a href="mailto:lee@example.com">
                                       lee@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">29/04/2020</td>
                                 <td className="py-2">
                                    Brate Lee, 1 Infinite Loop, Cupertino,
                                    California 90210
                                    <p className="mb-0 text-500">
                                       Via Link Road
                                    </p>
                                 </td>
                                 <td className="py-2 text-right">
                                    <span className="badge badge-secondary">
                                       On Hold
                                       <span className="ml-1 fa fa-ban" />
                                    </span>
                                 </td>
                                 <td className="py-2 text-right">$90</td>
                                 <td className="py-2 text-right">
                                    <Dropdown className="dropdown text-sans-serif">
                                       <Dropdown.Toggle
                                          variant=""
                                          className="btn btn-primary tp-btn-light sharp icon-false"
                                          type="button"
                                          id="order-dropdown-0"
                                          data-toggle="dropdown"
                                          data-boundary="viewport"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                       >
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                             >
                                                <g
                                                   stroke="none"
                                                   strokeWidth={1}
                                                   fill="none"
                                                   fillRule="evenodd"
                                                >
                                                   <rect
                                                      x={0}
                                                      y={0}
                                                      width={24}
                                                      height={24}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={5}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={12}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={19}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                </g>
                                             </svg>
                                          </span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu
                                          className="dropdown-menu dropdown-menu-right border py-0"
                                          aria-labelledby="order-dropdown-0"
                                       >
                                          <div className="py-2">
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Completed
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Processing
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                On Hold
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Pending
                                             </a>
                                             <div className="dropdown-divider" />
                                             <a
                                                className="dropdown-item text-danger"
                                                href="#!"
                                             >
                                                Delete
                                             </a>
                                          </div>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                              <tr className="btn-reveal-trigger">
                                 <td className="py-2">
                                    <div className="custom-control custom-checkbox ">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun()}
                                          className="custom-control-input product_order_single"
                                          id="checkbox8"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkbox8"
                                       />
                                    </div>
                                 </td>
                                 <td className="py-2">
                                    <a href="#">
                                       <strong>#189</strong>
                                    </a>{" "}
                                    by <strong>Thomas Stephenson</strong>
                                    <br />
                                    <a href="mailto:Stephenson@example.com">
                                       Stephenson@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">29/04/2020</td>
                                 <td className="py-2">
                                    Thomas Stephenson, 116 Ballifeary Road,
                                    Bamff
                                    <p className="mb-0 text-500">
                                       Via Flat Rate
                                    </p>
                                 </td>
                                 <td className="py-2 text-right">
                                    <span className="badge badge-primary">
                                       Processing
                                       <span className="ml-1 fa fa-redo" />
                                    </span>
                                 </td>
                                 <td className="py-2 text-right">$52</td>
                                 <td className="py-2 text-right">
                                    <Dropdown className="dropdown text-sans-serif">
                                       <Dropdown.Toggle
                                          variant=""
                                          className="btn btn-primary tp-btn-light sharp icon-false"
                                          type="button"
                                          id="order-dropdown-0"
                                          data-toggle="dropdown"
                                          data-boundary="viewport"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                       >
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                             >
                                                <g
                                                   stroke="none"
                                                   strokeWidth={1}
                                                   fill="none"
                                                   fillRule="evenodd"
                                                >
                                                   <rect
                                                      x={0}
                                                      y={0}
                                                      width={24}
                                                      height={24}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={5}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={12}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={19}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                </g>
                                             </svg>
                                          </span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu
                                          className="dropdown-menu dropdown-menu-right border py-0"
                                          aria-labelledby="order-dropdown-0"
                                       >
                                          <div className="py-2">
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Completed
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Processing
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                On Hold
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Pending
                                             </a>
                                             <div className="dropdown-divider" />
                                             <a
                                                className="dropdown-item text-danger"
                                                href="#!"
                                             >
                                                Delete
                                             </a>
                                          </div>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                              <tr className="btn-reveal-trigger">
                                 <td className="py-2">
                                    <div className="custom-control custom-checkbox checkbox-success">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun()}
                                          className="custom-control-input product_order_single"
                                          id="checkbox9"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkbox9"
                                       />
                                    </div>
                                 </td>
                                 <td className="py-2">
                                    <a href="#">
                                       <strong>#190</strong>
                                    </a>{" "}
                                    by <strong>Evie Singh</strong>
                                    <br />
                                    <a href="mailto:eviewsing@example.com">
                                       eviewsing@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">29/04/2020</td>
                                 <td className="py-2">
                                    Evie Singh, 54 Castledore Road, Tunstead
                                    <p className="mb-0 text-500">
                                       Via Flat Rate
                                    </p>
                                 </td>
                                 <td className="py-2 text-right">
                                    <span className="badge badge-success">
                                       Completed
                                       <span className="ml-1 fa fa-check" />
                                    </span>
                                 </td>
                                 <td className="py-2 text-right">$90</td>
                                 <td className="py-2 text-right">
                                    <Dropdown className="dropdown text-sans-serif">
                                       <Dropdown.Toggle
                                          variant=""
                                          className="btn btn-primary tp-btn-light sharp icon-false"
                                          type="button"
                                          id="order-dropdown-0"
                                          data-toggle="dropdown"
                                          data-boundary="viewport"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                       >
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                             >
                                                <g
                                                   stroke="none"
                                                   strokeWidth={1}
                                                   fill="none"
                                                   fillRule="evenodd"
                                                >
                                                   <rect
                                                      x={0}
                                                      y={0}
                                                      width={24}
                                                      height={24}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={5}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={12}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={19}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                </g>
                                             </svg>
                                          </span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu
                                          className="dropdown-menu dropdown-menu-right border py-0"
                                          aria-labelledby="order-dropdown-0"
                                       >
                                          <div className="py-2">
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Completed
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Processing
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                On Hold
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Pending
                                             </a>
                                             <div className="dropdown-divider" />
                                             <a
                                                className="dropdown-item text-danger"
                                                href="#!"
                                             >
                                                Delete
                                             </a>
                                          </div>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                              <tr className="btn-reveal-trigger">
                                 <td className="py-2">
                                    <div className="custom-control custom-checkbox checkbox-success">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun()}
                                          className="custom-control-input product_order_single"
                                          id="checkbox10"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkbox10"
                                       />
                                    </div>
                                 </td>
                                 <td className="py-2">
                                    <a href="#">
                                       <strong>#191</strong>
                                    </a>{" "}
                                    by <strong>David Peters</strong>
                                    <br />
                                    <a href="mailto:peter@example.com">
                                       peter@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">29/04/2020</td>
                                 <td className="py-2">
                                    David Peters, Rhyd Y Groes, Rhosgoch, LL66
                                    0AT
                                    <p className="mb-0 text-500">
                                       Via Link Road
                                    </p>
                                 </td>
                                 <td className="py-2 text-right">
                                    <span className="badge badge-success">
                                       Completed
                                       <span className="ml-1 fa fa-check" />
                                    </span>
                                 </td>
                                 <td className="py-2 text-right">$69</td>
                                 <td className="py-2 text-right">
                                    <Dropdown className="dropdown text-sans-serif">
                                       <Dropdown.Toggle
                                          variant=""
                                          className="btn btn-primary tp-btn-light sharp icon-false"
                                          type="button"
                                          id="order-dropdown-0"
                                          data-toggle="dropdown"
                                          data-boundary="viewport"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                       >
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                             >
                                                <g
                                                   stroke="none"
                                                   strokeWidth={1}
                                                   fill="none"
                                                   fillRule="evenodd"
                                                >
                                                   <rect
                                                      x={0}
                                                      y={0}
                                                      width={24}
                                                      height={24}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={5}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={12}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={19}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                </g>
                                             </svg>
                                          </span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu
                                          className="dropdown-menu dropdown-menu-right border py-0"
                                          aria-labelledby="order-dropdown-0"
                                       >
                                          <div className="py-2">
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Completed
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Processing
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                On Hold
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Pending
                                             </a>
                                             <div className="dropdown-divider" />
                                             <a
                                                className="dropdown-item text-danger"
                                                href="#!"
                                             >
                                                Delete
                                             </a>
                                          </div>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                              <tr className="btn-reveal-trigger">
                                 <td className="py-2">
                                    <div className="custom-control custom-checkbox ">
                                       <input
                                          type="checkbox"
                                          onClick={() => chackboxFun()}
                                          className="custom-control-input product_order_single"
                                          id="checkbox11"
                                       />
                                       <label
                                          className="custom-control-label"
                                          htmlFor="checkbox11"
                                       />
                                    </div>
                                 </td>
                                 <td className="py-2">
                                    <a href="#">
                                       <strong>#192</strong>
                                    </a>{" "}
                                    by <strong>Jennifer Johnson</strong>
                                    <br />
                                    <a href="mailto:jennifer@example.com">
                                       jennifer@example.com
                                    </a>
                                 </td>
                                 <td className="py-2">28/04/2020</td>
                                 <td className="py-2">
                                    Jennifer Johnson, Rhyd Y Groes, Rhosgoch,
                                    LL66 0AT
                                    <p className="mb-0 text-500">
                                       Via Flat Rate
                                    </p>
                                 </td>
                                 <td className="py-2 text-right">
                                    <span className="badge badge-primary">
                                       Processing
                                       <span className="ml-1 fa fa-redo" />
                                    </span>
                                 </td>
                                 <td className="py-2 text-right">$112</td>
                                 <td className="py-2 text-right">
                                    <Dropdown className="dropdown text-sans-serif">
                                       <Dropdown.Toggle
                                          variant=""
                                          className="btn btn-primary tp-btn-light sharp icon-false"
                                          type="button"
                                          id="order-dropdown-0"
                                          data-toggle="dropdown"
                                          data-boundary="viewport"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                       >
                                          <span>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                             >
                                                <g
                                                   stroke="none"
                                                   strokeWidth={1}
                                                   fill="none"
                                                   fillRule="evenodd"
                                                >
                                                   <rect
                                                      x={0}
                                                      y={0}
                                                      width={24}
                                                      height={24}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={5}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={12}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                   <circle
                                                      fill="#000000"
                                                      cx={19}
                                                      cy={12}
                                                      r={2}
                                                   />
                                                </g>
                                             </svg>
                                          </span>
                                       </Dropdown.Toggle>
                                       <Dropdown.Menu
                                          className="dropdown-menu dropdown-menu-right border py-0"
                                          aria-labelledby="order-dropdown-0"
                                       >
                                          <div className="py-2">
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Completed
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Processing
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                On Hold
                                             </a>
                                             <a
                                                className="dropdown-item"
                                                href="#!"
                                             >
                                                Pending
                                             </a>
                                             <div className="dropdown-divider" />
                                             <a
                                                className="dropdown-item text-danger"
                                                href="#!"
                                             >
                                                Delete
                                             </a>
                                          </div>
                                       </Dropdown.Menu>
                                    </Dropdown>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductOrder;
