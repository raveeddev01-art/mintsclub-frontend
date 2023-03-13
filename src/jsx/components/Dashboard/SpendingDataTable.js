import React, { useState, useRef, useEffect } from "react";
import { Table, Pagination, Badge, Dropdown } from "react-bootstrap";

import { Link } from "react-router-dom";


const headers = ['Ads ID' , 'Date Published' , 'Yesterday Spending' , 'Today Spending'];
const rowData = [['#ADS01231' , '26 March 2020, 12:42 AM' , '$4,521.21' , '$5,415.51'] , ['#ADS01231' , '26 March 2020, 12:42 AM' , '$4,521.21' , '$5,415.51']]

const SpendingDataTable = () => {
   const [data, setData] = useState(
      document.querySelectorAll("#spendingTable tbody tr")
   );
   const sort = 5;
   const activePag = useRef(0);
   const [test, settest] = useState(0);

   // Active data
   const chageData = (frist, sec) => {
      for (var i = 0; i < data.length; ++i) {
         if (i >= frist && i < sec) {
            data[i].classList.remove("d-none");
         } else {
            data[i].classList.add("d-none");
         }
      }
   };
   // use effect
   useEffect(() => {
      setData(document.querySelectorAll("#spendingTable tbody tr"));
      chackboxFun();
   }, [test]);

   // Active pagginarion
   activePag.current === 0 && chageData(0, sort);
   // paggination
   let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);

   // Active paggination & chage data
   const onClick = (i) => {
      activePag.current = i;
      chageData(activePag.current * sort, (activePag.current + 1) * sort);
      settest(i);
   };
   const chackbox = document.querySelectorAll(".all_spending_checkbox input");
   const motherChackBox = document.querySelector(".all_spending_strg input");
   // console.log(document.querySelectorAll(".all_spending_strg input")[0].checked);
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
      <>
         <div className="table-responsive">
            <div className="dataTables_wrapper no-footer">
               <table
                  id="spendingTable"
                  className="display mb-4 dataTablesCard card-table dataTable no-footer"
                  style={{ width: "100%" }}
               >
                  <thead>
                     <tr role="row">
                        <th
                           className="pr-0 no-data-img all_spending_strg"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-sort="ascending"
                           style={{ width: 32 }}
                        >
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun("all")}
                                 className="custom-control-input"
                                 id="checkAll"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="checkAll"
                              />
                           </div>
                        </th>
                        {headers.map((item) => {
return (
   <th
   className="sorting"
   tabIndex={0}
   aria-controls="example5"
   rowSpan={1}
   colSpan={1}
   aria-label="Date Published: activate to sort column ascending"
   style={{ width: 124 }}
>
  {item}
</th>
)
                        })}
                        </tr>
                  </thead>
                  <tbody>

                  {rowData && rowData.map((row , index ) => {
                           return(
                              <tr role="row" className="odd">
                        <td className="pr-0 all_spending_checkbox">
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun()}
                                 className="custom-control-input"
                                 id="customCheckBox6"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="customCheckBox6"
                              />
                           </div>
                        </td>
                        {row && row.map((item) => {
                           return(
                              <td>
                                 {item}
                              </td>
                           )
                        })}
                        <td>
                           <Dropdown className="dropdown ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false p-0 btn-link"
                                 data-toggle="dropdown"
                              >
                                 <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 16V12"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 8H12.01"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    View Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </td>
                     </tr>
                           )
                        })}
                  </tbody>
               </table>
               <div className="d-sm-flex text-center justify-content-between align-items-center">
                  <div className="dataTables_info" id="example5_info">
                     Showing {activePag.current * sort + 1} to{" "}
                     {data.length > (activePag.current + 1) * sort
                        ? (activePag.current + 1) * sort
                        : data.length}{" "}
                     of {data.length} entries
                  </div>
                  <div className="dataTables_paginate paging_simple_numbers">
                     <Link
                        to="/spendings"
                        className="paginate_button previous disabled"
                        aria-controls="example5"
                        onClick={() =>
                           activePag.current > 0 &&
                           onClick(activePag.current - 1)
                        }
                     >
                        Previous
                     </Link>
                     <span>
                        {paggination.map((number, i) => (
                           <Link
                              key={i}
                              to="/spendings"
                              className={`paginate_button  ${
                                 activePag.current === i ? "current" : ""
                              }`}
                              onClick={() => onClick(i)}
                           >
                              {number}
                           </Link>
                        ))}
                     </span>
                     <Link
                        to="/spendings"
                        className="paginate_button next"
                        onClick={() =>
                           activePag.current + 1 < paggination.length &&
                           onClick(activePag.current + 1)
                        }
                     >
                        Next
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default SpendingDataTable;
