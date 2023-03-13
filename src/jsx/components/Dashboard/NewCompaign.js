import React, { useState } from "react";
import { Link } from "react-router-dom";
import SnappingTOValuesDeshboard from "./SnappingToValues";
import CustomClearIndicator from "../PluginsMenu/Select2/MultiSelect";

function NewCompaign() {
   const [activeBudget, setActiveBudget] = useState(1000);
   return (
      <>
         <div className="form-head d-flex mb-2 mb-sm-3 mb-lg-5 align-items-center">
            <div className="mr-auto d-none d-lg-block">
               <h2 className="text-black font-w600">New Campaign</h2>
               <div>
                  <Link
                     to="/new-compaign"
                     className="fs-18 text-primary font-w600"
                  >
                     Campaign /
                  </Link>
                  <Link to="/new-compaign" className="fs-18">
                     Add new campaign
                  </Link>
               </div>
            </div>
            <div>
               <Link to="/new-compaign" className="btn btn-outline-primary">
                  PREVIEW
               </Link>
               <Link to="/new-compaign" className="btn btn-primary ml-3">
                  PUBLISH
               </Link>
            </div>
         </div>
         <div className="row">
            <div className="col-xl-9 col-xxl-8 col-lg-8">
               <div className="row">
                  <div className="col-xl-12">
                     <div className="card">
                        <div className="card-header pb-0 border-0">
                           <h3 className="fs-20 text-black">
                              Describe your campaign bellow
                           </h3>
                        </div>
                        <div className="card-body">
                           <form>
                              <div className="form-row">
                                 <div className="form-group col-xl-12">
                                    <label className="text-black font-w500 mb-3">
                                       Ad Name
                                    </label>
                                    <span className="text-danger ml-1">*</span>
                                    <input
                                       type="text"
                                       className="form-control"
                                       placeholder="Promotion Ads"
                                    />
                                 </div>
                                 <div className="form-group col-xl-12">
                                    <label className="text-black font-w500 mb-3">
                                       Ad Title
                                    </label>
                                    <span className="text-danger ml-1">*</span>
                                    <input
                                       type="text"
                                       className="form-control"
                                       placeholder="Get 70% OFF Discount from Westoreid"
                                    />
                                 </div>
                                 <div className="form-group col-xl-12">
                                    <label className="text-black font-w500 mb-3">
                                       Description
                                    </label>
                                    <span className="text-danger ml-1">*</span>
                                    <textarea
                                       className="form-control"
                                       rows={13}
                                       defaultValue={
                                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\n\t\t\t\t\t\t\t\t\t\t\t\t\tSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum \n\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                       }
                                    />
                                 </div>
                                 <div
                                    className="form-group col-xl-12"
                                    style={{
                                       position: "relative",
                                       zIndex: "2",
                                    }}
                                 >
                                    <label className="text-black font-w500 mb-3">
                                       Tags
                                    </label>
                                    <span className="text-danger ml-1">*</span>

                                    <CustomClearIndicator />
                                 </div>
                                 <div className="form-group col-xl-12">
                                    <div className="row">
                                       <div className="col-lg-6 mb-4">
                                          <label className="text-black font-w500 mb-3">
                                             Set Daily Budget
                                          </label>
                                          <span className="text-danger ml-1">
                                             *
                                          </span>
                                          <input
                                             type="text"
                                             className="form-control fs-24 text-center text-black mb-3"
                                             placeholder
                                             value={activeBudget}
                                          />
                                          <div
                                             className="btn-group budget-check"
                                             data-toggle="buttons"
                                          >
                                             <label
                                                className={`btn btn-outline-primary light btn-sm ${
                                                   activeBudget === 200
                                                      ? "active"
                                                      : ""
                                                }`}
                                                onClick={() =>
                                                   setActiveBudget(200)
                                                }
                                             >
                                                <input
                                                   type="radio"
                                                   className="position-absolute invisible"
                                                   name="options"
                                                   id="option5"
                                                />
                                                $200
                                             </label>
                                             <label
                                                className={`btn btn-outline-primary light btn-sm ${
                                                   activeBudget === 500
                                                      ? "active"
                                                      : ""
                                                }`}
                                                onClick={() =>
                                                   setActiveBudget(500)
                                                }
                                             >
                                                <input
                                                   type="radio"
                                                   className="position-absolute invisible"
                                                   name="options"
                                                   id="option1"
                                                   defaultChecked
                                                />
                                                $500
                                             </label>
                                             <label
                                                className={`btn btn-outline-primary light btn-sm ${
                                                   activeBudget === 1000
                                                      ? "active"
                                                      : ""
                                                }`}
                                                onClick={() =>
                                                   setActiveBudget(1000)
                                                }
                                             >
                                                <input
                                                   type="radio"
                                                   className="position-absolute invisible"
                                                   name="options"
                                                   id="option2"
                                                />
                                                $1,000
                                             </label>
                                             <label
                                                className={`btn btn-outline-primary light btn-sm ${
                                                   activeBudget === 2000
                                                      ? "active"
                                                      : ""
                                                }`}
                                                onClick={() =>
                                                   setActiveBudget(2000)
                                                }
                                             >
                                                <input
                                                   type="radio"
                                                   className="position-absolute invisible"
                                                   name="options"
                                                   id="option3"
                                                />
                                                $2000
                                             </label>
                                             <label
                                                className={`btn btn-outline-primary light btn-sm ${
                                                   activeBudget === 5000
                                                      ? "active"
                                                      : ""
                                                }`}
                                                onClick={() =>
                                                   setActiveBudget(5000)
                                                }
                                             >
                                                <input
                                                   type="radio"
                                                   className="position-absolute invisible"
                                                   name="options"
                                                   id="option4"
                                                />
                                                $5000
                                             </label>
                                          </div>
                                       </div>
                                       <div className="col-lg-6">
                                          <label className="text-black font-w500 mb-3">
                                             Total Budget
                                          </label>
                                          <span className="text-danger ml-1">
                                             *
                                          </span>
                                          <div className="input-element">
                                             <SnappingTOValuesDeshboard />
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-12">
                     <div className="card">
                        <div className="card-body pb-0">
                           <div className="row">
                              <div className="col-xl-6">
                                 <div className="form-group col-xl-12 p-0">
                                    <label className="text-black font-w500 mb-3">
                                       Date Start
                                    </label>
                                    <input
                                       type="date"
                                       className="form-control"
                                    />
                                 </div>
                              </div>
                              <div className="col-xl-6">
                                 <div className="form-group col-xl-12 p-0">
                                    <label className="text-black font-w500 mb-3">
                                       Date End
                                    </label>
                                    <input
                                       type="date"
                                       className="form-control"
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-xl-3 col-xxl-4 col-lg-4">
               <div className="row">
                  <div className="col-xl-12">
                     <div className="card">
                        <div className="card-header border-0 pb-0">
                           <h3 className="text-black fs-20">Images</h3>
                           <Link
                              className="btn btn-link fs-18 pr-0"
                              to="/new-compaign"
                           >
                              +Upload
                           </Link>
                        </div>
                        <div className="card-body">
                           <div className="bgl-primary p-3 text-black rounded">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-12">
                     <div className="card">
                        <div className="card-header border-0 pb-0">
                           <h3 className="text-black fs-20">
                              Social Media Stream
                           </h3>
                           <Link
                              className="btn btn-link text-dark fs-18 pr-0"
                              to="/new-compaign"
                           >
                              Clear
                           </Link>
                        </div>
                        <div className="card-body">
                           <div className="d-flex mb-3 align-items-center justify-content-between">
                              <div className="d-flex">
                                 <div className="custom-control custom-checkbox mr-2">
                                    <input
                                       type="checkbox"
                                       className="custom-control-input"
                                       id="customCheckBox7"
                                       required
                                    />
                                    <label
                                       className="custom-control-label"
                                       htmlFor="customCheckBox7"
                                    />
                                 </div>
                                 <span className="text-black font-w600">
                                    Instagram
                                 </span>
                              </div>
                              <i className="lab la-instagram social-icon bg-secondary text-white" />
                           </div>
                           <div className="d-flex mb-3 align-items-center justify-content-between">
                              <div className="d-flex">
                                 <div className="custom-control custom-checkbox mr-2">
                                    <input
                                       type="checkbox"
                                       className="custom-control-input"
                                       id="customCheckBox71"
                                       required
                                    />
                                    <label
                                       className="custom-control-label"
                                       htmlFor="customCheckBox71"
                                    />
                                 </div>
                                 <span className="text-black font-w600">
                                    Facebook
                                 </span>
                              </div>
                              <i className="lab la-facebook-f social-icon bg-info text-white" />
                           </div>
                           <div className="d-flex mb-3 align-items-center justify-content-between">
                              <div className="d-flex">
                                 <div className="custom-control custom-checkbox mr-2">
                                    <input
                                       type="checkbox"
                                       className="custom-control-input"
                                       id="customCheckBox72"
                                       required
                                    />
                                    <label
                                       className="custom-control-label"
                                       htmlFor="customCheckBox72"
                                    />
                                 </div>
                                 <span className="text-black font-w600">
                                    Twitter
                                 </span>
                              </div>
                              <i className="lab la-twitter social-icon bg-success text-white" />
                           </div>
                           <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex">
                                 <div className="custom-control custom-checkbox mr-2">
                                    <input
                                       type="checkbox"
                                       className="custom-control-input"
                                       id="customCheckBox73"
                                       required
                                    />
                                    <label
                                       className="custom-control-label"
                                       htmlFor="customCheckBox73"
                                    />
                                 </div>
                                 <span className="text-black font-w600">
                                    Youtube
                                 </span>
                              </div>
                              <i className="lab la-youtube social-icon bg-danger text-white" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default NewCompaign;
