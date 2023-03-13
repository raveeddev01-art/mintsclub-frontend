import React, { useState, useRef } from "react";
import { Table, Pagination } from "react-bootstrap";

import data from "./tableData.js";
import { Link } from "react-router-dom";

const BasicDatatable = () => {
   const sort = 4;
   let jobPaggination = Array(Math.ceil(data.jobsTable.data.length / sort))
      .fill()
      .map((_, i) => i + 1);

   const activePag = useRef(0);
   const jobData = useRef(
      data.jobsTable.data.slice(
         activePag.current * sort,
         (activePag.current + 1) * sort
      )
   );
   const [demo, setdemo] = useState();
   const onClick = (i) => {
      activePag.current = i;

      jobData.current = data.jobsTable.data.slice(
         activePag.current * sort,
         (activePag.current + 1) * sort
      );
      setdemo(
         data.jobsTable.data.slice(
            activePag.current * sort,
            (activePag.current + 1) * sort
         )
      );
   };
   return (
      <div className="col-12">
         <div className="card">
            <div className="card-header">
               <h4 className="card-title">Basic Datatable</h4>
            </div>
            <div className="card-body">
               <Table responsive className="w-100">
                  <div id="example_wrapper" className="dataTables_wrapper">
                     <table id="example" className="display w-100 dataTable">
                        <thead>
                           <tr role="row">
                              {data.jobsTable.columns.map((d, i) => (
                                 <th key={i}>{d}</th>
                              ))}
                           </tr>
                        </thead>
                        <tbody>
                           {jobData.current.map((d, i) => (
                              <tr key={i}>
                                 {d.map((da, i) => (
                                    <td key={i}>{da}</td>
                                 ))}
                              </tr>
                           ))}
                        </tbody>
                        <tfoot>
                           <tr role="row">
                              {data.jobsTable.columns.map((d, i) => (
                                 <th key={i}>{d}</th>
                              ))}
                           </tr>
                        </tfoot>
                     </table>
                     <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                        <div className="dataTables_info">
                           Showing {activePag.current * sort + 1} to{" "}
                           {data.jobsTable.data.length <
                           (activePag.current + 1) * sort
                              ? data.jobsTable.data.length
                              : (activePag.current + 1) * sort}{" "}
                           of {data.jobsTable.data.length} entries
                        </div>
                        <div className="dataTables_paginate paging_simple_numbers">
                           <Pagination
                              className="pagination-primary pagination-box"
                              size="lg"
                           >
                              <li
                                 className=""
                                 style={{ borderRadius: "4px" }}
                                 onClick={() =>
                                    activePag.current > 0 &&
                                    onClick(activePag.current - 1)
                                 }
                              >
                                 <Link
                                    className="paginate_button previous disabled"
                                    style={{ padding: "10px 20px" }}
                                    to="#"
                                 >
                                    Previous
                                 </Link>
                              </li>
                              <span>
                                 {jobPaggination.map((number, i) => (
                                    <Link
                                       key={i}
                                       to="/table-datatable-basic"
                                       className={`paginate_button  ${
                                          activePag.current === i
                                             ? "current"
                                             : ""
                                       }`}
                                       onClick={() => onClick(i)}
                                    >
                                       {number}
                                    </Link>
                                 ))}
                              </span>

                              <li
                                 className=""
                                 onClick={() =>
                                    activePag.current + 1 <
                                       jobPaggination.length &&
                                    onClick(activePag.current + 1)
                                 }
                              >
                                 <Link
                                    className="paginate_button next"
                                    to="#"
                                    style={{ padding: "10px 20px" }}
                                 >
                                    Next
                                 </Link>
                              </li>
                           </Pagination>
                        </div>
                     </div>
                  </div>
               </Table>
            </div>
         </div>
      </div>
   );
};

export default BasicDatatable;
