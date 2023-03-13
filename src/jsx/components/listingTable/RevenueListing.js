import React from "react";
const RevenueListing = ({ tabledata, showWhiteListBtn }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderTable = (tabledata) => {
    return (
      <table
        className="table display mb-4 dataTablesCard card-table dataTable no-footer"
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
              Created At
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
                  <td>{index + 1}</td>
                  <td>{row?.paymentCurrency || ""}</td>
                  <td>{row?.paymentType || ""}</td>
                  <td>{row?.amount || 0}</td>
                  <td>{row?.createdAt || ""}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  };

  const renderListing = (list) => {
    return (
      <>
        {list.map((item) => {
          let date = new Date(item?.date);
          let day = date.getDate().toString();
          return (
            <div>
              <div className="mb-2 size-1">
                {day.padStart(2, "0") +
                  " " +
                  months[date.getMonth()] +
                  " " +
                  date.getFullYear()}
              </div>
              <div className="mb-2 size-2">
                {item?.payments?.length ? (
                  renderTable(item?.payments)
                ) : (
                  <h5> No revenue found for this Date</h5>
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="reveneu-list">
        <div className="dataTables_wrapper no-footer">
          {renderListing(tabledata)}
        </div>
      </div>
    </>
  );
};

export default RevenueListing;
