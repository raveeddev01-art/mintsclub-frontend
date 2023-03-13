import { Dropdown } from "react-bootstrap";

import { useHistory } from "react-router-dom";

const PaymentListingTable = ({ tabledata, showWhiteListBtn, limit, page }) => {
    const history = useHistory();

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
                                        <strong>No.</strong>

                                    </div>
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
                                    Payment Currency
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
                                    Amount
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
                                    Payment Type
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
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {tabledata && tabledata.map((row, index) => {
                                return (
                                    <tr role="row" className="odd">
                                        <td className="pr-0 all_spending_checkbox">
                                            <div className="custom-control custom-checkbox ml-2">
                                                <strong>{limit * page + index + 1}</strong>
                                            </div>
                                        </td>

                                        <td>
                                            {row.paymentCurrency}
                                        </td>
                                        <td>
                                            {row.amount}
                                        </td>
                                        <td>
                                            {row.paymentType}
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
                                                <Dropdown.Menu className="dropdown-menu dropdown-menu-right"

                                                >
                                                    <Dropdown.Item className="dropdown-item text-black"
                                                        onClick={() => history.push({ pathname: `/payment-detail/${row?._id}` })}
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
                                )
                            })}

                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
};

export default PaymentListingTable;
