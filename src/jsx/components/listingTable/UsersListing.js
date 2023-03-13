import { Dropdown } from "react-bootstrap";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Block from "@material-ui/icons/Block";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  changeUserBlockStatus,
  changeUserVerifiedStatus,
} from "../../../store/reducers/userReducer";

const UsersListingTable = ({ tabledata, handleChangeStatus, limit, page }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const changeStatus = async (fieldName, rowData) => {
    const user = await dispatch(
      fieldName === "isVerified"
        ? changeUserVerifiedStatus({
            id: rowData?._id,
            isVerified: !rowData?.isVerified,
          })
        : changeUserBlockStatus({
            id: rowData?._id,
            isBlocked: !rowData?.isBlocked,
          })
    );
    if (user?._id) {
      const updatedUsers = tabledata?.map((el) =>
        rowData?._id === el?._id ? { ...el, [fieldName]: !el[fieldName] } : el
      );
      handleChangeStatus(updatedUsers);
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
                  className="sorting"
                  tabIndex={0}
                  aria-controls="example5"
                  rowSpan={1}
                  colSpan={1}
                  aria-label="Date Published: activate to sort column ascending"
                  style={{ width: 124 }}
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
                  Avatar
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
                  Full Name
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
                  Wallet Address
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
                  Status
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
                tabledata.map((row, index) => {
                  return (
                    <tr role="row" className="odd">
                      <td>
                        <strong>{limit * page + index + 1}</strong>
                      </td>
                      <td>{<img src={row.avatar} width={60} alt="" />}</td>
                      <td>{row.fullName}</td>

                      <td>{row.walletAddress}</td>
                      <td>{`${row.isVerified}`}</td>
                      <td>{row.isBlocked ? "Blocked" : "Active"}</td>
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
                              onClick={() => changeStatus("isVerified", row)}
                            >
                              <VerifiedUser
                                className={`${
                                  row?.isVerified
                                    ? "text-success"
                                    : "text-danger"
                                } mr-3`}
                              />
                              {row?.isVerified
                                ? "Un Verify User"
                                : "Verify User"}
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown-item text-black"
                              onClick={() => changeStatus("isBlocked", row)}
                            >
                              <Block
                                className={`${
                                  row?.isBlocked
                                    ? "text-danger"
                                    : "text-success"
                                } mr-3`}
                              />
                              {row?.isBlocked ? "Un Block User" : "Block User"}
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="dropdown-item text-black"
                              onClick={() =>
                                history.push({
                                  pathname: `/user-detail/${row?._id}`,
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

export default UsersListingTable;
