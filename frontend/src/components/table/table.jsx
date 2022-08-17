import './table.css';
const Table=({titles,data})=>{
    return  (
        <div className="table-container">
        <table className="table table-borderless">
          {sellingMethod === 2 && bids && bids.length > 0 && (
            <thead>
              <tr>
                <th scope="col">Price</th>
                <th scope="col">USD Price</th>
                <th scope="col">Floor Difference</th>

                <th scope="col">From</th>
              </tr>
            </thead>
          )}
          <tbody>
            {sellingMethod === 2 && bids && bids.length > 0 ? (
              <>
                {bids.map((bid, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{bid.bidAmount}</th>
                      <td>
                        $
                        {(bid.bidAmount * exchangeRate).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {getPercentageChange(
                          bid.bidAmount,
                          lowestNftPrice
                        ).toFixed(0)}
                        %{" "}
                        {bid.bidAmount > lowestNftPrice
                          ? "above"
                          : "below"}
                      </td>
                      <td>
                        {bid.fromAddress.slice(0, 4) +
                          "..." +
                          bid.fromAddress.slice(-4)}
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <p className="text-center d-flex justify-content-center align-items-center">
                No Offers Found
              </p>
            )}
          </tbody>
        </table>
      </div>
    )
}
export default Table;