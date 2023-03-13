import { Dropdown } from "react-bootstrap";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCollectionStatus,
  updateFeaturedCollectionStatus,
  approvedLauncherDrop,
  updateLauncherCollections,
  makeCollectionFeatured,
} from "../../../store/reducers/collectionReducer";

const RequestedApprovalLaunchers = ({ tabledata, page, limit }) => {
  const history = useHistory();
  const launcherCollections = useSelector(
    (state) => state.collectionReducer.launchersCollection
  );
  console.log(
    "🚀 ~ file: RequestedApprovalLaunchers.js ~ line 18 ~ RequestedApprovalLaunchers ~ launcherCollections",
    launcherCollections
  );

  const dispatch = useDispatch();

  //   const changeStatus = async (rowData) => {
  //     // const updatedCollections = launcherCollections?.docs?.map((el) =>
  //     //   rowData?._id === el?._id ? { ...el, isVerified: !el?.isVerified } : el
  //     // );
  //     const collection = await dispatch(
  //       changeCollectionStatus({
  //         id: rowData?._id,
  //         isVerified: !rowData?.isVerified,
  //       })
  //     );
  //     if (collection?._id) {
  //       dispatch(
  //         updateFeaturedCollectionStatus({
  //           ...launcherCollections,
  //           docs: updatedCollections,
  //         })
  //       );
  //     }
  //   };

  const changeActivation = async (rowData) => {
    const updatedCollections = launcherCollections?.docs?.map((el) =>
      rowData?._id === el?._id ? { ...el, isApproved: !el?.isApproved } : el
    );
    console.log(
      "🚀 ~ file: RequestedApprovalLaunchers.js ~ line 45 ~ changeActivation ~ updatedCollections",
      updatedCollections
    );
    const collection = await dispatch(
      approvedLauncherDrop({
        id: rowData?._id,
        isApproved: !rowData?.isApproved,
      })
    );
    if (collection?.success) {
      dispatch(
        updateLauncherCollections({
          ...launcherCollections,
          docs: updatedCollections,
        })
      );
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
                  No.
                </th>
                <th
                  className="sorting"
                  tabIndex={0}
                  aria-controls="example5"
                  rowSpan={1}
                  colSpan={1}
                  aria-label="Date Published: activate to sort column ascending"
                  style={{ width: 124 }}
                >
                  Name
                </th>
                <th
                  className="sorting"
                  tabIndex={0}
                  aria-controls="example5"
                  rowSpan={1}
                  colSpan={1}
                  aria-label="Date Published: activate to sort column ascending"
                  style={{ width: 124 }}
                >
                  Description
                </th>
                <th
                  className="sorting"
                  tabIndex={0}
                  aria-controls="example5"
                  rowSpan={1}
                  colSpan={1}
                  aria-label="Date Published: activate to sort column ascending"
                  style={{ width: 124 }}
                >
                  Verified
                </th>
                <th
                  className="sorting"
                  tabIndex={0}
                  aria-controls="example5"
                  rowSpan={1}
                  colSpan={1}
                  aria-label="Date Published: activate to sort column ascending"
                  style={{ width: 124 }}
                >
                  Image
                </th>

                <th
                  className="sorting"
                  tabIndex={0}
                  aria-controls="example5"
                  rowSpan={1}
                  colSpan={1}
                  aria-label="Date Published: activate to sort column ascending"
                  style={{ width: 124 }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {tabledata &&
                tabledata?.map((row, index) => {
                  return (
                    <tr role="row" className="odd">
                      <td className="pr-0 all_spending_checkbox">
                        <strong>{limit * page + index + 1}</strong>
                      </td>

                      <td>{row?.collectionId?.fullName || ""}</td>
                      <td
                        style={{
                          display: "inline-block",
                          width: 300,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {row?.collectionId?.description}...
                      </td>
                      <td>{`${row?.collectionId?.isVerified}` || "false"}</td>
                      <td>
                        {
                          <img
                            src={row?.collectionId?.avatar}
                            width={60}
                            alt=""
                          />
                        }
                      </td>

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
                            <Dropdown.Item
                              className="dropdown-item text-black"
                              onClick={() => changeActivation(row)}
                            >
                              <VerifiedUser
                                className={`${
                                  row?.isApproved
                                    ? "text-danger"
                                    : "text-success"
                                } mr-3`}
                              />
                              {row?.isApproved ? "Revoke Approval" : "Approve"}
                            </Dropdown.Item>

                            <Dropdown.Item
                              className="dropdown-item text-black"
                              onClick={() =>
                                history.push({
                                  pathname: `/collection-detail/${row?.collectionId?._id}`,
                                })
                              }
                            >
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
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RequestedApprovalLaunchers;
